"use client"

import { useState, type ChangeEvent, type KeyboardEvent } from "react"

import styles from "./note-composer.module.css"

export interface NoteMention {
  id: string
  name: string
  role?: string
}

export interface NoteComposerValue {
  body: string
  tags: ReadonlyArray<string>
  mentions: ReadonlyArray<string>
  pinned: boolean
}

interface NoteComposerProps {
  mentionDirectory?: ReadonlyArray<NoteMention>
  placeholder?: string
  initial?: Partial<NoteComposerValue>
  onSave?: (value: NoteComposerValue) => void
  className?: string
}

export function NoteComposer({
  mentionDirectory = [],
  placeholder = "Write a note about this customer…",
  initial,
  onSave,
  className,
}: NoteComposerProps) {
  const [body, setBody] = useState<string>(initial?.body ?? "")
  const [tags, setTags] = useState<string[]>(initial?.tags ? [...initial.tags] : [])
  const [mentions, setMentions] = useState<string[]>(
    initial?.mentions ? [...initial.mentions] : [],
  )
  const [pinned, setPinned] = useState<boolean>(initial?.pinned ?? false)
  const [tagDraft, setTagDraft] = useState<string>("")
  const [mentionOpen, setMentionOpen] = useState<boolean>(false)
  const [toast, setToast] = useState<string | null>(null)
  const classes = [styles.composer, className].filter(Boolean).join(" ")

  const handleBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value
    setBody(next)
    setMentionOpen(next.endsWith("@") || /@\w*$/.test(next))
  }

  const insertMention = (mention: NoteMention) => {
    setBody((prev) => {
      const replaced = prev.replace(/@\w*$/, `@${mention.name.replace(/\s+/g, "")} `)
      return replaced.endsWith(`@${mention.name.replace(/\s+/g, "")} `)
        ? replaced
        : `${prev}@${mention.name.replace(/\s+/g, "")} `
    })
    setMentions((prev) => (prev.includes(mention.id) ? prev : [...prev, mention.id]))
    setMentionOpen(false)
  }

  const handleTagKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagDraft.trim() !== "") {
      event.preventDefault()
      const next = tagDraft.trim()
      if (!tags.includes(next)) {
        setTags((prev) => [...prev, next])
      }
      setTagDraft("")
    } else if (event.key === "Backspace" && tagDraft === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1))
    }
  }

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((existing) => existing !== tag))
  }

  const handleSave = () => {
    if (body.trim() === "") {
      setToast("Note can't be empty")
      window.setTimeout(() => setToast(null), 2400)
      return
    }
    onSave?.({ body, tags, mentions, pinned })
    setToast(pinned ? "Note saved and pinned" : "Note saved")
    window.setTimeout(() => setToast(null), 2400)
  }

  return (
    <div className={classes}>
      <textarea
        className={styles.textarea}
        value={body}
        onChange={handleBody}
        placeholder={placeholder}
        rows={4}
        aria-label="Customer note body"
      />

      {mentionOpen && mentionDirectory.length > 0 ? (
        <ul className={styles.mentionList} role="listbox" aria-label="Mention picker">
          {mentionDirectory.slice(0, 5).map((mention) => (
            <li key={mention.id}>
              <button
                type="button"
                className={styles.mentionItem}
                onClick={() => insertMention(mention)}
              >
                <span>@{mention.name}</span>
                {mention.role ? (
                  <span className={styles.mentionRole}>{mention.role}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.tagRow}>
        <span className={styles.tagLabel}>Tags</span>
        <div className={styles.tagBox}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className={styles.tagInput}
            type="text"
            value={tagDraft}
            onChange={(event) => setTagDraft(event.target.value)}
            onKeyDown={handleTagKey}
            placeholder="add tag…"
            aria-label="Add tag"
          />
        </div>
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.pinToggle}
          aria-pressed={pinned}
          onClick={() => setPinned((prev) => !prev)}
        >
          <span aria-hidden="true">{pinned ? "📌" : "▱"}</span>
          {pinned ? "Pinned" : "Pin note"}
        </button>
        <button type="button" className={styles.save} onClick={handleSave}>
          Save note
        </button>
      </footer>

      {toast ? (
        <output className={styles.toast} aria-live="polite">
          {toast}
        </output>
      ) : null}
    </div>
  )
}

export default NoteComposer
