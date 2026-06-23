"use client"

import type { CSSProperties } from "react"

import type { Block, PropValue } from "../model"
import styles from "./block-styles.module.css"

/** Safe string read from a props bag. */
function str(props: Block["props"], key: string, fallback = ""): string {
  const value: PropValue | undefined = props[key]
  return typeof value === "string" ? value : fallback
}

/** Safe boolean read. */
function bool(props: Block["props"], key: string): boolean {
  return props[key] === true
}

interface BlockRenderProps {
  block: Block
}

/**
 * Token-driven visual preview of a demo block. Every visual value resolves to a
 * central `--primitive-*` token via the CSS module classes here — this file
 * carries no design literals. The renderer is intentionally lightweight: it
 * paints a faithful-enough preview for the builder canvas, not the production
 * component (the real components live in their own families).
 */
export function BlockRender({ block }: BlockRenderProps) {
  switch (block.type) {
    case "hero/service-spotlight":
      return (
        <div className={styles.bHero}>
          <p className={styles.bHeroKicker}>Service spotlight</p>
          <h2 className={styles.bHeroTitle}>{str(block.props, "headline", "Headline")}</h2>
          <p className={styles.bHeroSub}>{str(block.props, "subcopy")}</p>
          <span className={styles.bBtnPrimary}>{str(block.props, "ctaLabel", "Action")}</span>
        </div>
      )
    case "content/heading": {
      const align = str(block.props, "align", "start") as CSSProperties["textAlign"]
      return (
        <div className={styles.bHeading} style={{ textAlign: align }}>
          {str(block.props, "kicker") ? (
            <p className={styles.bKicker}>{str(block.props, "kicker")}</p>
          ) : null}
          <h3 className={styles.bHeadingText}>{str(block.props, "text", "Heading")}</h3>
        </div>
      )
    }
    case "content/paragraph":
      return (
        <p className={bool(block.props, "emphasis") ? styles.bParaStrong : styles.bPara}>
          {str(block.props, "text", "Body copy.")}
        </p>
      )
    case "marketing/cta": {
      const secondary = str(block.props, "tone", "primary") === "secondary"
      return (
        <div className={styles.bCtaRow}>
          <span className={secondary ? styles.bBtnSecondary : styles.bBtnPrimary}>
            {str(block.props, "label", "Action")}
          </span>
        </div>
      )
    }
    case "data/stat":
      return (
        <div className={styles.bStat}>
          <span className={styles.bStatValue}>{str(block.props, "value", "0")}</span>
          <span className={styles.bStatLabel}>{str(block.props, "label", "Label")}</span>
        </div>
      )
    case "content/divider": {
      const spacing = str(block.props, "spacing", "normal")
      const cls =
        spacing === "compact"
          ? styles.bDividerCompact
          : spacing === "roomy"
            ? styles.bDividerRoomy
            : styles.bDivider
      return <div className={cls} role="separator" />
    }
    case "content/notice": {
      const tone = str(block.props, "tone", "info")
      const toneClass =
        tone === "warning"
          ? styles.bNoticeWarning
          : tone === "success"
            ? styles.bNoticeSuccess
            : styles.bNoticeInfo
      return (
        <div className={`${styles.bNotice} ${toneClass}`}>
          <strong className={styles.bNoticeTitle}>{str(block.props, "title", "Notice")}</strong>
          {str(block.props, "body") ? (
            <span className={styles.bNoticeBody}>{str(block.props, "body")}</span>
          ) : null}
        </div>
      )
    }
    default:
      return (
        <div className={styles.bUnknown}>
          <span>{block.name}</span>
          <code>{block.type}</code>
        </div>
      )
  }
}
