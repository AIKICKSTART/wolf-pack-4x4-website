"use client"

import { useState } from "react"
import {
  CalendarClock,
  CheckCircle2,
  Hash,
  Image as ImageIcon,
  Send,
  ShieldCheck,
} from "lucide-react"

import {
  ApprovalStageTracker,
  CaptionAiStudio,
  CrossPlatformComposer,
  MediaBinder,
} from "../../components/social-scheduler"
import { MediaTray, StatusBadge } from "../../components/data-display"
import { LicenseChip } from "../../components/asset-library"
import { StatTile } from "../../components/primitives/stat-tile"
import { FadeIn } from "../../components/motion/fade-in"

import {
  APPROVAL_STAGES,
  BRAND_CHECKS,
  CAPTION_PRESETS,
  COMPOSER_PLATFORMS,
  COMPOSER_STATS,
  GENERATED_MEDIA,
  HASHTAG_POOL,
  MEDIA_BINDER_ITEMS,
  PROMO_CAPTION,
  PROMO_HASHTAGS,
  SCHEDULE_TIME,
} from "./_demo-data"
import styles from "./social-composer.module.css"

type PostState = "ready" | "scheduled" | "submitted"

const CHECK_TONE = {
  pass: "success",
  warn: "warn",
} as const

/**
 * Composed "Social post composer" screen for Torque — the Mufflermen business
 * assistant. A single winter exhaust-special promo, previewed across the three
 * channels the brief calls for (Instagram / Facebook / TikTok), with a
 * brand-safe caption editor, a generated-media tray and schedule/approval
 * actions. Built only from existing primitives.
 */
export function ComposerConsole() {
  const [postState, setPostState] = useState<PostState>("ready")

  const passCount = BRAND_CHECKS.filter((check) => check.state === "pass").length

  return (
    <FadeIn>
      <div className={styles.console}>
        <div className={styles.mainColumn}>
          <section
            className={styles.statRow}
            aria-label="Post readiness"
          >
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

          <CrossPlatformComposer
            eyebrow="Composer / IG · FB · TikTok"
            title="Winter cat-back special"
            platforms={COMPOSER_PLATFORMS}
            initialBody={PROMO_CAPTION}
            initialHashtags={PROMO_HASHTAGS}
          />

          <CaptionAiStudio
            presets={CAPTION_PRESETS}
            hashtagPool={HASHTAG_POOL}
            initialPreset="promo-deal"
            draft={PROMO_CAPTION}
          />

          <section
            className={styles.mediaCard}
            aria-label="Generated media tray"
          >
            <header className={styles.mediaHead}>
              <div className={styles.mediaHeadText}>
                <span className={styles.cardKicker}>
                  <ImageIcon size={12} aria-hidden="true" /> Generated media
                </span>
                <h2 className={styles.cardTitle}>Exhaust-promo media tray</h2>
              </div>
              <LicenseChip license="proprietary" showTooltip />
            </header>
            <MediaTray
              items={GENERATED_MEDIA}
              ariaLabel="Generated exhaust-promo media"
              kicker="5 assets · auto-cropped per channel"
            />
            <MediaBinder
              title="Attached — per-channel fit"
              items={MEDIA_BINDER_ITEMS}
              platforms={COMPOSER_PLATFORMS}
            />
          </section>
        </div>

        <aside className={styles.rail} aria-label="Brand safety, schedule and approval">
          <section className={styles.brandCard} aria-label="Brand-safe caption checks">
            <header className={styles.brandHead}>
              <span className={styles.cardKicker}>
                <ShieldCheck size={12} aria-hidden="true" /> Brand-safe checks
              </span>
              <span className={styles.brandCount}>
                <span className={styles.brandCountValue}>{passCount}</span> / {BRAND_CHECKS.length} clear
              </span>
            </header>
            <ul className={styles.checkList}>
              {BRAND_CHECKS.map((check) => (
                <li
                  key={check.id}
                  className={styles.checkItem}
                  data-state={check.state}
                >
                  <span className={styles.checkRow}>
                    <span className={styles.checkLabel}>{check.label}</span>
                    <StatusBadge
                      tone={CHECK_TONE[check.state]}
                      size="sm"
                      shape="pill"
                      label={check.state === "pass" ? "Pass" : "Review"}
                    />
                  </span>
                  <p className={styles.checkDetail}>{check.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <ApprovalStageTracker
            title="Schedule & approval"
            stages={APPROVAL_STAGES}
          />

          <section className={styles.scheduleCard} aria-label="Schedule actions">
            <header className={styles.scheduleHead}>
              <span className={styles.cardKicker}>
                <CalendarClock size={12} aria-hidden="true" /> Schedule
              </span>
              <span className={styles.scheduleHashtags}>
                <Hash size={11} aria-hidden="true" /> {PROMO_HASHTAGS.length} tags
              </span>
            </header>
            <p className={styles.scheduleWhen}>{SCHEDULE_TIME}</p>
            <p className={styles.scheduleNote}>
              Torque holds the post here until the owner taps approve — nothing
              fans out to a live channel without sign-off.
            </p>

            <div className={styles.scheduleActions}>
              <button
                type="button"
                className={styles.primaryBtn}
                aria-pressed={postState === "submitted"}
                onClick={() => setPostState("submitted")}
              >
                <Send size={14} aria-hidden="true" />
                {postState === "submitted" ? "Approved & queued" : "Approve & queue"}
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                aria-pressed={postState === "scheduled"}
                onClick={() => setPostState("scheduled")}
              >
                <CalendarClock size={14} aria-hidden="true" />
                Reschedule
              </button>
            </div>

            <p
              className={styles.scheduleStatus}
              data-state={postState}
              role="status"
            >
              <CheckCircle2 size={13} aria-hidden="true" />
              {postState === "submitted"
                ? "Queued for owner-approved publish across IG · FB · TikTok."
                : postState === "scheduled"
                  ? "Reschedule picker would open — pick a new bay-friendly slot."
                  : "Ready for owner sign-off."}
            </p>
          </section>
        </aside>
      </div>
    </FadeIn>
  )
}

export default ComposerConsole
