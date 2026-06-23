import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { CalendarDayView } from "../calendar/calendar-day-view"
import { NotificationInbox } from "../data-display/notification-inbox"
import type { DayEvent } from "../calendar/calendar-day-view"
import type { NotificationItem } from "../data-display/notification-inbox"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./front-desk-dashboard.module.css"

const TODAY = new Date(2026, 4, 28, 8, 0)
const EVENT_DATE = (hour: number, minute = 0) =>
  new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), hour, minute)

const DAY_EVENTS: ReadonlyArray<DayEvent> = [
  {
    id: "ev-1",
    start: EVENT_DATE(8, 30),
    end: EVENT_DATE(9, 15),
    title: "Brett Walters — VE Commodore check-in",
    tone: "amber",
    bay: "Bay 1",
  },
  {
    id: "ev-2",
    start: EVENT_DATE(9, 0),
    end: EVENT_DATE(10, 30),
    title: "Hilux DPF clean — drop-off",
    tone: "teal",
    bay: "Bay 3",
  },
  {
    id: "ev-3",
    start: EVENT_DATE(10, 0),
    end: EVENT_DATE(11, 0),
    title: "Sound check + photos — WRX STI",
    tone: "red",
    bay: "Bay 2",
  },
  {
    id: "ev-4",
    start: EVENT_DATE(13, 30),
    end: EVENT_DATE(15, 30),
    title: "Mustang GT — quad tip install",
    tone: "green",
    bay: "Bay 4",
  },
  {
    id: "ev-5",
    start: EVENT_DATE(15, 0),
    end: EVENT_DATE(15, 45),
    title: "Mel Park — handover & EFT",
    tone: "amber",
    bay: "Reception",
  },
  {
    id: "ev-6",
    start: EVENT_DATE(16, 0),
    end: EVENT_DATE(17, 0),
    title: "Walk-in quote — Falcon BA",
    tone: "neutral",
    bay: "Yard",
  },
]

interface QueueCustomer {
  id: string
  name: string
  vehicle: string
  status: "waiting" | "in-bay" | "ready" | "follow-up"
  arrivedAt: string
  tone: "red" | "amber" | "teal" | "green"
}

const QUEUE: ReadonlyArray<QueueCustomer> = [
  {
    id: "q-1",
    name: "Brett Walters",
    vehicle: "2008 VE Commodore SV6 · BRT-118",
    status: "in-bay",
    arrivedAt: "08:32",
    tone: "amber",
  },
  {
    id: "q-2",
    name: "Sienna Voss",
    vehicle: "2019 WRX STI · S2V-001",
    status: "waiting",
    arrivedAt: "09:14",
    tone: "red",
  },
  {
    id: "q-3",
    name: "Marcus Tran",
    vehicle: "2021 BT-50 · BT5-OAK",
    status: "ready",
    arrivedAt: "07:58",
    tone: "green",
  },
  {
    id: "q-4",
    name: "Petra Iverson",
    vehicle: "2017 Ranger PX2 · PXI-204",
    status: "follow-up",
    arrivedAt: "Yesterday",
    tone: "teal",
  },
]

const STATUS_LABEL: Record<QueueCustomer["status"], string> = {
  waiting: "Waiting",
  "in-bay": "In bay",
  ready: "Ready",
  "follow-up": "Follow up",
}

const INBOX: ReadonlyArray<NotificationItem> = [
  {
    id: "n-1",
    title: "Voicemail — Mel Park",
    sub: "Wants to push handover to 15:30. Wife dropping kids first.",
    timestamp: "08 min ago",
    source: "Phone",
    tone: "info",
    unread: true,
  },
  {
    id: "n-2",
    title: "Quote viewed — QTE-2026-0418",
    sub: "Sienna Voss opened the WRX quote 3 times overnight.",
    timestamp: "42 min ago",
    source: "Email",
    tone: "success",
    unread: true,
  },
  {
    id: "n-3",
    title: "Bay 5 unavailable — compressor service",
    sub: "Rebook 11:30 Falcon walk-in to Bay 4.",
    timestamp: "1h ago",
    source: "Workshop",
    tone: "warn",
    unread: true,
  },
  {
    id: "n-4",
    title: "Parts ETA delayed — Ranger DPF unit",
    sub: "Supplier confirmed Friday 09:00. Customer notified.",
    timestamp: "2h ago",
    source: "Supplier",
    tone: "error",
    mention: true,
  },
]

export function FrontDeskDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Front desk / Reception"
        title="Counter today"
        subtitle="Drop-offs, handovers, walk-ins, and pending phone callbacks — everything you need to greet the next person through the door."
        ariaLabel="Front desk persona dashboard"
        density="compact"
        columns={4}
        toolbar={<span>Counter · Iris H.</span>}
      >
        <DashboardTile label="Quick actions" span={4} tone="red">
          <div className={styles.quickActions}>
            <button type="button" className={`${styles.action} ${styles.actionRed}`}>
              <span className={styles.actionLabel}>F1 · Book in</span>
              <span className={styles.actionTitle}>Book a job</span>
              <span className={styles.actionMeta}>Customer + vehicle + service</span>
            </button>
            <button type="button" className={`${styles.action} ${styles.actionAmber}`}>
              <span className={styles.actionLabel}>F2 · Arrive</span>
              <span className={styles.actionTitle}>Check in</span>
              <span className={styles.actionMeta}>Stamp arrival + assign bay</span>
            </button>
            <button type="button" className={`${styles.action} ${styles.actionTeal}`}>
              <span className={styles.actionLabel}>F3 · Quote</span>
              <span className={styles.actionTitle}>Build a quote</span>
              <span className={styles.actionMeta}>Open the quote workspace</span>
            </button>
            <button type="button" className={`${styles.action} ${styles.actionGreen}`}>
              <span className={styles.actionLabel}>F4 · Call</span>
              <span className={styles.actionTitle}>Phone callback</span>
              <span className={styles.actionMeta}>4 waiting · Mel, Sienna...</span>
            </button>
          </div>
        </DashboardTile>
      </DashboardShell>

      <div className={styles.split}>
        <DashboardTile label="Today · bay swimlanes" aside="08:00 — 17:00" tone="teal">
          <CalendarDayView
            date={TODAY}
            today={TODAY}
            events={DAY_EVENTS}
            startHour={8}
            endHour={17}
          />
        </DashboardTile>

        <DashboardTile label="Notification inbox" aside="4 unread" tone="amber">
          <NotificationInbox items={INBOX} defaultFilter="unread" />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Customer queue"
        title="At the counter"
        subtitle="People currently in the workshop or owed a call back."
        ariaLabel="Front desk customer queue section"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Queue" aside={`${QUEUE.length} active`} span={1} tone="green">
          <ol className={styles.queue}>
            {QUEUE.map((customer) => (
              <li key={customer.id} className={styles.queueItem}>
                <Avatar name={customer.name} size="md" tone={customer.tone} />
                <div className={styles.queueIdentity}>
                  <span className={styles.queueName}>{customer.name}</span>
                  <span className={styles.queueSub}>
                    {customer.vehicle} · arrived {customer.arrivedAt}
                  </span>
                </div>
                <div className={styles.queueChips}>
                  <Chip label={STATUS_LABEL[customer.status]} tone={customer.tone} selected />
                </div>
              </li>
            ))}
          </ol>
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default FrontDeskDashboard
