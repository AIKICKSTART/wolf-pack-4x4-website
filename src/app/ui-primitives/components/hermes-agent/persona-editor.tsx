import { ShieldCheck, Sparkles, UserCog } from "lucide-react"

import { Chip } from "../primitives/chip"
import type { HermesTone } from "./hermes-agent-types"
import styles from "./persona-editor.module.css"

export interface PersonaToneOption {
  id: string
  label: string
  selected?: boolean
  tone?: HermesTone
}

export interface PersonaRefusalRule {
  id: string
  /** Short rule text, e.g. "No medical or legal advice." */
  text: string
  tone: HermesTone
}

export interface PersonaEscalationPath {
  id: string
  trigger: string
  target: string
}

export interface PersonaHourSlot {
  /** Three-letter day code, e.g. "Mon". */
  day: string
  /** Display time range, e.g. "7:30–17:00". */
  range: string
  /** True if closed. */
  closed?: boolean
}

interface PersonaEditorProps {
  name: string
  version: string
  systemPrompt: string
  toneOptions: ReadonlyArray<PersonaToneOption>
  refusals: ReadonlyArray<PersonaRefusalRule>
  hours: ReadonlyArray<PersonaHourSlot>
  escalation: ReadonlyArray<PersonaEscalationPath>
  /** Optional read-only flag. When true, fields render but are disabled. */
  readOnly?: boolean
  className?: string
}

export function PersonaEditor({
  name,
  version,
  systemPrompt,
  toneOptions,
  refusals,
  hours,
  escalation,
  readOnly = false,
  className,
}: PersonaEditorProps) {
  const classes = [styles.editor, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      aria-label={`Persona editor for ${name}`}
      role="region"
    >
      <header className={styles.head}>
        <div>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.subtitle}>
            <UserCog
              size={11}
              strokeWidth={2.2}
              aria-hidden="true"
              style={{ marginInlineEnd: 4 }}
            />
            Persona · tone · refusals · hours · escalation
          </span>
        </div>
        <span className={styles.versionChip}>
          <Sparkles size={11} strokeWidth={2.2} aria-hidden="true" /> {version}
        </span>
      </header>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="hermes-system-prompt">System prompt</label>
          <textarea
            id="hermes-system-prompt"
            className={styles.textarea}
            defaultValue={systemPrompt}
            readOnly={readOnly}
            aria-readonly={readOnly}
            spellCheck={false}
          />
        </div>

        <div className={styles.field}>
          <label>Tone profile</label>
          <div className={styles.toneRow} role="radiogroup" aria-label="Tone profile">
            {toneOptions.map((option) => (
              <Chip
                key={option.id}
                label={option.label}
                selected={option.selected}
                tone={option.tone ?? "teal"}
              />
            ))}
          </div>

          <label style={{ marginTop: 12 }}>Refusal & guardrails</label>
          <ul className={styles.list}>
            {refusals.map((rule) => (
              <li
                key={rule.id}
                className={styles.bullet}
                data-tone={rule.tone}
              >
                <span className={styles.bulletDot} aria-hidden="true" />
                <span>{rule.text}</span>
                <ShieldCheck
                  size={13}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.field}>
        <label>Workshop hours · honoured by Hermes</label>
        <div className={styles.hourGrid}>
          {hours.map((slot) => (
            <div
              key={slot.day}
              className={styles.hour}
              data-closed={slot.closed ? "true" : "false"}
            >
              <strong>{slot.day}</strong>
              <span>{slot.closed ? "Closed" : slot.range}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label>Escalation paths</label>
        <ul className={styles.list}>
          {escalation.map((path) => (
            <li key={path.id} className={styles.bullet} data-tone="amber">
              <span className={styles.bulletDot} aria-hidden="true" />
              <span>
                <strong className={styles.escTrigger}>{path.trigger}</strong>
                → {path.target}
              </span>
              <span className={styles.slaTag}>SLA · 5m</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        <span className={styles.previewChip}>
          <Sparkles size={11} strokeWidth={2.2} aria-hidden="true" />
          Preview · visual reference only
        </span>
        <span className={styles.subtitle}>
          Last saved · 14:02 AEST · Daniel F.
        </span>
      </footer>
    </section>
  )
}

export default PersonaEditor
