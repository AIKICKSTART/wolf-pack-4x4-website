import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RequestResponseInspector } from "../../components/api-console"
import { INSPECTOR_REQUEST, INSPECTOR_RESPONSE } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Request / response inspector | API Console",
  description:
    "Primitive 06 — split panel request / response inspector with headers tables, status chip, and JSON bodies.",
}

export default function RequestResponseInspectorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Inspector"
        title="Request / response inspector"
        description="A two-pane debug view — method chip, URL, full headers table and JSON body on the left for the request, status chip, duration, headers, and body on the right for the response. Stacks on smaller viewports."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Inspector" },
        ]}
      />
      <RequestResponseInspector request={INSPECTOR_REQUEST} response={INSPECTOR_RESPONSE} />
    </main>
  )
}
