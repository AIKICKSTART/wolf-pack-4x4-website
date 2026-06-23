"use client"

/**
 * Co-located composition pieces for the User profile screen.
 *
 * The page is a server component; this client island owns the interactive
 * profile state (notification toggles, revoked sessions) and arranges EXISTING
 * account + shared primitives inside bespoke section frames. No primitive is
 * modified here — only imported.
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque".
 * The legacy internal codename is never used in any string below.
 */

import Image from "next/image"
import { Mail, MapPin, Pencil, Phone, ShieldCheck, type LucideIcon } from "lucide-react"
import { useCallback, useMemo, useState, type ReactNode } from "react"

import { AuditLogRow } from "../../components/account/audit-log-row"
import { NotificationChannelRow } from "../../components/account/notification-channel-row"
import type {
  NotificationChannel,
  NotificationChannelRowItem,
} from "../../components/account/notification-channel-row"
import { PlanBadge } from "../../components/account/plan-badge"
import { ProfileCard } from "../../components/account/profile-card"
import { SessionRow } from "../../components/account/session-row"
import type { SessionRowItem } from "../../components/account/session-row"
import { StatTile } from "../../components/primitives/stat-tile"

import {
  ACTIVITY_STATS,
  BUSINESS_NAME,
  BUSINESS_REGION,
  COVER_IMAGE_ALT,
  COVER_IMAGE_SRC,
  NOTIFICATION_PREFS,
  OWNER_PROFILE,
  OWNER_STATS,
  PLAN_CAPTION,
  PLAN_TIER,
  RECENT_ACTIONS,
  SESSIONS,
} from "./_demo-data"
import styles from "./profile.module.css"

/** Placeholder circular Torque avatar — brand-red gradient, initial "T".
 *  Real mascot art lands later. */
function TorqueAvatar() {
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

interface SectionProps {
  id: string
  kicker: string
  title: string
  description?: string
  aside?: ReactNode
  children: ReactNode
}

/** Anchored section frame with editorial header + optional aside slot. */
function Section({ id, kicker, title, description, aside, children }: SectionProps) {
  const titleId = `${id}-title`
  return (
    <section id={id} className={styles.section} aria-labelledby={titleId}>
      <header className={styles.sectionHead}>
        <span className={styles.sectionText}>
          <span className={styles.sectionKicker}>{kicker}</span>
          <h2 id={titleId} className={styles.sectionTitle}>
            {title}
          </h2>
          {description && <p className={styles.sectionDesc}>{description}</p>}
        </span>
        {aside && <span className={styles.sectionAside}>{aside}</span>}
      </header>
      {children}
    </section>
  )
}

/** Cover banner: brand team photo + Torque badge + owner identity + actions. */
function ProfileCover() {
  return (
    <section className={styles.cover} aria-labelledby="profile-identity-name">
      <div className={styles.coverMedia}>
        <Image
          src={COVER_IMAGE_SRC}
          alt={COVER_IMAGE_ALT}
          fill
          priority
          sizes="(max-width: 1320px) 100vw, 1320px"
          className={styles.coverImage}
        />
        <span className={styles.coverScrim} aria-hidden="true" />
        <span className={styles.coverBadge}>
          <TorqueAvatar />
          <span className={styles.coverBadgeText}>
            <span className={styles.coverBadgeName}>Torque</span>
            <span className={styles.coverBadgeRole}>Your Mufflermen business assistant</span>
          </span>
        </span>
      </div>

      <div className={styles.identityStrip}>
        <div className={styles.identityLeft}>
          <div className={styles.identityText}>
            <h2 id="profile-identity-name" className={styles.identityName}>
              {OWNER_PROFILE.name.split(" ")[0]} <em>{OWNER_PROFILE.name.split(" ").slice(1).join(" ")}</em>
            </h2>
            <p className={styles.identityMeta}>
              <span>{OWNER_PROFILE.role}</span>
              <span>
                <b>{BUSINESS_NAME}</b>
              </span>
              <span>{BUSINESS_REGION}</span>
            </p>
          </div>
        </div>

        <div className={styles.identityActions}>
          <PlanBadge tier={PLAN_TIER} caption={PLAN_CAPTION} size="md" />
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="#profile-edit">
            <Pencil size={14} strokeWidth={2.2} aria-hidden="true" />
            Edit profile
          </a>
        </div>
      </div>
    </section>
  )
}

interface ContactFieldDef {
  id: string
  label: string
  value: string
  icon: LucideIcon
}

const CONTACT_FIELDS: ReadonlyArray<ContactFieldDef> = [
  { id: "email", label: "Email", value: OWNER_PROFILE.email, icon: Mail },
  { id: "phone", label: "Mobile", value: OWNER_PROFILE.phone, icon: Phone },
  { id: "location", label: "Location", value: OWNER_PROFILE.location, icon: MapPin },
]

/** Profile card + bio + contact details cluster. */
function IdentitySection() {
  return (
    <Section
      id="profile-edit"
      kicker="Profile · Identity"
      title="Account holder"
      description="How you appear on every quote, reply and post Torque sends for the workshop."
    >
      <ProfileCard
        name={OWNER_PROFILE.name}
        role={OWNER_PROFILE.role}
        email={OWNER_PROFILE.email}
        location={OWNER_PROFILE.location}
        avatarTone="red"
        roleChipTone="red"
        stats={OWNER_STATS}
        editHref="#profile-edit"
        editLabel="Edit profile"
      />
      <p className={styles.bio}>{OWNER_PROFILE.bio}</p>
      <dl className={styles.contactGrid}>
        {CONTACT_FIELDS.map((field) => {
          const Icon = field.icon
          return (
            <div key={field.id} className={styles.contactField}>
              <dt>
                <Icon size={12} strokeWidth={2.2} aria-hidden="true" />
                {field.label}
              </dt>
              <dd>{field.value}</dd>
            </div>
          )
        })}
      </dl>
    </Section>
  )
}

/** Activity summary tiles for the owner's last 30 days. */
function ActivitySection() {
  return (
    <Section
      id="activity"
      kicker="Profile · Activity"
      title="Your last 30 days"
      description="A quick read on what's moved through your bays — and how much Torque handled for you."
      aside={<span className={styles.tally}>Cycle to <strong>29 May</strong></span>}
    >
      <div className={styles.statGrid}>
        {ACTIVITY_STATS.map((stat) => (
          <StatTile
            key={stat.id}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            tone={stat.tone}
            caption={stat.caption}
            sparkline={[...stat.sparkline]}
            delta={stat.delta}
          />
        ))}
      </div>
    </Section>
  )
}

/** Notification preference rows with local enable/disable state. */
function PreferencesSection() {
  const [channels, setChannels] = useState<ReadonlyArray<NotificationChannelRowItem>>(
    NOTIFICATION_PREFS,
  )

  const handleToggle = useCallback((channel: NotificationChannel, enabled: boolean) => {
    setChannels((current) =>
      current.map((item) => (item.channel === channel ? { ...item, enabled } : item)),
    )
  }, [])

  const enabledCount = useMemo(
    () => channels.filter((item) => item.enabled).length,
    [channels],
  )

  return (
    <Section
      id="preferences"
      kicker="Profile · Preferences"
      title="How Torque reaches you"
      description="Pick the channels for quotes, bookings, job updates and alerts. Torque only nudges you where you've opted in."
      aside={
        <span className={styles.tally}>
          <strong>{enabledCount}</strong> of {channels.length} on
        </span>
      }
    >
      <div className={styles.rowStack} role="list" aria-label="Notification channels">
        {channels.map((item) => (
          <NotificationChannelRow key={item.channel} item={item} onToggle={handleToggle} />
        ))}
      </div>
    </Section>
  )
}

/** Active session list with revoke (per-row + revoke-all) and a live region. */
function SecuritySection() {
  const [sessions, setSessions] = useState<ReadonlyArray<SessionRowItem>>(SESSIONS)
  const [status, setStatus] = useState("")

  const handleRevoke = useCallback((id: string) => {
    setSessions((current) => {
      const removed = current.find((session) => session.id === id)
      if (removed) {
        setStatus(`Signed out ${removed.label}.`)
      }
      return current.filter((session) => session.id !== id)
    })
  }, [])

  const handleRevokeOthers = useCallback(() => {
    setSessions((current) => current.filter((session) => session.current))
    setStatus("Signed out all other devices.")
  }, [])

  const otherCount = useMemo(
    () => sessions.filter((session) => !session.current).length,
    [sessions],
  )

  return (
    <Section
      id="security"
      kicker="Profile · Security"
      title="Where you're signed in"
      description="Review the devices on your account. Revoke anything you don't recognise — your current device stays put."
      aside={
        <span className={styles.tally}>
          <strong>{sessions.length}</strong> active
        </span>
      }
    >
      <div className={styles.rowStack} role="list" aria-label="Active sessions">
        {sessions.map((session) => (
          <SessionRow key={session.id} session={session} onRevoke={handleRevoke} />
        ))}
      </div>
      <p className={styles.sessionFoot}>
        <ShieldCheck size={15} strokeWidth={2.1} aria-hidden="true" />
        <span>
          <strong>{otherCount}</strong> other {otherCount === 1 ? "device" : "devices"} signed in
        </span>
        <button
          type="button"
          className={styles.revokeAllBtn}
          onClick={handleRevokeOthers}
          disabled={otherCount === 0}
        >
          Sign out all others
        </button>
      </p>
      <span className={styles.srOnly} role="status" aria-live="polite">
        {status}
      </span>
    </Section>
  )
}

/** Recent-actions log — a personal audit trail for the owner account. */
function RecentActionsSection() {
  return (
    <Section
      id="recent-actions"
      kicker="Profile · Activity log"
      title="Recent actions"
      description="The latest changes on your account — quotes you approved, replies Torque sent, and security events worth a glance."
      aside={<span className={styles.tally}><strong>{RECENT_ACTIONS.length}</strong> events</span>}
    >
      <div className={styles.rowStack} role="list" aria-label="Recent account actions">
        {RECENT_ACTIONS.map((entry) => (
          <AuditLogRow key={entry.id} entry={entry} />
        ))}
      </div>
    </Section>
  )
}

/** The full profile screen: cover banner + two-column section layout. */
export function ProfileScreen() {
  return (
    <>
      <ProfileCover />
      <div className={styles.grid}>
        <div className={styles.colMain}>
          <IdentitySection />
          <ActivitySection />
          <RecentActionsSection />
        </div>
        <div className={styles.colSide}>
          <PreferencesSection />
          <SecuritySection />
        </div>
      </div>
    </>
  )
}
