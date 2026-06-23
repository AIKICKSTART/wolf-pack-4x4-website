"use client"

/**
 * Quote builder console — the interactive composition for the Workshop Pro
 * estimate/quote builder. Arranges EXISTING registered primitives (quotes +
 * commerce + data-display + forms) plus a little bespoke brand chrome (the
 * Torque command band, the totals rail, the convert-to-job action band).
 *
 * No primitive is modified here — every component is imported and called by its
 * public prop contract. State is local-only and exists purely to make the demo
 * feel live (line edits, discount tweaks, action acknowledgements).
 *
 * Dev-only note: the assistant brand surfaced to the owner is always "Torque".
 * The legacy internal codename never appears in any customer-visible string.
 */

import { ArrowRight, Check, FileText, Wrench } from "lucide-react"
import { useState } from "react"

import { MediaTray } from "../../components/data-display/media-tray"
import { StatusBadge } from "../../components/data-display/status-badge-grid"
import {
  DiscountEditor,
  DuplicateDetectionBanner,
  QuoteAcceptanceTracker,
  QuoteLineItem,
  QuoteValidityCountdown,
  SendForSignatureCard,
  TaxCalcStrip,
  formatCurrency,
  type AppliedDiscount,
  type QuoteLine,
} from "../../components/quotes"
import { QuoteBuilderRow } from "../../components/workshop-ops/quote-builder-row"

import {
  ACCEPTANCE_CURRENT,
  ACCEPTANCE_EVENTS,
  BUILD_MEDIA,
  CUSTOMER,
  DEPOSIT_DUE,
  DISCOUNT_SCOPES,
  DUPLICATE,
  GRAND_TOTAL,
  GST_AMOUNT,
  GST_PERCENT,
  INITIAL_DISCOUNT,
  LINE_CATALOGUE,
  NEW_LINE_DRAFT,
  QUOTE_DATE_LABEL,
  QUOTE_EXPIRES_AT,
  QUOTE_NOW_OVERRIDE,
  QUOTE_NUMBER,
  QUOTE_ROWS,
  RAIL_LINES,
  SIGNATURE_DEFAULTS,
  SUBTOTAL_EX_GST,
  TAX_LINES,
  VEHICLE,
} from "./_demo-data"
import styles from "./quote-builder.module.css"

/** Placeholder circular Torque avatar — brand-red gradient, initial "T".
 *  Real mascot art lands later. */
function TorqueAvatar() {
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

type WorkflowStage = "drafting" | "sent" | "converted"

const STAGE_BADGE: Record<
  WorkflowStage,
  { tone: "info" | "success" | "warn"; label: string }
> = {
  drafting: { tone: "warn", label: "Draft — not sent" },
  sent: { tone: "info", label: "Sent for approval" },
  converted: { tone: "success", label: "Converted to job" },
}

export function QuoteConsole() {
  const [draftLine, setDraftLine] = useState<QuoteLine>({
    id: NEW_LINE_DRAFT.id,
    title: NEW_LINE_DRAFT.title,
    sku: NEW_LINE_DRAFT.sku,
    quantity: NEW_LINE_DRAFT.quantity,
    unitPrice: NEW_LINE_DRAFT.unitPrice,
  })
  const [discount, setDiscount] = useState<AppliedDiscount>(INITIAL_DISCOUNT)
  const [stage, setStage] = useState<WorkflowStage>("drafting")

  const stageBadge = STAGE_BADGE[stage]

  return (
    <>
      {/* Command band — customer + vehicle context, Torque framing. */}
      <section className={styles.command} aria-labelledby="quote-command-title">
        <div className={styles.commandHead}>
          <TorqueAvatar />
          <span className={styles.torqueId}>
            <span className={styles.torqueName}>Torque · Workshop Pro</span>
            <span className={styles.torqueRole}>Your Mufflermen business assistant</span>
          </span>
          <span className={styles.stagePill}>
            <StatusBadge tone={stageBadge.tone} size="sm" shape="pill" label={stageBadge.label} />
          </span>
        </div>
        <h1 id="quote-command-title" className={styles.commandTitle}>
          Quote <em>{QUOTE_NUMBER}</em> for the Ranger
        </h1>
        <p className={styles.commandCopy}>
          I&apos;ve drafted Dane&apos;s 3″ turbo-back quote from your catalogue — parts at your
          standard markup, labour at $132/hr, and a workshop fee. Tweak any line, set the loyalty
          discount, then send it for approval. Once he signs off I&apos;ll book it into Bay 4 and
          spin up the job card for you.
        </p>

        <dl className={styles.contextGrid}>
          <div className={styles.contextCard}>
            <dt className={styles.contextLabel}>Customer</dt>
            <dd className={styles.contextValue}>{CUSTOMER.name}</dd>
            <dd className={styles.contextMeta}>
              {CUSTOMER.phone} · {CUSTOMER.suburb}
            </dd>
          </div>
          <div className={styles.contextCard}>
            <dt className={styles.contextLabel}>Vehicle</dt>
            <dd className={styles.contextValue}>{VEHICLE.label}</dd>
            <dd className={styles.contextMeta}>
              <span className={styles.rego}>{VEHICLE.rego}</span> · {VEHICLE.engine} ·{" "}
              <span className={styles.figure}>{VEHICLE.odometerKm.toLocaleString("en-AU")}</span> km
            </dd>
          </div>
          <div className={styles.contextCard}>
            <dt className={styles.contextLabel}>Quote</dt>
            <dd className={styles.contextValue}>{QUOTE_NUMBER}</dd>
            <dd className={styles.contextMeta}>{QUOTE_DATE_LABEL}</dd>
          </div>
        </dl>

        <p className={styles.vehicleNote}>
          <Wrench size={14} aria-hidden="true" /> {VEHICLE.notes}
        </p>
      </section>

      {/* Duplicate detection — a prior near-identical draft for this vehicle. */}
      <DuplicateDetectionBanner
        similar={{
          quoteNumber: DUPLICATE.quoteNumber,
          customer: DUPLICATE.customerName,
          vehicle: DUPLICATE.vehicleLabel,
          total: DUPLICATE.totalAud,
          createdAt: DUPLICATE.age,
          similarity: DUPLICATE.matchPercent,
        }}
      />

      {/* Validity countdown — how long the quote holds. */}
      <QuoteValidityCountdown
        expiresAt={QUOTE_EXPIRES_AT}
        nowOverride={QUOTE_NOW_OVERRIDE}
        onExtendValidity={() => undefined}
      />

      {/* Main builder grid: line table + totals/markup rail. */}
      <section className={styles.builder} aria-label="Quote line items and totals">
        <div className={styles.builderMain}>
          <header className={styles.regionHead}>
            <span className={styles.regionKicker}>Line items</span>
            <h2 className={styles.regionTitle}>Parts, labour &amp; fees</h2>
            <p className={styles.regionSub}>
              Each part carries your markup over cost; labour bills against the workshop rate. Totals
              and GST recalc as you go.
            </p>
          </header>

          <div className={styles.quoteFrame}>
            <QuoteBuilderRow
              rows={[...QUOTE_ROWS]}
              gstPercent={GST_PERCENT}
              invoiceNumber={QUOTE_NUMBER}
              customerLabel={`${VEHICLE.label} · 3″ turbo-back`}
            />
          </div>

          {/* Inline add/edit a line — the QuoteLineItem editor primitive. */}
          <div className={styles.addLine}>
            <header className={styles.addLineHead}>
              <span className={styles.regionKicker}>Add a line</span>
              <h3 className={styles.addLineTitle}>Build the next row</h3>
            </header>
            <QuoteLineItem
              line={draftLine}
              catalogue={LINE_CATALOGUE}
              onLineChange={setDraftLine}
              onRemove={() => undefined}
            />
            <p className={styles.addLineHint}>
              Adds {formatCurrency(draftLine.quantity * draftLine.unitPrice)} to the quote when you
              save it.
            </p>
          </div>
        </div>

        {/* Totals rail: markup/discount editor + GST strip + bespoke totals. */}
        <aside className={styles.rail} aria-label="Totals and pricing controls">
          <DiscountEditor
            initial={discount}
            scopeOptions={DISCOUNT_SCOPES}
            onChange={setDiscount}
          />

          <TaxCalcStrip subtotal={SUBTOTAL_EX_GST} taxes={[...TAX_LINES]} total={GRAND_TOTAL} />

          <div className={styles.totalsCard}>
            <header className={styles.totalsHead}>
              <span className={styles.regionKicker}>Totals rail</span>
              <h3 className={styles.totalsTitle}>What Dane pays</h3>
            </header>
            <dl className={styles.totalsRows}>
              {RAIL_LINES.map((line) => (
                <div key={line.id} className={styles.totalsRow}>
                  <dt>
                    {line.label}
                    {line.hint ? <span className={styles.totalsHint}>{line.hint}</span> : null}
                  </dt>
                  <dd
                    className={[styles.totalsAmount, line.amount < 0 && styles.totalsCredit]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {formatCurrency(line.amount)}
                  </dd>
                </div>
              ))}
              <div className={[styles.totalsRow, styles.totalsSubtotal].join(" ")}>
                <dt>Subtotal ex. GST</dt>
                <dd className={styles.totalsAmount}>{formatCurrency(SUBTOTAL_EX_GST)}</dd>
              </div>
              <div className={styles.totalsRow}>
                <dt>GST ({GST_PERCENT}%)</dt>
                <dd className={styles.totalsAmount}>{formatCurrency(GST_AMOUNT)}</dd>
              </div>
              <div className={[styles.totalsRow, styles.totalsGrand].join(" ")}>
                <dt>Grand total inc. GST</dt>
                <dd className={styles.totalsAmount}>{formatCurrency(GRAND_TOTAL)}</dd>
              </div>
            </dl>
            <p className={styles.depositNote}>
              50% deposit to secure parts:{" "}
              <strong className={styles.figure}>{formatCurrency(DEPOSIT_DUE)}</strong>
            </p>
          </div>
        </aside>
      </section>

      {/* Build reference imagery from the workshop's own gallery. */}
      <section className={styles.media} aria-label="Build reference photos">
        <header className={styles.regionHead}>
          <span className={styles.regionKicker}>What he&apos;s getting</span>
          <h2 className={styles.regionTitle}>Reference gallery</h2>
          <p className={styles.regionSub}>
            Recent Ranger turbo-back builds out of the Oak Flats shop — shown to the customer with
            the quote so they know exactly what lands under the ute.
          </p>
        </header>
        <MediaTray items={[...BUILD_MEDIA]} ariaLabel="Recent Ranger turbo-back builds" />
      </section>

      {/* Send-for-approval + acceptance tracking. */}
      <section className={styles.approval} aria-label="Send for approval and tracking">
        <div className={styles.approvalSend}>
          <SendForSignatureCard
            defaults={SIGNATURE_DEFAULTS}
            onSend={() => setStage("sent")}
          />
        </div>
        <div className={styles.approvalTrack}>
          <QuoteAcceptanceTracker
            events={[...ACCEPTANCE_EVENTS]}
            current={ACCEPTANCE_CURRENT}
            reminderHint="Quote holds 14 days. I'll nudge Dane 24h before it lapses."
            onSendReminder={() => undefined}
          />
        </div>
      </section>

      {/* Bespoke convert-to-job action band. */}
      <section className={styles.actionBand} aria-labelledby="quote-action-title">
        <div className={styles.actionCopy}>
          <h2 id="quote-action-title" className={styles.actionTitle}>
            {stage === "converted" ? "Job card created" : "Ready to go?"}
          </h2>
          <p className={styles.actionSub}>
            {stage === "converted"
              ? "Booked into Bay 4 and the job card is live on the workshop board. I've SMS'd Dane the deposit link."
              : "Once Dane approves, convert this quote straight into a job — Torque carries the lines, the customer and the vehicle across to a new job card."}
          </p>
        </div>
        <div className={styles.actionButtons}>
          <button type="button" className={styles.secondaryAction}>
            <FileText size={16} aria-hidden="true" />
            Download PDF
          </button>
          <button
            type="button"
            className={styles.primaryAction}
            data-stage={stage}
            onClick={() => setStage("converted")}
            disabled={stage === "converted"}
          >
            {stage === "converted" ? (
              <>
                <Check size={16} aria-hidden="true" />
                Converted to job
              </>
            ) : (
              <>
                Convert to job
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </section>
    </>
  )
}

export default QuoteConsole
