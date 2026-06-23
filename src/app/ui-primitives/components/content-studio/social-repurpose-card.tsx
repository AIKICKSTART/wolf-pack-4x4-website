import { Sparkles } from "lucide-react"

import { Chip } from "../primitives"
import { GlassSurface } from "../surfaces"

import {
  REPURPOSE_CHANNEL_LABEL,
  REPURPOSE_CHANNEL_TONE,
  studioToneToChip,
  type RepurposeOutput,
} from "./content-studio-types"
import styles from "./social-repurpose-card.module.css"

interface SocialRepurposeCardProps {
  output: RepurposeOutput
  /** Title of the source article. */
  sourceTitle?: string
  className?: string
}

const STATUS_LABEL: Record<RepurposeOutput["status"], string> = {
  queued: "Queued",
  drafted: "Drafted",
  approved: "Approved",
  scheduled: "Scheduled",
}

const STATUS_TONE: Record<RepurposeOutput["status"], "neutral" | "amber" | "teal" | "green"> = {
  queued: "neutral",
  drafted: "amber",
  approved: "teal",
  scheduled: "green",
}

const CHANNEL_GLYPH: Record<RepurposeOutput["channel"], string> = {
  "twitter-thread": "X",
  "instagram-reel": "▶",
  "instagram-carousel": "▦",
  "linkedin-post": "in",
  "tiktok-script": "♪",
  "newsletter-snippet": "✉",
}

export function SocialRepurposeCard({
  output,
  sourceTitle,
  className,
}: SocialRepurposeCardProps) {
  const tone = REPURPOSE_CHANNEL_TONE[output.channel]
  const classes = [
    styles.card,
    styles[`tone_${tone}`],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <article
        className={styles.shell}
        aria-label={`${REPURPOSE_CHANNEL_LABEL[output.channel]} repurpose card`}
        data-status={output.status}
      >
        <header className={styles.head}>
          <span className={styles.glyph} aria-hidden="true">
            {CHANNEL_GLYPH[output.channel]}
          </span>
          <div className={styles.meta}>
            <span className={styles.channel}>
              {REPURPOSE_CHANNEL_LABEL[output.channel]}
            </span>
            {sourceTitle ? (
              <span className={styles.source}>From “{sourceTitle}”</span>
            ) : null}
          </div>
          <Chip
            label={STATUS_LABEL[output.status]}
            tone={STATUS_TONE[output.status]}
            selected={output.status !== "queued"}
          />
        </header>

        <div className={styles.body}>
          <span className={styles.hookLabel}>Hook</span>
          <p className={styles.hook}>{output.hookLine}</p>
          {output.snippet ? (
            <pre className={styles.snippet} aria-label="Draft preview">
              {output.snippet}
            </pre>
          ) : null}
        </div>

        <footer className={styles.foot}>
          <span className={styles.reach}>
            <Sparkles size={11} strokeWidth={2.4} aria-hidden="true" />
            <strong>{output.estimatedReach}</strong>
          </span>
          <Chip
            label={`Tone · ${tone}`}
            tone={studioToneToChip(tone)}
          />
        </footer>
      </article>
    </GlassSurface>
  )
}

export default SocialRepurposeCard
