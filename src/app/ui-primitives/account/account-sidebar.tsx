"use client"

import { usePathname } from "next/navigation"

import { SettingsSidebar } from "../components/account/settings-sidebar"

function resolveActiveId(pathname: string | null): string {
  if (!pathname) {
    return "overview"
  }
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean)
  // Path shape: /ui-primitives/account/<segment>
  if (segments.length < 3) {
    return "overview"
  }
  return segments[2]
}

export function AccountSidebar() {
  const pathname = usePathname()
  const activeId = resolveActiveId(pathname)
  return <SettingsSidebar activeId={activeId} />
}

export default AccountSidebar
