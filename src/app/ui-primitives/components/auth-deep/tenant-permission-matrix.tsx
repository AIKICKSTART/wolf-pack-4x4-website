"use client"

import { useId } from "react"

import {
  TENANT_LABEL,
  type MufflermenTenantId,
  type PermissionVerb,
} from "./auth-deep-types"
import styles from "./tenant-permission-matrix.module.css"

export interface PermissionScope {
  /** Stable scope id, e.g. "billing.invoices". */
  id: string
  /** Display label, e.g. "Billing → Invoices". */
  label: string
  /** Optional secondary explanation. */
  hint?: string
}

export interface PermissionAssignment {
  /** Principal id, e.g. user id. */
  principalId: string
  /** Principal display label. */
  principalLabel: string
  /** Permissions per scope id; key = scope id, value = verbs granted. */
  byScope: Record<string, ReadonlyArray<PermissionVerb>>
}

export interface TenantPermissionMatrixProps {
  /** Tenant the matrix scopes to. */
  tenantId: MufflermenTenantId
  /** Scope rows, in display order. */
  scopes: ReadonlyArray<PermissionScope>
  /** Verbs to show as columns. */
  verbs: ReadonlyArray<PermissionVerb>
  /** Single principal whose grants we render. */
  assignment: PermissionAssignment
  /** Fires when admin toggles a permission cell. */
  onToggle?: (scopeId: string, verb: PermissionVerb, nextGranted: boolean) => void
}

const VERB_LABEL: Record<PermissionVerb, string> = {
  view: "View",
  edit: "Edit",
  create: "Create",
  delete: "Delete",
  approve: "Approve",
  admin: "Admin",
}

const VERB_ABBR: Record<PermissionVerb, string> = {
  view: "V",
  edit: "E",
  create: "C",
  delete: "D",
  approve: "A",
  admin: "★",
}

function hasGrant(
  byScope: PermissionAssignment["byScope"],
  scopeId: string,
  verb: PermissionVerb,
): boolean {
  const verbs = byScope[scopeId]
  if (!verbs) return false
  return verbs.includes(verb)
}

export function TenantPermissionMatrix({
  tenantId,
  scopes,
  verbs,
  assignment,
  onToggle,
}: TenantPermissionMatrixProps) {
  const captionId = useId()
  const tenantLabel = TENANT_LABEL[tenantId]

  return (
    <section
      className={styles.wrap}
      aria-labelledby={captionId}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{tenantLabel} · Permission matrix</span>
        <h3 id={captionId} className={styles.title}>
          {assignment.principalLabel}
        </h3>
        <p className={styles.subtitle}>
          Per-scope verbs. Cell toggles grant the verb. Admin overrides all
          other verbs.
        </p>
      </header>

      <div className={styles.tableWrap} role="region" aria-labelledby={captionId}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.scopeHeader}>
                Scope
              </th>
              {verbs.map((verb) => (
                <th
                  key={verb}
                  scope="col"
                  className={styles.verbHeader}
                  aria-label={VERB_LABEL[verb]}
                >
                  <span className={styles.verbAbbr} aria-hidden="true">
                    {VERB_ABBR[verb]}
                  </span>
                  <span className={styles.verbLabel}>{VERB_LABEL[verb]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scopes.map((scope) => {
              const adminGranted = hasGrant(assignment.byScope, scope.id, "admin")
              return (
                <tr key={scope.id} className={styles.row}>
                  <th scope="row" className={styles.scopeCell}>
                    <span className={styles.scopeLabel}>{scope.label}</span>
                    {scope.hint ? (
                      <span className={styles.scopeHint}>{scope.hint}</span>
                    ) : null}
                  </th>
                  {verbs.map((verb) => {
                    const granted = adminGranted || hasGrant(assignment.byScope, scope.id, verb)
                    const isAdminVerb = verb === "admin"
                    const checkboxId = `${captionId}-${scope.id}-${verb}`
                    const inheritedFromAdmin = adminGranted && !isAdminVerb
                    return (
                      <td key={verb} className={styles.cell}>
                        <label
                          htmlFor={checkboxId}
                          className={styles.toggle}
                          data-on={granted}
                          data-inherited={inheritedFromAdmin}
                          data-admin={isAdminVerb}
                        >
                          <input
                            id={checkboxId}
                            type="checkbox"
                            className={styles.input}
                            checked={granted}
                            onChange={(event) =>
                              onToggle?.(scope.id, verb, event.currentTarget.checked)
                            }
                            aria-label={`${VERB_LABEL[verb]} on ${scope.label} for ${assignment.principalLabel}`}
                          />
                          <span className={styles.toggleGlyph} aria-hidden="true" />
                        </label>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <footer className={styles.legend} aria-hidden="true">
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendGranted}`} />
          Granted
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendInherited}`} />
          Inherited from admin
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendOff}`} />
          Denied
        </span>
      </footer>
    </section>
  )
}

export default TenantPermissionMatrix
