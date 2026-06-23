import { ChevronRight } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type { RepurposeStage } from "./social-scheduler-types"

interface RepurposeFlowProps {
  title?: string
  stages: ReadonlyArray<RepurposeStage>
}

const SURFACE_LABEL: Record<RepurposeStage["surface"], string> = {
  blog: "Blog post",
  thread: "Tweet thread",
  reel: "IG Reel",
  carousel: "Carousel",
  newsletter: "Newsletter",
  shorts: "YT Shorts",
}

const STATE_LABEL: Record<RepurposeStage["state"], string> = {
  queued: "Queued",
  "in-progress": "In progress",
  ready: "Ready",
  scheduled: "Scheduled",
  blocked: "Blocked",
}

export function RepurposeFlow({
  title = "Repurpose pipeline",
  stages,
}: RepurposeFlowProps) {
  return (
    <section
      className={`${styles.frame} ${styles.repurposeFlow}`}
      aria-label={title}
    >
      <header className={styles.repurposeHead}>
        <h2 className={styles.repurposeTitle}>{title}</h2>
        <span className={styles.composerEyebrow}>
          {stages.length} step pipeline
        </span>
      </header>

      <ol
        className={styles.repurposePipeline}
        aria-label="Repurpose pipeline stages"
      >
        {stages.map((stage, index) => (
          <li
            key={stage.id}
            className={styles.repurposeStage}
            data-state={stage.state}
            aria-label={`Step ${index + 1}: ${stage.label}, ${STATE_LABEL[stage.state]}`}
          >
            <span className={styles.repurposeStageMark}>
              Step {index + 1} · {SURFACE_LABEL[stage.surface]}
              {index < stages.length - 1 && (
                <ChevronRight
                  size={11}
                  aria-hidden="true"
                  style={{ marginLeft: 4 }}
                />
              )}
            </span>
            <span className={styles.repurposeStageLabel}>{stage.label}</span>
            {stage.note && <p className={styles.repurposeStageBody}>{stage.note}</p>}
            <span className={styles.repurposeStageMeta}>
              <span>{stage.owner}</span>
              <span>{stage.eta ?? STATE_LABEL[stage.state]}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default RepurposeFlow
