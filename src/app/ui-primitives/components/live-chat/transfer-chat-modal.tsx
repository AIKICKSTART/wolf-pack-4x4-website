"use client"

import { useState, type ChangeEvent } from "react"

import { BasicDialog } from "../overlays/basic-dialog"
import { Avatar } from "../primitives/avatar"

import {
  OPERATOR_STATUS_LABEL,
  type OperatorStatus,
  type OperatorTeam,
  type TransferTarget,
} from "./live-chat-types"
import styles from "./transfer-chat-modal.module.css"

export interface TransferOperator {
  id: string
  name: string
  /** Short role caption, e.g. "Bay 2 fitting lead". */
  role: string
  /** Current availability for routing. */
  status: OperatorStatus
  /** Number of chats currently in progress. */
  load: number
  /** Max concurrent chats. */
  capacity: number
}

export interface TransferTeamOption {
  team: OperatorTeam
  /** Average wait minutes for this team right now. */
  averageWait: number
  /** Number of operators currently online. */
  onlineCount: number
}

type TransferMode = "operator" | "team"

interface TransferChatModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Operators available for transfer. */
  operators: ReadonlyArray<TransferOperator>
  /** Teams available for transfer. */
  teams: ReadonlyArray<TransferTeamOption>
  /** Visitor display name. */
  visitorName: string
  /** Triggered when the operator confirms the transfer. */
  onConfirm?: (payload: {
    target: TransferTarget
    note: string
    transferWithContext: boolean
  }) => void
}

export function TransferChatModal({
  open,
  onOpenChange,
  operators,
  teams,
  visitorName,
  onConfirm,
}: TransferChatModalProps) {
  const [mode, setMode] = useState<TransferMode>("operator")
  const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(
    null,
  )
  const [selectedTeam, setSelectedTeam] = useState<OperatorTeam | null>(null)
  const [note, setNote] = useState<string>("")
  const [withContext, setWithContext] = useState<boolean>(true)

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value)
  }

  const canConfirm =
    mode === "operator" ? Boolean(selectedOperatorId) : Boolean(selectedTeam)

  const handleConfirm = () => {
    if (!canConfirm) return
    const target: TransferTarget =
      mode === "operator" && selectedOperatorId
        ? { kind: "operator", operatorId: selectedOperatorId }
        : { kind: "team", team: selectedTeam as OperatorTeam }
    onConfirm?.({
      target,
      note: note.trim(),
      transferWithContext: withContext,
    })
    onOpenChange(false)
  }

  return (
    <BasicDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Transfer chat with ${visitorName}`}
      description="Hand this conversation to another operator or team. Add a note so they know the back-story."
      size="md"
      actions={
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            Confirm transfer
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        <div
          className={styles.tabRow}
          role="tablist"
          aria-label="Transfer target type"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "operator"}
            className={[
              styles.tabBtn,
              mode === "operator" ? styles.tabBtnActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setMode("operator")}
          >
            To operator
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "team"}
            className={[
              styles.tabBtn,
              mode === "team" ? styles.tabBtnActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setMode("team")}
          >
            To team
          </button>
        </div>

        {mode === "operator" ? (
          <section className={styles.section}>
            <span className={styles.sectionLabel}>Online operators</span>
            <ul className={styles.list}>
              {operators.map((op) => {
                const isActive = selectedOperatorId === op.id
                return (
                  <li key={op.id}>
                    <button
                      type="button"
                      className={[
                        styles.row,
                        isActive ? styles.rowActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => setSelectedOperatorId(op.id)}
                      aria-pressed={isActive}
                    >
                      <Avatar
                        name={op.name}
                        size="md"
                        tone="red"
                        status={
                          op.status === "available"
                            ? "online"
                            : op.status === "away"
                              ? "away"
                              : op.status === "busy"
                                ? "busy"
                                : "offline"
                        }
                      />
                      <span className={styles.rowBody}>
                        <span className={styles.rowName}>{op.name}</span>
                        <span className={styles.rowMeta}>
                          {op.role} · {OPERATOR_STATUS_LABEL[op.status]}
                        </span>
                      </span>
                      <span className={styles.rowLoad}>
                        {op.load} / {op.capacity}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : (
          <section className={styles.section}>
            <span className={styles.sectionLabel}>Teams</span>
            <ul className={styles.list}>
              {teams.map((team) => {
                const isActive = selectedTeam === team.team
                return (
                  <li key={team.team}>
                    <button
                      type="button"
                      className={[
                        styles.row,
                        isActive ? styles.rowActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => setSelectedTeam(team.team)}
                      aria-pressed={isActive}
                    >
                      <Avatar name={team.team} size="md" tone="teal" />
                      <span className={styles.rowBody}>
                        <span className={styles.rowName}>{team.team}</span>
                        <span className={styles.rowMeta}>
                          {team.onlineCount} online · avg wait{" "}
                          {team.averageWait}m
                        </span>
                      </span>
                      <span className={styles.rowLoad}>Team</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <div className={styles.toggleRow}>
          <div className={styles.toggle}>
            <div className={styles.toggleLabel}>
              <span className={styles.toggleTitle}>Transfer with context</span>
              <span className={styles.toggleDesc}>
                Share customer cart, recent ticket history and chat sentiment.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={withContext}
              aria-label="Transfer with context"
              className={[
                styles.toggleSwitch,
                withContext ? styles.toggleSwitchOn : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setWithContext((prev) => !prev)}
            />
          </div>
        </div>

        <div className={styles.noteField}>
          <label htmlFor="transfer-note" className={styles.noteLabel}>
            Hand-off note (optional)
          </label>
          <textarea
            id="transfer-note"
            className={styles.noteInput}
            placeholder="e.g. Mick needs the ADR cheatsheet — confirmed engine code."
            value={note}
            onChange={handleNoteChange}
          />
        </div>
      </div>
    </BasicDialog>
  )
}

export default TransferChatModal
