"use client"

import { RefreshRouteOnSave as PayloadRefresh } from "@payloadcms/live-preview-react"
import { useRouter } from "next/navigation"
import * as React from "react"

/**
 * Bridges Payload live preview to the App Router: when the admin saves a
 * draft, the preview iframe refreshes its server components. Mounted from the
 * root layout only while draft mode is enabled.
 */
export function RefreshRouteOnSave({ serverURL }: { serverURL: string }) {
  const router = useRouter()
  return <PayloadRefresh refresh={() => router.refresh()} serverURL={serverURL} />
}
