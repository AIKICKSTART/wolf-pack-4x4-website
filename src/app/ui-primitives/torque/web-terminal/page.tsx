import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { MetricBlock } from "@/app/ui-primitives/components/data-display/metric-block"
import { StatusBadge } from "@/app/ui-primitives/components/data-display/status-badge-grid"

import styles from "./web-terminal.module.css"
import { SESSION_METRICS, SESSIONS, STATUS_CHIPS } from "./_demo-data"
import { TerminalConsole } from "./terminal-console"

export const metadata: Metadata = {
  title: "Web terminal | UI Primitives — Torque",
}

export default function TorqueWebTerminalPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque.00 / Web terminal"
        title="Torque — operator console"
        description="A safe, read-only operator console for Oak Flats Muffler Men, Illawarra NSW. Watch the web surface, quote engine and job workers from one monospaced window — session tabs, scrollback transcript, run status and command history. Nothing here runs a real shell: command entry is disabled by design, so the workshop owner and crew can observe without risk."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "Web terminal" },
        ]}
      />

      <div className={styles.canvas}>
        <section className={styles.hero} aria-labelledby="torque-terminal-heading">
          <div className={styles.heroIdentity}>
            {/* Placeholder Torque avatar — the real mascot lands later. */}
            <span className={styles.avatar} aria-hidden="true">
              T
            </span>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Your Mufflermen business assistant</span>
              <h2 id="torque-terminal-heading" className={styles.heroTitle}>
                Eyes on the engine
              </h2>
              <p className={styles.heroSub}>
                An operator-only window into Torque&apos;s services — exhausts priced, bays
                booked, sitemaps rebuilt. Read-only and observe-only; the crew never touches a
                live shell.
              </p>
            </div>
          </div>
          <div className={styles.heroStatus} role="status" aria-label="Console status">
            {STATUS_CHIPS.map((chip) => (
              <StatusBadge
                key={chip.label}
                tone={chip.tone}
                size="md"
                shape="pill"
                label={chip.label}
              />
            ))}
          </div>
        </section>

        <section className={styles.metricStrip} aria-label="Session figures">
          <MetricBlock metrics={SESSION_METRICS} className={styles.metrics} />
        </section>

        <TerminalConsole sessions={SESSIONS} />

        <div className={styles.note}>
          <span>Composition notes</span>
          <p>
            One screen composed entirely from existing primitives — the page header, status
            badges, the metric strip, the monospaced code block as scrollback, and the tabbed
            output-preview pane for stdout / stderr / network / json. Session tabs and the inert
            prompt row are presentational wrappers; no primitive was modified. Realistic Oak
            Flats Muffler Men demo data; light + dark, responsive, reduced-motion safe and
            keyboard accessible.
          </p>
        </div>
      </div>
    </main>
  )
}
