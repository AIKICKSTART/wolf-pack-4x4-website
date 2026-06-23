import type { Metadata } from "next"

import { ImageAttachmentBubble } from "../../components/inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../inbox.module.css"

export const metadata: Metadata = {
  title: "Image attachment bubble | Inbox primitives",
  description:
    "Primitive 08 — image inside a message bubble with click-to-expand affordance and hover overlay showing file name + size.",
}

export default function ImageAttachmentPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Image attachment"
        title="Image attachment bubble"
        description="Photo attached to a message. Hover reveals the file name and size; the expand button is the click target to open the media lightbox in a real flow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inbox", href: "/ui-primitives/inbox" },
          { label: "Image attachment" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Customer-sent image (placeholder)</span>
        <ImageAttachmentBubble
          sender="other"
          alt="Underside of Mick's Hilux showing the diff drop"
          fileName="hilux-diff-drop.jpg"
          fileSize="2.4 MB"
          caption="Diff drop and the existing factory hangers"
        />

        <span className={styles.demoLabel}>My image (placeholder)</span>
        <ImageAttachmentBubble
          sender="me"
          alt="Stainless mid-pipe on the bench in Bay 2"
          fileName="midpipe-bench-shot.jpg"
          fileSize="1.1 MB"
        />
      </section>
    </main>
  )
}
