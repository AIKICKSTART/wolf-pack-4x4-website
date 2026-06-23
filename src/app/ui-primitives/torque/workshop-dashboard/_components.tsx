/**
 * Co-located composition pieces for the Workshop manager home screen.
 *
 * Thin presentational wrappers arranging EXISTING primitives plus a little
 * bespoke brand chrome (the Torque manager greeting band and the quick-action
 * grid). No primitive is modified here.
 *
 * Dev-only note: the assistant brand surfaced to the manager is always "Torque".
 */

import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  QUICK_ACTIONS,
  TODAY_LABEL,
  type QuickAction,
} from "./_demo-data"
import styles from "./workshop-dashboard.module.css"

const TONE_CLASS: Record<QuickAction["tone"], string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

/** Placeholder circular Torque avatar — brand-red gradient, initial "T".
 *  Real mascot art lands later. */
export function TorqueAvatar() {
  return (
    <span
      className={styles.torqueAvatar}
      role="img"
      aria-label="Torque, your Mufflermen business assistant"
    >
      <span aria-hidden="true">T</span>
    </span>
  )
}

interface QuickActionsProps {
  actions?: ReadonlyArray<QuickAction>
}

export function QuickActions({ actions = QUICK_ACTIONS }: QuickActionsProps) {
  return (
    <div className={styles.quickPanel}>
      <span className={styles.quickHead}>Run the floor — ask Torque to…</span>
      <div className={styles.quickGrid} role="group" aria-label="Quick actions for Torque">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`${styles.quickAction} ${TONE_CLASS[action.tone]}`}
          >
            <span className={styles.quickGlyph} aria-hidden="true">
              {action.glyph}
            </span>
            <span className={styles.quickText}>
              <span className={styles.quickTitle}>{action.title}</span>
              <span className={styles.quickHint}>{action.hint}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Manager greeting band: Torque avatar + cockpit copy + live meta + quick actions. */
export function GreetingBand() {
  return (
    <section className={styles.greeting} aria-labelledby="manager-greeting-title">
      <div className={styles.greetingMain}>
        <div className={styles.greetingHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <h1 id="manager-greeting-title" className={styles.greetingTitle}>
          The floor at <em>{BUSINESS_NAME}</em> is running hot.
        </h1>
        <p className={styles.greetingCopy}>
          Fourteen jobs on the board and the bays are at 88%. Bay 3 is stalled waiting on 2.5″
          bends — I&apos;ve raised the reorder and put Sticks onto quoting. The Mazda is signed off
          and ready, and I&apos;ve balanced tomorrow&apos;s run sheet around Pricey being off. Tell
          me where to push next.
        </p>
        <p className={styles.greetingMeta}>
          <span className={styles.metaDot}>Workshop open · 7:30am–5pm</span>
          <span>{TODAY_LABEL}</span>
          <span>{BUSINESS_REGION}</span>
        </p>
      </div>
      <QuickActions />
    </section>
  )
}
