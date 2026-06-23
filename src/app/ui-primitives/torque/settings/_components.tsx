"use client"

/**
 * Co-located composition pieces for the Settings & workspace screen.
 *
 * The page is a server component; this client island owns the interactive
 * settings state (team roles, notification toggles, copied/revoked tokens) and
 * arranges EXISTING account primitives inside bespoke section frames. No
 * primitive is modified here — only imported.
 *
 * Dev-only note: the assistant brand surfaced to the workspace is always
 * "Torque". The legacy internal codename is never used in any string below.
 */

import { useCallback, useMemo, useState, type ReactNode } from "react"

import { ApiTokenRow } from "../../components/account/api-token-row"
import { DangerActionCard } from "../../components/account/danger-action-card"
import { IntegrationTile } from "../../components/account/integration-tile"
import { NotificationChannelRow } from "../../components/account/notification-channel-row"
import { PlanBadge } from "../../components/account/plan-badge"
import { ProfileCard } from "../../components/account/profile-card"
import { SettingsSidebar } from "../../components/account/settings-sidebar"
import { TeamMemberRow } from "../../components/account/team-member-row"
import type {
  TeamMemberRole,
  TeamMemberRowItem,
} from "../../components/account/team-member-row"
import type {
  NotificationChannel,
  NotificationChannelRowItem,
} from "../../components/account/notification-channel-row"
import { UsageMeterCard } from "../../components/account/usage-meter-card"

import {
  API_TOKENS,
  BUSINESS_NAME,
  BUSINESS_REGION,
  DANGER_ACTIONS,
  INTEGRATIONS,
  NOTIFICATION_CHANNELS,
  OWNER_PROFILE,
  OWNER_STATS,
  PLAN_CAPTION,
  PLAN_TIER,
  SETTINGS_NAV,
  TEAM_MEMBERS,
  USAGE_METERS,
  WORKSPACE_SLUG,
} from "./_demo-data"
import styles from "./settings.module.css"

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

/** Profile + plan + usage cluster. */
function ProfileSection() {
  return (
    <Section
      id="profile"
      kicker="Personal · Profile & plan"
      title="Who's steering the workshop"
      description="Your identity on every quote and reply Torque sends, plus where the Workshop plan sits this cycle."
      aside={<PlanBadge tier={PLAN_TIER} caption={PLAN_CAPTION} size="md" />}
    >
      <div className={styles.profileGrid}>
        <ProfileCard
          name={OWNER_PROFILE.name}
          role={OWNER_PROFILE.role}
          email={OWNER_PROFILE.email}
          location={OWNER_PROFILE.location}
          avatarTone="red"
          roleChipTone="red"
          stats={OWNER_STATS}
          editHref="#profile"
          editLabel="Edit profile"
        />
        <div className={styles.usageGrid} aria-label="Plan usage this cycle">
          {USAGE_METERS.map((meter) => (
            <UsageMeterCard
              key={meter.id}
              label={meter.label}
              used={meter.used}
              limit={meter.limit}
              unit={meter.unit}
              resetDate={meter.resetDate}
              tone={meter.tone}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

/** Notification channel rows with local enable/disable state. */
function NotificationsSection() {
  const [channels, setChannels] = useState<ReadonlyArray<NotificationChannelRowItem>>(
    NOTIFICATION_CHANNELS,
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
      id="notifications"
      kicker="Personal · Notifications"
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

/** Read-only workspace identity card (name, region, slug). */
function WorkspaceSection() {
  return (
    <Section
      id="workspace"
      kicker="Workspace · General"
      title="Workspace details"
      description="The business identity Torque uses across the public site, quotes and social posts."
    >
      <dl className={styles.workspaceGrid}>
        <div className={styles.workspaceField}>
          <dt>Workspace name</dt>
          <dd>{BUSINESS_NAME}</dd>
        </div>
        <div className={styles.workspaceField}>
          <dt>Region</dt>
          <dd>{BUSINESS_REGION}</dd>
        </div>
        <div className={styles.workspaceField}>
          <dt>Workspace URL</dt>
          <dd>
            <span className={styles.slugMono}>torque.app/{WORKSPACE_SLUG}</span>
          </dd>
        </div>
        <div className={styles.workspaceField}>
          <dt>Assistant</dt>
          <dd>Torque · your Mufflermen business assistant</dd>
        </div>
      </dl>
    </Section>
  )
}

/** Team roster with inline role selects + remove, holding local roles. */
function TeamSection() {
  const [members, setMembers] = useState<ReadonlyArray<TeamMemberRowItem>>(TEAM_MEMBERS)

  const handleRoleChange = useCallback((id: string, role: TeamMemberRole) => {
    setMembers((current) =>
      current.map((member) => (member.id === id ? { ...member, role } : member)),
    )
  }, [])

  const handleRemove = useCallback((id: string) => {
    setMembers((current) => current.filter((member) => member.id !== id))
  }, [])

  return (
    <Section
      id="team"
      kicker="Workspace · Team & roles"
      title="The bay crew"
      description="Set what each technician, manager and office hand can see and do. Owners can't be removed from here."
      aside={
        <span className={styles.tally}>
          <strong>{members.length}</strong> of 10 seats
        </span>
      }
    >
      <div className={styles.rowStack} role="list" aria-label="Team members">
        {members.map((member) => (
          <TeamMemberRow
            key={member.id}
            member={member}
            onRoleChange={handleRoleChange}
            onRemove={handleRemove}
            disabled={member.role === "owner"}
          />
        ))}
      </div>
    </Section>
  )
}

/** Integration tile grid. */
function IntegrationsSection() {
  return (
    <Section
      id="integrations"
      kicker="Workspace · Integrations"
      title="Connected services"
      description="The tools that feed Torque — reviews, socials, accounting, SMS, parts stock and fleet bookings."
    >
      <div className={styles.integrationGrid}>
        {INTEGRATIONS.map((integration) => (
          <IntegrationTile
            key={integration.id}
            name={integration.name}
            description={integration.description}
            category={integration.category}
            status={integration.status}
            lastSync={integration.lastSync}
            scopes={integration.scopes}
            actionHref={`#${integration.id}`}
            glyph={<span className={styles.integrationGlyph}>{integration.glyph}</span>}
          />
        ))}
      </div>
    </Section>
  )
}

/** API token rows with local copy/revoke state. */
function ApiTokensSection() {
  const [tokens, setTokens] = useState<ReadonlyArray<typeof API_TOKENS[number]>>(API_TOKENS)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = useCallback((id: string) => {
    setCopiedId(id)
  }, [])

  const handleRevoke = useCallback((id: string) => {
    setTokens((current) => current.filter((token) => token.id !== id))
  }, [])

  return (
    <Section
      id="api-tokens"
      kicker="Platform · API tokens"
      title="Programmatic access"
      description="Tokens that let the website, Zapier and reporting jobs talk to the workspace. Revoke anything you don't recognise."
      aside={
        <span className={styles.tally}>
          <strong>{tokens.length}</strong> active
          {copiedId && <span className={styles.copiedHint}> · copied</span>}
        </span>
      }
    >
      <div className={styles.rowStack} role="list" aria-label="API tokens">
        {tokens.map((token) => (
          <ApiTokenRow
            key={token.id}
            token={token}
            onCopy={handleCopy}
            onRevoke={handleRevoke}
          />
        ))}
      </div>
    </Section>
  )
}

/** Danger zone — destructive workspace actions. */
function DangerSection() {
  return (
    <Section
      id="danger-zone"
      kicker="Danger zone"
      title="Destructive actions"
      description="Each action needs a typed confirmation. Take care — exports, transfers and deletions move fast."
    >
      <div className={styles.dangerGrid}>
        {DANGER_ACTIONS.map((action) => (
          <DangerActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            confirmationPhrase={action.confirmationPhrase}
            actionLabel={action.actionLabel}
            tone={action.tone}
            icon={action.icon}
            consequences={action.consequences}
            helperText={action.helperText}
          />
        ))}
      </div>
    </Section>
  )
}

/** Identity band above the console body: Torque avatar + workspace summary. */
export function WorkspaceBand() {
  return (
    <section className={styles.band} aria-labelledby="settings-band-title">
      <div className={styles.bandHead}>
        <TorqueAvatar />
        <span className={styles.torqueId}>
          <span className={styles.torqueName}>Torque</span>
          <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
        </span>
      </div>
      <h2 id="settings-band-title" className={styles.bandTitle}>
        <em>{BUSINESS_NAME}</em> workspace
      </h2>
      <p className={styles.bandCopy}>
        Everything Torque needs to run the shop on your behalf — your profile and plan, the bay
        crew and their roles, the tools we&apos;re plugged into, and how we keep you in the loop.
      </p>
      <p className={styles.bandMeta}>
        <span className={styles.metaDot}>Workshop plan · live</span>
        <span>{BUSINESS_REGION}</span>
        <span className={styles.slugMono}>torque.app/{WORKSPACE_SLUG}</span>
      </p>
    </section>
  )
}

/** The full settings console: nav rail + stacked sections. */
export function SettingsConsole() {
  return (
    <div className={styles.layout}>
      <aside className={styles.rail} aria-label="Settings navigation">
        <div className={styles.railSticky}>
          <SettingsSidebar
            activeId="profile"
            items={SETTINGS_NAV}
            ariaLabel="Workspace settings"
          />
        </div>
      </aside>

      <div className={styles.body}>
        <ProfileSection />
        <NotificationsSection />
        <WorkspaceSection />
        <TeamSection />
        <IntegrationsSection />
        <ApiTokensSection />
        <DangerSection />
      </div>
    </div>
  )
}
