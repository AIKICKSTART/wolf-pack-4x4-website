import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { InlineRenameDemo } from "./inline-rename-demo"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "Inline rename | File Browser",
  description:
    "Primitive 13 — inline editable filename field with validation for forbidden characters.",
}

export default function InlineRenameScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Rename"
        title="Inline rename"
        description="Click to edit, Esc to cancel, Enter to commit. Validates against forbidden filesystem characters and surfaces the error inline. Selects the basename automatically so the extension stays intact while typing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Inline rename" },
        ]}
      />
      <InlineRenameDemo />
    </main>
  )
}
