import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface EmailTeamInviteProps {
  recipientFirstName: string
  senderName: string
  senderInitials: string
  senderRole: string
  workspaceName: string
  inviteRole: string
  acceptUrl: string
  declineUrl: string
  expiresInDays: number
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

const senderCard: CSSProperties = {
  ...tableReset,
  width: "100%",
  marginBottom: 24,
  padding: "18px",
  border: `1px solid ${t.line}`,
  backgroundColor: t.panelMuted,
}

const avatarCell: CSSProperties = {
  width: 56,
  padding: "0 14px 0 0",
  verticalAlign: "middle",
}

const avatarStyle: CSSProperties = {
  display: "inline-block",
  width: 48,
  height: 48,
  lineHeight: "48px",
  textAlign: "center" as const,
  borderRadius: 999,
  backgroundColor: t.red,
  color: t.textOnDark,
  fontFamily: t.display,
  fontSize: 18,
  letterSpacing: "0.06em",
}

const senderMetaCell: CSSProperties = {
  verticalAlign: "middle",
}

const senderNameStyle: CSSProperties = {
  margin: "0 0 2px",
  fontSize: 15,
  fontWeight: 600,
  color: t.body,
}

const senderRoleStyle: CSSProperties = {
  margin: 0,
  fontFamily: t.mono,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: t.muted,
}

const workspaceLine: CSSProperties = {
  margin: "0 0 16px",
  fontSize: 15,
  color: t.body,
  lineHeight: 1.6,
}

const rolePill: CSSProperties = {
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: 999,
  backgroundColor: t.amberSoft,
  color: t.amberText,
  fontFamily: t.mono,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
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

const declineLink: CSSProperties = {
  display: "inline-block",
  marginLeft: 14,
  fontSize: 14,
  color: t.muted,
  textDecoration: "underline",
}

const expiryNote: CSSProperties = {
  marginTop: 22,
  fontSize: 13,
  color: t.muted,
  lineHeight: 1.55,
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
  .ofm-cta { width: 100% !important; box-sizing: border-box; text-align: center !important; }
  .ofm-decline { display: block !important; margin: 14px 0 0 !important; }
}
`

export function EmailTeamInvite({
  recipientFirstName,
  senderName,
  senderInitials,
  senderRole,
  workspaceName,
  inviteRole,
  acceptUrl,
  declineUrl,
  expiresInDays,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailTeamInviteProps) {
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
                        <div style={taglineStyle}>Team invite</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>You&apos;re invited</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          Join {workspaceName}.
                        </div>
                        <p style={leadStyle}>
                          Hi {recipientFirstName} — {senderName} added you to
                          the {workspaceName} workspace on Mufflermen.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCell} className="ofm-pad">
                        <table role="presentation" style={senderCard}>
                          <tbody>
                            <tr>
                              <td style={avatarCell}>
                                <span style={avatarStyle}>{senderInitials}</span>
                              </td>
                              <td style={senderMetaCell}>
                                <p style={senderNameStyle}>{senderName}</p>
                                <p style={senderRoleStyle}>{senderRole}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style={workspaceLine}>
                          You&apos;ll join as{" "}
                          <span style={rolePill}>{inviteRole}</span> — that
                          gives you access to bookings, parts orders and the
                          shared chassis cam feed.
                        </p>
                        <table role="presentation" style={tableReset}>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href={acceptUrl}
                                  style={ctaPrimary}
                                  className="ofm-cta"
                                >
                                  Accept invite
                                </a>
                                <a
                                  href={declineUrl}
                                  style={declineLink}
                                  className="ofm-decline"
                                >
                                  Decline
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style={expiryNote}>
                          This invite expires in{" "}
                          <strong>{expiresInDays} days</strong>. After that,
                          {" "}
                          {senderName} can send another one.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          Sent because {senderName} added your email to a
                          Mufflermen workspace.
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
