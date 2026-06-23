import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ComposerConsole } from "./_composer-console"
import styles from "./social-composer.module.css"

export const metadata: Metadata = {
  title: "Social post composer | Torque",
  description:
    "Torque drafts a brand-safe Oak Flats Muffler Men exhaust-promo post, previews it across Instagram, Facebook and TikTok, and parks it for one-tap owner approval before it goes live.",
}

export default function TorqueSocialComposerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Marketing surface"
        title="Social post composer"
        description="Torque is the Oak Flats Muffler Men business assistant. Here it has drafted a winter cat-back special and laid it out exactly as it will land on Instagram, Facebook and TikTok. You get a brand-safe caption editor, the generated media tray, and the schedule plus approval controls — review the previews, tweak the wording, and approve the post in one tap. Nothing publishes to a live channel without your sign-off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque/approval-gate" },
          { label: "Social composer" },
        ]}
      />

      <section className={styles.demoSurface} aria-label="Social post composer console">
        <span className={styles.demoLabel}>
          Composition · Torque marketing surface · 1 promo across 3 channels
        </span>
        <ComposerConsole />
      </section>
    </main>
  )
}
