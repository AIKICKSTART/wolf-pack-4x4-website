"use client"

import { Moon, Sun } from "lucide-react"
import * as React from "react"

import {
  THEME_PRESET_CHANGE_EVENT,
  THEME_PRESET_STORAGE_KEY,
  getStyleProfileForThemePreset,
  type ThemePresetChangeDetail,
  type ThemePresetId,
} from "@/app/ui-primitives/components/theming/theme-tokens"
import { writeProfile } from "@/app/ui-primitives/builder/theme/profile-store"

type ThemeChoice = "light" | "dark"

const STORAGE_KEY = "ofm-primitives-theme"
const CHANGE_EVENT = "ofm-primitives-theme-change"
const ASSIGNMENT_STORAGE_KEY = "ofm-primitives-theme-assignments-v3"
const ASSIGNMENT_CHANGE_EVENT = "ofm-primitives-theme-assignment-change"
const PRESET_BY_CHOICE = {
  dark: "mufflermen-classic",
  light: "heritage-cream",
} as const satisfies Record<ThemeChoice, ThemePresetId>

function readThemeChoice(): ThemeChoice {
  if (typeof window === "undefined") return "light"

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "dark" || saved === "light") {
      return saved
    }
  } catch {
    // Fall back to the pre-paint root dataset.
  }

  return document.documentElement.dataset.mufflermenTheme === "dark" ? "dark" : "light"
}

function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement
  const presetId = PRESET_BY_CHOICE[choice]

  root.dataset.mufflermenTheme = choice
  root.dataset.primitiveTheme = choice
  root.dataset.primitiveThemeChoice = choice
  root.style.colorScheme = choice
  root.classList.toggle("dark", choice === "dark")
  writeProfile(getStyleProfileForThemePreset(presetId), true)

  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
    window.localStorage.setItem(THEME_PRESET_STORAGE_KEY, presetId)
    window.localStorage.setItem(
      ASSIGNMENT_STORAGE_KEY,
      JSON.stringify({
        dark: PRESET_BY_CHOICE.dark,
        light: PRESET_BY_CHOICE.light,
        system: "auto",
      }),
    )
    window.sessionStorage.setItem(STORAGE_KEY, choice)
    window.sessionStorage.setItem(THEME_PRESET_STORAGE_KEY, presetId)
    window.sessionStorage.setItem(
      ASSIGNMENT_STORAGE_KEY,
      JSON.stringify({
        dark: PRESET_BY_CHOICE.dark,
        light: PRESET_BY_CHOICE.light,
        system: "auto",
      }),
    )
  } catch {}

  window.dispatchEvent(new Event(CHANGE_EVENT))
  window.dispatchEvent(new Event(ASSIGNMENT_CHANGE_EVENT))
  window.dispatchEvent(
    new CustomEvent<ThemePresetChangeDetail>(THEME_PRESET_CHANGE_EVENT, {
      detail: { presetId },
    }),
  )
}

function subscribeThemeChoice(listener: () => void) {
  const sync = () => listener()
  window.addEventListener("storage", sync)
  window.addEventListener(CHANGE_EVENT, sync)
  window.addEventListener(THEME_PRESET_CHANGE_EVENT, sync)

  return () => {
    window.removeEventListener("storage", sync)
    window.removeEventListener(CHANGE_EVENT, sync)
    window.removeEventListener(THEME_PRESET_CHANGE_EVENT, sync)
  }
}

function getServerThemeChoice(): ThemeChoice {
  return "light"
}

export function PublicThemeToggle({ compact = false }: { compact?: boolean }) {
  const choice = React.useSyncExternalStore<ThemeChoice>(
    subscribeThemeChoice,
    readThemeChoice,
    getServerThemeChoice,
  )
  const hasHydratedTheme = React.useRef(false)

  React.useEffect(() => {
    if (!hasHydratedTheme.current) {
      hasHydratedTheme.current = true
      applyTheme(readThemeChoice())
      return
    }

    applyTheme(choice)
  }, [choice])

  const setTheme = (nextChoice: ThemeChoice) => {
    applyTheme(nextChoice)
  }

  return (
    <div className={`public-theme-toggle ${compact ? "is-compact" : ""}`} role="group" aria-label="Colour theme">
      <button
        type="button"
        aria-label="Use classic cream light mode"
        aria-pressed={choice === "light"}
        className={choice === "light" ? "is-active" : ""}
        onClick={() => setTheme("light")}
      >
        <Sun aria-hidden="true" />
        <span>Light</span>
      </button>
      <button
        type="button"
        aria-label="Use dark workshop mode"
        aria-pressed={choice === "dark"}
        className={choice === "dark" ? "is-active" : ""}
        onClick={() => setTheme("dark")}
      >
        <Moon aria-hidden="true" />
        <span>Dark</span>
      </button>
    </div>
  )
}
