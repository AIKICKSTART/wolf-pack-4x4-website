import type { Metadata } from "next"

import {
  AssetCard,
  AssetTypeFilter,
  BulkSelectToolbar,
  DamFolderTree,
  DamPreviewPane,
} from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_ASSETS,
  DEMO_FOLDER_TREE,
  DEMO_HERO_ASSET,
  DEMO_LINKED_COLLECTIONS,
  DEMO_PREVIEW_PROPERTIES,
  DEMO_TYPE_COUNTS,
} from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Full DAM | Asset Library",
  description:
    "Asset library composition — folder tree, type filter, asset grid, preview pane, and bulk-select toolbar combined into a working DAM surface.",
}

export default function FullDamScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full DAM"
        title="Full DAM"
        description="Folder tree on the left, asset grid in the centre, preview pane on the right, type filter across the top, and bulk-select toolbar floating along the bottom. All primitives shipped in this folder, composed together."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Full DAM" },
        ]}
      />

      <section className={styles.demoSurface}>
        <div className={styles.dam}>
          <div className={styles.damFilter}>
            <AssetTypeFilter counts={DEMO_TYPE_COUNTS} />
          </div>

          <div className={styles.damTree}>
            <DamFolderTree
              nodes={DEMO_FOLDER_TREE}
              defaultExpandedIds={["folder-root", "folder-hero", "folder-workshop"]}
              selectedId="folder-hero-manta"
            />
          </div>

          <div className={styles.damMain}>
            <div
              className={styles.damMainGrid}
              role="listbox"
              aria-label="Assets in Manta family"
              aria-multiselectable="true"
            >
              {DEMO_ASSETS.map((asset, index) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  selected={index === 0 || index === 2 || index === 7}
                />
              ))}
            </div>
          </div>

          <div className={styles.damPreview}>
            <DamPreviewPane
              asset={DEMO_HERO_ASSET}
              properties={DEMO_PREVIEW_PROPERTIES}
              linkedCollections={DEMO_LINKED_COLLECTIONS}
            />
          </div>

          <div className={styles.damToolbarSlot} aria-hidden="false">
            <BulkSelectToolbar selectedCount={3} />
          </div>
        </div>
      </section>
    </main>
  )
}
