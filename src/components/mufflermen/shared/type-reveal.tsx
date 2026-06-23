"use client"

import * as React from "react"

// ── Character-level reveal — "machined" typing feel ────────────
// Glyphs render via CSS ::before from data-ch so the DOM text stays a single
// clean string for search engines and screen readers (no sr-only duplicate).
export function TypeReveal({
  text,
  chrome,
  accent,
  srText = true,
}: {
  text: string
  chrome?: boolean
  accent?: boolean
  /** Set false when a parent (e.g. a multi-line h1) provides one combined sr-only string. */
  srText?: boolean
}) {
  const words = React.useMemo(() => {
    const tokens = text.split(/(\s+)/)

    return tokens.map((token, tokenIndex) => {
      const isSpace = /^\s+$/.test(token)
      const chars = isSpace ? [] : Array.from(token)
      const start = tokens
        .slice(0, tokenIndex)
        .reduce(
          (total, item) =>
            total + (/^\s+$/.test(item) ? 1 : Array.from(item).length),
          0,
        )
      return { chars, isSpace, start, token }
    })
  }, [text])

  return (
    <span className={`type-reveal ${chrome ? "chrome" : ""} ${accent ? "accent" : ""}`}>
      {/* Screen readers get the plain text; the animated chars are decorative. */}
      {srText ? <span className="sr-only">{text}</span> : null}
      {words.map((word, wordIndex) =>
        word.isSpace ? (
          <span
            key={`${word.token}-${wordIndex}`}
            className="word-gap"
            aria-hidden="true"
          >
            {" "}
          </span>
        ) : (
          <span
            key={`${word.token}-${wordIndex}`}
            className="word"
            aria-hidden="true"
          >
            {word.chars.map((ch, charIndex) => (
              <span
                key={`${ch}-${charIndex}`}
                className="ch"
                data-ch={ch}
                style={
                  {
                    "--d": `${(word.start + charIndex) * 28}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </span>
        ),
      )}
    </span>
  )
}
