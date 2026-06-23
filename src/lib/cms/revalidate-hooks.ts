/**
 * Instant publish: afterChange/afterDelete hooks that revalidate the public
 * routes a document affects, so CMS edits appear on the live site without a
 * rebuild. Payload runs in-process with Next, so `revalidatePath` works here.
 *
 * Bulk operations (the media import script, migrations) set
 * `context.skipRevalidate` to avoid fanning out hundreds of revalidations.
 */

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload"

function safePath(value: unknown): string | undefined {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : undefined
}

// next/cache is imported lazily so the Payload CLI (generate:types/migrate),
// which loads this config outside the Next runtime, never has to resolve it.
async function revalidate(path: string | undefined, type?: "layout") {
  if (!path) return
  try {
    const { revalidatePath } = await import("next/cache")
    revalidatePath(path, type)
  } catch {
    // Outside a Next request scope (CLI scripts) revalidation is meaningless.
  }
}

export const revalidateContentOverride: CollectionAfterChangeHook = async ({ doc, previousDoc, context }) => {
  if (context?.skipRevalidate) return doc
  await revalidate(safePath(doc?.targetPath))
  const previous = safePath(previousDoc?.targetPath)
  if (previous && previous !== doc?.targetPath) await revalidate(previous)
  return doc
}

export const revalidateContentOverrideDelete: CollectionAfterDeleteHook = async ({ doc, context }) => {
  if (context?.skipRevalidate) return doc
  await revalidate(safePath(doc?.targetPath))
  return doc
}

export const revalidateMarketingPage: CollectionAfterChangeHook = async ({ doc, previousDoc, context }) => {
  if (context?.skipRevalidate) return doc
  await revalidate(safePath(doc?.path))
  const previous = safePath(previousDoc?.path)
  if (previous && previous !== doc?.path) await revalidate(previous)
  if (typeof doc?.slug === "string" && doc.slug) await revalidate(`/campaigns/${doc.slug}`)
  return doc
}

export const revalidateMarketingPageDelete: CollectionAfterDeleteHook = async ({ doc, context }) => {
  if (context?.skipRevalidate) return doc
  await revalidate(safePath(doc?.path))
  if (typeof doc?.slug === "string" && doc.slug) await revalidate(`/campaigns/${doc.slug}`)
  return doc
}

export const revalidateBlogPost: CollectionAfterChangeHook = async ({ doc, context }) => {
  if (context?.skipRevalidate) return doc
  await revalidate("/blog")
  if (typeof doc?.slug === "string" && doc.slug) await revalidate(`/blog/${doc.slug}`)
  await revalidate("/")
  return doc
}

export const revalidateBlogPostDelete: CollectionAfterDeleteHook = async ({ doc, context }) => {
  if (context?.skipRevalidate) return doc
  await revalidate("/blog")
  if (typeof doc?.slug === "string" && doc.slug) await revalidate(`/blog/${doc.slug}`)
  return doc
}

export const revalidateSiteWide: GlobalAfterChangeHook = async ({ doc, context }) => {
  if (context?.skipRevalidate) return doc
  await revalidate("/", "layout")
  return doc
}
