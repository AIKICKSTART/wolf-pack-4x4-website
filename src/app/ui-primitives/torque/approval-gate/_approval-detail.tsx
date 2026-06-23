"use client"

import { useId, useState } from "react"
import {
  AlertTriangle,
  Check,
  Eye,
  GitCompareArrows,
  ShieldCheck,
  X,
} from "lucide-react"

import { Chip } from "../../components/primitives/chip"
import { ProgressLinear } from "../../components/primitives/progress-linear"
import { StatTile } from "../../components/primitives/stat-tile"
import { StatusBadge } from "../../components/data-display"
import { DiffStatsBar, InlineDiff } from "../../components/code-diff"
import { ConfirmDialog } from "../../components/overlays/confirm-dialog"
import {
  actionKindLabel,
  actionKindTone,
  type PendingApproval,
  type RiskFlag,
} from "./_demo-data"
import styles from "./approval-gate.module.css"

/** Decision the operator has taken on an action (local demo state). */
type Decision = "pending" | "approved" | "rejected"

type RiskSeverity = RiskFlag["severity"]

const RISK_TONE: Record<RiskSeverity, "red" | "amber" | "teal"> = {
  high: "red",
  medium: "amber",
  low: "teal",
}

const RISK_LABEL: Record<RiskSeverity, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
}

const STAT_TONE_MAP = {
  info: "teal",
  success: "green",
  warn: "amber",
  error: "red",
  neutral: "neutral",
  brand: "red",
} as const

interface ApprovalDetailProps {
  approval: PendingApproval
}

/**
 * The detailed approval card for a single sensitive Torque action.
 *
 * Composes risk flags + diff + preview + a confidence meter, then gates the
 * approve action behind a confirm dialog. High-impact actions additionally
 * require the operator to type a confirmation phrase on the card before the
 * Approve button unlocks — kept on the card (not behind the modal backdrop)
 * so it stays keyboard-reachable.
 */
export function ApprovalDetail({ approval }: ApprovalDetailProps) {
  const [decision, setDecision] = useState<Decision>("pending")
  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [phrase, setPhrase] = useState("")
  const phraseInputId = useId()

  const highestSeverity = approval.risks[0]?.severity ?? "low"
  const needsPhrase = Boolean(approval.confirmPhrase)
  const phraseMatches = !needsPhrase || phrase.trim() === approval.confirmPhrase

  const confidenceTone =
    approval.confidence >= 85 ? "green" : approval.confidence >= 65 ? "teal" : "amber"

  const confirmApprove = () => {
    if (!phraseMatches) {
      return
    }
    setDecision("approved")
    setApproveOpen(false)
    setPhrase("")
  }

  const confirmReject = () => {
    setDecision("rejected")
    setRejectOpen(false)
  }

  return (
    <article
      className={styles.detail}
      data-decision={decision}
      aria-labelledby={`${approval.id}-title`}
    >
      <header className={styles.detailHead}>
        <span className={styles.torqueAvatar} aria-hidden="true">
          T
        </span>
        <div className={styles.detailHeadText}>
          <div className={styles.detailKicker}>
            <StatusBadge
              tone={actionKindTone(approval.kind)}
              size="sm"
              shape="pill"
              label={actionKindLabel(approval.kind)}
            />
            <span className={styles.detailRef}>{approval.id}</span>
            <span className={styles.detailDot} aria-hidden="true">
              ·
            </span>
            <span className={styles.detailRequested}>{approval.requestedLabel}</span>
          </div>
          <h2 id={`${approval.id}-title`} className={styles.detailTitle}>
            {approval.title}
          </h2>
          <p className={styles.detailSummary}>{approval.summary}</p>
          <p className={styles.detailTarget}>
            <span className={styles.detailTargetLabel}>Target</span>
            {approval.target}
          </p>
        </div>
        <DecisionBadge decision={decision} />
      </header>

      <section className={styles.confidenceRow} aria-label="Torque confidence in this draft">
        <div className={styles.confidenceText}>
          <span className={styles.confidenceLabel}>Torque confidence</span>
          <span className={styles.confidenceValue}>{approval.confidence}%</span>
        </div>
        <ProgressLinear
          value={approval.confidence}
          tone={confidenceTone}
          variant="solid"
          label={`Torque confidence ${approval.confidence}%`}
        />
      </section>

      <section className={styles.statGrid} aria-label="Impact summary">
        {approval.stats.map((stat) => (
          <StatTile
            key={stat.label}
            label={stat.label}
            value={stat.value}
            tone={stat.tone ? STAT_TONE_MAP[stat.tone] : "neutral"}
          />
        ))}
      </section>

      <section
        className={styles.risks}
        aria-label={`Risk flags — ${approval.risks.length} raised`}
      >
        <header className={styles.blockHead}>
          <h3 className={styles.blockTitle}>
            <AlertTriangle size={14} strokeWidth={2.4} aria-hidden="true" />
            Risk flags
          </h3>
          <Chip
            label={`${RISK_LABEL[highestSeverity]} risk`}
            tone={RISK_TONE[highestSeverity]}
          />
        </header>
        <ul className={styles.riskList}>
          {approval.risks.map((risk) => (
            <li
              key={risk.id}
              className={styles.riskItem}
              data-severity={risk.severity}
            >
              <span className={styles.riskDot} aria-hidden="true" />
              <div className={styles.riskBody}>
                <span className={styles.riskLabel}>
                  {risk.label}
                  <StatusBadge
                    tone={
                      risk.severity === "high"
                        ? "error"
                        : risk.severity === "medium"
                          ? "warn"
                          : "info"
                    }
                    size="sm"
                    shape="dot"
                    label={RISK_LABEL[risk.severity]}
                  />
                </span>
                <span className={styles.riskDetail}>{risk.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.previewSplit}>
        <section className={styles.preview} aria-label={approval.previewLabel}>
          <header className={styles.blockHead}>
            <h3 className={styles.blockTitle}>
              <Eye size={14} strokeWidth={2.4} aria-hidden="true" />
              Preview
            </h3>
            <span className={styles.blockMeta}>{approval.previewLabel}</span>
          </header>
          <div className={styles.previewBody}>
            {approval.previewBody.map((line, index) =>
              line === "" ? (
                <span
                  key={`gap-${index}`}
                  className={styles.previewGap}
                  aria-hidden="true"
                />
              ) : (
                <p
                  key={`line-${index}`}
                  className={index === 0 ? styles.previewLead : styles.previewLine}
                >
                  {line}
                </p>
              ),
            )}
          </div>
        </section>

        <section className={styles.diff} aria-label="What changes">
          <header className={styles.blockHead}>
            <h3 className={styles.blockTitle}>
              <GitCompareArrows size={14} strokeWidth={2.4} aria-hidden="true" />
              What changes
            </h3>
            <span className={styles.blockMeta}>{approval.diffRef}</span>
          </header>
          <DiffStatsBar
            insertions={approval.diffStats.insertions}
            deletions={approval.diffStats.deletions}
            filesChanged={approval.diffStats.filesChanged}
          />
          <InlineDiff
            filePath={approval.diffPath}
            commitRef={approval.diffRef}
            lines={approval.diff}
          />
        </section>
      </div>

      <footer className={styles.gate}>
        <p className={styles.gateNote}>
          <ShieldCheck size={14} strokeWidth={2.2} aria-hidden="true" />
          Nothing happens until you approve. Torque holds the action here.
        </p>

        {needsPhrase && decision === "pending" ? (
          <div className={styles.phraseDock}>
            <label htmlFor={phraseInputId} className={styles.phraseLabel}>
              Type the confirmation phrase to unlock approval
            </label>
            <input
              id={phraseInputId}
              className={styles.phraseInput}
              type="text"
              value={phrase}
              placeholder={approval.confirmPhrase}
              autoComplete="off"
              spellCheck={false}
              aria-describedby={`${phraseInputId}-hint`}
              data-matches={phraseMatches ? "true" : "false"}
              onChange={(event) => setPhrase(event.target.value)}
            />
            <span id={`${phraseInputId}-hint`} className={styles.phraseHint}>
              {phraseMatches
                ? "Phrase matches — Approve is unlocked."
                : `High-impact action. Type "${approval.confirmPhrase}" exactly.`}
            </span>
          </div>
        ) : null}

        <div className={styles.gateActions}>
          <button
            type="button"
            className={styles.rejectBtn}
            onClick={() => setRejectOpen(true)}
            disabled={decision !== "pending"}
          >
            <X size={15} strokeWidth={2.4} aria-hidden="true" />
            Reject
          </button>
          <button
            type="button"
            className={styles.approveBtn}
            data-kind={approval.kind}
            onClick={() => setApproveOpen(true)}
            disabled={decision !== "pending" || !phraseMatches}
            aria-disabled={decision !== "pending" || !phraseMatches}
          >
            <Check size={15} strokeWidth={2.4} aria-hidden="true" />
            Approve {actionKindLabel(approval.kind).toLowerCase()}
          </button>
        </div>
      </footer>

      <ConfirmDialog
        open={approveOpen}
        onOpenChange={setApproveOpen}
        variant={highestSeverity === "high" ? "destructive" : "default"}
        title={`Approve — ${approval.title}?`}
        description={
          needsPhrase
            ? `${approval.summary} This is high-impact and can't be undone once Torque acts.`
            : `${approval.summary} Torque will carry this out immediately.`
        }
        confirmLabel={`Approve & ${actionKindLabel(approval.kind).toLowerCase()}`}
        cancelLabel="Keep holding"
        onConfirm={confirmApprove}
        icon={
          needsPhrase ? (
            <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          ) : undefined
        }
      />

      <ConfirmDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        variant="destructive"
        title={`Reject — ${approval.title}?`}
        description="Torque discards this draft and won't carry it out. You can ask Torque to redraft anytime."
        confirmLabel="Reject draft"
        cancelLabel="Keep holding"
        onConfirm={confirmReject}
      />
    </article>
  )
}

function DecisionBadge({ decision }: { decision: Decision }) {
  if (decision === "approved") {
    return (
      <span className={styles.decisionBadge} data-decision="approved" role="status">
        <Check size={13} strokeWidth={2.6} aria-hidden="true" />
        Approved
      </span>
    )
  }
  if (decision === "rejected") {
    return (
      <span className={styles.decisionBadge} data-decision="rejected" role="status">
        <X size={13} strokeWidth={2.6} aria-hidden="true" />
        Rejected
      </span>
    )
  }
  return (
    <span className={styles.decisionBadge} data-decision="pending">
      <span className={styles.pendingPulse} aria-hidden="true" />
      Awaiting you
    </span>
  )
}

export default ApprovalDetail
