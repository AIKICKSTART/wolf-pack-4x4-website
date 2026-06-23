import { RadialMeter } from "../charts/radial-meter"
import { Chip } from "../primitives/chip"

import styles from "./worker-autoscale-meter.module.css"

interface WorkerAutoscaleMeterProps {
  /** Current pod count. */
  current: number
  /** Target pod count (after autoscale decides). */
  target: number
  /** Maximum the autoscaler may scale to (upper bound for the meter). */
  ceiling: number
  /** Scale-out cooldown — human-formatted (e.g. "30s"). */
  scaleOutCooldown: string
  /** Scale-in cooldown — human-formatted (e.g. "5m"). */
  scaleInCooldown: string
  className?: string
}

function autoscaleTone(current: number, target: number): "teal" | "amber" | "green" {
  if (current === target) return "green"
  if (current < target) return "amber"
  return "teal"
}

function autoscaleVerb(current: number, target: number): string {
  if (current === target) return "Steady"
  if (current < target) return "Scaling out"
  return "Scaling in"
}

export function WorkerAutoscaleMeter({
  current,
  target,
  ceiling,
  scaleOutCooldown,
  scaleInCooldown,
  className,
}: WorkerAutoscaleMeterProps) {
  const tone = autoscaleTone(current, target)
  const verb = autoscaleVerb(current, target)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={ceiling}
      aria-valuenow={current}
      aria-label={`Worker autoscale: ${current} of ${ceiling} pods, target ${target}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Autoscale</span>
        <h3 className={styles.title}>{verb}</h3>
      </header>
      <RadialMeter
        value={current}
        max={ceiling}
        label="pods"
        tone={tone}
        ariaLabel={`${current} of ${ceiling} pods running`}
        unit=""
        caption={`Target ${target}`}
      />
      <dl className={styles.cooldowns}>
        <div>
          <dt>Scale-out</dt>
          <dd>
            <Chip label={scaleOutCooldown} tone="teal" />
          </dd>
        </div>
        <div>
          <dt>Scale-in</dt>
          <dd>
            <Chip label={scaleInCooldown} tone="amber" />
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default WorkerAutoscaleMeter
