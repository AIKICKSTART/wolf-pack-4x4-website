import type { Metadata } from "next"

import {
  AccountBalanceTile,
  AccountReconciliationRow,
  AgedPayablesGrid,
  AgedReceivablesGrid,
  BalanceSheetView,
  BasSummaryCard,
  CashFlowStatement,
  ChartOfAccountsTree,
  FixedAssetDepreciationRow,
  GeneralLedgerTable,
  JournalEntryRow,
  ProfitLossStatement,
  TaxPeriodBanner,
} from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import {
  DEMO_ACCOUNT_TILES,
  DEMO_AP_ROWS,
  DEMO_AR_ROWS,
  DEMO_BS_ASSETS,
  DEMO_BS_EQUITY,
  DEMO_BS_LIABILITIES,
  DEMO_CASHFLOW_FINANCING,
  DEMO_CASHFLOW_INVESTING,
  DEMO_CASHFLOW_OPERATING,
  DEMO_CASHFLOW_TREND,
  DEMO_COA_GROUPS,
  DEMO_JOURNAL_ENTRY,
  DEMO_LEDGER_LINES,
  DEMO_NET_TREND,
  DEMO_PERIOD_CURRENT,
  DEMO_PERIODS,
  DEMO_PNL_COGS,
  DEMO_PNL_OPEX,
  DEMO_PNL_REVENUE,
  WORKSHOP,
} from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Full ledger console | Accounting | UI Primitives",
  description:
    "Bonus composition assembling thirteen accounting primitives into a single full-ledger console surface for the workshop bookkeeper.",
}

export default function FullLedgerConsolePage() {
  const closingBalance = DEMO_LEDGER_LINES[DEMO_LEDGER_LINES.length - 1].runningBalance

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition"
        title="Full ledger console"
        description="Bonus surface assembling thirteen accounting primitives into one realistic full-ledger console. Tax banner, BAS, P&L, balance sheet, cash flow, AR/AP ageing, reconciliation, chart of accounts, general ledger, journal posting and depreciation register in a single shell."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Full ledger" },
        ]}
      />

      <div className={styles.consoleStack}>
        <TaxPeriodBanner
          period={DEMO_PERIOD_CURRENT}
          dueDateISO="2026-07-28"
          amountOwing={13640.0}
          status="drafted"
          showFileNow
        />

        <div className={styles.tilesRow}>
          {DEMO_ACCOUNT_TILES.map((tile) => (
            <AccountBalanceTile
              key={tile.code}
              code={tile.code}
              name={tile.name}
              classification={tile.classification}
              balance={tile.balance}
              changePct={tile.changePct}
              trend={tile.trend}
            />
          ))}
        </div>

        <div className={styles.consoleRow}>
          <ProfitLossStatement
            periods={DEMO_PERIODS}
            initialPeriodIndex={DEMO_PERIODS.length - 1}
            revenue={DEMO_PNL_REVENUE}
            cogs={DEMO_PNL_COGS}
            opex={DEMO_PNL_OPEX}
            netProfitTrend={DEMO_NET_TREND}
          />
          <BalanceSheetView
            asOf={DEMO_PERIOD_CURRENT}
            assets={DEMO_BS_ASSETS}
            liabilities={DEMO_BS_LIABILITIES}
            equity={DEMO_BS_EQUITY}
          />
        </div>

        <CashFlowStatement
          period={DEMO_PERIOD_CURRENT}
          openingCash={21340.2}
          operating={DEMO_CASHFLOW_OPERATING}
          investing={DEMO_CASHFLOW_INVESTING}
          financing={DEMO_CASHFLOW_FINANCING}
          trendLabels={DEMO_CASHFLOW_TREND.labels}
          trendOperating={DEMO_CASHFLOW_TREND.operating}
          trendInvesting={DEMO_CASHFLOW_TREND.investing}
          trendFinancing={DEMO_CASHFLOW_TREND.financing}
        />

        <div className={styles.consoleRow}>
          <BasSummaryCard
            abn={WORKSHOP.abn}
            period={DEMO_PERIOD_CURRENT}
            dueDateISO="2026-07-28"
            gstCollected={43342.0}
            gstPaid={34922.0}
            paygWithholding={5640.0}
            paygInstalment={3580.0}
            status="drafted"
          />
          <JournalEntryRow entry={DEMO_JOURNAL_ENTRY} />
        </div>

        <GeneralLedgerTable
          accountCode="1000"
          accountName="Cash at bank — Bendigo"
          periodLabel="April 2026"
          openingBalance={18420.5}
          closingBalance={closingBalance}
          lines={DEMO_LEDGER_LINES}
        />

        <div className={styles.consoleRow}>
          <AgedReceivablesGrid asOfLabel="28 May 2026" rows={DEMO_AR_ROWS} />
          <AgedPayablesGrid asOfLabel="28 May 2026" rows={DEMO_AP_ROWS} />
        </div>

        <div className={styles.consoleRowSingle}>
          <ChartOfAccountsTree groups={DEMO_COA_GROUPS} />
        </div>

        <div className={styles.reconciliationStack}>
          <AccountReconciliationRow
            dateISO="2026-04-18"
            description="EFT — Roberts A. — INV-30418"
            counterparty="Roberts A."
            reference="FT-9981203"
            bankAmount={506.0}
            ledgerAmount={506.0}
            status="auto_matched"
          />
          <AccountReconciliationRow
            dateISO="2026-04-25"
            description="Cash sale — exhaust upgrade"
            counterparty="Counter sale"
            reference="EFTPOS-440"
            bankAmount={1240.0}
            ledgerAmount={1124.0}
            status="needs_review"
          />
          <AccountReconciliationRow
            dateISO="2026-04-28"
            description="ORIGIN ENERGY — Workshop bill"
            counterparty="Origin Energy"
            reference="BILL-3041"
            bankAmount={-412.0}
            ledgerAmount={0}
            status="unmatched"
          />
        </div>

        <div className={styles.depreciationStack}>
          <FixedAssetDepreciationRow
            assetCode="FA-1510-001"
            assetName="Two-post hoist — Ravaglioli"
            assetClass="Plant & equipment"
            location="Bay 2"
            acquisitionDateISO="2023-03-04"
            acquisitionCost={14800.0}
            usefulLifeYears={10}
            method="straight_line"
            accumulatedDepreciation={4440.0}
          />
          <FixedAssetDepreciationRow
            assetCode="FA-1510-002"
            assetName="Wheel aligner — Hunter HawkEye"
            assetClass="Plant & equipment"
            location="Bay 1"
            acquisitionDateISO="2021-09-12"
            acquisitionCost={42500.0}
            usefulLifeYears={7}
            method="straight_line"
            accumulatedDepreciation={26780.0}
          />
        </div>
      </div>
    </main>
  )
}
