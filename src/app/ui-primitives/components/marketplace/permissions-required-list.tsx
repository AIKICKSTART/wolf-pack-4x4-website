import {
  CalendarClock,
  Eye,
  Mail,
  Pencil,
  Webhook,
  type LucideIcon,
} from "lucide-react"

import {
  PERMISSION_LABEL,
  PERMISSION_SENSITIVITY,
  type PermissionScope,
  type PermissionSensitivity,
} from "./marketplace-types"
import styles from "./permissions-required-list.module.css"

export interface PermissionsRequiredListProps {
  scopes: ReadonlyArray<PermissionScope>
  title?: string
  descriptions?: Partial<Record<PermissionScope, string>>
  className?: string
}

const PERMISSION_ICON: Record<PermissionScope, LucideIcon> = {
  "read-data": Eye,
  "write-data": Pencil,
  "send-email": Mail,
  "access-webhooks": Webhook,
  "run-on-schedule": CalendarClock,
}

const SENSITIVITY_TONE_CLASS: Record<PermissionSensitivity, string> = {
  low: styles.toneLow,
  medium: styles.toneMedium,
  high: styles.toneHigh,
}

const SENSITIVITY_LABEL: Record<PermissionSensitivity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
}

const DEFAULT_DESCRIPTIONS: Record<PermissionScope, string> = {
  "read-data": "Read workshop records, customer profiles, and quote history.",
  "write-data": "Mutate workshop records — create or update jobs, parts, customers.",
  "send-email": "Send transactional and marketing email on behalf of the workshop.",
  "access-webhooks": "Receive event callbacks from third parties — Stripe, Twilio, GitHub.",
  "run-on-schedule": "Execute background work on a cron — nightly invoice runs and syncs.",
}

export function PermissionsRequiredList({
  scopes,
  title = "Permissions required",
  descriptions,
  className,
}: PermissionsRequiredListProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {scopes.map((scope) => {
          const sensitivity = PERMISSION_SENSITIVITY[scope]
          const Icon = PERMISSION_ICON[scope]
          const description = descriptions?.[scope] ?? DEFAULT_DESCRIPTIONS[scope]
          return (
            <li
              key={scope}
              className={[styles.row, SENSITIVITY_TONE_CLASS[sensitivity]].join(" ")}
            >
              <span className={styles.icon} aria-hidden="true">
                <Icon size={15} strokeWidth={2.2} />
              </span>
              <div className={styles.label}>
                <span className={styles.labelTitle}>{PERMISSION_LABEL[scope]}</span>
                <span className={styles.labelDescription}>{description}</span>
              </div>
              <span className={styles.sensitivityChip}>{SENSITIVITY_LABEL[sensitivity]}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PermissionsRequiredList
