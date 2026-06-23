import type { Metadata } from "next"

import { FileUploadZone } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { UPLOAD_FILES } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "File upload zone | Forms platform",
  description:
    "Primitive 06 — the drag-drop file uploader with progress bars and the ClamAV virus-scan badge.",
}

export default function FileUploadZoneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / File upload zone"
        title="File upload zone"
        description="Drag-drop upload field for the Warranty Claim form. Files surface upload progress and a ClamAV scan badge — clean, scanning, queued, or threat-detected (the macro-laced .docm in the list catches a real-world infected file)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "File upload zone" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — warranty-claim attachments
        </span>
        <div className={styles.demoInline}>
          <FileUploadZone
            title="Drop photos, rego papers, or video"
            hint="HEIC · PDF · JPG · MP4 · up to 50 MB each"
            active
            files={UPLOAD_FILES}
          />
        </div>
      </section>
    </main>
  )
}
