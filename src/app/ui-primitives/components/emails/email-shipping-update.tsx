import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export type ShippingStatus = "Picked" | "Packed" | "Shipped" | "Delivered"

export interface EmailShippingUpdateProps {
  recipientFirstName: string
  orderNumber: string
  status: ShippingStatus
  carrierName: string
  trackingNumber: string
  trackingUrl: string
  etaLabel: string
  workshopAddress: string
  workshopPhone: string
  unsubscribeUrl: string
}

const wrapStyle: CSSProperties = {
  margin: 0,
  padding: "32px 16px",
  backgroundColor: t.canvas,
  fontFamily: t.body_font,
  color: t.body,
}

const tableReset: CSSProperties = { borderCollapse: "collapse", borderSpacing: 0 }

const container: CSSProperties = {
  ...tableReset,
  width: "100%",
  maxWidth: 600,
  margin: "0 auto",
  backgroundColor: t.panel,
  border: `1px solid ${t.line}`,
}

const brandBarCell: CSSProperties = {
  padding: "20px 28px",
  backgroundColor: t.body,
  color: t.textOnDark,
}

const logoBadge: CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  border: `1px solid ${t.amber}`,
  color: t.amber,
  fontFamily: t.mono,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
}

const taglineStyle: CSSProperties = {
  marginTop: 8,
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: t.textOnDarkMuted,
}

const heroCell: CSSProperties = {
  padding: "32px 28px 22px",
  borderBottom: `1px solid ${t.line}`,
}

const statusChip: CSSProperties = {
  display: "inline-block",
  padding: "5px 12px",
  borderRadius: 999,
  backgroundColor: t.tealSoft,
  color: t.tealText,
  fontFamily: t.mono,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
}

const headlineStyle: CSSProperties = {
  margin: "14px 0 10px",
  fontFamily: t.display,
  fontSize: 32,
  lineHeight: 1.05,
  textTransform: "uppercase",
  color: t.body,
}

const leadStyle: CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.6,
  color: t.body,
}

const bodyCell: CSSProperties = { padding: "28px" }

const stepsTable: CSSProperties = {
  ...tableReset,
  width: "100%",
  marginBottom: 22,
}

const stepCellBase: CSSProperties = {
  padding: "14px 8px",
  textAlign: "center" as const,
  borderBottom: `3px solid ${t.line}`,
  verticalAlign: "top",
}

const stepCellActive: CSSProperties = {
  ...stepCellBase,
  borderBottomColor: t.green,
}

const stepDotBase: CSSProperties = {
  display: "inline-block",
  width: 14,
  height: 14,
  borderRadius: 999,
  border: `2px solid ${t.lineStrong}`,
  backgroundColor: t.panel,
  marginBottom: 8,
}

const stepDotActive: CSSProperties = {
  ...stepDotBase,
  borderColor: t.green,
  backgroundColor: t.green,
}

const stepLabel: CSSProperties = {
  display: "block",
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
}

const stepLabelActive: CSSProperties = {
  ...stepLabel,
  color: t.body,
  fontWeight: 600,
}

const infoCard: CSSProperties = {
  marginTop: 4,
  padding: "16px 18px",
  border: `1px solid ${t.line}`,
  backgroundColor: t.panelMuted,
  borderRadius: 6,
}

const infoRow: CSSProperties = {
  margin: "0 0 8px",
  fontSize: 14,
  color: t.body,
  lineHeight: 1.55,
}

const infoLabel: CSSProperties = {
  display: "inline-block",
  width: 90,
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: t.muted,
}

const trackingNoStyle: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 14,
  color: t.body,
  fontWeight: 600,
}

const ctaButton: CSSProperties = {
  display: "inline-block",
  padding: "14px 26px",
  backgroundColor: t.red,
  color: t.textOnDark,
  fontFamily: t.display,
  fontSize: 16,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
}

const footerCell: CSSProperties = {
  padding: "24px 28px 32px",
  backgroundColor: t.panelMuted,
  borderTop: `1px solid ${t.line}`,
  color: t.muted,
  fontSize: 12,
  lineHeight: 1.6,
}

const footerReasonStyle: CSSProperties = {
  margin: "0 0 8px",
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: t.muted,
}

const footerStrong: CSSProperties = { color: t.body, fontWeight: 600 }

const mobileStyles = `
@media (max-width: 480px) {
  .ofm-hero .ofm-email-headline { font-size: 26px !important; }
  .ofm-pad { padding: 20px !important; }
  .ofm-cta { width: 100% !important; box-sizing: border-box; text-align: center !important; }
}
`

const STEPS: ReadonlyArray<ShippingStatus> = [
  "Picked",
  "Packed",
  "Shipped",
  "Delivered",
]

function statusIndex(status: ShippingStatus): number {
  return STEPS.indexOf(status)
}

export function EmailShippingUpdate({
  recipientFirstName,
  orderNumber,
  status,
  carrierName,
  trackingNumber,
  trackingUrl,
  etaLabel,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailShippingUpdateProps) {
  const activeIndex = statusIndex(status)

  return (
    <div style={wrapStyle}>
        <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />
        <table role="presentation" style={tableReset} width="100%">
          <tbody>
            <tr>
              <td align="center">
                <table role="presentation" style={container} width="100%">
                  <tbody>
                    <tr>
                      <td style={brandBarCell}>
                        <span style={logoBadge}>OFM · Mufflermen</span>
                        <div style={taglineStyle}>Shipping update</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={statusChip}>{status}</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Your parts are on the move.
                        </div>
                        <p style={leadStyle}>
                          Hi {recipientFirstName} — order {orderNumber} just
                          moved to <strong>{status.toLowerCase()}</strong>.
                          Below is everything you need to track it.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <table role="presentation" style={stepsTable}>
                          <tbody>
                            <tr>
                              {STEPS.map((step, idx) => {
                                const active = idx <= activeIndex
                                return (
                                  <td
                                    key={step}
                                    style={active ? stepCellActive : stepCellBase}
                                  >
                                    <span
                                      style={active ? stepDotActive : stepDotBase}
                                      aria-hidden="true"
                                    />
                                    <span
                                      style={active ? stepLabelActive : stepLabel}
                                    >
                                      {step}
                                    </span>
                                  </td>
                                )
                              })}
                            </tr>
                          </tbody>
                        </table>
                        <div style={infoCard}>
                          <p style={infoRow}>
                            <span style={infoLabel}>Carrier</span>
                            <span>{carrierName}</span>
                          </p>
                          <p style={infoRow}>
                            <span style={infoLabel}>Tracking</span>
                            <span style={trackingNoStyle}>{trackingNumber}</span>
                          </p>
                          <p style={{ ...infoRow, marginBottom: 0 }}>
                            <span style={infoLabel}>ETA</span>
                            <span>{etaLabel}</span>
                          </p>
                        </div>
                        <table
                          role="presentation"
                          style={{ ...tableReset, marginTop: 22 }}
                        >
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href={trackingUrl}
                                  style={ctaButton}
                                  className="ofm-cta"
                                >
                                  Track shipment
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          Sent because you ordered parts from Oak Flats Mufflermen.
                        </p>
                        <p style={{ margin: "0 0 4px" }}>
                          <span style={footerStrong}>
                            Oak Flats Mufflermen
                          </span>{" "}
                          · {workshopAddress}
                        </p>
                        <p style={{ margin: "0 0 12px" }}>{workshopPhone}</p>
                        <p style={{ margin: 0 }}>
                          <a
                            href={unsubscribeUrl}
                            style={{ color: t.muted, textDecoration: "underline" }}
                          >
                            Manage email preferences
                          </a>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}
