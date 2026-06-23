import {
  TEMPLATE_KIND_LABEL,
  type TemplateKind,
  type TemplatePickItem,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./template-pick-grid.module.css"

export interface TemplatePickGridProps {
  /** Eyebrow eg "Starter / Templates". */
  kicker: string
  /** Big title eg "Pick a starter template". */
  title: string
  /** Supporting paragraph. */
  description: string
  /** Templates to render. */
  templates: ReadonlyArray<TemplatePickItem>
  /** Selected template id. */
  selectedId?: string
  className?: string
}

const KIND_TONE: Record<TemplateKind, string> = {
  workshop: shell.toneRed,
  "parts-retailer": shell.toneAmber,
  "fleet-manager": shell.toneTeal,
}

export function TemplatePickGrid({
  kicker,
  title,
  description,
  templates,
  selectedId,
  className,
}: TemplatePickGridProps) {
  const classes = [shell.shell, styles.grid, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={shell.shellHead}>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={shell.title}>{title}</h2>
        <p className={shell.subtitle}>{description}</p>
      </header>

      <ul className={styles.cards}>
        {templates.map((template) => {
          const selected = template.id === selectedId
          return (
            <li key={template.id}>
              <article
                className={[
                  styles.card,
                  KIND_TONE[template.kind],
                  selected ? styles.cardSelected : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`${template.title} template${selected ? " — selected" : ""}`}
                data-selected={selected ? "true" : "false"}
              >
                <header className={styles.cardHead}>
                  <span className={styles.thumb} aria-hidden="true">
                    {template.glyph}
                  </span>
                  <div className={styles.cardIdentity}>
                    <span className={[shell.chip, KIND_TONE[template.kind]].join(" ")}>
                      {TEMPLATE_KIND_LABEL[template.kind]}
                    </span>
                    {template.recommended ? (
                      <span className={[shell.chip, shell.toneGreen].join(" ")}>
                        Recommended
                      </span>
                    ) : null}
                  </div>
                </header>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{template.title}</h3>
                  <p className={styles.cardDescription}>{template.description}</p>
                  <ul className={styles.featureList}>
                    {template.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <footer className={styles.cardFoot}>
                  <button
                    type="button"
                    className={[
                      shell.button,
                      selected ? shell.buttonPrimary : shell.buttonGhost,
                    ].join(" ")}
                  >
                    {selected ? "Selected ✓" : "Pick this template"}
                  </button>
                </footer>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TemplatePickGrid
