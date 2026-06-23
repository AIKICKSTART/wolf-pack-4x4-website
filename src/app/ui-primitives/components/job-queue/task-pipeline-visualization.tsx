import { WorkflowCanvas } from "../workflows/workflow-canvas"
import { Chip } from "../primitives/chip"

import { STATUS_TONE, type JobStatus } from "./job-queue-types"
import styles from "./task-pipeline-visualization.module.css"

export interface PipelineNode {
  id: string
  label: string
  status: JobStatus
  /** Wall-clock duration of this step in ms. */
  durationMs?: number
}

interface TaskPipelineVisualizationProps {
  /** Pipeline name (e.g. "invoice-generate-pdf"). */
  pipeline: string
  /** Steps in execution order. */
  nodes: ReadonlyArray<PipelineNode>
  className?: string
}

const STATUS_LABEL: Record<JobStatus, string> = {
  queued: "Queued",
  running: "Running",
  done: "Done",
  failed: "Failed",
  retrying: "Retrying",
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

export function TaskPipelineVisualization({
  pipeline,
  nodes,
  className,
}: TaskPipelineVisualizationProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Pipeline visualization: ${pipeline}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Pipeline</span>
        <h3 className={styles.title}>{pipeline}</h3>
      </header>
      <WorkflowCanvas
        ariaLabel={`${pipeline} pipeline canvas`}
        zoom={1}
        height={260}
        zoomLabel={`${nodes.length} steps`}
      >
        <ol className={styles.flow}>
          {nodes.map((node, index) => (
            <li
              key={node.id}
              className={styles.step}
              data-status={node.status}
              aria-current={node.status === "running" ? "step" : undefined}
            >
              <span className={styles.stepIndex}>{`${(index + 1).toString().padStart(2, "0")}`}</span>
              <div className={styles.stepBody}>
                <span className={styles.stepLabel}>{node.label}</span>
                <div className={styles.stepMeta}>
                  <Chip label={STATUS_LABEL[node.status]} tone={STATUS_TONE[node.status]} />
                  {typeof node.durationMs === "number" && (
                    <span className={styles.stepDuration}>{formatMs(node.durationMs)}</span>
                  )}
                </div>
              </div>
              {index < nodes.length - 1 && (
                <span className={styles.stepConnector} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </WorkflowCanvas>
    </section>
  )
}

export default TaskPipelineVisualization
