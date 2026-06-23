"use client"

import { useId, useMemo, useState, type ChangeEvent } from "react"

import { ApiScopeChip } from "../../components/permissions/api-scope-chip"
import { Chip } from "../../components/primitives/chip"
import { StatusBadge } from "../../components/data-display/status-badge-grid"

import styles from "./skills-memory.module.css"
import {
  SKILL_CATEGORY_LABEL,
  SKILL_CATEGORY_TONE,
  SKILLS,
  type SkillCategory,
  type TorqueSkill,
} from "./_demo-data"

type CategoryFilter = "all" | SkillCategory

const CATEGORY_FILTERS: ReadonlyArray<CategoryFilter> = [
  "all",
  "workshop",
  "marketing",
  "bookings",
  "quotes",
  "knowledge",
  "comms",
]

const runFormatter = new Intl.NumberFormat("en-AU")

interface SkillRowProps {
  skill: TorqueSkill
  enabled: boolean
  onToggle: (id: string, next: boolean) => void
}

/**
 * One installed skill: category + name + tool id, the plain-language summary,
 * the permission scopes it holds, a run count, a last-used stamp and an
 * accessible enable switch (input[role=switch]).
 */
function SkillRow({ skill, enabled, onToggle }: SkillRowProps) {
  const toggleId = useId()
  const descId = useId()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onToggle(skill.id, event.target.checked)
  }

  return (
    <li className={styles.skillRow} data-enabled={enabled ? "true" : "false"}>
      <div className={styles.skillMain}>
        <div className={styles.skillHead}>
          <Chip
            label={SKILL_CATEGORY_LABEL[skill.category]}
            tone={SKILL_CATEGORY_TONE[skill.category]}
          />
          <h3 className={styles.skillName}>{skill.name}</h3>
          {skill.beta && (
            <StatusBadge tone="brand" size="sm" shape="pill" label="Beta" />
          )}
          <code className={styles.skillTool}>{skill.toolId}</code>
        </div>

        <p id={descId} className={styles.skillSummary}>
          {skill.summary}
        </p>

        <ul className={styles.skillScopes} aria-label={`${skill.name} permission scopes`}>
          {skill.scopes.map((scope) => (
            <li key={scope.scope}>
              <ApiScopeChip
                scope={scope.scope}
                description={scope.description}
                action={scope.action}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.skillSide}>
        <label htmlFor={toggleId} className={styles.toggleWrap}>
          <input
            id={toggleId}
            type="checkbox"
            role="switch"
            className={styles.toggleInput}
            checked={enabled}
            onChange={handleChange}
            aria-describedby={descId}
          />
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>{enabled ? "On" : "Off"}</span>
        </label>

        <dl className={styles.skillStats}>
          <div className={styles.skillStat}>
            <dt>Runs · month</dt>
            <dd className={styles.num}>{runFormatter.format(skill.runsThisMonth)}</dd>
          </div>
          <div className={styles.skillStat}>
            <dt>Last used</dt>
            <dd>
              <time dateTime={skill.lastUsedIso}>{skill.lastUsed}</time>
            </dd>
          </div>
        </dl>
      </div>
    </li>
  )
}

/**
 * Skills catalog (left column): a category filter rail, a live count of what is
 * switched on, and the list of installed skills with their enable toggles.
 * Toggle state is local interactive client state — it narrates the choice
 * without mutating the demo fixtures.
 */
export function SkillsCatalog() {
  const [filter, setFilter] = useState<CategoryFilter>("all")
  const [overrides, setOverrides] = useState<ReadonlyMap<string, boolean>>(new Map())

  const isEnabled = (skill: TorqueSkill): boolean =>
    overrides.get(skill.id) ?? skill.enabled

  const handleToggle = (id: string, next: boolean) => {
    setOverrides((current) => {
      const map = new Map(current)
      map.set(id, next)
      return map
    })
  }

  const visible = useMemo(
    () => (filter === "all" ? SKILLS : SKILLS.filter((skill) => skill.category === filter)),
    [filter],
  )

  const enabledCount = SKILLS.filter((skill) => isEnabled(skill)).length

  return (
    <section className={styles.panel} aria-labelledby="skills-title">
      <header className={styles.panelHead}>
        <span className={styles.panelText}>
          <span className={styles.panelKicker}>Installed skills</span>
          <h2 id="skills-title" className={styles.panelTitle}>
            What Torque can do
          </h2>
          <p className={styles.panelDesc}>
            Every tool the assistant can run for the workshop. Flip a skill on to let Torque use it,
            off to hold it back. Each carries only the permission scopes the job needs.
          </p>
        </span>
        <span className={styles.panelTally} aria-live="polite">
          <strong className={styles.num}>{enabledCount}</strong>
          <span>of {SKILLS.length} on</span>
        </span>
      </header>

      <div
        className={styles.filterRow}
        role="group"
        aria-label="Filter skills by category"
      >
        {CATEGORY_FILTERS.map((value) => {
          const label = value === "all" ? "All" : SKILL_CATEGORY_LABEL[value]
          return (
            <Chip
              key={value}
              label={label}
              tone={value === "all" ? "neutral" : SKILL_CATEGORY_TONE[value]}
              selected={filter === value}
              onSelect={() => setFilter(value)}
            />
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className={styles.emptyNote}>No skills in this category yet.</p>
      ) : (
        <ul className={styles.skillList}>
          {visible.map((skill) => (
            <SkillRow
              key={skill.id}
              skill={skill}
              enabled={isEnabled(skill)}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default SkillsCatalog
