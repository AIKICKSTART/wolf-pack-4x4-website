import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LangSwitcherTabs } from "../../components/dev-experience"
import type { LangSample } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Lang switcher tabs | UI Primitives — Dev experience",
}

const QUOTE_SAMPLES: ReadonlyArray<LangSample> = [
  {
    language: "typescript",
    fileName: "quote.ts",
    code: `import { Mufflermen } from "@mufflermen/sdk"

const muff = new Mufflermen({ apiKey: process.env.MUFFLERMEN_API_KEY })

const quote = await muff.quotes.create({
  vehicleId: "veh_2026_ford_ranger_xl",
  partIds: ["part_extractor_xforce_4cyl"],
  bayId: "bay_oak_flats_03",
})

console.log(quote.id, quote.totalAud)`,
  },
  {
    language: "javascript",
    fileName: "quote.mjs",
    code: `import { Mufflermen } from "@mufflermen/sdk"

const muff = new Mufflermen({ apiKey: process.env.MUFFLERMEN_API_KEY })

const quote = await muff.quotes.create({
  vehicleId: "veh_2026_ford_ranger_xl",
  partIds: ["part_extractor_xforce_4cyl"],
  bayId: "bay_oak_flats_03",
})

console.log(quote.id, quote.totalAud)`,
  },
  {
    language: "python",
    fileName: "quote.py",
    code: `from mufflermen import Mufflermen

muff = Mufflermen(api_key=os.environ["MUFFLERMEN_API_KEY"])

quote = muff.quotes.create(
    vehicle_id="veh_2026_ford_ranger_xl",
    part_ids=["part_extractor_xforce_4cyl"],
    bay_id="bay_oak_flats_03",
)

print(quote.id, quote.total_aud)`,
  },
  {
    language: "go",
    fileName: "quote.go",
    code: `client := mufflermen.NewClient(os.Getenv("MUFFLERMEN_API_KEY"))

quote, err := client.Quotes.Create(ctx, &mufflermen.QuoteInput{
    VehicleID: "veh_2026_ford_ranger_xl",
    PartIDs:   []string{"part_extractor_xforce_4cyl"},
    BayID:     "bay_oak_flats_03",
})
if err != nil {
    log.Fatal(err)
}

fmt.Println(quote.ID, quote.TotalAUD)`,
  },
  {
    language: "ruby",
    fileName: "quote.rb",
    code: `require "mufflermen"

muff = Mufflermen::Client.new(api_key: ENV["MUFFLERMEN_API_KEY"])

quote = muff.quotes.create(
  vehicle_id: "veh_2026_ford_ranger_xl",
  part_ids: ["part_extractor_xforce_4cyl"],
  bay_id: "bay_oak_flats_03"
)

puts quote.id, quote.total_aud`,
  },
  {
    language: "curl",
    fileName: "quote.sh",
    code: `curl -X POST https://api.mufflermen.com/v1/quotes \\
  -H "Authorization: Bearer $MUFFLERMEN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vehicle_id": "veh_2026_ford_ranger_xl",
    "part_ids": ["part_extractor_xforce_4cyl"],
    "bay_id": "bay_oak_flats_03"
  }'`,
  },
]

export default function LangSwitcherTabsPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 03"
        title="Lang switcher tabs"
        description="Multi-language code switcher — TypeScript / JavaScript / Python / Go / Ruby / cURL. Each tab is a fully rendered code-block."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Lang switcher tabs" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>quotes.create — six SDK languages</span>
          <LangSwitcherTabs
            samples={QUOTE_SAMPLES}
            title="Create an instant quote"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Tab list uses <code>role=&quot;tablist&quot;</code>; each language tab carries{" "}
            <code>aria-selected</code> + <code>tabIndex</code> so keyboard users can arrow
            through. The active panel is the only one rendered — the surrounding code-block
            primitive provides its own copy + line-number affordances.
          </p>
        </div>
      </section>
    </main>
  )
}
