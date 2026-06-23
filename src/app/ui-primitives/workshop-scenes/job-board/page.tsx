import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import type { KanbanColumn } from "../../components/data-display/kanban-board"
import { JobBoard } from "../../components/workshop-scenes/job-board"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Job board | UI Primitives — Workshop Scenes",
}

const columns: ReadonlyArray<KanbanColumn> = [
  {
    stage: "backlog",
    title: "Backlog",
    cards: [
      {
        id: "j1",
        code: "JOB-2026-0421",
        title: "Hilux N80 DPF-back",
        sub: "Sandra Picton · ECC-001",
        tags: ["3in", "ADR 80/13"],
        priority: "high",
        due: "Wed",
        assignees: [{ name: "Owen Brackenridge" }],
      },
      {
        id: "j2",
        code: "JOB-2026-0422",
        title: "VE Commodore SS cat-back",
        sub: "Liam Brookings · ROAR-1",
        tags: ["Magnaflow", "Twin 2.5in"],
        priority: "med",
        due: "Thu",
        assignees: [{ name: "Levi Tahau" }],
      },
      {
        id: "j3",
        code: "JOB-2026-0423",
        title: "Patrol Y62 twin 3in cat-back",
        sub: "Tahira Mansell · BRR-902",
        tags: ["Twin 3in", "Quiet tune"],
        priority: "high",
        due: "Thu",
        assignees: [{ name: "Levi Tahau" }, { name: "Mickey Pa'aga" }],
      },
    ],
  },
  {
    stage: "progress",
    title: "On the bay",
    cards: [
      {
        id: "j4",
        code: "JOB-2026-0418",
        title: "Hilux N80 DPF-back fitup",
        sub: "Bryce Cattermole · ECC-714",
        tags: ["Bay 2", "Lambda"],
        priority: "high",
        due: "Today",
        assignees: [{ name: "Levi Tahau" }],
      },
      {
        id: "j5",
        code: "JOB-2026-0419",
        title: "Ranger PX3 mid-muffler",
        sub: "Trev Whittaker · BUG-301",
        tags: ["Bay 1", "EGT"],
        priority: "med",
        due: "Today",
        assignees: [{ name: "Owen Brackenridge" }],
      },
      {
        id: "j6",
        code: "JOB-2026-0420",
        title: "MX-5 NB track tip",
        sub: "Jeff Crowther · MX-NB",
        tags: ["Bay 3", "Single-out"],
        priority: "low",
        due: "Today",
        assignees: [{ name: "Mickey Pa'aga" }],
      },
    ],
  },
  {
    stage: "review",
    title: "Quality check",
    cards: [
      {
        id: "j7",
        code: "JOB-2026-0416",
        title: "LandCruiser 79 headers",
        sub: "Bondi Hardware · LCV-79",
        tags: ["Pacemaker", "5-into-1"],
        priority: "high",
        due: "Today",
        assignees: [{ name: "Mickey Pa'aga" }],
      },
      {
        id: "j8",
        code: "JOB-2026-0417",
        title: "BT-50 UR mid-mount",
        sub: "Kev Pomare · MX-UR",
        tags: ["Wigwam", "Sound check"],
        priority: "med",
        due: "Today",
        assignees: [{ name: "Owen Brackenridge" }],
      },
    ],
  },
  {
    stage: "done",
    title: "Handover",
    cards: [
      {
        id: "j9",
        code: "JOB-2026-0412",
        title: "Navara NP300 twin-tip",
        sub: "Jacqui Renton · NP-3T",
        tags: ["Paid", "ADR"],
        priority: "low",
        due: "Yesterday",
        assignees: [{ name: "Levi Tahau" }],
      },
      {
        id: "j10",
        code: "JOB-2026-0413",
        title: "VE Calais V dual exit",
        sub: "Mick Bracknell · CAL-V",
        tags: ["Paid", "Lambda"],
        priority: "low",
        due: "Yesterday",
        assignees: [{ name: "Owen Brackenridge" }],
      },
    ],
  },
]

export default function JobBoardScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.10 / Workshop scenes"
        title="Job board"
        description="Every active job on a single kanban surface — Backlog through Handover — so the floor lead can balance the day's bays at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Job board" },
        ]}
      />
      <section className={styles.canvas}>
        <JobBoard columns={columns} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Cards inherit priority tone from the dot indicator in the top right
            — red for must-finish-today, amber for medium, teal for low. The
            Quality check column is deliberately narrow — anything sitting
            there too long is a process smell.
          </p>
        </div>
      </section>
    </main>
  )
}
