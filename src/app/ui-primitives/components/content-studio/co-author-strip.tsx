"use client"

import { Eye, EyeOff, Plus } from "lucide-react"
import { useId, useState } from "react"

import { Avatar, Chip } from "../primitives"
import type { AvatarTone } from "../primitives"
import { GlassSurface } from "../surfaces"

import {
  AUTHOR_ROLE_LABEL,
  AUTHOR_ROLE_TONE,
  studioToneToChip,
  type CoAuthorSlot,
  type StudioTone,
} from "./content-studio-types"
import styles from "./co-author-strip.module.css"

function avatarTone(tone: StudioTone): AvatarTone {
  if (tone === "violet" || tone === "neutral") return "obsidian"
  return tone
}

interface CoAuthorStripProps {
  slots: ReadonlyArray<CoAuthorSlot>
  /** Optional handler when visibility toggles. */
  onVisibilityChange?: (authorId: string, visible: boolean) => void
  className?: string
}

export function CoAuthorStrip({
  slots,
  onVisibilityChange,
  className,
}: CoAuthorStripProps) {
  const stripId = useId()
  const initialMap = new Map<string, boolean>()
  for (const slot of slots) initialMap.set(slot.author.id, slot.visible)
  const [visibility, setVisibility] = useState<ReadonlyMap<string, boolean>>(initialMap)

  const toggle = (id: string) => {
    setVisibility((current) => {
      const next = new Map(current)
      const wasVisible = next.get(id) ?? true
      next.set(id, !wasVisible)
      onVisibilityChange?.(id, !wasVisible)
      return next
    })
  }

  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="low" className={classes}>
      <div className={styles.shell} aria-labelledby={`${stripId}-title`}>
        <header className={styles.head}>
          <span className={styles.kicker}>Byline</span>
          <h2 className={styles.title} id={`${stripId}-title`}>
            Authors on this draft
          </h2>
        </header>

        <ul className={styles.list} aria-label="Co-author slots">
          {slots.map((slot) => {
            const visible = visibility.get(slot.author.id) ?? true
            const tone = AUTHOR_ROLE_TONE[slot.author.role]
            return (
              <li
                key={slot.author.id}
                className={[
                  styles.slot,
                  visible ? "" : styles.slotHidden,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.identity}>
                  <Avatar
                    name={slot.author.name}
                    src={slot.author.avatar}
                    size="md"
                    tone={avatarTone(tone)}
                  />
                  <div className={styles.body}>
                    <span className={styles.name}>
                      {slot.bylineOverride ?? slot.author.name}
                    </span>
                    <span className={styles.qualifier}>{slot.author.qualifier}</span>
                  </div>
                </div>
                <div className={styles.controls}>
                  <Chip
                    label={AUTHOR_ROLE_LABEL[slot.author.role]}
                    tone={studioToneToChip(tone)}
                  />
                  <button
                    type="button"
                    className={[
                      styles.toggle,
                      visible ? styles.toggleVisible : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-label={
                      visible
                        ? `Hide ${slot.author.name} from public byline`
                        : `Show ${slot.author.name} in public byline`
                    }
                    aria-pressed={visible}
                    onClick={() => toggle(slot.author.id)}
                  >
                    {visible ? (
                      <Eye size={13} strokeWidth={2.4} aria-hidden="true" />
                    ) : (
                      <EyeOff size={13} strokeWidth={2.4} aria-hidden="true" />
                    )}
                    <span>{visible ? "Visible" : "Hidden"}</span>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        <footer className={styles.foot}>
          <button type="button" className={styles.addBtn}>
            <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
            <span>Add co-author</span>
          </button>
        </footer>
      </div>
    </GlassSurface>
  )
}

export default CoAuthorStrip
