import type { Metadata } from "next"

import { FileAttachmentBubble } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "File attachment bubble | Inbox primitives",
  description:
    "Primitive 09 — file card inside a message bubble. Typed icon, file name, size, optional upload progress, and a download CTA.",
}

export default function FileAttachmentPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / File attachment"
        title="File attachment bubble"
        description="A file shared in a thread. Reuses the file-type-icon primitive to keep visual hierarchy consistent with the file-browser surface."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "File attachment" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote PDF (other → me)</span>
        <FileAttachmentBubble
          sender="other"
          kind="pdf"
          fileName="hilux-stainless-3in-quote.pdf"
          fileSize="412 KB"
          downloadHref="#"
        />

        <span className={styles.demoLabel}>CAD drawing (me → bay)</span>
        <FileAttachmentBubble
          sender="me"
          kind="cad"
          fileName="hilux-bracket-mod-r4.dwg"
          fileSize="1.7 MB"
          downloadHref="#"
        />

        <span className={styles.demoLabel}>Sheet upload in-progress</span>
        <FileAttachmentBubble
          sender="me"
          kind="sheet"
          fileName="parts-runner-roster.xlsx"
          fileSize="84 KB"
          progress={62}
        />
      </section>
    </main>
  )
}
