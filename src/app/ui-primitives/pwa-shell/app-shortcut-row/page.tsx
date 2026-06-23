import type { Metadata } from "next"
import {
  ArrowRightCircle,
  Camera,
  ClipboardCheck,
  MessageCircle,
  Package,
  PhoneCall,
  ScanLine,
} from "lucide-react"

import { AppShortcutRow } from "../../components/pwa-shell"
import type { PwaShortcutAction } from "../../components/pwa-shell"
import { PageHeader } from "../../components/page-header"
import styles from "../pwa-shell.module.css"

export const metadata: Metadata = {
  title: "App shortcut row | UI Primitives — PWA Shell",
}

const CREW_SHORTCUTS: ReadonlyArray<PwaShortcutAction> = [
  {
    id: "scan",
    label: "Scan VIN",
    hint: "Camera · attach to job",
    tone: "red",
    icon: <ScanLine size={18} strokeWidth={2.2} />,
  },
  {
    id: "next",
    label: "Advance bay",
    hint: "Move queue forward",
    tone: "teal",
    icon: <ArrowRightCircle size={18} strokeWidth={2.2} />,
  },
  {
    id: "parts",
    label: "Parts arrived",
    hint: "Scan back-dock receipts",
    tone: "amber",
    icon: <Package size={18} strokeWidth={2.2} />,
  },
  {
    id: "call",
    label: "Call customer",
    hint: "Dial last touched job",
    tone: "neutral",
    icon: <PhoneCall size={18} strokeWidth={2.2} />,
  },
]

const CUSTOMER_SHORTCUTS: ReadonlyArray<PwaShortcutAction> = [
  {
    id: "quote",
    label: "Get a quote",
    hint: "Snap a pic of your exhaust",
    tone: "red",
    icon: <Camera size={18} strokeWidth={2.2} />,
    href: "/services",
  },
  {
    id: "book",
    label: "Book the bay",
    hint: "Oak Flats · Wollongong",
    tone: "teal",
    icon: <ClipboardCheck size={18} strokeWidth={2.2} />,
    href: "/locations",
  },
  {
    id: "track",
    label: "Track my job",
    hint: "Live updates from the workshop",
    tone: "amber",
    icon: <MessageCircle size={18} strokeWidth={2.2} />,
    href: "/control",
  },
]

const HOMESCREEN_SHORTCUTS: ReadonlyArray<PwaShortcutAction> = [
  {
    id: "scan",
    label: "Scan",
    tone: "red",
    icon: <ScanLine size={18} strokeWidth={2.2} />,
  },
  {
    id: "call",
    label: "Call workshop",
    tone: "teal",
    icon: <PhoneCall size={18} strokeWidth={2.2} />,
  },
]

export default function AppShortcutRowPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="PWA / Shell · 11"
        title="App shortcut row"
        description="Jump-list of in-app shortcuts. Tap or follow link, with hint copy and tone-tinted icon. Mirrors Android's app-shortcuts and iOS's home-screen Quick Actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "PWA Shell", href: "/ui-primitives/pwa-shell" },
          { label: "App shortcut row" },
        ]}
      />
      <section className={styles.canvas} aria-label="App shortcut row states">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Press-and-hold the Mufflermen Crew icon on the tablet home screen. Up jumps a row of
            four shortcuts so the mechanic can scan a VIN without even opening the app.
          </p>
        </div>
        <div className={styles.states}>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 01</span>
              <h2 className={styles.stateTitle}>Workshop crew · 4 actions</h2>
            </header>
            <p className={styles.stateBody}>Button-style. onSelect callback.</p>
            <AppShortcutRow
              title="Workshop crew"
              subtitle="Press · hold"
              actions={CREW_SHORTCUTS}
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 02</span>
              <h2 className={styles.stateTitle}>Customer · 3 links</h2>
            </header>
            <p className={styles.stateBody}>Anchor links (href) instead of buttons.</p>
            <AppShortcutRow
              title="Customer app"
              subtitle="Quick actions"
              actions={CUSTOMER_SHORTCUTS}
            />
          </div>
          <div className={styles.stateCard}>
            <header className={styles.stateHead}>
              <span className={styles.stateKicker}>State · 03</span>
              <h2 className={styles.stateTitle}>Minimal · home-screen</h2>
            </header>
            <p className={styles.stateBody}>Two actions, compact subtitle.</p>
            <AppShortcutRow
              title="Home screen"
              subtitle="iOS widget"
              actions={HOMESCREEN_SHORTCUTS}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
