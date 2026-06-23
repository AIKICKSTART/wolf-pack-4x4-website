"use client"

import { useState } from "react"

import { PromptInput } from "../../components/ai"

interface DemoEntry {
  id: number
  text: string
}

export function PromptInputDemo() {
  const [value, setValue] = useState<string>("")
  const [history, setHistory] = useState<ReadonlyArray<DemoEntry>>([])

  const handleSubmit = (next: string) => {
    setHistory((entries) => [{ id: Date.now(), text: next }, ...entries].slice(0, 4))
    setValue("")
  }

  return (
    <div style={{ display: "grid", gap: "var(--primitive-space-3)" }}>
      <PromptInput
        value={value}
        onValueChange={setValue}
        onSubmit={handleSubmit}
        placeholder="Ask about exhaust fitments, EGT thresholds, supplier ETAs…"
      />
      {history.length > 0 && (
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gap: "var(--primitive-space-1-5)",
          }}
          aria-label="Recently sent prompts"
        >
          {history.map((entry) => (
            <li
              key={entry.id}
              style={{
                padding: "var(--primitive-space-2-5) var(--primitive-space-3)",
                border: "1px solid var(--primitive-line)",
                borderRadius: "var(--primitive-radius-md)",
                background: "var(--primitive-glass-soft)",
                color: "var(--primitive-body)",
                fontSize: "var(--primitive-text-sm)",
              }}
            >
              {entry.text}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default PromptInputDemo
