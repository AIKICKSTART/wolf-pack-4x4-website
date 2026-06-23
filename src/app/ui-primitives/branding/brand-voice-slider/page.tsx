import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BrandVoiceSlider, type BrandVoiceAxis } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Brand voice slider | Branding Lab",
  description:
    "Primitive 11 — three calibration sliders for the brand voice axes (formality, seriousness, restraint).",
}

const AXES: ReadonlyArray<BrandVoiceAxis> = [
  {
    id: "formality",
    leftLabel: "Formal",
    rightLabel: "Casual",
    defaultValue: 72,
    helper: "We lean casual — close to a workshop counter. Stay short of mateship clichés.",
  },
  {
    id: "tone",
    leftLabel: "Serious",
    rightLabel: "Playful",
    defaultValue: 34,
    helper: "We are mostly serious. Playful moments are reserved for staff comms and social.",
  },
  {
    id: "restraint",
    leftLabel: "Restrained",
    rightLabel: "Bold",
    defaultValue: 68,
    helper: "Lean bold in marketing surfaces. Default restrained for technical docs and invoices.",
  },
]

export default function BrandVoiceSliderPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Voice axes"
        title="Brand voice slider"
        description="Three sliders calibrate the brand voice for any surface. Drag each axis to where the brand should sit, then carry the position into copy briefs and AI prompts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Voice axes" },
        ]}
      />
      <BrandVoiceSlider axes={AXES} />
    </main>
  )
}
