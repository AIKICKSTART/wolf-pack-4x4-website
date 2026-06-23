"use client"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { SegmentChip } from "./segment-chip"
import type { CustomerSegment, CustomerStatus } from "./crm-types"
import styles from "./customer-card.module.css"

export interface CustomerCardAction {
  label: string
  variant?: "primary" | "ghost"
  href?: string
  onClick?: () => void
}

interface CustomerCardProps {
  id: string
  name: string
  phone: string
  email: string
  suburb: string
  avatarSrc?: string
  status?: CustomerStatus
  segment?: CustomerSegment
  lifetimeValue: string
  lastContact: string
  lastContactIso?: string
  actions?: ReadonlyArray<CustomerCardAction>
  className?: string
}

const STATUS_LABEL: Record<CustomerStatus, string> = {
  active: "Active",
  lapsed: "Lapsed",
  prospect: "Prospect",
  vip: "VIP",
}

const STATUS_TONE: Record<CustomerStatus, "green" | "amber" | "teal" | "red"> = {
  active: "green",
  lapsed: "amber",
  prospect: "teal",
  vip: "red",
}

export function CustomerCard({
  id,
  name,
  phone,
  email,
  suburb,
  avatarSrc,
  status = "active",
  segment,
  lifetimeValue,
  lastContact,
  lastContactIso,
  actions,
  className,
}: CustomerCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-customer-id={id}
      aria-label={`Customer profile: ${name}`}
    >
      <header className={styles.head}>
        <Avatar name={name} src={avatarSrc} size="lg" tone="red" />
        <div className={styles.identity}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.suburb}>{suburb}</span>
        </div>
        <div className={styles.chips}>
          <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
          {segment ? <SegmentChip segment={segment} /> : null}
        </div>
      </header>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
          </dd>
        </div>
        <div className={styles.fact}>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${email}`}>{email}</a>
          </dd>
        </div>
        <div className={styles.fact}>
          <dt>Lifetime value</dt>
          <dd className={styles.ltv}>{lifetimeValue}</dd>
        </div>
        <div className={styles.fact}>
          <dt>Last contact</dt>
          <dd>
            <time dateTime={lastContactIso ?? lastContact}>{lastContact}</time>
          </dd>
        </div>
      </dl>

      {actions && actions.length > 0 ? (
        <footer className={styles.actions}>
          {actions.map((action) => {
            const cls =
              action.variant === "ghost"
                ? styles.actionGhost
                : styles.actionPrimary
            if (action.href) {
              return (
                <a key={action.label} href={action.href} className={cls}>
                  {action.label}
                </a>
              )
            }
            return (
              <button
                key={action.label}
                type="button"
                className={cls}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            )
          })}
        </footer>
      ) : null}
    </article>
  )
}

export default CustomerCard
