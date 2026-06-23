"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import { Chip } from "../primitives/chip"

import styles from "./receive-shipment-scanner.module.css"

export interface ReceiveExpectedItem {
  /** SKU expected on this PO line. */
  sku: string
  /** Short title for the receiving operator. */
  title: string
  /** Quantity expected. */
  expectedQty: number
}

export interface ReceiveScannedItem {
  /** SKU as scanned. */
  sku: string
  /** Quantity counted so far on this dock. */
  countedQty: number
}

export interface ReceiveShipmentScannerProps {
  /** PO reference, e.g. "PO-2026-0481". */
  poRef: string
  /** Supplier the shipment came from. */
  supplier: string
  /** Expected lines for this PO. */
  expected: ReadonlyArray<ReceiveExpectedItem>
  /** Already-scanned items. */
  scanned: ReadonlyArray<ReceiveScannedItem>
  /** Fires when the operator scans/enters a SKU. */
  onScan?: (sku: string) => void
  /** Fires when the operator commits the receipt. */
  onCommit?: () => void
}

interface VarianceLine {
  sku: string
  title: string
  expectedQty: number
  countedQty: number
  variance: number
}

function buildVariance(
  expected: ReadonlyArray<ReceiveExpectedItem>,
  scanned: ReadonlyArray<ReceiveScannedItem>,
): ReadonlyArray<VarianceLine> {
  const countedBySku = new Map<string, number>()
  for (const item of scanned) {
    countedBySku.set(item.sku, (countedBySku.get(item.sku) ?? 0) + item.countedQty)
  }

  return expected.map((line) => {
    const countedQty = countedBySku.get(line.sku) ?? 0
    return {
      sku: line.sku,
      title: line.title,
      expectedQty: line.expectedQty,
      countedQty,
      variance: countedQty - line.expectedQty,
    }
  })
}

export function ReceiveShipmentScanner({
  poRef,
  supplier,
  expected,
  scanned,
  onScan,
  onCommit,
}: ReceiveShipmentScannerProps) {
  const [scanValue, setScanValue] = useState("")

  const variance = buildVariance(expected, scanned)
  const hasVariance = variance.some((line) => line.variance !== 0)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = scanValue.trim()
    if (!trimmed) return
    onScan?.(trimmed.toUpperCase())
    setScanValue("")
  }

  return (
    <section className={styles.wrap} aria-label={`Receive shipment ${poRef}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Receive shipment</span>
        <h3 className={styles.title}>{poRef}</h3>
        <span className={styles.supplier}>{supplier}</span>
      </header>

      <form className={styles.scanRow} onSubmit={handleSubmit}>
        <label htmlFor={`receive-scan-${poRef}`} className={styles.scanLabel}>
          Scan SKU
        </label>
        <input
          id={`receive-scan-${poRef}`}
          name="scan"
          type="text"
          autoComplete="off"
          placeholder="OF-MFR-001"
          value={scanValue}
          onChange={(event) => setScanValue(event.target.value)}
          className={styles.scanInput}
        />
        <button type="submit" className={styles.scanCta}>
          Scan
        </button>
      </form>

      <ul className={styles.list} role="list">
        {variance.map((line) => {
          const tone =
            line.variance === 0 ? "green" : line.variance > 0 ? "teal" : "red"
          const sign = line.variance > 0 ? "+" : ""
          return (
            <li key={line.sku} className={styles.lineItem}>
              <div className={styles.lineHead}>
                <span className={styles.lineSku}>{line.sku}</span>
                <span className={styles.lineTitle}>{line.title}</span>
              </div>
              <div className={styles.lineCounts}>
                <span>
                  <strong>{line.countedQty}</strong> / {line.expectedQty}
                </span>
                <Chip
                  label={`${sign}${line.variance}`}
                  tone={tone}
                />
              </div>
            </li>
          )
        })}
      </ul>

      <footer className={styles.foot}>
        {hasVariance ? (
          <Chip label="Variance detected" tone="amber" />
        ) : (
          <Chip label="Clean receive" tone="green" />
        )}
        <button
          type="button"
          className={styles.commit}
          onClick={() => onCommit?.()}
          disabled={scanned.length === 0}
        >
          Commit receipt
        </button>
      </footer>
    </section>
  )
}

export default ReceiveShipmentScanner
