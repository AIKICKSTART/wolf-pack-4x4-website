import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ColorRolesGrid, type ColorRoleEntry } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Colour roles grid | Branding Lab",
  description:
    "Primitive 04 — six semantic colour roles with surface + ink pairings and usage notes.",
}

const ROLES: ReadonlyArray<ColorRoleEntry> = [
  {
    role: "Primary",
    description: "Workshop red. Used for primary CTAs, the main brand mark, and active states.",
    background: "#E62028",
    foreground: "#FFFFFF",
    pairingLabel: "PRIMARY",
  },
  {
    role: "Surface",
    description: "Bay graphite. The default canvas behind every UI primitive and the dashboard.",
    background: "#101016",
    foreground: "#F6F6F8",
    pairingLabel: "SURFACE",
  },
  {
    role: "Critical",
    description: "Stop colour. Used for destructive actions, hard errors, and bay-out alerts.",
    background: "#A8141A",
    foreground: "#FFEDED",
    pairingLabel: "CRITICAL",
  },
  {
    role: "Success",
    description: "Telemetry green. Reserved for confirmations, completed jobs, and safe states.",
    background: "#37D67A",
    foreground: "#06150D",
    pairingLabel: "SUCCESS",
  },
  {
    role: "Muted",
    description: "Chrome mist. Carries supporting labels, breadcrumbs, and inactive UI text.",
    background: "#1B1C25",
    foreground: "#AEB2BD",
    pairingLabel: "MUTED",
  },
  {
    role: "Accent",
    description: "Service amber. Highlight role — used sparingly for hot tips and emphasis.",
    background: "#FFC14F",
    foreground: "#1A1306",
    pairingLabel: "ACCENT",
  },
]

export default function ColorRolesGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Colour roles"
        title="Semantic colour roles"
        description="Six bound roles — Primary, Surface, Critical, Success, Muted, Accent. Designers and developers reach for the role; the literal hex never appears in product code."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Colour roles" },
        ]}
      />
      <ColorRolesGrid roles={ROLES} />
    </main>
  )
}
