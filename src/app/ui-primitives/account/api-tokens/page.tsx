import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { Chip } from "../../components/primitives/chip"
import { ApiTokenRow, type ApiTokenRowItem } from "../../components/account/api-token-row"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "API tokens · Account | UI Primitives",
}

const TOKENS: ReadonlyArray<ApiTokenRowItem> = [
  {
    id: "tok-deployer",
    name: "Workshop deployer",
    maskedValue: "ofm_pat_9b1c•••••••••••••••••a420",
    scopes: ["repo:read", "actions:write", "workshop:deploy"],
    lastUsed: "8 min ago",
    createdBy: "Daniel Fleuren",
    expiresAt: "12 Aug 2026",
  },
  {
    id: "tok-fleet-api",
    name: "Fleet customer API",
    maskedValue: "ofm_pat_dx2k•••••••••••••••••ze17",
    scopes: ["customer:read", "quote:write"],
    lastUsed: "Yesterday, 23:18",
    createdBy: "Mara Kovac",
    expiresAt: "01 Dec 2026",
  },
  {
    id: "tok-bay-tablet",
    name: "Bay 02 tablet sync",
    maskedValue: "ofm_pat_t7uq•••••••••••••••••pl09",
    scopes: ["bay:read", "job:write", "workshop:tablet"],
    lastUsed: "Today, 06:42",
    createdBy: "Jaylen Souto",
    expiresAt: "30 Sep 2026",
  },
  {
    id: "tok-reporting",
    name: "Reporting read-only",
    maskedValue: "ofm_pat_r1ev•••••••••••••••••gn85",
    scopes: ["analytics:read"],
    lastUsed: "3 days ago",
    createdBy: "Sienna Park",
    expiresAt: "—",
  },
]

const SCOPE_PREVIEW: ReadonlyArray<{ label: string; tone: "neutral" | "amber" | "teal" | "green" | "red" }> = [
  { label: "workshop:read", tone: "teal" },
  { label: "workshop:write", tone: "amber" },
  { label: "bay:read", tone: "teal" },
  { label: "bay:write", tone: "amber" },
  { label: "customer:read", tone: "teal" },
  { label: "customer:write", tone: "amber" },
  { label: "quote:write", tone: "amber" },
  { label: "billing:read", tone: "teal" },
  { label: "billing:admin", tone: "red" },
  { label: "analytics:read", tone: "teal" },
  { label: "audit:read", tone: "green" },
  { label: "admin:all", tone: "red" },
]

export default function AccountApiTokensPage() {
  return (
    <>
      <PageHeader
        kicker="18.8 / API tokens"
        title="API tokens"
        description="Personal access tokens for the Oak Flats workshop API. Scope tightly, rotate often."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "API tokens" },
        ]}
      />

      <section className={styles.card} aria-labelledby="tokens-create-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="tokens-create-heading" className={styles.cardTitle}>
              Create token
            </h2>
            <p className={styles.cardSub}>
              Tokens are shown once at creation — copy and store securely.
            </p>
          </div>
          <button type="button" className={styles.btnPrimary}>
            Generate new token
          </button>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="token-name">
              Token name
            </label>
            <input
              id="token-name"
              className={styles.fieldInput}
              placeholder="e.g. Wollongong floor tablet"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="token-expiry">
              Expiry
            </label>
            <select id="token-expiry" className={styles.fieldSelect} defaultValue="90">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="never">No expiry</option>
            </select>
          </div>
        </div>

        <div className={styles.scopePicker}>
          <h3 className={styles.scopePickerTitle}>Scopes</h3>
          <div className={styles.scopePickerList}>
            {SCOPE_PREVIEW.map((scope) => (
              <Chip key={scope.label} label={scope.label} tone={scope.tone} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="tokens-existing-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Active tokens</span>
          <h2 id="tokens-existing-heading" className={styles.sectionTitle}>
            4 personal access tokens
          </h2>
        </header>
        <ul className={styles.list} role="list">
          {TOKENS.map((token) => (
            <li key={token.id}>
              <ApiTokenRow token={token} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
