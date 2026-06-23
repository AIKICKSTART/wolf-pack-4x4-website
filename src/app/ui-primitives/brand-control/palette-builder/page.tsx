import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_PALETTE,
  PaletteBuilder,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Palette builder | Brand control",
}

const HERITAGE_PALETTE = MOCK_PALETTE.map((swatch) =>
  swatch.id === "red"
    ? { ...swatch, hex: "#7A1F1F", oklch: { l: 0.36, c: 0.13, h: 25 } }
    : swatch.id === "amber"
      ? { ...swatch, hex: "#C08A2E", oklch: { l: 0.66, c: 0.12, h: 70 } }
      : swatch.id === "canvas"
        ? { ...swatch, hex: "#F4ECD8", oklch: { l: 0.94, c: 0.04, h: 88 } }
        : swatch.id === "body"
          ? { ...swatch, hex: "#2A1D12", oklch: { l: 0.21, c: 0.04, h: 60 } }
          : swatch
)

const FAIL_PALETTE = MOCK_PALETTE.map((swatch) =>
  swatch.id === "body"
    ? { ...swatch, hex: "#7A7A7E", oklch: { l: 0.51, c: 0.01, h: 270 } }
    : swatch
)

export default function PaletteBuilderRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 02"
          title="Palette builder"
          description="Pick a foreground × surface pair and read the WCAG verdict instantly. The OKLCH wheel positions every swatch by hue + chroma."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Palette builder" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            Default Mufflermen palette (passing), the Heritage Cream palette (period correct, light surfaces), and a deliberately failing pair to show the fail verdict in red.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Default Mufflermen palette">
          <span className={styles.stateLabel}>State 01 · Mufflermen</span>
          <PaletteBuilder swatches={MOCK_PALETTE} defaultSelectedId="red" defaultBackgroundId="canvas" />
        </section>

        <section className={styles.stateWrap} aria-label="Heritage Cream palette">
          <span className={styles.stateLabel}>State 02 · Heritage Cream</span>
          <PaletteBuilder swatches={HERITAGE_PALETTE} defaultSelectedId="body" defaultBackgroundId="canvas" />
        </section>

        <section className={styles.stateWrap} aria-label="Failing pair">
          <span className={styles.stateLabel}>State 03 · Failing pair</span>
          <PaletteBuilder swatches={FAIL_PALETTE} defaultSelectedId="body" defaultBackgroundId="canvas" />
        </section>
      </div>
    </main>
  )
}
