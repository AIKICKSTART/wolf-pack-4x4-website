import type { CSSProperties } from "react"

import { emailTokens as t } from "./tokens"

export interface DigestStat {
  label: string
  value: string
  delta: string
}

export interface DigestArticle {
  title: string
  blurb: string
  url: string
  tag: string
}

export interface EmailMonthlyDigestProps {
  recipientFirstName: string
  monthLabel: string
  stats: ReadonlyArray<DigestStat>
  articles: ReadonlyArray<DigestArticle>
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

const sectionCell: CSSProperties = { padding: "28px" }

const sectionHeading: CSSProperties = {
  margin: "0 0 16px",
  fontFamily: t.mono,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: t.muted,
}

const statsTable: CSSProperties = {
  ...tableReset,
  width: "100%",
  marginBottom: 8,
}

const statCell: CSSProperties = {
  width: "50%",
  padding: 0,
  verticalAlign: "top",
}

const statInner: CSSProperties = {
  margin: "0 6px 12px",
  padding: "16px 18px",
  border: `1px solid ${t.line}`,
  backgroundColor: t.panelMuted,
}

const statLabel: CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: t.muted,
}

const statValue: CSSProperties = {
  display: "block",
  fontFamily: t.display,
  fontSize: 28,
  lineHeight: 1,
  color: t.body,
  marginBottom: 4,
}

const statDelta: CSSProperties = {
  fontFamily: t.mono,
  fontSize: 11,
  color: t.greenText,
}

const articleRow: CSSProperties = {
  display: "block",
  padding: "16px 0",
  borderBottom: `1px solid ${t.line}`,
  textDecoration: "none",
  color: t.body,
}

const articleTag: CSSProperties = {
  display: "inline-block",
  marginBottom: 6,
  padding: "2px 8px",
  borderRadius: 4,
  backgroundColor: t.amberSoft,
  color: t.amberText,
  fontFamily: t.mono,
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
}

const articleTitle: CSSProperties = {
  margin: "0 0 6px",
  fontSize: 17,
  fontWeight: 600,
  color: t.body,
  lineHeight: 1.3,
}

const articleBlurb: CSSProperties = {
  margin: 0,
  fontSize: 14,
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
  .ofm-hero .ofm-email-headline { font-size: 26px !important; }
  .ofm-pad { padding: 20px !important; }
  .ofm-stat-cell { width: 100% !important; display: block !important; }
}
`

export function EmailMonthlyDigest({
  recipientFirstName,
  monthLabel,
  stats,
  articles,
  workshopAddress,
  workshopPhone,
  unsubscribeUrl,
}: EmailMonthlyDigestProps) {
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
                        <div style={taglineStyle}>{monthLabel} digest</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={heroCell} className="ofm-hero ofm-pad">
                        <span style={kickerStyle}>Workshop digest</span>
                        <div style={headlineStyle} className="ofm-email-headline" role="heading" aria-level={2}>
                          {monthLabel} at the bay.
                        </div>
                        <p style={leadStyle}>
                          Hey {recipientFirstName} — here&apos;s what shipped,
                          shifted and got fixed this month at Oak Flats.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={sectionCell} className="ofm-pad">
                        <h2 style={sectionHeading}>Highlights</h2>
                        <table role="presentation" style={statsTable}>
                          <tbody>
                            <tr>
                              {stats.slice(0, 2).map((stat) => (
                                <td
                                  key={stat.label}
                                  style={statCell}
                                  className="ofm-stat-cell"
                                >
                                  <div style={statInner}>
                                    <span style={statLabel}>{stat.label}</span>
                                    <span style={statValue}>{stat.value}</span>
                                    <span style={statDelta}>{stat.delta}</span>
                                  </div>
                                </td>
                              ))}
                            </tr>
                            <tr>
                              {stats.slice(2, 4).map((stat) => (
                                <td
                                  key={stat.label}
                                  style={statCell}
                                  className="ofm-stat-cell"
                                >
                                  <div style={statInner}>
                                    <span style={statLabel}>{stat.label}</span>
                                    <span style={statValue}>{stat.value}</span>
                                    <span style={statDelta}>{stat.delta}</span>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          ...sectionCell,
                          paddingTop: 8,
                          borderTop: `1px solid ${t.line}`,
                        }}
                        className="ofm-pad"
                      >
                        <h2 style={sectionHeading}>Top reads this month</h2>
                        {articles.map((article) => (
                          <a
                            key={article.url}
                            href={article.url}
                            style={articleRow}
                          >
                            <span style={articleTag}>{article.tag}</span>
                            <h3 style={articleTitle}>{article.title}</h3>
                            <p style={articleBlurb}>{article.blurb}</p>
                          </a>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td style={footerCell} className="ofm-pad">
                        <p style={footerReasonStyle}>
                          You receive this monthly digest because you opted in
                          to workshop news.
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
                            Unsubscribe from the digest
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
