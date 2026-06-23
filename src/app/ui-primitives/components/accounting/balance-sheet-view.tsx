import { Chip } from "../primitives/chip"

import {
  formatAud,
  type AccountNode,
  type PeriodRef,
} from "./accounting-types"
import styles from "./balance-sheet-view.module.css"

export interface BalanceSheetViewProps {
  asOf: PeriodRef
  assets: ReadonlyArray<AccountNode>
  liabilities: ReadonlyArray<AccountNode>
  equity: ReadonlyArray<AccountNode>
  className?: string
}

function sum(nodes: ReadonlyArray<AccountNode>): number {
  return nodes.reduce((acc, n) => acc + n.balance, 0)
}

interface ColumnProps {
  title: string
  nodes: ReadonlyArray<AccountNode>
  total: number
  tone: "teal" | "red" | "amber"
}

function Column({ title, nodes, total, tone }: ColumnProps) {
  return (
    <section className={styles.column} data-tone={tone}>
      <h4 className={styles.colTitle}>{title}</h4>
      <ul className={styles.colList}>
        {nodes.map((node) => (
          <li key={node.id} className={styles.row}>
            <span className={styles.rowCode}>{node.code}</span>
            <span className={styles.rowName}>{node.name}</span>
            <span className={styles.rowAmount}>{formatAud(node.balance)}</span>
          </li>
        ))}
      </ul>
      <div className={styles.colTotal}>
        <span>Total {title.toLowerCase()}</span>
        <span>{formatAud(total)}</span>
      </div>
    </section>
  )
}

export function BalanceSheetView({
  asOf,
  assets,
  liabilities,
  equity,
  className,
}: BalanceSheetViewProps) {
  const totalAssets = sum(assets)
  const totalLiab = sum(liabilities)
  const totalEquity = sum(equity)
  const liabPlusEquity = totalLiab + totalEquity
  const variance = totalAssets - liabPlusEquity
  const balanced = Math.abs(variance) < 0.005
  const ratio = totalAssets > 0 ? Math.max(0, Math.min(1, liabPlusEquity / totalAssets)) : 0
  const meterValue = Math.round(ratio * 100)

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Balance sheet as of ${asOf.label}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Statement of position</span>
          <h3 className={styles.title}>Balance sheet</h3>
          <Chip label={`As of ${asOf.label}`} tone="teal" />
        </div>
        <div
          className={styles.match}
          role="meter"
          aria-valuenow={meterValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={balanced ? "Books are balanced" : "Books out of balance"}
          data-balanced={balanced}
        >
          <span className={styles.matchLabel}>
            {balanced ? "Balanced" : `Variance ${formatAud(Math.abs(variance))}`}
          </span>
          <span className={styles.matchTrack}>
            <span className={styles.matchFill} style={{ width: `${meterValue}%` }} />
          </span>
          <span className={styles.matchEq}>
            A = L + E
          </span>
        </div>
      </header>

      <div className={styles.grid}>
        <Column title="Assets" nodes={assets} total={totalAssets} tone="teal" />
        <div className={styles.stack}>
          <Column title="Liabilities" nodes={liabilities} total={totalLiab} tone="red" />
          <Column title="Equity" nodes={equity} total={totalEquity} tone="amber" />
        </div>
      </div>

      <footer className={styles.foot}>
        <div className={styles.footCell}>
          <span className={styles.footLabel}>Total assets</span>
          <span className={styles.footValue}>{formatAud(totalAssets)}</span>
        </div>
        <span aria-hidden="true" className={styles.footEq}>=</span>
        <div className={styles.footCell}>
          <span className={styles.footLabel}>Liabilities + equity</span>
          <span className={styles.footValue}>{formatAud(liabPlusEquity)}</span>
        </div>
      </footer>
    </section>
  )
}

export default BalanceSheetView
