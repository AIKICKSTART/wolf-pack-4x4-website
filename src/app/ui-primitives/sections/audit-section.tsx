import { SectionHeader, StatusPill, type AuditStatus } from "./section-shell"

import styles from "../ui-primitives.module.css"
import local from "./sections.module.css"

const statusClass: Record<AuditStatus, string> = {
  covered: local.auditCovered,
  new: local.auditNew,
  gap: local.auditGap,
}

type AuditItem = {
  source: string
  current: string
  status: AuditStatus
  note: string
}

const currentAudit: AuditItem[] = [
  {
    source: "Global marketing buttons",
    current: ".btn, .btn-red, .btn-chrome, .btn-ghost",
    status: "covered",
    note: "Used across the homepage, SEO pages, CMS shell, and quote CTAs.",
  },
  {
    source: "Base UI component primitives",
    current: "Button, Badge, Card, Dialog, Field, Input, Select, Sheet, Tabs",
    status: "covered",
    note: "Reusable TSX primitives exist, but were missing a visible inspection board.",
  },
  {
    source: "Site surfaces",
    current: ".glass, .neumo, .seo-card, .route-panel, .review-card",
    status: "covered",
    note: "Brand surfaces exist in global CSS and are now mirrored as dashboard samples.",
  },
  {
    source: "Parts lookup workflow",
    current: "search field, category filter, result card, empty state",
    status: "covered",
    note: "The production catalogue flow already contains strong domain primitives.",
  },
  {
    source: "Feedback primitives",
    current: "dialog and sheet components, no visible toast or skeleton board",
    status: "new",
    note: "Snackbar, progress, skeleton, and alert states are defined on this dashboard.",
  },
  {
    source: "Domain-specific primitives",
    current: "service cards and parts cards exist, quote/job primitives were implicit",
    status: "new",
    note: "Quote intake, vehicle fitment, booking slot, job status, and handover tiles are now inspectable.",
  },
]

export function AuditSection() {
  return (
    <section id="audit" className={styles.section}>
      <SectionHeader eyebrow="00 / Audit" title="Current primitive coverage">
        The existing website already has strong visual primitives, but several reusable
        application states were invisible before this board.
      </SectionHeader>

      <div className={styles.auditGrid}>
        {currentAudit.map((item) => (
          <article
            className={`${styles.auditItem} ${local.auditCard} ${statusClass[item.status]}`}
            key={item.source}
          >
            <div>
              <StatusPill status={item.status} />
              <h3>{item.source}</h3>
            </div>
            <code>{item.current}</code>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
