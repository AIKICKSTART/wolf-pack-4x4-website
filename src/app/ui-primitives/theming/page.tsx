import type { Metadata } from "next"
import Link from "next/link"

import { TOKEN_CONTROL_COUNT } from "../builder/theme-catalog"
import { STYLE_PROFILES, STYLE_PROFILES_BY_ID } from "../builder/theme/profiles"
import { PageHeader } from "../components/page-header"
import {
  THEME_PRESET_STYLE_PROFILE,
  themePresets,
  themeTokens,
  type ThemeTokenSource,
} from "../components/theming/theme-tokens"

import styles from "./theming.module.css"
import { ThemingPlayground } from "./theming-playground"

export const metadata: Metadata = {
  title: "Theming | UI Primitives",
}

const INHERITANCE_RULES = [
  {
    source: "Foundations",
    title: "Token base",
    body: "Canvas, accent, text, focus, spacing, radius, motion, and icon scale still originate in the shared .dashboard token block.",
    tokens: ["--primitive-canvas", "--primitive-red", "--primitive-space-*"],
  },
  {
    source: "Surfaces",
    title: "Material recipes",
    body: "Panel, border, carbon weave, metallic red clearcoat, amber hover, chrome edge, and recessed depth remain derived from surface rules.",
    tokens: ["--primitive-panel", "--primitive-metallic-red", "--primitive-chrome-edge"],
  },
  {
    source: "Typography",
    title: "Role-safe type",
    body: "Theme presets can swap approved font stacks, but type roles, line-height, tracking, and dense-table scale stay owned by Typography.",
    tokens: ["--primitive-font-display", "--primitive-font-body", "--primitive-text-sm"],
  },
  {
    source: "Icons",
    title: "Icon material boundary",
    body: "Theming exposes icon foreground proof while supplier marks and Carbon and Red wells keep the icon route's sizing, stroke, and plate rules.",
    tokens: ["--primitive-icon-obsidian", "--primitive-icon-stroke", "supplier plates"],
  },
] as const

const SOURCE_ROWS = [
  {
    label: "CSS variable base",
    source: "src/app/ui-primitives/ui-primitives.module.css",
    detail:
      "The .dashboard scope owns the full --primitive-* contract, with light and dark palettes switched by html[data-primitive-theme].",
    proof: `${TOKEN_CONTROL_COUNT} catalogued controls`,
  },
  {
    label: "Theme control catalog",
    source: "src/app/ui-primitives/builder/theme-catalog",
    detail:
      "The 00 Theme control route reads this metadata for labels, groups, levels, and controllable surfaces. Theming references it as the canonical control inventory.",
    proof: "Source route, not a duplicate list",
  },
  {
    label: "Style profiles",
    source: "src/app/ui-primitives/builder/theme/profiles",
    detail:
      "The 00 Style picker applies token-override profiles through ThemeProvider. This page documents that boundary instead of forking profile persistence.",
    proof: `${STYLE_PROFILES.length} approved profiles`,
  },
  {
    label: "Scoped playground",
    source: "src/app/ui-primitives/components/theming/theme-tokens.ts",
    detail:
      "Theme presets now persist through the dashboard-root primitive shell, while local token editors remain wrapper-scoped for safe inspection and export snapshots.",
    proof: `${themePresets.length} presets / ${themeTokens.length} tokens`,
  },
] as const

const TOKEN_SOURCE_LABELS: Record<ThemeTokenSource, { label: string; detail: string }> = {
  foundations: {
    label: "Foundations",
    detail: "Root color and scale tokens inherited before this route adds scoped overrides.",
  },
  surfaces: {
    label: "Surfaces",
    detail: "Panel, line, red depth, and material treatment consumed by the preview.",
  },
  typography: {
    label: "Typography",
    detail: "Approved font stacks and text emphasis tokens without rewriting type roles.",
  },
  icons: {
    label: "Icons",
    detail: "Icon foreground token proof while source-backed logo rules remain protected.",
  },
}

const TOKEN_SOURCE_ORDER: ReadonlyArray<ThemeTokenSource> = [
  "foundations",
  "surfaces",
  "typography",
  "icons",
]

const THEME_PROFILE_ROWS = themePresets.map((preset) => {
  const profileId = THEME_PRESET_STYLE_PROFILE[preset.id]
  return {
    preset,
    profile: STYLE_PROFILES_BY_ID[profileId],
  }
})

const THEME_WORKBENCH_LINKS = [
  {
    title: "Theme control panel",
    href: "/ui-primitives/control/theme-panel",
    body: `${TOKEN_CONTROL_COUNT} catalogued token controls grouped by level and category.`,
    meta: "Global token editor",
  },
  {
    title: "Style profiles",
    href: "/ui-primitives/control/style-picker",
    body: `${STYLE_PROFILES.length} profile overlays for material, radius, shadow, fields, focus, and motion.`,
    meta: "Profile overlay",
  },
  {
    title: "Preset cards",
    href: "/ui-primitives/theming/presets",
    body: `${themePresets.length} approved palette and type presets that drive the dashboard-root shell.`,
    meta: "Theme presets",
  },
  {
    title: "Token inspector",
    href: "/ui-primitives/theming/inspector",
    body: "Scoped proof surface for inspecting inherited and overridden --primitive-* values.",
    meta: "Inspection",
  },
  {
    title: "Export snapshots",
    href: "/ui-primitives/theming/export",
    body: "Promotion handoff for the current preset and local controller override state.",
    meta: "Handoff",
  },
] as const

export default function ThemingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <PageHeader
          kicker="01 / Shared DNA"
          title="Theme playground"
          description="Select a preset here and every UI primitive route inherits the same dashboard-root token skin. Individual token edits stay scoped to the playground until promoted."
          dnaSectionId="theming"
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Theming" },
          ]}
        />

        <section className={styles.dnaBoard} aria-labelledby="theming-dna-title">
          <div className={styles.boardIntro}>
            <span className={styles.kicker}>Shared DNA contract</span>
            <h2 id="theming-dna-title">Themes inherit before they override</h2>
            <p>
              This route is the cascade proof for completed Shared DNA work. It does
              not replace Foundations, Surfaces, Typography, or Icons. It shows which
              upstream rules are consumed, which token sources are authoritative, and
              where the local playground is intentionally scoped.
            </p>
          </div>

          <div className={styles.inheritanceGrid}>
            {INHERITANCE_RULES.map((rule) => (
              <article key={rule.source} className={styles.inheritanceCard}>
                <span>{rule.source}</span>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
                <ul>
                  {rule.tokens.map((token) => (
                    <li key={token}>
                      <code>{token}</code>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.sourcePanel} aria-labelledby="theme-sources-title">
          <div className={styles.boardIntro}>
            <span className={styles.kicker}>Theme source reconciliation</span>
            <h2 id="theme-sources-title">Four sources, one cascade boundary</h2>
            <p>
              The CSS variable block remains the base source. The control catalog and
              style profiles are existing Source of Truth systems. Theming uses a
              dashboard-root preset scope for route-wide skins, with local editors reserved
              for proof and handoff snapshots.
            </p>
          </div>

          <div className={styles.sourceGrid}>
            {SOURCE_ROWS.map((row) => (
              <article key={row.label} className={styles.sourceCard}>
                <span>{row.label}</span>
                <code>{row.source}</code>
                <p>{row.detail}</p>
                <strong>{row.proof}</strong>
              </article>
            ))}
          </div>

          <div
            className={styles.profileBridge}
            aria-label="Theme preset to style profile bridge"
            data-theme-style-bridge="true"
          >
            {THEME_PROFILE_ROWS.map(({ preset, profile }) => (
              <article
                key={preset.id}
                data-theme-preset-bridge={preset.id}
                data-style-profile-bridge={profile.id}
              >
                <span>Theme preset</span>
                <strong>{preset.label}</strong>
                <p>{preset.description}</p>
                <code>{preset.id}</code>
                <b aria-hidden="true">+</b>
                <span>Style profile</span>
                <strong>{profile.name}</strong>
                <p>{profile.description}</p>
                <code>{profile.id}</code>
              </article>
            ))}
          </div>

          <div className={styles.tokenLedger} aria-label="Theming token source ledger">
            {TOKEN_SOURCE_ORDER.map((source) => {
              const tokens = themeTokens.filter((token) => token.source === source)
              const copy = TOKEN_SOURCE_LABELS[source]

              return (
                <article key={source} className={styles.tokenSourceCard}>
                  <div>
                    <span>{copy.label}</span>
                    <strong>{tokens.length} tokens</strong>
                  </div>
                  <p>{copy.detail}</p>
                  <ul>
                    {tokens.map((token) => (
                      <li key={token.id}>
                        <code>{token.id}</code>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className={styles.workbenchPanel} aria-labelledby="theme-workbench-title">
          <div className={styles.boardIntro}>
            <span className={styles.kicker}>Theme workbench</span>
            <h2 id="theme-workbench-title">Themes and style profiles live here</h2>
            <p>
              Theme presets, token controls, inspectors, exports, and style-profile overlays are
              now gathered under the Theming section. The sidebar no longer splits theme control
              and style profiles into separate source-truth destinations.
            </p>
          </div>

          <div className={styles.workbenchGrid}>
            {THEME_WORKBENCH_LINKS.map((item) => (
              <Link key={item.href} className={styles.workbenchCard} href={item.href}>
                <span>{item.meta}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.note}>
          <span>How it works</span>
          <p>
            Preset cards persist a <code>ThemePresetId</code> and the shared
            <code> .dashboard</code> root applies the typed <code> --primitive-* </code>
            variables for every route. Local colour and font pickers still write only to
            their controller wrapper, so experiments do not overwrite the global shell.
          </p>
        </div>
        <Link
          className={styles.note}
          href="/ui-primitives/theming/color-picker"
          style={{ textDecoration: "none" }}
        >
          <span>Primitive route</span>
          <p>
            Token colour picker — tune individual colour tokens with native colour and CSS-value
            inputs. Inspect primitive states <span aria-hidden="true">→</span>
          </p>
        </Link>
        <ThemingPlayground />
      </div>
    </main>
  )
}
