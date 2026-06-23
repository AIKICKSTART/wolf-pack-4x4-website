import {
  INTEGRATION_STATUS_LABEL,
  INTEGRATION_STATUS_TONE,
  type IntegrationStepRow,
  type IntegrationVendor,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./integration-wizard-row.module.css"

export interface IntegrationWizardRowProps {
  row: IntegrationStepRow
  /** Action label override eg "Connect Stripe AU". */
  actionLabel?: string
  className?: string
}

const VENDOR_GLYPH: Record<IntegrationVendor, string> = {
  stripe: "$",
  twilio: "☎",
  shopify: "S",
  myob: "M",
  xero: "X",
  google: "G",
}

const VENDOR_TONE: Record<IntegrationVendor, "red" | "amber" | "teal" | "green" | "neutral" | "violet"> = {
  stripe: "violet",
  twilio: "red",
  shopify: "green",
  myob: "teal",
  xero: "teal",
  google: "amber",
}

const TONE_CLASS = {
  red: shell.toneRed,
  amber: shell.toneAmber,
  teal: shell.toneTeal,
  green: shell.toneGreen,
  neutral: shell.toneNeutral,
  violet: shell.toneViolet,
} as const

function actionLabelFor(row: IntegrationStepRow, override?: string): string {
  if (override) {
    return override
  }
  switch (row.status) {
    case "connected":
      return "Manage →"
    case "connecting":
      return "Cancel"
    case "needs-attention":
      return "Resolve →"
    default:
      return `Connect ${row.label} →`
  }
}

export function IntegrationWizardRow({
  row,
  actionLabel,
  className,
}: IntegrationWizardRowProps) {
  const statusTone = INTEGRATION_STATUS_TONE[row.status]
  const vendorTone = VENDOR_TONE[row.vendor]
  const classes = [
    shell.shell,
    TONE_CLASS[statusTone],
    styles.row,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const ctaLabel = actionLabelFor(row, actionLabel)
  const hasAction = Boolean(row.connectHref) && row.status !== "connecting"

  return (
    <article className={classes} aria-label={`${row.label} integration step`}>
      <div className={styles.lead}>
        <span
          className={[
            styles.vendorMark,
            TONE_CLASS[vendorTone],
          ].join(" ")}
          aria-hidden="true"
        >
          {VENDOR_GLYPH[row.vendor]}
        </span>
        <div className={styles.copy}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{row.label}</h3>
            {row.required ? (
              <span className={[shell.chip, shell.toneRed].join(" ")}>Required</span>
            ) : (
              <span className={[shell.chip, shell.chipQuiet].join(" ")}>Optional</span>
            )}
          </div>
          <p className={styles.description}>{row.description}</p>
          {row.region ? (
            <span className={[styles.region, shell.mono].join(" ")}>{row.region}</span>
          ) : null}
        </div>
      </div>

      <div className={styles.trail}>
        <span
          className={[shell.chip, TONE_CLASS[statusTone]].join(" ")}
          aria-label={`Status ${INTEGRATION_STATUS_LABEL[row.status]}`}
        >
          {INTEGRATION_STATUS_LABEL[row.status]}
        </span>
        <a
          className={[
            shell.button,
            row.status === "connected" ? shell.buttonGhost : shell.buttonPrimary,
          ].join(" ")}
          href={hasAction ? row.connectHref : undefined}
          aria-disabled={hasAction ? undefined : "true"}
          data-disabled={hasAction ? undefined : "true"}
        >
          {ctaLabel}
        </a>
      </div>
    </article>
  )
}

export default IntegrationWizardRow
