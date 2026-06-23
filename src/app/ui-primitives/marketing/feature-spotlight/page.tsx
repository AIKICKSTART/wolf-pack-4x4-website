import type { Metadata } from "next"
import { Check } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import { FeatureSpotlight } from "../../components/marketing/feature-spotlight"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Feature spotlight | Marketing Blocks",
  description:
    "Primitive 03 — single feature spotlight row with reversible visual + copy.",
}

function ExhaustVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Stainless steel exhaust diagram"
      style={{ width: "100%", height: "100%", minHeight: 280 }}
    >
      <defs>
        <linearGradient id="pipe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfd6df" />
          <stop offset="0.5" stopColor="#6e7682" />
          <stop offset="1" stopColor="#2a2e36" />
        </linearGradient>
      </defs>
      <rect width="320" height="240" fill="#080a10" />
      <rect x="0" y="118" width="320" height="4" fill="rgba(255,255,255,0.05)" />
      <rect x="40" y="100" width="140" height="40" rx="6" fill="url(#pipe)" />
      <rect x="180" y="92" width="100" height="56" rx="14" fill="url(#pipe)" />
      <circle cx="184" cy="120" r="3" fill="#e62028" />
      <circle cx="276" cy="120" r="3" fill="#ffc14f" />
      <text x="160" y="200" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#868b98">
        3 INCH STAINLESS · TIG-WELDED
      </text>
    </svg>
  )
}

function WeldVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="TIG welding diagram"
      style={{ width: "100%", height: "100%", minHeight: 280 }}
    >
      <rect width="320" height="240" fill="#080a10" />
      <circle cx="160" cy="120" r="70" fill="none" stroke="rgba(64,188,255,0.18)" strokeWidth="1" />
      <circle cx="160" cy="120" r="45" fill="none" stroke="rgba(64,188,255,0.32)" strokeWidth="1" />
      <circle cx="160" cy="120" r="22" fill="#ffc14f" opacity="0.6" />
      <circle cx="160" cy="120" r="10" fill="#fff" />
      <path d="M 60 188 L 260 52" stroke="#cfd6df" strokeWidth="3" />
      <text x="160" y="220" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#868b98">
        TIG · ARGON-PURGED · 2.4 MM TUNGSTEN
      </text>
    </svg>
  )
}

export default function FeatureSpotlightPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Feature spotlight"
        title="Feature spotlight"
        description="Single feature row — image-left, copy-right with a reversed flag. Reveal-animated for storytelling product walks."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Feature spotlight" },
        ]}
      />

      <FeatureSpotlight
        kicker="The catback"
        heading="Mandrel-bent in one piece — three inch stainless throughout."
        body="We mandrel bend our catbacks from a single length of 304-grade stainless steel. No crush-bent radii. No off-cuts welded in the middle. Cleaner flow, longer life, factory-clean tone."
        visual={<ExhaustVisual />}
        bullets={[
          { icon: <Check size={12} strokeWidth={2.6} />, label: "304-grade stainless, 3-inch or 3.5-inch ID" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Mandrel-bent — never crush-bent" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Manta-spec fit for HiLux, Ranger, BT-50" },
        ]}
        action={{ label: "See catback options", href: "#catbacks" }}
      />

      <FeatureSpotlight
        kicker="The weld"
        heading="Every joint TIG-fused, purged, and pressure-checked."
        body="TIG welds get back-purged with argon to keep the inside clean. Then a pressure test before the rig leaves the bay. That's how a 1968 weld is still holding on a HQ ute in 2026."
        visual={<WeldVisual />}
        bullets={[
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Argon-purged TIG joints" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Pressure test pre-fit" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Lifetime crack guarantee" },
        ]}
        action={{ label: "Workshop walkthrough", href: "#walkthrough" }}
        reversed
      />
    </main>
  )
}
