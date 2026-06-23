import type { Metadata } from "next"

import { VideoTranscodeRow } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_VIDEO_TRANSCODE_JOBS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Video transcode row | Asset CDN",
  description: "Primitive 02 — Replicate-style video transcode job row with profile, codec, progress, and ETA.",
}

export default function VideoTranscodeRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Video transcode row"
        title="Video transcode row"
        description="A single transcode job, shaped like a Replicate worker entry. Status dot, source path, target profile + codec, progress bar, and status chip with ETA. Five rows below cover every status — queued, encoding, uploading, complete, failed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Video transcode row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · every status</span>
        <div className={styles.demoStack}>
          {DEMO_VIDEO_TRANSCODE_JOBS.map((job) => (
            <VideoTranscodeRow key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  )
}
