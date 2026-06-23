"use client"

import { CalendarPlus, Check } from "lucide-react"
import Image from "next/image"

import styles from "./booking-confirmation-card.module.css"
import type { BookingConfirmation } from "./booking-widget-types"

interface BookingConfirmationCardProps {
  confirmation: BookingConfirmation
  /** Optional handlers for the three calendar buttons. */
  onAddToGoogle?: () => void
  onAddToApple?: () => void
  onAddToOutlook?: () => void
  /** Optional URL for the reference QR. When omitted, a placeholder pattern is drawn. */
  qrUrl?: string
}

/**
 * A small inline SVG pseudo-QR. It is not a real QR — only a recognisable
 * pixel pattern so the card looks real in the showcase without pulling in
 * a QR runtime. Real callers pass `qrUrl` to render an actual image.
 */
function FauxQr({ seed }: { seed: string }) {
  const grid = 11
  const cells: boolean[][] = []
  for (let y = 0; y < grid; y += 1) {
    const row: boolean[] = []
    for (let x = 0; x < grid; x += 1) {
      const corner =
        (x < 3 && y < 3) ||
        (x > grid - 4 && y < 3) ||
        (x < 3 && y > grid - 4)
      const cornerInner = corner && (x === 1 || x === grid - 2) && (y === 1 || y === grid - 2)
      if (cornerInner) {
        row.push(false)
      } else if (corner) {
        row.push(true)
      } else {
        const charSum = seed.charCodeAt((x * 7 + y * 13) % seed.length)
        row.push(((charSum + x + y) & 3) === 1)
      }
    }
    cells.push(row)
  }
  return (
    <svg
      className={styles.qr}
      viewBox={`0 0 ${grid} ${grid}`}
      role="img"
      aria-label="Booking reference QR"
    >
      <rect width={grid} height={grid} className={styles.qrPaper} />
      {cells.flatMap((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} className={styles.qrCell} />
          ) : null,
        ),
      )}
    </svg>
  )
}

export function BookingConfirmationCard({
  confirmation,
  onAddToGoogle,
  onAddToApple,
  onAddToOutlook,
  qrUrl,
}: BookingConfirmationCardProps) {
  return (
    <article
      className={styles.card}
      role="status"
      aria-live="polite"
      aria-label="Booking confirmed"
    >
      <header className={styles.head}>
        <span className={styles.tick}>
          <Check size={18} strokeWidth={3} aria-hidden="true" />
        </span>
        <div className={styles.headBody}>
          <span className={styles.kicker}>Booking confirmed</span>
          <h3 className={styles.title}>You&apos;re in. We&apos;ll see you at the bay.</h3>
        </div>
      </header>

      <dl className={styles.details}>
        <div>
          <dt>Reference</dt>
          <dd className={styles.mono}>{confirmation.bookingId}</dd>
        </div>
        <div>
          <dt>Service</dt>
          <dd>{confirmation.serviceName}</dd>
        </div>
        <div>
          <dt>When</dt>
          <dd>
            <strong>{confirmation.dateLabel}</strong>
            <span className={styles.timeLabel}>{confirmation.timeLabel}</span>
            <span className={styles.muted}>{confirmation.durationLabel}</span>
          </dd>
        </div>
        <div>
          <dt>Bay</dt>
          <dd>{confirmation.bayLabel}</dd>
        </div>
        <div>
          <dt>Customer</dt>
          <dd>
            {confirmation.customer.fullName}
            <span className={styles.muted}>{confirmation.customer.phone}</span>
          </dd>
        </div>
      </dl>

      <div className={styles.qrBlock}>
        {qrUrl ? (
          <Image
            className={styles.qrImage}
            src={qrUrl}
            alt={`QR code for booking ${confirmation.bookingId}`}
            width={88}
            height={88}
            unoptimized
          />
        ) : (
          <FauxQr seed={confirmation.bookingId} />
        )}
        <span className={styles.qrLabel}>Scan at the bay</span>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.action} onClick={onAddToGoogle}>
          <CalendarPlus size={14} strokeWidth={2.2} aria-hidden="true" />
          Google
        </button>
        <button type="button" className={styles.action} onClick={onAddToApple}>
          <CalendarPlus size={14} strokeWidth={2.2} aria-hidden="true" />
          Apple
        </button>
        <button type="button" className={styles.action} onClick={onAddToOutlook}>
          <CalendarPlus size={14} strokeWidth={2.2} aria-hidden="true" />
          Outlook
        </button>
      </div>
    </article>
  )
}

export default BookingConfirmationCard
