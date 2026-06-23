import type { Metadata } from "next"

import { TemplateGallery } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_TEMPLATES } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Template gallery | CMS",
  description:
    "Primitive 06 — page-template thumbnails grouped by landing, parts, suburb, service and blog categories.",
}

export default function TemplateGalleryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Templates"
        title="Template gallery"
        description="Mufflermen page-template thumbnails. Editors can filter by landing, parts detail, suburb landing, service page or blog post categories. Each tile reports the embedded block count and a one-line intent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Template gallery" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · fetching templates
          </span>
          <TemplateGallery templates={CMS_TEMPLATES} loading />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · suburb template selected
          </span>
          <TemplateGallery
            templates={CMS_TEMPLATES}
            selectedId="tpl-suburb-illawarra"
            defaultCategory="suburb"
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · registry offline
          </span>
          <TemplateGallery
            templates={CMS_TEMPLATES}
            error="Template registry unreachable — Vercel Edge cache failed to hydrate."
          />
        </div>
      </section>
    </main>
  )
}
