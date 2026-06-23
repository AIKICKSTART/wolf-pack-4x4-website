import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import styles from "../ui-primitives.module.css"
import local from "../foundation-dna.module.css"

export const metadata: Metadata = {
  title: "Wireframes | UI Primitives",
}

const skeletons = [
  {
    id: "page",
    title: "Page shell",
    summary: "Sidebar, route header, content rail, proof rail, and footer rhythm.",
    frame: local.wirePage,
    parts: ["nav", "header", "content", "proof", "footer"],
  },
  {
    id: "section",
    title: "Section band",
    summary: "Kicker/header, body slots, repeated items, and action row.",
    frame: local.wireSection,
    parts: ["header", "item", "item", "item"],
  },
  {
    id: "card",
    title: "Card anatomy",
    summary: "Header, media or metric body, state slot, and one command zone.",
    frame: local.wireCard,
    parts: ["header", "body", "footer"],
  },
  {
    id: "control",
    title: "Control row",
    summary: "Label, value/control, helper state, and right-aligned action.",
    frame: local.wireControl,
    parts: ["control", "control", "control"],
  },
  {
    id: "table",
    title: "Data table",
    summary: "Header row, body rows, density, overflow, and empty/fault state.",
    frame: local.wireTable,
    parts: ["head", "row", "row", "row", "row"],
  },
  {
    id: "overlay",
    title: "Overlay focus",
    summary: "Modal/sheet/lightbox frame with title, body, actions, and focus return.",
    frame: local.wireOverlay,
    parts: ["dialog"],
  },
  {
    id: "mobile",
    title: "Mobile stack",
    summary: "Top bar, content stack, bottom nav or action sheet, and thumb reach.",
    frame: local.wireMobile,
    parts: ["top", "body", "dock"],
  },
] as const

const wireframeRules = [
  ["Header first", "Every composition starts with route, section, or card identity before controls."],
  ["One action zone", "Cards and sections expose one primary command area plus optional secondary text action."],
  ["Evidence slot", "Operational components reserve space for status, proof, or owner context."],
  ["Responsive skeleton", "Desktop, tablet, and mobile shapes are declared before downstream styling."],
] as const

export default function WireframesPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Wireframes and anatomy"
        description="The primitive skeleton layer: page, section, card, control, table, overlay, and mobile wireframes that every visual primitive must inherit before styling."
        dnaSectionId="wireframes"
      />

      <div className={local.board}>
        <section className={local.section} aria-labelledby="wireframe-skeletons">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Skeleton contracts</span>
            <h2 id="wireframe-skeletons">Reusable anatomy before paint</h2>
            <p>
              These frames define slots and relationships. They are intentionally plain:
              visual routes can add carbon, chrome, glass, red paint, or motion only after
              this anatomy stays intact.
            </p>
          </div>

          <div className={local.grid}>
            {skeletons.map((item, itemIndex) => (
              <article key={item.id} className={local.card}>
                <span className={local.index}>W-{String(itemIndex + 1).padStart(2, "0")}</span>
                <div className={`${local.blueprintFrame} ${item.frame}`} aria-hidden="true">
                  {item.parts.map((part, partIndex) => (
                    <div
                      key={`${item.id}-${part}-${partIndex}`}
                      className={
                        partIndex === 0
                          ? `${local.wire} ${local.wireStrong}`
                          : partIndex === item.parts.length - 1
                            ? `${local.wire} ${local.wireAmber}`
                            : local.wire
                      }
                    />
                  ))}
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className={local.tags}>
                  {item.parts.map((part, partIndex) => (
                    <span key={`${item.id}-${part}-${partIndex}-tag`}>{part}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={local.section} aria-labelledby="wireframe-rules">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Anatomy gates</span>
            <h2 id="wireframe-rules">What every primitive must prove</h2>
          </div>
          <div className={local.twoGrid}>
            {wireframeRules.map(([title, rule], index) => (
              <article key={title} className={local.pattern}>
                <span className={local.index}>A-{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
