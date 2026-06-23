"use client"

import { type KeyboardEvent, useCallback, useId, useRef } from "react"

import {
  ThemeProvider,
  useStyleProfile,
  type StyleProfile,
  type StyleProfileId,
} from "../../builder/theme"
import {
  getPreset,
  getThemePresetForStyleProfile,
  storeThemePresetId,
} from "../../components/theming/theme-tokens"
import { LivePreview } from "./live-preview"
import { ProfileCard } from "./profile-card"
import styles from "./style-picker.module.css"

const ATOMIC_STACK = [
  ["Base theme", "Theming preset owns palette, fonts, and dashboard-root colour mode."],
  ["Profile layer", "Style profile overlays material, shadows, radii, focus, and motion tokens."],
  ["Primitive atoms", "Cards, buttons, fields, chips, forms, and preview states consume the same --primitive-* variables."],
] as const

export interface StylePickerProps {
  /** Profile selected on first paint. Defaults to the house profile. */
  defaultProfileId?: StyleProfileId
  /**
   * When true (default) the picker runs as an isolated preview: switching a
   * profile re-themes only this surface and does NOT touch the app-wide saved
   * choice. Set false to drive (and persist) the global selection instead.
   */
  isolated?: boolean
  /** When enabled, selecting a profile also stores its linked global theme preset. */
  syncThemePreset?: boolean
  /** Optional callback fired whenever the active profile changes. */
  onProfileChange?: (profile: StyleProfile) => void
}

/**
 * Style picker — five style-profile cards in an accessible radiogroup plus a
 * live multi-primitive preview. Selecting a card calls into the
 * {@link ThemeProvider}, which rewrites the `--primitive-*` tokens on its
 * wrapper so the entire preview re-themes instantly.
 *
 * The radiogroup + preview share one provider scope, so the cards and the
 * preview always agree on the active profile. The provider is `disablePersistence`
 * by default so this surface never clobbers the user's saved app theme.
 */
export function StylePicker({
  defaultProfileId,
  isolated = false,
  syncThemePreset = !isolated,
  onProfileChange,
}: StylePickerProps) {
  return (
    <ThemeProvider
      disablePersistence={isolated}
      defaultProfileId={defaultProfileId}
      className={styles.stage}
    >
      <StylePickerInner
        syncThemePreset={syncThemePreset}
        onProfileChange={onProfileChange}
      />
    </ThemeProvider>
  )
}

interface StylePickerInnerProps {
  syncThemePreset: boolean
  onProfileChange?: (profile: StyleProfile) => void
}

/**
 * The radiogroup + preview. Must render inside {@link ThemeProvider}; reads and
 * mutates the active profile through {@link useStyleProfile}.
 */
function StylePickerInner({ syncThemePreset, onProfileChange }: StylePickerInnerProps) {
  const { profile, profileId, profiles, setProfile } = useStyleProfile()
  const groupId = useId()
  const groupRef = useRef<HTMLDivElement>(null)
  const linkedPresetId = getThemePresetForStyleProfile(profile.id)
  const linkedPreset = getPreset(linkedPresetId)

  const select = useCallback(
    (next: StyleProfile) => {
      setProfile(next.id)
      if (syncThemePreset) {
        storeThemePresetId(getThemePresetForStyleProfile(next.id))
      }
      onProfileChange?.(next)
    },
    [setProfile, syncThemePreset, onProfileChange],
  )

  // Roving focus: arrow keys move selection within the radiogroup, wrapping at
  // the ends; Home/End jump to the first/last. The newly selected card (the
  // only one with tabIndex 0) is then focused so keyboard users keep their place.
  const handleKeyNav = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const count = profiles.length
      const currentIndex = profiles.findIndex((candidate) => candidate.id === profileId)
      if (currentIndex < 0) return

      let nextIndex = currentIndex
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % count
          break
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (currentIndex - 1 + count) % count
          break
        case "Home":
          nextIndex = 0
          break
        case "End":
          nextIndex = count - 1
          break
        default:
          return
      }

      event.preventDefault()
      const nextProfile = profiles[nextIndex]
      select(nextProfile)

      const cards = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      cards?.[nextIndex]?.focus()
    },
    [profiles, profileId, select],
  )

  return (
    <div
      className={styles.stack}
      data-style-theme-contract="true"
      data-active-style-profile={profile.id}
      data-linked-theme-preset={linkedPreset.id}
      data-style-sync={syncThemePreset ? "global" : "isolated"}
    >
      <section className={styles.contractPanel} aria-labelledby={`${groupId}-contract`}>
        <div className={styles.contractCopy}>
          <span className={styles.controlsKicker}>Theme + profile source</span>
          <h2 id={`${groupId}-contract`}>One cascade, two layers</h2>
          <p>
            The selected style profile is wired to the global theming preset.
            Theming owns the base palette; the style picker owns the material
            overlay. Both write to the same dashboard-root primitive tokens.
          </p>
        </div>

        <div className={styles.contractGrid}>
          <div>
            <span>Active profile</span>
            <strong>{profile.name}</strong>
            <small>{profile.description}</small>
          </div>
          <div>
            <span>Linked theme</span>
            <strong>{linkedPreset.label}</strong>
            <small>{linkedPreset.description}</small>
          </div>
          <div>
            <span>Scope</span>
            <strong>{syncThemePreset ? "Global shell" : "Isolated preview"}</strong>
            <small>
              {syncThemePreset
                ? "Persists across UI primitive routes"
                : "Stays inside this picker only"}
            </small>
          </div>
        </div>

        <div className={styles.atomRail} aria-label="Style picker atomic stack">
          {ATOMIC_STACK.map(([title, body], index) => (
            <article key={title} data-style-atom={title.toLowerCase().replaceAll(" ", "-")}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <small>{body}</small>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.layout}>
        <div className={styles.controls}>
          <div className={styles.controlsHead}>
            <span className={styles.controlsKicker} id={`${groupId}-kicker`}>
              Style profile
            </span>
            <p className={styles.controlsHint}>
              Five token-override sets. Each writes only `--primitive-*` values, links to a
              theming preset, and re-themes the same atomic preview components.
            </p>
          </div>

          <div
            ref={groupRef}
            role="radiogroup"
            aria-labelledby={`${groupId}-kicker`}
            className={styles.cardGrid}
          >
            {profiles.map((candidate) => {
              const isSelected = candidate.id === profileId
              return (
                <ProfileCard
                  key={candidate.id}
                  profile={candidate}
                  selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onSelect={select}
                  onKeyNav={handleKeyNav}
                />
              )
            })}
          </div>
        </div>

        <LivePreview profile={profile} />
      </div>
    </div>
  )
}
