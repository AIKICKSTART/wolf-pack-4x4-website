import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailWelcomeProps {
  recipientFirstName: string
  ctaUrl: string
  helpDeskUrl: string
  bookFirstServiceUrl: string
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
  WebkitFontSmoothing: "antialiased",
}

const tableReset: CSSProperties = {
  borderCollapse: "collapse",
  borderSpacing: 0,
}

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
  padding: "44px 28px 28px",
  backgroundColor: t.panelMuted,
  borderBottom: `1px solid ${t.line}`,
}

const kickerStyle: CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: 999,
  backgroundColor: t.amberSoft,
  color: t.redDark,
  fontFamily: t.mono,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
}

const headlineStyle: CSSProperties = {
  margin: "16px 0 12px",
  fontFamily: t.display,
  fontSize: 38,
  lineHeight: 1.05,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: t.body,
}

const leadStyle: CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.6,
  color: t.body,
}

const bodyCell: CSSProperties = {
  padding: "28px",
}

const paragraphStyle: CSSProperties = {
  margin: "0 0 16px",
  fontSize: 15,
  lineHeight: 1.65,
  color: t.body,
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

const helperLinkStyle: CSSProperties = {
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

const footerStrong: CSSProperties = {
  color: t.body,
  fontWeight: 600,
}

const mobileStyles = `
@media (max-width: 480px) {
  .ofm-hero .ofm-email-headline { font-size: 28px !important; }
  .ofm-pad { padding: 20px !important; }
  .ofm-cta { width: 100% !important; box-sizing: border-box; text-align: center !important; }
}
`

export function EmailWelcome({
  recipientFirstName,
  ctaUrl,
  helpDeskUrl,
  bookFirstServiceUrl,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailWelcomeProps) {
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
                        <div style={taglineStyle}>
                          Oak Flats Workshop · Est. 1972
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>Welcome</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Engines warm. Bay reserved.
                        </div>
                        <p style={leadStyle}>
                          G&apos;day {recipientFirstName} — your Oak Flats
                          Mufflermen account is live. Bookings, history, and
                          quotes are all in one place from today.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <p style={paragraphStyle}>
                          You can book a bay, track a job through the chassis
                          cam, view past invoices, and request quick quotes —
                          all from your dashboard.
                        </p>
                        <table role="presentation" style={tableReset}>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href={ctaUrl}
                                  style={ctaButton}
                                  className="ofm-cta"
                                >
                                  Open your dashboard
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p
                          style={{
                            ...paragraphStyle,
                            marginTop: 24,
                            color: t.muted,
                            fontSize: 14,
                          }}
                        >
                          Already know what your car needs?{" "}
                          <a href={bookFirstServiceUrl} style={helperLinkStyle}>
                            Book a first service
                          </a>{" "}
                          or{" "}
                          <a href={helpDeskUrl} style={helperLinkStyle}>
                            ask the workshop
                          </a>
                          .
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          You received this because you created an account at
                          mufflermen.com.au
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
                            Unsubscribe
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
