import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailAbandonedCartProps {
  recipientFirstName: string
  productName: string
  productSubtitle: string
  productImagePlaceholder: string
  originalPriceCents: number
  savingsCents: number
  returnToCartUrl: string
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
  padding: 0,
  borderBottom: `1px solid ${t.line}`,
}

const heroImageCell: CSSProperties = {
  width: 220,
  padding: 0,
  verticalAlign: "middle",
  backgroundColor: t.body,
}

const productPlaceholder: CSSProperties = {
  display: "block",
  height: 220,
  textAlign: "center" as const,
  lineHeight: "220px",
  fontFamily: t.display,
  fontSize: 48,
  letterSpacing: "0.04em",
  color: t.amber,
  backgroundColor: t.body,
}

const heroTextCell: CSSProperties = {
  padding: "32px 28px",
  verticalAlign: "middle",
}

const kickerStyle: CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: 999,
  backgroundColor: t.redSoft,
  color: t.redDark,
  fontFamily: t.mono,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
}

const headlineStyle: CSSProperties = {
  margin: "12px 0 8px",
  fontFamily: t.display,
  fontSize: 28,
  lineHeight: 1.05,
  textTransform: "uppercase",
  color: t.body,
}

const leadStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.55,
  color: t.body,
}

const bodyCell: CSSProperties = { padding: "28px" }

const productCard: CSSProperties = {
  padding: "18px 20px",
  border: `1px solid ${t.line}`,
  backgroundColor: t.panelMuted,
  marginBottom: 22,
}

const productNameStyle: CSSProperties = {
  margin: "0 0 4px",
  fontSize: 16,
  fontWeight: 600,
  color: t.body,
}

const productSubtitleStyle: CSSProperties = {
  margin: "0 0 14px",
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: t.muted,
}

const priceRow: CSSProperties = {
  ...tableReset,
  width: "100%",
}

const priceLabel: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
  paddingBottom: 4,
}

const priceValue: CSSProperties = {
  fontFamily: t.display,
  fontSize: 22,
  color: t.body,
}

const savingsChip: CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: 999,
  backgroundColor: t.greenSoft,
  color: t.greenText,
  fontFamily: t.mono,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
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
  .ofm-hero .ofm-email-headline { font-size: 22px !important; }
  .ofm-pad { padding: 20px !important; }
  .ofm-cta { width: 100% !important; box-sizing: border-box; text-align: center !important; }
  .ofm-hero-image { display: block !important; width: 100% !important; }
  .ofm-hero-text { display: block !important; padding: 24px 20px !important; }
}
`

function formatAud(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function EmailAbandonedCart({
  recipientFirstName,
  productName,
  productSubtitle,
  productImagePlaceholder,
  originalPriceCents,
  savingsCents,
  returnToCartUrl,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailAbandonedCartProps) {
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
                        <div style={taglineStyle}>Still interested?</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell}>
                        <table role="presentation" style={tableReset} width="100%">
                          <tbody>
                            <tr>
                              <td
                                style={heroImageCell}
                                className="ofm-hero-image"
                              >
                                <span
                                  style={productPlaceholder}
                                  aria-label={productImagePlaceholder}
                                >
                                  {productImagePlaceholder}
                                </span>
                              </td>
                              <td
                                style={heroTextCell}
                                className="ofm-hero ofm-hero-text"
                              >
                                <span style={kickerStyle}>Cart waiting</span>
                                <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                                  Still want this, {recipientFirstName}?
                                </div>
                                <p style={leadStyle}>
                                  You left it in your cart — we&apos;ve held
                                  onto it for you.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <div style={productCard}>
                          <p style={productNameStyle}>{productName}</p>
                          <p style={productSubtitleStyle}>{productSubtitle}</p>
                          <table role="presentation" style={priceRow}>
                            <tbody>
                              <tr>
                                <td style={priceLabel}>Price</td>
                                <td
                                  style={{ ...priceLabel, textAlign: "right" }}
                                >
                                  You save
                                </td>
                              </tr>
                              <tr>
                                <td style={priceValue}>
                                  {formatAud(originalPriceCents)}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <span style={savingsChip}>
                                    Save {formatAud(savingsCents)}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <table role="presentation" style={tableReset}>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href={returnToCartUrl}
                                  style={ctaButton}
                                  className="ofm-cta"
                                >
                                  Return to your cart
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
                          Sent because you left items in your Mufflermen cart.
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
