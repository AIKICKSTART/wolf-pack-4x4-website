import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailPasswordResetProps {
  recipientFirstName: string
  resetUrl: string
  expiresInMinutes: number
  ipAddress: string
  deviceLabel: string
  helpDeskUrl: string
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
  padding: "36px 28px 24px",
  borderBottom: `1px solid ${t.line}`,
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
  margin: "16px 0 12px",
  fontFamily: t.display,
  fontSize: 34,
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

const securityBox: CSSProperties = {
  marginTop: 24,
  padding: "16px 18px",
  border: `1px solid ${t.line}`,
  backgroundColor: t.panelMuted,
  fontSize: 13,
  lineHeight: 1.55,
  color: t.body,
}

const securityLabel: CSSProperties = {
  display: "block",
  marginBottom: 4,
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
}

const securityRow: CSSProperties = {
  margin: "0 0 6px",
  fontFamily: t.mono,
  fontSize: 12,
  color: t.body,
}

const expiryStyle: CSSProperties = {
  marginTop: 16,
  padding: "10px 14px",
  borderLeft: `3px solid ${t.amber}`,
  backgroundColor: t.amberSoft,
  fontSize: 13,
  color: t.amberText,
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

const helperLinkStyle: CSSProperties = {
  color: t.redDark,
  textDecoration: "underline",
}

const mobileStyles = `
@media (max-width: 480px) {
  .ofm-hero .ofm-email-headline { font-size: 26px !important; }
  .ofm-pad { padding: 20px !important; }
  .ofm-cta { width: 100% !important; box-sizing: border-box; text-align: center !important; }
}
`

export function EmailPasswordReset({
  recipientFirstName,
  resetUrl,
  expiresInMinutes,
  ipAddress,
  deviceLabel,
  helpDeskUrl,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailPasswordResetProps) {
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
                          Account security
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>Password reset</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Reset your password.
                        </div>
                        <p style={leadStyle}>
                          Hi {recipientFirstName} — someone (hopefully you)
                          asked to reset the password on your Mufflermen
                          account. Use the button below to set a new one.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <table role="presentation" style={tableReset}>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href={resetUrl}
                                  style={ctaButton}
                                  className="ofm-cta"
                                >
                                  Choose a new password
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style={expiryStyle}>
                          This link expires in{" "}
                          <strong>{expiresInMinutes} minutes</strong> for your
                          safety. After that, you&apos;ll need to request
                          another one.
                        </p>
                        <div style={securityBox}>
                          <span style={securityLabel}>Request details</span>
                          <p style={securityRow}>IP · {ipAddress}</p>
                          <p style={securityRow}>Device · {deviceLabel}</p>
                        </div>
                        <p
                          style={{
                            ...paragraphStyle,
                            marginTop: 24,
                            fontSize: 14,
                            color: t.muted,
                          }}
                        >
                          Didn&apos;t request this? You can safely ignore this
                          email — your password won&apos;t change unless you
                          click the link above. If you&apos;re worried,{" "}
                          <a href={helpDeskUrl} style={helperLinkStyle}>
                            contact the workshop
                          </a>
                          .
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          Sent because a password reset was requested for your
                          Mufflermen account.
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
