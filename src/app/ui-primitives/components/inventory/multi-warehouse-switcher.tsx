"use client"

import { useState } from "react"
import type { ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import styles from "./multi-warehouse-switcher.module.css"
import type { WarehouseId } from "./inventory-types"

export interface WarehouseOption {
  /** Stable warehouse id. */
  id: WarehouseId
  /** Display name, e.g. "Oak Flats (HQ)". */
  name: string
  /** Total SKUs in this warehouse. */
  totalSkus: number
  /** Optional state code, e.g. "NSW". */
  state?: string
}

export interface MultiWarehouseSwitcherProps {
  /** Available warehouses. */
  options: ReadonlyArray<WarehouseOption>
  /** Initially selected warehouse id. */
  defaultWarehouseId?: WarehouseId
  /** Fires on change. */
  onChange?: (warehouseId: WarehouseId) => void
}

export function MultiWarehouseSwitcher({
  options,
  defaultWarehouseId,
  onChange,
}: MultiWarehouseSwitcherProps) {
  const [selected, setSelected] = useState<WarehouseId>(
    () => defaultWarehouseId ?? options[0]?.id ?? "oak-flats",
  )

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as WarehouseId
    setSelected(next)
    onChange?.(next)
  }

  const active = options.find((option) => option.id === selected) ?? options[0]

  return (
    <div className={styles.wrap}>
      <label htmlFor="warehouse-switcher" className={styles.label}>
        Warehouse
      </label>
      <div className={styles.field}>
        <select
          id="warehouse-switcher"
          className={styles.select}
          value={selected}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
              {option.state ? ` · ${option.state}` : ""}
            </option>
          ))}
        </select>
        <span className={styles.caret} aria-hidden="true">
          ▾
        </span>
      </div>
      {active ? (
        <Chip
          label={`${active.totalSkus.toLocaleString("en-AU")} SKUs`}
          tone="teal"
        />
      ) : null}
    </div>
  )
}

export default MultiWarehouseSwitcher
