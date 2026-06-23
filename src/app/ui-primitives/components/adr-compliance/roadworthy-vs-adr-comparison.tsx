import {
  ComparisonTable,
  type ComparisonColumn,
  type ComparisonRow,
} from "../data-display/comparison-table"

import styles from "./roadworthy-vs-adr-comparison.module.css"

interface RoadworthyVsAdrComparisonProps {
  /** Optional kicker, default "Side-by-side · scope of compliance". */
  kicker?: string
  /** Optional heading. */
  heading?: string
  /** Optional body copy. */
  body?: string
  /** Override default rows. */
  rows?: ReadonlyArray<ComparisonRow>
  /** Override default columns. */
  columns?: ReadonlyArray<ComparisonColumn>
  className?: string
}

const DEFAULT_COLUMNS: ReadonlyArray<ComparisonColumn> = [
  {
    id: "roadworthy",
    name: "NSW roadworthy",
    caption: "State-level safety inspection",
  },
  {
    id: "adr",
    name: "ADR national",
    caption: "Australian Design Rules",
    popular: true,
  },
]

const DEFAULT_ROWS: ReadonlyArray<ComparisonRow> = [
  {
    feature: "Sound emissions",
    description: "Stationary close-proximity test",
    values: ["Cabin-only check", "check"],
  },
  {
    feature: "Emission control system",
    description: "Cat-converter + O2 sensor",
    values: ["Visual only", "check"],
  },
  {
    feature: "Drive-by noise test",
    description: "7.5 m roadside protocol",
    values: ["cross", "check"],
  },
  {
    feature: "VIN + chassis verification",
    description: "Identification stamp checked",
    values: ["check", "check"],
  },
  {
    feature: "Modification certification",
    description: "Engineer / VSI 14 sign-off",
    values: ["State engineer", "ADR cert"],
  },
  {
    feature: "Issued by",
    description: "Authority responsible",
    values: ["AUVIS station", "Authorised workshop"],
  },
  {
    feature: "Re-test interval",
    description: "Frequency of re-check",
    values: ["Annual rego", "On modification"],
  },
]

export function RoadworthyVsAdrComparison({
  kicker = "Side-by-side · scope of compliance",
  heading = "NSW roadworthy vs ADR national",
  body = "The pink slip and the federal ADR programme cover different ground. Customers often think a roadworthy ticks every box — it doesn’t.",
  rows,
  columns,
  className,
}: RoadworthyVsAdrComparisonProps) {
  return (
    <section
      className={`${styles.wrap} ${className ?? ""}`.trim()}
      aria-label={heading}
    >
      <span className={styles.kicker}>{kicker}</span>
      <h3 className={styles.heading}>{heading}</h3>
      <p className={styles.body}>{body}</p>
      <ComparisonTable
        columns={columns ?? DEFAULT_COLUMNS}
        rows={rows ?? DEFAULT_ROWS}
        caption="Roadworthy versus ADR national scope of compliance"
      />
    </section>
  )
}

export default RoadworthyVsAdrComparison
