import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailMagicLinkProps {
  recipientFirstName: string
  magicLinkUrl: string
  verificationCode: string
  expiresInMinutes: number
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
  backgroundColor: t.tealSoft,
  color: t.tealText,
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
  backgroundColor: t.body,
  color: t.textOnDark,
  fontFamily: t.display,
  fontSize: 16,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
}

const codeFallbackBox: CSSProperties = {
  marginTop: 28,
  padding: "20px",
  border: `1px dashed ${t.lineStrong}`,
  backgroundColor: t.panelMuted,
  textAlign: "center",
}

const codeLabel: CSSProperties = {
  display: "block",
  marginBottom: 10,
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: t.muted,
}

const codeStyle: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 32,
  letterSpacing: "0.4em",
  fontWeight: 600,
  color: t.body,
}

const timerStrip: CSSProperties = {
  marginTop: 16,
  padding: "10px 14px",
  borderLeft: `3px solid ${t.teal}`,
  backgroundColor: t.tealSoft,
  fontSize: 13,
  color: t.tealText,
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
  .ofm-code { font-size: 24px !important; letter-spacing: 0.3em !important; }
}
`

export function EmailMagicLink({
  recipientFirstName,
  magicLinkUrl,
  verificationCode,
  expiresInMinutes,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailMagicLinkProps) {
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
                        <div style={taglineStyle}>One-click sign-in</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>Magic link</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Hop in, {recipientFirstName}.
                        </div>
                        <p style={leadStyle}>
                          One click and you&apos;re signed in — no password
                          needed. This link only works for you on the device
                          where you requested it.
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
                                  href={magicLinkUrl}
                                  style={ctaButton}
                                  className="ofm-cta"
                                >
                                  Sign in to Mufflermen
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={codeFallbackBox}>
                          <span style={codeLabel}>
                            Or use this code on the sign-in screen
                          </span>
                          <span style={codeStyle} className="ofm-code">
                            {verificationCode}
                          </span>
                        </div>
                        <p style={timerStrip}>
                          Link &amp; code expire in{" "}
                          <strong>{expiresInMinutes} minutes</strong>.
                        </p>
                        <p
                          style={{
                            ...paragraphStyle,
                            marginTop: 20,
                            fontSize: 13,
                            color: t.muted,
                          }}
                        >
                          If you didn&apos;t try to sign in, you can ignore
                          this email. Nobody can sign in without clicking the
                          button or entering the code above.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          Sent because a sign-in was requested for your
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
