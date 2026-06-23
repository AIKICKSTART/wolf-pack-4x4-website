import { Sparkline } from "../charts/sparkline"
import { Chip } from "../primitives/chip"
import styles from "./support-ticket-volume-card.module.css"

export type SentimentDirection = "up" | "down" | "flat"

interface SupportTicketVolumeCardProps {
  customerName: string
  /** Open ticket count right now. */
  openTickets: number
  /** Tickets in the trailing window. */
  trailingTickets: number
  /** Window label, e.g. "last 30 days". */
  window?: string
  /** Volume per period. */
  volumePoints: ReadonlyArray<number>
  /** Sentiment scaled -100..100 per period. */
  sentimentPoints: ReadonlyArray<number>
  /** Sentiment delta direction summary. */
  sentimentDirection: SentimentDirection
  /** Sentiment delta value (display only). */
  sentimentDelta?: string
  className?: string
}

const SENTIMENT_TONE: Record<SentimentDirection, "red" | "amber" | "teal" | "green"> = {
  up: "green",
  down: "red",
  flat: "amber",
}

const SENTIMENT_LABEL: Record<SentimentDirection, string> = {
  up: "Improving",
  down: "Declining",
  flat: "Steady",
}

export function SupportTicketVolumeCard({
  customerName,
  openTickets,
  trailingTickets,
  window = "last 30 days",
  volumePoints,
  sentimentPoints,
  sentimentDirection,
  sentimentDelta,
  className,
}: SupportTicketVolumeCardProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      aria-label={`Support volume for ${customerName} — ${openTickets} open tickets, ${trailingTickets} ${window}.`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Support · {customerName}</span>
          <h3 className={styles.title}>{trailingTickets} tickets</h3>
          <span className={styles.subtitle}>{window}</span>
        </div>
        <Chip
          label={`${openTickets} open`}
          tone={openTickets >= 5 ? "red" : openTickets >= 2 ? "amber" : "green"}
        />
      </header>

      <div className={styles.block}>
        <div className={styles.blockHead}>
          <span className={styles.label}>Volume</span>
        </div>
        <Sparkline
          points={[...volumePoints]}
          tone="teal"
          ariaLabel={`Ticket volume trend — ${volumePoints.length} samples`}
          height={48}
          width={260}
        />
      </div>

      <div className={styles.block}>
        <div className={styles.blockHead}>
          <span className={styles.label}>Sentiment</span>
          <Chip
            label={`${SENTIMENT_LABEL[sentimentDirection]}${sentimentDelta ? ` · ${sentimentDelta}` : ""}`}
            tone={SENTIMENT_TONE[sentimentDirection]}
          />
        </div>
        <Sparkline
          points={[...sentimentPoints]}
          tone={SENTIMENT_TONE[sentimentDirection]}
          ariaLabel={`Sentiment trend — ${sentimentPoints.length} samples, ${SENTIMENT_LABEL[sentimentDirection]}`}
          height={48}
          width={260}
        />
      </div>
    </section>
  )
}

export default SupportTicketVolumeCard
