"use client";

/**
 * Live preview strip. Renders representative primitives — buttons, a card with
 * a meter, form inputs, a type specimen, and a brand swatch row — all styled
 * purely from `--primitive-*` tokens. Because the surrounding ThemeProvider
 * writes overrides as inline custom properties on its wrapper, this strip
 * re-themes instantly as controls are adjusted; no props are threaded through.
 */
import { ArrowRight, Wrench } from "lucide-react";

import styles from "./theme-preview.module.css";

interface SwatchSpec {
  readonly token: string;
  readonly label: string;
}

const BRAND_SWATCHES: readonly SwatchSpec[] = [
  { token: "var(--primitive-red)", label: "red" },
  { token: "var(--primitive-amber)", label: "amber" },
  { token: "var(--primitive-teal)", label: "teal" },
  { token: "var(--primitive-green)", label: "green" },
  { token: "var(--primitive-text-strong)", label: "text" },
];

export function ThemePreviewStrip() {
  return (
    <aside className={styles.preview} aria-label="Live theme preview">
      <div className={styles.previewHeader}>
        <h3 className={styles.previewTitle}>Live preview</h3>
        <span className={styles.previewNote}>Updates as you edit</span>
      </div>

      <div className={styles.previewBlock}>
        <span className={styles.previewBlockLabel}>Buttons</span>
        <div className={styles.previewButtons}>
          <button type="button" className={styles.btnPrimary}>
            <Wrench aria-hidden="true" />
            Open job
          </button>
          <button type="button" className={styles.btnSecondary}>
            Schedule
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.previewBlock}>
        <span className={styles.previewBlockLabel}>Card</span>
        <article className={styles.previewCard}>
          <span className={styles.cardEyebrow}>Bay 03 · live</span>
          <h4 className={styles.cardTitle}>Cat-back install</h4>
          <p className={styles.cardBody}>
            Stainless system fitted, noise target logged, four proof photos in
            the handover queue.
          </p>
          <div
            className={styles.cardMeter}
            role="progressbar"
            aria-label="Approval readiness"
            aria-valuenow={68}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className={styles.cardMeterFill} aria-hidden="true" />
          </div>
        </article>
      </div>

      <div className={styles.previewBlock}>
        <span className={styles.previewBlockLabel}>Inputs</span>
        <label className={styles.previewField}>
          <span className={styles.previewFieldLabel}>Customer name</span>
          <input
            type="text"
            className={styles.previewInput}
            placeholder="e.g. VF Commodore SS"
            aria-label="Customer name preview"
          />
        </label>
      </div>

      <div className={styles.previewBlock}>
        <span className={styles.previewBlockLabel}>Typography</span>
        <div className={styles.previewType}>
          <p className={styles.typeDisplay}>Oak Flats Mufflermen</p>
          <p className={styles.typeBody}>
            Body copy renders in the body font, tuned by the live type tokens.
          </p>
          <p className={styles.typeMuted}>Muted caption · spec note</p>
        </div>
      </div>

      <div className={styles.previewBlock}>
        <span className={styles.previewBlockLabel}>Brand swatches</span>
        <ul className={styles.swatchStrip} aria-label="Brand color swatches">
          {BRAND_SWATCHES.map((swatch) => (
            <li key={swatch.label} className={styles.swatchTile}>
              <span
                className={styles.swatchChip}
                style={{ background: swatch.token }}
                aria-hidden="true"
              />
              <span className={styles.swatchName}>{swatch.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
