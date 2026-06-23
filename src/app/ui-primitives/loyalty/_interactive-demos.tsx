"use client"

import { RedeemCtaButton } from "../components/loyalty/redeem-cta-button"

async function fakeSuccess(): Promise<{ success: boolean }> {
  await new Promise((resolve) => window.setTimeout(resolve, 900))
  return { success: true }
}

async function fakeFail(): Promise<{ success: boolean; message?: string }> {
  await new Promise((resolve) => window.setTimeout(resolve, 700))
  return { success: false, message: "Insufficient points" }
}

export function RedeemCtaButtonDemos() {
  return (
    <>
      <RedeemCtaButton label="Free dyno session" pointsCost={5000} onRedeem={fakeSuccess} />
      <RedeemCtaButton
        label="Pre-inspection waiver"
        pointsCost={2500}
        onRedeem={fakeFail}
        failureMessage="Not enough points - earn 320 more first"
      />
    </>
  )
}
