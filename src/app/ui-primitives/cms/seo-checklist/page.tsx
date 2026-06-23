import type { Metadata } from "next"

import { SeoChecklist } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_SEO_CHECKS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "SEO checklist | CMS",
  description:
    "Primitive 10 — title, meta, OG and schema checklist with pass / warn / fail dots and a completion gauge.",
}

export default function SeoChecklistScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / SEO"
        title="SEO checklist"
        description="Title, meta description, OG image, schema.org / AutomotiveBusiness, alt coverage, internal link counts and canonical URL — each gets a pass / warn / fail dot, descriptive copy and the panel reports a radial completion gauge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "SEO checklist" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · running crawl
          </span>
          <SeoChecklist
            pageTitle="Wollongong suburb landing"
            url="/suburbs/wollongong"
            checks={[]}
            loading
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · 12 checks
          </span>
          <SeoChecklist
            pageTitle="Wollongong suburb landing"
            url="/suburbs/wollongong"
            checks={CMS_SEO_CHECKS}
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · crawl blocked
          </span>
          <SeoChecklist
            pageTitle="Wollongong suburb landing"
            url="/suburbs/wollongong"
            checks={CMS_SEO_CHECKS}
            error="Crawler returned 403 — Cloudflare bot challenge blocking Lighthouse checks."
          />
        </div>
      </section>
    </main>
  )
}
