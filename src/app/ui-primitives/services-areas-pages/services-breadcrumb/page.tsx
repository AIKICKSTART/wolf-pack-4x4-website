import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServicesBreadcrumb } from "../../components/services-areas-pages"
import { DEMO_SERVICE_CRUMBS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Services breadcrumb | Services & areas | UI Primitives",
  description:
    "Services breadcrumb — Home / Services / Service trail without postcode badge.",
}

export default function ServicesBreadcrumbScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13"
        title="Services breadcrumb"
        description="Breadcrumb rendered at the top of services pages. Composes the primitives Breadcrumb primitive. Distinct from the locations breadcrumb because services crumbs never carry a postcode badge — labels and hrefs only."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Services breadcrumb" },
        ]}
      />
      <ServicesBreadcrumb crumbs={DEMO_SERVICE_CRUMBS} />
    </main>
  )
}
