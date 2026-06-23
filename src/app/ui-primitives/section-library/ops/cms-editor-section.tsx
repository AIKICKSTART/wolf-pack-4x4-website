/**
 * CMS editor — Operations section.
 *
 * A production-ready page section composing the block-editor primitives into a
 * content-editing surface: a guarantee callout, a pre-appointment checklist,
 * and a quote CTA block — exactly the blocks the owner mixes into a public page
 * inside the visual CMS. Rendered in "render" mode here; the same blocks accept
 * mode="edit" inside the canvas.
 *
 * Fully token-driven; the standalone CTA uses the metallic red→amber button
 * DNA. Light/dark, responsive 320→1920, reduced-motion + a11y from the blocks.
 *
 * Composed from (no primitives rebuilt — imported by path):
 *   - block-editor/CalloutBlock, ChecklistBlock, CtaBlock
 */

import { CalloutBlock } from "../../components/block-editor/callout-block"
import Link from "next/link"
import { ChecklistBlock } from "../../components/block-editor/checklist-block"
import { CtaBlock } from "../../components/block-editor/cta-block"

import { CMS_CALLOUT_DATA, CMS_CHECKLIST_DATA, CMS_CTA_DATA } from "./_mock-data"
import styles from "./sections-ops.module.css"

export interface CmsEditorSectionProps {
  kicker?: string
  title?: string
  lede?: string
  /** Primary CTA label (metallic red→amber button DNA). */
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function CmsEditorSection({
  kicker = "Content blocks",
  title = "Build the page, block by block",
  lede = "The same editorial blocks the owner drags onto a Mufflermen page — a guarantee callout, an appointment checklist and a quote CTA — composed and on-brand.",
  ctaLabel = "Open the page builder",
  ctaHref = "/ui-primitives/cms",
  className,
}: CmsEditorSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-labelledby="ops-cms-title"
      role="region"
    >
      <header className={styles.sectionHead}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 id="ops-cms-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.lede}>{lede}</p>
        <div className={styles.actionRow}>
          <a className={styles.ctaPrimary} href={ctaHref}>
            {ctaLabel}
          </a>
          <Link className={styles.ctaSecondary} href="/ui-primitives/content-studio">
            Content studio
          </Link>
        </div>
      </header>

      <div className={styles.cmsGrid}>
        <div className={styles.cmsStack}>
          <p className={styles.cmsBlockLabel}>
            Block · <span>callout</span>
          </p>
          <CalloutBlock data={CMS_CALLOUT_DATA} mode="render" />

          <p className={styles.cmsBlockLabel}>
            Block · <span>checklist</span>
          </p>
          <ChecklistBlock data={CMS_CHECKLIST_DATA} mode="render" />
        </div>

        <div className={styles.cmsStack}>
          <p className={styles.cmsBlockLabel}>
            Block · <span>cta</span>
          </p>
          <CtaBlock data={CMS_CTA_DATA} mode="render" />
        </div>
      </div>
    </section>
  )
}

export default CmsEditorSection
