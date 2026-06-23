/**
 * Co-located composition pieces for the Workshop job detail screen.
 *
 * Thin presentational wrappers that arrange EXISTING primitives plus a small
 * amount of bespoke brand chrome — the Torque command band, the logged
 * time-entries table, and the high-value approval gate. No primitive is
 * modified here.
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque"
 * (the underlying console is never named to the customer).
 */

import { StatTile } from "../../components/primitives/stat-tile"
import { StatusBadge } from "../../components/data-display/status-badge-grid"

import {
  APPROVAL_BADGES,
  APPROVAL_THRESHOLD_AUD,
  APPROVAL_THRESHOLDS,
  BALANCE_DUE_AUD,
  BUSINESS_NAME,
  BUSINESS_REGION,
  DEPOSIT_AUD,
  JOB_NUMBER,
  TIME_BOOKED_HOURS,
  TIME_ENTRIES,
  TIME_LOGGED_HOURS,
  TODAY_LABEL,
  mechanicById,
} from "./_demo-data"
import styles from "./job-detail.module.css"

const AUD0 = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

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

/** Hero command band: Torque avatar + work-order briefing + live meta. */
export function CommandBand() {
  return (
    <section className={styles.command} aria-labelledby="job-command-title">
      <div className={styles.commandHead}>
        <TorqueAvatar />
        <span className={styles.torqueId}>
          <span className={styles.torqueName}>Torque</span>
          <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
        </span>
        <span className={styles.commandWo}>{JOB_NUMBER}</span>
      </div>
      <h1 id="job-command-title" className={styles.commandTitle}>
        Sam&apos;s Ranger turbo-back, <em>on Bay 4</em>.
      </h1>
      <p className={styles.commandCopy}>
        I sent the 3″ turbo-back quote at 10:42 and Sam approved by text six minutes later, so I
        turned it into a work order and booked the hoist. Rhys is mid-fab, parts are mostly pulled,
        and I&apos;ve held the 3:00 pm dyno slot for the ADR drive-by check. One thing for you —
        it&apos;s a {AUD0.format(3286)} job, over the sign-off line, so it&apos;s waiting on your tick.
      </p>
      <p className={styles.commandMeta}>
        <span className={styles.metaDot}>On the hoist · Bay 4</span>
        <span>{TODAY_LABEL}</span>
        <span>
          {BUSINESS_NAME} · {BUSINESS_REGION}
        </span>
      </p>
    </section>
  )
}

/** Logged time entries against the job. Figures render with tabular-nums. */
export function TimeEntriesTable() {
  const remaining = Math.max(0, TIME_BOOKED_HOURS - TIME_LOGGED_HOURS)
  return (
    <section className={styles.timeCard} aria-labelledby="job-time-title">
      <header className={styles.timeHead}>
        <div>
          <span className={styles.timeKicker}>Time on the job</span>
          <h3 id="job-time-title" className={styles.timeTitle}>
            Logged time entries
          </h3>
        </div>
        <dl className={styles.timeTotals}>
          <div>
            <dt>Logged</dt>
            <dd className={styles.timeFigure}>{TIME_LOGGED_HOURS.toFixed(2)}h</dd>
          </div>
          <div>
            <dt>Booked</dt>
            <dd className={styles.timeFigure}>{TIME_BOOKED_HOURS.toFixed(2)}h</dd>
          </div>
          <div>
            <dt>Remaining</dt>
            <dd className={styles.timeFigure} data-tone="amber">
              {remaining.toFixed(2)}h
            </dd>
          </div>
        </dl>
      </header>
      <div className={styles.timeTable} role="table" aria-label="Logged time entries">
        <div className={styles.timeRowHead} role="row">
          <span role="columnheader">Technician &amp; task</span>
          <span role="columnheader" className={styles.timeColTime}>
            From → To
          </span>
          <span role="columnheader" className={styles.timeColHours}>
            Hours
          </span>
        </div>
        {TIME_ENTRIES.map((entry) => {
          const mechanic = mechanicById(entry.mechanicId)
          return (
            <div key={entry.id} className={styles.timeRow} role="row">
              <div className={styles.timeTask} role="cell">
                <span className={styles.timeTech}>{mechanic?.name ?? "Unassigned"}</span>
                <span className={styles.timeTaskLabel}>{entry.task}</span>
              </div>
              <span className={styles.timeWhen} role="cell">
                {entry.fromLabel} <span aria-hidden="true">→</span> {entry.toLabel}
              </span>
              <span className={styles.timeHours} role="cell">
                {entry.hours.toFixed(2)}h
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/** High-value approval gate — composed from StatTile + StatusBadge primitives. */
export function ApprovalGate() {
  return (
    <section className={styles.gate} aria-labelledby="job-gate-title">
      <header className={styles.gateHead}>
        <div>
          <span className={styles.gateKicker}>Approval gate</span>
          <h2 id="job-gate-title" className={styles.gateTitle}>
            Over the {AUD0.format(APPROVAL_THRESHOLD_AUD)} sign-off line
          </h2>
          <p className={styles.gateSub}>
            Sam&apos;s already approved the quote and the deposit&apos;s pre-authorised. Because the
            job clears the high-value threshold, it needs a manager tick before Torque releases the
            final invoice and books the dyno verification.
          </p>
        </div>
        <ul className={styles.gateBadges} aria-label="Approval status">
          {APPROVAL_BADGES.map((badge) => (
            <li key={badge.label}>
              <StatusBadge tone={badge.tone} size="sm" shape="pill" label={badge.label} />
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.gateStats}>
        {APPROVAL_THRESHOLDS.map((threshold) => (
          <StatTile
            key={threshold.id}
            label={threshold.label}
            value={threshold.value}
            tone={threshold.tone}
            caption={threshold.caption}
          />
        ))}
      </div>

      <footer className={styles.gateFoot}>
        <p className={styles.gateBalance}>
          <span className={styles.gateBalanceLabel}>Balance on completion</span>
          <span className={styles.gateBalanceValue}>{AUD0.format(BALANCE_DUE_AUD)}</span>
          <span className={styles.gateBalanceSub}>
            after {AUD0.format(DEPOSIT_AUD)} deposit
          </span>
        </p>
        <div className={styles.gateActions}>
          <button type="button" className={styles.gateApprove}>
            Approve &amp; release invoice
          </button>
          <button type="button" className={styles.gateHold}>
            Hold &amp; query
          </button>
        </div>
      </footer>
    </section>
  )
}
