"use client"

import {
  Download,
  Eye,
  Monitor,
  Moon,
  Redo2,
  Save,
  Send,
  Smartphone,
  Sun,
  Tablet,
  Undo2,
  Upload,
} from "lucide-react"
import { type ChangeEvent } from "react"

import { useStyleProfile } from "../theme"
import styles from "./canvas.module.css"
import {
  PREVIEW_WIDTH_LABELS,
  type PreviewScheme,
  type PreviewWidth,
} from "./types"

// Lucide writes `size` to the SVG width/height *attribute*, which rejects
// `var()`. Sizing via `style` lets the central `--primitive-icon-*` tokens
// resolve through CSS (which wins over the presentation attribute).
const ICON_STYLE = {
  width: "var(--primitive-icon-sm)",
  height: "var(--primitive-icon-sm)",
  strokeWidth: "var(--primitive-icon-stroke)",
}

const VIEWPORTS: readonly { id: PreviewWidth; Icon: typeof Monitor }[] = [
  { id: "mobile", Icon: Smartphone },
  { id: "tablet", Icon: Tablet },
  { id: "desktop", Icon: Monitor },
  { id: "full", Icon: Monitor },
]

interface ToolbarProps {
  canUndo: boolean
  canRedo: boolean
  previewMode: boolean
  previewWidth: PreviewWidth
  previewScheme: PreviewScheme
  saved: boolean
  onUndo: () => void
  onRedo: () => void
  onTogglePreview: () => void
  onSetWidth: (width: PreviewWidth) => void
  onSetScheme: (scheme: PreviewScheme) => void
  onSaveDraft: () => void
  onExport: () => void
  onImport: (event: ChangeEvent<HTMLInputElement>) => void
  onRequestPublish: () => void
}

/**
 * The builder command bar: history, persistence, the style-profile picker
 * (drives ThemeProvider), light/dark + responsive preview controls, JSON
 * export/import, and the GATED publish request.
 */
export function Toolbar(props: ToolbarProps) {
  const { profile, profileId, setProfile, profiles } = useStyleProfile()

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Builder controls">
      <div className={styles.toolGroup} aria-label="History">
        <button
          type="button"
          className={styles.iconBtn}
          onClick={props.onUndo}
          disabled={!props.canUndo}
          aria-label="Undo"
        >
          <Undo2 style={ICON_STYLE} aria-hidden />
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={props.onRedo}
          disabled={!props.canRedo}
          aria-label="Redo"
        >
          <Redo2 style={ICON_STYLE} aria-hidden />
        </button>
      </div>

      <div className={styles.toolGroup} aria-label="Style profile">
        <label className={styles.selectLabel} htmlFor="profile-select">
          Profile
        </label>
        <select
          id="profile-select"
          className={styles.profileSelect}
          value={profileId}
          onChange={(event) => setProfile(event.target.value as typeof profileId)}
        >
          {profiles.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.toolGroup} role="group" aria-label="Preview scheme">
        <button
          type="button"
          className={[styles.segBtn, props.previewScheme === "light" ? styles.segBtnActive : ""].join(" ")}
          onClick={() => props.onSetScheme("light")}
          aria-pressed={props.previewScheme === "light"}
          aria-label="Light preview"
        >
          <Sun style={ICON_STYLE} aria-hidden />
        </button>
        <button
          type="button"
          className={[styles.segBtn, props.previewScheme === "dark" ? styles.segBtnActive : ""].join(" ")}
          onClick={() => props.onSetScheme("dark")}
          aria-pressed={props.previewScheme === "dark"}
          aria-label="Dark preview"
        >
          <Moon style={ICON_STYLE} aria-hidden />
        </button>
      </div>

      <div className={styles.toolGroup} role="group" aria-label="Preview width">
        {VIEWPORTS.map(({ id, Icon }) => (
          <button
            key={id}
            type="button"
            className={[styles.segBtn, props.previewWidth === id ? styles.segBtnActive : ""].join(" ")}
            onClick={() => props.onSetWidth(id)}
            aria-pressed={props.previewWidth === id}
            aria-label={`${PREVIEW_WIDTH_LABELS[id]} width`}
            title={PREVIEW_WIDTH_LABELS[id]}
          >
            <Icon style={ICON_STYLE} aria-hidden />
          </button>
        ))}
      </div>

      <div className={styles.toolSpacer} />

      <div className={styles.toolGroup} aria-label="Document">
        <button
          type="button"
          className={[styles.textBtn, props.previewMode ? styles.textBtnActive : ""].join(" ")}
          onClick={props.onTogglePreview}
          aria-pressed={props.previewMode}
        >
          <Eye style={ICON_STYLE} aria-hidden />
          Preview
        </button>
        <button type="button" className={styles.textBtn} onClick={props.onSaveDraft}>
          <Save style={ICON_STYLE} aria-hidden />
          {props.saved ? "Saved" : "Save draft"}
        </button>
        <button type="button" className={styles.textBtn} onClick={props.onExport}>
          <Download style={ICON_STYLE} aria-hidden />
          Export
        </button>
        <label className={styles.textBtn}>
          <Upload style={ICON_STYLE} aria-hidden />
          Import
          <input
            type="file"
            accept="application/json"
            className={styles.fileInput}
            onChange={props.onImport}
            aria-label="Import PageConfig JSON"
          />
        </label>
      </div>

      <button type="button" className={styles.publishBtn} onClick={props.onRequestPublish}>
        <Send style={ICON_STYLE} aria-hidden />
        Request publish
      </button>

      <span className={styles.profileTag} aria-hidden>
        {profile.name}
      </span>
    </div>
  )
}
