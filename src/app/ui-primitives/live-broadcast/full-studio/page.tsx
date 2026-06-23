import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../live-broadcast.module.css"
import { FullStudioDemo } from "./full-studio-demo"

export const metadata: Metadata = {
  title: "Full live studio | Live broadcast",
  description:
    "Composition — all live broadcast primitives composed into one Mufflermen broadcast studio: player, chat, reactions, polls, Q&A, viewer rail, backstage, raid, clip, tiers.",
}

export default function FullStudioPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full live studio"
        title="Full live studio"
        description="All live broadcast primitives composed into the running Mufflermen workshop studio for Dyno Tuesday — Falcon GT-HO live with the Manta supplier raid coming in 8 minutes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Full studio" },
        ]}
      />

      <FullStudioDemo />
    </main>
  )
}
