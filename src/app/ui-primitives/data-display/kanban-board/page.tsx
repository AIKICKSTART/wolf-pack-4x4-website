import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { KanbanBoard } from "../../components/data-display"
import type { KanbanColumn } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Kanban board | UI Primitives — Data display",
}

const columns: ReadonlyArray<KanbanColumn> = [
  {
    stage: "backlog",
    title: "Backlog",
    cards: [
      {
        id: "k-101",
        code: "J-2841",
        title: "Magnaflow midpipe install — Holden VE",
        sub: "Customer-supplied muffler. Booked Thu 09:30, bay 2.",
        tags: ["Stainless", "Install"],
        priority: "med",
        due: "Thu 30 May",
        assignees: [{ name: "Lana Petrov" }, { name: "Daniel Cho" }],
      },
      {
        id: "k-102",
        code: "J-2842",
        title: "Diagnostic — rattle at idle, Subaru BRZ",
        sub: "Customer reports drone above 3000rpm.",
        tags: ["Diagnostic"],
        priority: "low",
        due: "Fri 31 May",
        assignees: [{ name: "Sam Iyer" }],
      },
      {
        id: "k-103",
        code: "J-2843",
        title: "Quote build — custom 3in dual exit, Ford Falcon BA",
        tags: ["Quote", "Custom"],
        priority: "low",
        assignees: [{ name: "Lana Petrov" }],
      },
    ],
  },
  {
    stage: "progress",
    title: "In progress",
    cards: [
      {
        id: "k-201",
        code: "J-2836",
        title: "Catalytic converter swap — Toyota Hilux",
        sub: "Bay 1 · 70% complete. New cat fitted, awaiting weld inspection.",
        tags: ["Cat", "Weld"],
        priority: "high",
        due: "Today",
        assignees: [{ name: "Daniel Cho" }, { name: "Sam Iyer" }],
      },
      {
        id: "k-202",
        code: "J-2838",
        title: "EGT sensor harness — Nissan Patrol GU",
        sub: "Bay 3 · pulling harness through firewall.",
        tags: ["Telemetry"],
        priority: "med",
        due: "Today",
        assignees: [{ name: "Mei Tanaka" }],
      },
    ],
  },
  {
    stage: "review",
    title: "Review",
    cards: [
      {
        id: "k-301",
        code: "J-2829",
        title: "Stainless full system — Ford Mustang GT",
        sub: "Dyno tuned. Awaiting QA leak + ADR exit angle check.",
        tags: ["Dyno", "QA"],
        priority: "high",
        due: "Today",
        assignees: [{ name: "Lana Petrov" }, { name: "Daniel Cho" }, { name: "Mei Tanaka" }],
      },
      {
        id: "k-302",
        code: "J-2832",
        title: "Twin-cone resonator — VW Golf R Mk8",
        sub: "Customer pickup at 16:00, needs final wash.",
        tags: ["Pickup"],
        priority: "med",
        due: "Today",
        assignees: [{ name: "Sam Iyer" }],
      },
    ],
  },
  {
    stage: "done",
    title: "Done",
    cards: [
      {
        id: "k-401",
        code: "J-2811",
        title: "Hush-Power muffler swap — Mazda3 BP",
        sub: "Closed yesterday. Invoice sent.",
        tags: ["Closed"],
        priority: "low",
        due: "Yesterday",
        assignees: [{ name: "Daniel Cho" }],
      },
      {
        id: "k-402",
        code: "J-2814",
        title: "Headers + extractors — Commodore VE SS",
        sub: "Customer 5★. Photos pushed to gallery.",
        tags: ["Closed", "Featured"],
        priority: "med",
        due: "Yesterday",
        assignees: [{ name: "Lana Petrov" }, { name: "Mei Tanaka" }],
      },
    ],
  },
]

export default function KanbanBoardShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.10 / Data display"
        title="Kanban board — workshop bays"
        description="Four-column board (Backlog / In progress / Review / Done) with priority dots, tag chips, and avatar stacks. Visual primitive only — no drag/drop logic baked in."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Kanban board" },
        ]}
      />
      <section className={styles.canvas}>
        <KanbanBoard columns={columns} />
        <div className={styles.note}>
          <span>Composition</span>
          <p>
            Pair with the activity-feed primitive for a complete jobs surface — board for state,
            feed for narration.
          </p>
        </div>
      </section>
    </main>
  )
}
