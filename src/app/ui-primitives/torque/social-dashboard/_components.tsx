/**
 * Co-located composition chrome for the Torque "Social marketing home"
 * (social-dashboard).
 *
 * Thin presentational wrappers that arrange EXISTING primitives plus a little
 * bespoke brand chrome (Torque header band, posture stat rail, section frames,
 * connected-account grid, the mention/approval/upcoming rails). No primitive is
 * modified here — primitives are imported.
 *
 * Dev-only note: the owner-facing assistant brand is always "Torque".
 */

import type { ReactNode } from "react"
import { CalendarClock, MessageSquareDot, ShieldCheck } from "lucide-react"

import {
  AccountConnectorCard,
  MentionInboxRow,
  PostCard,
} from "../../components/social-scheduler"
import type {
  ConnectedAccount,
  MentionInboxItem,
  PlatformDescriptor,
  ScheduledPost,
} from "../../components/social-scheduler"

import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  TODAY_LABEL,
  type PostureStat,
  type Tone,
} from "./_demo-data"
import styles from "./social-dashboard.module.css"

const STAT_TONE_CLASS: Record<Tone, string> = {
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

function PostureRail({ stats }: PostureRailProps) {
  return (
    <dl className={styles.postureRail} aria-label="30-day social posture">
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

interface HeaderBandProps {
  stats: ReadonlyArray<PostureStat>
}

/** Hero band: Torque identity + greeting copy + posture stat rail. */
export function HeaderBand({ stats }: HeaderBandProps) {
  return (
    <section className={styles.band} aria-labelledby="social-dashboard-band-title">
      <div className={styles.bandMain}>
        <div className={styles.bandHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <h1 id="social-dashboard-band-title" className={styles.bandTitle}>
          Socials are humming, boss — the <em>Phase IV</em> build is your best post yet.
        </h1>
        <p className={styles.bandCopy}>
          Here&apos;s the whole marketing picture in one place: who&apos;s connected, what just
          went out, what&apos;s queued, how the channels are tracking, and the three posts sitting
          at your approval gate. Nothing publishes until you sign off.
        </p>
        <p className={styles.bandMeta}>
          <span className={styles.metaDot}>{BUSINESS_NAME}</span>
          <span>{BUSINESS_REGION}</span>
          <span>{TODAY_LABEL}</span>
        </p>
      </div>
      <PostureRail stats={stats} />
    </section>
  )
}

interface AccountsSectionProps {
  accounts: ReadonlyArray<ConnectedAccount>
  platforms: ReadonlyArray<PlatformDescriptor>
}

/** Connected-account grid built from AccountConnectorCard. */
export function AccountsSection({ accounts, platforms }: AccountsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="social-dashboard-accounts-title">
      <header className={styles.sectionHead}>
        <span className={styles.sectionHeadText}>
          <span className={styles.sectionKicker}>OAuth · 4 channels</span>
          <h2 id="social-dashboard-accounts-title" className={styles.sectionTitle}>
            Connected accounts
          </h2>
        </span>
        <p className={styles.sectionAside}>
          TikTok&apos;s token expires in 4 days and YouTube hit a sync error — reconnect from the
          tile and I&apos;ll keep publishing.
        </p>
      </header>
      <div className={styles.accountGrid}>
        {accounts.map((account) => {
          const platform = platforms.find((p) => p.key === account.platform)
          if (!platform) return null
          return (
            <AccountConnectorCard
              key={account.id}
              account={account}
              platform={platform}
            />
          )
        })}
      </div>
    </section>
  )
}

interface PostsSectionProps {
  id: string
  kicker: string
  title: string
  aside?: string
  posts: ReadonlyArray<ScheduledPost>
  platforms: ReadonlyArray<PlatformDescriptor>
  split?: boolean
}

/** A labelled section of PostCards (recently published / upcoming). */
export function PostsSection({
  id,
  kicker,
  title,
  aside,
  posts,
  platforms,
  split = false,
}: PostsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <header className={styles.sectionHead}>
        <span className={styles.sectionHeadText}>
          <span className={styles.sectionKicker}>{kicker}</span>
          <h2 id={id} className={styles.sectionTitle}>
            {title}
          </h2>
        </span>
        {aside ? <p className={styles.sectionAside}>{aside}</p> : null}
      </header>
      <div className={split ? styles.postListSplit : styles.postList}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} platforms={platforms} />
        ))}
      </div>
    </section>
  )
}

interface PostListProps {
  posts: ReadonlyArray<ScheduledPost>
  platforms: ReadonlyArray<PlatformDescriptor>
}

/** Bare list of PostCards, for use inside an already-labelled rail section. */
export function PostList({ posts, platforms }: PostListProps) {
  return (
    <div className={styles.railList}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} platforms={platforms} />
      ))}
    </div>
  )
}

interface ChartCardProps {
  kicker: string
  title: string
  children: ReactNode
}

/** Inner card wrapper to frame a chart primitive with a label. */
export function ChartCard({ kicker, title, children }: ChartCardProps) {
  return (
    <figure className={styles.chartCard}>
      <figcaption className={styles.chartCardHead}>
        <span className={styles.chartCardKicker}>{kicker}</span>
        <span className={styles.chartCardTitle}>{title}</span>
      </figcaption>
      {children}
    </figure>
  )
}

type RailVariant = "approval" | "upcoming" | "mentions"

interface RailHeaderProps {
  id: string
  kicker: string
  title: string
  count: number
  variant: RailVariant
}

const RAIL_ICON: Record<RailVariant, typeof CalendarClock> = {
  approval: ShieldCheck,
  upcoming: CalendarClock,
  mentions: MessageSquareDot,
}

export function RailHeader({ id, kicker, title, count, variant }: RailHeaderProps) {
  const Icon = RAIL_ICON[variant]
  return (
    <header className={styles.railHead}>
      <span className={styles.railIcon} data-variant={variant} aria-hidden="true">
        <Icon size={15} strokeWidth={2.2} />
      </span>
      <span className={styles.railHeadText}>
        <span className={styles.railKicker}>{kicker}</span>
        <h2 id={id} className={styles.railTitle}>
          {title}
        </h2>
      </span>
      <span className={styles.railCount} data-variant={variant}>
        {count}
      </span>
    </header>
  )
}

interface MentionRailProps {
  mentions: ReadonlyArray<MentionInboxItem>
  platforms: ReadonlyArray<PlatformDescriptor>
}

/** Side-rail group of MentionInboxRow items under a labelled frame. */
export function MentionRail({ mentions, platforms }: MentionRailProps) {
  const unread = mentions.filter((m) => m.unread).length
  return (
    <section className={styles.section} aria-labelledby="social-dashboard-mentions-title">
      <RailHeader
        id="social-dashboard-mentions-title"
        kicker="Social inbox"
        title="Mentions & DMs"
        count={unread}
        variant="mentions"
      />
      <div className={styles.railList}>
        {mentions.map((mention) => {
          const platform = platforms.find((p) => p.key === mention.platform)
          if (!platform) return null
          return (
            <MentionInboxRow
              key={mention.id}
              mention={mention}
              platform={platform}
            />
          )
        })}
      </div>
    </section>
  )
}
