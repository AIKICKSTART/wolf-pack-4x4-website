"use client"

import { useMemo, useState } from "react"

import { BasicDialog } from "../overlays/basic-dialog"

import {
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  CHANNEL_TONE,
  type UnifiedConversation,
} from "./unified-inbox-types"
import styles from "./merge-conversations-modal.module.css"

interface MergeConversationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Candidate conversations to merge. */
  candidates: ReadonlyArray<UnifiedConversation>
  /** Primary conversation id (target). All other selections will merge into this one. */
  primaryId: string
  /** Triggered when the merge is confirmed. */
  onConfirm?: (payload: {
    primaryId: string
    mergeIds: ReadonlyArray<string>
    keepHistory: boolean
  }) => void
}

export function MergeConversationsModal({
  open,
  onOpenChange,
  candidates,
  primaryId,
  onConfirm,
}: MergeConversationsModalProps) {
  const [selectedIds, setSelectedIds] = useState<ReadonlyArray<string>>([])
  const [keepHistory, setKeepHistory] = useState<boolean>(true)

  const primary = useMemo(
    () => candidates.find((conversation) => conversation.id === primaryId),
    [candidates, primaryId],
  )

  const others = useMemo(
    () => candidates.filter((conversation) => conversation.id !== primaryId),
    [candidates, primaryId],
  )

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((value) => value !== id)
        : [...prev, id],
    )
  }

  const canConfirm = selectedIds.length > 0

  const handleConfirm = () => {
    if (!canConfirm) return
    onConfirm?.({
      primaryId,
      mergeIds: selectedIds,
      keepHistory,
    })
    onOpenChange(false)
    setSelectedIds([])
  }

  return (
    <BasicDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Merge duplicate conversations"
      description="Pick the duplicates to fold into the primary thread. Messages are sorted chronologically after merging."
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
            Merge {selectedIds.length} into primary
          </button>
        </div>
      }
    >
      <div className={styles.body}>
        {primary ? (
          <section className={styles.primary}>
            <span className={styles.label}>Primary conversation</span>
            <div className={styles.primaryRow}>
              <span
                className={[
                  styles.channelBadge,
                  styles[`tone_${CHANNEL_TONE[primary.channel]}`],
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={CHANNEL_LABEL[primary.channel]}
              >
                {CHANNEL_GLYPH[primary.channel]}
              </span>
              <span className={styles.primaryBody}>
                <span className={styles.primaryName}>{primary.customerName}</span>
                <span className={styles.primarySubject}>{primary.subject}</span>
              </span>
            </div>
          </section>
        ) : null}

        <section className={styles.section}>
          <span className={styles.label}>Possible duplicates</span>
          <ul className={styles.list}>
            {others.map((conversation) => {
              const isSelected = selectedIds.includes(conversation.id)
              const tone = CHANNEL_TONE[conversation.channel]
              return (
                <li key={conversation.id}>
                  <label
                    className={[
                      styles.row,
                      isSelected ? styles.rowActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={isSelected}
                      onChange={() => toggleSelection(conversation.id)}
                    />
                    <span
                      className={[
                        styles.channelBadge,
                        styles[`tone_${tone}`],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-label={CHANNEL_LABEL[conversation.channel]}
                    >
                      {CHANNEL_GLYPH[conversation.channel]}
                    </span>
                    <span className={styles.rowBody}>
                      <span className={styles.rowName}>
                        {conversation.customerName}
                      </span>
                      <span className={styles.rowSubject}>
                        {conversation.subject}
                      </span>
                      <span className={styles.rowPreview}>
                        {conversation.preview}
                      </span>
                    </span>
                    <span className={styles.rowTime}>
                      {conversation.timestamp}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>

        <div className={styles.optionRow}>
          <div className={styles.option}>
            <span className={styles.optionTitle}>Keep full history</span>
            <span className={styles.optionDesc}>
              Inbound messages are interleaved by timestamp instead of appended.
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={keepHistory}
            aria-label="Keep full history"
            className={[styles.switch, keepHistory ? styles.switchOn : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setKeepHistory((prev) => !prev)}
          />
        </div>
      </div>
    </BasicDialog>
  )
}

export default MergeConversationsModal
