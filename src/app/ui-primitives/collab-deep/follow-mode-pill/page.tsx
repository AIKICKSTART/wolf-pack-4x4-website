import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FollowModePill } from "../../components/collab-deep"

import { USER_DANIEL, USER_MIA, USER_TIM } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Follow mode pill | Collab deep",
  description:
    "Primitive 08 — floating 'Following Mia P.' pill with a stop-following affordance.",
}

export default function FollowModePillPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Follow"
        title="Follow mode pill"
        description="Floating pill that tells the viewer they are following another collaborator. Includes a pulsing eye glyph, the followed user's avatar, an optional sub-detail, and a Stop action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Follow mode pill" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Following Mia · cursor tracking</span>
        <FollowModePill user={USER_MIA} detail="tracking cursor" />

        <span className={styles.stageCaption}>Following Tim · price field</span>
        <FollowModePill user={USER_TIM} detail="Price · A$ 1,485" />

        <span className={styles.stageCaption}>Following Daniel · no detail</span>
        <FollowModePill user={USER_DANIEL} />
      </section>
    </main>
  )
}
