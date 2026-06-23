import { getCmsPayload } from "@/lib/cms/payload";
import { sendContactEnquiryEmail } from "@/lib/email/contact-enquiry-email";

export const dynamic = "force-dynamic";

type EnquiryBody = {
  email?: unknown;
  message?: unknown;
  name?: unknown;
  phone?: unknown;
  serviceInterest?: unknown;
  vehicle?: unknown;
  website?: unknown;
};

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const serviceInterests = [
  "4x4-lighting-electrical",
  "bull-bars-protection",
  "canopies-roof-racks-storage",
  "dual-battery-systems",
  "performance-4x4-upgrades",
  "other",
  "parts",
  "suspension-lift-kits",
  "towing-gvm-upgrades",
  "winches-recovery-gear",
] as const;

type ServiceInterest = (typeof serviceInterests)[number];

function isServiceInterest(value: string): value is ServiceInterest {
  return (serviceInterests as readonly string[]).includes(value);
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanMultiline(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

function clientKey(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedChain =
    request.headers
      .get("x-forwarded-for")
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) ?? [];

  return forwardedChain.at(-1) ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;

  if (rateLimitBuckets.size > 2000) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(bucketKey);
    }
  }

  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Request body is too large" }, { status: 413 });
  }

  if (isRateLimited(clientKey(request))) {
    return Response.json(
      { error: "Too many enquiry attempts" },
      {
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
        },
        status: 429,
      },
    );
  }

  let body: EnquiryBody;

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return Response.json({ error: "Request body is too large" }, { status: 413 });
    }

    body = JSON.parse(rawBody) as EnquiryBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const customerName = cleanText(body.name, 120);
  const phone = cleanText(body.phone, 80);
  const message = cleanMultiline(body.message, 4000);
  const email = cleanText(body.email, 240);
  const vehicle = cleanText(body.vehicle, 240);
  const serviceInterest = cleanText(body.serviceInterest, 80);
  const honeypot = cleanText(body.website, 200);

  if (honeypot) {
    return Response.json({ ok: true }, { status: 202 });
  }

  if (!customerName || !phone || !message) {
    return Response.json({ error: "Name, phone and message are required" }, { status: 400 });
  }

  const payload = await getCmsPayload();

  if (!payload) {
    return Response.json({ error: "CMS unavailable" }, { status: 503 });
  }

  const doc = await payload.create({
    collection: "enquiries",
    data: {
      customerName,
      email: email || undefined,
      message,
      phone,
      serviceInterest: isServiceInterest(serviceInterest) ? serviceInterest : "other",
      source: "website",
      status: "new",
      vehicle: vehicle || undefined,
    },
    overrideAccess: true,
  });

  const emailResult = await sendContactEnquiryEmail({
    customerName,
    email: email || undefined,
    enquiryId: doc.id,
    idempotencyKey: `wolfpack-enquiry-${doc.id}`,
    message,
    phone,
    serviceInterest: isServiceInterest(serviceInterest) ? serviceInterest : "other",
    vehicle: vehicle || undefined,
  });

  if (!emailResult.ok && !emailResult.skipped) {
    console.error("Failed to send contact enquiry email", {
      enquiryId: doc.id,
      provider: emailResult.provider,
      reason: emailResult.reason,
    });
  }

  return Response.json(
    { emailSent: emailResult.ok, id: doc.id, ok: true },
    {
      headers: {
        "Cache-Control": "no-store",
      },
      status: 201,
    },
  );
}
