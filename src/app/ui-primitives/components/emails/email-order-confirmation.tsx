import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface OrderLineItem {
  sku: string
  name: string
  qty: number
  unitPriceCents: number
  lineTotalCents: number
}

export interface EmailOrderConfirmationProps {
  recipientFirstName: string
  orderNumber: string
  orderDateLabel: string
  etaLabel: string
  lineItems: ReadonlyArray<OrderLineItem>
  subtotalCents: number
  gstCents: number
  shippingCents: number
  totalCents: number
  viewOrderUrl: string
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
  backgroundColor: t.greenSoft,
  color: t.greenText,
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

const summaryStripCell: CSSProperties = {
  padding: "16px 28px",
  backgroundColor: t.panelMuted,
  borderBottom: `1px solid ${t.line}`,
}

const summaryLabel: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
}

const summaryValue: CSSProperties = {
  display: "block",
  marginTop: 4,
  fontFamily: t.mono,
  fontSize: 13,
  color: t.body,
  fontWeight: 600,
}

const bodyCell: CSSProperties = { padding: "28px" }

const itemTable: CSSProperties = {
  ...tableReset,
  width: "100%",
  marginBottom: 18,
}

const itemHeadCell: CSSProperties = {
  padding: "10px 12px",
  borderBottom: `1px solid ${t.lineStrong}`,
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
  textAlign: "left",
}

const itemHeadCellRight: CSSProperties = {
  ...itemHeadCell,
  textAlign: "right",
}

const itemRowCell: CSSProperties = {
  padding: "14px 12px",
  borderBottom: `1px solid ${t.line}`,
  fontSize: 14,
  color: t.body,
  verticalAlign: "top",
}

const itemRowCellRight: CSSProperties = {
  ...itemRowCell,
  textAlign: "right",
  fontFamily: t.mono,
  fontSize: 13,
}

const skuStyle: CSSProperties = {
  display: "block",
  marginTop: 2,
  fontFamily: t.mono,
  fontSize: 11,
  color: t.muted,
}

const totalRow: CSSProperties = {
  padding: "8px 12px",
  fontSize: 13,
  color: t.body,
  textAlign: "right" as const,
}

const totalRowGrand: CSSProperties = {
  padding: "14px 12px",
  fontFamily: t.display,
  fontSize: 22,
  color: t.body,
  textAlign: "right" as const,
  borderTop: `2px solid ${t.body}`,
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

const etaCard: CSSProperties = {
  marginTop: 20,
  padding: "14px 16px",
  borderLeft: `3px solid ${t.green}`,
  backgroundColor: t.greenSoft,
  fontSize: 13,
  color: t.greenText,
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
  .ofm-sku { display: none !important; }
}
`

function formatAud(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function EmailOrderConfirmation({
  recipientFirstName,
  orderNumber,
  orderDateLabel,
  etaLabel,
  lineItems,
  subtotalCents,
  gstCents,
  shippingCents,
  totalCents,
  viewOrderUrl,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailOrderConfirmationProps) {
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
                        <div style={taglineStyle}>Order confirmation</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>Order placed</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Thanks, {recipientFirstName}.
                        </div>
                        <p style={leadStyle}>
                          We&apos;ve received your order. Parts are being pulled
                          from the bay now — we&apos;ll send another note when
                          it ships.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={summaryStripCell}>
                        <table role="presentation" style={tableReset} width="100%">
                          <tbody>
                            <tr>
                              <td>
                                <span style={summaryLabel}>Order number</span>
                                <span style={summaryValue}>{orderNumber}</span>
                              </td>
                              <td>
                                <span style={summaryLabel}>Placed</span>
                                <span style={summaryValue}>{orderDateLabel}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <table role="presentation" style={itemTable}>
                          <thead>
                            <tr>
                              <th style={itemHeadCell}>Part</th>
                              <th style={itemHeadCellRight}>Qty</th>
                              <th style={itemHeadCellRight}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lineItems.map((item) => (
                              <tr key={item.sku}>
                                <td style={itemRowCell}>
                                  {item.name}
                                  <span style={skuStyle} className="ofm-sku">
                                    SKU · {item.sku} · {formatAud(item.unitPriceCents)} ea
                                  </span>
                                </td>
                                <td style={itemRowCellRight}>{item.qty}</td>
                                <td style={itemRowCellRight}>
                                  {formatAud(item.lineTotalCents)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={2} style={totalRow}>
                                Subtotal
                              </td>
                              <td style={totalRow}>
                                {formatAud(subtotalCents)}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={totalRow}>
                                GST (10%)
                              </td>
                              <td style={totalRow}>{formatAud(gstCents)}</td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={totalRow}>
                                Shipping
                              </td>
                              <td style={totalRow}>
                                {formatAud(shippingCents)}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={totalRowGrand}>
                                Total
                              </td>
                              <td style={totalRowGrand}>
                                {formatAud(totalCents)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                        <p style={etaCard}>
                          <strong>Expected delivery</strong> · {etaLabel}
                        </p>
                        <table
                          role="presentation"
                          style={{ ...tableReset, marginTop: 22 }}
                        >
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href={viewOrderUrl}
                                  style={ctaButton}
                                  className="ofm-cta"
                                >
                                  View your order
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
                          Sent because you placed order {orderNumber} with Oak Flats Mufflermen.
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
