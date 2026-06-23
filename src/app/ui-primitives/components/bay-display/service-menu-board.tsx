import { formatPrice } from "./bay-display-types"
import styles from "./service-menu-board.module.css"

export interface MenuBoardService {
  id: string
  /** Service name — "Cat-back system fit". */
  name: string
  /** Service detail — "incl. seal kit + heat shield". */
  detail?: string
  /** From-price in AUD. Pass 0 for "POA". */
  fromPrice: number
  /** Mark as workshop signature offer. */
  feature?: boolean
}

export interface ServiceMenuBoardProps {
  /** Section heading — "Workshop menu". */
  heading?: string
  /** Branch / kicker label — "Albion Park". */
  kicker?: string
  services: ReadonlyArray<MenuBoardService>
  className?: string
}

export function ServiceMenuBoard({
  heading = "Workshop menu",
  kicker = "Albion Park",
  services,
  className,
}: ServiceMenuBoardProps) {
  const classes = [styles.board, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`${heading} service menu board`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.heading}>{heading}</h2>
      </header>
      <ol className={styles.list}>
        {services.map((service) => (
          <li
            key={service.id}
            className={styles.row}
            data-feature={service.feature ? "on" : "off"}
          >
            <div className={styles.copy}>
              <strong className={styles.name}>{service.name}</strong>
              {service.detail && (
                <span className={styles.detail}>{service.detail}</span>
              )}
            </div>
            <span className={styles.dots} aria-hidden="true" />
            <span className={styles.price}>
              {service.fromPrice <= 0 ? (
                <em>POA</em>
              ) : (
                <>
                  <em>from</em>
                  <strong>{formatPrice(service.fromPrice)}</strong>
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ServiceMenuBoard
