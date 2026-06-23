"use client"

import { RadialMeter } from "../charts/radial-meter"
import { DataTable } from "../data-display/data-table"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { DataTableColumn } from "../data-display/data-table"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./mufflerpulse-editor-dashboard.module.css"

interface Slot {
  hour: string
  title?: string
  channel?: string
  status: "empty" | "queued" | "posted"
}

const TODAY_SLOTS: ReadonlyArray<Slot> = [
  { hour: "08:00", status: "posted", title: "Morning warm-up · workshop ambient" },
  { hour: "10:00", status: "posted", title: "Behind-the-scenes weld pit" },
  { hour: "12:00", status: "queued", title: "Sound demo — WRX twin tips" },
  { hour: "13:30", status: "empty" },
  { hour: "15:00", status: "queued", title: "Mate-rate Tuesday · short reel" },
  { hour: "16:30", status: "empty" },
  { hour: "18:00", status: "queued", title: "Wollongong meet teaser" },
  { hour: "20:00", status: "empty" },
]

const STATUS_CLASS: Record<Slot["status"], string> = {
  empty: styles.slotEmpty,
  queued: styles.slotFilled,
  posted: styles.slotPosted,
}

interface QueueItem {
  id: string
  title: string
  channel: "Instagram" | "Facebook" | "TikTok" | "YouTube" | "X"
  publishAt: string
  status: "scheduled" | "review" | "draft"
  reach: number
}

const QUEUE: ReadonlyArray<QueueItem> = [
  {
    id: "q-1",
    title: "Sound demo — WRX twin tips",
    channel: "Instagram",
    publishAt: "Today 12:00",
    status: "scheduled",
    reach: 4200,
  },
  {
    id: "q-2",
    title: "Mate-rate Tuesday · short reel",
    channel: "TikTok",
    publishAt: "Today 15:00",
    status: "scheduled",
    reach: 6100,
  },
  {
    id: "q-3",
    title: "Wollongong meet teaser",
    channel: "Instagram",
    publishAt: "Today 18:00",
    status: "review",
    reach: 3850,
  },
  {
    id: "q-4",
    title: "Saturday open-shop tour",
    channel: "Facebook",
    publishAt: "Sat 09:30",
    status: "scheduled",
    reach: 2100,
  },
  {
    id: "q-5",
    title: "DPF clean explainer · long form",
    channel: "YouTube",
    publishAt: "Mon 11:00",
    status: "draft",
    reach: 0,
  },
]

const STATUS_TONE: Record<QueueItem["status"], "red" | "amber" | "teal" | "green"> = {
  scheduled: "green",
  review: "amber",
  draft: "teal",
}

const STATUS_LABEL: Record<QueueItem["status"], string> = {
  scheduled: "Scheduled",
  review: "In review",
  draft: "Draft",
}

const QUEUE_COLUMNS: ReadonlyArray<DataTableColumn<QueueItem>> = [
  { id: "title", header: "Post", cell: (row) => row.title },
  { id: "channel", header: "Channel", cell: (row) => row.channel, width: "120px" },
  { id: "publish", header: "Publish at", cell: (row) => row.publishAt, width: "140px" },
  {
    id: "reach",
    header: "Est. reach",
    cell: (row) => (row.reach > 0 ? row.reach.toLocaleString("en-AU") : "—"),
    align: "right",
    width: "110px",
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Chip label={STATUS_LABEL[row.status]} tone={STATUS_TONE[row.status]} selected />
    ),
    width: "130px",
  },
]

const CHANNEL_CHIPS: ReadonlyArray<{ label: string; tone: ChipTone; selected: boolean }> = [
  { label: "Instagram", tone: "red", selected: true },
  { label: "TikTok", tone: "teal", selected: true },
  { label: "Facebook", tone: "amber", selected: false },
  { label: "YouTube", tone: "red", selected: false },
  { label: "X", tone: "neutral", selected: false },
]

export function MufflerpulseEditorDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Mufflerpulse / Editor"
        title="Today's pulse"
        subtitle="Schedule the next 12 hours, glance at engagement health, and stage the next great workshop story."
        toolbar={<span>Editor · Iris H.</span>}
        ariaLabel="Mufflerpulse editor dashboard"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Today · publishing strip" aside="8 slots" span={1} tone="amber">
          <div className={styles.slotStrip}>
            {TODAY_SLOTS.map((slot) => (
              <div key={slot.hour} className={`${styles.slot} ${STATUS_CLASS[slot.status]}`}>
                <span className={styles.slotTime}>{slot.hour}</span>
                <span className={styles.slotTitle}>
                  {slot.title ?? "— open slot —"}
                </span>
              </div>
            ))}
          </div>
        </DashboardTile>
      </DashboardShell>

      <div className={styles.row}>
        <DashboardTile label="Compose" aside="Draft new post" tone="red">
          <div className={styles.composer}>
            <div className={styles.composerHead}>
              {CHANNEL_CHIPS.map((chip) => (
                <Chip
                  key={chip.label}
                  label={chip.label}
                  tone={chip.tone}
                  selected={chip.selected}
                />
              ))}
            </div>
            <div className={styles.composerArea}>
              <strong>Caption draft.</strong>
              <br />
              Lifted the WRX onto bay 2 this arvo to lock in the twin 2.5&quot; tips. Listen for that
              transition between idle and 4,500 rpm — that&apos;s why we sit on this exact bend
              radius. #oakflatsmufflermen #boxer
            </div>
            <div className={styles.composerActions}>
              <span className={styles.composerCount}>248 / 2200 chars · 2 hashtags</span>
              <span className={styles.composerSchedule}>Schedule · Tue 12:00</span>
            </div>
          </div>
        </DashboardTile>

        <DashboardTile label="Engagement pulse" aside="Last 24h" tone="teal">
          <RadialMeter
            value={68}
            label="Engagement"
            tone="teal"
            ariaLabel="Engagement rate 68 percent over last 24 hours"
            size={148}
            caption="3,420 interactions · 12.4% rate"
          />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Queue & spotlight"
        title="What ships today"
        ariaLabel="Mufflerpulse queue section"
        density="comfortable"
        columns={3}
      >
        <DashboardTile label="Scheduled queue" aside="5 posts" span={2} tone="green">
          <DataTable
            rows={[...QUEUE]}
            columns={QUEUE_COLUMNS}
            getRowId={(row) => row.id}
            density="comfortable"
            zebra
            kicker="Queue"
            caption="Posts scheduled or in review"
          />
        </DashboardTile>

        <DashboardTile label="Top performing · 7d" aside="@oakflatsmufflermen" tone="amber">
          <div className={styles.topPost}>
            <div className={styles.topPostThumb} aria-hidden="true">
              REEL · Twin tips
            </div>
            <div>
              <strong className={styles.topPostTitle}>Twin-loop exhaust dyno run</strong>
              <p className={styles.topPostBody}>
                Pulled 18.4k views in 48 hours. Save rate &gt;14% — second highest this year.
              </p>
            </div>
            <div className={styles.topPostMeta}>
              <span>Views <strong>18.4k</strong></span>
              <span>Saves <strong>2,540</strong></span>
              <span>CTR <strong>3.2%</strong></span>
            </div>
          </div>
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default MufflerpulseEditorDashboard
