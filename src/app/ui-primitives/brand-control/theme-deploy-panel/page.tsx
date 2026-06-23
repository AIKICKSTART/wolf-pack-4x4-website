import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_DEPLOY,
  ThemeDeployPanel,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Theme deploy panel | Brand control",
}

const DRAFT_DEPLOY = {
  ...MOCK_DEPLOY,
  id: "deploy-draft",
  themeLabel: "Summer 2026 amber-shift",
  stage: "draft" as const,
  status: "queued" as const,
  rolloutPct: 0,
  changedTokenIds: ["amber", "shadow-card", "radius-md"],
  promotedBy: undefined,
}

const LIVE_DEPLOY = {
  ...MOCK_DEPLOY,
  id: "deploy-live",
  themeLabel: "Performance Teal",
  stage: "production" as const,
  status: "live" as const,
  rolloutPct: 100,
}

export default function ThemeDeployPanelRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 09"
          title="Theme deploy panel"
          description="Promote a staged theme through draft → staging → production. Rollout %, change list, and halt control surface together."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Theme deploy panel" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            A queued draft, the current staging rollout at 42%, and a fully-promoted production theme.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Draft deploy">
          <span className={styles.stateLabel}>State 01 · Draft</span>
          <ThemeDeployPanel deployment={DRAFT_DEPLOY} />
        </section>

        <section className={styles.stateWrap} aria-label="Staging rollout">
          <span className={styles.stateLabel}>State 02 · Staging rollout</span>
          <ThemeDeployPanel deployment={MOCK_DEPLOY} />
        </section>

        <section className={styles.stateWrap} aria-label="Production live">
          <span className={styles.stateLabel}>State 03 · Live</span>
          <ThemeDeployPanel deployment={LIVE_DEPLOY} />
        </section>
      </div>
    </main>
  )
}
