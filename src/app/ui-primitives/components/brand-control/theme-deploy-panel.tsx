"use client"

import { ArrowUpRight, Pause, Rocket, ShieldAlert } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import type {
  DeployStage,
  DeployStatus,
  ThemeDeployment,
} from "./brand-control-types"
import styles from "./brand-control.module.css"

interface ThemeDeployPanelProps {
  deployment: ThemeDeployment
  /**
   * Called when the brand team taps Promote. Receives the next stage to move
   * the deployment to; the host is responsible for persistence.
   */
  onPromote?: (next: DeployStage) => void
  onHalt?: () => void
  className?: string
}

const STAGE_TONE: Record<DeployStage, "red" | "amber" | "teal" | "green" | "neutral"> = {
  draft: "neutral",
  staging: "amber",
  production: "green",
}

const STATUS_LABEL: Record<DeployStatus, string> = {
  queued: "Queued",
  rolling: "Rolling out",
  live: "Live",
  halted: "Halted",
}

const STATUS_TONE: Record<DeployStatus, "red" | "amber" | "teal" | "green"> = {
  queued: "teal",
  rolling: "amber",
  live: "green",
  halted: "red",
}

function nextStage(stage: DeployStage): DeployStage {
  if (stage === "draft") return "staging"
  if (stage === "staging") return "production"
  return "production"
}

/**
 * Theme deploy panel — promotes a staged theme through draft → staging →
 * production. Surfaces the rollout %, list of changed tokens, and halt
 * affordance for emergency rollback.
 */
export function ThemeDeployPanel({
  deployment,
  onPromote,
  onHalt,
  className,
}: ThemeDeployPanelProps) {
  const [stage, setStage] = useState<DeployStage>(deployment.stage)
  const [rollout, setRollout] = useState<number>(deployment.rolloutPct)
  const isProduction = stage === "production"
  const target = nextStage(stage)

  const handlePromote = () => {
    if (isProduction) return
    setStage(target)
    setRollout(target === "production" ? 100 : rollout)
    onPromote?.(target)
  }

  return (
    <article
      className={[styles.card, styles.cardWide, className].filter(Boolean).join(" ")}
      aria-label={`Theme deployment — ${deployment.themeLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Rocket size={12} aria-hidden="true" /> Umbrella · Deploy
          </span>
          <h3 className={styles.title}>{deployment.themeLabel}</h3>
          <p className={styles.subtitle}>
            Promote staged tokens through your rollout pipeline.
          </p>
        </div>
        <Chip label={STATUS_LABEL[deployment.status]} tone={STATUS_TONE[deployment.status]} />
      </header>

      <div className={styles.metaRow} aria-label="Stage pipeline">
        {(["draft", "staging", "production"] as DeployStage[]).map((step) => (
          <Chip
            key={step}
            label={step.charAt(0).toUpperCase() + step.slice(1)}
            tone={STAGE_TONE[step]}
            selected={step === stage}
          />
        ))}
      </div>

      <ProgressLinear
        value={rollout}
        max={100}
        tone={isProduction ? "green" : "amber"}
        variant="segmented"
        segments={10}
        label={`${target} rollout`}
        showLabel
      />

      <div>
        <span className={styles.tinyLabel}>Tokens in this deploy</span>
        <div className={styles.metaRow}>
          {deployment.changedTokenIds.map((tokenId) => (
            <span key={tokenId} className={styles.tokenChip}>
              <code>{tokenId}</code>
            </span>
          ))}
        </div>
      </div>

      <footer className={styles.foot}>
        <div className={styles.metaRow}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handlePromote}
            disabled={isProduction}
            aria-label={`Promote to ${target}`}
          >
            <ArrowUpRight size={12} aria-hidden="true" />
            Promote → {target}
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={onHalt}
            aria-label="Halt rollout"
          >
            <Pause size={12} aria-hidden="true" />
            Halt
          </button>
        </div>
        {deployment.promotedBy && (
          <span className={styles.tinyLabel}>
            <ShieldAlert size={11} aria-hidden="true" /> Promoted by {deployment.promotedBy}
          </span>
        )}
      </footer>
    </article>
  )
}

export default ThemeDeployPanel
