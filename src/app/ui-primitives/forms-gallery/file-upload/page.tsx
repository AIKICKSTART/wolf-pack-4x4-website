import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FileUploadForm } from "../../components/forms-gallery/file-upload-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "File upload form | Forms Gallery",
  description:
    "Pattern 08 — standalone file upload with drag-and-drop zone, per-file progress, validation chips, and total size counter.",
}

export default function FileUploadScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 08 / Upload"
        title="File upload form"
        description="Drag-and-drop zone with per-file progress, type and size validation chips, remove buttons, and a live total size counter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "File upload" },
        ]}
      />
      <FileUploadForm />
    </main>
  )
}
