import { Layers } from "lucide-react"

import {
  EMBEDDING_LABEL,
  workflowScoreTone,
  type WorkflowEmbeddingModel,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./vector-search-block.module.css"

export interface VectorSearchHit {
  id: string
  title: string
  /** Short snippet preview from the chunk. */
  snippet: string
  /** Cosine similarity 0..1. */
  similarity: number
  /** Optional re-rank score 0..1, used when rerank is enabled. */
  rerankScore?: number
  /** Optional source label, e.g. "fitment-guide". */
  source?: string
}

interface VectorSearchBlockProps {
  title: string
  /** Embedding model identifier. */
  embeddingModel: WorkflowEmbeddingModel
  /** Vector index handle. */
  indexName: string
  /** Top-K. */
  topK: number
  /** Whether reranking is enabled. */
  rerankEnabled: boolean
  /** Reranker model label, when enabled. */
  rerankModel?: string
  /** Hits returned by the search. */
  hits: ReadonlyArray<VectorSearchHit>
  /** Kicker label. */
  kicker?: string
  className?: string
}

const TONE_VAR: Record<WorkflowTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-teal)",
}

function similarityTone(value: number): WorkflowTone {
  return workflowScoreTone(value * 100)
}

export function VectorSearchBlock({
  title,
  embeddingModel,
  indexName,
  topK,
  rerankEnabled,
  rerankModel,
  hits,
  kicker = "Vector search · RAG",
  className,
}: VectorSearchBlockProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={`Vector search · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Layers size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.topK}>top {topK}</span>
      </header>

      <div className={styles.config} aria-label="Vector configuration">
        <div className={styles.configRow}>
          <span className={styles.configLabel}>Embedding</span>
          <code className={styles.configValue}>{EMBEDDING_LABEL[embeddingModel]}</code>
        </div>
        <div className={styles.configRow}>
          <span className={styles.configLabel}>Index</span>
          <code className={styles.configValue}>{indexName}</code>
        </div>
        <div className={styles.configRow}>
          <span className={styles.configLabel}>Rerank</span>
          <span
            className={styles.configValue}
            data-on={rerankEnabled ? "true" : "false"}
          >
            {rerankEnabled
              ? `On · ${rerankModel ?? "cohere-rerank"}`
              : "Off"}
          </span>
        </div>
      </div>

      <ol className={styles.hits} aria-label="Top-K hits">
        {hits.slice(0, topK).map((hit, idx) => {
          const tone = similarityTone(hit.similarity)
          return (
            <li
              key={hit.id}
              className={styles.hit}
              style={{ "--hit-tone": TONE_VAR[tone] } as Record<string, string>}
            >
              <span className={styles.hitRank}>
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <div className={styles.hitBody}>
                <header className={styles.hitHead}>
                  <h5 className={styles.hitTitle}>{hit.title}</h5>
                  {hit.source ? (
                    <code className={styles.hitSource}>{hit.source}</code>
                  ) : null}
                </header>
                <p className={styles.hitSnippet}>{hit.snippet}</p>
              </div>
              <div className={styles.hitScores}>
                <span className={styles.scoreBlock}>
                  <span className={styles.scoreLabel}>sim</span>
                  <span className={styles.scoreValue}>
                    {(hit.similarity * 100).toFixed(0)}
                  </span>
                </span>
                {rerankEnabled && hit.rerankScore !== undefined ? (
                  <span className={styles.scoreBlock} data-rerank="true">
                    <span className={styles.scoreLabel}>rerank</span>
                    <span className={styles.scoreValue}>
                      {(hit.rerankScore * 100).toFixed(0)}
                    </span>
                  </span>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default VectorSearchBlock
