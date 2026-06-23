import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ToneOfVoiceCard } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Tone of voice | Branding Lab",
  description:
    "Primitive 07 — voice attributes chips with side-by-side do and don't writing examples.",
}

const ATTRIBUTES = ["Confident", "Honest", "Workshop", "Warm", "Direct"]

const EXAMPLES = [
  {
    do: "Your exhaust system needs three new gaskets. We can fit them on Thursday — no surprises on the bill.",
    dont: "Critical exhaust failure detected. Immediate intervention required to mitigate cascading risk.",
  },
  {
    do: "We'll text you when the car's ready. Pay in the bay, takes a minute.",
    dont: "Our cutting-edge mobile communications platform will notify you upon service completion.",
  },
  {
    do: "Honest answer — that part will outlast the car. Skip the upgrade.",
    dont: "Highly recommended premium replacement option (limited-time offer, save 20%).",
  },
]

export default function ToneOfVoiceCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Voice & tone"
        title="Tone of voice"
        description="The Oak Flats Mufflermen voice — confident, honest, workshop-direct, warm at the counter. Side-by-side examples make the difference unmistakable to anyone writing copy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Tone of voice" },
        ]}
      />
      <ToneOfVoiceCard
        attributes={ATTRIBUTES}
        summary="Mufflermen write the way the front-counter sounds — confident, plain-spoken, never salesy. Service-desk warmth, workshop-floor honesty."
        examples={EXAMPLES}
      />
    </main>
  )
}
