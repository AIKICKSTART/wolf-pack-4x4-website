import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailPaymentFailedProps {
  recipientFirstName: string
  invoiceNumber: string
  amountCents: number
  failureReason: string
  cardBrand: string
  cardLast4: string
  retryUrl: string
  updateCardUrl: string
  supportEmail: string
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
  backgroundColor: t.redSoft,
  borderBottom: `1px solid ${t.line}`,
}

const alertChip: CSSProperties = {
  display: "inline-block",
  padding: "5px 12px",
  borderRadius: 999,
  backgroundColor: t.red,
  color: t.textOnDark,
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

const reasonBox: CSSProperties = {
  padding: "16px 18px",
  border: `1px solid ${t.line}`,
  backgroundColor: t.panelMuted,
  marginBottom: 22,
}

const reasonLabel: CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
}

const reasonRow: CSSProperties = {
  margin: "0 0 6px",
  fontSize: 14,
  color: t.body,
  lineHeight: 1.55,
}

const reasonStrong: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 13,
  color: t.body,
  fontWeight: 600,
}

const ctaPrimary: CSSProperties = {
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

const ctaSecondary: CSSProperties = {
  display: "inline-block",
  padding: "13px 24px",
  backgroundColor: t.panel,
  border: `1px solid ${t.lineStrong}`,
  color: t.body,
  fontFamily: t.display,
  fontSize: 16,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
}

const supportLine: CSSProperties = {
  marginTop: 22,
  fontSize: 13,
  color: t.muted,
  lineHeight: 1.6,
}

const supportLink: CSSProperties = {
  color: t.redDark,
  textDecoration: "underline",
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
  .ofm-cta { width: 100% !important; box-sizing: border-box; text-align: center !important; display: block !important; margin-bottom: 10px !important; }
}
`

function formatAud(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function EmailPaymentFailed({
  recipientFirstName,
  invoiceNumber,
  amountCents,
  failureReason,
  cardBrand,
  cardLast4,
  retryUrl,
  updateCardUrl,
  supportEmail,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailPaymentFailedProps) {
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
                        <div style={taglineStyle}>Billing alert</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={alertChip}>Payment failed</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          A payment didn&apos;t go through.
                        </div>
                        <p style={leadStyle}>
                          Hi {recipientFirstName} — your card was declined when
                          we tried to charge invoice {invoiceNumber} for{" "}
                          <strong>{formatAud(amountCents)}</strong>.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <div style={reasonBox}>
                          <span style={reasonLabel}>What happened</span>
                          <p style={reasonRow}>{failureReason}</p>
                          <p style={{ ...reasonRow, marginBottom: 0 }}>
                            <span style={reasonStrong}>
                              {cardBrand} ending {cardLast4}
                            </span>
                          </p>
                        </div>
                        <table role="presentation" style={tableReset}>
                          <tbody>
                            <tr>
                              <td style={{ paddingRight: 10 }}>
                                <a
                                  href={retryUrl}
                                  style={ctaPrimary}
                                  className="ofm-cta"
                                >
                                  Retry payment
                                </a>
                              </td>
                              <td>
                                <a
                                  href={updateCardUrl}
                                  style={ctaSecondary}
                                  className="ofm-cta"
                                >
                                  Update card
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style={supportLine}>
                          Need help? Email{" "}
                          <a href={`mailto:${supportEmail}`} style={supportLink}>
                            {supportEmail}
                          </a>{" "}
                          or call us on {workshopPhone} between 7am-6pm AEST.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          Sent because a payment on your Mufflermen account
                          failed.
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
