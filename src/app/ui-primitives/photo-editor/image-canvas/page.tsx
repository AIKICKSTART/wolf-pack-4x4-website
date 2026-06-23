import type { Metadata } from "next"

import { ImageCanvas } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Image canvas | Photo editor",
  description:
    "Primitive 01 — centre image canvas with named document header, zoom chip, pan track footer and cursor mode indicator. Three Mufflermen samples: Hilux dyno run, Manta exhaust closeup, Bay 2 hero.",
}

export default function ImageCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Image canvas"
        title="Image canvas"
        description="Document name header with cursor mode chip and zoom indicator, a centred stage with checker pattern, pan + scale transforms, and a footer with X/Y coords and pan progress track."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Image canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · 100% zoom · centre</span>
        <ImageCanvas
          name="hilux-dyno-run.psd"
          size={{ widthPx: 3840, heightPx: 2160 }}
          zoom={1}
          cursorXPx={1840}
          cursorYPx={1024}
          cursorMode="default"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta exhaust closeup · 200% zoom · paint cursor</span>
        <ImageCanvas
          name="manta-exhaust-closeup.psd"
          size={{ widthPx: 2400, heightPx: 1600 }}
          zoom={2}
          panXPx={-60}
          panYPx={40}
          cursorXPx={1180}
          cursorYPx={892}
          cursorMode="crosshair"
          aspect={3 / 2}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bay 2 hero · 50% fit · eyedrop mode</span>
        <ImageCanvas
          name="bay-2-hero.psd"
          size={{ widthPx: 5120, heightPx: 2880 }}
          zoom={0.5}
          cursorXPx={2456}
          cursorYPx={1184}
          cursorMode="eyedrop"
        />
      </section>
    </main>
  )
}
