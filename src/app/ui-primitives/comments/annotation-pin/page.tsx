import type { Metadata } from "next"

import { AnnotationPin } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Annotation pin | Comments primitives",
  description:
    "Primitive 03 — positioned numbered pin with pulse animation and status tone. Reduced motion disables pulse.",
}

export default function AnnotationPinPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Annotation pin"
        title="Annotation pin"
        description="Numbered pin (1, 2, 3...) anchored to a coordinate on a canvas or image. Pulse signals an active thread; tone shifts with open / resolved / reopened status."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Annotation pin" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Inside a 320x180 surrogate canvas</span>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 480,
            aspectRatio: "16 / 9",
            border: "1px solid var(--primitive-line)",
            borderRadius: "var(--primitive-radius-lg)",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primitive-text-strong) 4%, transparent), transparent), var(--primitive-panel-strong)",
          }}
        >
          <AnnotationPin
            number={1}
            position={{ x: 18, y: 30 }}
            status="open"
            tooltip="Rear bracket clearance"
          />
          <AnnotationPin
            number={2}
            position={{ x: 55, y: 50 }}
            status="resolved"
            tooltip="Customer waiting area glare"
          />
          <AnnotationPin
            number={3}
            position={{ x: 80, y: 75 }}
            status="reopened"
            tooltip="Roller door 2 sensor strip"
            selected
          />
        </div>
      </section>
    </main>
  )
}
