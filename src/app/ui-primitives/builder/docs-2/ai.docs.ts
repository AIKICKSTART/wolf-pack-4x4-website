/**
 * Component documentation manifest — `ai` family.
 *
 * Conversational AI surface primitives: a scrolling chat thread, user/assistant
 * bubbles, streaming + tool-call affordances, a prompt composer, model picker,
 * citations, feedback, and a conversation rail. Sourced READ-ONLY from
 * `src/app/ui-primitives/components/ai`.
 *
 * Entries live in `ai.entries-a.ts` / `ai.entries-b.ts` (split for the 800-line
 * cap); this file composes them into the family manifest. Every design value is
 * referenced as a central `--primitive-*` token name.
 */

import { AI_ENTRIES_A } from "./ai.entries-a"
import { AI_ENTRIES_B } from "./ai.entries-b"
import type { ComponentDocEntry, ComponentDocFamily } from "./types"

const entries: readonly ComponentDocEntry[] = [...AI_ENTRIES_A, ...AI_ENTRIES_B]

const aiDocs: ComponentDocFamily = {
  family: "ai",
  title: "AI conversation",
  group: "AI",
  summary:
    "Conversational surface primitives: scrolling thread, user/assistant bubbles, streaming + tool-call affordances, prompt composer, model picker, citations, feedback, and a conversation rail.",
  importPath: "@/app/ui-primitives/components/ai",
  entries,
}

export default aiDocs
