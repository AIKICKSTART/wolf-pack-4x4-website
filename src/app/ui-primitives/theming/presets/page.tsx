import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../theming.module.css"
import { PresetsDemo } from "./presets-demo"

export const metadata: Metadata = {
  title: "Theme presets | UI Primitives — Theming",
}

export default function PresetsPage() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.subRouteShell}>
        <PageHeader
          kicker="Theming · 01"
          title="Theme presets"
          description="A grid of named presets. Each preset writes every `--primitive-*` token at once, so the live preview below it re-skins instantly. Active preset is highlighted; cards are keyboard accessible as a radiogroup."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Theming", href: "/ui-primitives/theming" },
            { label: "Presets" },
          ]}
        />
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Quick brand-direction switching during early design exploration. Stakeholders pick a preset, the team
            iterates around it.
          </p>
        </div>
        <PresetsDemo />
      </div>
    </main>
  )
}
