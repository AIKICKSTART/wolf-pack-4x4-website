import type { Metadata } from "next"

import { FeatureGatePreview } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Feature gate preview | Feature flags",
  description:
    "Primitive 14 — mock surface showing the variant a user with given attributes would actually receive.",
}

export default function FeatureGatePreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Preview"
        title="Feature gate preview"
        description="Quick-look preview surface that answers 'what would this specific user actually experience?'. Takes attribute key/value pairs (user id, workspace, role, geo, device, app version) plus the resolved variant + reason and renders a small 'you would see…' surface stub composed inside the card."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Feature gate preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · two preview cards</span>
        <div className={styles.demoSplit}>
          <FeatureGatePreview
            flagName="quote-instant-pricing"
            variantTone="amber"
            resolvedVariant="Live preview"
            reason="Matches workspace = oak-flats (in NSW beta audience)"
            attributes={[
              { label: "user.id", value: "usr_72bf3a" },
              { label: "user.role", value: "service-advisor" },
              { label: "workspace", value: "oak-flats" },
              { label: "geo", value: "AU-NSW" },
              { label: "app.version", value: "4.6.2" },
            ]}
          >
            <span>Quote total updates each time you edit a line — no save needed.</span>
            <span>Price diff vs last save shown to the right of every row.</span>
          </FeatureGatePreview>
          <FeatureGatePreview
            flagName="parts-3d-viewer"
            variantTone="teal"
            resolvedVariant="3D viewer"
            reason="Bucketed via stickyId hash → variant B"
            attributes={[
              { label: "user.id", value: "usr_9aa201" },
              { label: "workspace", value: "wollongong-east" },
              { label: "device", value: "ios" },
              { label: "geo", value: "AU-NSW" },
            ]}
          >
            <span>Part detail opens the rotatable 3D viewer instead of the carousel.</span>
            <span>Pinch / drag to inspect. AR overlay button hidden for this variant.</span>
          </FeatureGatePreview>
        </div>
      </section>
    </main>
  )
}
