"use client"

import {
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  PackageCheck,
  Share2,
  Truck,
} from "lucide-react"
import { useEffect, useState } from "react"

import { Chip } from "../primitives/chip"
import { PriceTag } from "../commerce/price-tag"

import type { OrderConfirmation } from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./order-confirmation-card.module.css"

interface OrderConfirmationCardProps {
  confirmation: OrderConfirmation
  currency?: string
  locale?: string
  onTrack?: (url: string) => void
  onShare?: () => void
  onEmail?: (email: string) => void
}

export function OrderConfirmationCard({
  confirmation,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  onTrack,
  onShare,
  onEmail,
}: OrderConfirmationCardProps) {
  const [copied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    if (!copied) {
      return undefined
    }
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(confirmation.orderNumber)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className={styles.card} aria-labelledby="ocf-title">
      <div className={styles.beam} aria-hidden="true" />
      <header className={styles.head}>
        <span className={styles.check}>
          <CheckCircle2 size={36} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className={styles.kicker}>Order confirmed</span>
        <h1 id="ocf-title" className={styles.title}>
          Cheers {confirmation.customerName.split(" ")[0]}, your order is in
        </h1>
        <p className={styles.subhead}>
          Receipt sent to <strong>{confirmation.email}</strong>. We&apos;ll text once
          the freight is on the truck.
        </p>
      </header>

      <div className={styles.orderRow}>
        <div className={styles.orderBlock}>
          <span className={styles.label}>Order number</span>
          <div className={styles.orderNumberRow}>
            <strong className={styles.orderNumber}>{confirmation.orderNumber}</strong>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={copyOrderNumber}
              aria-label="Copy order number"
            >
              <Copy size={12} aria-hidden="true" />
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <span className={styles.label}>Placed {confirmation.placedAtLabel}</span>
        </div>

        <div className={styles.orderBlock}>
          <span className={styles.label}>Payment</span>
          <strong className={styles.payMethod}>
            {confirmation.paymentBrand}
            {confirmation.paymentLast4 ? ` ···· ${confirmation.paymentLast4}` : ""}
          </strong>
          <Chip label="Captured" tone="green" />
        </div>

        <div className={styles.orderBlock}>
          <span className={styles.label}>Items / total</span>
          <strong className={styles.itemsCount}>{confirmation.itemsCount} items</strong>
          <PriceTag
            amount={confirmation.total}
            currency={currency}
            locale={locale}
            size="md"
          />
        </div>
      </div>

      <div className={styles.etaRow}>
        <div className={styles.etaBlock}>
          <Truck size={18} aria-hidden="true" className={styles.etaIcon} />
          <div>
            <span className={styles.label}>Shipping</span>
            <strong className={styles.etaValue}>{confirmation.freightLabel}</strong>
          </div>
        </div>
        <div className={styles.etaBlock}>
          <PackageCheck size={18} aria-hidden="true" className={styles.etaIcon} />
          <div>
            <span className={styles.label}>Estimated delivery</span>
            <strong className={styles.etaValue}>{confirmation.etaLabel}</strong>
          </div>
        </div>
        <div className={styles.etaBlock}>
          <MapPin size={18} aria-hidden="true" className={styles.etaIcon} />
          <div>
            <span className={styles.label}>Pick-up</span>
            <strong className={styles.etaValue}>Albion Park Bay 1 ready in 2 hrs</strong>
          </div>
        </div>
      </div>

      <footer className={styles.actions}>
        {confirmation.trackingUrl && (
          <button
            type="button"
            className={styles.trackBtn}
            onClick={() => onTrack?.(confirmation.trackingUrl ?? "#")}
          >
            <Truck size={14} aria-hidden="true" /> Track order
          </button>
        )}
        <button
          type="button"
          className={styles.shareBtn}
          onClick={onShare}
        >
          <Share2 size={14} aria-hidden="true" /> Share build
        </button>
        <button
          type="button"
          className={styles.emailBtn}
          onClick={() => onEmail?.(confirmation.email)}
        >
          <Mail size={14} aria-hidden="true" /> Email receipt again
        </button>
      </footer>
    </article>
  )
}

export default OrderConfirmationCard
