import type { Metadata } from "next"

import { PublishFlow } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Publish flow | CMS",
  description:
    "Primitive 08 — draft → review → scheduled → published state-machine card.",
}

export default function PublishFlowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Pipeline"
        title="Publish flow"
        description="Draft → review → scheduled → published state-machine card. Surfaces the next action with reviewer initials, schedule time, branch and any open change requests. Each stage uses aria-current=step for assistive tech."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Publish flow" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · review pending
          </span>
          <PublishFlow
            pageTitle="Kiama suburb landing"
            slug="suburbs/kiama"
            state="review"
            reviewer="DF"
            changeRequests={2}
            branch="kiama-launch"
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · scheduled
          </span>
          <PublishFlow
            pageTitle="Albion Park suburb landing"
            slug="suburbs/albion-park"
            state="scheduled"
            reviewer="MP"
            scheduledFor="30 May · 08:00 AEST"
            branch="albion-launch"
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · pipeline halted
          </span>
          <PublishFlow
            pageTitle="Shellharbour suburb landing"
            slug="suburbs/shellharbour"
            state="review"
            reviewer="DF"
            branch="shell-launch"
            error="Pre-publish lint failed — schema.org/AutomotiveBusiness block is missing."
          />
        </div>
      </section>
    </main>
  )
}
