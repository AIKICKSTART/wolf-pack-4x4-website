"use client"

import { useMemo, useState } from "react"
import {
  CalendarClock,
  CheckCircle2,
  Image as ImageIcon,
  LayoutPanelTop,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react"

import {
  BlockLibraryPalette,
  EmailCanvas,
  FooterAssembler,
  PersonalizationTokenPicker,
  PreheaderEditor,
  SendTestEmailCard,
  SpamScoreCheck,
} from "../../components/email-builder"
import {
  EmailMonthlyDigest,
  EmailPreviewFrame,
} from "../../components/emails"
import { ApprovalStageTracker } from "../../components/social-scheduler"
import { MediaTray, StatusBadge } from "../../components/data-display"
import { StatTile } from "../../components/primitives/stat-tile"
import { FadeIn } from "../../components/motion/fade-in"

import {
  APPROVAL_STAGES,
  AUDIENCE_SEGMENTS,
  BLOCK_PALETTE_SECTIONS,
  CAMPAIGN_MEDIA,
  CAMPAIGN_PREHEADER,
  CAMPAIGN_SUBJECT,
  COMPOSER_STATS,
  DELIVERABILITY_HINTS,
  DIGEST_ARTICLES,
  DIGEST_STATS,
  EMAIL_BLOCKS,
  FROM_LINE,
  PERSONALIZATION_TOKENS,
  PREVIEW_TO,
  SEND_TIME,
  SEND_TIMEZONE,
  SPAM_BODY_EXCERPT,
  SPAM_SCORE,
  SPAM_WARNINGS,
  TEST_RECIPIENTS,
  TEST_VARIANTS,
} from "./_demo-data"
import styles from "./email-campaign.module.css"

type SendState = "ready" | "rescheduled" | "approved"

const HINT_TONE = {
  pass: "success",
  warn: "warn",
} as const

/**
 * Composed "Email campaign composer" screen for Torque — the Oak Flats Muffler
 * Men business assistant. A single real winter newsletter/promo campaign: a
 * block-based email body on the build canvas, a rendered inbox preview, an
 * audience segment, deliverability hints, and an owner approval-before-send
 * gate. Built only from existing primitives.
 *
 * NOTE (dev only): the agent runtime is internally codenamed Hermes; all
 * customer-visible copy uses "Torque".
 */
export function CampaignConsole() {
  const [sendState, setSendState] = useState<SendState>("ready")
  const [segmentId, setSegmentId] = useState<string>(
    AUDIENCE_SEGMENTS.find((segment) => segment.selected)?.id ??
      AUDIENCE_SEGMENTS[0].id,
  )

  const activeSegment = useMemo(
    () =>
      AUDIENCE_SEGMENTS.find((segment) => segment.id === segmentId) ??
      AUDIENCE_SEGMENTS[0],
    [segmentId],
  )

  const passCount = DELIVERABILITY_HINTS.filter(
    (hint) => hint.state === "pass",
  ).length

  return (
    <FadeIn>
      <div className={styles.console}>
        <div className={styles.mainColumn}>
          <section className={styles.statRow} aria-label="Campaign readiness">
            {COMPOSER_STATS.map((stat) => (
              <StatTile
                key={stat.id}
                label={stat.label}
                value={stat.value}
                unit={stat.unit}
                tone={stat.tone}
                caption={stat.caption}
              />
            ))}
          </section>

          <PreheaderEditor
            defaultSubject={CAMPAIGN_SUBJECT}
            defaultPreheader={CAMPAIGN_PREHEADER}
          />

          <section className={styles.builderCard} aria-label="Block-based email body">
            <header className={styles.cardHead}>
              <div className={styles.cardHeadText}>
                <span className={styles.cardKicker}>
                  <LayoutPanelTop size={12} aria-hidden="true" /> Email body
                </span>
                <h2 className={styles.cardTitle}>Block-based body</h2>
              </div>
              <StatusBadge
                tone="brand"
                size="sm"
                shape="pill"
                label={`${EMAIL_BLOCKS.length} blocks`}
              />
            </header>
            <div className={styles.builderGrid}>
              <BlockLibraryPalette
                sections={BLOCK_PALETTE_SECTIONS}
                className={styles.palette}
              />
              <EmailCanvas
                subject={CAMPAIGN_SUBJECT}
                preheader={CAMPAIGN_PREHEADER}
                fromLine={FROM_LINE}
                blocks={EMAIL_BLOCKS}
                selectedBlockId="blk-cta"
              />
            </div>
          </section>

          <section className={styles.previewCard} aria-label="Rendered inbox preview">
            <header className={styles.cardHead}>
              <div className={styles.cardHeadText}>
                <span className={styles.cardKicker}>
                  <ImageIcon size={12} aria-hidden="true" /> Inbox preview
                </span>
                <h2 className={styles.cardTitle}>How it lands in the inbox</h2>
              </div>
            </header>
            <EmailPreviewFrame
              meta={{
                from: FROM_LINE,
                to: PREVIEW_TO,
                subject: CAMPAIGN_SUBJECT,
              }}
              email={
                <EmailMonthlyDigest
                  recipientFirstName="Daniel"
                  monthLabel="June"
                  stats={DIGEST_STATS}
                  articles={DIGEST_ARTICLES}
                  workshopAddress="Unit 4 / 12 Cygnet Place, Oak Flats NSW 2529"
                  workshopPhone="(02) 4256 1800"
                  unsubscribeUrl="https://mufflermen.com.au/unsubscribe"
                />
              }
            />
          </section>

          <div className={styles.toolingGrid}>
            <PersonalizationTokenPicker tokens={PERSONALIZATION_TOKENS} />
            <section className={styles.mediaCard} aria-label="Campaign media">
              <MediaTray
                items={CAMPAIGN_MEDIA}
                ariaLabel="Winter campaign brand media"
                kicker="5 brand assets · pre-sized for the 600px column"
              />
            </section>
          </div>
        </div>

        <aside
          className={styles.rail}
          aria-label="Audience, deliverability, approval and send"
        >
          <section className={styles.segmentCard} aria-label="Audience segment">
            <header className={styles.segmentHead}>
              <span className={styles.cardKicker}>
                <Users size={12} aria-hidden="true" /> Audience segment
              </span>
              <span className={styles.segmentCount}>
                <span className={styles.segmentCountValue}>
                  {activeSegment.recipients.toLocaleString("en-AU")}
                </span>{" "}
                recipients
              </span>
            </header>
            <ul className={styles.segmentList} role="radiogroup" aria-label="Choose audience segment">
              {AUDIENCE_SEGMENTS.map((segment) => {
                const isActive = segment.id === segmentId
                return (
                  <li key={segment.id}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      className={styles.segmentOption}
                      data-active={isActive ? "true" : "false"}
                      onClick={() => setSegmentId(segment.id)}
                    >
                      <span className={styles.segmentRadio} aria-hidden="true" />
                      <span className={styles.segmentBody}>
                        <span className={styles.segmentName}>{segment.name}</span>
                        <span className={styles.segmentDesc}>
                          {segment.description}
                        </span>
                      </span>
                      <span className={styles.segmentReach}>
                        {segment.recipients.toLocaleString("en-AU")}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <SpamScoreCheck
            score={SPAM_SCORE}
            subject={CAMPAIGN_SUBJECT}
            bodyExcerpt={SPAM_BODY_EXCERPT}
            warnings={SPAM_WARNINGS}
          />

          <section className={styles.hintCard} aria-label="Deliverability hints">
            <header className={styles.hintHead}>
              <span className={styles.cardKicker}>
                <ShieldCheck size={12} aria-hidden="true" /> Deliverability hints
              </span>
              <span className={styles.hintCount}>
                <span className={styles.hintCountValue}>{passCount}</span> /{" "}
                {DELIVERABILITY_HINTS.length} clear
              </span>
            </header>
            <ul className={styles.hintList}>
              {DELIVERABILITY_HINTS.map((hint) => (
                <li
                  key={hint.id}
                  className={styles.hintItem}
                  data-state={hint.state}
                >
                  <span className={styles.hintRow}>
                    <span className={styles.hintLabel}>{hint.label}</span>
                    <StatusBadge
                      tone={HINT_TONE[hint.state]}
                      size="sm"
                      shape="pill"
                      label={hint.state === "pass" ? "Pass" : "Review"}
                    />
                  </span>
                  <p className={styles.hintDetail}>{hint.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <ApprovalStageTracker
            title="Approval before send"
            stages={APPROVAL_STAGES}
          />

          <FooterAssembler />

          <SendTestEmailCard
            defaultRecipients={TEST_RECIPIENTS}
            variants={TEST_VARIANTS}
          />

          <section className={styles.sendCard} aria-label="Send actions">
            <header className={styles.sendHead}>
              <span className={styles.cardKicker}>
                <CalendarClock size={12} aria-hidden="true" /> Scheduled send
              </span>
            </header>
            <p className={styles.sendWhen}>{SEND_TIME}</p>
            <p className={styles.sendNote}>{SEND_TIMEZONE}</p>
            <p className={styles.sendNote}>
              Torque holds the campaign here until the owner taps approve —
              nothing sends to {activeSegment.recipients.toLocaleString("en-AU")}{" "}
              inboxes without sign-off.
            </p>

            <div className={styles.sendActions}>
              <button
                type="button"
                className={styles.primaryBtn}
                aria-pressed={sendState === "approved"}
                onClick={() => setSendState("approved")}
              >
                <Send size={14} aria-hidden="true" />
                {sendState === "approved"
                  ? "Approved & queued"
                  : "Approve & queue send"}
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                aria-pressed={sendState === "rescheduled"}
                onClick={() => setSendState("rescheduled")}
              >
                <CalendarClock size={14} aria-hidden="true" />
                Reschedule
              </button>
            </div>

            <p className={styles.sendStatus} data-state={sendState} role="status">
              <CheckCircle2 size={13} aria-hidden="true" />
              {sendState === "approved"
                ? `Queued — sends to ${activeSegment.name} at ${SEND_TIME}.`
                : sendState === "rescheduled"
                  ? "Reschedule picker would open — pick a new send window."
                  : "Ready for owner sign-off."}
            </p>
          </section>
        </aside>
      </div>
    </FadeIn>
  )
}

export default CampaignConsole
