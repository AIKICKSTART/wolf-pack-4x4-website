import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ArticleSurface,
  CalloutDanger,
  CalloutInfo,
  CalloutTip,
  CalloutWarning,
  DocBreadcrumb,
  DocSidebar,
  TableOfContents,
} from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Full article scene | UI Primitives — Help & Docs",
}

const sidebar = [
  {
    id: "getting-started",
    label: "Getting started",
    links: [
      { label: "Workshop overview", href: "/ui-primitives/help-docs/article" },
      { label: "Day-one onboarding", href: "/ui-primitives/help-docs/article" },
    ],
  },
  {
    id: "quoting",
    label: "Quoting workflow",
    links: [
      { label: "Inbound enquiry", href: "/ui-primitives/help-docs/article" },
      { label: "Custom catback flow", href: "/ui-primitives/help-docs/full-article-page" },
      { label: "Sign-off", href: "/ui-primitives/help-docs/article" },
    ],
  },
  {
    id: "workshop",
    label: "Workshop floor",
    links: [
      { label: "Bay assignments", href: "/ui-primitives/help-docs/article" },
      { label: "Sign-off checklist", href: "/ui-primitives/help-docs/article" },
    ],
  },
]

const toc = [
  { id: "fa-intro", label: "Why we built it", depth: 2 as const },
  { id: "fa-prep", label: "Before the customer arrives", depth: 2 as const },
  { id: "fa-prep-vehicle", label: "Vehicle profile", depth: 3 as const },
  { id: "fa-prep-stock", label: "Stock check", depth: 3 as const },
  { id: "fa-build", label: "Building the quote", depth: 2 as const },
  { id: "fa-handoff", label: "Workshop handoff", depth: 2 as const },
  { id: "fa-faq", label: "FAQ", depth: 2 as const },
]

export default function FullArticleScenePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 15"
        title="Full article scene"
        description="Composition that puts the docs primitives together — sidebar, breadcrumb, article surface, sticky TOC, and the four callouts working in concert."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Full article scene" },
        ]}
      />
      <section
        className={styles.canvas}
        aria-label="Full article scene demo"
        style={{ width: "min(100%, 1400px)" }}
      >
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            The real /help/[slug] page renders exactly this composition. This scene proves the
            primitives line up cleanly with no overlap or gap.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px minmax(0, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          <DocSidebar
            sections={sidebar}
            activeHref="/ui-primitives/help-docs/full-article-page"
          />
          <div style={{ display: "grid", gap: 18, minWidth: 0 }}>
            <DocBreadcrumb
              items={[
                { label: "Help", href: "/ui-primitives/help-docs" },
                { label: "Quoting workflow", href: "/ui-primitives/help-docs/help-center" },
                { label: "Custom catback flow" },
              ]}
            />
            <ArticleSurface
              title="Custom catback flow · twenty-minute quote target"
              category="Quoting workflow"
              author={{
                name: "Tom Halloran",
                role: "Workshop manager · Oak Flats",
                avatarInitials: "TH",
              }}
              publishedAt="11 May 2026"
              publishedIso="2026-05-11"
              updatedAt="24 May 2026"
              updatedIso="2026-05-24"
              readMinutes={6}
              toc={<TableOfContents items={toc} />}
            >
              <h2 id="fa-intro">Why we built it</h2>
              <p>
                The custom catback used to take two staff and forty-five minutes — one on the
                parts catalogue and another in the quote tool. This flow consolidates it.
              </p>
              <CalloutInfo title="Target outcome">
                <p>
                  A signed quote within twenty minutes of the customer arriving at the
                  workshop counter.
                </p>
              </CalloutInfo>
              <h2 id="fa-prep">Before the customer arrives</h2>
              <p>
                The counter staff prepare a vehicle profile and stock check before the
                customer walks in.
              </p>
              <h3 id="fa-prep-vehicle">Vehicle profile</h3>
              <p>
                Pull the vehicle into the workshop tool by rego. If it&apos;s a new vehicle,
                create the profile manually with VIN.
              </p>
              <CalloutTip title="Tip · rego lookup">
                <p>
                  Roads &amp; Maritime returns make and model only. Always confirm trim and
                  year directly with the customer.
                </p>
              </CalloutTip>
              <h3 id="fa-prep-stock">Stock check</h3>
              <p>
                Run the parts list through stock first. If anything is low, mark it ETA in the
                quote rather than promising a same-day fit.
              </p>
              <CalloutWarning title="Margin floor">
                <p>
                  Quotes below 28% margin will be blocked from save. Override requires
                  director sign-off in the audit log.
                </p>
              </CalloutWarning>
              <h2 id="fa-build">Building the quote</h2>
              <p>
                Start from the custom-catback preset. Add parts, then labour bands. Confirm
                the customer&apos;s signed Stripe deposit before workshop handoff.
              </p>
              <h2 id="fa-handoff">Workshop handoff</h2>
              <p>
                Once signed, the job moves to the workshop floor and gets a bay assignment.
                The bay supervisor confirms the parts ETA.
              </p>
              <CalloutDanger title="Do not bypass safety lockout">
                <p>
                  Never close out the catback job while the safety lockout is engaged. The
                  hoist must be cleared and the wheel chocks logged before sign-off.
                </p>
              </CalloutDanger>
              <h2 id="fa-faq">FAQ</h2>
              <ul>
                <li>Customer changes their mind mid-quote? Roll the quote to v2.</li>
                <li>Discount below margin? Director sign-off only.</li>
                <li>Quote validity? Fourteen calendar days.</li>
              </ul>
            </ArticleSurface>
          </div>
        </div>
      </section>
    </main>
  )
}
