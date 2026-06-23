import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CoBrowsingScreenViewer } from "../../components/live-chat"

import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Co-browsing screen viewer | Live chat",
  description:
    "Primitive 06 — mock browser frame showing what the visitor sees, with an animated pointer indicator and request-control CTA.",
}

export default function CoBrowsingScreenViewerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Co-browse"
        title="Co-browsing screen viewer"
        description="A read-only view of the visitor's browser tab. Mock browser chrome (window dots, URL bar, tab strip) frames a low-fidelity canvas that hints at the page layout. An animated pointer pings the area the visitor is currently looking at. The Request control CTA escalates from view-only to assisted browsing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Co-browsing screen viewer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · oakflatsmuffler.com.au · Manta cat-back PDP
        </span>
        <CoBrowsingScreenViewer
          hostname="oakflatsmuffler.com.au"
          path="/parts/manta-3in-cat-back/hilux-n80-long-range"
          pageTitle="Manta 3in cat-back · high-clearance"
          priceLabel="$1,695 AUD"
          tabCount={3}
        />
      </section>
    </main>
  )
}
