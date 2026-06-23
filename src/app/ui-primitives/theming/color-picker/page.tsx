import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../theming.module.css"
import { ColorPickerDemo } from "./color-picker-demo"

export const metadata: Metadata = {
  title: "Token colour picker | UI Primitives — Theming",
}

export default function ColorPickerPage() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.subRouteShell}>
        <PageHeader
          kicker="Theming · 03"
          title="Token colour picker"
          description="One picker per controllable colour token. Native colour input for hex tones, paired with a free-text field that accepts any CSS colour — hex, rgb(a), hsl, oklch, named values."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Theming", href: "/ui-primitives/theming" },
            { label: "Colour picker" },
          ]}
        />
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Drop in to a designer review and tune the brand red live. The text input keeps non-hex CSS values
            (rgba, oklch) intact so authors are not forced into hex.
          </p>
        </div>
        <ColorPickerDemo />
      </div>
    </main>
  )
}
