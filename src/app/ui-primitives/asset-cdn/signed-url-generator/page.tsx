import type { Metadata } from "next"

import { SignedUrlGenerator } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_SIGNED_URL_CONFIG } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Signed URL generator | Asset CDN",
  description: "Primitive 03 — signed URL builder with resource path, TTL, algorithm, scope, and copy.",
}

export default function SignedUrlGeneratorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Signed URL generator"
        title="Signed URL generator"
        description="Build a time-bound URL the way Cloudflare Image Resizing wants it. Resource path, TTL preset, algorithm toggle, optional scope, then a copyable preview with the signature truncated. The actual signature uses a deterministic mock — never wired to a real secret."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Signed URL generator" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · interactive</span>
        <SignedUrlGenerator defaultConfig={DEMO_SIGNED_URL_CONFIG} />
      </section>
    </main>
  )
}
