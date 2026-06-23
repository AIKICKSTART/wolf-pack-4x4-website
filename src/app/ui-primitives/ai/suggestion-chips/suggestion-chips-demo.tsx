"use client"

import { useState } from "react"

import { PromptInput, SuggestionChips } from "../../components/ai"
import type { SuggestionChip } from "../../components/ai"

const SUGGESTIONS: ReadonlyArray<SuggestionChip> = [
  {
    id: "hilux",
    label: "Hilux 2.8 volume-legal exhaust",
    prompt:
      "Help me pick an exhaust for a Hilux 2.8L diesel that stays under NSW EPA static 90 dB(A).",
  },
  {
    id: "egt",
    label: "EGT thresholds for diesel",
    prompt:
      "What's a safe EGT threshold for a modern 2.8L diesel under towing load?",
  },
  {
    id: "stainless",
    label: "304 vs 409 stainless",
    prompt:
      "Pros and cons of 304 vs 409 stainless for a coastal NSW workshop with salt air.",
  },
  {
    id: "supplier",
    label: "Supplier ETA on Magnaflow",
    prompt:
      "When can I get a Magnaflow mid-pipe in stock for a 2018 Hilux GUN125?",
  },
]

export function SuggestionChipsDemo() {
  const [value, setValue] = useState<string>("")

  return (
    <div style={{ display: "grid", gap: "var(--primitive-space-3)" }}>
      <SuggestionChips chips={SUGGESTIONS} onSelect={(chip) => setValue(chip.prompt)} />
      <PromptInput
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue("")}
        placeholder="Pick a suggestion or type your own…"
      />
    </div>
  )
}

export default SuggestionChipsDemo
