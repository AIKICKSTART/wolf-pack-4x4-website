import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ToolBlock } from "../../components/ai-workflow"

import { QUOTE_TOOL_MAPPINGS, QUOTE_TOOL_SCHEMA } from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Tool block | AI workflow",
  description:
    "Primitive 04 — tool-call block with schema preview and result-to-scope mapping.",
}

const PARTS_SEARCH_SCHEMA = `{
  "name": "parts.search",
  "description": "Search the supplier catalogue.",
  "input_schema": {
    "type": "object",
    "properties": {
      "vehicle": { "type": "string" },
      "category": {
        "type": "string",
        "enum": ["cat-back", "mid-pipe", "muffler", "dump-pipe", "dpf"]
      },
      "stockOnly": { "type": "boolean", "default": true }
    },
    "required": ["vehicle"]
  }
}`

const BOOKING_FIND_SCHEMA = `{
  "name": "booking.find",
  "description": "Find available bay slots.",
  "input_schema": {
    "type": "object",
    "properties": {
      "bay":      { "type": "string", "enum": ["bay-1", "bay-2", "bay-3"] },
      "from":     { "type": "string", "format": "date-time" },
      "to":       { "type": "string", "format": "date-time" },
      "duration": { "type": "number", "minimum": 0.5 }
    },
    "required": ["from", "to"]
  }
}`

export default function ToolBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Tool"
        title="Tool block"
        description="A workflow node that invokes a tool. The schema panel previews the input shape, the mapping list pipes outputs back into the workflow scope, and retry/timeout policy chips sit at the bottom. quote.create, parts.search and booking.find on display."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Tool block" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · quote.create · primary CRM write
        </span>
        <ToolBlock
          toolName="quote.create"
          schemaPreview={QUOTE_TOOL_SCHEMA}
          mappings={QUOTE_TOOL_MAPPINGS}
          retryPolicy="exponential · max 3"
          timeoutMs={4000}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · parts.search · supplier catalogue
        </span>
        <ToolBlock
          toolName="parts.search"
          schemaPreview={PARTS_SEARCH_SCHEMA}
          mappings={[
            { from: "result.items[].sku", to: "parts.skuList", tone: "teal" },
            { from: "result.items[].leadTimeBusinessDays", to: "parts.leadTime", tone: "amber" },
          ]}
          retryPolicy="linear · max 2"
          timeoutMs={1800}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · booking.find · no retry · short timeout
        </span>
        <ToolBlock
          toolName="booking.find"
          title="Booking · find next slot"
          schemaPreview={BOOKING_FIND_SCHEMA}
          mappings={[
            { from: "result.slots[0]", to: "slot.first", tone: "green" },
            { from: "result.slots[0].bay", to: "slot.bay", tone: "teal" },
          ]}
        />
      </section>
    </main>
  )
}
