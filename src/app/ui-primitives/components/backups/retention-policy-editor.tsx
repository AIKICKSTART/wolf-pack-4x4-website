"use client"

import { useState } from "react"

import type { RetentionRule, RetentionTier, StorageTier } from "./backup-types"

import styles from "./retention-policy-editor.module.css"

const TIER_LABEL: Record<RetentionTier, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
}

const TIER_ORDER: ReadonlyArray<RetentionTier> = ["daily", "weekly", "monthly", "yearly"]

const STORAGE_TIER_LABEL: Record<StorageTier, string> = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
  glacier: "Glacier",
  deep_archive: "Deep Archive",
  archive_tier: "Archive Tier",
}

const STORAGE_TIERS: ReadonlyArray<StorageTier> = [
  "hot",
  "warm",
  "cold",
  "glacier",
  "deep_archive",
  "archive_tier",
]

interface RetentionPolicyEditorProps {
  rules: ReadonlyArray<RetentionRule>
  onChange?: (rules: ReadonlyArray<RetentionRule>) => void
  className?: string
}

export function RetentionPolicyEditor({
  rules,
  onChange,
  className,
}: RetentionPolicyEditorProps) {
  const [local, setLocal] = useState<ReadonlyArray<RetentionRule>>(rules)

  const update = (next: ReadonlyArray<RetentionRule>) => {
    setLocal(next)
    onChange?.(next)
  }

  const updateRule = (tier: RetentionTier, patch: Partial<RetentionRule>) => {
    const next = local.map((r) => (r.tier === tier ? { ...r, ...patch } : r))
    update(next)
  }

  const classes = [styles.editor, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Retention policy editor">
      <header className={styles.head}>
        <span className={styles.kicker}>Retention policy</span>
        <h3 className={styles.title}>Keep snapshots</h3>
      </header>

      <ul className={styles.list}>
        {TIER_ORDER.map((tier) => {
          const rule = local.find((r) => r.tier === tier)
          if (!rule) return null
          return (
            <li key={tier} className={styles.rule}>
              <div className={styles.ruleHead}>
                <span className={styles.tierLabel}>{TIER_LABEL[tier]}</span>
                <span className={styles.ruleSummary}>
                  Keep last {rule.keepCount} {tier}
                </span>
              </div>
              <div className={styles.controls}>
                <label className={styles.numField}>
                  <span className={styles.numLabel}>Count</span>
                  <input
                    type="number"
                    min={0}
                    max={365}
                    value={rule.keepCount}
                    onChange={(e) =>
                      updateRule(tier, {
                        keepCount: Math.max(0, Number(e.currentTarget.value) || 0),
                      })
                    }
                    aria-label={`${TIER_LABEL[tier]} snapshots to keep`}
                  />
                </label>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={rule.tierMoveEnabled}
                    onChange={(e) =>
                      updateRule(tier, { tierMoveEnabled: e.currentTarget.checked })
                    }
                  />
                  <span className={styles.toggleTrack} aria-hidden="true">
                    <span className={styles.toggleThumb} />
                  </span>
                  <span className={styles.toggleText}>Tier-mover</span>
                </label>
                {rule.tierMoveEnabled ? (
                  <label className={styles.tierField}>
                    <span className={styles.numLabel}>Move to</span>
                    <select
                      value={rule.moveTo ?? "cold"}
                      onChange={(e) =>
                        updateRule(tier, { moveTo: e.currentTarget.value as StorageTier })
                      }
                      aria-label={`${TIER_LABEL[tier]} tier-move destination`}
                    >
                      {STORAGE_TIERS.map((s) => (
                        <option key={s} value={s}>
                          {STORAGE_TIER_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RetentionPolicyEditor
