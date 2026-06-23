"use client"

import { useMemo, useRef, useState } from "react"

import {
  BarcodeScannerCard,
  CartPanel,
  CustomerLookupCard,
  DailyTallyPanel,
  DiscountPicker,
  EftposTerminalPanel,
  ReceiptPreviewCard,
  RefundFlowCard,
  SplitTenderCard,
  TaxSummaryTile,
  VoidActionCard,
} from "../../components/pos-checkout"
import type {
  AbnDetails,
  DenominationCount,
  DiscountKind,
  PosCartLine,
  PosCustomer,
  QuickProduct,
  RefundCandidateItem,
  RefundMethod,
  RefundStep,
  SplitTenderEntry,
} from "../../components/pos-checkout"

import styles from "../pos-checkout.module.css"

const STEP_ORDER: ReadonlyArray<RefundStep> = [
  "select-items",
  "reason",
  "method",
  "confirm",
]

interface FullRegisterSceneProps {
  customer: PosCustomer
  quickProducts: ReadonlyArray<QuickProduct>
  discountReasons: ReadonlyArray<string>
  refundCandidates: ReadonlyArray<RefundCandidateItem>
  refundReasons: ReadonlyArray<string>
  couponOptions: ReadonlyArray<{ code: string; description: string; discount: number }>
  initialAbn: AbnDetails
  denominations: ReadonlyArray<DenominationCount>
}

const INITIAL_CART: ReadonlyArray<PosCartLine> = [
  {
    id: "manta-cb-25",
    sku: "MANTA-CB-25",
    title: "Manta 2.5\" Cat-Back · VF SS Ute",
    unitPrice: 1149.0,
    quantity: 1,
    note: "Aluminised · 6.0L",
  },
  {
    id: "pcmr-ext-30",
    sku: "PCMR-EXT-30",
    title: "Pacemaker Extractors · VT-VZ LS1",
    unitPrice: 689.0,
    quantity: 1,
  },
]

const INITIAL_TENDER: ReadonlyArray<SplitTenderEntry> = [
  { id: "split-cash", method: "cash", amount: 100.0 },
  { id: "split-card", method: "card", amount: 0.0 },
]

const EFTPOS_LOG: ReadonlyArray<string> = [
  "[13:42:12] PROMPT · Insert, tap or swipe",
  "[13:42:13] LINK · Bay 1 lane connected · Tyro 2.7.4",
]

const PIN_LENGTH = 4

export function FullRegisterScene({
  customer,
  quickProducts,
  discountReasons,
  refundCandidates,
  refundReasons,
  couponOptions,
  initialAbn,
  denominations,
}: FullRegisterSceneProps) {
  const [cart, setCart] = useState<ReadonlyArray<PosCartLine>>(INITIAL_CART)
  const [tender, setTender] = useState<ReadonlyArray<SplitTenderEntry>>(INITIAL_TENDER)
  const nextTenderId = useRef(1)
  const [discountKind, setDiscountKind] = useState<DiscountKind>("percent")
  const [discountPercent, setDiscountPercent] = useState(5)
  const [discountDollar, setDiscountDollar] = useState(0)
  const [discountCoupon, setDiscountCoupon] = useState("")
  const [discountReason, setDiscountReason] = useState<string | null>("Loyalty perk")
  const [abn, setAbn] = useState<AbnDetails>(initialAbn)
  const [pin, setPin] = useState("")
  const [pinError, setPinError] = useState<string | undefined>()
  const [drawerCounts, setDrawerCounts] =
    useState<ReadonlyArray<DenominationCount>>(denominations)
  const [refundStep, setRefundStep] = useState<RefundStep>("select-items")
  const [refundSelected, setRefundSelected] = useState<ReadonlyArray<string>>([])
  const [refundReason, setRefundReason] = useState<string | null>(null)
  const [refundMethod, setRefundMethod] = useState<RefundMethod | null>(null)

  const baseTotal = useMemo(
    () => cart.reduce((acc, line) => acc + line.unitPrice * line.quantity, 0),
    [cart],
  )
  const discountAmount = useMemo(() => {
    if (discountKind === "percent") {
      return Math.min(baseTotal, (baseTotal * discountPercent) / 100)
    }
    if (discountKind === "dollar") {
      return Math.min(baseTotal, discountDollar)
    }
    const matched = couponOptions.find((entry) => entry.code === discountCoupon)
    return matched ? Math.min(baseTotal, matched.discount) : 0
  }, [
    baseTotal,
    couponOptions,
    discountCoupon,
    discountDollar,
    discountKind,
    discountPercent,
  ])
  const totalDue = Math.max(0, baseTotal - discountAmount)

  const handleQuickAdd = (sku: string) => {
    const product = quickProducts.find((entry) => entry.sku === sku)
    if (!product) return
    setCart((current) => {
      const existing = current.find((line) => line.sku === sku)
      if (existing) {
        return current.map((line) =>
          line.sku === sku ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return [
        ...current,
        {
          id: `quick-${sku}-${current.length + 1}`,
          sku: product.sku,
          title: product.title,
          unitPrice: product.price,
          quantity: 1,
        },
      ]
    })
  }
  const handleManualScan = (sku: string) => handleQuickAdd(sku)

  const handleQuantity = (id: string, quantity: number) => {
    setCart((current) =>
      current.map((line) => (line.id === id ? { ...line, quantity } : line)),
    )
  }
  const handleRemove = (id: string) => {
    setCart((current) => current.filter((line) => line.id !== id))
  }

  const handleTenderAmount = (id: string, amount: number) => {
    setTender((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, amount } : entry)),
    )
  }
  const handleTenderMethod = (id: string, method: SplitTenderEntry["method"]) => {
    setTender((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, method } : entry)),
    )
  }
  const handleTenderRemove = (id: string) => {
    setTender((current) => current.filter((entry) => entry.id !== id))
  }
  const handleTenderAdd = () => {
    nextTenderId.current += 1
    const id = `split-add-${nextTenderId.current}`
    setTender((current) => [...current, { id, method: "card", amount: 0 }])
  }

  const handlePinDigit = (digit: string) => {
    setPinError(undefined)
    setPin((current) => (current.length >= PIN_LENGTH ? current : current + digit))
  }
  const handlePinBackspace = () => {
    setPinError(undefined)
    setPin((current) => current.slice(0, -1))
  }
  const handlePinCancel = () => {
    setPin("")
    setPinError(undefined)
  }
  const handlePinConfirm = () => {
    if (pin === "9081") {
      setPin("")
      setPinError(undefined)
      return
    }
    setPinError("Manager PIN incorrect — request Daniel")
  }

  const handleDrawerCount = (denomination: number, count: number) => {
    setDrawerCounts((current) =>
      current.map((entry) =>
        entry.denomination === denomination ? { ...entry, count } : entry,
      ),
    )
  }

  const handleRefundToggle = (id: string) => {
    setRefundSelected((current) =>
      current.includes(id) ? current.filter((token) => token !== id) : [...current, id],
    )
  }
  const handleRefundReason = (token: string) => setRefundReason(token)
  const handleRefundMethod = (token: RefundMethod) => setRefundMethod(token)
  const handleRefundNext = () => {
    const index = STEP_ORDER.indexOf(refundStep)
    if (index < STEP_ORDER.length - 1) {
      setRefundStep(STEP_ORDER[index + 1])
    }
  }
  const handleRefundBack = () => {
    const index = STEP_ORDER.indexOf(refundStep)
    if (index > 0) {
      setRefundStep(STEP_ORDER[index - 1])
    }
  }
  const handleRefundConfirm = () => {
    setRefundSelected([])
    setRefundReason(null)
    setRefundMethod(null)
    setRefundStep("select-items")
  }

  const receiptLines = cart.map((line) => ({
    id: line.id,
    title: line.title,
    sku: line.sku,
    quantity: line.quantity,
    unitPrice: line.unitPrice,
  }))
  const receiptTenders = tender.map((entry, index) => ({
    method: entry.method.toUpperCase() + (index === 0 ? " · drawer" : " · split"),
    amount: entry.amount,
  }))

  return (
    <>
      <section className={`${styles.stageFrame} ${styles.registerHeader}`}>
        <span className={styles.stageCaption}>Bay 1 · register live · Mia counter / Daniel manager</span>
        <span className={styles.stageCaption}>ABN 12 345 678 901 · Tyro TYRO-OFM-01</span>
      </section>

      <div className={styles.registerLayout}>
        <div className={styles.registerColumn}>
          <BarcodeScannerCard
            status="active"
            message="Cat-back boxes scanned · ready for next SKU"
            recentSkus={cart.map((line) => line.sku)}
            onManualScan={handleManualScan}
          />
          <CartPanel
            lines={cart}
            onQuantityChange={handleQuantity}
            onRemove={handleRemove}
          />
          <DiscountPicker
            baseTotal={baseTotal}
            kind={discountKind}
            percentValue={discountPercent}
            dollarValue={discountDollar}
            couponCode={discountCoupon}
            coupons={couponOptions}
            reasons={discountReasons}
            reason={discountReason}
            onKindChange={setDiscountKind}
            onPercentChange={setDiscountPercent}
            onDollarChange={setDiscountDollar}
            onCouponChange={setDiscountCoupon}
            onReasonChange={setDiscountReason}
          />
          <TaxSummaryTile
            totalIncGst={totalDue}
            abn={abn}
            onAbnChange={setAbn}
          />
        </div>
        <div className={styles.registerColumn}>
          <CustomerLookupCard
            initialMode="phone"
            initialQuery={customer.phone}
            match={customer}
          />
          <SplitTenderCard
            total={totalDue}
            entries={tender}
            onEntryChange={handleTenderAmount}
            onMethodChange={handleTenderMethod}
            onRemove={handleTenderRemove}
            onAdd={handleTenderAdd}
          />
          <EftposTerminalPanel
            provider="tyro"
            amount={totalDue}
            status="waiting"
            messages={EFTPOS_LOG}
          />
          <VoidActionCard
            transactionRef="OFM-30418"
            operator="Mia"
            amount={totalDue}
            pin={pin}
            pinLength={PIN_LENGTH}
            errorMessage={pinError}
            onDigit={handlePinDigit}
            onBackspace={handlePinBackspace}
            onCancel={handlePinCancel}
            onConfirm={handlePinConfirm}
          />
        </div>
      </div>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Refund desk · Daniel</span>
        <RefundFlowCard
          receiptNumber="OFM-30418"
          items={refundCandidates}
          selectedItemIds={refundSelected}
          reasons={refundReasons}
          reason={refundReason}
          method={refundMethod}
          step={refundStep}
          onToggleItem={handleRefundToggle}
          onReasonSelect={handleRefundReason}
          onMethodSelect={handleRefundMethod}
          onNext={handleRefundNext}
          onBack={handleRefundBack}
          onConfirm={handleRefundConfirm}
        />
      </section>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>End of day · Bay 1 drawer reconciliation</span>
        <DailyTallyPanel
          mode="close"
          drawerLabel="Bay 1 drawer"
          operator="Daniel"
          denominations={drawerCounts}
          systemAmount={totalDue + 420.0}
          onCountChange={handleDrawerCount}
        />
      </section>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Customer-facing receipt · A6 preview</span>
        <ReceiptPreviewCard
          receiptNumber="OFM-30418"
          issuedLabel="29 May 2026 · 13:42"
          operator="Mia"
          customerNote={`${customer.name} · ${customer.tier.toUpperCase()}`}
          lines={receiptLines}
          tenders={receiptTenders}
        />
      </section>
    </>
  )
}
