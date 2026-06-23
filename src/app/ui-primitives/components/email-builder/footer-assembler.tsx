"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import { emailTokens } from "../emails/tokens"

import styles from "./footer-assembler.module.css"

interface FooterAssemblerProps {
  /** Initial physical mailing address. */
  defaultAddress?: string
  /** Initial unsubscribe link label. */
  defaultUnsubscribeLabel?: string
  /** Initial legal link labels. */
  defaultLegalLinks?: ReadonlyArray<string>
  /** Initial social-row toggle state. */
  defaultSocialRow?: boolean
  className?: string
}

export function FooterAssembler({
  defaultAddress = "Unit 4 / 12 Cygnet Place, Oak Flats NSW 2529 · ABN 12 345 678 901",
  defaultUnsubscribeLabel = "Unsubscribe",
  defaultLegalLinks = ["Privacy policy", "Terms of service", "Cookie preferences"],
  defaultSocialRow = true,
  className,
}: FooterAssemblerProps) {
  const [address, setAddress] = useState<string>(defaultAddress)
  const [unsubLabel, setUnsubLabel] = useState<string>(defaultUnsubscribeLabel)
  const [legalLinks, setLegalLinks] = useState<ReadonlyArray<string>>(
    defaultLegalLinks,
  )
  const [socialRow, setSocialRow] = useState<boolean>(defaultSocialRow)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const removeLegal = (label: string) =>
    setLegalLinks((current) => current.filter((entry) => entry !== label))

  return (
    <section className={classes} aria-label="Footer assembler">
      <header className={styles.head}>
        <span className={styles.kicker}>Footer assembler</span>
        <h3 className={styles.title}>Compliance block</h3>
      </header>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="email-builder-footer-address">
          Physical mailing address
        </label>
        <textarea
          id="email-builder-footer-address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          rows={2}
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label
          className={styles.fieldLabel}
          htmlFor="email-builder-footer-unsubscribe"
        >
          Unsubscribe link label
        </label>
        <input
          id="email-builder-footer-unsubscribe"
          type="text"
          value={unsubLabel}
          onChange={(event) => setUnsubLabel(event.target.value)}
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Legal links</span>
        <div className={styles.chipRow}>
          {legalLinks.map((label) => (
            <Chip
              key={label}
              label={label}
              tone="neutral"
              selected
              dismissible
              onDismiss={() => removeLegal(label)}
            />
          ))}
          {legalLinks.length === 0 ? (
            <span className={styles.emptyHint}>No legal links · re-add one</span>
          ) : null}
        </div>
      </div>

      <div className={styles.toggleRow}>
        <span className={styles.toggleLabel}>Show social icon row</span>
        <button
          type="button"
          role="switch"
          aria-checked={socialRow}
          onClick={() => setSocialRow((value) => !value)}
          className={[styles.toggle, socialRow ? styles.toggleOn : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>

      <footer
        className={styles.preview}
        style={{
          background: emailTokens.canvas,
          color: emailTokens.body,
          fontFamily: emailTokens.body_font,
        }}
      >
        <span className={styles.previewLabel}>Preview</span>
        <p className={styles.previewAddress}>{address}</p>
        {socialRow ? (
          <div className={styles.socialRow} aria-hidden="true">
            <span className={styles.socialDot}>fb</span>
            <span className={styles.socialDot}>ig</span>
            <span className={styles.socialDot}>yt</span>
            <span className={styles.socialDot}>li</span>
          </div>
        ) : null}
        <div className={styles.legalRow}>
          <span className={styles.legalLink}>{unsubLabel}</span>
          {legalLinks.map((label) => (
            <span key={`prev-${label}`} className={styles.legalLink}>
              {label}
            </span>
          ))}
        </div>
      </footer>
    </section>
  )
}
