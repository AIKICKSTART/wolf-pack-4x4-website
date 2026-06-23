import type { Metadata } from "next"

import { FixedAssetDepreciationRow } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Depreciation row | Accounting | UI Primitives",
  description: "Fixed asset depreciation row — acquisition cost, life, method, accumulated depreciation and book value.",
}

export default function DepreciationPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14"
        title="Fixed asset depreciation row"
        description="Per-asset row exposing acquisition cost, useful life, depreciation method, accumulated depreciation to date and remaining book value. A consumed-life meter shows where the asset sits in its depreciation schedule."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Depreciation" },
        ]}
      />
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
        <FixedAssetDepreciationRow
          assetCode="FA-1500-014"
          assetName="Bead-blaster — Renegade"
          assetClass="Workshop equipment"
          location="Shed"
          acquisitionDateISO="2018-11-22"
          acquisitionCost={6200.0}
          usefulLifeYears={8}
          method="diminishing_value"
          accumulatedDepreciation={5300.0}
        />
        <FixedAssetDepreciationRow
          assetCode="FA-1500-019"
          assetName="MIG welder — Cigweld 200"
          assetClass="Workshop equipment"
          location="Bay 3"
          acquisitionDateISO="2025-02-08"
          acquisitionCost={2480.0}
          usefulLifeYears={5}
          method="units_of_use"
          accumulatedDepreciation={420.0}
        />
      </div>
    </main>
  )
}
