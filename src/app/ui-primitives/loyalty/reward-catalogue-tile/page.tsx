import type { Metadata } from "next"

import { RewardCatalogueTile } from "../../components/loyalty/reward-catalogue-tile"
import { PageHeader } from "../../components/page-header"

import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Reward catalogue tile | Loyalty | UI Primitives",
  description:
    "Single redeemable reward tile — thumbnail, name, points cost, stock chip, redeem CTA. Mufflermen rewards from dyno sessions to branded merch.",
}

export default function RewardCatalogueTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 05"
        title="Reward catalogue tile"
        description="Five reward tiles covering the full Mufflermen catalogue — dyno session, exhaust discount, pre-inspection waiver, Bay 2 priority, branded merch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Reward catalogue tile" },
        ]}
      />
      <section className={[styles.sceneShell, styles.rewardGrid].join(" ")}>
        <RewardCatalogueTile
          reward="free-dyno"
          pointsCost={5000}
          stock="in-stock"
          blurb="One-hour Bay 2 dyno run, printed run sheet."
        />
        <RewardCatalogueTile
          reward="exhaust-discount"
          pointsCost={3000}
          stock="in-stock"
          blurb="10% off Manta / X-Force / Genie cat-back."
        />
        <RewardCatalogueTile
          reward="inspection-waiver"
          pointsCost={2500}
          stock="low-stock"
          blurb="Skip the rego pre-inspection charge."
        />
        <RewardCatalogueTile
          reward="priority-bay"
          pointsCost={4500}
          stock="in-stock"
          blurb="First slot Monday morning, Bay 2 only."
        />
        <RewardCatalogueTile
          reward="branded-merch"
          pointsCost={1800}
          stock="sold-out"
          blurb="Cap + sticker pack + workshop tee."
          affordable
        />
        <RewardCatalogueTile
          reward="service-credit"
          pointsCost={8000}
          stock="in-stock"
          affordable={false}
          blurb="$200 workshop service credit — paid for in points."
        />
      </section>
    </main>
  )
}
