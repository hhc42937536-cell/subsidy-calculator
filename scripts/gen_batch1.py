import csv
from datetime import date

today = date.today().isoformat()
FIELDS = [
    "id","title","agency","category","amount","city",
    "eligible_identity","min_age","max_age","income_limit",
    "housing_status","family_status","description",
    "apply_url","source_url","updated_at"
]

rows = [
# ── 租屋住宅（20筆）──────────────────────────────────────
["rent-central","中央租金補貼","內政部","租屋住宅","54000","全台","一般民眾","18","","家庭年收入符合規定","需租屋","","年滿18歲、無自有住宅、租屋並設籍，每年5-8月開放申請，台北最高6,000元/月","https://rental.cpami.gov.tw/","https://rental.cpami.gov.tw/",today],
["rent-packrent","包租代管租金補貼","內政部","租屋住宅","3600","全台","一般民眾","18","","符合所得限制","需租屋","","透過政府認可包租代管業者承租，每月最高3,600元，流程較簡便","https://www.coolrent.org.tw/","https://www.coolrent.org.tw/",today],
["rent-youth","青年安心成家租金補貼","內政部","租屋住宅","6000","全台","青年","18","40","符合所得限制","需租屋","","18-40歲無殼族，無自有住宅且租屋設籍，每月最高6,000元","https://rental.cpami.gov.tw/","https://rental.cpami.gov.tw/",today],
["rent-social-housing","社會住宅申請","國家住宅及都市更新中心","租屋住宅","依地區","全台","弱勢優先","18","","符合所得限制","無自有住宅","","政府興建平價住宅，租金低於市價20-30%，採抽籤制，弱勢族群有加權資格","https://www.socialhousing.gov.tw/","https://www.socialhousing.gov.tw/",today],
["rent-single-parent","單親家庭租屋補助","各縣市社會局","租屋住宅","4500","全台","單親家長","","","符合所得限制","需租屋","單親家庭","單親家長帶未成年子女承租住宅可申請額外補助，各縣市另有加碼","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["rent-indigenous","原住民租屋補助","原住民族委員會","租屋住宅","5000","全台","原住民","","","","需租屋","","具原住民族身分在都市地區租屋，每月最高5,000元，可與中央補貼合併","https://www.apc.gov.tw/","https://www.apc.gov.tw/",today],
["rent-elder","老人租屋補助","各縣市社會局","租屋住宅","3000","全台","老年人","65","","符合所得限制","需租屋","","65歲以上老人承租住宅可獲補助，各縣市標準不一","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["rent-disability","身障者租屋補助","各縣市社會局","租屋住宅","4000","全台","身心障礙者","","","符合所得限制","需租屋","","持有效身心障礙手冊者可申請租金補貼，障礙程度較重者補貼較高","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["rent-lowincome","低收入戶住宅補助","各縣市社會局","租屋住宅","5500","全台","低收入戶","","","低收入戶","","","低收入戶承租或修繕住宅可獲補助，可優先申請社會住宅","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["rent-repair","住宅修繕補助","各縣市政府","租屋住宅","100000","全台","低收入戶","","","低收入或中低收入戶","自有住宅","","弱勢家庭自有住宅修繕補助，改善居住安全，每戶最高10萬元","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["rent-newlywed-bonus","婚育租屋加碼","內政部","租屋住宅","36000","全台","已婚青年","20","40","","需租屋","已婚未滿2年","2026年新制：結婚未滿2年承租者租金補貼加碼20%，每年最多多領36,000元","https://rental.cpami.gov.tw/","https://rental.cpami.gov.tw/",today],
["rent-hazard-rebuild","危老建築重建補助","內政部","租屋住宅","依規模","全台","屋主","","","","","","屋齡逾30年且結構危險建築，申請重建可獲容積獎勵及費用補助","https://www.urdd.gov.tw/","https://www.urdd.gov.tw/",today],
["rent-house-tax-own","房屋稅自用住宅減免","各縣市稅務局","租屋住宅","依房屋稅","全台","屋主","","","","自用住宅","","自用住宅稅率1%，非自住最高4.8%，向稅務局登記即享優惠","https://www.ntbt.gov.tw/","https://www.ntbt.gov.tw/",today],
["rent-land-tax-own","地價稅自用住宅減免","各縣市稅務局","租屋住宅","依地價稅","全台","屋主","","","","自用住宅","","自用住宅地價稅率2‰，一般用地10‰，登記即可大幅節稅","https://www.ntbt.gov.tw/","https://www.ntbt.gov.tw/",today],
["rent-public-landlord","公益出租人稅賦減免","各縣市稅務局","租屋住宅","依稅額","全台","房東","","","","出租","","登記公益出租人後房屋稅及地價稅均降至住家用稅率，每年可省數萬元","https://www.ntbt.gov.tw/","https://www.ntbt.gov.tw/",today],
["rent-old-energy","老屋節能改造補助","經濟部能源署","租屋住宅","100000","全台","屋主","","","","","","屋齡15年以上申請節能改造補助，含外牆隔熱、節能窗、LED照明等","https://www.moea.gov.tw/","https://www.moea.gov.tw/",today],
["rent-first-home","首購優惠房貸","財政部金管會","租屋住宅","依房價","全台","首購族","20","","","首次購屋","","無自有住宅首次購屋，可申請1.6%以下優惠利率房貸","https://www.banking.gov.tw/","https://www.banking.gov.tw/",today],
["rent-newborn-housing","生育後租屋補貼加碼","內政部","租屋住宅","72000","全台","已婚有子女","","","","需租屋","有新生兒","2026年新制：生育後租金補貼再加碼，第一年最高可領72,000元","https://rental.cpami.gov.tw/","https://rental.cpami.gov.tw/",today],
["rent-veteran","退伍軍人住宅補助","國防部","租屋住宅","依計畫","全台","退伍軍人","","","","","","服役期間及退伍後可申請軍眷住宅或購宅優惠貸款","https://www.mnd.gov.tw/","https://www.mnd.gov.tw/",today],
["rent-urban-renewal","都市更新補助","內政部","租屋住宅","依計畫","全台","屋主","","","","","","老舊建物參與都市更新可獲容積獎勵及稅賦減免","https://www.urdd.gov.tw/","https://www.urdd.gov.tw/",today],

# ── 育兒生育（25筆）──────────────────────────────────────
["child-birth-central","生育給付（中央PLUS）","勞保局","育兒生育","100000","全台","勞保被保險人","","","","","","2026年新制：每胎保底10萬元，不分投保薪資高低","https://www.bli.gov.tw/","https://www.bli.gov.tw/",today],
["child-birth-taipei","台北市生育獎勵金","台北市政府","育兒生育","20000","台北市","設籍台北市","","","","","","設籍台北市且生育者每胎2萬元獎勵金","https://www.gov.taipei/","https://www.gov.taipei/",today],
["child-birth-taichung","台中市生育津貼","台中市政府","育兒生育","20000","台中市","設籍台中市","","","","","","設籍台中市連續滿半年生育者每胎2萬元","https://www.taichung.gov.tw/","https://www.taichung.gov.tw/",today],
["child-birth-kaohsiung","高雄市生育獎勵","高雄市政府","育兒生育","10000","高雄市","設籍高雄市","","","","","","設籍高雄市生育者每胎1萬元","https://www.kcg.gov.tw/","https://www.kcg.gov.tw/",today],
["child-birth-tainan","台南市生育獎勵","台南市政府","育兒生育","10000","台南市","設籍台南市","","","","","","設籍台南市生育者每胎1萬元","https://www.tainan.gov.tw/","https://www.tainan.gov.tw/",today],
["child-birth-taoyuan","桃園市生育獎勵","桃園市政府","育兒生育","10000","桃園市","設籍桃園市","","","","","","設籍桃園市生育者每胎1萬元","https://www.tycg.gov.tw/","https://www.tycg.gov.tw/",today],
["child-birth-ntpc","新北市生育獎勵","新北市政府","育兒生育","10000","新北市","設籍新北市","","","","","","設籍新北市生育者每胎1萬元","https://www.ntpc.gov.tw/","https://www.ntpc.gov.tw/",today],
["child-birth-hsinchu","新竹市生育獎勵","新竹市政府","育兒生育","30000","新竹市","設籍新竹市","","","","","","新竹市第三胎以上最高3萬元","https://www.hccg.gov.tw/","https://www.hccg.gov.tw/",today],
["child-birth-hualien","花蓮縣生育津貼","花蓮縣政府","育兒生育","20000","花蓮縣","設籍花蓮縣","","","","","","偏遠地區加碼，每胎2萬元","https://www.hl.gov.tw/","https://www.hl.gov.tw/",today],
["child-birth-taitung","台東縣生育獎勵","台東縣政府","育兒生育","20000","台東縣","設籍台東縣","","","","","","偏遠地區加碼，每胎2萬元","https://www.taitung.gov.tw/","https://www.taitung.gov.tw/",today],
["child-parental-leave","育嬰留職停薪津貼","勞保局","育兒生育","20000","全台","勞保被保險人","","","","","有子女（0-3歲）","父母各可留停最長6個月，領投保薪資60%，合計最長12個月","https://www.bli.gov.tw/","https://www.bli.gov.tw/",today],
["child-nursery-public","公共化托育補助（0-2歲）","衛生福利部","育兒生育","10000","全台","一般民眾","","","","","有子女（0-2歲）","子女0-2歲送托公共或準公共托育機構，自付約3,000元/月，政府補足差額","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["child-nursery-self","育兒津貼（自行照顧）","衛生福利部","育兒生育","5000","全台","一般民眾","","","","","有子女（0-2歲）","未送托者親自照顧每月5,000元，與托育補助二擇一","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["child-kindergarten","幼兒園學費補助（2.5-6歲）","教育部","育兒生育","5000","全台","一般民眾","","","","","有子女（2.5-6歲）","公立幼兒園近乎免費，準公共化自付約3,000元/月，低收入戶全免","https://www.ece.moe.edu.tw/","https://www.ece.moe.edu.tw/",today],
["child-afterschool","課後照顧補助","教育部","育兒生育","2000","全台","一般民眾","","","","","有國小子女","國小1-6年級課後托育費用補助，低收入戶優先全額補助","https://www.edu.tw/","https://www.edu.tw/",today],
["child-relative-care","親屬托育補助","衛生福利部","育兒生育","3000","全台","一般民眾","","","","","有子女（0-2歲）","委託3親等內親屬照顧，親屬完成托育訓練後每月領3,000元","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["child-special-needs","發展遲緩兒童療育補助","衛生福利部","育兒生育","1200","全台","一般民眾","","6","","","有發展遲緩子女","0-6歲發展遲緩兒童療育費用及交通補助，撥打1925申請早療","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["child-second-plus","第二胎以上縣市獎勵","各縣市政府","育兒生育","30000","全台","設籍各縣市","","","","","第二胎以上","各縣市第二胎以上額外獎勵，各地金額1萬到20萬不等","https://www.gov.tw/","https://www.gov.tw/",today],
["child-cwid","兒童未來教育及發展帳戶","衛生福利部","育兒生育","15000","全台","低收入戶","","","低收入或中低收入戶","","有子女","政府每月存1,250元，家長配對同額，子女18歲後可領取","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["child-nhi-dental","兒童牙齒塗氟補助","健保署","育兒生育","0","全台","一般民眾","","6","","","有子女（0-6歲）","6歲以下每3-6個月免費塗氟，在健保特約牙科申辦","https://www.nhi.gov.tw/","https://www.nhi.gov.tw/",today],
["child-vaccine","兒童公費疫苗","衛生福利部","育兒生育","0","全台","一般民眾","","6","","","有子女","BCG、B肝、五合一、麻疹等多種疫苗全部公費免費","https://www.cdc.gov.tw/","https://www.cdc.gov.tw/",today],
["child-neonatal-screen","新生兒篩檢","衛生福利部","育兒生育","0","全台","一般民眾","","","","","有新生兒","新生兒出生後接受21種先天代謝異常篩檢，政府全額補助","https://www.mohw.gov.tw/","https://www.mohw.gov.tw/",today],
["child-birth-hsinchu-county","新竹縣生育獎勵","新竹縣政府","育兒生育","10000","新竹縣","設籍新竹縣","","","","","","設籍新竹縣生育者每胎1萬元","https://www.hchg.gov.tw/","https://www.hchg.gov.tw/",today],
["child-birth-miaoli","苗栗縣生育津貼","苗栗縣政府","育兒生育","10000","苗栗縣","設籍苗栗縣","","","","","","設籍苗栗縣生育者每胎1萬元","https://www.miaoli.gov.tw/","https://www.miaoli.gov.tw/",today],
["child-birth-changhua","彰化縣生育獎勵","彰化縣政府","育兒生育","12000","彰化縣","設籍彰化縣","","","","","","設籍彰化縣生育者每胎1.2萬元","https://www.chcg.gov.tw/","https://www.chcg.gov.tw/",today],

# ── 就業（20筆）──────────────────────────────────────
["job-unemployment","失業給付","勞保局","就業","17928","全台","勞保被保險人","","","","","","非自願離職可領投保薪資60%，最長6個月，每月至就服站辦理再認定","https://www.bli.gov.tw/","https://www.bli.gov.tw/",today],
["job-training-living","職業訓練生活津貼","勞動部","就業","13047","全台","一般民眾","","","","","","參加政府全日制職訓期間每月領基本工資60%，自願離職亦可申請","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-early-reemploy","提早就業獎助","勞動部","就業","30000","全台","勞保被保險人","","","","","","失業給付請領期間提早就業，剩餘給付50%作為獎助金，最高3萬","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-cross-region","跨域就業補助","勞動部","就業","30000","全台","一般民眾","","","","","","跨縣市就業距離超過30公里，可申請交通費及搬遷費補助","https://www.taiwanjobs.gov.tw/","https://www.taiwanjobs.gov.tw/",today],
["job-women-return","婦女再就業計畫","勞動部","就業","180000","全台","女性","30","65","","","","因育兒離職後重返職場，免費職訓加就業媒合，成功就業可領獎助","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-senior","中高齡就業促進","勞動部","就業","30000","全台","中高齡","45","","","","","45歲以上求職者就業補助，免費職訓及穩定就業獎助金","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-temp","臨時工作津貼","勞動部","就業","28590","全台","弱勢失業者","","","","","","就業困難者參與政府或非營利機構臨時工作，每月領基本工資","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-career-training","公費職業訓練","勞動部","就業","0","全台","一般民眾","","","","","","政府免費提供職訓（IT、設計、廚師等），市值2-8萬元","https://www.taiwanjobs.gov.tw/","https://www.taiwanjobs.gov.tw/",today],
["job-workplace-learn","職場學習及再適應計畫","勞動部","就業","79200","全台","一般民眾","","","","","","就服站媒合進入企業體驗3個月，每月領26,400元津貼","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-youth-flagship","青年就業旗艦計畫","勞動部","就業","依薪資","全台","青年","18","29","","","","企業提供6個月帶薪訓練，政府補助雇主，青年取得正式工作","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-digital-talent","數位人才培育補助","勞動部","就業","40000","全台","一般民眾","","","","","","政府補貼80%數位技能培訓費，含AI、雲端、資安等課程","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-disability-employ","身障者就業補助","勞動部","就業","12000","全台","身心障礙者","","","","","","身障者就業獎助及職場適應支援，雇主聘用每人每月可領補助","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-indigenous-employ","原住民就業補助","原住民族委員會","就業","18000","全台","原住民","","","","","","原住民族就業促進計畫，包含就業獎勵金及職場輔導","https://www.apc.gov.tw/","https://www.apc.gov.tw/",today],
["job-mid-career-stable","中高齡穩定就業獎助","勞動部","就業","100000","全台","中高齡","45","","","","","再就業後穩定工作3年可領最高10萬元獎助，分3年撥付","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-enterprise-hire","企業僱用特定對象補助","勞動部","就業","36000","全台","雇主","","","","","","企業聘用失業逾6個月、身障或45歲以上者，每人每月可領獎助金","https://www.wda.gov.tw/","https://www.wda.gov.tw/",today],
["job-freelance-union","自由工作者加保職業工會","各職業工會","就業","0","全台","自由工作者","","","","","","接案族加入職業工會可加保勞保與健保，月保費約800元享職傷保障","https://www.bli.gov.tw/","https://www.bli.gov.tw/",today],
["job-veteran-employ","退伍軍人就業補助","國防部","就業","0","全台","退伍軍人","","","","","","退伍軍人就業媒合、免費職訓及就業推薦函服務","https://www.mnd.gov.tw/","https://www.mnd.gov.tw/",today],
["job-rural-youth","農村青年就業補助","農業部","就業","依薪資","全台","青年","20","45","","","","返鄉從事農業者可申請青農輔導及薪資補助","https://www.coa.gov.tw/","https://www.coa.gov.tw/",today],
["job-self-employ-fund","失業者創業微型貸款","勞動部","就業","1000000","全台","失業者","20","65","","","","失業者自行創業可申請100萬以下微型貸款，年利率1.5%","https://beboss.wda.gov.tw/","https://beboss.wda.gov.tw/",today],
["job-career-counsel","免費就業諮詢服務","勞動部","就業","0","全台","一般民眾","","","","","","全台就業服務站提供免費求職媒合、履歷健診及職涯諮詢","https://www.taiwanjobs.gov.tw/","https://www.taiwanjobs.gov.tw/",today],

# ── 低收入弱勢（10筆）──────────────────────────────────
["poor-living","低收入戶生活扶助","各縣市社會局","低收入弱勢","9829","全台","低收入戶","","","低收入戶","","","通過低收入戶資格審查，每人每月生活扶助，金額依縣市及類別不同","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-emergency","急難救助金","各縣市社會局","低收入弱勢","60000","全台","一般民眾","","","","","","突發緊急困境可申請，最高6萬元，審查快速約1週","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-medical","弱勢醫療補助","各縣市社會局","低收入弱勢","30000","全台","低收入戶","","","低收入或中低收入戶","","","低收入及中低收入者醫療費用自付額補助，住院門診均適用","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-food","食物銀行物資","社會福利機構","低收入弱勢","0","全台","弱勢族群","","","低收入或中低收入戶","","","定期領取食物及生活用品，各地由家扶、善牧等機構辦理","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-edu","弱勢就學補助","教育部","低收入弱勢","10000","全台","低收入戶","","","低收入或中低收入戶","","","低收入家庭學童學費補助，高中以上學費全免","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-utility","水電費補助","台電/台水","低收入弱勢","2400","全台","低收入戶","","","低收入戶","","","低收入戶水費電費優惠，部分縣市自動減免無需另外申請","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-funeral","喪葬補助","各縣市社會局","低收入弱勢","20000","全台","低收入戶","","","低收入戶","","","低收入戶家庭成員死亡可申請喪葬費補助，最高2萬元","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-health-insure","低收入戶健保費免繳","健保署","低收入弱勢","24000","全台","低收入戶","","","低收入戶","","","低收入戶全家健保費由政府全額負擔，4口家庭省約2.4萬/年","https://www.nhi.gov.tw/","https://www.nhi.gov.tw/",today],
["poor-mid-living","中低收入戶生活補助","各縣市社會局","低收入弱勢","6000","全台","中低收入戶","","","中低收入戶","","","未達低收入戶但生活困難者，每月補助金額依縣市不同","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["poor-cwid","兒童發展帳戶（CWID）","衛生福利部","低收入弱勢","15000","全台","低收入戶","","","低收入或中低收入戶","","有子女","政府每月存1,250元，家長配對同額，每年最高3萬元","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],

# ── 老年長照（12筆）──────────────────────────────────────
["elder-pension-basic","老年基本保證年金","勞保局","老年長照","4005","全台","國民年金被保險人","65","","","","","年滿65歲繳費年資滿一定年限，每月領基本年金","https://www.bli.gov.tw/","https://www.bli.gov.tw/",today],
["elder-mid-low","中低收入老人生活津貼","各縣市社會局","老年長照","7550","全台","老年人","65","","中低收入戶","","","65歲以上中低收入老人每月最高7,550元津貼","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["elder-ltc","長照2.0居家服務","衛生福利部","老年長照","40000","全台","老年人","65","","","","","失能老人居家照護費用補助，依失能等級補助1-4萬/月，撥打1966申請","https://1966.gov.tw/","https://1966.gov.tw/",today],
["elder-denture","老人假牙補助","各縣市衛生局","老年長照","7000","全台","老年人","65","","","","","65歲以上老人裝置假牙補助，每顆最高7,000元，在健保特約牙科申辦","https://www.hpa.gov.tw/","https://www.hpa.gov.tw/",today],
["elder-home-care","居家服務補助","衛生福利部","老年長照","190","全台","老年人","65","","","","","失能老人居家生活照顧，每小時最高190元，低收入戶免費","https://1966.gov.tw/","https://1966.gov.tw/",today],
["elder-meal","送餐到府服務","各縣市社會局","老年長照","60","全台","老年人","65","","","","獨居或行動不便","行動不便老人申請送餐服務，每餐最低自付60元","https://www.sfaa.gov.tw/","https://www.sfaa.gov.tw/",today],
["elder-respite","喘息服務補助","衛生福利部","老年長照","0","全台","一般民眾","","","","","有失能長者","照顧者申請喘息服務讓專業人員暫代照顧，減輕家屬負擔","https://1966.gov.tw/","https://1966.gov.tw/",today],
["elder-tpass","敬老TPASS乘車回饋","交通部","老年長照","18000","全台","老年人","65","","","","","持敬老卡搭大眾運輸自動回饋，每年最高省18,000元","https://www.motc.gov.tw/","https://www.motc.gov.tw/",today],
["elder-ltc-deduction","長照特別扣除額","財政部","老年長照","9000","全台","一般民眾","","","","","有失能長者","子女報稅時申報扶養失能長者，每人扣除額18萬，省稅9,000元以上","https://www.mof.gov.tw/","https://www.mof.gov.tw/",today],
["elder-health-check","老人免費成人健檢","衛生福利部","老年長照","0","全台","老年人","65","","","","","65歲以上每年免費成人健檢，含血壓、血糖、血脂、肝腎功能","https://www.hpa.gov.tw/","https://www.hpa.gov.tw/",today],
["elder-flu-vaccine","流感疫苗（老人公費）","衛生福利部","老年長照","0","全台","老年人","65","","","","","65歲以上每年秋冬公費流感疫苗，至各診所或衛生所接種","https://www.cdc.gov.tw/","https://www.cdc.gov.tw/",today],
["elder-pneumonia-vaccine","肺炎鏈球菌疫苗（老人）","衛生福利部","老年長照","0","全台","老年人","65","","","","","65歲以上一生接種一次公費肺炎鏈球菌疫苗","https://www.cdc.gov.tw/","https://www.cdc.gov.tw/",today],
]

with open("data/subsidies-v2.csv", "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(FIELDS)
    writer.writerows(rows)

print(f"第一批完成，共 {len(rows)} 筆 → data/subsidies-v2.csv")
