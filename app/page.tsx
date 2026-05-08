import PersonaTabs from "@/app/components/PersonaTabs"

export default function Home() {
  return (
    <div className="wrap">
      <div className="intro">
        <div className="intro-headline">
          他們每年多領了這些錢
          <br />
          你的條件跟誰最像？
        </div>
        <div className="intro-sub">
          找到跟你最像的情境，看看實際能領到多少。
        </div>
      </div>

      <PersonaTabs />
    </div>
  )
}
