"use client"

import { Chip } from "../primitives/chip"

import type {
  WorkshopConfigValues,
  WorkshopService,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./workshop-config-card.module.css"

export interface WorkshopConfigCardProps {
  /** Eyebrow label eg "Step 2 / Workshop". */
  kicker: string
  /** Big title eg "Tell us about Illawarra Tyres & Brakes". */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Tenant-supplied workshop values. */
  values: WorkshopConfigValues
  /** Master list of services the tenant can offer. */
  serviceCatalogue: ReadonlyArray<WorkshopService>
  /** Submit CTA label. */
  submitLabel?: string
  /** Back CTA label. */
  backLabel?: string
  className?: string
}

function isServiceSelected(
  selected: ReadonlyArray<string>,
  serviceId: string,
): boolean {
  return selected.includes(serviceId)
}

export function WorkshopConfigCard({
  kicker,
  title,
  description,
  values,
  serviceCatalogue,
  submitLabel = "Continue · Integrations",
  backLabel = "Back",
  className,
}: WorkshopConfigCardProps) {
  const classes = [shell.shell, styles.card, className].filter(Boolean).join(" ")

  return (
    <form className={classes} aria-label={title} onSubmit={(event) => event.preventDefault()}>
      <header className={shell.shellHead}>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={shell.title}>{title}</h2>
        <p className={shell.subtitle}>{description}</p>
      </header>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Business</legend>

        <div className={shell.field}>
          <label htmlFor="so-workshop-trading" className={shell.label}>
            Trading name
          </label>
          <input
            id="so-workshop-trading"
            name="tradingName"
            type="text"
            className={shell.input}
            defaultValue={values.tradingName}
            autoComplete="organization"
            required
          />
        </div>

        <div className={shell.fieldRow}>
          <div className={shell.field}>
            <label htmlFor="so-workshop-abn" className={shell.label}>
              ABN
            </label>
            <input
              id="so-workshop-abn"
              name="abn"
              type="text"
              className={shell.input}
              defaultValue={values.abn}
              inputMode="numeric"
              pattern="[0-9 ]+"
              required
            />
          </div>
          <div className={shell.field}>
            <label htmlFor="so-workshop-bays" className={shell.label}>
              Workshop bays
            </label>
            <input
              id="so-workshop-bays"
              name="bayCount"
              type="number"
              min={1}
              max={40}
              className={shell.input}
              defaultValue={values.bayCount}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Address</legend>

        <div className={shell.field}>
          <label htmlFor="so-workshop-line" className={shell.label}>
            Street address
          </label>
          <input
            id="so-workshop-line"
            name="addressLine"
            type="text"
            className={shell.input}
            defaultValue={values.addressLine}
            autoComplete="street-address"
            required
          />
        </div>

        <div className={shell.fieldRow}>
          <div className={shell.field}>
            <label htmlFor="so-workshop-suburb" className={shell.label}>
              Suburb
            </label>
            <input
              id="so-workshop-suburb"
              name="suburb"
              type="text"
              className={shell.input}
              defaultValue={values.suburb}
              autoComplete="address-level2"
              required
            />
          </div>
          <div className={shell.field}>
            <label htmlFor="so-workshop-state" className={shell.label}>
              State
            </label>
            <input
              id="so-workshop-state"
              name="state"
              type="text"
              className={shell.input}
              defaultValue={values.state}
              autoComplete="address-level1"
              required
            />
          </div>
          <div className={shell.field}>
            <label htmlFor="so-workshop-postcode" className={shell.label}>
              Postcode
            </label>
            <input
              id="so-workshop-postcode"
              name="postcode"
              type="text"
              className={shell.input}
              defaultValue={values.postcode}
              autoComplete="postal-code"
              inputMode="numeric"
              pattern="[0-9]{4}"
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Trading hours</legend>
        <ul className={styles.hoursGrid}>
          {values.hours.map((day) => (
            <li
              key={day.day}
              className={[
                styles.hourRow,
                day.closed ? styles.hourRowClosed : null,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.dayLabel}>{day.day}</span>
              {day.closed ? (
                <span className={[shell.chip, shell.chipQuiet].join(" ")}>Closed</span>
              ) : (
                <span className={[styles.hourValue, shell.tabular].join(" ")}>
                  {day.open} – {day.close}
                </span>
              )}
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Services offered</legend>
        <p className={shell.helper}>
          Pick everything you can quote and deliver from this workshop. You can
          add or remove services later.
        </p>
        <ul className={styles.servicesGrid}>
          {serviceCatalogue.map((service) => {
            const selected = isServiceSelected(values.services, service.id)
            return (
              <li key={service.id}>
                <Chip
                  label={`${service.glyph}  ${service.label}`}
                  tone={selected ? "red" : "neutral"}
                  selected={selected}
                />
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

export default WorkshopConfigCard
