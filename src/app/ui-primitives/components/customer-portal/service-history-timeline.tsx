"use client"

import { Chip } from "../primitives/chip"
import { SpannerIcon } from "../icons/spanner"
import { CatBackSystemIcon } from "../icons/cat-back-system"
import { ShieldTickIcon } from "../icons/shield-tick"
import { DynoCurveIcon } from "../icons/dyno-curve"
import { ClipboardCheckIcon } from "../icons/clipboard-check"
import {
  SERVICE_KIND_LABEL,
  SERVICE_KIND_TONE,
  formatAud,
  formatKm,
  portalToneToChip,
  type ServiceHistoryEntry,
  type ServiceHistoryKind,
} from "./customer-portal-types"

import styles from "./service-history-timeline.module.css"

interface ServiceHistoryTimelineProps {
  entries: ReadonlyArray<ServiceHistoryEntry>
  /** Optional vehicle label headline. */
  vehicleLabel?: string
  /** Optional download click handler — receives the entry id. */
  onDownload?: (entryId: string) => void
  className?: string
}

const KIND_ICON: Readonly<Record<ServiceHistoryKind, typeof SpannerIcon>> = {
  service: SpannerIcon,
  exhaust: CatBackSystemIcon,
  roadworthy: ShieldTickIcon,
  dyno: DynoCurveIcon,
  warranty: ClipboardCheckIcon,
  recall: ClipboardCheckIcon,
}

export function ServiceHistoryTimeline({
  entries,
  vehicleLabel,
  onDownload,
  className,
}: ServiceHistoryTimelineProps) {
  const classes = [styles.timeline, className].filter(Boolean).join(" ")
  const totalSpend = entries.reduce((acc, entry) => acc + entry.invoiceAud, 0)

  return (
    <section
      className={classes}
      aria-label={
        vehicleLabel
          ? `Service history for ${vehicleLabel}`
          : "Service history timeline"
      }
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Service history</span>
          <h3 className={styles.title}>
            {vehicleLabel ?? "Across your garage"}
          </h3>
        </div>
        <dl className={styles.stats}>
          <div>
            <dt>Entries</dt>
            <dd>{entries.length}</dd>
          </div>
          <div>
            <dt>Lifetime spend</dt>
            <dd>{formatAud(totalSpend, 0)}</dd>
          </div>
        </dl>
      </header>

      {entries.length === 0 ? (
        <p className={styles.empty}>
          No history yet — your first service will show here once we&apos;ve
          locked the spanners away.
        </p>
      ) : (
        <ol className={styles.list}>
          {entries.map((entry) => {
            const Icon = KIND_ICON[entry.kind]
            const tone = portalToneToChip(SERVICE_KIND_TONE[entry.kind])
            const kindLabel = SERVICE_KIND_LABEL[entry.kind]
            return (
              <li key={entry.id} className={styles.entry}>
                <span className={styles.bullet} aria-hidden="true">
                  <Icon size={22} tone="currentColor" motion="none" />
                </span>
                <article className={styles.entryCard}>
                  <header className={styles.entryHead}>
                    <div>
                      <time className={styles.entryDate}>{entry.date}</time>
                      <h4 className={styles.entryTitle}>{entry.title}</h4>
                    </div>
                    <Chip label={kindLabel} tone={tone} />
                  </header>
                  <p className={styles.entrySummary}>{entry.summary}</p>
                  <dl className={styles.entryFacts}>
                    <div>
                      <dt>Odometer</dt>
                      <dd>{formatKm(entry.odometerKm)}</dd>
                    </div>
                    <div>
                      <dt>Tech</dt>
                      <dd>{entry.techName}</dd>
                    </div>
                    <div>
                      <dt>Invoice</dt>
                      <dd>{formatAud(entry.invoiceAud)}</dd>
                    </div>
                  </dl>
                  {entry.pdfHref || onDownload ? (
                    <footer className={styles.entryFoot}>
                      {entry.pdfHref ? (
                        <a
                          className={styles.docLink}
                          href={entry.pdfHref}
                          download
                          aria-label={`Download ${entry.pdfLabel ?? entry.title} PDF`}
                        >
                          {entry.pdfLabel ?? "Download receipt PDF"}
                        </a>
                      ) : null}
                      {onDownload ? (
                        <button
                          type="button"
                          className={styles.docButton}
                          onClick={() => onDownload(entry.id)}
                        >
                          PDF
                        </button>
                      ) : null}
                    </footer>
                  ) : null}
                </article>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}

export default ServiceHistoryTimeline
