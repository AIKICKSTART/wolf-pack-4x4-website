"use client"

import { AlertOctagon, ChevronDown } from "lucide-react"
import { useId, useState } from "react"

import type { SdkChannel } from "./dev-experience-types"
import styles from "./sdk-version-selector.module.css"

export interface SdkVersionOption {
  /** Semver version, e.g. "3.4.0". */
  version: string
  /** Release channel chip — stable / beta / canary. */
  channel: SdkChannel
  /** Optional flag indicating this version contains breaking changes. */
  breaking?: boolean
}

export interface SdkVersionSelectorProps {
  /** Version options. Order is preserved in the menu. */
  options: ReadonlyArray<SdkVersionOption>
  /** Currently-selected version. */
  currentVersion: string
  /** Called when the user picks a version. */
  onSelect?: (version: string) => void
  /** Optional className passthrough. */
  className?: string
}

const CHANNEL_CLASS: Record<SdkChannel, string> = {
  stable: styles.channelStable,
  beta: styles.channelBeta,
  canary: styles.channelCanary,
}

const CHANNEL_LABEL: Record<SdkChannel, string> = {
  stable: "Stable",
  beta: "Beta",
  canary: "Canary",
}

export function SdkVersionSelector({
  options,
  currentVersion,
  onSelect,
  className,
}: SdkVersionSelectorProps) {
  const [open, setOpen] = useState<boolean>(false)
  const triggerId = useId()
  const menuId = `${triggerId}-menu`
  const current = options.find((o) => o.version === currentVersion) ?? options[0]
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  if (!current) {
    return null
  }

  const handlePick = (version: string): void => {
    onSelect?.(version)
    setOpen(false)
  }

  return (
    <div className={classes}>
      <button
        type="button"
        id={triggerId}
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.triggerLabel}>SDK</span>
        <span className={styles.triggerVersion}>v{current.version}</span>
        <span
          className={`${styles.triggerChannel} ${CHANNEL_CLASS[current.channel]}`}
        >
          {CHANNEL_LABEL[current.channel]}
        </span>
        {current.breaking ? (
          <span className={styles.breakingBadge}>
            <AlertOctagon size={12} strokeWidth={2.2} aria-hidden="true" />
            Breaking
          </span>
        ) : null}
        <ChevronDown
          size={14}
          strokeWidth={2.2}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul
          className={styles.menu}
          id={menuId}
          role="listbox"
          aria-labelledby={triggerId}
        >
          {options.map((opt) => {
            const selected = opt.version === current.version
            return (
              <li
                key={opt.version}
                role="option"
                aria-selected={selected}
                className={`${styles.option} ${selected ? styles.optionActive : ""}`}
              >
                <button
                  type="button"
                  className={styles.optionBtn}
                  onClick={() => handlePick(opt.version)}
                >
                  <span className={styles.optionVersion}>v{opt.version}</span>
                  <span
                    className={`${styles.optionChannel} ${CHANNEL_CLASS[opt.channel]}`}
                  >
                    {CHANNEL_LABEL[opt.channel]}
                  </span>
                  {opt.breaking ? (
                    <span className={styles.optionBreaking}>
                      <AlertOctagon
                        size={11}
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                      Breaking
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default SdkVersionSelector
