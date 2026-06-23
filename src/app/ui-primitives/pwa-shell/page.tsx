import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import { FULL_MOBILE_HREF, PWA_PRIMITIVE_INDEX } from "./_mock-data"
import styles from "./pwa-shell.module.css"

export const metadata: Metadata = {
  title: "PWA Shell | UI Primitives",
}

const FULL_ENTRY = {
  index: "15",
  title: "Full mobile shell",
  href: FULL_MOBILE_HREF,
  description:
    "Bonus composition: a workshop crew PWA running end-to-end — splash, install prompt, biometric unlock, sync queue, home tiles, shortcuts, share target and wake lock.",
  bonus: true,
}

export default function PwaShellIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="PWA / Shell"
        title="PWA primitives for the workshop crew"
        description="Every surface a crew member touches on the workshop PWA — install prompts, offline strips, sync queues, biometric unlock, share-target receiver, wake-lock, splash and home tiles. Built for the tablet bracket above bay 2 and the customer's phone on the way to Oak Flats."
      />
      <section className={styles.section} aria-label="PWA shell primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives + 1 composition</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Each primitive ships with iOS and Android variants where it matters, reduced-motion
            overrides, ARIA semantics and tabular-nums on every metric. Australian English copy
            throughout — &quot;Bay 2&quot;, &quot;parts movements&quot;, &quot;rego&quot;.
          </p>
        </header>
        <div className={styles.grid}>
          {PWA_PRIMITIVE_INDEX.map((entry) => (
            <Link key={entry.href} className={styles.thumb} href={entry.href}>
              <span className={styles.thumbIndex}>{entry.index}</span>
              <h3 className={styles.thumbTitle}>{entry.title}</h3>
              <p className={styles.thumbCopy}>{entry.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            className={[styles.thumb, styles.thumbBonus].join(" ")}
            href={FULL_ENTRY.href}
          >
            <span className={styles.thumbIndex}>{FULL_ENTRY.index}</span>
            <h3 className={styles.thumbTitle}>{FULL_ENTRY.title}</h3>
            <p className={styles.thumbCopy}>{FULL_ENTRY.description}</p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
