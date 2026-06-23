import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import {
  TORQUE_STATE_PHRASE,
  TorqueMascot,
  TorqueMascotBadge,
  type TorqueMascotSize,
  type TorqueMascotState,
} from "../components/torque-mascot"
import styles from "./torque-mascot-showcase.module.css"

export const metadata: Metadata = {
  title: "Torque mascot | UI Primitives",
}

const STATES: ReadonlyArray<{
  state: TorqueMascotState
  title: string
  copy: string
}> = [
  { state: "idle", title: "Idle", copy: "G'day — ask me to book a service or write a post." },
  { state: "thinking", title: "Thinking", copy: "Working out the best quote for that cat-back." },
  { state: "typing", title: "Typing", copy: "Drafting the customer's booking confirmation." },
  { state: "working", title: "Working", copy: "Updating the Hoist 03 job card right now." },
  { state: "analysing", title: "Analysing", copy: "Reading last month's bay throughput." },
  { state: "generating", title: "Generating", copy: "Spinning up three Facebook ad variants." },
  { state: "deploying", title: "Deploying", copy: "Publishing the new exhaust services page." },
  { state: "approval", title: "Approval", copy: "Ready to send — give me the nod, boss." },
  { state: "warning", title: "Warning", copy: "Heads up: that part is out of stock." },
  { state: "success", title: "Success", copy: "Done — booking locked in for Thursday." },
]

const SIZES: ReadonlyArray<{ size: TorqueMascotSize; label: string }> = [
  { size: "sm", label: "sm · 52" },
  { size: "md", label: "md · 84" },
  { size: "lg", label: "lg · 120" },
  { size: "xl", label: "xl · 176" },
]

const BADGE_STATES: ReadonlyArray<TorqueMascotState> = [
  "thinking",
  "working",
  "approval",
  "warning",
  "success",
]

function StateGrid() {
  return (
    <div className={styles.stateGrid} role="list" aria-label="Torque assistant states">
      {STATES.map(({ state, title, copy }) => (
        <article key={state} className={styles.stateCard} role="listitem">
          <div className={styles.stage}>
            <TorqueMascot state={state} size="lg" label="Torque" />
          </div>
          <div className={styles.stateMeta}>
            <span className={styles.stateName}>{title}</span>
            <code className={styles.stateToken}>{state}</code>
          </div>
          <p className={styles.stateCopy}>{copy}</p>
        </article>
      ))}
    </div>
  )
}

export default function TorqueMascotPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Chrome / Torque mascot"
        title="Torque — your Mufflermen business assistant"
        description="A chrome-and-matte mechanic-robot avatar that gives the customer-facing AI a face. Ten assistant states, each with its own motion, tuned for both themes and respectful of reduced-motion."
      />

      {/* Hero — big avatar + intro badge */}
      <section className={styles.hero} aria-labelledby="torque-hero-title">
        <div className={styles.heroVisual}>
          <TorqueMascot state="idle" size="xl" label="Torque" />
        </div>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Meet Torque</span>
          <h2 id="torque-hero-title">One message in. The shop gets it done.</h2>
          <p>
            Torque is the friendly mechanic-bot the owner and customers talk to. The avatar
            mirrors what the assistant is actually doing — thinking, building an ad, deploying a
            page, or waiting on a sign-off — so the state of the system is never a mystery.
          </p>
          <div className={styles.badgeRow}>
            <TorqueMascotBadge state="thinking" label="Torque" />
            <TorqueMascotBadge state="generating" label="Torque" />
          </div>
        </div>
      </section>

      {/* All ten states */}
      <section className={styles.section} aria-labelledby="torque-states-title">
        <div className={styles.panelTitle}>
          <span className={styles.kicker}>State matrix</span>
          <h2 id="torque-states-title">All ten assistant states</h2>
          <p>Each pose is distinct at a glance and animates on transform/opacity only.</p>
        </div>
        <StateGrid />
      </section>

      {/* Sizes */}
      <section className={styles.section} aria-labelledby="torque-sizes-title">
        <div className={styles.panelTitle}>
          <span className={styles.kicker}>Sizing</span>
          <h2 id="torque-sizes-title">Four sizes, one character</h2>
          <p>From inline chat chips to a hero greeting — the ring scales with the body.</p>
        </div>
        <div className={styles.sizeRow}>
          {SIZES.map(({ size, label }) => (
            <figure key={size} className={styles.sizeItem}>
              <TorqueMascot state="working" size={size} label="Torque" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Light + dark parity */}
      <section className={styles.section} aria-labelledby="torque-theme-title">
        <div className={styles.panelTitle}>
          <span className={styles.kicker}>Theme parity</span>
          <h2 id="torque-theme-title">Intentional in light and dark</h2>
          <p>The same five states rendered against both canonical token themes.</p>
        </div>
        <div className={styles.themeSplit}>
          <div className={`${styles.themePane} ${styles.themeDark}`} aria-label="Dark theme">
            <span className={styles.themeTag}>Dark</span>
            <div className={styles.themeStrip}>
              {BADGE_STATES.map((state) => (
                <div key={`d-${state}`} className={styles.themeCell}>
                  <TorqueMascot state={state} size="md" label="Torque" />
                  <span>{TORQUE_STATE_PHRASE[state]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.themePane} ${styles.themeLight}`} aria-label="Light theme">
            <span className={styles.themeTag}>Light</span>
            <div className={styles.themeStrip}>
              {BADGE_STATES.map((state) => (
                <div key={`l-${state}`} className={styles.themeCell}>
                  <TorqueMascot state={state} size="md" label="Torque" />
                  <span>{TORQUE_STATE_PHRASE[state]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inline badge usage */}
      <section className={styles.section} aria-labelledby="torque-badge-title">
        <div className={styles.panelTitle}>
          <span className={styles.kicker}>Inline badge</span>
          <h2 id="torque-badge-title">TorqueMascotBadge for chat + toasts</h2>
          <p>A compact pairing of the mini avatar with a live status line.</p>
        </div>
        <div className={styles.badgeStack}>
          {BADGE_STATES.map((state) => (
            <TorqueMascotBadge key={`b-${state}`} state={state} label="Torque" />
          ))}
        </div>
      </section>
    </main>
  )
}
