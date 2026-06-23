"use server"

/**
 * Server actions for the in-app block page-builder (M4).
 *
 * Every action re-authenticates (server actions are POST-reachable outside the
 * UI) and runs Payload with `overrideAccess: false` + the authenticated user,
 * so the collection access rules in `src/collections/access.ts` are the final
 * authority. Drafts/publish/revisions use Payload's native version system.
 */

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import type { CmsRole } from "@/collections/access"
import { getCmsPayload } from "@/lib/cms/payload"

/** Collections that carry a block `layout`. */
export type BlockCollection = "marketing-pages" | "content-overrides"

/** Consistent action envelope (see web patterns). */
export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string }

const CONTENT_MANAGER_ROLES = new Set<CmsRole>(["operator", "admin", "editor", "seo-manager"])

/**
 * Resolve the Payload client + authenticated content-manager. Return type is
 * inferred so the raw Payload user keeps its native type and can be threaded
 * into access-checked operations without casts.
 */
async function requireContentManager() {
  const payload = await getCmsPayload()
  if (!payload) {
    return { ok: false as const, error: "CMS is unavailable. Try again shortly." }
  }

  try {
    const { user } = await payload.auth({ headers: await headers() })
    const role =
      user && typeof user === "object" && "role" in user
        ? (user as { role?: unknown }).role
        : undefined

    if (!user || typeof role !== "string" || !CONTENT_MANAGER_ROLES.has(role as CmsRole)) {
      return { ok: false as const, error: "You do not have permission to edit pages." }
    }

    return { ok: true as const, payload, user }
  } catch {
    return { ok: false as const, error: "Authentication failed." }
  }
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected error."
}

/** Revalidate the public route for a freshly-changed doc. */
function revalidateForDoc(collection: BlockCollection, doc: unknown): void {
  if (!doc || typeof doc !== "object") return
  const value = doc as { slug?: unknown; targetPath?: unknown }

  if (collection === "marketing-pages" && typeof value.slug === "string") {
    revalidatePath(`/campaigns/${value.slug}`)
  } else if (collection === "content-overrides" && typeof value.targetPath === "string") {
    revalidatePath(value.targetPath)
  }
}

/** Load a doc (including its draft) for editing. */
export async function loadPage(
  collection: BlockCollection,
  id: number | string,
): Promise<ActionResult<unknown>> {
  const auth = await requireContentManager()
  if (!auth.ok) return auth

  try {
    const doc = await auth.payload.findByID({
      collection,
      id,
      depth: 1,
      draft: true,
      overrideAccess: false,
      user: auth.user,
    })
    return { ok: true, data: doc }
  } catch (error) {
    return { ok: false, error: errorMessage(error) }
  }
}

/** Persist the block layout as a draft. */
export async function saveDraft(
  collection: BlockCollection,
  id: number | string,
  blocks: unknown[],
): Promise<ActionResult<unknown>> {
  const auth = await requireContentManager()
  if (!auth.ok) return auth

  try {
    const doc = await auth.payload.update({
      collection,
      id,
      data: { blocks } as Record<string, unknown>,
      draft: true,
      overrideAccess: false,
      user: auth.user,
    })
    return { ok: true, data: doc }
  } catch (error) {
    return { ok: false, error: errorMessage(error) }
  }
}

/** Promote the current draft to published. */
export async function publishPage(
  collection: BlockCollection,
  id: number | string,
): Promise<ActionResult<unknown>> {
  const auth = await requireContentManager()
  if (!auth.ok) return auth

  try {
    const doc = await auth.payload.update({
      collection,
      id,
      data: { _status: "published" } as Record<string, unknown>,
      overrideAccess: false,
      user: auth.user,
    })
    revalidateForDoc(collection, doc)
    return { ok: true, data: doc }
  } catch (error) {
    return { ok: false, error: errorMessage(error) }
  }
}

/** List the version history for the revision timeline. */
export async function loadRevisions(
  collection: BlockCollection,
  id: number | string,
): Promise<ActionResult<unknown[]>> {
  const auth = await requireContentManager()
  if (!auth.ok) return auth

  try {
    const result = await auth.payload.findVersions({
      collection,
      depth: 0,
      limit: 50,
      overrideAccess: false,
      sort: "-updatedAt",
      user: auth.user,
      where: { parent: { equals: id } },
    })
    return { ok: true, data: result.docs }
  } catch (error) {
    return { ok: false, error: errorMessage(error) }
  }
}

/** Restore a prior version as the current draft. */
export async function restoreRevision(
  collection: BlockCollection,
  versionId: number | string,
): Promise<ActionResult<unknown>> {
  const auth = await requireContentManager()
  if (!auth.ok) return auth

  try {
    const doc = await auth.payload.restoreVersion({
      collection,
      id: String(versionId),
      overrideAccess: false,
      user: auth.user,
    })
    revalidateForDoc(collection, doc)
    return { ok: true, data: doc }
  } catch (error) {
    return { ok: false, error: errorMessage(error) }
  }
}
