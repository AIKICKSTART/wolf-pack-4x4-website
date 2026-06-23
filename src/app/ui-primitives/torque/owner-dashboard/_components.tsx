/**
 * Co-located composition pieces for the Owner business command centre.
 *
 * These are thin presentational wrappers that arrange EXISTING primitives plus
 * a small amount of bespoke brand chrome (the Torque greeting band, the quick-
 * action grid, the SEO/social channel rows). No primitive is modified here.
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque".
 */

import { SignalStrength } from "../../components/charts/signal-strength"
import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  QUICK_ACTIONS,
  TODAY_LABEL,
  type ChannelStatus,
  type QuickAction,
} from "./_demo-data"
import styles from "./owner-dashboard.module.css"

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
    <span className={styles.torqueAvatar} role="img" aria-label="Torque, your Mufflermen business assistant">
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
      <span className={styles.quickHead}>Ask Torque to…</span>
      <div className={styles.quickGrid} role="group" aria-label="Quick actions for Torque">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`${styles.quickAction} ${TONE_CLASS[action.tone]}`}
          >
            <span className={styles.quickGlyph} aria-hidden="true">
              {action.glyph}
            </span>
            <span className={styles.quickText}>
              <span className={styles.quickTitle}>{action.title}</span>
              <span className={styles.quickHint}>{action.hint}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** Hero greeting band: Torque avatar + welcome copy + live meta + quick actions. */
export function GreetingBand() {
  return (
    <section className={styles.greeting} aria-labelledby="owner-greeting-title">
      <div className={styles.greetingMain}>
        <div className={styles.greetingHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <h1 id="owner-greeting-title" className={styles.greetingTitle}>
          Morning, boss. <em>{BUSINESS_NAME}</em> is humming today.
        </h1>
        <p className={styles.greetingCopy}>
          Fourteen jobs on the board, three bays full of exhaust work, and the call-backs are
          almost clear. I&apos;ve replied to a fresh 5-star review, drafted the Patrol quote, and
          queued today&apos;s Raptor build reel for the socials. Tell me what to chase next.
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

interface ChannelRowsProps {
  channels: ReadonlyArray<ChannelStatus>
}

/** Social / SEO posture rows, each anchored by a SignalStrength meter primitive. */
export function ChannelRows({ channels }: ChannelRowsProps) {
  return (
    <ul className={styles.channelList} aria-label="Marketing and SEO channel health">
      {channels.map((channel) => (
        <li key={channel.id} className={styles.channelRow}>
          <SignalStrength
            level={channel.level}
            tone={channel.tone}
            size={26}
            ariaLabel={`${channel.channel}: signal ${channel.level} of 5`}
          />
          <span className={styles.channelText}>
            <span className={styles.channelName}>{channel.channel}</span>
            <span className={styles.channelDetail}>{channel.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
