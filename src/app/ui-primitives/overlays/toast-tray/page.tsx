import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { ToastTrayDemo } from "./toast-tray-demo"

export const metadata: Metadata = {
  title: "Toast tray | UI Primitives — Overlays",
}

export default function ToastTrayPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 13"
        title="Toast tray"
        description="Stacked toast region. Tone-tinted edge, optional action button, auto-dismiss timer, dismiss button. Spring-animated entry/exit via framer-motion AnimatePresence."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Toast tray" },
        ]}
      />
      <section className={styles.canvas} aria-label="Toast tray demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Non-blocking system feedback — quote saved, supplier price updated, dyno log
            attached, payment captured. Stacks at the top-right by default.
          </p>
        </div>
        <ToastTrayDemo />
      </section>
    </main>
  )
}
