import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TypePairingCard } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Type pairing | Branding Lab",
  description:
    "Primitive 06 — display + body pairing card with full sample copy and a rationale paragraph.",
}

const PAIRINGS = [
  {
    pairingName: "Display + Body",
    headingFont: "Anton, Impact, sans-serif",
    bodyFont: "Inter, Arial, sans-serif",
    headingExample: "Built properly. Not pretty — proper.",
    bodyExample:
      "Anton handles the marquee. Inter handles every piece of body copy, telemetry label, and interface chrome. The pairing reads as workshop signage on top, technical manual below.",
    rationale:
      "Anton's industrial single-cut speaks the workshop voice. Inter neutralises everything underneath it so the brand line stays loud without the page feeling shouty.",
  },
  {
    pairingName: "Display + Body (alt)",
    headingFont: '"Big Shoulders Inline Display", Anton, Impact, sans-serif',
    bodyFont: '"Space Grotesk", "Inter", sans-serif',
    headingExample: "Coachline livery, set in motion.",
    bodyExample:
      "Reserved for vehicle livery and event banners. Big Shoulders Inline carries the gradient sweep; Space Grotesk lays the detail down underneath with mechanical clarity.",
    rationale:
      "Use when the brand wants to feel like a panel-shop billboard at speed. The inline coach-line gives the headline its own light, and Space Grotesk reads as engineering documentation.",
  },
]

export default function TypePairingCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Type pairing"
        title="Type pairing"
        description="Display + body card with full sample copy and a short rationale. Two pairings shown — the default workshop voice and the alt livery/event pairing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Type pairing" },
        ]}
      />
      <section
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 18 }}
      >
        {PAIRINGS.map((pairing) => (
          <TypePairingCard key={pairing.pairingName} {...pairing} />
        ))}
      </section>
    </main>
  )
}
