import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"

import styles from "./customer-context-card.module.css"

export interface CustomerCartItem {
  id: string
  /** Part name, e.g. "Manta 3in cat-back" */
  name: string
  /** Quantity in cart. */
  quantity: number
  /** Price in AUD cents (combined for the line). */
  priceCents: number
}

interface CustomerContextCardProps {
  visitorName: string
  /** Optional avatar src; falls back to initials. */
  avatarSrc?: string
  /** Anonymous identifier when name is unknown. */
  contact: string
  /** Page the visitor is currently looking at. */
  pageTitle: string
  /** Pretty path / referrer summary. */
  pageMeta: string
  /** Current cart contents. Empty array hides the cart block. */
  cart: ReadonlyArray<CustomerCartItem>
  /** Number of past chats with the workshop. */
  pastChats: number
  /** Number of open support tickets. */
  openTickets: number
  /** Optional persona chip, e.g. "Returning customer". */
  persona?: string
  className?: string
}

function formatAud(cents: number): string {
  const dollars = cents / 100
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars)
}

export function CustomerContextCard({
  visitorName,
  avatarSrc,
  contact,
  pageTitle,
  pageMeta,
  cart,
  pastChats,
  openTickets,
  persona,
  className,
}: CustomerContextCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const cartTotal = cart.reduce((sum, item) => sum + item.priceCents, 0)

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Customer context for ${visitorName}`}
    >
      <header className={styles.head}>
        <Avatar name={visitorName} src={avatarSrc} size="lg" tone="amber" />
        <div className={styles.identity}>
          <span className={styles.kicker}>Visitor</span>
          <h3 className={styles.name}>{visitorName}</h3>
          <span className={styles.contact}>{contact}</span>
          {persona ? (
            <div>
              <Chip label={persona} tone="amber" />
            </div>
          ) : null}
        </div>
      </header>

      <div className={styles.viewing}>
        <span className={styles.viewingLabel}>Viewing right now</span>
        <span className={styles.viewingTitle}>{pageTitle}</span>
        <span className={styles.viewingMeta}>{pageMeta}</span>
      </div>

      <ul className={styles.stats}>
        <li className={styles.stat}>
          <span className={styles.statValue}>{cart.length}</span>
          <span className={styles.statLabel}>Cart items</span>
        </li>
        <li className={styles.stat}>
          <span className={styles.statValue}>{pastChats}</span>
          <span className={styles.statLabel}>Past chats</span>
        </li>
        <li className={styles.stat}>
          <span className={styles.statValue}>{openTickets}</span>
          <span className={styles.statLabel}>Open tickets</span>
        </li>
      </ul>

      <div className={styles.cart}>
        <div className={styles.cartHead}>
          <span className={styles.cartTitle}>Current cart</span>
          {cart.length > 0 ? (
            <span className={styles.cartTotal}>{formatAud(cartTotal)}</span>
          ) : null}
        </div>
        {cart.length === 0 ? (
          <p className={styles.empty}>Cart empty — visitor is browsing.</p>
        ) : (
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <span className={styles.cartItemName}>{item.name}</span>
                <span className={styles.cartItemQty}>
                  ×{item.quantity}
                  {" · "}
                  {formatAud(item.priceCents)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default CustomerContextCard
