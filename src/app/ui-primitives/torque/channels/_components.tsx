"use client"

/**
 * Co-located composition pieces for the Platform channels screen.
 *
 * The page is a server component; this client island owns the interactive
 * channel state (which channels are connected, the selected directory entry,
 * the Telegram update filters) and arranges EXISTING primitives inside bespoke
 * section frames. No primitive is modified here — only imported.
 *
 * Dev-only note: the assistant brand surfaced to customers and crew is always
 * "Torque". The legacy internal codename is never used in any string below.
 */

import { useCallback, useMemo, useState, type ReactNode } from "react"

import { IntegrationTile } from "../../components/account/integration-tile"
import { AuditTrailRow } from "../../components/connectors/audit-trail-row"
import { ConnectionTestResult } from "../../components/connectors/connection-test-result"
import { IntegrationHealthTile } from "../../components/connectors/integration-health-tile"
import { ProviderDirectoryCard } from "../../components/connectors/provider-directory-card"
import { WebhookConfigCard } from "../../components/connectors/webhook-config-card"
import { NotificationRuleRow } from "../../components/forms-platform/notification-rule-row"

import {
  BUSINESS_REGION,
  CHANNELS,
  CHANNEL_AUDIT,
  CHANNEL_DIRECTORY,
  CHANNEL_HEALTH,
  ROUTING_RULES,
  TELEGRAM_AUTHORISED_USERS,
  TELEGRAM_BOT,
  TELEGRAM_TEST,
  TELEGRAM_UPDATE_EVENTS,
  WORKSPACE_SLUG,
} from "./_demo-data"
import styles from "./channels.module.css"

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
          {description ? <p className={styles.sectionDesc}>{description}</p> : null}
        </span>
        {aside ? <span className={styles.sectionAside}>{aside}</span> : null}
      </header>
      {children}
    </section>
  )
}

/** Connected-channel grid — IntegrationTile per messaging surface. */
function ChannelsGridSection() {
  const liveCount = useMemo(
    () => CHANNELS.filter((channel) => channel.status === "connected").length,
    [],
  )

  return (
    <Section
      id="channels"
      kicker="Connected · Channels"
      title="Where Torque answers customers"
      description="Every place a customer can reach Oak Flats — Torque drafts the reply, hands over to the crew when it needs a human, and keeps the booking flow identical across all of them."
      aside={
        <span className={styles.tally}>
          <strong>{liveCount}</strong> of {CHANNELS.length} live
        </span>
      }
    >
      <div className={styles.channelGrid}>
        {CHANNELS.map((channel) => (
          <IntegrationTile
            key={channel.id}
            name={channel.name}
            description={channel.description}
            category={channel.category}
            status={channel.status}
            lastSync={channel.lastSync}
            scopes={channel.scopes}
            actionHref={`#${channel.id}`}
            glyph={<span className={styles.channelGlyph}>{channel.glyph}</span>}
          />
        ))}
      </div>
    </Section>
  )
}

/** Live channel health — error-rate sparklines per active surface. */
function ChannelHealthSection() {
  return (
    <Section
      id="health"
      kicker="Connected · Health"
      title="Channel health"
      description="Live delivery and error rates so a stalled channel never goes unnoticed. SMS is trending up — worth a look before the weekend rush."
    >
      <div className={styles.healthGrid}>
        {CHANNEL_HEALTH.map((channel) => (
          <IntegrationHealthTile
            key={channel.id}
            provider={channel.provider}
            monogram={channel.monogram}
            status={channel.status}
            lastSync={channel.lastSync}
            errorRate={channel.errorRate}
            errorRateSeries={channel.errorRateSeries}
            throughput={channel.throughput}
          />
        ))}
      </div>
    </Section>
  )
}

/** Add-a-channel marketplace — directory cards with a click-to-select flow. */
function AddChannelSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = useMemo(
    () => CHANNEL_DIRECTORY.find((entry) => entry.id === selectedId) ?? null,
    [selectedId],
  )

  const handleSelect = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id))
  }, [])

  return (
    <Section
      id="add-channel"
      kicker="Add a channel"
      title="Connect another channel"
      description="Pick a channel to add it to the workshop. Torque inherits your quote, booking and handover flow automatically — no extra setup once it's connected."
      aside={
        <span className={styles.tally} aria-live="polite">
          {selected ? (
            <>
              <strong>{selected.provider}</strong> ready
            </>
          ) : (
            <>
              <strong>{CHANNEL_DIRECTORY.length}</strong> available
            </>
          )}
        </span>
      }
    >
      <ul className={styles.directoryGrid} aria-label="Available channels to connect">
        {CHANNEL_DIRECTORY.map((entry) => {
          const isSelected = entry.id === selectedId
          return (
            <li
              key={entry.id}
              className={[styles.directoryItem, isSelected ? styles.directoryItemOn : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <ProviderDirectoryCard
                provider={entry.provider}
                monogram={entry.monogram}
                description={entry.description}
                category={entry.category}
                installs={entry.installs}
                verifiedLabel={entry.verifiedLabel}
                installed={entry.installed}
                accent={entry.accent}
              />
              <button
                type="button"
                className={styles.directoryCta}
                onClick={() => handleSelect(entry.id)}
                aria-pressed={isSelected}
                aria-label={`${entry.provider} — ${entry.installed ? "reconnect" : "add channel"}`}
                disabled={entry.installed}
              >
                {entry.installed ? "Reconnect" : isSelected ? "Selected ✓" : "Add channel"}
              </button>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/** Compact authorised-users list for the Telegram bot. */
function AuthorisedUsersList() {
  return (
    <div className={styles.authCard}>
      <div className={styles.authHead}>
        <span className={styles.fieldLabel}>Authorised users</span>
        <span className={styles.tally}>
          <strong>{TELEGRAM_AUTHORISED_USERS.length}</strong> crew
        </span>
      </div>
      <ul className={styles.authList} aria-label="Crew authorised to operate the Telegram bot">
        {TELEGRAM_AUTHORISED_USERS.map((user) => (
          <li key={user.id} className={styles.authRow}>
            <span className={styles.authAvatar} aria-hidden="true">
              {user.initials}
            </span>
            <span className={styles.authIdentity}>
              <span className={styles.authName}>{user.name}</span>
              <code className={styles.authHandle}>{user.handle}</code>
            </span>
            <span className={styles.authRole}>{user.role}</span>
            <span
              className={[styles.authBadge, user.isAdmin ? styles.authBadgeAdmin : ""]
                .filter(Boolean)
                .join(" ")}
            >
              {user.isAdmin ? "Admin" : "Reply only"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Telegram-bot setup — token + update filters, authorised crew, test result. */
function TelegramSetupSection() {
  const [updateCount, setUpdateCount] = useState<number>(
    () => TELEGRAM_UPDATE_EVENTS.filter((event) => event.defaultEnabled).length,
  )

  const handleEventsChange = useCallback((enabledIds: ReadonlyArray<string>) => {
    setUpdateCount(enabledIds.length)
  }, [])

  return (
    <Section
      id="telegram"
      kicker="Setup · Telegram bot"
      title="Telegram bot"
      description="Paste the BotFather token, choose which updates Torque listens for, and run a test before it goes live in the chat."
      aside={
        <span className={styles.tally} aria-live="polite">
          <strong>{updateCount}</strong> updates on
        </span>
      }
    >
      <div className={styles.telegramGrid}>
        <div className={styles.telegramConfig}>
          <WebhookConfigCard
            source={TELEGRAM_BOT.source}
            endpoint={TELEGRAM_BOT.endpoint}
            signingSecret={TELEGRAM_BOT.botToken}
            status="connected"
            events={TELEGRAM_UPDATE_EVENTS}
            onEventsChange={handleEventsChange}
          />
          <AuthorisedUsersList />
        </div>
        <div className={styles.telegramTest}>
          <ConnectionTestResult
            endpoint={TELEGRAM_TEST.endpoint}
            status={TELEGRAM_TEST.status}
            statusCode={TELEGRAM_TEST.statusCode}
            latencyMs={TELEGRAM_TEST.latencyMs}
            testedAt={TELEGRAM_TEST.testedAt}
            region={TELEGRAM_TEST.region}
            samplePayload={TELEGRAM_TEST.samplePayload}
          />
        </div>
      </div>
    </Section>
  )
}

/** Per-channel routing rules. */
function RoutingSection() {
  const onCount = useMemo(
    () => ROUTING_RULES.filter((rule) => rule.enabled).length,
    [],
  )

  return (
    <Section
      id="routing"
      kicker="Routing · Rules"
      title="What happens after a message"
      description="How Torque routes each conversation — auto-drafts, confirmations, and the escalations that need a human at the front desk."
      aside={
        <span className={styles.tally}>
          <strong>{onCount}</strong> of {ROUTING_RULES.length} active
        </span>
      }
    >
      <div className={styles.routingStack}>
        {ROUTING_RULES.map((rule) => (
          <NotificationRuleRow key={rule.id} rule={rule} />
        ))}
      </div>
    </Section>
  )
}

/** Connect / disconnect audit trail. */
function AuditSection() {
  return (
    <Section
      id="audit"
      kicker="Activity · Audit trail"
      title="Channel activity"
      description="Every connect, disconnect and scope change — who did it, from where, and when."
    >
      <div className={styles.auditStack}>
        {CHANNEL_AUDIT.map((entry) => (
          <AuditTrailRow
            key={entry.id}
            action={entry.action}
            connector={entry.connector}
            actor={entry.actor}
            actorInitials={entry.actorInitials}
            ip={entry.ip}
            occurredAt={entry.occurredAt}
            note={entry.note}
          />
        ))}
      </div>
    </Section>
  )
}

/** Identity band above the console body: Torque avatar + channel summary. */
export function ChannelsBand() {
  const liveCount = CHANNELS.filter((channel) => channel.status === "connected").length
  return (
    <section className={styles.band} aria-labelledby="channels-band-title">
      <div className={styles.bandHead}>
        <TorqueAvatar />
        <span className={styles.torqueId}>
          <span className={styles.torqueName}>Torque</span>
          <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
        </span>
      </div>
      <h2 id="channels-band-title" className={styles.bandTitle}>
        <em>Platform</em> channels
      </h2>
      <p className={styles.bandCopy}>
        One assistant, every channel. Connect Telegram, the website chat, SMS, email and more, and
        Torque answers exhaust enquiries, quotes jobs and books the bays — wherever the customer
        starts the conversation.
      </p>
      <p className={styles.bandMeta}>
        <span className={styles.metaDot}>
          {liveCount} channels live
        </span>
        <span>{BUSINESS_REGION}</span>
        <span className={styles.slugMono}>torque.app/{WORKSPACE_SLUG}/channels</span>
      </p>
    </section>
  )
}

/** The full channels console: connected grid → health → add → telegram → routing → audit. */
export function ChannelsConsole() {
  return (
    <div className={styles.body}>
      <ChannelsGridSection />
      <ChannelHealthSection />
      <AddChannelSection />
      <TelegramSetupSection />
      <RoutingSection />
      <AuditSection />
    </div>
  )
}
