import { NeuoSurface, type NeuoTone } from "../surfaces/neuo-surface"
import { GlassSurface, type GlassTone } from "../surfaces/glass-surface"
import { Avatar, type AvatarTone } from "../primitives/avatar"
import { CountUp } from "../primitives/count-up"

import { TIER_META, type LoyaltyTier } from "./loyalty-types"
import styles from "./loyalty-card.module.css"

export type LoyaltyCardTone = "obsidian" | "chrome" | "holographic"

interface LoyaltyCardProps {
  memberName: string
  memberId: string
  tier: LoyaltyTier
  pointsBalance: number
  memberSinceISO: string
  /** Optional avatar image src. */
  avatarSrc?: string
  /** Visual treatment of the card surface. */
  tone?: LoyaltyCardTone
  className?: string
}

const TONE_TO_NEUO: Record<LoyaltyCardTone, NeuoTone> = {
  obsidian: "obsidian",
  chrome: "ash",
  holographic: "amber",
}

const TONE_TO_GLASS: Record<LoyaltyCardTone, GlassTone> = {
  obsidian: "obsidian",
  chrome: "chrome",
  holographic: "amber",
}

const TIER_AVATAR_TONE: Record<LoyaltyTier, AvatarTone> = {
  bronze: "amber",
  silver: "obsidian",
  gold: "amber",
  platinum: "teal",
  brodie: "red",
}

function formatMemberSince(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", { month: "short", year: "numeric" }).format(date)
}

export function LoyaltyCard({
  memberName,
  memberId,
  tier,
  pointsBalance,
  memberSinceISO,
  avatarSrc,
  tone = "obsidian",
  className,
}: LoyaltyCardProps) {
  const meta = TIER_META[tier]
  const classes = [styles.card, styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}`], className]
    .filter(Boolean)
    .join(" ")
  const ariaLabel = `${memberName}, ${meta.label} tier member, ${pointsBalance.toLocaleString("en-AU")} points`

  return (
    <NeuoSurface tone={TONE_TO_NEUO[tone]} className={classes}>
      <article
        className={styles.inner}
        role="region"
        aria-label={ariaLabel}
        data-tier={tier}
      >
        <header className={styles.head}>
          <span className={styles.brand}>Mufflermen · Member</span>
          <span className={styles.serial}>{memberId}</span>
        </header>

        <GlassSurface tone={TONE_TO_GLASS[tone]} intensity="med" className={styles.tierPlate}>
          <span className={styles.tierBadge} data-tone={meta.tone} aria-hidden="true">
            {meta.label[0]}
          </span>
          <div className={styles.tierMeta}>
            <span className={styles.tierKicker}>Tier</span>
            <strong className={styles.tierName}>{meta.label}</strong>
          </div>
        </GlassSurface>

        <div className={styles.identityRow}>
          <Avatar
            name={memberName}
            src={avatarSrc}
            size="lg"
            tone={TIER_AVATAR_TONE[tier]}
            status="online"
          />
          <div className={styles.identityMeta}>
            <span className={styles.identityLabel}>Holder</span>
            <strong className={styles.identityName}>{memberName}</strong>
            <span className={styles.identitySince}>
              Member since {formatMemberSince(memberSinceISO)}
            </span>
          </div>
        </div>

        <div className={styles.points} aria-live="polite">
          <span className={styles.pointsLabel}>Points balance</span>
          <span className={styles.pointsValue}>
            <CountUp to={pointsBalance} duration={1600} separator="," />
          </span>
          <span className={styles.pointsTag}>pts</span>
        </div>

        <footer className={styles.foot}>
          <span>Oak Flats workshop · Bay 2</span>
          <span className={styles.chip}>Card v04</span>
        </footer>
      </article>
    </NeuoSurface>
  )
}

export default LoyaltyCard
