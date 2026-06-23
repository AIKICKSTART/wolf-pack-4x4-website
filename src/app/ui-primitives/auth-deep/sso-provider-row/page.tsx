import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SsoProviderRow } from "../../components/auth-deep"

import { SSO_ROWS } from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "SSO provider row | Auth deep",
  description:
    "Primitive 02 — SSO provider row with status, JIT toggle, masked client ID and configure/sync actions.",
}

export default function SsoProviderRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / SSO"
        title="SSO provider row"
        description="Identity-provider row across Google Workspace, Okta and Entra ID — masked client IDs, sync recency and error briefs render in line."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "SSO provider row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Active · Google Workspace mufflermen.com.au</span>
        <SsoProviderRow {...SSO_ROWS[0]} />

        <span className={styles.stageCaption}>Draft · Entra ID for Pacemaker partner tenant</span>
        <SsoProviderRow {...SSO_ROWS[1]} />

        <span className={styles.stageCaption}>Error · expired SCIM token on Okta</span>
        <SsoProviderRow {...SSO_ROWS[2]} />

        <span className={styles.stageCaption}>Not configured · custom SAML placeholder</span>
        <SsoProviderRow {...SSO_ROWS[3]} />
      </section>
    </main>
  )
}
