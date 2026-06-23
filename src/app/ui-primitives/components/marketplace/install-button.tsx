"use client"

import { CheckCircle2, Download, Loader2, RefreshCw, Trash2 } from "lucide-react"
import type { ReactNode } from "react"

import type { InstallState } from "./marketplace-types"
import styles from "./install-button.module.css"

export interface InstallButtonProps {
  state: InstallState
  onAction?: (state: InstallState) => void
  pluginName?: string
  disabled?: boolean
  label?: string
  className?: string
}

const STATE_LABEL: Record<InstallState, string> = {
  install: "Install",
  installing: "Installing…",
  installed: "Installed",
  "update-available": "Update available",
  uninstall: "Uninstall",
}

const STATE_TONE_CLASS: Record<InstallState, string> = {
  install: styles.toneInstall,
  installing: styles.toneInstalling,
  installed: styles.toneInstalled,
  "update-available": styles.toneUpdate,
  uninstall: styles.toneUninstall,
}

function StateIcon({ state }: { state: InstallState }): ReactNode {
  const iconProps = { size: 14, strokeWidth: 2.4, "aria-hidden": true } as const
  switch (state) {
    case "install":
      return <Download {...iconProps} />
    case "installing":
      return <Loader2 {...iconProps} className={styles.spin} />
    case "installed":
      return <CheckCircle2 {...iconProps} />
    case "update-available":
      return <RefreshCw {...iconProps} />
    case "uninstall":
      return <Trash2 {...iconProps} />
  }
}

export function InstallButton({
  state,
  onAction,
  pluginName,
  disabled,
  label,
  className,
}: InstallButtonProps) {
  const isInstalling = state === "installing"
  const isDisabled = disabled || isInstalling
  const buttonLabel = label ?? STATE_LABEL[state]
  const classes = [styles.button, STATE_TONE_CLASS[state], className]
    .filter(Boolean)
    .join(" ")

  const ariaLive = pluginName
    ? `${buttonLabel} — ${pluginName}`
    : buttonLabel

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={isInstalling || undefined}
      aria-live="polite"
      role="status"
      onClick={() => onAction?.(state)}
    >
      <span className={styles.icon}>
        <StateIcon state={state} />
      </span>
      <span>{buttonLabel}</span>
      <span className={styles.srOnly}>{ariaLive}</span>
    </button>
  )
}

export default InstallButton
