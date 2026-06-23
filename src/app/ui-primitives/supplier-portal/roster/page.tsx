import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  SupplierRoster,
  type SupplierRosterRep,
} from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Supplier roster | UI Primitives — Supplier Portal",
}

const reps: ReadonlyArray<SupplierRosterRep> = [
  {
    id: "owen",
    name: "Owen Brackenridge",
    role: "Manta · Dispatch lead",
    tone: "red",
    status: "online",
    lastActiveLabel: "Active now",
  },
  {
    id: "kelsie",
    name: "Kelsie Tran",
    role: "Magnaflow ANZ · Accounts",
    tone: "teal",
    status: "away",
    lastActiveLabel: "47 min ago",
  },
  {
    id: "rob",
    name: "Rob Pacheski",
    role: "Pacemaker Headers · Tech",
    tone: "amber",
    status: "online",
    lastActiveLabel: "Active now",
  },
  {
    id: "jenn",
    name: "Jenn Whitlam",
    role: "Redback Exhaust · Sales",
    tone: "green",
    status: "busy",
    lastActiveLabel: "Last seen 2h ago",
  },
  {
    id: "marko",
    name: "Marko Vinaric",
    role: "HushPower · Operations",
    tone: "obsidian",
    status: "offline",
    lastActiveLabel: "Off duty until 8am",
  },
  {
    id: "dani",
    name: "Dani Beaudesert",
    role: "Beaudesert · Workshop liaison",
    tone: "teal",
    status: "online",
    lastActiveLabel: "Active 4 min ago",
  },
]

export default function RosterPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.12 / Supplier portal"
        title="Supplier roster"
        description="Trade reps Oak Flats can call when something has to move today."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Supplier roster" },
        ]}
      />
      <section className={styles.canvas}>
        <SupplierRoster reps={reps} />
      </section>
    </main>
  )
}
