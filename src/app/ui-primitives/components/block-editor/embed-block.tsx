"use client"

import { ExternalLink, PlayCircle } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  EmbedAspect,
  EmbedPayload,
  EmbedProvider,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const PROVIDER_LABEL: Record<EmbedProvider, string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  codepen: "CodePen",
  twitter: "X / Twitter",
}

const ASPECT_LABEL: Record<EmbedAspect, string> = {
  "16:9": "16:9",
  "4:3": "4:3",
  "1:1": "1:1",
  "9:16": "9:16",
}

const ASPECT_CLASS: Record<EmbedAspect, string> = {
  "16:9": styles.embedFrameAspect16x9,
  "4:3": styles.embedFrameAspect4x3,
  "1:1": styles.embedFrameAspect1x1,
  "9:16": styles.embedFrameAspect9x16,
}

type EmbedBlockProps = BlockPrimitiveProps<EmbedPayload>

export function EmbedBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: EmbedBlockProps) {
  const titleId = useId()
  const { provider, url, title, aspect, authorHandle } = data.payload

  const update = (next: Partial<EmbedPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<EmbedPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const toolbar = (
    <>
      <select
        className={styles.toolbarSelect}
        value={provider}
        onChange={(event) => update({ provider: event.target.value as EmbedProvider })}
        aria-label="Embed provider"
      >
        {(Object.keys(PROVIDER_LABEL) as ReadonlyArray<EmbedProvider>).map((id) => (
          <option key={id} value={id}>
            {PROVIDER_LABEL[id]}
          </option>
        ))}
      </select>
      <select
        className={styles.toolbarSelect}
        value={aspect}
        onChange={(event) => update({ aspect: event.target.value as EmbedAspect })}
        aria-label="Aspect ratio"
      >
        {(Object.keys(ASPECT_LABEL) as ReadonlyArray<EmbedAspect>).map((id) => (
          <option key={id} value={id}>
            {ASPECT_LABEL[id]}
          </option>
        ))}
      </select>
      <input
        type="text"
        className={styles.toolbarInput}
        value={url}
        onChange={(event) => update({ url: event.target.value })}
        aria-label="Embed URL"
        placeholder="https://"
      />
    </>
  )

  return (
    <BlockShell
      kind="Embed"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={titleId}
    >
      <div
        className={`${styles.embedFrame} ${ASPECT_CLASS[aspect]}`}
        role="figure"
        aria-labelledby={titleId}
      >
        <span className={styles.embedBadge}>
          {provider === "youtube" || provider === "vimeo" ? (
            <PlayCircle size={12} aria-hidden="true" />
          ) : (
            <ExternalLink size={12} aria-hidden="true" />
          )}
          {PROVIDER_LABEL[provider]}
        </span>
        <div>
          <h3 className={styles.embedTitle} id={titleId}>
            {title}
          </h3>
          <p className={styles.embedMeta}>
            {authorHandle ? `${authorHandle} · ` : ""}
            {url}
          </p>
        </div>
      </div>
    </BlockShell>
  )
}

export function EmbedBlockEdit(props: EmbedBlockProps) {
  return <EmbedBlock {...props} mode="edit" />
}
