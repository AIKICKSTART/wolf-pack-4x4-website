import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailInvoiceAttachedProps {
  recipientFirstName: string
  invoiceNumber: string
  amountDueCents: number
  dueDateLabel: string
  jobReference: string
  viewInvoiceUrl: string
  downloadPdfUrl: string
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

const kickerStyle: CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: 999,
  backgroundColor: t.amberSoft,
  color: t.amberText,
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

const invoiceCard: CSSProperties = {
  padding: "24px",
  border: `1px solid ${t.lineStrong}`,
  backgroundColor: t.panelMuted,
  marginBottom: 22,
}

const invoiceMetaRow: CSSProperties = {
  ...tableReset,
  width: "100%",
}

const metaLabel: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
  paddingBottom: 4,
}

const metaValue: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 13,
  color: t.body,
  fontWeight: 600,
  paddingBottom: 14,
}

const amountCell: CSSProperties = {
  paddingTop: 8,
  borderTop: `1px solid ${t.line}`,
}

const amountLabel: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
}

const amountValue: CSSProperties = {
  display: "block",
  marginTop: 4,
  fontFamily: t.display,
  fontSize: 36,
  lineHeight: 1,
  color: t.body,
}

const dueDateStrip: CSSProperties = {
  marginBottom: 22,
  padding: "10px 14px",
  borderLeft: `3px solid ${t.amber}`,
  backgroundColor: t.amberSoft,
  fontSize: 13,
  color: t.amberText,
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

const downloadLink: CSSProperties = {
  display: "inline-block",
  marginLeft: 12,
  color: t.redDark,
  textDecoration: "underline",
  fontSize: 14,
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
  .ofm-download { display: block !important; margin: 14px 0 0 !important; }
}
`

function formatAud(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function EmailInvoiceAttached({
  recipientFirstName,
  invoiceNumber,
  amountDueCents,
  dueDateLabel,
  jobReference,
  viewInvoiceUrl,
  downloadPdfUrl,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailInvoiceAttachedProps) {
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
                        <div style={taglineStyle}>Invoice ready</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>Invoice</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Your invoice is ready.
                        </div>
                        <p style={leadStyle}>
                          Hi {recipientFirstName} — invoice{" "}
                          <strong>{invoiceNumber}</strong> for job{" "}
                          <strong>{jobReference}</strong> is now available
                          online and as a PDF.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <div style={invoiceCard}>
                          <table role="presentation" style={invoiceMetaRow}>
                            <tbody>
                              <tr>
                                <td style={metaLabel}>Invoice no.</td>
                                <td style={metaLabel}>Job ref.</td>
                              </tr>
                              <tr>
                                <td style={metaValue}>{invoiceNumber}</td>
                                <td style={metaValue}>{jobReference}</td>
                              </tr>
                              <tr>
                                <td style={amountCell} colSpan={2}>
                                  <span style={amountLabel}>Amount due</span>
                                  <span style={amountValue}>
                                    {formatAud(amountDueCents)}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p style={dueDateStrip}>
                          <strong>Due</strong> · {dueDateLabel}
                        </p>
                        <table role="presentation" style={tableReset}>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href={viewInvoiceUrl}
                                  style={ctaPrimary}
                                  className="ofm-cta"
                                >
                                  View invoice
                                </a>
                                <a
                                  href={downloadPdfUrl}
                                  style={downloadLink}
                                  className="ofm-download"
                                >
                                  Download PDF
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
                          Sent because invoice {invoiceNumber} was issued to
                          your Mufflermen account.
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
