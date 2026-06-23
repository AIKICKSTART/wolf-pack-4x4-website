import styles from "./accessibility-contrast-grid.module.css"

export interface ContrastColor {
  id: string
  label: string
  hex: string
}

export interface ContrastCellResult {
  ratio: number
  level: "AAA" | "AA" | "AA-large" | "fail"
}

export interface AccessibilityContrastGridProps {
  foregrounds: ReadonlyArray<ContrastColor>
  backgrounds: ReadonlyArray<ContrastColor>
  results: ReadonlyArray<ReadonlyArray<ContrastCellResult>>
}

const LEVEL_LABEL: Record<ContrastCellResult["level"], string> = {
  AAA: "Passes AAA",
  AA: "Passes AA",
  "AA-large": "Passes AA for large text only",
  fail: "Fails WCAG",
}

const LEVEL_SHORT: Record<ContrastCellResult["level"], string> = {
  AAA: "AAA",
  AA: "AA",
  "AA-large": "AA·L",
  fail: "FAIL",
}

export function AccessibilityContrastGrid({
  foregrounds,
  backgrounds,
  results,
}: AccessibilityContrastGridProps) {
  return (
    <section className={styles.wrapper} aria-label="WCAG contrast grid">
      <header className={styles.head}>
        <span className={styles.kicker}>Contrast grid</span>
        <h3 className={styles.title}>WCAG pass-fail at a glance</h3>
        <p className={styles.lede}>
          Each cell compares a foreground colour against a background colour. The badge tells you whether the
          pairing passes AAA, AA, AA for large text only, or fails.
        </p>
      </header>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `minmax(120px, 1fr) repeat(${backgrounds.length}, minmax(0, 1fr))` }}
        role="table"
        aria-label="Contrast results"
      >
        <div role="row" className={styles.row}>
          <div role="columnheader" className={`${styles.cell} ${styles.headerCell}`}>
            Fg \\ Bg
          </div>
          {backgrounds.map((bg) => (
            <div
              key={bg.id}
              role="columnheader"
              className={`${styles.cell} ${styles.headerCell}`}
            >
              <span className={styles.headerSwatch} style={{ background: bg.hex }} aria-hidden="true" />
              {bg.label}
            </div>
          ))}
        </div>
        {foregrounds.map((fg, rowIndex) => (
          <div role="row" key={fg.id} className={styles.row}>
            <div role="rowheader" className={`${styles.cell} ${styles.headerCell}`}>
              <span className={styles.headerSwatch} style={{ background: fg.hex }} aria-hidden="true" />
              {fg.label}
            </div>
            {backgrounds.map((bg, colIndex) => {
              const result = results[rowIndex]?.[colIndex]
              if (!result) {
                return (
                  <div
                    role="cell"
                    key={bg.id}
                    className={styles.cell}
                    aria-label="No data"
                  />
                )
              }
              return (
                <div
                  role="cell"
                  key={bg.id}
                  className={`${styles.cell} ${styles[`level-${result.level}`]}`}
                  style={{ background: bg.hex, color: fg.hex }}
                  aria-label={`${fg.label} on ${bg.label}, contrast ratio ${result.ratio.toFixed(2)} to 1: ${LEVEL_LABEL[result.level]}`}
                >
                  <span className={styles.ratio}>{`${result.ratio.toFixed(2)}:1`}</span>
                  <span className={styles.chip}>{LEVEL_SHORT[result.level]}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
