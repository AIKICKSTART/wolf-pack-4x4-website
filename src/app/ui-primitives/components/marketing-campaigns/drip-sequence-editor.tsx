"use client"

import { Pencil } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import { WorkflowCanvas } from "../workflows/workflow-canvas"
import { NodeTrigger } from "../workflows/node-trigger"
import { NodeAction } from "../workflows/node-action"
import { NodeWait } from "../workflows/node-wait"

import styles from "./drip-sequence-editor.module.css"
import {
  CHANNEL_LABEL,
  type CampaignTouchpoint,
} from "./marketing-campaigns-types"

export interface DripSequenceMeta {
  /** Trigger label — e.g. "Bay 2 quote requested". */
  triggerLabel: string
  triggerSource?: string
}

interface DripSequenceEditorProps {
  meta: DripSequenceMeta
  touchpoints: ReadonlyArray<CampaignTouchpoint>
  className?: string
}

export function DripSequenceEditor({
  meta,
  touchpoints,
  className,
}: DripSequenceEditorProps) {
  const [activeId, setActiveId] = useState<string | null>(
    touchpoints[0]?.id ?? null,
  )

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  // Distribute nodes vertically across the workflow canvas (top to bottom).
  const totalSlots = touchpoints.length + 1
  const slotStep = totalSlots > 1 ? 90 / totalSlots : 50

  return (
    <section
      className={classes}
      role="region"
      aria-label="Drip sequence editor"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Drip sequence</span>
        <span className={styles.subline}>
          {touchpoints.length} touchpoints from trigger
        </span>
      </header>

      <div className={styles.layout}>
        <ol className={styles.timeline}>
          <li className={styles.timelineRow}>
            <span className={styles.dot} data-tone="trigger" />
            <div className={styles.timelineMeta}>
              <span className={styles.timelineKicker}>Trigger</span>
              <span className={styles.timelineLabel}>{meta.triggerLabel}</span>
              {meta.triggerSource ? (
                <span className={styles.timelineSub}>{meta.triggerSource}</span>
              ) : null}
            </div>
          </li>
          {touchpoints.map((tp) => {
            const isActive = tp.id === activeId
            return (
              <li
                key={tp.id}
                className={[
                  styles.timelineRow,
                  isActive ? styles.timelineRowActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className={styles.dot} data-tone={tp.channel} />
                <div className={styles.timelineMeta}>
                  <span className={styles.timelineKicker}>
                    {CHANNEL_LABEL[tp.channel]}
                  </span>
                  <span className={styles.timelineLabel}>{tp.name}</span>
                  <div className={styles.chipRow}>
                    <Chip label={`Delay · ${tp.delayLabel}`} tone="amber" />
                    {tp.branchCondition ? (
                      <Chip
                        label={`If · ${tp.branchCondition}`}
                        tone="teal"
                      />
                    ) : null}
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.editButton}
                  aria-label={`Edit ${tp.name}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(tp.id)}
                >
                  <Pencil size={12} strokeWidth={2.4} aria-hidden="true" />
                  Edit
                </button>
              </li>
            )
          })}
        </ol>

        <div className={styles.canvasWrap}>
          <WorkflowCanvas
            ariaLabel="Drip sequence visual flow"
            zoomLabel="100%"
            height={Math.max(360, totalSlots * 90)}
          >
            <NodeTrigger
              name={meta.triggerLabel}
              source={meta.triggerSource}
              x={50}
              y={6}
              live
            />
            {touchpoints.map((tp, idx) => {
              const y = 6 + (idx + 1) * slotStep
              if (tp.delayLabel) {
                return (
                  <NodeWait
                    key={tp.id}
                    duration={`${tp.name} · ${tp.delayLabel}`}
                    schedule={tp.branchCondition}
                    x={50}
                    y={y}
                  />
                )
              }
              return (
                <NodeAction
                  key={tp.id}
                  name={tp.name}
                  service={CHANNEL_LABEL[tp.channel]}
                  x={50}
                  y={y}
                />
              )
            })}
          </WorkflowCanvas>
        </div>
      </div>
    </section>
  )
}

export default DripSequenceEditor
