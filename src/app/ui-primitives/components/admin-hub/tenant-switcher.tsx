"use client"

import { Check, ChevronsUpDown, Globe2, Plus, Star } from "lucide-react"
import { useState } from "react"

import { adminToneToVar, type Tenant } from "./admin-hub-types"

import styles from "./tenant-switcher.module.css"

interface TenantSwitcherProps {
  tenants: ReadonlyArray<Tenant>
  /** ID of the currently active tenant. */
  activeTenantId: string
  /** Force open in showcase. Defaults to false. */
  defaultOpen?: boolean
  onSwitch?: (tenantId: string) => void
  className?: string
}

export function TenantSwitcher({
  tenants,
  activeTenantId,
  defaultOpen = false,
  onSwitch,
  className,
}: TenantSwitcherProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const active = tenants.find((t) => t.id === activeTenantId) ?? tenants[0]

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Active workspace: ${active.name}. Click to switch.`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={styles.badge}
          style={{ "--badge-tone": adminToneToVar(active.tone) } as React.CSSProperties}
          aria-hidden="true"
        >
          {active.badge}
        </span>
        <span className={styles.identity}>
          <span className={styles.workspaceName}>{active.name}</span>
          <span className={styles.domain}>
            <Globe2 size={10} strokeWidth={2.4} aria-hidden="true" />
            {active.domain}
          </span>
        </span>
        <ChevronsUpDown
          size={14}
          strokeWidth={2.4}
          className={styles.chevron}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className={styles.menu} role="dialog" aria-label="Workspace switcher">
          <header className={styles.menuHead}>
            <span className={styles.menuKicker}>Workspaces</span>
            <span className={styles.menuCount}>{tenants.length} available</span>
          </header>

          <ul className={styles.list} role="listbox" aria-label="Workspaces">
            {tenants.map((tenant) => {
              const isActive = tenant.id === activeTenantId
              return (
                <li
                  key={tenant.id}
                  role="option"
                  tabIndex={0}
                  aria-selected={isActive}
                  className={[styles.item, isActive ? styles.itemActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    onSwitch?.(tenant.id)
                    setOpen(false)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      onSwitch?.(tenant.id)
                      setOpen(false)
                    }
                  }}
                >
                  <span
                    className={styles.itemBadge}
                    style={{ "--badge-tone": adminToneToVar(tenant.tone) } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    {tenant.badge}
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemTitleRow}>
                      <span className={styles.itemTitle}>{tenant.name}</span>
                      {tenant.primary && (
                        <span className={styles.primaryTag}>
                          <Star size={9} strokeWidth={2.6} aria-hidden="true" />
                          Primary
                        </span>
                      )}
                    </span>
                    <span className={styles.itemDomain}>{tenant.domain}</span>
                  </span>
                  {isActive && (
                    <Check
                      size={14}
                      strokeWidth={2.6}
                      className={styles.checkIcon}
                      aria-label="Active"
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <footer className={styles.menuFoot}>
            <button type="button" className={styles.addButton}>
              <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
              Add workspace
            </button>
          </footer>
        </div>
      )}
    </div>
  )
}

export default TenantSwitcher
