"use client"

import { type KeyboardEvent } from "react"

import type { StyleProfile } from "../../builder/theme"
import { getThemePresetForStyleProfile } from "../../components/theming/theme-tokens"
import { ProfileSwatch } from "./profile-swatch"
import styles from "./style-picker.module.css"

export interface ProfileCardProps {
  /** The profile this card selects. */
  profile: StyleProfile
  /** Whether this card is the active selection. */
  selected: boolean
  /** Roving-tabindex target (only the active card is in the tab order). */
  tabIndex: number
  /** Select this profile. */
  onSelect: (profile: StyleProfile) => void
  /** Arrow-key navigation handled by the parent radiogroup. */
  onKeyNav: (event: KeyboardEvent<HTMLButtonElement>) => void
}

/**
 * A single style-profile tile inside the radiogroup. Renders a per-profile
 * {@link ProfileSwatch} preview (rendered inside that profile's own token
 * scope so it shows the real look), the name, and the description. Selecting
 * it re-themes the whole preview.
 */
export function ProfileCard({
  profile,
  selected,
  tabIndex,
  onSelect,
  onKeyNav,
}: ProfileCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={tabIndex}
      data-selected={selected || undefined}
      data-profile={profile.id}
      data-linked-theme-preset={getThemePresetForStyleProfile(profile.id)}
      className={styles.card}
      onClick={() => onSelect(profile)}
      onKeyDown={onKeyNav}
    >
      <span className={styles.cardSheen} aria-hidden="true" />

      <ProfileSwatch profile={profile} />

      <span className={styles.cardMeta}>
        <span className={styles.cardName}>{profile.name}</span>
        <span className={styles.cardScheme}>{profile.scheme}</span>
      </span>

      <span className={styles.cardDescription}>{profile.description}</span>

      <span className={styles.cardCheck} aria-hidden="true" />
    </button>
  )
}
