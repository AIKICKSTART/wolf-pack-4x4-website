"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { DataTable, type DataTableColumn } from "../data-display/data-table"

import styles from "./token-inspector.module.css"
import { useThemeController } from "./theme-controller"
import { TOKEN_CSS_VAR, themeTokens, type ThemeToken } from "./theme-tokens"

interface TokenInspectorProps {
  className?: string
}

interface TokenRow {
  token: ThemeToken
  cssVar: string
  value: string
}

export function TokenInspector({ className }: TokenInspectorProps) {
  const { values } = useThemeController()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (rowId: string, text: string): Promise<void> => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(rowId)
      window.setTimeout(() => setCopiedId((current) => (current === rowId ? null : current)), 1400)
    } catch {
      setCopiedId(null)
    }
  }

  const rows: ReadonlyArray<TokenRow> = themeTokens.map((token) => ({
    token,
    cssVar: TOKEN_CSS_VAR[token.id],
    value: values[token.id],
  }))

  const columns: ReadonlyArray<DataTableColumn<TokenRow>> = [
    {
      id: "token",
      header: "Token",
      cell: (row) => (
        <div className={styles.tokenCell}>
          <span className={styles.tokenLabel}>{row.token.label}</span>
          <code className={styles.tokenCode}>{row.cssVar}</code>
        </div>
      ),
    },
    {
      id: "category",
      header: "Type",
      cell: (row) => <span className={styles.category}>{row.token.category}</span>,
      width: "110px",
    },
    {
      id: "preview",
      header: "Preview",
      cell: (row) => <TokenPreview token={row.token} value={row.value} />,
      width: "150px",
    },
    {
      id: "value",
      header: "Value",
      cell: (row) => <code className={styles.valueCode}>{row.value}</code>,
    },
    {
      id: "copy",
      header: "",
      cell: (row) => (
        <button
          type="button"
          className={styles.copyBtn}
          onClick={() => handleCopy(row.token.id, row.value)}
          aria-label={`Copy ${row.token.label} value`}
        >
          {copiedId === row.token.id ? (
            <Check size={13} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Copy size={13} strokeWidth={2.2} aria-hidden="true" />
          )}
        </button>
      ),
      width: "60px",
      align: "right",
    },
  ]

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={wrapperClass} aria-label="Theme token inspector">
      <div className={styles.head}>
        <span className={styles.kicker}>Inspector</span>
        <h2 className={styles.title}>Live tokens</h2>
        <p className={styles.lede}>
          Every controllable token, current value, preview, and copy chip. Updates broadcast as you change presets
          or individual tokens.
        </p>
      </div>
      <div className={styles.liveBadge} role="status" aria-live="polite">
        {copiedId ? `Copied ${copiedId}` : "Live"}
      </div>
      <DataTable
        rows={rows.slice()}
        columns={columns}
        getRowId={(row) => row.token.id}
        caption="Theme token inspector"
        density="compact"
        zebra
        className={styles.inspectorTable}
      />
    </section>
  )
}

interface TokenPreviewProps {
  token: ThemeToken
  value: string
}

function TokenPreview({ token, value }: TokenPreviewProps) {
  if (token.category === "type") {
    return (
      <span className={styles.previewType} style={{ fontFamily: value }}>
        Aa Bb 0123
      </span>
    )
  }
  return <span className={styles.previewSwatch} style={{ background: value }} aria-hidden="true" />
}
