import type { Metadata } from "next"

import { ResponsiveToolbar } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Responsive toolbar | CMS",
  description:
    "Primitive 07 — desktop, tablet and mobile preview switcher with a viewport ruler.",
}

export default function ResponsiveToolbarScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Responsive"
        title="Responsive toolbar"
        description="Desktop / tablet / mobile preview switcher with a viewport ruler and an animated frame that resizes between presets. Buttons use aria-pressed for tab semantics and respect prefers-reduced-motion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Responsive toolbar" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · default desktop
          </span>
          <ResponsiveToolbar />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · tablet active
          </span>
          <ResponsiveToolbar defaultViewport="tablet" />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · preview iframe sandbox
          </span>
          <ResponsiveToolbar
            defaultViewport="mobile"
            error="Preview iframe sandboxed by Vercel rewriter — restart the dev server."
          />
        </div>
      </section>
    </main>
  )
}
