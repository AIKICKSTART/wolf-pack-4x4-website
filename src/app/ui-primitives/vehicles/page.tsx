import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./vehicles.module.css"

export const metadata: Metadata = {
  title: "Vehicles | UI Primitives",
  description:
    "Fleet-owner vehicle management primitives — fleet cards, VIN decode, service history, mileage tracking, registration, insurance, roadworthy, fuel log, tyre condition, brake-pad life, telematics, ECU codes, recalls, fleet utilisation.",
}

interface VehicleScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<VehicleScene> = [
  {
    kicker: "Scene 01",
    title: "Vehicle card · fleet",
    body: "Fleet-view vehicle card — photo, NSW rego plate, status chip, odometer, fuel type, assigned driver.",
    href: "/ui-primitives/vehicles/vehicle-card-fleet",
    accent: "teal",
    glyph: "HLX",
    state: "Visual only",
    preview: [
      { label: "Rego", value: "BTR-882" },
      { label: "Driver", value: "Brodie" },
    ],
  },
  {
    kicker: "Scene 02",
    title: "VIN decoder strip",
    body: "Decoded VIN with per-character keycaps and field chips for make, model, engine, body, origin, year.",
    href: "/ui-primitives/vehicles/vin-decoder-strip",
    accent: "amber",
    glyph: "VIN",
    state: "Stateful · copy",
    preview: [
      { label: "Chars", value: "17" },
      { label: "Fields", value: "6" },
    ],
  },
  {
    kicker: "Scene 03",
    title: "Service history timeline",
    body: "Vertical timeline of service events — kind, summary, workshop, odometer, AUD cost chip.",
    href: "/ui-primitives/vehicles/service-history-timeline",
    accent: "green",
    glyph: "SVC",
    state: "Visual · activity",
    preview: [
      { label: "Events", value: "5" },
      { label: "Span", value: "12 mo" },
    ],
  },
  {
    kicker: "Scene 04",
    title: "Mileage tracker",
    body: "Current odometer, distance since last service, projected months to next service, monthly sparkline.",
    href: "/ui-primitives/vehicles/mileage-tracker",
    accent: "teal",
    glyph: "KM",
    state: "Visual · meter",
    preview: [
      { label: "Odo", value: "84,120 km" },
      { label: "Proj", value: "~2,500 km/mo" },
    ],
  },
  {
    kicker: "Scene 05",
    title: "Registration expiry chip",
    body: "NSW rego countdown chip — tone shifts from green → amber → red as expiry approaches.",
    href: "/ui-primitives/vehicles/registration-expiry-chip",
    accent: "amber",
    glyph: "REG",
    state: "Visual only",
    preview: [
      { label: "Tones", value: "4" },
      { label: "State", value: "NSW" },
    ],
  },
  {
    kicker: "Scene 06",
    title: "Insurance card",
    body: "Policy summary — insurer, policy number, cover types, renewal date, claim counts, excess.",
    href: "/ui-primitives/vehicles/insurance-card",
    accent: "teal",
    glyph: "INS",
    state: "Visual only",
    preview: [
      { label: "Cover", value: "Comp" },
      { label: "Excess", value: "$1,100" },
    ],
  },
  {
    kicker: "Scene 07",
    title: "Roadworthy certificate",
    body: "NSW eSafety / pink slip card — cert number, issue + expiry, workshop, inspector, advisories.",
    href: "/ui-primitives/vehicles/roadworthy-certificate-card",
    accent: "green",
    glyph: "RWC",
    state: "Visual only",
    preview: [
      { label: "Status", value: "Passed" },
      { label: "Advis.", value: "2" },
    ],
  },
  {
    kicker: "Scene 08",
    title: "Fuel log row",
    body: "Single semantic table row — date, litres, AUD cost, km/L efficiency chip, station + grade chip.",
    href: "/ui-primitives/vehicles/fuel-log-row",
    accent: "amber",
    glyph: "FUEL",
    state: "Visual · table",
    preview: [
      { label: "Rows", value: "4" },
      { label: "Grade", value: "Diesel" },
    ],
  },
  {
    kicker: "Scene 09",
    title: "Tyre condition diagram",
    body: "Top-down 4-corner view with tone-coded tyres + tread-depth chart that highlights the active corner.",
    href: "/ui-primitives/vehicles/tyre-condition-diagram",
    accent: "red",
    glyph: "TYR",
    state: "Stateful · select",
    preview: [
      { label: "Corners", value: "4" },
      { label: "Worst", value: "1.8 mm" },
    ],
  },
  {
    kicker: "Scene 10",
    title: "Brake-pad life",
    body: "Radial meters per axle — pad life % + km-until-service chip that shifts tone with severity.",
    href: "/ui-primitives/vehicles/brake-pad-life-meter",
    accent: "amber",
    glyph: "BRK",
    state: "Visual · meter",
    preview: [
      { label: "Front", value: "42%" },
      { label: "Rear", value: "68%" },
    ],
  },
  {
    kicker: "Scene 11",
    title: "Telematics chip",
    body: "Live status cluster — GPS speed, engine load, fuel level, coolant temp with a live-state dot.",
    href: "/ui-primitives/vehicles/telematics-chip",
    accent: "teal",
    glyph: "TLM",
    state: "Stateful · live",
    preview: [
      { label: "Chips", value: "4" },
      { label: "Mode", value: "Live" },
    ],
  },
  {
    kicker: "Scene 12",
    title: "ECU diagnostic row",
    body: "OBD-II diagnostic table row — code, description, detected timestamp, severity chip, fix link.",
    href: "/ui-primitives/vehicles/ecu-diagnostic-code-row",
    accent: "red",
    glyph: "ECU",
    state: "Visual · table",
    preview: [
      { label: "Codes", value: "4" },
      { label: "Crit", value: "1" },
    ],
  },
  {
    kicker: "Scene 13",
    title: "Recall banner",
    body: "NHTSA-style recall banner — severity, affected systems, action required, book-now CTA.",
    href: "/ui-primitives/vehicles/recall-notification-banner",
    accent: "red",
    glyph: "RCL",
    state: "Visual · alert",
    preview: [
      { label: "Severity", value: "Mandatory" },
      { label: "ID", value: "23V-441" },
    ],
  },
  {
    kicker: "Scene 14",
    title: "Fleet utilisation gauge",
    body: "Radial meter + donut breakdown — active vs workshop vs reserved vs off-road, plus fleet-size chip.",
    href: "/ui-primitives/vehicles/fleet-utilization-gauge",
    accent: "green",
    glyph: "FLT",
    state: "Visual · gauge",
    preview: [
      { label: "Active", value: "76%" },
      { label: "Fleet", value: "50" },
    ],
  },
]

const ACCENT_CLASS: Record<VehicleScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

const BONUS_SCENES: ReadonlyArray<{
  href: string
  title: string
  body: string
  accent: VehicleScene["accent"]
  glyph: string
  fields: ReadonlyArray<{ label: string; value: string }>
  state: string
}> = [
  {
    href: "/ui-primitives/vehicles/full-vehicle-detail",
    title: "Full vehicle detail",
    body:
      "Full single-vehicle detail page composing fleet card, VIN strip, service history, mileage, rego, insurance, roadworthy, fuel log, tyre diagram, brake pads, telematics, ECU codes, recall.",
    accent: "teal",
    glyph: "DETAIL",
    state: "Composition · 13 primitives",
    fields: [
      { label: "Scene", value: "Single veh" },
      { label: "Combos", value: "13 primitives" },
    ],
  },
  {
    href: "/ui-primitives/vehicles/full-fleet-dashboard",
    title: "Full fleet dashboard",
    body:
      "Full fleet dashboard scene combining the utilisation gauge, the fleet grid, recent service activity, and an active recall summary banner.",
    accent: "green",
    glyph: "FLEET",
    state: "Composition · fleet view",
    fields: [
      { label: "Scene", value: "All fleet" },
      { label: "Combos", value: "4 primitives" },
    ],
  },
]

export default function VehiclesIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23 / Vehicles"
        title="Vehicle + fleet management"
        description="Fourteen Stuart-Olin-style fleet-owner primitives for the Mufflermen pool — Hilux N80, Patrol Y62, Ranger PX3, Triton MR, Iveco Daily — covering VIN, service, mileage, NSW rego, insurance, roadworthy, fuel, tyres, brakes, telematics, ECU codes, recalls, and fleet-wide utilisation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — telematics + ECU streams are simulated
      </span>

      <section className={styles.grid} aria-label="Vehicles gallery patterns">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbGlyph}>{scene.glyph}</span>
                {scene.preview.map((row) => (
                  <span key={row.label} className={styles.thumbField}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </span>
                ))}
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}

        {BONUS_SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbGlyph}>{scene.glyph}</span>
                {scene.fields.map((row) => (
                  <span key={row.label} className={styles.thumbField}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </span>
                ))}
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>Bonus</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
