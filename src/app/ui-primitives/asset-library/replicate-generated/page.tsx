import type { Metadata } from "next"
import Image from "next/image"

import { PageHeader } from "../../components/page-header"
import { REPLICATE_GENERATED_ASSETS } from "../replicate-generated-assets"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Replicate generated media | UI Primitives",
}

export default function ReplicateGeneratedAssetsPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Asset library / Replicate media"
        title="Replicate generated media registry"
        description="Generated media entries saved into the Primitive UI asset system with prompts, model notes, cost caveats, suitability, alt text, optimization notes, and reuse instructions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Replicate generated media" },
        ]}
      />

      <span className={styles.notice}>
        No secrets or private files in prompts or metadata
      </span>

      <section className={styles.grid} aria-label="Replicate generated media assets">
        {REPLICATE_GENERATED_ASSETS.map((asset) => (
          <article key={asset.id} className={styles.card}>
            <div className={styles.thumb}>
              <Image
                className={styles.assetPreview}
                src={asset.preview}
                alt={asset.altText}
                width={640}
                height={400}
                sizes="(max-width: 760px) 100vw, 320px"
              />
            </div>
            <header>
              <span className={styles.cardKicker}>{asset.inputType} to {asset.outputType}</span>
              <h2 className={styles.cardTitle}>{asset.assetItem.name}</h2>
              <p className={styles.cardBody}>{asset.useCase}</p>
            </header>
            <dl className={styles.detailsList}>
              <div>
                <dt>Path</dt>
                <dd>{asset.filePath}</dd>
              </div>
              <div>
                <dt>Prompt</dt>
                <dd>{asset.prompt}</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>{asset.model}</dd>
              </div>
              <div>
                <dt>Cost</dt>
                <dd>{asset.costNote}</dd>
              </div>
              <div>
                <dt>Suitability</dt>
                <dd>{asset.lightDarkSuitability}</dd>
              </div>
              <div>
                <dt>Optimization</dt>
                <dd>{asset.optimisationNotes}</dd>
              </div>
              <div>
                <dt>Reuse</dt>
                <dd>{asset.reuseInstructions}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </main>
  )
}
