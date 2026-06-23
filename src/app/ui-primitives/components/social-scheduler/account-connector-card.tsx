"use client"

import { RefreshCw } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type { ConnectedAccount, SocialPlatform, PlatformDescriptor } from "./social-scheduler-types"

interface AccountConnectorCardProps {
  account: ConnectedAccount
  platform: PlatformDescriptor
  onRetry?: (accountId: string) => void
}

const PLATFORM_CLASS: Record<SocialPlatform, string> = {
  instagram: styles.platformInstagram,
  facebook: styles.platformFacebook,
  tiktok: styles.platformTiktok,
  x: styles.platformX,
  linkedin: styles.platformLinkedin,
  youtube: styles.platformYoutube,
  threads: styles.platformThreads,
  bluesky: styles.platformBluesky,
}

const STATUS_LABEL: Record<ConnectedAccount["status"], string> = {
  connected: "Live",
  expiring: "Token expiring",
  expired: "Reconnect required",
  error: "Sync error",
  reconnecting: "Reconnecting…",
}

function formatFollowers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("en-AU", { day: "2-digit", month: "short" })
}

export function AccountConnectorCard({
  account,
  platform,
  onRetry,
}: AccountConnectorCardProps) {
  const showRetry =
    account.status === "expired" ||
    account.status === "error" ||
    account.status === "expiring"

  return (
    <article
      className={`${styles.frame} ${styles.accountCard} ${PLATFORM_CLASS[account.platform]}`}
      aria-label={`${platform.label} account ${account.handle}, status ${STATUS_LABEL[account.status]}`}
    >
      <header className={styles.accountCardHead}>
        <span className={styles.accountCardMark} aria-hidden="true">
          {platform.mark}
        </span>
        <div className={styles.accountCardMeta}>
          <h3 className={styles.accountCardDisplay}>{account.displayName}</h3>
          <span className={styles.accountCardHandle}>{account.handle}</span>
        </div>
        <span
          className={styles.accountCardStatus}
          data-state={account.status}
          aria-live="polite"
        >
          <span className={styles.accountCardStatusDot} aria-hidden="true" />
          {STATUS_LABEL[account.status]}
        </span>
      </header>

      <div className={styles.accountCardStats}>
        <div className={styles.accountCardStat}>
          <span className={styles.accountCardStatLabel}>Followers</span>
          <span className={styles.accountCardStatValue}>
            {formatFollowers(account.followerCount)}
          </span>
        </div>
        <div className={styles.accountCardStat}>
          <span className={styles.accountCardStatLabel}>Last sync</span>
          <span className={styles.accountCardStatValue}>
            {formatDate(account.lastSyncedAt)}
          </span>
        </div>
        <div className={styles.accountCardStat}>
          <span className={styles.accountCardStatLabel}>Token expires</span>
          <span className={styles.accountCardStatValue}>
            {formatDate(account.expiresAt)}
          </span>
        </div>
      </div>

      <footer className={styles.accountCardFooter}>
        <div
          className={styles.accountCardScopes}
          aria-label="OAuth scopes"
        >
          {account.scopes.map((scope) => (
            <span key={scope} className={styles.accountCardScope}>
              {scope}
            </span>
          ))}
        </div>
        {showRetry && (
          <button
            type="button"
            className={styles.accountCardRetry}
            onClick={() => onRetry?.(account.id)}
            aria-label={`Reconnect ${platform.label} account`}
          >
            <RefreshCw size={12} aria-hidden="true" /> Reconnect
          </button>
        )}
      </footer>
    </article>
  )
}

export default AccountConnectorCard
