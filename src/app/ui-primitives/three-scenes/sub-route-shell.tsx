import type { ReactNode } from "react"

import { PageHeader } from "../components/page-header"
import { Chip } from "../components/primitives/chip"
import { Kbd } from "../components/primitives/kbd"
import { ProgressLinear } from "../components/primitives/progress-linear"
import { ProgressRadial } from "../components/primitives/progress-radial"
import { StatTile } from "../components/primitives/stat-tile"
import { SceneIsland, type SceneName } from "./scene-island"
import styles from "./sub-route.module.css"

export interface SubRouteShellProps {
  scene: SceneName
  index: string
  title: string
  description: string
  body: string
  controls: ReadonlyArray<{ label: string; binding: string }>
  reducedMotionNote: string
  crumbLabel: string
  children?: ReactNode
}

export function SubRouteShell({
  scene,
  index,
  title,
  description,
  body,
  controls,
  reducedMotionNote,
  crumbLabel,
  children,
}: SubRouteShellProps) {
  const controlCount = controls.length

  return (
    <main className={styles.page}>
      <PageHeader
        kicker={`3D.${index} / Scene`}
        title={title}
        description={description}
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "3D scenes", href: "/ui-primitives/three-scenes" },
          { label: crumbLabel },
        ]}
      />

      <section className={styles.shell} aria-label={`${title} scene workbench`}>
        <div className={styles.statusRail} aria-label="Scene status">
          <Chip label="Client-only island" tone="teal" selected />
          <Chip label={`${controlCount} controls`} tone="green" selected />
          <Chip label="Reduced-motion state" tone="amber" selected />
          <Chip label="Poster fallback" tone="neutral" selected />
        </div>

        <div className={styles.sceneLayout}>
          <section className={styles.sceneStage} aria-label={`${title} WebGL canvas`}>
            <div className={styles.sceneSlot}>
              <SceneIsland scene={scene} />
            </div>
          </section>

          <aside className={styles.infoRail} aria-label="Scene metadata">
            <section className={styles.aboutPanel} aria-label="Scene contract">
              <header className={styles.panelHead}>
                <span className={styles.panelKicker}>Scene contract</span>
                <h2 className={styles.panelTitle}>{title}</h2>
                <p>{body}</p>
              </header>
              <ProgressLinear
                value={100}
                tone="green"
                variant="segmented"
                segments={8}
                label="Shell readiness"
                showLabel
              />
            </section>

            <section className={styles.controlsPanel} aria-label="Scene controls">
              <header className={styles.panelHeadCompact}>
                <span className={styles.panelKicker}>Controls</span>
                <h3>Input bindings</h3>
              </header>
              <div className={styles.controlsRow}>
                {controls.map((control) => (
                  <div key={control.label} className={styles.controlItem}>
                    <Kbd size="sm">{control.binding}</Kbd>
                    <span>{control.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.metricsPanel} aria-label="Scene metrics">
              <StatTile
                label="Scene"
                value={index}
                tone="teal"
                caption={crumbLabel}
              />
              <StatTile
                label="Controls"
                value={String(controlCount)}
                tone="amber"
                caption="Bindings surfaced by the shell"
              />
            </section>

            <section className={styles.motionPanel} aria-label="Reduced motion contract">
              <ProgressRadial
                value={100}
                size="md"
                tone="amber"
                showLabel
                label="Reduced motion coverage"
              />
              <div>
                <span className={styles.panelKicker}>Reduced motion</span>
                <p>{reducedMotionNote}</p>
              </div>
            </section>
          </aside>
        </div>

        {children ? (
          <div className={styles.routeAppendix}>
            {children}
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default SubRouteShell
