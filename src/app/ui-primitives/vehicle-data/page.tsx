import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Vehicle data | UI Primitives",
  description:
    "Vehicle-data primitives — VIN decode, OBD-II live readout, fitment validator, parts compatibility, recalls, service intervals, tyre spec, engine bay diagram, DTC rows, VIN history, NSW rego lookup, fuel grade compatibility, tow capacity, and aftermarket modifications.",
}

interface VehicleDataScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<VehicleDataScene> = [
  {
    kicker: "Scene 01",
    title: "VIN decoder card",
    body: "VIN entry field with 17 keycaps + decoded year, make, model, engine, transmission, body, origin chips after submission.",
    href: "/ui-primitives/vehicle-data/vin-decoder-card",
    accent: "teal",
    glyph: "VIN",
    state: "Stateful · form",
    preview: [
      { label: "Chars", value: "17" },
      { label: "Fields", value: "7" },
    ],
  },
  {
    kicker: "Scene 02",
    title: "OBD-II live readout",
    body: "Five radial gauges — engine RPM, coolant, fuel level, MAF airflow, and Bank 1 Sensor 1 O₂ voltage — with simulated live data.",
    href: "/ui-primitives/vehicle-data/obd-live-readout",
    accent: "green",
    glyph: "OBD",
    state: "Stateful · live",
    preview: [
      { label: "Gauges", value: "5" },
      { label: "Tick", value: "0.9 s" },
    ],
  },
  {
    kicker: "Scene 03",
    title: "Fitment validator",
    body: "Rego or VIN lookup that runs the part on the bench against the customer's build spec — bolt pattern, engine code, ADR clearance.",
    href: "/ui-primitives/vehicle-data/fitment-validator",
    accent: "amber",
    glyph: "FIT",
    state: "Stateful · validate",
    preview: [
      { label: "Checks", value: "4+" },
      { label: "States", value: "match/partial/fail" },
    ],
  },
  {
    kicker: "Scene 04",
    title: "Parts compatibility matrix",
    body: "Grid showing each workshop part against each vehicle in the pool — match, partial, mismatch, unknown.",
    href: "/ui-primitives/vehicle-data/parts-compatibility-matrix",
    accent: "amber",
    glyph: "MTRX",
    state: "Visual · matrix",
    preview: [
      { label: "Parts", value: "5" },
      { label: "Vehicles", value: "4" },
    ],
  },
  {
    kicker: "Scene 05",
    title: "Recall lookup card",
    body: "Search by VIN to surface NHTSA / ACCC recall campaigns with severity, status, affected components, and issue date.",
    href: "/ui-primitives/vehicle-data/recall-lookup-card",
    accent: "red",
    glyph: "RCL",
    state: "Stateful · search",
    preview: [
      { label: "Records", value: "2" },
      { label: "Critical", value: "1" },
    ],
  },
  {
    kicker: "Scene 06",
    title: "Service interval timeline",
    body: "Vertical timeline of OEM service intervals — oil 10k, brake fluid 40k, coolant 60k, transmission 80k — with status chips.",
    href: "/ui-primitives/vehicle-data/service-interval-timeline",
    accent: "amber",
    glyph: "SVC",
    state: "Visual · timeline",
    preview: [
      { label: "Items", value: "6" },
      { label: "Due", value: "1" },
    ],
  },
  {
    kicker: "Scene 07",
    title: "Tyre spec panel",
    body: "Front + rear ADR tyre placard — size, load index, speed rating, recommended + max pressure.",
    href: "/ui-primitives/vehicle-data/tyre-spec-panel",
    accent: "teal",
    glyph: "TYR",
    state: "Visual · spec",
    preview: [
      { label: "Front", value: "265/70R17" },
      { label: "Rear", value: "265/70R17" },
    ],
  },
  {
    kicker: "Scene 08",
    title: "Engine bay diagram",
    body: "Top-down engine bay schematic with interactive component callouts — battery, airbox, turbo, intercooler, coolant, ECU.",
    href: "/ui-primitives/vehicle-data/engine-bay-diagram",
    accent: "teal",
    glyph: "BAY",
    state: "Stateful · interactive",
    preview: [
      { label: "Callouts", value: "6" },
      { label: "ARIA", value: "img" },
    ],
  },
  {
    kicker: "Scene 09",
    title: "Diagnostic code row",
    body: "OBD-II DTC table row — code, description, system, severity chip, freeze-frame, link to fix playbook.",
    href: "/ui-primitives/vehicle-data/diagnostic-code-row",
    accent: "red",
    glyph: "DTC",
    state: "Visual · table row",
    preview: [
      { label: "Codes", value: "5" },
      { label: "Critical", value: "1" },
    ],
  },
  {
    kicker: "Scene 10",
    title: "VIN history card",
    body: "PPSR + REVS-style ownership history — owners count, accidents, lifetime km, state transitions, event timeline.",
    href: "/ui-primitives/vehicle-data/vin-history-card",
    accent: "teal",
    glyph: "HIS",
    state: "Visual · summary",
    preview: [
      { label: "Events", value: "5" },
      { label: "Owners", value: "2" },
    ],
  },
  {
    kicker: "Scene 11",
    title: "NSW rego lookup",
    body: "Transport for NSW plate card — yellow placard, expiry countdown, encumbrance flag, written-off flag, CTP insurer.",
    href: "/ui-primitives/vehicle-data/nsw-rego-lookup",
    accent: "amber",
    glyph: "REG",
    state: "Visual · plate",
    preview: [
      { label: "State", value: "NSW" },
      { label: "Expires", value: "Aug 26" },
    ],
  },
  {
    kicker: "Scene 12",
    title: "Fuel grade row",
    body: "Pump-grade row — 91 / 95 / 98 / E10 / diesel — with engine compatibility verdict, RON rating, and pump price.",
    href: "/ui-primitives/vehicle-data/fuel-grade-row",
    accent: "amber",
    glyph: "FUL",
    state: "Visual · table",
    preview: [
      { label: "Grades", value: "5" },
      { label: "Verdicts", value: "4" },
    ],
  },
  {
    kicker: "Scene 13",
    title: "Tow capacity tile",
    body: "ADR tow capacity tile — braked, unbraked, towball download, gross combination mass + current load progress bar.",
    href: "/ui-primitives/vehicle-data/tow-capacity-tile",
    accent: "green",
    glyph: "TOW",
    state: "Visual · meter",
    preview: [
      { label: "Braked", value: "3,500 kg" },
      { label: "Ball", value: "350 kg" },
    ],
  },
  {
    kicker: "Scene 14",
    title: "Aftermarket mod row",
    body: "Modification table row — exhaust / intake / tune — with claimed gain, install cost, legality chip, engineer cert.",
    href: "/ui-primitives/vehicle-data/aftermarket-mod-row",
    accent: "red",
    glyph: "MOD",
    state: "Visual · table",
    preview: [
      { label: "Rows", value: "5" },
      { label: "Engineered", value: "2" },
    ],
  },
]

const ACCENT_CLASS: Record<VehicleDataScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

const BONUS_SCENES: ReadonlyArray<{
  href: string
  title: string
  body: string
  accent: VehicleDataScene["accent"]
  glyph: string
  fields: ReadonlyArray<{ label: string; value: string }>
  state: string
}> = [
  {
    href: "/ui-primitives/vehicle-data/full-vehicle",
    title: "Full vehicle data",
    body:
      "Single-vehicle composition page combining VIN decode, OBD live, fitment, parts matrix, recalls, service intervals, tyres, engine bay, DTCs, history, rego, fuel grade compatibility, tow capacity, and aftermarket mods.",
    accent: "teal",
    glyph: "FULL",
    state: "Composition · 14 primitives",
    fields: [
      { label: "Scene", value: "Hilux N80" },
      { label: "Combos", value: "14 primitives" },
    ],
  },
]

export default function VehicleDataIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="24 / Vehicle data"
        title="Vehicle technical record"
        description="Fourteen technical primitives covering VIN decode, OBD-II live readout, fitment, parts compatibility, recalls, service intervals, tyre spec, engine bay, DTCs, VIN history, NSW rego, fuel grades, tow capacity, and aftermarket modifications — built for Oak Flats Hilux, Falcon, Raptor, and Commodore work."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — OBD-II streams + NEVDIS records are simulated
      </span>

      <section className={styles.grid} aria-label="Vehicle data gallery patterns">
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
