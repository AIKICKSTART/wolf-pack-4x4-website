import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../../ui-primitives.module.css"
import { SectionLibraryShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Section library — Content | UI Primitives",
  description:
    "Six production-ready Oak Flats Mufflermen page sections — blog feature, FAQ accordion, contact & enquiry, local-SEO suburb, parts & product, and a cinematic video hero. Each is composed only from existing primitives, fully token-driven, and ships a BlockManifest so the CMS canvas can drag it. Preview each at mobile, tablet, and desktop in light or dark.",
}

export default function SectionLibraryContentPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Section library / Content"
        title="Content sections"
        description="Six reusable Mufflermen page sections composed from the primitive system — blog, FAQ, contact, local-SEO suburb, parts, and video hero. Token-driven, light/dark, responsive 320 → 1920, and draggable in the CMS via their BlockManifests."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Section library" },
          { label: "Content" },
        ]}
      />
      <SectionLibraryShowcase />
    </main>
  )
}
