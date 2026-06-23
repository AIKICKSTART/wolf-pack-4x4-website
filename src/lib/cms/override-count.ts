import "server-only"

import { withCms } from "./payload"

const CACHE_TTL_MS = 60_000

let cache: { value: boolean; fetchedAt: number } | null = null

/**
 * 60-second cached count of published content overrides via the Local API.
 * Falls back to `true` when the CMS is unavailable so per-path override
 * lookups are never short-circuited by a transient count failure — the
 * lookups themselves already degrade safely to `null`.
 */
export async function hasAnyContentOverrides(): Promise<boolean> {
  const now = Date.now()
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.value
  }

  const value = await withCms(async (payload) => {
    const result = await payload.count({
      collection: "content-overrides",
      overrideAccess: false,
      where: {
        _status: {
          equals: "published",
        },
      },
    })

    return result.totalDocs > 0
  }, true)

  cache = { value, fetchedAt: now }
  return value
}
