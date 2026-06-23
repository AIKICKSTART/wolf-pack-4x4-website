import type { Metadata } from "next"

import { AffiliatePayoutHistory } from "../../components/loyalty/affiliate-payout-history"
import { BirthdayRewardCard } from "../../components/loyalty/birthday-reward-card"
import { LoyaltyCard } from "../../components/loyalty/loyalty-card"
import { MemberMilestoneCelebration } from "../../components/loyalty/member-milestone-celebration"
import { MembershipRenewalBanner } from "../../components/loyalty/membership-renewal-banner"
import { PointsEarningRow } from "../../components/loyalty/points-earning-row"
import { ReferralLeaderboard } from "../../components/loyalty/referral-leaderboard"
import { ReferralLinkGenerator } from "../../components/loyalty/referral-link-generator"
import { RewardCatalogueTile } from "../../components/loyalty/reward-catalogue-tile"
import { TierBenefitsCard } from "../../components/loyalty/tier-benefits-card"
import { TierProgressMeter } from "../../components/loyalty/tier-progress-meter"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_BENEFITS, SAMPLE_LEADERBOARD, SAMPLE_LEDGER, SAMPLE_MEMBER, SAMPLE_PAYOUTS } from "../fixtures"
import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Full member portal | Loyalty | UI Primitives",
  description:
    "Bonus composition — full Mufflermen member portal scene combining the loyalty card, tier progress, benefits, rewards catalogue, ledger, referrals, leaderboard, payouts, renewal banner, milestone, and birthday reward.",
}

export default function FullMemberPortalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus scene"
        title="Full member portal"
        description="Eleven loyalty primitives composed into one member-portal layout. Renewal banner up top, card + tier progress + benefits in the rail, ledger and rewards in the main column, referrals and payouts below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Full member portal" },
        ]}
      />

      <div className={styles.portalBanner}>
        <MembershipRenewalBanner
          daysRemaining={12}
          planLabel={`Mufflermen ${SAMPLE_MEMBER.tier === "platinum" ? "Platinum" : "Brodie"}`}
          renewHref="#renew"
          autoRenewInitial={false}
        />
      </div>

      <div className={styles.portalLayout}>
        <aside className={styles.portalLeft}>
          <LoyaltyCard
            memberName={SAMPLE_MEMBER.name}
            memberId={SAMPLE_MEMBER.id}
            tier={SAMPLE_MEMBER.tier}
            pointsBalance={SAMPLE_MEMBER.pointsBalance}
            memberSinceISO={SAMPLE_MEMBER.memberSinceISO}
            tone="obsidian"
          />
          <TierProgressMeter
            currentTier={SAMPLE_MEMBER.tier}
            points={SAMPLE_MEMBER.pointsBalance}
            nextBenefitPreview="Bay 2 mates lounge access"
          />
          <BirthdayRewardCard
            memberName={SAMPLE_MEMBER.name}
            bonusPoints={1000}
          />
        </aside>

        <div className={styles.portalRight}>
          <MemberMilestoneCelebration
            kind="referral-streak"
            headline="Five mates referred in a row"
            detail="Brodie sent us four winners through this fortnight. Streak bonus credited to your wallet."
            earnedRewardLabel="+1,800 pts streak bonus"
          />

          <section className={styles.sceneShell}>
            <h2 className={styles.sceneHeading}>Tier benefits</h2>
            <TierBenefitsCard
              tier={SAMPLE_MEMBER.tier}
              benefits={SAMPLE_BENEFITS}
              upgradeHref="#upgrade"
              upgradeLabel="Push to Brodie tier"
            />
          </section>

          <section className={styles.sceneShell}>
            <h2 className={styles.sceneHeading}>Reward catalogue</h2>
            <div className={styles.rewardGrid}>
              <RewardCatalogueTile
                reward="free-dyno"
                pointsCost={5000}
                stock="in-stock"
                blurb="One-hour Bay 2 dyno session."
              />
              <RewardCatalogueTile
                reward="exhaust-discount"
                pointsCost={3000}
                stock="in-stock"
                blurb="10% off next cat-back system."
              />
              <RewardCatalogueTile
                reward="inspection-waiver"
                pointsCost={2500}
                stock="low-stock"
                blurb="Skip rego pre-inspection charge."
              />
              <RewardCatalogueTile
                reward="branded-merch"
                pointsCost={1800}
                stock="in-stock"
                blurb="Cap + sticker + tee bundle."
              />
            </div>
          </section>

          <section className={styles.sceneShell}>
            <h2 className={styles.sceneHeading}>Recent activity</h2>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SAMPLE_LEDGER.map((row) => (
                <PointsEarningRow
                  key={row.id}
                  timestamp={row.timestamp}
                  action={row.action}
                  detail={row.detail}
                  points={row.points}
                  kind={row.kind}
                />
              ))}
            </ol>
          </section>

          <section className={styles.sceneShell}>
            <h2 className={styles.sceneHeading}>Refer a mate</h2>
            <ReferralLinkGenerator
              referralUrl={SAMPLE_MEMBER.referralUrl}
              referralCode={SAMPLE_MEMBER.referralCode}
              rewardCopy="$25 workshop credit for both of you"
            />
          </section>

          <section className={styles.sceneShell}>
            <h2 className={styles.sceneHeading}>Leaderboard + payouts</h2>
            <div className={styles.sceneRow}>
              <ReferralLeaderboard
                rows={SAMPLE_LEADERBOARD.slice(0, 5)}
                caption="Top referrers"
                period="May 2026"
              />
              <AffiliatePayoutHistory
                rows={SAMPLE_PAYOUTS.slice(0, 5)}
                caption="Recent payouts"
                period="Last 90 days"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
