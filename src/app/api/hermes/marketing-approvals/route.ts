import { createHash, timingSafeEqual } from "node:crypto";

import { getCmsPayload } from "@/lib/cms/payload";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type HermesApprovalBody = {
  channel?: unknown;
  conversationId?: unknown;
  draftId?: unknown;
  externalDraftId?: unknown;
  gitSha?: unknown;
  idempotencyKey?: unknown;
  model?: unknown;
  prompt?: unknown;
  promptFingerprint?: unknown;
  promptHash?: unknown;
  proposedCopy?: unknown;
  riskFlags?: unknown;
  runId?: unknown;
  scheduledFor?: unknown;
  sourceActor?: unknown;
  sourceConversationId?: unknown;
  sourceExternalDraftId?: unknown;
  sourceIdempotencyKey?: unknown;
  sourceModel?: unknown;
  sourcePromptHash?: unknown;
  sourceRunId?: unknown;
  sourceWorkspaceGitSha?: unknown;
  status?: unknown;
  targetUrl?: unknown;
  threadId?: unknown;
  title?: unknown;
  workspaceGitSha?: unknown;
};

const MAX_BODY_BYTES = 16 * 1024;
const allowedChannels = ["blog", "campaign", "cms", "email", "postiz"] as const;
const allowedDraftStatuses = ["draft", "needs_review"] as const;
const riskSeverities = ["high", "low", "medium"] as const;

type AllowedChannel = (typeof allowedChannels)[number];
type AllowedDraftStatus = (typeof allowedDraftStatuses)[number];
type RiskSeverity = (typeof riskSeverities)[number];

function isAllowedChannel(value: string): value is AllowedChannel {
  return (allowedChannels as readonly string[]).includes(value);
}

function isAllowedDraftStatus(value: string): value is AllowedDraftStatus {
  return (allowedDraftStatuses as readonly string[]).includes(value);
}

function isRiskSeverity(value: string): value is RiskSeverity {
  return (riskSeverities as readonly string[]).includes(value);
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanMultiline(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

function cleanOptionalText(maxLength: number, ...values: unknown[]) {
  for (const value of values) {
    const cleaned = cleanText(value, maxLength);
    if (cleaned) return cleaned;
  }

  return undefined;
}

function hashToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest();
}

function hashPrompt(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function isUniqueConstraintError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { code?: unknown; cause?: unknown; message?: unknown };
  const message = error instanceof Error ? error.message : String(candidate.message ?? "");
  const cause = candidate.cause && typeof candidate.cause === "object" ? candidate.cause as { code?: unknown; message?: unknown } : undefined;
  const causeMessage = String(cause?.message ?? "");

  return (
    candidate.code === "23505" ||
    cause?.code === "23505" ||
    message.includes("marketing_approvals_source_idempotency_key_idx") ||
    causeMessage.includes("marketing_approvals_source_idempotency_key_idx") ||
    message.includes("duplicate key value violates unique constraint") ||
    causeMessage.includes("duplicate key value violates unique constraint")
  );
}

function isAuthorized(request: Request) {
  const token = process.env.HERMES_APPROVAL_TOKEN?.trim();
  if (!token) return false;

  const authorization = request.headers.get("authorization")?.trim();
  if (!authorization?.toLowerCase().startsWith("bearer ")) return false;

  const provided = authorization.slice("bearer ".length).trim();
  if (!provided) return false;

  return timingSafeEqual(hashToken(provided), hashToken(token));
}

function cleanRiskFlags(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((flag) => {
      if (!flag || typeof flag !== "object") return null;

      const candidate = flag as { label?: unknown; severity?: unknown };
      const label = cleanText(candidate.label, 160);
      const severity = cleanText(candidate.severity, 20);

      if (!label) return null;

      return {
        label,
        severity: isRiskSeverity(severity) ? severity : ("medium" as const),
      };
    })
    .filter((flag): flag is { label: string; severity: RiskSeverity } => Boolean(flag))
    .slice(0, 12);
}

function cleanTargetUrl(value: unknown) {
  const targetUrl = cleanText(value, 500);
  if (!targetUrl) return undefined;

  if (targetUrl.startsWith("/") && !targetUrl.startsWith("//")) {
    return targetUrl;
  }

  try {
    const url = new URL(targetUrl);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

type CmsPayload = NonNullable<Awaited<ReturnType<typeof getCmsPayload>>>;

async function findExistingApproval(payload: CmsPayload, sourceIdempotencyKey: string) {
  const existing = await payload.find({
    collection: "marketing-approvals",
    limit: 1,
    overrideAccess: true,
    where: {
      sourceIdempotencyKey: {
        equals: sourceIdempotencyKey,
      },
    },
  });

  return existing.docs[0];
}

function idempotentApprovalResponse(existingDoc: { id: unknown; status?: unknown }) {
  return Response.json(
    {
      id: existingDoc.id,
      idempotent: true,
      ok: true,
      status: existingDoc.status,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
      status: 200,
    },
  );
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Request body is too large" }, { status: 413 });
  }

  let body: HermesApprovalBody;

  try {
    body = (await request.json()) as HermesApprovalBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = cleanText(body.title, 180);
  const proposedCopy = cleanMultiline(body.proposedCopy, 8000);
  const channel = cleanText(body.channel, 40);
  const status = cleanText(body.status, 40) || "draft";
  const sourceIdempotencyKey = cleanOptionalText(
    160,
    request.headers.get("idempotency-key"),
    body.sourceIdempotencyKey,
    body.idempotencyKey,
  );
  const sourcePromptHash =
    cleanOptionalText(180, body.sourcePromptHash, body.promptHash, body.promptFingerprint) ?? hashPrompt(body.prompt);

  if (!title || !proposedCopy) {
    return Response.json({ error: "Title and proposedCopy are required" }, { status: 400 });
  }

  if (!isAllowedDraftStatus(status)) {
    return Response.json({ error: "Hermes can only create draft or needs_review approvals" }, { status: 400 });
  }

  if (body.scheduledFor !== undefined && body.scheduledFor !== null) {
    return Response.json({ error: "Hermes cannot set scheduledFor; scheduling requires operator approval" }, { status: 400 });
  }

  const payload = await getCmsPayload();
  if (!payload) {
    return Response.json({ error: "CMS unavailable" }, { status: 503 });
  }

  if (sourceIdempotencyKey) {
    const existingDoc = await findExistingApproval(payload, sourceIdempotencyKey);

    if (existingDoc) {
      return idempotentApprovalResponse(existingDoc);
    }
  }

  let doc;
  try {
    doc = await payload.create({
      collection: "marketing-approvals",
      data: {
        channel: isAllowedChannel(channel) ? channel : "cms",
        proposedCopy,
        riskFlags: cleanRiskFlags(body.riskFlags),
        sourceActor: cleanOptionalText(120, body.sourceActor) ?? "hermes-api",
        sourceConversationId: cleanOptionalText(180, body.sourceConversationId, body.conversationId, body.threadId),
        sourceExternalDraftId: cleanOptionalText(180, body.sourceExternalDraftId, body.externalDraftId, body.draftId),
        sourceIdempotencyKey,
        sourceModel: cleanOptionalText(120, body.sourceModel, body.model),
        sourcePromptHash,
        sourceSystem: "hermes",
        sourceRunId: cleanOptionalText(180, body.sourceRunId, body.runId),
        sourceWorkspaceGitSha: cleanOptionalText(80, body.sourceWorkspaceGitSha, body.workspaceGitSha, body.gitSha),
        status,
        targetUrl: cleanTargetUrl(body.targetUrl),
        title,
      },
      overrideAccess: true,
    });
  } catch (error) {
    if (sourceIdempotencyKey && isUniqueConstraintError(error)) {
      const existingDoc = await findExistingApproval(payload, sourceIdempotencyKey);
      if (existingDoc) {
        return idempotentApprovalResponse(existingDoc);
      }
    }

    throw error;
  }

  return Response.json(
    {
      id: doc.id,
      ok: true,
      status: doc.status,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
      status: 201,
    },
  );
}
