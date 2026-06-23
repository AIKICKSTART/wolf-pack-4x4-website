"use client"

import { type ReactNode, useId, useState } from "react"

import type { StyleProfile } from "../../builder/theme"
import styles from "./style-picker.module.css"

export interface LivePreviewProps {
  /** The active profile, used only for labelling the preview surface. */
  profile: StyleProfile
}

/**
 * A multi-primitive preview (hero + card + button + input) that consumes the
 * `--primitive-*` tokens written by the enclosing {@link ThemeProvider}. When
 * the active profile changes, every value here re-themes instantly — no edits,
 * no re-mount. Token-driven throughout: nothing reads a raw design literal.
 */
export function LivePreview({ profile }: LivePreviewProps) {
  return (
    <div
      className={styles.preview}
      role="group"
      aria-label={`Live preview — ${profile.name} profile`}
    >
      <PreviewHero name={profile.name} />

      <div className={styles.previewGrid}>
        <PreviewCard />
        <PreviewForm />
      </div>
    </div>
  )
}

function PreviewHero({ name }: { name: string }): ReactNode {
  return (
    <section className={styles.hero}>
      <span className={styles.heroWeave} aria-hidden="true" />
      <span className={styles.heroKicker}>Oak Flats Mufflermen</span>
      <h3 className={styles.heroTitle}>Exhaust &amp; tuning, dialled in.</h3>
      <p className={styles.heroLede}>
        Every surface, button, and field below is drawn from the{" "}
        <strong>{name}</strong> token set. Pick another profile to re-theme the
        whole preview.
      </p>
      <div className={styles.heroActions}>
        <PreviewButton variant="primary">Book a bay</PreviewButton>
        <PreviewButton variant="secondary">View pricing</PreviewButton>
      </div>
    </section>
  )
}

function PreviewCard(): ReactNode {
  return (
    <article className={styles.card2} aria-label="Service card">
      <span className={styles.card2Tag}>Popular</span>
      <h4 className={styles.card2Title}>Cat-back system</h4>
      <p className={styles.card2Body}>
        Mandrel-bent stainless, fitted and tuned on the dyno. Sounds the part,
        flows the numbers.
      </p>
      <dl className={styles.card2Stats}>
        <div className={styles.card2Stat}>
          <dt>Power</dt>
          <dd className={styles.card2Figure}>+18kW</dd>
        </div>
        <div className={styles.card2Stat}>
          <dt>Fit time</dt>
          <dd className={styles.card2Figure}>3.5h</dd>
        </div>
      </dl>
      <PreviewButton variant="primary">Add to quote</PreviewButton>
    </article>
  )
}

function PreviewForm(): ReactNode {
  const nameId = useId()
  const regoId = useId()
  const [agreed, setAgreed] = useState(true)

  return (
    <form
      className={styles.form}
      aria-label="Quote request preview"
      onSubmit={(event) => event.preventDefault()}
    >
      <h4 className={styles.formTitle}>Request a quote</h4>

      <label className={styles.field} htmlFor={nameId}>
        <span className={styles.fieldLabel}>Your name</span>
        <input
          id={nameId}
          className={styles.input}
          type="text"
          placeholder="Daniel F."
          autoComplete="off"
        />
      </label>

      <label className={styles.field} htmlFor={regoId}>
        <span className={styles.fieldLabel}>Rego</span>
        <input
          id={regoId}
          className={styles.input}
          type="text"
          placeholder="ABC-123"
          autoComplete="off"
        />
      </label>

      <label className={styles.toggle}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
        />
        <span className={styles.toggleLabel}>Text me when it&apos;s ready</span>
      </label>

      <PreviewButton variant="primary" type="submit">
        Send request
      </PreviewButton>
    </form>
  )
}

interface PreviewButtonProps {
  variant: "primary" | "secondary"
  children: ReactNode
  type?: "button" | "submit"
}

function PreviewButton({
  variant,
  children,
  type = "button",
}: PreviewButtonProps): ReactNode {
  return (
    <button
      type={type}
      className={variant === "primary" ? styles.btnPrimary : styles.btnSecondary}
    >
      {children}
    </button>
  )
}
