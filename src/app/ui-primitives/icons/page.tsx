import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import mainStyles from "../ui-primitives.module.css"

import { IconsHubClient } from "./_icons-hub-client"
import styles from "./icons-hub.module.css"

export const metadata: Metadata = {
  title: "Icons | UI Primitives",
  description:
    "Premium Carbon and Red icon language, supplier-logo treatment, sizing, wells, strokes, labels, and downstream usage rules for Oak Flats Mufflermen UI primitives.",
}

export default function IconsPage() {
  return (
    <main className={`${mainStyles.main} ${styles.hub}`}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Icon Library"
        description="Premium Carbon & Red raster-wrapped SVG icons and source-backed supplier logos. The older standard automotive, comms, CMS, ops, social, and brand-logo families are removed from this surface so product work pulls from the premium library first."
        dnaSectionId="icons"
      />
      <IconsHubClient />
    </main>
  )
}
