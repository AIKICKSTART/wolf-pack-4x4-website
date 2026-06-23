/**
 * Co-located composition chrome for the Torque "Marketing content calendar".
 *
 * Thin presentational wrappers that arrange EXISTING primitives plus a little
 * bespoke brand chrome (the Torque header band, posture stat rail, channel /
 * status legends, campaign filter, and the approval-pending rail). No primitive
 * is modified here — every primitive is imported and called by its public prop
 * signature.
 *
 * Dev-only note: the owner-facing assistant brand is always "Torque".
 */

import { CalendarCheck2, Megaphone, ShieldCheck } from "lucide-react"

import { EventCard } from "../../components/calendar"
import type { EventCardTone } from "../../components/calendar"
import { Chip } from "../../components/primitives/chip"
import { StatusBadge } from "../../components/data-display"
import type { StatusBadgeSpec } from "../../components/data-display"

import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  CALENDAR_MONTH_LABEL,
  type CampaignFilterOption,
  type ChannelDescriptor,
  type PendingItem,
  type PostureStat,
  type StatTone,
} from "./_demo-data"
import styles from "./content-calendar.module.css"

const STAT_TONE_CLASS: Record<StatTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
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

interface PostureRailProps {
  stats: ReadonlyArray<PostureStat>
}

/** Compact figure rail summarising the month's content mix. */
function PostureRail({ stats }: PostureRailProps) {
  return (
    <dl className={styles.postureRail} aria-label="June content mix by channel">
      {stats.map((stat) => (
        <div key={stat.id} className={`${styles.postureStat} ${STAT_TONE_CLASS[stat.tone]}`}>
          <dt className={styles.postureLabel}>{stat.label}</dt>
          <dd className={styles.postureValue}>{stat.value}</dd>
          <span className={styles.postureDetail}>{stat.detail}</span>
        </div>
      ))}
    </dl>
  )
}

interface CalendarHeaderBandProps {
  stats: ReadonlyArray<PostureStat>
}

/** Hero band: Torque identity + month copy + content-mix posture rail. */
export function CalendarHeaderBand({ stats }: CalendarHeaderBandProps) {
  return (
    <section className={styles.band} aria-labelledby="content-calendar-band-title">
      <div className={styles.bandMain}>
        <div className={styles.bandHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <h1 id="content-calendar-band-title" className={styles.bandTitle}>
          The whole <em>{CALENDAR_MONTH_LABEL}</em> marketing plan, in one place.
        </h1>
        <p className={styles.bandCopy}>
          I&apos;ve mapped the month across blog, social, email and the cross-channel campaigns —
          the Winter Tune-Up Drive, the EOFY booking blitz and the evergreen how-tos. Each item
          carries its channel and status, and anything sitting in review is held for your call.
        </p>
        <p className={styles.bandMeta}>
          <span className={styles.metaDot}>{BUSINESS_NAME}</span>
          <span>{BUSINESS_REGION}</span>
          <span>4 channels · 1 owner gate</span>
        </p>
      </div>
      <PostureRail stats={stats} />
    </section>
  )
}

interface ChannelLegendProps {
  channels: ReadonlyArray<ChannelDescriptor>
}

/** Channel legend keyed to the calendar event tones. */
export function ChannelLegend({ channels }: ChannelLegendProps) {
  return (
    <ul className={styles.channelLegend} aria-label="Channel colour key">
      {channels.map((channel) => (
        <li key={channel.id} className={styles.legendItem} data-tone={channel.tone}>
          <span className={styles.legendSwatch} aria-hidden="true" />
          <span className={styles.legendLabel}>{channel.label}</span>
          <span className={styles.legendDetail}>{channel.detail}</span>
        </li>
      ))}
    </ul>
  )
}

interface StatusLegendProps {
  badges: ReadonlyArray<StatusBadgeSpec>
}

/** Status legend rendered from the StatusBadge primitive. */
export function StatusLegend({ badges }: StatusLegendProps) {
  return (
    <div className={styles.statusLegend} role="list" aria-label="Content status key">
      {badges.map((badge) => (
        <span key={badge.label} role="listitem" className={styles.statusLegendItem}>
          <StatusBadge tone={badge.tone} size="sm" shape="dot" label={badge.label} />
        </span>
      ))}
    </div>
  )
}

interface CampaignFilterBarProps {
  options: ReadonlyArray<CampaignFilterOption>
}

/**
 * Campaign filter row. The chips render their selected state from the fixture
 * (the showcase is a static demo of the surface, not a live filter).
 */
export function CampaignFilterBar({ options }: CampaignFilterBarProps) {
  return (
    <div className={styles.filterBar} role="group" aria-label="Filter by campaign">
      <span className={styles.filterLead} aria-hidden="true">
        <Megaphone size={14} strokeWidth={2.2} />
      </span>
      {options.map((option) => (
        <Chip
          key={option.id}
          label={option.label}
          tone={option.active ? "red" : "neutral"}
          selected={option.active ?? false}
        />
      ))}
    </div>
  )
}

const PENDING_TONE_TO_EVENT: Record<PendingItem["tone"], EventCardTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
}

interface PendingRailProps {
  items: ReadonlyArray<PendingItem>
}

/**
 * Approval-pending rail. Each held item is an expanded EventCard carrying its
 * channel as the location and its review status as a tone-matched Chip.
 */
export function PendingRail({ items }: PendingRailProps) {
  return (
    <section className={styles.pendingFrame} aria-labelledby="content-calendar-pending-title">
      <header className={styles.pendingHead}>
        <span className={styles.pendingIcon} aria-hidden="true">
          <ShieldCheck size={15} strokeWidth={2.2} />
        </span>
        <span className={styles.pendingHeadText}>
          <span className={styles.pendingKicker}>Needs your call</span>
          <h2 id="content-calendar-pending-title" className={styles.pendingTitle}>
            Pending approval
          </h2>
        </span>
        <span className={styles.pendingCount}>{items.length}</span>
      </header>
      <p className={styles.pendingCopy}>
        Nothing publishes before you sign off. Approve a card to release it to its scheduled slot.
      </p>
      <div className={styles.pendingList}>
        {items.map((item) => (
          <div key={item.id} className={styles.pendingCard}>
            <EventCard
              title={item.title}
              start={item.start}
              tone={PENDING_TONE_TO_EVENT[item.tone]}
              variant="expanded"
              icon={<CalendarCheck2 size={15} strokeWidth={2.2} aria-hidden="true" />}
              location={item.channelLabel}
              description={item.description}
            />
            <div className={styles.pendingChips}>
              <Chip label={item.channelLabel} tone="teal" />
              <Chip label={item.statusLabel} tone="amber" selected />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
