"use client"

import { useState } from "react"

import { ModelSelector } from "../../components/ai"
import type { ModelOption } from "../../components/ai"

const MODELS: ReadonlyArray<ModelOption> = [
  {
    id: "claude-opus",
    name: "Claude Opus 4.7",
    tier: "opus",
    contextWindow: "1M",
    costPerMillion: "$15",
    description: "Deepest reasoning. Best for architectural calls and gnarly diagnostics.",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4.6",
    tier: "sonnet",
    contextWindow: "200K",
    costPerMillion: "$3",
    description: "Daily-driver assistant. Sharp on parts lookups, fitments, and copy.",
  },
  {
    id: "claude-haiku",
    name: "Claude Haiku 4.5",
    tier: "haiku",
    contextWindow: "200K",
    costPerMillion: "$0.80",
    description: "Lightweight + fast. Great for slash-command tools and inline drafts.",
  },
  {
    id: "claude-mini",
    name: "Claude Mini 3.5",
    tier: "mini",
    contextWindow: "32K",
    costPerMillion: "$0.10",
    description: "Cheapest tier — short replies, FAQ scaffolds, suggestion chips.",
  },
]

export function ModelSelectorDemo() {
  const [selectedId, setSelectedId] = useState<string>("claude-sonnet")

  return <ModelSelector models={MODELS} selectedId={selectedId} onSelect={setSelectedId} />
}

export default ModelSelectorDemo
