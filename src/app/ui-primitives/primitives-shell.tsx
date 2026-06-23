"use client"

import type { CSSProperties, ReactNode } from "react"
import { useMemo, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { TooltipProvider } from "@/components/ui/tooltip"

import { PrimitiveThemeToggle } from "./primitive-theme-toggle"
import { DEFAULT_PROFILE_ID, resolveProfile } from "./builder/theme/profiles"
import {
  readStoredStyleProfileId,
  subscribeProfile,
} from "./builder/theme/profile-store"
import {
  DEFAULT_PRESET_ID,
  THEME_PRESET_CHANGE_EVENT,
  THEME_PRESET_STORAGE_KEY,
  getPreset,
  getThemePresetTone,
  isThemePresetId,
  presetToCssVariables,
  readStoredThemePresetId,
  type ThemePresetId,
} from "./components/theming/theme-tokens"
import {
  groupOrder,
  groupTitles,
  sidebarCoverageLabel,
  sections,
  type PrimitiveGroup,
  type PrimitiveSection,
} from "./sidebar-config"
import styles from "./ui-primitives.module.css"

function subscribeGlobalPreset(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_PRESET_STORAGE_KEY && isThemePresetId(event.newValue)) {
      listener()
    }
  }

  window.addEventListener(THEME_PRESET_CHANGE_EVENT, listener)
  window.addEventListener("storage", handleStorage)

  return () => {
    window.removeEventListener(THEME_PRESET_CHANGE_EVENT, listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function readGlobalPresetSnapshot(): ThemePresetId {
  return readStoredThemePresetId()
}

function readGlobalPresetServerSnapshot(): ThemePresetId {
  return DEFAULT_PRESET_ID
}

function readGlobalStyleProfileSnapshot() {
  return readStoredStyleProfileId()
}

function readGlobalStyleProfileServerSnapshot() {
  return DEFAULT_PROFILE_ID
}

export function PrimitivesShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const globalPresetId = useSyncExternalStore(
    subscribeGlobalPreset,
    readGlobalPresetSnapshot,
    readGlobalPresetServerSnapshot,
  )
  const globalStyleProfileId = useSyncExternalStore(
    subscribeProfile,
    readGlobalStyleProfileSnapshot,
    readGlobalStyleProfileServerSnapshot,
  )
  const sectionsByGroup = sections.reduce<Record<PrimitiveGroup, PrimitiveSection[]>>(
    (acc, section) => {
      acc[section.group].push(section)
      return acc
    },
    groupOrder.reduce(
      (acc, group) => {
        acc[group] = []
        return acc
      },
      {} as Record<PrimitiveGroup, PrimitiveSection[]>,
    ),
  )
  const isCurrentHref = (href: string) => {
    if (href === "/ui-primitives") {
      return pathname === href
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const presetTone = getThemePresetTone(globalPresetId)
  const styleProfile = resolveProfile(globalStyleProfileId)
  const iconTheme = globalPresetId === "mufflermen-classic" || globalPresetId === "classic-glass" ? "classic" : "themed"
  const dashboardStyle = useMemo<CSSProperties>(() => {
    const preset = getPreset(globalPresetId)
    const profile = resolveProfile(globalStyleProfileId)

    return {
      ...presetToCssVariables(preset),
      ...profile.tokens,
      background: "var(--primitive-dashboard-background)",
      backgroundColor: "var(--primitive-canvas)",
      color: "var(--foreground)",
      colorScheme: presetTone,
    } as CSSProperties
  }, [globalPresetId, globalStyleProfileId, presetTone])

  return (
    <TooltipProvider>
      <div
        className={styles.dashboard}
        style={dashboardStyle}
        data-primitives-shell-root="true"
        data-theme-preset={globalPresetId}
        data-theme-preset-tone={presetTone}
        data-style-profile={styleProfile.id}
        data-style-scheme={styleProfile.scheme}
        data-icon-theme={iconTheme}
        suppressHydrationWarning
      >
        <aside className={styles.sidebar} aria-label="Primitive categories">
          <Link
            href="/ui-primitives"
            className={styles.brandMark}
            aria-label="Primitives overview"
            aria-current={pathname === "/ui-primitives" ? "page" : undefined}
          >
            <Image
              className={styles.brandLogo}
              src="/media/brand/mufflermen-logo-nav.webp"
              alt="Oak Flats Muffler Men"
              width={720}
              height={372}
              priority
            />
          </Link>

          <nav className={styles.railNav}>
            {groupOrder.map((groupKey) => (
              <div key={groupKey} className={styles.railGroup}>
                <span className={styles.railGroupTitle}>{groupTitles[groupKey]}</span>
                {sectionsByGroup[groupKey].map((section) => {
                  const Icon = section.icon
                  const isCurrent = isCurrentHref(section.href)

                  return (
                    <Link
                      key={section.id}
                      href={section.href}
                      aria-current={isCurrent ? "page" : undefined}
                      data-group={section.group}
                      title={section.description}
                    >
                      <Icon aria-hidden="true" />
                      <span>{section.label}</span>
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <PrimitiveThemeToggle />
            <span>Coverage</span>
            <strong>
              {sections.length} routes · {sidebarCoverageLabel}
            </strong>
            <div className={styles.coverageMeter} aria-hidden="true">
              <span />
            </div>
          </div>
        </aside>

        {children}
      </div>
    </TooltipProvider>
  )
}
