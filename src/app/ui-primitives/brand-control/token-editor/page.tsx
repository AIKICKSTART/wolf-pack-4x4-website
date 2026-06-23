import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_TOKEN_HISTORY,
  MOCK_TOKENS,
  TokenEditor,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Token editor | Brand control",
}

const COLOR_TOKENS = MOCK_TOKENS.filter((t) => t.category === "color")
const RADIUS_TOKENS = MOCK_TOKENS.filter((t) => t.category === "radius" || t.category === "spacing")
const FONT_TOKENS = MOCK_TOKENS.filter((t) => t.category === "font" || t.category === "shadow")

export default function TokenEditorRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 01"
          title="Token editor"
          description="Grid of design tokens with a live preview surface and an edit-history rail. Selecting a token highlights every consumer downstream."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Token editor" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            Default colour palette, then a tighter spacing/radius slice, and a typography surface with history. Each grid is the same component, configured differently.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Default colour palette">
          <span className={styles.stateLabel}>State 01 · Colour</span>
          <TokenEditor
            tokens={COLOR_TOKENS}
            history={MOCK_TOKEN_HISTORY}
            defaultSelectedId="amber"
            caption="Mia just tightened amber by 12% lightness."
          />
        </section>

        <section className={styles.stateWrap} aria-label="Spacing + radius">
          <span className={styles.stateLabel}>State 02 · Spacing + radius</span>
          <TokenEditor
            tokens={RADIUS_TOKENS}
            defaultSelectedId="radius-md"
          />
        </section>

        <section className={styles.stateWrap} aria-label="Fonts + shadows">
          <span className={styles.stateLabel}>State 03 · Fonts + shadows</span>
          <TokenEditor
            tokens={FONT_TOKENS}
            history={MOCK_TOKEN_HISTORY.slice(0, 2)}
            defaultSelectedId="font-display"
          />
        </section>
      </div>
    </main>
  )
}
