import styles from "../ui-primitives.module.css"

interface SignalBarsProps {
  count?: number
  active?: number
  label: string
}

export function SignalBars({ count = 7, active = 5, label }: SignalBarsProps) {
  const bars = Array.from({ length: count }, (_, index) => index)

  return (
    <div className={styles.signal} aria-label={label}>
      <span className={styles.kicker}>{label}</span>
      <div className={styles.signalRow}>
        {bars.map((bar) => (
          <span key={bar} data-on={bar < active ? "true" : "false"} />
        ))}
      </div>
    </div>
  )
}
