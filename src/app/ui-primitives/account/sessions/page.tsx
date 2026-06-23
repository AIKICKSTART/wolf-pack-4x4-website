import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SessionRow, type SessionRowItem } from "../../components/account/session-row"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Sessions · Account | UI Primitives",
}

const SESSIONS: ReadonlyArray<SessionRowItem> = [
  {
    id: "sess-01",
    device: "laptop",
    label: "MacBook Pro 16 · macOS",
    browser: "Chrome 137",
    ip: "203.0.113.42",
    location: "Oak Flats, NSW",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "sess-02",
    device: "phone",
    label: "iPhone 15 Pro · iOS 18",
    browser: "Safari Mobile",
    ip: "203.0.113.99",
    location: "Albion Park, NSW",
    lastActive: "12 min ago",
  },
  {
    id: "sess-03",
    device: "tablet",
    label: "iPad · Bay 02 floor tablet",
    browser: "Safari 17",
    ip: "10.4.7.21",
    location: "Shellharbour bay",
    lastActive: "1 hr ago",
  },
  {
    id: "sess-04",
    device: "desktop",
    label: "Workshop PC · Windows 11",
    browser: "Edge 137",
    ip: "10.4.7.5",
    location: "Wollongong bay",
    lastActive: "Yesterday, 18:42",
  },
  {
    id: "sess-05",
    device: "browser",
    label: "Unknown · Linux desktop",
    browser: "Firefox 134",
    ip: "198.51.100.7",
    location: "Sydney metro · suspicious",
    lastActive: "3 days ago",
  },
]

export default function AccountSessionsPage() {
  return (
    <>
      <PageHeader
        kicker="18.7 / Sessions"
        title="Sessions"
        description="Every device currently signed in to your workspace. Revoke anything you don't recognise."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Sessions" },
        ]}
      />

      <section className={styles.card} aria-labelledby="sessions-summary-heading">
        <div className={styles.cardHead}>
          <div>
            <h2 id="sessions-summary-heading" className={styles.cardTitle}>
              5 active sessions
            </h2>
            <p className={styles.cardSub}>1 current · 4 other devices</p>
          </div>
          <button type="button" className={styles.btnPrimary}>
            Revoke all others
          </button>
        </div>
        <ul className={styles.list} role="list">
          {SESSIONS.map((session) => (
            <li key={session.id}>
              <SessionRow session={session} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
