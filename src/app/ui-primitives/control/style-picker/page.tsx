import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StylePicker } from "./style-picker"
import page from "./page.module.css"

export const metadata: Metadata = {
  title: "Style picker | Control",
  description:
    "Five style profiles linked to the global theming presets — Carbon Pro, Glass Garage, Neo Workshop, Motorsport, Clean Light — selectable in an accessible radiogroup.",
}

export default function StylePickerScenePage() {
  return (
    <main className={page.main}>
      <PageHeader
        kicker="01 / Shared DNA / Theming"
        title="Style picker"
        description="Choose a style profile and the whole UI primitive shell receives the linked theme preset plus the profile material overlay. Theming owns the base palette; the style picker owns the atomic surface, action, field, focus, radius, shadow, and motion treatment."
        dnaSectionId="theming"
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Theming", href: "/ui-primitives/theming" },
          { label: "Style picker" },
        ]}
      />

      <section className={page.surface}>
        <span className={page.label}>Live primitive — five profiles, one preview</span>
        <StylePicker />
      </section>
    </main>
  )
}
