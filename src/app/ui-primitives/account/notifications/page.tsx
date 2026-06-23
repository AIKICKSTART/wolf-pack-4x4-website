import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  NotificationChannelRow,
  type NotificationChannelRowItem,
} from "../../components/account/notification-channel-row"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Notifications · Account | UI Primitives",
}

const CHANNELS: ReadonlyArray<NotificationChannelRowItem> = [
  {
    channel: "email",
    destination: "daniel@mufflermen.com.au",
    enabled: true,
    categories: ["booking", "quote", "job", "alert"],
  },
  {
    channel: "sms",
    destination: "+61 423 555 401",
    enabled: true,
    categories: ["booking", "job"],
  },
  {
    channel: "push",
    destination: "Workshop iOS · iPhone 15 Pro",
    enabled: true,
    categories: ["alert"],
  },
  {
    channel: "in-app",
    destination: "Workspace inbox",
    enabled: true,
    categories: ["quote", "booking", "job", "marketing", "alert"],
  },
]

export default function AccountNotificationsPage() {
  return (
    <>
      <PageHeader
        kicker="18.5 / Notifications"
        title="Notifications"
        description="Channels, destinations, and the event types each one fires for. Toggle anything you don't need on the bay floor."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Notifications" },
        ]}
      />

      <section className={styles.section} aria-labelledby="notif-matrix-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Channels</span>
          <h2 id="notif-matrix-heading" className={styles.sectionTitle}>
            Delivery matrix
          </h2>
          <p className={styles.sectionLead}>
            Workshop alerts fan out across email, SMS, push, and the in-app inbox. Marketing
            notifications are off by default for owner accounts.
          </p>
        </header>
        <ul className={styles.list} role="list">
          {CHANNELS.map((channel) => (
            <li key={channel.channel}>
              <NotificationChannelRow item={channel} />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="notif-digest-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>02 / Digest</span>
          <h2 id="notif-digest-heading" className={styles.sectionTitle}>
            Weekly digest
          </h2>
        </header>
        <div className={styles.card}>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="digest-day">
                Send day
              </label>
              <select id="digest-day" className={styles.fieldSelect} defaultValue="mon">
                <option value="mon">Monday</option>
                <option value="tue">Tuesday</option>
                <option value="wed">Wednesday</option>
                <option value="thu">Thursday</option>
                <option value="fri">Friday</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="digest-time">
                Send time
              </label>
              <select id="digest-time" className={styles.fieldSelect} defaultValue="07">
                <option value="06">06:00 AEST</option>
                <option value="07">07:00 AEST</option>
                <option value="08">08:00 AEST</option>
                <option value="17">17:00 AEST</option>
              </select>
            </div>
            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label className={styles.checkboxRow}>
                <input type="checkbox" className={styles.checkbox} defaultChecked />
                <span className={styles.fieldHelper}>
                  Include bay-level performance summary in the digest body.
                </span>
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
