import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

/** Leave draft-mode preview and return to the published site. */
export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()

  const url = new URL(request.url)
  const path = url.searchParams.get("path") ?? "/"
  redirect(path.startsWith("/") && !path.startsWith("//") ? path : "/")
}
