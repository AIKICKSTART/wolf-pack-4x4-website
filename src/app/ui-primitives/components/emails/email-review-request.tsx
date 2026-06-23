import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailReviewRequestProps {
  recipientFirstName: string
  vehicleSummary: string
  jobReference: string
  jobCompletedLabel: string
  reviewUrlByRating: ReadonlyArray<{ rating: 1 | 2 | 3 | 4 | 5; url: string }>
  incentiveLabel: string
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
  fontSize: 30,
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

const vehicleCard: CSSProperties = {
  padding: "16px 18px",
  border: `1px solid ${t.line}`,
  backgroundColor: t.panelMuted,
  marginBottom: 24,
}

const vehicleRow: CSSProperties = {
  margin: "0 0 6px",
  fontSize: 14,
  color: t.body,
  lineHeight: 1.55,
}

const vehicleLabel: CSSProperties = {
  display: "inline-block",
  width: 90,
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: t.muted,
}

const ratingLabel: CSSProperties = {
  margin: "0 0 12px",
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
  fontWeight: 700,
}

const ratingTable: CSSProperties = {
  ...tableReset,
  width: "100%",
  marginBottom: 22,
}

const ratingCellBase: CSSProperties = {
  padding: "16px 4px",
  textAlign: "center" as const,
  verticalAlign: "middle",
}

const ratingLinkStyle: CSSProperties = {
  display: "inline-block",
  width: 56,
  height: 56,
  lineHeight: "56px",
  textAlign: "center" as const,
  border: `1px solid ${t.lineStrong}`,
  backgroundColor: t.panel,
  color: t.body,
  textDecoration: "none",
  fontFamily: t.display,
  fontSize: 24,
}

const incentiveStrip: CSSProperties = {
  padding: "12px 14px",
  borderLeft: `3px solid ${t.amber}`,
  backgroundColor: t.amberSoft,
  fontSize: 13,
  color: t.amberText,
  marginBottom: 4,
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
  .ofm-hero .ofm-email-headline { font-size: 24px !important; }
  .ofm-pad { padding: 20px !important; }
  .ofm-rating-link { width: 44px !important; height: 44px !important; line-height: 44px !important; font-size: 18px !important; }
}
`

const STAR = "★"

export function EmailReviewRequest({
  recipientFirstName,
  vehicleSummary,
  jobReference,
  jobCompletedLabel,
  reviewUrlByRating,
  incentiveLabel,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailReviewRequestProps) {
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
                        <div style={taglineStyle}>Review request</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>How did we do?</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Rate the workshop visit.
                        </div>
                        <p style={leadStyle}>
                          Hi {recipientFirstName} — your car&apos;s back on the
                          road. Tap a star to leave a quick review. It takes
                          about 30 seconds.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <div style={vehicleCard}>
                          <p style={vehicleRow}>
                            <span style={vehicleLabel}>Vehicle</span>
                            <span>{vehicleSummary}</span>
                          </p>
                          <p style={vehicleRow}>
                            <span style={vehicleLabel}>Job ref.</span>
                            <span>{jobReference}</span>
                          </p>
                          <p style={{ ...vehicleRow, marginBottom: 0 }}>
                            <span style={vehicleLabel}>Completed</span>
                            <span>{jobCompletedLabel}</span>
                          </p>
                        </div>
                        <p style={ratingLabel}>Tap your rating</p>
                        <table role="presentation" style={ratingTable}>
                          <tbody>
                            <tr>
                              {reviewUrlByRating.map(({ rating, url }) => (
                                <td key={rating} style={ratingCellBase}>
                                  <a
                                    href={url}
                                    style={ratingLinkStyle}
                                    aria-label={`Rate ${rating} out of 5 stars`}
                                    className="ofm-rating-link"
                                  >
                                    {STAR.repeat(1)}
                                    <span
                                      style={{
                                        display: "block",
                                        fontFamily: t.mono,
                                        fontSize: 10,
                                        letterSpacing: "0.18em",
                                        color: t.muted,
                                        marginTop: -8,
                                      }}
                                    >
                                      {rating}
                                    </span>
                                  </a>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                        <p style={incentiveStrip}>{incentiveLabel}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          Sent because you recently had work done at Oak Flats Mufflermen.
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
