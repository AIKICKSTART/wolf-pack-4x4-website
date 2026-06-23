"use client"

import { QuoteBubble } from "../primitives/quote-bubble"

import styles from "./api-scope-chip.module.css"

export type ApiScopeAction = "read" | "write" | "admin" | "delete"

interface ApiScopeChipProps {
  /** Scope identifier, e.g. `workshop.read`. */
  scope: string
  /** Plain-language description for the tooltip bubble. */
  description: string
  /** Override the inferred action. */
  action?: ApiScopeAction
  className?: string
  /** Render as a button (selectable) or static label. */
  as?: "label" | "button"
  selected?: boolean
  onClick?: () => void
}

function inferAction(scope: string): ApiScopeAction {
  const trailing = scope.split(".").pop()?.toLowerCase() ?? "read"
  if (trailing.includes("admin")) return "admin"
  if (trailing.includes("delete")) return "delete"
  if (trailing.includes("write") || trailing.includes("create") || trailing.includes("update")) {
    return "write"
  }
  return "read"
}

const ACTION_TONE: Record<ApiScopeAction, { className: string; bubble: "obsidian" | "amber" | "teal" | "red" }> = {
  read: { className: "actionRead", bubble: "teal" },
  write: { className: "actionWrite", bubble: "amber" },
  admin: { className: "actionAdmin", bubble: "red" },
  delete: { className: "actionDelete", bubble: "red" },
}

export function ApiScopeChip({
  scope,
  description,
  action,
  className,
  as = "label",
  selected = false,
  onClick,
}: ApiScopeChipProps) {
  const resolved = action ?? inferAction(scope)
  const toneClass = styles[ACTION_TONE[resolved].className] ?? ""
  const classes = [styles.chip, toneClass, selected && styles.selected, className]
    .filter(Boolean)
    .join(" ")

  const contents = (
    <>
      <code className={styles.scope}>{scope}</code>
      <span className={styles.action} data-action={resolved}>
        {resolved}
      </span>
    </>
  )

  if (as === "button") {
    return (
      <span className={styles.wrap}>
        <button
          type="button"
          className={classes}
          aria-pressed={selected}
          onClick={onClick}
        >
          {contents}
        </button>
        <span className={styles.bubbleSlot} aria-hidden="true">
          <QuoteBubble side="bottom" tone={ACTION_TONE[resolved].bubble} label={description}>
            {description}
          </QuoteBubble>
        </span>
      </span>
    )
  }

  return (
    <span className={styles.wrap}>
      <span className={classes} role="img" aria-label={`${scope}: ${description}`}>
        {contents}
      </span>
      <span className={styles.bubbleSlot} aria-hidden="true">
        <QuoteBubble side="bottom" tone={ACTION_TONE[resolved].bubble} label={description}>
          {description}
        </QuoteBubble>
      </span>
    </span>
  )
}

export default ApiScopeChip
