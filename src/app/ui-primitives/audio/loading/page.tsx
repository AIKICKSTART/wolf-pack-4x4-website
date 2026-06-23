import type { Metadata } from "next"

import { AudioLoadingState } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Audio loading state | Audio Primitives",
  description:
    "Primitive 12 — buffering state with animated equalizer bars and accompanying status copy.",
}

export default function LoadingScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Loading"
        title="Audio loading state"
        description="Buffering surface — composed of an animated equalizer (defaults to teal) and a kicker/title/detail copy stack. Marked aria-live polite as a status region for assistive tech."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Loading" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Default tone — teal</span>
        <AudioLoadingState />
        <span className={styles.demoLabel}>Red tone — failing source retry</span>
        <AudioLoadingState
          title="Reconnecting to source…"
          detail="Workshop CDN dropped — falling back to mirror in 2s."
          tone="red"
        />
      </section>
    </main>
  )
}
