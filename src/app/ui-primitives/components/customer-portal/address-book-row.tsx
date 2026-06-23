"use client"

import { Chip } from "../primitives/chip"
import { CompassRoseIcon } from "../icons/compass-rose"
import {
  ADDRESS_USE_LABEL,
  ADDRESS_USE_TONE,
  portalToneToChip,
  type PortalAddress,
} from "./customer-portal-types"

import styles from "./address-book-row.module.css"

interface AddressBookRowProps {
  address: PortalAddress
  /** Optional edit handler. */
  onEdit?: (id: string) => void
  /** Optional remove handler. */
  onRemove?: (id: string) => void
  /** Optional "set as default" handler — disabled when address is already default. */
  onSetDefault?: (id: string) => void
  className?: string
}

export function AddressBookRow({
  address,
  onEdit,
  onRemove,
  onSetDefault,
  className,
}: AddressBookRowProps) {
  const classes = [
    styles.row,
    address.isDefault ? styles.rowDefault : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const tone = portalToneToChip(ADDRESS_USE_TONE[address.use])
  const useLabel = ADDRESS_USE_LABEL[address.use]

  return (
    <article
      className={classes}
      data-address={address.id}
      aria-label={`${address.label} — ${useLabel} address${address.isDefault ? ", default" : ""}`}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <CompassRoseIcon size={22} tone="currentColor" motion="none" />
      </span>

      <div className={styles.body}>
        <header className={styles.head}>
          <h4 className={styles.label}>{address.label}</h4>
          <div className={styles.chips}>
            <Chip label={useLabel} tone={tone} />
            {address.isDefault ? (
              <Chip label="Default" tone="amber" />
            ) : null}
          </div>
        </header>
        <address className={styles.address}>
          <span>{address.street}</span>
          <span>
            {address.suburb} {address.state.toUpperCase()} {address.postcode}
          </span>
        </address>
      </div>

      <div className={styles.actions}>
        {!address.isDefault && onSetDefault ? (
          <button
            type="button"
            className={styles.actionGhost}
            onClick={() => onSetDefault(address.id)}
          >
            Set default
          </button>
        ) : null}
        {onEdit ? (
          <button
            type="button"
            className={styles.actionGhost}
            onClick={() => onEdit(address.id)}
          >
            Edit
          </button>
        ) : null}
        {onRemove && !address.isDefault ? (
          <button
            type="button"
            className={[styles.actionGhost, styles.actionDanger].join(" ")}
            onClick={() => onRemove(address.id)}
          >
            Remove
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default AddressBookRow
