import type { CollectionConfig, PayloadRequest } from "payload";
import { APIError } from "payload";

import {
  canDeleteContent,
  canManageContent,
  canManageContentField,
  canReviewMarketingField,
  hasRole,
} from "./access.ts";

type ApprovalStatus = "approved" | "draft" | "needs_review" | "rejected" | "scheduled";

type MarketingApprovalData = {
  approvedAt?: string | null;
  approvedBy?: number | string | null;
  channel?: string | null;
  proposedCopy?: string | null;
  relatedBlogPost?: number | string | null;
  relatedCampaignPage?: number | string | null;
  reviewNotes?: Array<{
    author?: number | string | null;
    id?: number | string | null;
    note?: string | null;
  }> | null;
  riskFlags?: unknown;
  scheduledFor?: string | null;
  sourceActor?: string | null;
  sourceConversationId?: string | null;
  sourceExternalDraftId?: string | null;
  sourceIdempotencyKey?: string | null;
  sourceModel?: string | null;
  sourcePromptHash?: string | null;
  sourceRunId?: string | null;
  sourceSystem?: string | null;
  sourceWorkspaceGitSha?: string | null;
  status?: ApprovalStatus | null;
  statusHistory?: Array<{
    actor?: number | string | null;
    at?: string | null;
    from?: ApprovalStatus | null;
    to?: ApprovalStatus | null;
  }> | null;
  targetUrl?: string | null;
  title?: string | null;
};

type ApprovalHookArgs = {
  data: Partial<MarketingApprovalData>;
  operation: "create" | "update";
  originalDoc?: MarketingApprovalData;
  req: PayloadRequest;
};

const allowedStatusTransitions: Record<ApprovalStatus, ApprovalStatus[]> = {
  approved: ["approved", "rejected", "scheduled"],
  draft: ["draft", "needs_review"],
  needs_review: ["approved", "draft", "needs_review", "rejected"],
  rejected: ["draft", "rejected"],
  scheduled: ["scheduled"],
};

const clientRestrictedFields: Array<keyof MarketingApprovalData> = [
  "approvedAt",
  "approvedBy",
  "channel",
  "proposedCopy",
  "relatedBlogPost",
  "relatedCampaignPage",
  "riskFlags",
  "scheduledFor",
  "sourceActor",
  "sourceConversationId",
  "sourceExternalDraftId",
  "sourceIdempotencyKey",
  "sourceModel",
  "sourcePromptHash",
  "sourceRunId",
  "sourceSystem",
  "sourceWorkspaceGitSha",
  "statusHistory",
  "targetUrl",
  "title",
];

const immutableOriginFields: Array<keyof MarketingApprovalData> = [
  "sourceActor",
  "sourceConversationId",
  "sourceExternalDraftId",
  "sourceIdempotencyKey",
  "sourceModel",
  "sourcePromptHash",
  "sourceRunId",
  "sourceSystem",
  "sourceWorkspaceGitSha",
];

function getStatus(value: unknown, fallback: ApprovalStatus): ApprovalStatus {
  return typeof value === "string" && value in allowedStatusTransitions ? (value as ApprovalStatus) : fallback;
}

function normalizeForComparison(value: unknown): unknown {
  if (value === undefined) return null;
  if (value === null) return null;
  if (value instanceof Date) return value.toISOString();

  if (Array.isArray(value)) {
    return value.map(normalizeForComparison);
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, normalizeForComparison(nestedValue)]),
    );
  }

  return value;
}

function hasChangedRestrictedField(data: Partial<MarketingApprovalData>, originalDoc?: MarketingApprovalData) {
  return clientRestrictedFields.some((field) => {
    if (!(field in data)) return false;

    return (
      JSON.stringify(normalizeForComparison(data[field])) !==
      JSON.stringify(normalizeForComparison(originalDoc?.[field]))
    );
  });
}

function hasChangedImmutableOriginField(data: Partial<MarketingApprovalData>, originalDoc?: MarketingApprovalData) {
  return immutableOriginFields.some((field) => {
    if (!(field in data)) return false;

    return (
      JSON.stringify(normalizeForComparison(data[field])) !==
      JSON.stringify(normalizeForComparison(originalDoc?.[field]))
    );
  });
}

function stampReviewNoteAuthors(data: Partial<MarketingApprovalData>, originalDoc: MarketingApprovalData | undefined, req: PayloadRequest) {
  if (!Array.isArray(data.reviewNotes)) return;

  const originalNotes = originalDoc?.reviewNotes ?? [];
  const originalById = new Map(
    originalNotes
      .filter((note) => note?.id !== undefined && note?.id !== null)
      .map((note) => [String(note.id), note]),
  );

  data.reviewNotes = data.reviewNotes.map((note, index) => {
    const originalNote = note.id !== undefined && note.id !== null ? originalById.get(String(note.id)) : originalNotes[index];

    if (originalNote && originalNote.note === note.note) {
      return {
        ...note,
        author: originalNote.author ?? null,
      };
    }

    return {
      ...note,
      author: req.user?.id ?? null,
    };
  });
}

const enforceApprovalWorkflow = ({ data, operation, originalDoc, req }: ApprovalHookArgs) => {
  const previousStatus = getStatus(originalDoc?.status, "draft");
  const nextStatus = getStatus(data.status, previousStatus);
  const isContentManager = hasRole(req.user, ["operator", "admin", "editor", "seo-manager"]);
  const isClientReviewer = hasRole(req.user, ["client-reviewer"]);
  const isOperator = hasRole(req.user, ["operator"]);
  const changedStatus = operation === "create" || previousStatus !== nextStatus;

  if (!allowedStatusTransitions[previousStatus].includes(nextStatus)) {
    throw new APIError(`Invalid marketing approval transition: ${previousStatus} to ${nextStatus}.`, 400, null, true);
  }

  if (operation === "update" && hasChangedImmutableOriginField(data, originalDoc)) {
    throw new APIError("Marketing approval origin metadata cannot be changed after creation.", 403, null, true);
  }

  if (operation === "update" && isClientReviewer && !isContentManager) {
    if (previousStatus !== "needs_review") {
      throw new APIError("Client reviewers can only update items that are awaiting review.", 403, null, true);
    }

    if (hasChangedRestrictedField(data, originalDoc)) {
      throw new APIError("Client reviewers can only update review notes and approval status.", 403, null, true);
    }

    if (changedStatus && (previousStatus !== "needs_review" || !["approved", "rejected"].includes(nextStatus))) {
      throw new APIError("Client reviewers can only approve or reject items that are awaiting review.", 403, null, true);
    }
  }

  if (nextStatus === "scheduled" && !isOperator) {
    throw new APIError("Only operators can schedule approved marketing work.", 403, null, true);
  }

  if (nextStatus === "scheduled" && !(data.scheduledFor ?? originalDoc?.scheduledFor)) {
    throw new APIError("Scheduled marketing approvals require a scheduled date.", 400, null, true);
  }

  if (nextStatus === "approved") {
    data.approvedBy = originalDoc?.approvedBy ?? req.user?.id ?? data.approvedBy ?? null;
    data.approvedAt = originalDoc?.approvedAt ?? new Date().toISOString();
  } else if (nextStatus === "scheduled") {
    data.approvedBy = originalDoc?.approvedBy ?? req.user?.id ?? data.approvedBy ?? null;
    data.approvedAt = originalDoc?.approvedAt ?? new Date().toISOString();
  } else {
    data.approvedBy = null;
    data.approvedAt = null;
  }

  data.statusHistory = changedStatus
    ? [
        ...(originalDoc?.statusHistory ?? []),
        {
          actor: req.user?.id ?? null,
          at: new Date().toISOString(),
          from: operation === "create" ? null : previousStatus,
          to: nextStatus,
        },
      ]
    : (originalDoc?.statusHistory ?? []);

  stampReviewNoteAuthors(data, originalDoc, req);

  return data;
};

const marketingApprovalAccess = ({ req }: { req: PayloadRequest }) => {
  if (hasRole(req.user, ["operator", "admin", "editor", "seo-manager"])) {
    return true;
  }

  if (hasRole(req.user, ["client-reviewer"])) {
    return {
      status: {
        in: ["needs_review", "approved", "rejected"],
      },
    };
  }

  return false;
};

const marketingApprovalUpdateAccess = ({ req }: { req: PayloadRequest }) => {
  if (hasRole(req.user, ["operator", "admin", "editor", "seo-manager"])) {
    return true;
  }

  if (hasRole(req.user, ["client-reviewer"])) {
    return {
      status: {
        equals: "needs_review",
      },
    };
  }

  return false;
};

export const MarketingApprovals: CollectionConfig = {
  slug: "marketing-approvals",
  labels: {
    singular: "Marketing approval",
    plural: "Marketing approvals",
  },
  admin: {
    defaultColumns: ["title", "status", "channel", "sourceSystem", "updatedAt"],
    group: "Marketing",
    useAsTitle: "title",
  },
  access: {
    create: canManageContent,
    delete: canDeleteContent,
    read: marketingApprovalAccess,
    update: marketingApprovalUpdateAccess,
  },
  hooks: {
    beforeChange: [enforceApprovalWorkflow],
  },
  versions: {
    maxPerDoc: 50,
  },
  fields: [
    {
      name: "title",
      type: "text",
      access: {
        update: canManageContentField,
      },
      required: true,
    },
    {
      name: "status",
      type: "select",
      access: {
        update: canReviewMarketingField,
      },
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Needs review", value: "needs_review" },
        { label: "Approved", value: "approved" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Rejected", value: "rejected" },
      ],
      required: true,
    },
    {
      name: "sourceSystem",
      type: "select",
      access: {
        update: canManageContentField,
      },
      defaultValue: "hermes",
      options: [
        { label: "Hermes", value: "hermes" },
        { label: "Codex", value: "codex" },
        { label: "Claude", value: "claude" },
        { label: "Manual", value: "manual" },
      ],
      required: true,
    },
    {
      name: "sourceActor",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourceRunId",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourceConversationId",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourceModel",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourcePromptHash",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourceWorkspaceGitSha",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourceExternalDraftId",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourceIdempotencyKey",
      type: "text",
      access: {
        update: canManageContentField,
      },
      admin: {
        readOnly: true,
      },
      unique: true,
    },
    {
      name: "channel",
      type: "select",
      access: {
        update: canManageContentField,
      },
      defaultValue: "cms",
      options: [
        { label: "CMS content", value: "cms" },
        { label: "Postiz social", value: "postiz" },
        { label: "Blog", value: "blog" },
        { label: "Campaign page", value: "campaign" },
        { label: "Email/newsletter draft", value: "email" },
      ],
      required: true,
    },
    {
      name: "proposedCopy",
      type: "textarea",
      access: {
        update: canManageContentField,
      },
      required: true,
    },
    {
      name: "targetUrl",
      type: "text",
      access: {
        update: canManageContentField,
      },
    },
    {
      name: "scheduledFor",
      type: "date",
      access: {
        update: ({ req }) => hasRole(req.user, ["operator"]),
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "relatedBlogPost",
      type: "relationship",
      access: {
        update: canManageContentField,
      },
      relationTo: "blog-posts",
    },
    {
      name: "relatedCampaignPage",
      type: "relationship",
      access: {
        update: canManageContentField,
      },
      relationTo: "marketing-pages",
    },
    {
      name: "riskFlags",
      type: "array",
      access: {
        update: canManageContentField,
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "severity",
          type: "select",
          defaultValue: "medium",
          options: [
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ],
          required: true,
        },
      ],
    },
    {
      name: "reviewNotes",
      type: "array",
      access: {
        update: canReviewMarketingField,
      },
      fields: [
        {
          name: "note",
          type: "textarea",
          required: true,
        },
        {
          name: "author",
          type: "relationship",
          relationTo: "users",
        },
      ],
    },
    {
      name: "statusHistory",
      type: "array",
      access: {
        update: canReviewMarketingField,
      },
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "from",
          type: "select",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Needs review", value: "needs_review" },
            { label: "Approved", value: "approved" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Rejected", value: "rejected" },
          ],
        },
        {
          name: "to",
          type: "select",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Needs review", value: "needs_review" },
            { label: "Approved", value: "approved" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Rejected", value: "rejected" },
          ],
        },
        {
          name: "actor",
          type: "relationship",
          relationTo: "users",
        },
        {
          name: "at",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
      ],
    },
    {
      name: "approvedBy",
      type: "relationship",
      access: {
        update: canManageContentField,
      },
      relationTo: "users",
    },
    {
      name: "approvedAt",
      type: "date",
      access: {
        update: canManageContentField,
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};
