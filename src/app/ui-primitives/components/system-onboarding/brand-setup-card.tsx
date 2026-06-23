"use client"

import type {
  BrandLogoState,
  BrandPaletteSwatch,
  BrandTypographyPairing,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./brand-setup-card.module.css"

export interface BrandSetupCardProps {
  /** Eyebrow label eg "Step 5 / Brand". */
  kicker: string
  /** Big title eg "Make Mufflermen look like Illawarra TB". */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Logo upload state. */
  logo: BrandLogoState
  /** Available palette swatches. */
  palettes: ReadonlyArray<BrandPaletteSwatch>
  /** Available typography pairings. */
  typographies: ReadonlyArray<BrandTypographyPairing>
  /** Selected typography id. */
  selectedTypographyId: string
  /** Submit CTA label. */
  submitLabel?: string
  /** Back CTA label. */
  backLabel?: string
  className?: string
}

export function BrandSetupCard({
  kicker,
  title,
  description,
  logo,
  palettes,
  typographies,
  selectedTypographyId,
  submitLabel = "Continue · Deploy",
  backLabel = "Back",
  className,
}: BrandSetupCardProps) {
  const classes = [shell.shell, styles.card, className].filter(Boolean).join(" ")

  return (
    <form
      className={classes}
      aria-label={title}
      onSubmit={(event) => event.preventDefault()}
    >
      <header className={shell.shellHead}>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={shell.title}>{title}</h2>
        <p className={shell.subtitle}>{description}</p>
      </header>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Logo</legend>
        <div className={styles.logoRow}>
          <div
            className={[
              styles.logoTile,
              logo.uploaded ? styles.logoTileUploaded : null,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={
              logo.uploaded
                ? `Logo uploaded — ${logo.fileName ?? "logo"}`
                : "Logo upload zone"
            }
          >
            {logo.uploaded ? (
              <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden="true">
                <rect
                  x="6"
                  y="6"
                  width="52"
                  height="52"
                  rx="10"
                  fill="color-mix(in srgb, var(--primitive-red) 16%, transparent)"
                  stroke="color-mix(in srgb, var(--primitive-red) 60%, transparent)"
                />
                <path
                  d="M18 40 L18 22 L24 22 L32 34 L40 22 L46 22 L46 40 L40 40 L40 30 L34 38 L30 38 L24 30 L24 40 Z"
                  fill="var(--primitive-text-strong)"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true">
                <rect
                  x="6"
                  y="6"
                  width="52"
                  height="52"
                  rx="10"
                  fill="color-mix(in srgb, var(--primitive-text-strong) 4%, transparent)"
                  stroke="color-mix(in srgb, var(--primitive-text-strong) 24%, transparent)"
                  strokeDasharray="4 4"
                />
                <path
                  d="M22 36 L30 28 L36 34 L42 28"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="26" cy="22" r="3" fill="currentColor" opacity="0.6" />
              </svg>
            )}
          </div>
          <div className={styles.logoCopy}>
            {logo.uploaded ? (
              <>
                <span className={styles.logoTitle}>{logo.fileName}</span>
                <span className={styles.logoMeta}>
                  {[logo.size, logo.dimensions].filter(Boolean).join(" · ")}
                </span>
                <div className={styles.logoActions}>
                  <button
                    type="button"
                    className={[shell.button, shell.buttonGhost].join(" ")}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    className={[shell.button, shell.buttonGhost].join(" ")}
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className={styles.logoTitle}>Drop your logo here</span>
                <span className={styles.logoMeta}>
                  SVG, PNG, or JPG · square preferred · 512 × 512 looks best.
                </span>
                <label className={[shell.button, shell.buttonPrimary, shell.toneRed].join(" ")}>
                  Upload file
                  <input
                    type="file"
                    accept="image/svg+xml,image/png,image/jpeg"
                    className={styles.fileInput}
                  />
                </label>
              </>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Palette</legend>
        <ul className={styles.palette} role="radiogroup" aria-label="Brand palette">
          {palettes.map((swatch) => (
            <li key={swatch.id}>
              <button
                type="button"
                role="radio"
                aria-checked={swatch.accent}
                className={[
                  styles.swatch,
                  swatch.accent ? styles.swatchAccent : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  className={styles.swatchChip}
                  style={{ background: swatch.hex }}
                  aria-hidden="true"
                />
                <span className={styles.swatchCopy}>
                  <span className={styles.swatchLabel}>{swatch.label}</span>
                  <span className={[styles.swatchHex, shell.mono].join(" ")}>
                    {swatch.hex}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Typography</legend>
        <ul className={styles.typographyList} role="radiogroup" aria-label="Typography pairing">
          {typographies.map((pairing) => {
            const checked = pairing.id === selectedTypographyId
            return (
              <li key={pairing.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  className={[
                    styles.typeOption,
                    checked ? styles.typeOptionChecked : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={styles.typeLabel}>{pairing.label}</span>
                  <span className={styles.typePreview}>
                    <span
                      className={styles.typePreviewHeading}
                      style={{ fontFamily: pairing.headingFont }}
                    >
                      MUFFLERMEN
                    </span>
                    <span
                      className={styles.typePreviewBody}
                      style={{ fontFamily: pairing.bodyFont }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </span>
                  </span>
                  <span className={styles.typeMood}>{pairing.mood}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <footer className={styles.foot}>
        <button type="button" className={[shell.button, shell.buttonGhost].join(" ")}>
          {backLabel}
        </button>
        <button
          type="submit"
          className={[shell.button, shell.buttonPrimary, shell.toneRed].join(" ")}
        >
          {submitLabel}
          <span aria-hidden="true">→</span>
        </button>
      </footer>
    </form>
  )
}

export default BrandSetupCard
