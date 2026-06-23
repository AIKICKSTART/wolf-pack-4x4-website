/**
 * Co-located composition pieces for the Bay schedule & calendar screen.
 *
 * Thin presentational wrappers arranging EXISTING primitives plus a little
 * bespoke brand chrome (the Torque scheduler band + placeholder avatar and the
 * week-posture stat strip). No primitive is modified here.
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque".
 */

import { CalendarClock, MapPin } from "lucide-react"

import { BayLiveStatusCard } from "../../components/workshop-floor-live/bay-live-status-card"
import { TechnicianLocationPin } from "../../components/workshop-floor-live/technician-location-pin"
import { TECH_LOCATION_LABEL } from "../../components/workshop-floor-live/workshop-floor-types"
import { EventCard } from "../../components/calendar/event-card"
import {
  BAY_LANES,
  BUSINESS_NAME,
  BUSINESS_REGION,
  CONFLICTS,
  TECH_LANE,
  TODAY_LABEL,
  WEEK_STATS,
  type ScheduleStat,
} from "./_demo-data"
import styles from "./bay-schedule.module.css"

const STAT_TONE_CLASS: Record<ScheduleStat["tone"], string> = {
  red: styles.statRed,
  amber: styles.statAmber,
  teal: styles.statTeal,
  green: styles.statGreen,
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

/** Week-posture stat strip — booked / utilisation / open / conflicts. */
function WeekStats() {
  return (
    <dl className={styles.statStrip} aria-label="This week's bay schedule at a glance">
      {WEEK_STATS.map((stat) => (
        <div key={stat.id} className={`${styles.stat} ${STAT_TONE_CLASS[stat.tone]}`}>
          <dt className={styles.statLabel}>{stat.label}</dt>
          <dd className={styles.statValue}>{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Scheduler greeting band: Torque avatar + cockpit copy + live meta + stats. */
export function SchedulerBand() {
  return (
    <section className={styles.band} aria-labelledby="bay-schedule-band-title">
      <div className={styles.bandMain}>
        <div className={styles.bandHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <h1 id="bay-schedule-band-title" className={styles.bandTitle}>
          The week is nearly <em>full</em> across all four bays.
        </h1>
        <p className={styles.bandCopy}>
          Twenty-three jobs booked into the four bays this week and you&apos;re sitting at 82%
          utilisation. There&apos;s one clash to clear — a Golf R walk-in landed on top of the 200
          Series dyno run on Bay 4 — and Bay 3 is held on parts until 3pm. Drag a block to a free
          slot and I&apos;ll re-slot the technician and ping the customer for you.
        </p>
        <p className={styles.bandMeta}>
          <span className={styles.metaDot}>Workshop open · 7:30am–5pm</span>
          <span>{TODAY_LABEL}</span>
          <span>{BUSINESS_REGION}</span>
        </p>
      </div>
      <div className={styles.bandAside}>
        <span className={styles.bandAsideHead}>
          <CalendarClock size={13} strokeWidth={2.2} aria-hidden="true" />
          {BUSINESS_NAME} · week posture
        </span>
        <WeekStats />
      </div>
    </section>
  )
}

/** Per-bay lane — four live status cards, drag-feel job blocks per bay. */
export function BayLane() {
  return (
    <div className={styles.bayLane} role="list" aria-label="Live status by bay">
      {BAY_LANES.map((lane) => (
        <div key={lane.bay} role="listitem" className={styles.bayLaneItem}>
          <BayLiveStatusCard
            bay={lane.bay}
            state={lane.state}
            vehicle={lane.vehicle}
            customer={lane.customer}
            technician={lane.technician}
            jobNumber={lane.jobNumber}
            elapsedMinutes={lane.elapsedMinutes}
            etaHandover={lane.etaHandover}
            progressPercent={lane.progressPercent}
          />
        </div>
      ))}
    </div>
  )
}

/** Technician lane — who's on the floor and where, right now. */
export function TechnicianLane() {
  return (
    <div className={styles.techLane} role="list" aria-label="Technicians on the floor">
      {TECH_LANE.map((tech) => (
        <div key={tech.id} role="listitem" className={styles.techLaneItem}>
          <TechnicianLocationPin
            name={tech.name}
            role={tech.role}
            location={tech.location}
            doing={tech.doing}
            online={tech.online}
          />
        </div>
      ))}
    </div>
  )
}

/** Conflict rail — flagged scheduling clashes as expanded event cards. */
export function ConflictRail() {
  return (
    <section
      className={styles.conflictFrame}
      aria-labelledby="bay-schedule-conflicts-title"
    >
      <header className={styles.conflictHead}>
        <span className={styles.conflictKicker}>Needs a call</span>
        <h2 id="bay-schedule-conflicts-title" className={styles.conflictTitle}>
          Conflicts to clear
        </h2>
      </header>
      <div className={styles.conflictList}>
        {CONFLICTS.map((conflict) => (
          <div key={conflict.id} className={styles.conflictItem}>
            <EventCard
              title={conflict.title}
              start={conflict.start}
              end={conflict.end}
              tone={conflict.tone}
              variant="expanded"
              icon={<MapPin size={14} strokeWidth={2.4} aria-hidden="true" />}
              location={conflict.bayLabel}
              description={conflict.description}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

/** Legend chip for a technician location, reused below the technician lane. */
export function TechLaneLegend() {
  const locations: ReadonlyArray<keyof typeof TECH_LOCATION_LABEL> = [
    "bay-1",
    "bay-2",
    "bay-3",
    "bay-4",
    "parts",
    "dyno",
  ]
  return (
    <ul className={styles.techLegend} aria-label="Technician location legend">
      {locations.map((loc) => (
        <li key={loc}>{TECH_LOCATION_LABEL[loc]}</li>
      ))}
    </ul>
  )
}
