import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

import { getCmsPayload } from "@/lib/cms/payload"

export const dynamic = "force-dynamic"

/**
 * Live-preview entry: the Payload admin opens this URL inside the preview
 * iframe. Requires BOTH the shared preview secret and an authenticated admin
 * session — never enable draft mode for anonymous visitors.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get("secret")
  const path = url.searchParams.get("path") ?? "/"

  const expected = process.env.PAYLOAD_PREVIEW_SECRET?.trim()
  if (!expected || secret !== expected) {
    return new Response("Invalid preview secret", { status: 401 })
  }

  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return new Response("Invalid preview path", { status: 400 })
  }

  const payload = await getCmsPayload()
  if (!payload) {
    return new Response("CMS unavailable", { status: 503 })
  }

  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    return new Response("Authentication required", { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
