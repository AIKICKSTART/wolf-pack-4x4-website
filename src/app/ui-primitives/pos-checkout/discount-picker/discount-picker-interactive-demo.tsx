"use client"

import { useState } from "react"

import { DiscountPicker } from "../../components/pos-checkout"
import type { DiscountKind } from "../../components/pos-checkout"

interface DiscountPickerInteractiveDemoProps {
  baseTotal: number
  initialKind?: DiscountKind
  initialPercent?: number
  initialDollar?: number
  initialCoupon?: string
  initialReason?: string
  reasons: ReadonlyArray<string>
  coupons: ReadonlyArray<{ code: string; description: string; discount: number }>
}

export function DiscountPickerInteractiveDemo({
  baseTotal,
  initialKind = "percent",
  initialPercent = 0,
  initialDollar = 0,
  initialCoupon = "",
  initialReason,
  reasons,
  coupons,
}: DiscountPickerInteractiveDemoProps) {
  const [kind, setKind] = useState<DiscountKind>(initialKind)
  const [percent, setPercent] = useState(initialPercent)
  const [dollar, setDollar] = useState(initialDollar)
  const [coupon, setCoupon] = useState(initialCoupon)
  const [reason, setReason] = useState<string | null>(initialReason ?? null)

  return (
    <DiscountPicker
      baseTotal={baseTotal}
      kind={kind}
      percentValue={percent}
      dollarValue={dollar}
      couponCode={coupon}
      coupons={coupons}
      reasons={reasons}
      reason={reason}
      onKindChange={setKind}
      onPercentChange={setPercent}
      onDollarChange={setDollar}
      onCouponChange={setCoupon}
      onReasonChange={setReason}
    />
  )
}
