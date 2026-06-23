import type { Metadata } from "next"

import { FormPublishCard } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import {
  PUBLISH_EMBED_SNIPPET,
  PUBLISH_SHARE_LINK,
  PUBLISH_TARGETS,
} from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Form publish card | Forms platform",
  description:
    "Primitive 13 — the publish card with embed snippet, popup, share link, and QR-code targets.",
}

export default function FormPublishCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Form publish card"
        title="Form publish card"
        description="Publish the Book-a-Service form. The inline-embed tab is active — copy-ready script + data-attribute snippet. Popup, share link, and the QR-code variant cover the workshop counter walk-ins."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Form publish card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Book a Service · live
        </span>
        <div className={styles.demoInline}>
          <FormPublishCard
            formName="Book a Service"
            shareLink={PUBLISH_SHARE_LINK}
            embedSnippet={PUBLISH_EMBED_SNIPPET}
            targets={PUBLISH_TARGETS}
            activeTargetId="inline-embed"
            published
          />
        </div>
      </section>
    </main>
  )
}
