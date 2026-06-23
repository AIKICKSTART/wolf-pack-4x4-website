import styles from "./mobile-status-bar.module.css"

export type StatusBarTone = "light" | "dark"
export type StatusBarCarrier = "5G" | "4G" | "LTE" | "Wi-Fi"

interface MobileStatusBarProps {
  time?: string
  carrier?: StatusBarCarrier
  battery?: number
  tone?: StatusBarTone
  className?: string
}

function BatteryGlyph({ level }: { level: number }) {
  const fillWidth = Math.max(2, Math.min(18, Math.round(level / 100 * 18)))
  return (
    <svg
      viewBox="0 0 26 12"
      width="24"
      height="12"
      role="img"
      aria-label={`Battery ${Math.round(level)}%`}
    >
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="11"
        rx="2.5"
        ry="2.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      <rect x="23" y="3.5" width="2" height="5" rx="1" ry="1" fill="currentColor" fillOpacity="0.5" />
      <rect x="2" y="2" width={fillWidth} height="8" rx="1.5" ry="1.5" fill="currentColor" />
    </svg>
  )
}

function SignalGlyph() {
  return (
    <svg viewBox="0 0 18 12" width="18" height="12" aria-hidden="true">
      <rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
      <rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

function WifiGlyph() {
  return (
    <svg viewBox="0 0 18 14" width="18" height="14" aria-hidden="true">
      <path
        d="M9 13l-2-2.4a3 3 0 0 1 4 0L9 13Z"
        fill="currentColor"
      />
      <path
        d="M9 8.5c-1.7 0-3.3.6-4.5 1.8L3 8.7c1.6-1.6 3.7-2.5 6-2.5s4.4.9 6 2.5l-1.5 1.6A6.3 6.3 0 0 0 9 8.5Z"
        fill="currentColor"
      />
      <path
        d="M9 3.5c-2.8 0-5.4 1-7.4 2.9L0 4.8C2.4 2.5 5.6 1.2 9 1.2s6.6 1.3 9 3.6l-1.6 1.6A10.5 10.5 0 0 0 9 3.5Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  )
}

const TONE_CLASS: Record<StatusBarTone, string> = {
  light: styles.toneLight,
  dark: styles.toneDark,
}

export function MobileStatusBar({
  time = "9:41",
  carrier = "5G",
  battery = 86,
  tone = "light",
  className,
}: MobileStatusBarProps) {
  const classes = [styles.bar, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  return (
    <div className={classes} role="presentation">
      <span className={styles.time}>{time}</span>
      <span className={styles.cluster}>
        {carrier === "Wi-Fi" ? <WifiGlyph /> : (
          <>
            <SignalGlyph />
            <span className={styles.carrier}>{carrier}</span>
          </>
        )}
        <BatteryGlyph level={battery} />
      </span>
    </div>
  )
}

export default MobileStatusBar
