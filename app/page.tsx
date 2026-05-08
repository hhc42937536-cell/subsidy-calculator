const personas = [
  {
    tag: "上班族",
    title: "月薪 4 萬、租屋、無車",
    subsidies: ["租金補貼", "勞工紓困", "健保費補助"],
    amount: 84000,
  },
  {
    tag: "新婚夫妻",
    title: "結婚第一年、備孕中",
    subsidies: ["結婚補助", "生育津貼", "育兒補助"],
    amount: 132000,
  },
  {
    tag: "小型創業者",
    title: "自行創業未滿 3 年",
    subsidies: ["創業貸款補貼", "青創補助", "員工訓練補助"],
    amount: 300000,
  },
  {
    tag: "農業工作者",
    title: "自耕農、農地面積 1 公頃",
    subsidies: ["農業天災補助", "農機補助", "農保津貼"],
    amount: 96000,
  },
];

const stats = [
  { label: "政府補助項目", value: "200+" },
  { label: "每年更新", value: "4 次" },
  { label: "平均可領金額", value: "NT$9.6萬" },
  { label: "申請成功率", value: "83%" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Nav */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-slate-900 tracking-tight">
            補助優轉
          </span>
          <button className="text-sm bg-slate-900 text-white px-4 py-1.5 rounded-full hover:bg-slate-700 transition-colors">
            開始分析
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          資料來自政府公開資料平台，每季更新
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
          你可能少領了
          <br />
          <span className="text-sky-500">數萬元</span> 政府補助
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mb-8">
          選一個最像你的生活情境，30 秒看清楚你能領哪些補助、總共多少錢，以及怎麼申請。
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors">
            找我的情境
          </button>
          <button className="text-slate-500 text-sm hover:text-slate-900 transition-colors">
            查看補助資料庫 →
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Persona cards */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">選一個最像你的情境</h2>
            <p className="text-slate-500 text-sm mt-1">點選後即可查看完整補助清單</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personas.map((p) => (
            <button
              key={p.tag}
              className="group text-left border border-slate-200 rounded-xl p-5 hover:border-sky-300 hover:shadow-sm transition-all bg-white"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {p.tag}
                </span>
                <span className="text-green-600 font-semibold text-sm">
                  最高 NT${(p.amount / 10000).toFixed(0)} 萬
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {p.subsidies.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded"
                  >
                    {sub}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-400 group-hover:text-sky-500 transition-colors">
                查看完整補助 →
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">三步驟，搞定申請</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "選情境", desc: "從人物誌卡片選一個最像你的生活狀況" },
              { step: "02", title: "看補助", desc: "系統列出你可申請的所有補助與預估金額" },
              { step: "03", title: "去申請", desc: "直接連結到官方申請頁面，不繞路" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-2xl font-bold text-slate-200">{item.step}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-400">
          <span>© 2025 補助優轉</span>
          <span>資料來源：data.gov.tw</span>
        </div>
      </footer>
    </div>
  );
}
