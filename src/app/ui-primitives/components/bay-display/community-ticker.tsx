import { CalendarDays, Megaphone, Trophy } from "lucide-react"

import { Marquee } from "../primitives/marquee"
import styles from "./community-ticker.module.css"

export type CommunityKind = "footy" | "event" | "notice"

export interface CommunityItem {
  id: string
  kind: CommunityKind
  /** Headline copy — "Steelers 24 — Knights 12 (HT)". */
  headline: string
  /** Optional supporting line — "Try to Latrell, conversion good". */
  detail?: string
}

export interface CommunityTickerProps {
  items: ReadonlyArray<CommunityItem>
  speed?: number
  className?: string
}

const KIND_LABEL: Readonly<Record<CommunityKind, string>> = {
  footy: "Footy",
  event: "Local",
  notice: "Notice",
}

function KindIcon({ kind }: { kind: CommunityKind }) {
  if (kind === "footy") return <Trophy size={14} strokeWidth={2.4} aria-hidden="true" />
  if (kind === "event") return <CalendarDays size={14} strokeWidth={2.4} aria-hidden="true" />
  return <Megaphone size={14} strokeWidth={2.4} aria-hidden="true" />
}

export function CommunityTicker({
  items,
  speed = 28,
  className,
}: CommunityTickerProps) {
  const classes = [styles.ticker, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Community ticker"
    >
      <span className={styles.label}>
        <Megaphone size={18} strokeWidth={2.4} aria-hidden="true" />
        Around town
      </span>
      <div className={styles.scroll}>
        <Marquee
          speed={speed}
          pauseOnHover
          gap={56}
          fadeEdges={false}
          ariaLabel="Local community headlines"
        >
          {items.map((item) => (
            <span
              key={item.id}
              className={styles.item}
              data-kind={item.kind}
            >
              <span className={styles.chip}>
                <KindIcon kind={item.kind} />
                {KIND_LABEL[item.kind]}
              </span>
              <strong className={styles.headline}>{item.headline}</strong>
              {item.detail && <em className={styles.detail}>{item.detail}</em>}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default CommunityTicker
