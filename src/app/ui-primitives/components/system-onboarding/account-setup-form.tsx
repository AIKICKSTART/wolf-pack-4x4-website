"use client"

import {
  ACCOUNT_ROLE_LABEL,
  type AccountRole,
  type AccountSetupFieldError,
  type AccountSetupValues,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./account-setup-form.module.css"

export interface AccountSetupFormProps {
  /** Eyebrow label eg "Step 1 / Account". */
  kicker: string
  /** Big title eg "Set up your admin account". */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Pre-populated values eg the values captured from the signup form. */
  values: AccountSetupValues
  /** Available IANA timezones eg ["Australia/Sydney", ...]. */
  timezones: ReadonlyArray<string>
  /** Optional list of available roles — defaults to all. */
  roles?: ReadonlyArray<AccountRole>
  /** Optional field-level validation errors. */
  errors?: ReadonlyArray<AccountSetupFieldError>
  /** Label rendered on the primary CTA. */
  submitLabel?: string
  /** Label rendered on the secondary "back" CTA. */
  backLabel?: string
  /** Whether the form is disabled while submitting. */
  busy?: boolean
  className?: string
}

const DEFAULT_ROLES: ReadonlyArray<AccountRole> = ["owner", "manager", "accounts", "viewer"]

function findError(
  errors: ReadonlyArray<AccountSetupFieldError> | undefined,
  field: keyof AccountSetupValues,
): string | undefined {
  return errors?.find((error) => error.field === field)?.message
}

export function AccountSetupForm({
  kicker,
  title,
  description,
  values,
  timezones,
  roles = DEFAULT_ROLES,
  errors,
  submitLabel = "Continue · Workshop",
  backLabel = "Back",
  busy = false,
  className,
}: AccountSetupFormProps) {
  const classes = [shell.shell, styles.card, className].filter(Boolean).join(" ")
  const fullNameError = findError(errors, "fullName")
  const emailError = findError(errors, "email")
  const roleError = findError(errors, "role")
  const timezoneError = findError(errors, "timezone")

  return (
    <form className={classes} aria-label={title} onSubmit={(event) => event.preventDefault()}>
      <header className={shell.shellHead}>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={shell.title}>{title}</h2>
        <p className={shell.subtitle}>{description}</p>
      </header>

      <fieldset className={styles.fieldset} disabled={busy}>
        <legend className={styles.legend}>Admin profile</legend>

        <div className={shell.field}>
          <label htmlFor="so-account-name" className={shell.label}>
            Full name
          </label>
          <input
            id="so-account-name"
            name="fullName"
            type="text"
            className={shell.input}
            defaultValue={values.fullName}
            autoComplete="name"
            aria-invalid={fullNameError ? "true" : undefined}
            aria-describedby={fullNameError ? "so-account-name-error" : undefined}
            required
          />
          {fullNameError ? (
            <span id="so-account-name-error" className={shell.fieldError}>
              {fullNameError}
            </span>
          ) : null}
        </div>

        <div className={shell.field}>
          <label htmlFor="so-account-email" className={shell.label}>
            Work email
          </label>
          <input
            id="so-account-email"
            name="email"
            type="email"
            className={shell.input}
            defaultValue={values.email}
            autoComplete="email"
            aria-invalid={emailError ? "true" : undefined}
            aria-describedby={emailError ? "so-account-email-error" : undefined}
            required
          />
          {emailError ? (
            <span id="so-account-email-error" className={shell.fieldError}>
              {emailError}
            </span>
          ) : null}
        </div>

        <div className={shell.fieldRow}>
          <div className={shell.field}>
            <label htmlFor="so-account-role" className={shell.label}>
              Role
            </label>
            <select
              id="so-account-role"
              name="role"
              className={shell.select}
              defaultValue={values.role}
              aria-invalid={roleError ? "true" : undefined}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {ACCOUNT_ROLE_LABEL[role]}
                </option>
              ))}
            </select>
            {roleError ? (
              <span className={shell.fieldError}>{roleError}</span>
            ) : null}
          </div>

          <div className={shell.field}>
            <label htmlFor="so-account-tz" className={shell.label}>
              Timezone
            </label>
            <select
              id="so-account-tz"
              name="timezone"
              className={shell.select}
              defaultValue={values.timezone}
              aria-invalid={timezoneError ? "true" : undefined}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            {timezoneError ? (
              <span className={shell.fieldError}>{timezoneError}</span>
            ) : null}
          </div>
        </div>

        <label className={[shell.switch, styles.optInRow].join(" ")}>
          <span style={{ position: "relative", display: "inline-block" }}>
            <input
              name="marketingOptIn"
              type="checkbox"
              className={shell.switchInput}
              defaultChecked={values.marketingOptIn}
            />
            <span className={shell.switchControl} aria-hidden="true" />
          </span>
          <span>
            Send me product updates from Mufflermen — releases, ADR-compliance
            news, integration drops. Roughly once a fortnight.
          </span>
        </label>
      </fieldset>

      <footer className={styles.foot}>
        <button type="button" className={[shell.button, shell.buttonGhost].join(" ")}>
          {backLabel}
        </button>
        <button
          type="submit"
          className={[shell.button, shell.buttonPrimary, shell.toneRed].join(" ")}
          disabled={busy}
        >
          {submitLabel}
          <span aria-hidden="true">→</span>
        </button>
      </footer>
    </form>
  )
}

export default AccountSetupForm
