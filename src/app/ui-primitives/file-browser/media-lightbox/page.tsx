import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { DEMO_MEDIA } from "../demo-data"
import { MediaLightboxDemo } from "./media-lightbox-demo"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "Media lightbox | File Browser",
  description:
    "Primitive 11 — full-screen media lightbox for design assets with arrow-key navigation, zoom controls, thumbnails, and info pane.",
}

export default function MediaLightboxScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Lightbox"
        title="Media lightbox"
        description="A design-asset focused lightbox. Arrow keys page, + / − zoom, I toggles the info pane, Esc closes. Thumbnail rail along the bottom; metadata sidebar can be hidden when you want the canvas to breathe."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Media lightbox" },
        ]}
      />
      <MediaLightboxDemo assets={DEMO_MEDIA} />
    </main>
  )
}
