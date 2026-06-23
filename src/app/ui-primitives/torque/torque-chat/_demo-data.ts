/**
 * Demo fixtures for the customer-facing Torque assistant chat surface.
 *
 * Customer-visible identity is "Torque — your Mufflermen business assistant".
 * (Dev note: the back-end console this maps to is internally codenamed elsewhere;
 *  that codename must never surface in customer-visible copy.)
 */

import type { ModelOption, SuggestionChip } from "../../components/ai"

/** Brand assistant name shown to the owner everywhere on this surface. */
export const TORQUE_NAME = "Torque" as const

/** Model picker — Torque runs on the Claude tiers, surfaced as friendly chips. */
export const TORQUE_MODELS: ReadonlyArray<ModelOption> = [
  {
    id: "sonnet",
    name: "Torque Standard",
    tier: "sonnet",
    contextWindow: "200K",
    costPerMillion: "$3",
    description: "Daily driver. Writes your blog, captions, and replies.",
  },
  {
    id: "opus",
    name: "Torque Pro",
    tier: "opus",
    contextWindow: "1M",
    costPerMillion: "$15",
    description: "Deeper reasoning for campaigns and long-form pieces.",
  },
  {
    id: "haiku",
    name: "Torque Quick",
    tier: "haiku",
    contextWindow: "200K",
    costPerMillion: "$0.80",
    description: "Fast first drafts and short social posts.",
  },
]

/** Above-the-composer suggestions the owner can tap to keep going. */
export const TORQUE_SUGGESTIONS: ReadonlyArray<SuggestionChip> = [
  {
    id: "schedule",
    label: "Schedule the posts",
    prompt:
      "Schedule the Facebook and Instagram posts for Thursday 7am and pin the blog to the homepage.",
  },
  {
    id: "shorter",
    label: "Make the caption shorter",
    prompt: "Trim the Instagram caption to two lines plus the hashtags.",
  },
  {
    id: "google",
    label: "Add a Google Business post",
    prompt:
      "Draft a matching Google Business Profile update for Oak Flats locals searching for exhaust work.",
  },
  {
    id: "offer",
    label: "Add a winter check offer",
    prompt:
      "Add a free pre-winter exhaust and undercar check offer to the blog and the posts.",
  },
]

/**
 * The owner's brief that kicked off this thread, restated for the rail preview
 * and the header subtitle so the scene reads like a real continuing chat.
 */
export const TORQUE_CONVERSATION_TITLE =
  "Winter exhaust blog + social posts" as const

/** Tool-call payloads rendered inside Torque's proposal turn. */
export const BRAND_VOICE_TOOL_INPUT = `{
  "business": "Oak Flats Muffler Men",
  "region": "Illawarra, NSW",
  "services": ["custom exhausts", "mufflers", "logbook servicing", "DPF & cat work"],
  "tone": "local, plain-spoken, no hype",
  "channels": ["blog", "facebook", "instagram"]
}`

export const BRAND_VOICE_TOOL_OUTPUT = `{
  "voice": {
    "reading_level": "grade 7",
    "person": "first-person plural (we)",
    "avoid": ["buzzwords", "all-caps shouting", "emoji spam"]
  },
  "approved_phrases": [
    "booked in at Oak Flats",
    "across the Illawarra",
    "we'll show you the old part"
  ]
}`

export const PUBLISH_TOOL_INPUT = `{
  "blog": { "slug": "winter-exhaust-check-oak-flats", "status": "draft" },
  "social": [
    { "platform": "facebook", "scheduled_for": null },
    { "platform": "instagram", "scheduled_for": null }
  ]
}`
