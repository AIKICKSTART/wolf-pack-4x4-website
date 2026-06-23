import "server-only"

import type { Payload } from "payload"

let payloadPromise: Promise<Payload | null> | null = null
let hasWarnedCmsUnavailable = false

function hasDatabaseUri() {
  return Boolean(process.env.DATABASE_URI?.trim())
}

function shouldSkipCmsForMissingDatabase() {
  if (process.env.PAYLOAD_BUILD_WITHOUT_DB === "true") {
    return true
  }

  if (hasDatabaseUri()) {
    return false
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("[cms] DATABASE_URI is required in production.")
  }

  return true
}

function warnCmsUnavailable(error: unknown) {
  if (hasWarnedCmsUnavailable) return

  hasWarnedCmsUnavailable = true
  const message = error instanceof Error ? error.message : String(error)
  console.warn(`[cms] Payload unavailable. Public CMS routes will use safe fallbacks. ${message}`)
}

async function initPayload() {
  if (shouldSkipCmsForMissingDatabase()) {
    return null
  }

  const [{ getPayload }, configModule] = await Promise.all([import("payload"), import("@payload-config")])

  return getPayload({
    config: configModule.default,
  })
}

export async function getCmsPayload() {
  if (shouldSkipCmsForMissingDatabase()) {
    return null
  }

  payloadPromise ??= initPayload().catch((error) => {
    payloadPromise = null
    warnCmsUnavailable(error)
    return null
  })

  return payloadPromise
}

export async function withCms<T>(operation: (payload: Payload) => Promise<T>, fallback: T): Promise<T> {
  const payload = await getCmsPayload()

  if (!payload) {
    return fallback
  }

  try {
    return await operation(payload)
  } catch (error) {
    warnCmsUnavailable(error)
    return fallback
  }
}
