"use client"

import { useState } from "react"

import { MediaLightbox, type MediaAsset } from "../../components/file-browser"

import styles from "../file-browser.module.css"

interface MediaLightboxDemoProps {
  assets: ReadonlyArray<MediaAsset>
}

export function MediaLightboxDemo({ assets }: MediaLightboxDemoProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)

  return (
    <section className={styles.demoSurface}>
      <span className={styles.demoLabel}>Live primitive — click a thumbnail</span>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {assets.map((asset, i) => (
          <li key={asset.id}>
            <button
              type="button"
              onClick={() => {
                setIndex(i)
                setOpen(true)
              }}
              style={{
                width: "100%",
                padding: 0,
                border: "1px solid var(--primitive-line)",
                borderRadius: 12,
                background: "var(--primitive-panel)",
                cursor: "pointer",
                overflow: "hidden",
                aspectRatio: "16 / 11",
                display: "grid",
                placeItems: "center",
              }}
              aria-label={`Open ${asset.name}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </button>
          </li>
        ))}
      </ul>
      <MediaLightbox
        open={open}
        onOpenChange={setOpen}
        assets={assets}
        initialIndex={index}
      />
    </section>
  )
}
