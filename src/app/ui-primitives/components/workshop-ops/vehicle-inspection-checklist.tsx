import { ClipboardCheckIcon } from "../icons/clipboard-check"
import {
  INSPECTION_RESULT_LABEL,
  INSPECTION_RESULT_TONE,
  type InspectionResult,
  type InspectionSection,
} from "./workshop-ops-types"

import styles from "./vehicle-inspection-checklist.module.css"

interface VehicleInspectionChecklistProps {
  vehicleLabel: string
  rego: string
  inspectorName: string
  inspectedAt: string
  sections: ReadonlyArray<InspectionSection>
  className?: string
}

const RESULT_GLYPH: Record<InspectionResult, string> = {
  pass: "✓",
  warn: "!",
  fail: "✕",
  skip: "–",
}

function summarise(sections: ReadonlyArray<InspectionSection>) {
  let pass = 0
  let warn = 0
  let fail = 0
  let skip = 0
  let total = 0
  for (const section of sections) {
    for (const item of section.items) {
      total += 1
      if (item.result === "pass") pass += 1
      else if (item.result === "warn") warn += 1
      else if (item.result === "fail") fail += 1
      else skip += 1
    }
  }
  return { pass, warn, fail, skip, total }
}

export function VehicleInspectionChecklist({
  vehicleLabel,
  rego,
  inspectorName,
  inspectedAt,
  sections,
  className,
}: VehicleInspectionChecklistProps) {
  const summary = summarise(sections)
  const classes = [styles.panel, className].filter(Boolean).join(" ")
  const overallTone: InspectionResult =
    summary.fail > 0 ? "fail" : summary.warn > 0 ? "warn" : "pass"

  return (
    <section className={classes} aria-label={`Inspection sheet for ${vehicleLabel}`}>
      <header className={styles.head}>
        <div className={styles.headIdentity}>
          <span className={styles.kicker}>Pre-service inspection</span>
          <h3 className={styles.title}>
            <span className={styles.titleGlyph} aria-hidden="true">
              <ClipboardCheckIcon size={20} tone="amber" motion="none" />
            </span>
            {vehicleLabel}
          </h3>
          <span className={styles.regoPlate}>{rego}</span>
        </div>
        <div className={styles.headMeta}>
          <span className={styles.metaLabel}>Inspector</span>
          <span className={styles.metaValue}>{inspectorName}</span>
          <span className={styles.metaSub}>
            <time>{inspectedAt}</time>
          </span>
        </div>
        <div
          className={styles.overall}
          data-result={overallTone}
          aria-label={`Overall: ${INSPECTION_RESULT_LABEL[overallTone]}`}
        >
          <span className={styles.overallGlyph} aria-hidden="true">
            {RESULT_GLYPH[overallTone]}
          </span>
          <span className={styles.overallLabel}>
            {INSPECTION_RESULT_LABEL[overallTone]}
          </span>
        </div>
      </header>

      <ul className={styles.tally} aria-label="Inspection tally">
        <li data-tone="green">
          <strong>{summary.pass}</strong>
          <span>Pass</span>
        </li>
        <li data-tone="amber">
          <strong>{summary.warn}</strong>
          <span>Watch</span>
        </li>
        <li data-tone="red">
          <strong>{summary.fail}</strong>
          <span>Fail</span>
        </li>
        <li data-tone="neutral">
          <strong>{summary.skip}</strong>
          <span>N/A</span>
        </li>
      </ul>

      <div className={styles.sections}>
        {sections.map((section) => (
          <section key={section.id} className={styles.section}>
            <header className={styles.sectionHead}>
              <span className={styles.sectionLabel}>{section.label}</span>
              <span className={styles.sectionCount}>
                {section.items.length} items
              </span>
            </header>
            <ul className={styles.itemList}>
              {section.items.map((item) => {
                const tone = INSPECTION_RESULT_TONE[item.result]
                return (
                  <li
                    key={item.id}
                    className={styles.item}
                    data-tone={tone}
                  >
                    <span
                      className={styles.itemGlyph}
                      aria-label={INSPECTION_RESULT_LABEL[item.result]}
                    >
                      {RESULT_GLYPH[item.result]}
                    </span>
                    <div className={styles.itemBody}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.note ? (
                        <span className={styles.itemNote}>{item.note}</span>
                      ) : null}
                    </div>
                    <span className={styles.itemTag}>
                      {INSPECTION_RESULT_LABEL[item.result]}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}

export default VehicleInspectionChecklist
