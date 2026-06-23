type ContactEnquiryEmailInput = {
  customerName: string
  email?: string
  enquiryId?: string | number
  idempotencyKey?: string
  message: string
  phone: string
  serviceInterest: string
  vehicle?: string
}

type ContactEnquiryEmailResult =
  | { ok: true; provider: "resend"; id?: string }
  | { ok: false; provider: "resend"; reason: string; skipped?: boolean }

const RESEND_API_URL = "https://api.resend.com/emails"
const DEFAULT_TO = "Info@wolfpack4x4.au"
const DEFAULT_FROM = "Wolfpack 4x4 Website <website@wolfpack4x4.au>"

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function line(label: string, value?: string | number): string {
  const cleanValue = typeof value === "string" ? value.trim() : value
  return cleanValue ? `${label}: ${cleanValue}` : `${label}: -`
}

function buildPlainText(input: ContactEnquiryEmailInput): string {
  return [
    "New Wolfpack 4x4 website enquiry",
    "",
    line("Name", input.customerName),
    line("Phone", input.phone),
    line("Email", input.email),
    line("Vehicle", input.vehicle),
    line("Service", input.serviceInterest),
    line("CMS enquiry ID", input.enquiryId),
    "",
    "Message:",
    input.message,
  ].join("\n")
}

function buildHtml(input: ContactEnquiryEmailInput): string {
  const rows = [
    ["Name", input.customerName],
    ["Phone", input.phone],
    ["Email", input.email || "-"],
    ["Vehicle", input.vehicle || "-"],
    ["Service", input.serviceInterest],
    ["CMS enquiry ID", input.enquiryId ? String(input.enquiryId) : "-"],
  ]

  return `
    <div style="font-family:${t.body_font};color:${t.body};line-height:1.55;background:${t.canvas};padding:24px">
      <div style="max-width:680px;margin:0 auto;background:${t.panel};border:1px solid ${t.line};border-radius:8px;overflow:hidden">
      <div style="background:${t.redDark};color:${t.textOnDark};padding:18px 22px">
        <div style="font-family:${t.mono};font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${t.textOnDarkMuted}">
          Wolfpack 4x4 website
        </div>
        <h1 style="font-family:${t.display};font-size:28px;font-weight:400;line-height:1.1;margin:8px 0 0">New workshop enquiry</h1>
      </div>
      <div style="padding:22px">
      <table style="border-collapse:collapse;margin:0 0 18px;width:100%">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border:1px solid ${t.line};padding:8px 10px;text-align:left;background:${t.panelMuted};width:150px;color:${t.muted};font-size:13px">${escapeHtml(label)}</th>
                  <td style="border:1px solid ${t.line};padding:8px 10px;color:${t.body};font-size:14px">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size:16px;margin:0 0 8px;color:${t.body}">Message</h2>
      <p style="white-space:pre-wrap;margin:0;padding:14px;background:${t.panelMuted};border:1px solid ${t.line};border-radius:6px;color:${t.body}">${escapeHtml(input.message)}</p>
      </div>
      </div>
    </div>
  `
}

function subjectFor(input: ContactEnquiryEmailInput): string {
  const vehicle = input.vehicle ? ` - ${input.vehicle}` : ""
  return `Website enquiry: ${input.customerName}${vehicle}`
}

export async function sendContactEnquiryEmail(
  input: ContactEnquiryEmailInput,
): Promise<ContactEnquiryEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_EMAIL_TO?.trim() || DEFAULT_TO
  const from = process.env.CONTACT_EMAIL_FROM?.trim() || DEFAULT_FROM

  if (!apiKey) {
    return {
      ok: false,
      provider: "resend",
      reason: "RESEND_API_KEY is not configured",
      skipped: true,
    }
  }

  const replyTo = input.email?.trim()
  const response = await fetch(RESEND_API_URL, {
    body: JSON.stringify({
      from,
      html: buildHtml(input),
      reply_to: replyTo || undefined,
      subject: subjectFor(input),
      text: buildPlainText(input),
      to: [to],
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(input.idempotencyKey ? { "Idempotency-Key": input.idempotencyKey } : {}),
    },
    method: "POST",
  })

  const responseBody = (await response.text()).slice(0, 2000)

  if (!response.ok) {
    return {
      ok: false,
      provider: "resend",
      reason: responseBody || `Resend returned HTTP ${response.status}`,
    }
  }

  try {
    const parsed = JSON.parse(responseBody) as { id?: string }
    return { ok: true, provider: "resend", id: parsed.id }
  } catch {
    return { ok: true, provider: "resend" }
  }
}
import { emailTokens as t } from "@/app/ui-primitives/components/emails"
