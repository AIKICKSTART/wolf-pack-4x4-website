"use client"

import { Mail, MessageSquare, Share2 } from "lucide-react"
import { useCallback } from "react"

import { InlineCopyButton } from "../dev-experience/inline-copy-button"
import { QrBlock } from "../print-docs/qr-block"
import { Chip } from "../primitives/chip"

import styles from "./referral-link-generator.module.css"

interface ReferralLinkGeneratorProps {
  /** Full URL the member can share. */
  referralUrl: string
  /** Short referral code for telephone/in-shop redemption. */
  referralCode: string
  /** Optional reward chip — e.g. "$25 for both of you". */
  rewardCopy?: string
  /** Optional callback when share-via-email is clicked (fires `mailto:` by default). */
  onShareEmail?: (url: string) => void
  /** Optional callback when share-via-sms is clicked (fires `sms:` by default). */
  onShareSms?: (url: string) => void
  className?: string
}

export function ReferralLinkGenerator({
  referralUrl,
  referralCode,
  rewardCopy = "$25 in workshop credit for both of you",
  onShareEmail,
  onShareSms,
  className,
}: ReferralLinkGeneratorProps) {
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  const handleEmail = useCallback(() => {
    if (onShareEmail) {
      onShareEmail(referralUrl)
      return
    }
    if (typeof window !== "undefined") {
      const subject = encodeURIComponent("Get the Mufflermen workshop on your side")
      const body = encodeURIComponent(
        `Hey — try Oak Flats Mufflermen with my referral link:\n${referralUrl}\n\nCode: ${referralCode}`,
      )
      window.location.href = `mailto:?subject=${subject}&body=${body}`
    }
  }, [onShareEmail, referralCode, referralUrl])

  const handleSms = useCallback(() => {
    if (onShareSms) {
      onShareSms(referralUrl)
      return
    }
    if (typeof window !== "undefined") {
      const body = encodeURIComponent(
        `Mufflermen Oak Flats — use my referral: ${referralUrl} (code ${referralCode})`,
      )
      window.location.href = `sms:?&body=${body}`
    }
  }, [onShareSms, referralCode, referralUrl])

  return (
    <section
      className={classes}
      role="region"
      aria-label="Referral link generator"
    >
      <div className={styles.head}>
        <span className={styles.kicker}>Refer a mate</span>
        <h3 className={styles.title}>Share your line, earn together</h3>
        <Chip label={rewardCopy} tone="amber" />
      </div>

      <div className={styles.linkRow}>
        <span className={styles.linkLabel}>Referral link</span>
        <InlineCopyButton
          value={referralUrl}
          label={referralUrl.replace(/^https?:\/\//, "")}
          className={styles.copy}
        />
      </div>

      <div className={styles.linkRow}>
        <span className={styles.linkLabel}>Code</span>
        <InlineCopyButton value={referralCode} className={styles.copy} />
      </div>

      <div className={styles.shareRow}>
        <button type="button" className={styles.shareButton} onClick={handleEmail}>
          <Mail size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>Email</span>
        </button>
        <button type="button" className={styles.shareButton} onClick={handleSms}>
          <MessageSquare size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>SMS</span>
        </button>
        <a
          className={styles.shareButton}
          href={referralUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Share2 size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>Open</span>
        </a>
      </div>

      <div className={styles.qrRow}>
        <QrBlock value={referralUrl} label={referralCode} size={144} />
        <p className={styles.qrCopy}>
          Show this QR in-bay at Oak Flats — Stuart scans it on the floor tablet to claim the bonus.
        </p>
      </div>
    </section>
  )
}

export default ReferralLinkGenerator
