"use client"

import { ThemeProvider, type StyleProfile } from "../../builder/theme"
import styles from "./style-picker.module.css"

export interface ProfileSwatchProps {
  /** Profile whose tokens drive this miniature preview. */
  profile: StyleProfile
}

/**
 * A compact preview rendered inside the profile's OWN token scope (an isolated,
 * non-persisting {@link ThemeProvider} seeded with this profile) so the tile
 * shows the real look of that profile without affecting the selected preview.
 * Mirrors a panel + a primary CTA + a hairline-bordered field row.
 */
export function ProfileSwatch({ profile }: ProfileSwatchProps) {
  return (
    <ThemeProvider
      disablePersistence
      defaultProfileId={profile.id}
      className={styles.swatch}
    >
      <span className={styles.swatchWeave} aria-hidden="true" />
      <span className={styles.swatchPanel} aria-hidden="true">
        <span className={styles.swatchBar} />
        <span className={styles.swatchBarShort} />
      </span>
      <span className={styles.swatchRow} aria-hidden="true">
        <span className={styles.swatchCta} />
        <span className={styles.swatchField} />
      </span>
    </ThemeProvider>
  )
}
