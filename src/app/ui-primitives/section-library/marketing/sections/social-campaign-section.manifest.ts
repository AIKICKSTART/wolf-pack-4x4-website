import type { BlockManifest } from "../../../builder/model/manifest"
import type { PropSchemaField } from "../../../builder/model/schema"

import {
  CONTENT_SECTION_TOKENS,
  STACK_RESPONSIVE_RULES,
} from "../manifest-shared"

const COMPONENT_PATH =
  "@/app/ui-primitives/section-library/marketing/sections/social-campaign-section"

const CHANNEL_SCHEMA: PropSchemaField = {
  key: "channel",
  type: "object",
  required: true,
  fields: [
    { key: "id", type: "string", required: true },
    { key: "name", type: "string", required: true },
    { key: "handle", type: "string", required: true },
    { key: "audience", type: "string", required: true },
    { key: "href", type: "url", required: true },
    { key: "icon", type: "icon", required: true },
  ],
}

/** BlockManifest for the social campaign section. */
export const socialCampaignSectionManifest: BlockManifest = {
  type: "marketing-section/social-campaign",
  name: "Social campaign",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary:
    "Linked social channel rail, the campaign flow via ProcessSteps, and a NewsletterCta capture in one section.",
  componentPath: COMPONENT_PATH,
  importName: "SocialCampaignSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: true },
      { key: "heading", type: "string", required: true },
      { key: "body", type: "string", required: true },
      { key: "channels", type: "array", required: true, items: CHANNEL_SCHEMA },
      { key: "steps", type: "array", required: true },
      { key: "captureHeading", type: "string", required: true },
      { key: "captureBody", type: "string", required: false },
    ],
  },
  defaultProps: {
    kicker: "Follow the build",
    heading: "Catch every cut, weld & dyno run",
    body: "We post every notable job — before/after, weld macros, dyno pulls. Follow along or get the weekly drop in your inbox.",
    channels: [
      { id: "ig", name: "Instagram", handle: "@oakflatsmufflermen", audience: "18.4k", href: "https://instagram.com", icon: "instagram" },
      { id: "fb", name: "Facebook", handle: "/oakflatsmufflermen", audience: "9.1k", href: "https://facebook.com", icon: "review" },
      { id: "yt", name: "YouTube", handle: "Mufflermen Garage", audience: "6.7k", href: "https://youtube.com", icon: "volume" },
    ],
    steps: [
      { id: "1", icon: "calendar", title: "We book the job", body: "Pick a bay; we confirm the system and the slot." },
      { id: "2", icon: "wrench", title: "We film the fit-up", body: "Cut, bend, weld, fit — captured on the hoist." },
      { id: "3", icon: "gauge", title: "We post the dyno", body: "Before/after numbers and the sound clip go live." },
    ],
    captureHeading: "Get the weekly workshop drop",
    captureBody: "One email a week — featured builds, sound clips, and member-only fit-up offers.",
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string" },
    { path: "heading", label: "Heading", control: "text", valueType: "string" },
    { path: "body", label: "Intro copy", control: "textarea", valueType: "string" },
    {
      path: "channels",
      label: "Social channels",
      control: "repeater",
      valueType: "array",
      hint: "Each channel shows an icon, name, handle, audience count, and link.",
    },
    { path: "channels[].name", label: "Channel name", control: "text", valueType: "string" },
    { path: "channels[].handle", label: "Handle", control: "text", valueType: "string" },
    { path: "channels[].audience", label: "Audience", control: "text", valueType: "string" },
    { path: "channels[].href", label: "Channel link", control: "url", valueType: "url" },
    { path: "steps", label: "Campaign flow", control: "repeater", valueType: "array" },
    { path: "captureHeading", label: "Newsletter heading", control: "text", valueType: "string" },
    { path: "captureBody", label: "Newsletter body", control: "textarea", valueType: "string", optional: true },
  ],
  tokenDependencies: CONTENT_SECTION_TOKENS,
  iconDependencies: [
    { name: "instagram", importPath: "lucide-react", usage: "social channel marks" },
    { name: "calendar-clock", importPath: "lucide-react", usage: "campaign flow step icons" },
  ],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: STACK_RESPONSIVE_RULES,
  accessibilityRules: {
    role: "region",
    requiresLabel: true,
    keyboardOperable: true,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel: 2,
    notes: [
      "Channels are a labelled list of links with visible focus.",
      "NewsletterCta form has a labelled email field and status messaging.",
    ],
  },
  seoRules: {
    contributesHeading: true,
    indexable: true,
  },
  conversionGoal: {
    id: "follow-subscribe",
    label: "Follow a channel or subscribe",
    action: "submit",
    eventName: "social_subscribe",
    emphasisToken: "--primitive-red",
  },
  previewConfig: {
    sampleProps: {
      kicker: "Follow the build",
      heading: "Catch every cut, weld & dyno run",
      body: "We post every notable job.",
      channels: [],
      steps: [],
      captureHeading: "Get the weekly workshop drop",
    },
    aspectRatio: "16/9",
    background: "canvas",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    caption: "Drive follows and email subscribes from one section.",
    code: `import { SocialCampaignSection } from "@/app/ui-primitives/section-library/marketing/sections/social-campaign-section"

export function SocialBlock() {
  return (
    <SocialCampaignSection
      kicker="Follow the build"
      heading="Catch every cut, weld & dyno run"
      body="We post every notable job."
      channels={[
        { id: "ig", name: "Instagram", handle: "@oakflatsmufflermen", audience: "18.4k", href: "https://instagram.com", icon: "instagram" },
      ]}
      steps={[
        { id: "1", icon: "calendar", title: "We book the job", body: "Pick a bay." },
      ]}
      captureHeading="Get the weekly workshop drop"
      onSubscribe={async (email) => { await subscribe(email) }}
    />
  )
}`,
  },
  setupInstructions: {
    steps: [
      "Import SocialCampaignSection (client component — the capture form holds state).",
      "Provide a channels array (icon names come from the shared section icon set).",
      "Provide a steps array for the campaign flow.",
      "Wire onSubscribe to persist the email; set captureHeading/captureBody.",
    ],
    notes: [
      "Composes ProcessSteps and NewsletterCta from the marketing family.",
      "Step icon names use the shared section icon vocabulary.",
    ],
  },
  tags: ["social", "campaign", "newsletter", "follow", "marketing"],
}

export default socialCampaignSectionManifest
