/**
 * Stable id generation for blocks and pages.
 *
 * Uses `crypto.randomUUID` when available (browser + modern Node), with a
 * deterministic-enough fallback for older runtimes. No external deps.
 */

let counter = 0

/** Generate a unique id with the given prefix, e.g. "block_…", "page_…". */
export function createId(prefix: string): string {
  const cryptoRef =
    typeof globalThis !== "undefined" ? (globalThis.crypto as Crypto | undefined) : undefined
  if (cryptoRef && typeof cryptoRef.randomUUID === "function") {
    return `${prefix}_${cryptoRef.randomUUID()}`
  }
  counter += 1
  const rand = Math.random().toString(36).slice(2, 10)
  return `${prefix}_${Date.now().toString(36)}${counter.toString(36)}${rand}`
}
