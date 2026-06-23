/**
 * Co-located composition chrome for the Torque "Social content calendar".
 *
 * Thin presentational wrappers that arrange EXISTING primitives plus a little
 * bespoke brand chrome (the Torque header band, posture stat rail, side-rail
 * section frames). No primitive is modified here — primitives are imported.
 *
 * Dev-only note: the owner-facing assistant brand is always "Torque".
 */

import { CalendarClock, ShieldCheck } from "lucide-react"

import { PostCard } from "../../components/social-scheduler"
import type { ScheduledPost } from "../../components/social-scheduler"
import type { PlatformDescriptor } from "../../components/social-scheduler"

import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  CALENDAR_MONTH_LABEL,
  type PostureStat,
  type StatTone,
} from "./_demo-data"
import styles from "./social-calendar.module.css"

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

/** Compact figure rail summarising the month's posting posture. */
function PostureRail({ stats }: PostureRailProps) {
  return (
    <dl className={styles.postureRail} aria-label="June posting posture">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`${styles.postureStat} ${STAT_TONE_CLASS[stat.tone]}`}
        >
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

/** Hero band: Torque identity + month copy + posting posture rail. */
export function CalendarHeaderBand({ stats }: CalendarHeaderBandProps) {
  return (
    <section className={styles.band} aria-labelledby="social-calendar-band-title">
      <div className={styles.bandMain}>
        <div className={styles.bandHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <h1 id="social-calendar-band-title" className={styles.bandTitle}>
          The <em>{CALENDAR_MONTH_LABEL}</em> social plan is mapped out, boss.
        </h1>
        <p className={styles.bandCopy}>
          I&apos;ve laid the month out across Facebook, Instagram, TikTok and YouTube — build
          reels, Dyno Tuesdays and the winter tune-up drive. Drag a post to a new day to
          reschedule. Nothing goes live until you approve it.
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

interface RailSectionProps {
  id: string
  title: string
  kicker: string
  count: number
  variant: "upcoming" | "approval"
  posts: ReadonlyArray<ScheduledPost>
  platforms: ReadonlyArray<PlatformDescriptor>
}

/** A side-rail group of PostCards under a labelled frame. */
export function RailSection({
  id,
  title,
  kicker,
  count,
  variant,
  posts,
  platforms,
}: RailSectionProps) {
  const Icon = variant === "approval" ? ShieldCheck : CalendarClock
  return (
    <section className={styles.railSection} aria-labelledby={id}>
      <header className={styles.railHead}>
        <span className={styles.railIcon} data-variant={variant} aria-hidden="true">
          <Icon size={15} strokeWidth={2.2} />
        </span>
        <span className={styles.railHeadText}>
          <span className={styles.railKicker}>{kicker}</span>
          <h3 id={id} className={styles.railTitle}>
            {title}
          </h3>
        </span>
        <span className={styles.railCount} data-variant={variant}>
          {count}
        </span>
      </header>
      <div className={styles.railList}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} platforms={platforms} />
        ))}
      </div>
    </section>
  )
}
