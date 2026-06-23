import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { VideoLightboxDemo } from "./video-lightbox-demo"

export const metadata: Metadata = {
  title: "Video lightbox | UI Primitives — Overlays",
}

export default function VideoLightboxPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 09"
        title="Video lightbox"
        description="HTML5 video lightbox with native controls. Reduced-motion users see the poster image instead of autoplaying video. Closes on Esc or backdrop click."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Video lightbox" },
        ]}
      />
      <section className={styles.canvas} aria-label="Video lightbox demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Build-time-lapses, dyno-sheet walkthrough clips, before-and-after exhaust note
            recordings. The poster image stands in for reduced-motion users and slow links.
          </p>
        </div>
        <VideoLightboxDemo />
      </section>
    </main>
  )
}
