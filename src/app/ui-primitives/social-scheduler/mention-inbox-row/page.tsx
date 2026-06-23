import type { Metadata } from "next"

import { MentionInboxRow } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { MENTION_INBOX, PLATFORMS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Mention inbox row | Muffler Pulse",
  description:
    "Primitive 14 — unified inbox row for mention / comment / DM with sentiment + reply CTA.",
}

export default function MentionInboxRowPage() {
  const platformFor = (key: string) =>
    PLATFORMS.find((p) => p.key === key) ?? PLATFORMS[0]

  const unread = MENTION_INBOX.find((mention) => mention.unread)
  const neutral = MENTION_INBOX.find(
    (mention) => mention.sentiment === "neutral",
  )
  const negative = MENTION_INBOX.find(
    (mention) => mention.sentiment === "negative",
  )

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Mention inbox row"
        title="Mention inbox row"
        description="The unified social inbox row — one row covers comments, mentions, DMs and replies across every connected channel. Sentiment, platform, kind, and reply CTAs in one glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Mention inbox row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Unread positive comment (IG)</span>
        {unread && (
          <MentionInboxRow
            mention={unread}
            platform={platformFor(unread.platform)}
          />
        )}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Neutral comment (TikTok)</span>
        {neutral && (
          <MentionInboxRow
            mention={neutral}
            platform={platformFor(neutral.platform)}
          />
        )}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Negative mention (X) — escalate</span>
        {negative && (
          <MentionInboxRow
            mention={negative}
            platform={platformFor(negative.platform)}
          />
        )}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bonus · Full inbox list</span>
        <div className={styles.pulseMentions}>
          {MENTION_INBOX.map((mention) => (
            <MentionInboxRow
              key={mention.id}
              mention={mention}
              platform={platformFor(mention.platform)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
