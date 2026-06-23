"use client"

import { Copy, Plus, RefreshCcw, Trash2 } from "lucide-react"
import { useCallback, useId, useMemo, useState } from "react"

import { Chip } from "../primitives/chip"
import type { ApiKeyScope, ApiKeyStatus } from "./api-console-types"

import styles from "./api-key-manager.module.css"

export interface ApiKeyRecord {
  id: string
  name: string
  maskedValue: string
  status: ApiKeyStatus
  scopes: ReadonlyArray<ApiKeyScope>
  createdAt: string
  lastUsedAt: string | null
  rotatesAt?: string
}

interface ApiKeyManagerProps {
  keys: ReadonlyArray<ApiKeyRecord>
  /** All scopes the workshop is allowed to grant. */
  availableScopes: ReadonlyArray<ApiKeyScope>
  onCreate?: (input: { name: string; scopes: ReadonlyArray<ApiKeyScope> }) => void
  onCopy?: (id: string) => void
  onRotate?: (id: string) => void
  onRevoke?: (id: string) => void
  onScopeToggle?: (id: string, scope: ApiKeyScope) => void
  className?: string
}

const STATUS_TONE: Record<ApiKeyStatus, "green" | "amber" | "red"> = {
  active: "green",
  rotating: "amber",
  revoked: "red",
}

const STATUS_LABEL: Record<ApiKeyStatus, string> = {
  active: "Active",
  rotating: "Rotating",
  revoked: "Revoked",
}

export function ApiKeyManager({
  keys,
  availableScopes,
  onCreate,
  onCopy,
  onRotate,
  onRevoke,
  onScopeToggle,
  className,
}: ApiKeyManagerProps) {
  const [name, setName] = useState("")
  const [picked, setPicked] = useState<ReadonlyArray<ApiKeyScope>>([])
  const nameId = useId()
  const classes = [styles.manager, className].filter(Boolean).join(" ")

  const activeCount = useMemo(
    () => keys.filter((key) => key.status === "active").length,
    [keys],
  )

  const togglePicked = useCallback((scope: ApiKeyScope) => {
    setPicked((prev) => (prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]))
  }, [])

  const handleSubmit = useCallback(() => {
    if (name.trim().length === 0 || picked.length === 0) {
      return
    }
    onCreate?.({ name: name.trim(), scopes: picked })
    setName("")
    setPicked([])
  }, [name, picked, onCreate])

  return (
    <section className={classes} aria-label="API key manager">
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>Workshop API keys</span>
          <h3 className={styles.title}>
            {keys.length} key{keys.length === 1 ? "" : "s"} — {activeCount} active
          </h3>
        </div>
      </header>

      <form
        className={styles.createForm}
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
      >
        <div className={styles.createTop}>
          <label htmlFor={nameId} className={styles.formLabel}>
            New key label
          </label>
          <input
            id={nameId}
            type="text"
            className={styles.nameInput}
            value={name}
            placeholder="e.g. Workshop booking webhook"
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            maxLength={64}
          />
          <button
            type="submit"
            className={styles.createBtn}
            disabled={name.trim().length === 0 || picked.length === 0}
          >
            <Plus size={13} strokeWidth={2.6} aria-hidden="true" />
            <span>Create key</span>
          </button>
        </div>
        <fieldset className={styles.scopePicker}>
          <legend className={styles.scopeLegend}>Scopes</legend>
          <div className={styles.scopeRow}>
            {availableScopes.map((scope) => (
              <Chip
                key={scope}
                label={scope}
                tone={picked.includes(scope) ? "amber" : "neutral"}
                selected={picked.includes(scope)}
                onSelect={() => togglePicked(scope)}
              />
            ))}
          </div>
        </fieldset>
      </form>

      <ul className={styles.keyList} aria-label="Existing keys">
        {keys.map((key) => {
          const isRevoked = key.status === "revoked"
          return (
            <li
              key={key.id}
              className={[styles.keyRow, isRevoked && styles.keyRowRevoked].filter(Boolean).join(" ")}
            >
              <div className={styles.keyIdentity}>
                <div className={styles.keyTopRow}>
                  <span className={styles.keyName}>{key.name}</span>
                  <Chip
                    label={STATUS_LABEL[key.status]}
                    tone={STATUS_TONE[key.status]}
                  />
                </div>
                <div className={styles.keyValueRow}>
                  <code className={styles.maskedValue}>{key.maskedValue}</code>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => onCopy?.(key.id)}
                    aria-label={`Copy ${key.name}`}
                    disabled={isRevoked}
                  >
                    <Copy size={12} strokeWidth={2.4} aria-hidden="true" />
                  </button>
                </div>
                <dl className={styles.keyMeta}>
                  <div>
                    <dt>Created</dt>
                    <dd>{key.createdAt}</dd>
                  </div>
                  <div>
                    <dt>Last used</dt>
                    <dd>{key.lastUsedAt ?? "Never"}</dd>
                  </div>
                  {key.rotatesAt && (
                    <div>
                      <dt>Auto-rotate</dt>
                      <dd>{key.rotatesAt}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className={styles.keyScopes} aria-label={`${key.name} scopes`}>
                {availableScopes.map((scope) => {
                  const granted = key.scopes.includes(scope)
                  return (
                    <Chip
                      key={scope}
                      label={scope}
                      tone={granted ? "teal" : "neutral"}
                      selected={granted}
                      disabled={isRevoked}
                      onSelect={() => onScopeToggle?.(key.id, scope)}
                    />
                  )
                })}
              </div>

              <div className={styles.keyActions}>
                <button
                  type="button"
                  className={styles.rotateBtn}
                  onClick={() => onRotate?.(key.id)}
                  disabled={isRevoked}
                >
                  <RefreshCcw size={12} strokeWidth={2.4} aria-hidden="true" />
                  <span>Rotate</span>
                </button>
                <button
                  type="button"
                  className={styles.revokeBtn}
                  onClick={() => onRevoke?.(key.id)}
                  disabled={isRevoked}
                >
                  <Trash2 size={12} strokeWidth={2.4} aria-hidden="true" />
                  <span>Revoke</span>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ApiKeyManager
