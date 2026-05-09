"""convert_and_merge.py
把 subsidies-full.csv（舊格式）轉為新格式，
再與 batch1/2/3 合併輸出 data/subsidies-v2.csv。
"""

import csv
import re
from datetime import date
from pathlib import Path

TODAY = date.today().isoformat()
DATA = Path("data")

HEADERS = [
    "id", "title", "agency", "category", "amount", "city",
    "eligible_identity", "min_age", "max_age", "income_limit",
    "housing_status", "family_status", "description",
    "apply_url", "source_url", "updated_at",
]

# 舊 category → 新 category 對應
CAT_MAP = {
    "租屋": "租屋住宅",
    "育兒": "育兒生育",
    "就業": "就業",
    "老年": "老年長照",
    "身障": "身心障礙",
    "醫療": "醫療健康",
    "教育": "教育進修",
    "稅務": "稅務節稅",
    "農業": "農業農民",
    "其他": "其他",
}


def guess_agency(row: dict) -> str:
    """從 subtitle 或 title 推測主管機關。"""
    text = row.get("subtitle", "") + row.get("title", "")
    if "內政部" in text or "住宅" in text:
        return "內政部國土管理署"
    if "勞動部" in text or "就業" in text or "失業" in text:
        return "勞動部"
    if "衛福部" in text or "育兒" in text or "長照" in text:
        return "衛福部"
    if "教育部" in text or "學費" in text or "獎學金" in text:
        return "教育部"
    if "財政部" in text or "稅" in text:
        return "財政部"
    if "農業" in text or "農民" in text:
        return "農業部"
    return "各地方政府"


def parse_age(criteria: list[str]) -> tuple[int, int]:
    """從 criteria 欄位解析年齡限制。"""
    min_age, max_age = 0, 0
    for c in criteria:
        m = re.search(r"(\d+)[-~至到](\d+)歲", c)
        if m:
            min_age, max_age = int(m.group(1)), int(m.group(2))
            break
        m = re.search(r"年滿(\d+)歲", c)
        if m:
            min_age = int(m.group(1))
    return min_age, max_age


def parse_income(criteria: list[str]) -> str:
    for c in criteria:
        if "低收入戶" in c:
            return "低收入戶"
        if "中低收入" in c:
            return "中低收入戶"
        if "年收入" in c or "所得" in c:
            return "一般"
    return "一般"


def parse_housing(criteria: list[str]) -> str:
    for c in criteria:
        if "無自有住宅" in c:
            return "租屋"
        if "自有住宅" in c:
            return "自有住宅"
    return ""


def parse_identity(row: dict, criteria: list[str]) -> str:
    title = row.get("title", "")
    if "青年" in title:
        return "青年"
    if "單親" in title:
        return "單親家庭"
    if "身障" in title or "身心障礙" in title:
        return "身心障礙者"
    if "老年" in title or "長照" in title or "銀髮" in title:
        return "中高齡"
    if "育兒" in title or "生育" in title or "托育" in title:
        return "有子女者"
    for c in criteria:
        if "青年" in c:
            return "青年"
        if "弱勢" in c:
            return "弱勢族群"
    return "一般民眾"


def parse_family(criteria: list[str], title: str) -> str:
    if "育兒" in title or "生育" in title or "托育" in title or "子女" in title:
        return "有子女"
    if "單親" in title:
        return "單親"
    return ""


def convert_old_row(row: dict) -> list:
    criteria = [
        row.get(f"criteria_{i}", "").strip()
        for i in range(1, 5)
        if row.get(f"criteria_{i}", "").strip()
    ]
    min_age, max_age = parse_age(criteria)

    # 組合描述：subtitle + criteria
    desc_parts = [row.get("subtitle", "").strip()]
    desc_parts += [c for c in criteria if c]
    description = "；".join(p for p in desc_parts if p)[:200]

    old_cat = row.get("category", "其他")
    new_cat = CAT_MAP.get(old_cat, old_cat)

    amount = row.get("amount", "").strip()
    amount_label = row.get("amount_label", "").strip()
    if amount_label and amount_label not in amount:
        amount = f"{amount}（{amount_label}）"

    return [
        row.get("slug", "").strip(),
        row.get("title", "").strip(),
        guess_agency(row),
        new_cat,
        amount,
        "全國",
        parse_identity(row, criteria),
        min_age,
        max_age,
        parse_income(criteria),
        parse_housing(criteria),
        parse_family(criteria, row.get("title", "")),
        description,
        row.get("apply_url", "").strip(),
        row.get("apply_url", "").strip(),
        TODAY,
    ]


def read_new_format(path: Path) -> list[list]:
    rows = []
    with open(path, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append([r.get(h, "") for h in HEADERS])
    return rows


# ── 主程式 ──────────────────────────────────────────────────────────

all_rows: list[list] = []
seen_ids: set[str] = set()

# 1. 轉換舊格式（若存在）
old_path = DATA / "subsidies-full.csv"
if old_path.exists():
    before = len(all_rows)
    with open(old_path, encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            if (row.get("active") or "TRUE").strip().upper() != "TRUE":
                continue
            converted = convert_old_row(row)
            rid = converted[0]
            if rid and rid not in seen_ids:
                seen_ids.add(rid)
                all_rows.append(converted)
    print(f"舊格式轉換：{len(all_rows) - before} 筆")
else:
    print("subsidies-full.csv 不存在，跳過")

# 2. 合併 batch1/2/3
for fname in ["subsidies-v2.csv", "subsidies_batch2.csv", "subsidies_batch3.csv", "subsidies_batch4.csv"]:
    p = DATA / fname
    if not p.exists():
        print(f"  [!] 找不到 {fname}，跳過")
        continue
    batch = read_new_format(p)
    added = 0
    for r in batch:
        rid = r[0]
        if rid not in seen_ids:
            seen_ids.add(rid)
            all_rows.append(r)
            added += 1
    print(f"  {fname}：{added} 筆")

# 3. 輸出最終 CSV
out_path = DATA / "subsidies-v2.csv"
with open(out_path, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(HEADERS)
    w.writerows(all_rows)

print(f"\n合併完成：共 {len(all_rows)} 筆 → {out_path}")

# 4. 刪除舊檔
to_delete = [
    DATA / "subsidies-full.csv",
    DATA / "subsidies_batch2.csv",
    DATA / "subsidies_batch3.csv",
    DATA / "subsidies_batch4.csv",
]
for p in to_delete:
    if p.exists():
        p.unlink()
        print(f"  已刪除 {p.name}")
