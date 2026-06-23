import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VectorSearchBlock } from "../../components/ai-workflow"

import { QUOTE_VECTOR_HITS } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Vector search block | AI workflow",
  description:
    "Primitive 09 — RAG vector search block with embedding model, index handle, top-K and reranking.",
}

export default function VectorSearchBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / RAG"
        title="Vector search block"
        description="Retrieve grounding context from a vector index. Configure the embedding model, the index handle, the top-K and whether to rerank. Hits show similarity and rerank scores side by side."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Vector search block" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · top 4 · rerank on · Hilux N80 fitment lookup
        </span>
        <VectorSearchBlock
          title="Parts catalogue · fitment lookup"
          embeddingModel="text-embedding-3-large"
          indexName="parts-catalogue-2026"
          topK={4}
          rerankEnabled
          rerankModel="cohere-rerank-3"
          hits={QUOTE_VECTOR_HITS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · top 6 · rerank off · cheaper retrieval
        </span>
        <VectorSearchBlock
          title="Workshop knowledge base"
          embeddingModel="text-embedding-3-small"
          indexName="workshop-kb-v2"
          topK={6}
          rerankEnabled={false}
          hits={QUOTE_VECTOR_HITS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · self-hosted embeddings · sovereign data
        </span>
        <VectorSearchBlock
          title="Customer transcripts · on-prem"
          embeddingModel="nomic-embed-v1"
          indexName="transcripts-onprem-mar26"
          topK={3}
          rerankEnabled
          rerankModel="bge-reranker-v2"
          hits={QUOTE_VECTOR_HITS.slice(0, 3)}
        />
      </section>
    </main>
  )
}
