import type { CSSProperties } from "react"
import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import styles from "../ui-primitives.module.css"
import local from "../foundation-dna.module.css"

export const metadata: Metadata = {
  title: "Sizing | UI Primitives",
}

const sizeGroups = [
  {
    title: "UI chrome buttons",
    use: "Tiny toolbar, table, and route chrome controls.",
    values: [
      ["2xs", "24px", "--primitive-size-ui-2xs"],
      ["xs", "28px", "--primitive-size-ui-xs"],
      ["sm", "32px", "--primitive-size-ui-sm"],
      ["md", "36px", "--primitive-size-ui-md"],
    ],
  },
  {
    title: "Command buttons",
    use: "Primary app actions, forms, destructive actions, and CTAs.",
    values: [
      ["sm", "44px", "--primitive-size-command-sm"],
      ["md", "48px", "--primitive-size-command-md"],
      ["lg", "56px", "--primitive-size-command-lg"],
    ],
  },
  {
    title: "Icon buttons",
    use: "Icon-only controls, tool buttons, and compact action wells.",
    values: [
      ["xs", "24px", "--primitive-size-icon-button-xs"],
      ["sm", "28px", "--primitive-size-icon-button-sm"],
      ["md", "32px", "--primitive-size-icon-button-md"],
      ["lg", "36px", "--primitive-size-icon-button-lg"],
      ["xl", "44px", "--primitive-size-icon-button-xl"],
    ],
  },
  {
    title: "Pills and chips",
    use: "Badges, tabs, filters, facets, states, and segmented labels.",
    values: [
      ["sm", "24px", "--primitive-size-pill-sm"],
      ["md", "28px", "--primitive-size-pill-md"],
      ["lg", "32px", "--primitive-size-pill-lg"],
    ],
  },
  {
    title: "Rows",
    use: "List rows, table rows, setting rows, and dense operational records.",
    values: [
      ["sm", "36px", "--primitive-size-row-sm"],
      ["md", "44px", "--primitive-size-row-md"],
      ["lg", "56px", "--primitive-size-row-lg"],
    ],
  },
  {
    title: "Fields",
    use: "Inputs, selects, textareas, search fields, and filter controls.",
    values: [
      ["sm", "36px", "--primitive-size-field-sm"],
      ["md", "44px", "--primitive-size-field-md"],
      ["lg", "52px", "--primitive-size-field-lg"],
    ],
  },
  {
    title: "Icon wells",
    use: "Glyph containers for cards, actions, navigation, and data states.",
    values: [
      ["sm", "32px", "--primitive-size-icon-well-sm"],
      ["md", "40px", "--primitive-size-icon-well-md"],
      ["lg", "48px", "--primitive-size-icon-well-lg"],
    ],
  },
  {
    title: "Cards",
    use: "Reusable card minimum heights before a route adds content density.",
    values: [
      ["card sm", "160px", "--primitive-card-min-sm"],
      ["card md", "220px", "--primitive-card-min-md"],
      ["card lg", "320px", "--primitive-card-min-lg"],
    ],
  },
  {
    title: "Media frames",
    use: "Thumbnails, card media, and hero frames with named responsive limits.",
    values: [
      ["thumb", "96px", "--primitive-media-thumb"],
      ["card", "168px", "--primitive-media-card"],
      ["hero", "420px", "--primitive-media-hero"],
    ],
  },
] as const

const sizingMatrix = [
  ["Button", "24/28/32/36 for chrome; 44/48/56 for commands", "Actions"],
  ["Icon button", "24/28/32/36/44 square wells", "Actions / navigation / file browser"],
  ["Pill", "24/28/32 height with pill radius", "Selection / feedback / data display"],
  ["Card", "160/220/320 min-height families", "Surfaces / data display / marketing"],
  ["Row", "36/44/56 row rhythm", "Tables / file browser / search"],
  ["Field", "36/44/52 field rhythm", "Forms / search / filters"],
  ["Icon well", "32/40/48 wells, glyph separate from well", "Icons / actions / cards"],
  ["Media frame", "96 thumb, 168 card, 420 hero", "Media / section patterns"],
] as const

function sizeStyle(token: string): CSSProperties {
  return { "--size-box": `var(${token})` } as CSSProperties
}

export default function SizingPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Primitive sizing scale"
        description="Named component sizes for buttons, icon buttons, pills, chips, badges, cards, rows, fields, icon wells, and media frames so downstream pages stop guessing dimensions."
        dnaSectionId="sizing"
      />

      <div className={local.board}>
        <section className={local.section} aria-labelledby="sizing-groups">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Component-size tokens</span>
            <h2 id="sizing-groups">One scale for every control family</h2>
            <p>
              The scale mirrors the current code: small shadcn-style chrome controls,
              44px-plus command buttons, compact icon tools, dense rows, and larger
              reusable card/media frames.
            </p>
          </div>

          <div className={local.twoGrid}>
            {sizeGroups.map((group) => (
              <article key={group.title} className={local.sizeGroup}>
                <h3>{group.title}</h3>
                <p>{group.use}</p>
                <div className={local.sizeRows}>
                  <div className={local.sizeRail}>
                    {group.values.map(([label, , token]) => (
                      <span key={`${group.title}-${label}`} className={local.sizeBox} style={sizeStyle(token)}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className={local.tokenList}>
                    {group.values.map(([label, value, token]) => (
                      <div key={token} className={local.tokenLine}>
                        <code>{token}</code>
                        <span>
                          {label} / {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={local.section} aria-labelledby="sizing-matrix">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Usage matrix</span>
            <h2 id="sizing-matrix">Where each size family applies</h2>
          </div>
          <div className={local.matrix}>
            <table className={local.table}>
              <caption>Primitive component size ownership</caption>
              <thead>
                <tr>
                  <th scope="col">Family</th>
                  <th scope="col">Contract</th>
                  <th scope="col">Primary consumers</th>
                </tr>
              </thead>
              <tbody>
                {sizingMatrix.map(([family, contract, consumers]) => (
                  <tr key={family}>
                    <td>{family}</td>
                    <td>{contract}</td>
                    <td>{consumers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
