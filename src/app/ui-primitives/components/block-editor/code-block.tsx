"use client"

import { Check, Copy, Hash, Terminal } from "lucide-react"
import { useId, useMemo, useState } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockPrimitiveProps,
  CodeLanguage,
  CodePayload,
  CodeTheme,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const LANGUAGE_LABEL: Record<CodeLanguage, string> = {
  bash: "Bash",
  javascript: "JavaScript",
  typescript: "TypeScript",
  json: "JSON",
  yaml: "YAML",
  css: "CSS",
  html: "HTML",
}

const THEME_CLASS: Record<CodeTheme, string> = {
  graphite: styles.codeThemeGraphite,
  amber: styles.codeThemeAmber,
  teal: styles.codeThemeTeal,
  violet: styles.codeThemeViolet,
}

const THEME_LABEL: Record<CodeTheme, string> = {
  graphite: "Graphite",
  amber: "Amber",
  teal: "Teal",
  violet: "Violet",
}

/** Per-language keyword sets used by the lightweight tokenizer below. */
const KEYWORDS: Record<CodeLanguage, ReadonlyArray<string>> = {
  bash: ["sudo", "cd", "ls", "echo", "exit", "if", "then", "fi", "for", "do", "done", "while", "export"],
  javascript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "import", "from", "export", "default", "class", "new", "true", "false", "null", "undefined"],
  typescript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "import", "from", "export", "default", "class", "new", "interface", "type", "as", "true", "false", "null", "undefined", "readonly", "public", "private"],
  json: ["true", "false", "null"],
  yaml: ["true", "false", "null"],
  css: ["important", "var", "calc", "clamp", "rgba", "rgb", "hsl", "px", "rem", "em"],
  html: ["DOCTYPE", "html", "head", "body", "div", "span", "section", "header", "footer", "article", "nav"],
}

interface Token {
  kind: "keyword" | "string" | "number" | "comment" | "tag" | "symbol" | "text"
  value: string
}

/**
 * Pure-function tokenizer — produces a deterministic SSR-safe token
 * stream so the inline highlighter renders without a Shiki dependency.
 */
function tokenize(language: CodeLanguage, source: string): ReadonlyArray<Token> {
  const tokens: Token[] = []
  const keywords = new Set(KEYWORDS[language] ?? [])
  let i = 0
  const len = source.length

  while (i < len) {
    const ch = source[i]
    const next = source[i + 1]

    // Comments
    if (
      (language === "bash" && ch === "#") ||
      ((language === "javascript" || language === "typescript" || language === "css") &&
        ch === "/" &&
        next === "/")
    ) {
      const start = i
      while (i < len && source[i] !== "\n") {
        i += 1
      }
      tokens.push({ kind: "comment", value: source.slice(start, i) })
      continue
    }

    // Strings
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch
      const start = i
      i += 1
      while (i < len && source[i] !== quote) {
        if (source[i] === "\\" && i + 1 < len) {
          i += 2
          continue
        }
        i += 1
      }
      i += 1
      tokens.push({ kind: "string", value: source.slice(start, Math.min(i, len)) })
      continue
    }

    // Numbers
    if (/[0-9]/.test(ch ?? "")) {
      const start = i
      while (i < len && /[0-9.]/.test(source[i] ?? "")) {
        i += 1
      }
      tokens.push({ kind: "number", value: source.slice(start, i) })
      continue
    }

    // HTML/XML tags
    if (language === "html" && ch === "<") {
      const start = i
      while (i < len && source[i] !== ">") {
        i += 1
      }
      i += 1
      tokens.push({ kind: "tag", value: source.slice(start, Math.min(i, len)) })
      continue
    }

    // Identifiers
    if (/[A-Za-z_$]/.test(ch ?? "")) {
      const start = i
      while (i < len && /[A-Za-z0-9_$-]/.test(source[i] ?? "")) {
        i += 1
      }
      const value = source.slice(start, i)
      tokens.push({ kind: keywords.has(value) ? "keyword" : "text", value })
      continue
    }

    // Symbols
    if (/[{}()[\];:,=+\-*/<>!&|]/.test(ch ?? "")) {
      tokens.push({ kind: "symbol", value: ch ?? "" })
      i += 1
      continue
    }

    // Whitespace + everything else
    const start = i
    while (i < len && /[\s]/.test(source[i] ?? "")) {
      i += 1
    }
    if (i === start) {
      tokens.push({ kind: "text", value: ch ?? "" })
      i += 1
    } else {
      tokens.push({ kind: "text", value: source.slice(start, i) })
    }
  }
  return tokens
}

const TOKEN_CLASS: Record<Token["kind"], string> = {
  keyword: styles.codeTokenKeyword,
  string: styles.codeTokenString,
  number: styles.codeTokenNumber,
  comment: styles.codeTokenComment,
  tag: styles.codeTokenTag,
  symbol: styles.codeTokenSymbol,
  text: "",
}

type CodeBlockProps = BlockPrimitiveProps<CodePayload>

export function CodeBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: CodeBlockProps) {
  const headingId = useId()
  const [copied, setCopied] = useState(false)
  const { language, theme, source, showLineNumbers, filename } = data.payload

  const tokens = useMemo(() => tokenize(language, source), [language, source])
  const lineCount = useMemo(() => source.split("\n").length, [source])

  const update = (next: Partial<CodePayload>): void => {
    if (!onChange) {
      return
    }
    onChange({
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    })
  }

  const handleCopy = async (): Promise<void> => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  const handleSourceInput = (event: React.FormEvent<HTMLElement>): void => {
    update({ source: event.currentTarget.textContent ?? "" })
  }

  const toolbar = (
    <>
      <select
        className={styles.toolbarSelect}
        value={language}
        onChange={(event) => update({ language: event.target.value as CodeLanguage })}
        aria-label="Code language"
      >
        {(Object.keys(LANGUAGE_LABEL) as ReadonlyArray<CodeLanguage>).map((id) => (
          <option key={id} value={id}>
            {LANGUAGE_LABEL[id]}
          </option>
        ))}
      </select>
      <select
        className={styles.toolbarSelect}
        value={theme}
        onChange={(event) => update({ theme: event.target.value as CodeTheme })}
        aria-label="Syntax theme"
      >
        {(Object.keys(THEME_LABEL) as ReadonlyArray<CodeTheme>).map((id) => (
          <option key={id} value={id}>
            {THEME_LABEL[id]}
          </option>
        ))}
      </select>
      <button
        type="button"
        className={`${styles.toolbarBtn} ${showLineNumbers ? styles.toolbarBtnActive : ""}`}
        aria-pressed={showLineNumbers}
        onClick={() => update({ showLineNumbers: !showLineNumbers })}
      >
        <Hash size={12} aria-hidden="true" />
        Lines
      </button>
    </>
  )

  return (
    <BlockShell
      kind="Code"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={headingId}
    >
      <div className={styles.codeHead}>
        <span className={styles.codeFilename} id={headingId}>
          <Terminal size={12} aria-hidden="true" /> {filename ?? `snippet.${language}`}
        </span>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className={`${styles.codeBody} ${THEME_CLASS[theme]}`}>
        {showLineNumbers ? (
          <div className={styles.codeLineNumbers} aria-hidden="true">
            {Array.from({ length: lineCount }, (_, idx) => idx + 1).map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        ) : null}
        <pre
          className={styles.codePre}
          contentEditable={mode === "edit"}
          suppressContentEditableWarning
          onInput={mode === "edit" ? handleSourceInput : undefined}
          role={mode === "edit" ? "textbox" : undefined}
          aria-multiline="true"
          aria-label={`${LANGUAGE_LABEL[language]} source`}
          spellCheck={false}
        >
          <code>
            {tokens.map((token, idx) => (
              <span key={idx} className={TOKEN_CLASS[token.kind]}>
                {token.value}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </BlockShell>
  )
}

export function CodeBlockEdit(props: CodeBlockProps) {
  return <CodeBlock {...props} mode="edit" />
}
