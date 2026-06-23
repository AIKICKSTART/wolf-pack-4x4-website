import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { Avatar } from "../../components/primitives/avatar"
import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Profile · Account | UI Primitives",
}

const LOCALES: ReadonlyArray<{ value: string; label: string }> = [
  { value: "en-AU", label: "English (Australia)" },
  { value: "en-US", label: "English (United States)" },
  { value: "en-GB", label: "English (United Kingdom)" },
  { value: "mi-NZ", label: "Māori (Aotearoa)" },
]

const TIMEZONES: ReadonlyArray<{ value: string; label: string }> = [
  { value: "Australia/Sydney", label: "Sydney (AEDT, +11:00)" },
  { value: "Australia/Perth", label: "Perth (AWST, +08:00)" },
  { value: "Pacific/Auckland", label: "Auckland (NZDT, +13:00)" },
  { value: "Asia/Singapore", label: "Singapore (+08:00)" },
]

export default function AccountProfilePage() {
  return (
    <>
      <PageHeader
        kicker="18.1 / Profile"
        title="Profile"
        description="Identity, contact, locale, and the avatar shown across workshop touchpoints."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Profile" },
        ]}
      />

      <section className={styles.card} aria-labelledby="profile-identity-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="profile-identity-heading" className={styles.cardTitle}>
              Identity
            </h2>
            <p className={styles.cardSub}>Shown on quotes, invoices, and customer SMS.</p>
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="profile-first">
              First name
            </label>
            <input
              id="profile-first"
              className={styles.fieldInput}
              defaultValue="Daniel"
              autoComplete="given-name"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="profile-last">
              Last name
            </label>
            <input
              id="profile-last"
              className={styles.fieldInput}
              defaultValue="Fleuren"
              autoComplete="family-name"
            />
          </div>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.fieldLabel} htmlFor="profile-display">
              Display name
            </label>
            <input
              id="profile-display"
              className={styles.fieldInput}
              defaultValue="Dan from Oak Flats"
              aria-describedby="profile-display-help"
            />
            <span id="profile-display-help" className={styles.fieldHelper}>
              Used in customer-facing SMS dispatch lines.
            </span>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="profile-email">
              Email
            </label>
            <input
              id="profile-email"
              className={styles.fieldInput}
              type="email"
              defaultValue="daniel@mufflermen.com.au"
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="profile-phone">
              Phone
            </label>
            <input
              id="profile-phone"
              className={styles.fieldInput}
              type="tel"
              defaultValue="+61 2 4257 5500"
              autoComplete="tel"
            />
          </div>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="profile-avatar-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="profile-avatar-heading" className={styles.cardTitle}>
              Avatar
            </h2>
            <p className={styles.cardSub}>PNG / JPG / SVG · max 4 MB · square crop applied.</p>
          </div>
        </div>
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <div className={styles.checkboxRow}>
              <Avatar name="Daniel Fleuren" tone="red" size="xl" />
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="profile-avatar-upload">
                  Replace avatar
                </label>
                <input
                  id="profile-avatar-upload"
                  className={styles.fieldInput}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="profile-locale-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="profile-locale-heading" className={styles.cardTitle}>
              Locale &amp; timezone
            </h2>
            <p className={styles.cardSub}>
              Drives default invoice currency, SMS phrasing, and the bay job clock.
            </p>
          </div>
        </div>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="profile-locale">
              Locale
            </label>
            <select id="profile-locale" className={styles.fieldSelect} defaultValue="en-AU">
              {LOCALES.map((locale) => (
                <option key={locale.value} value={locale.value}>
                  {locale.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="profile-timezone">
              Timezone
            </label>
            <select
              id="profile-timezone"
              className={styles.fieldSelect}
              defaultValue="Australia/Sydney"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className={styles.savebar} role="region" aria-label="Save profile changes">
        <span className={styles.savebarHint}>Unsaved · 3 fields ready to commit</span>
        <div className={styles.savebarActions}>
          <button type="button" className={styles.btnGhost}>
            Discard
          </button>
          <button type="button" className={styles.btnPrimary}>
            Save changes
          </button>
        </div>
      </div>
    </>
  )
}
