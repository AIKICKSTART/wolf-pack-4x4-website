import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FaviconPreview } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Favicon preview | Branding Lab",
  description:
    "Primitive 09 — tab strip preview + 16, 32, 180, 192 favicon sizes side by side.",
}

export default function FaviconPreviewPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Favicon"
        title="Favicon preview"
        description="A tab-strip preview pairs with every favicon size — 16 and 32 for browser chrome, 180 for iOS, 192 for Android home screens. The mark redraws for each pixel grid."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Favicon preview" },
        ]}
      />
      <FaviconPreview
        title="Oak Flats Mufflermen — Service Workshop"
        url="https://mufflermen.com.au"
      />
    </main>
  )
}
