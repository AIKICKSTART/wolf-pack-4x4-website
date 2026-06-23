"use client"

import { useMemo, useState } from "react"
import type { DragEvent, KeyboardEvent } from "react"

import styles from "./social-scheduler.module.css"
import type { CalendarDay, PlatformDescriptor, SocialPlatform } from "./social-scheduler-types"

type CalendarView = "month" | "week" | "day"

interface QueueCalendarProps {
  title?: string
  initialView?: CalendarView
  days: ReadonlyArray<CalendarDay>
  platforms: ReadonlyArray<PlatformDescriptor>
  /** Notified when a chip is dropped on a different day. */
  onReschedule?: (postId: string, fromDate: string, toDate: string) => void
}

const VIEW_LABEL: Record<CalendarView, string> = {
  month: "Month",
  week: "Week",
  day: "Day",
}

const WEEKDAYS: ReadonlyArray<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function platformMarks(
  platforms: ReadonlyArray<PlatformDescriptor>,
  keys: ReadonlyArray<SocialPlatform>,
): string {
  return keys
    .map((key) => platforms.find((p) => p.key === key)?.mark ?? "·")
    .join("")
}

export function QueueCalendar({
  title = "Publishing queue",
  initialView = "month",
  days,
  platforms,
  onReschedule,
}: QueueCalendarProps) {
  const [view, setView] = useState<CalendarView>(initialView)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragFrom, setDragFrom] = useState<string | null>(null)
  const [hoverDate, setHoverDate] = useState<string | null>(null)

  const filteredDays = useMemo<ReadonlyArray<CalendarDay>>(() => {
    if (view === "month") return days
    if (view === "week") {
      const todayIdx = days.findIndex((d) => d.isToday)
      const anchor = todayIdx >= 0 ? todayIdx : 0
      const start = Math.max(0, anchor - (anchor % 7))
      return days.slice(start, start + 7)
    }
    const today = days.find((d) => d.isToday)
    return today ? [today] : days.slice(0, 1)
  }, [days, view])

  const onDragStart = (event: DragEvent<HTMLButtonElement>, postId: string, fromDate: string) => {
    event.dataTransfer.setData("text/plain", postId)
    event.dataTransfer.effectAllowed = "move"
    setDraggingId(postId)
    setDragFrom(fromDate)
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>, date: string) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
    setHoverDate(date)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>, toDate: string) => {
    event.preventDefault()
    const postId = event.dataTransfer.getData("text/plain") || draggingId
    if (postId && dragFrom && dragFrom !== toDate) {
      onReschedule?.(postId, dragFrom, toDate)
    }
    setDraggingId(null)
    setDragFrom(null)
    setHoverDate(null)
  }

  const onDragEnd = () => {
    setDraggingId(null)
    setDragFrom(null)
    setHoverDate(null)
  }

  const onChipKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    postId: string,
    fromDate: string,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    const idx = days.findIndex((d) => d.date === fromDate)
    if (idx < 0) return
    const nextIdx = event.key === "ArrowRight" ? idx + 1 : idx - 1
    if (nextIdx < 0 || nextIdx >= days.length) return
    event.preventDefault()
    onReschedule?.(postId, fromDate, days[nextIdx].date)
  }

  const gridCols = view === "month" ? 7 : view === "week" ? 7 : 1

  return (
    <section
      className={`${styles.frame} ${styles.calendar}`}
      aria-label={`${title} ${VIEW_LABEL[view].toLowerCase()} view`}
    >
      <header className={styles.calendarHead}>
        <h2 className={styles.calendarTitle}>{title}</h2>
        <div className={styles.calendarSwitch} role="tablist" aria-label="View">
          {(Object.keys(VIEW_LABEL) as ReadonlyArray<CalendarView>).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              className={`${styles.calendarSwitchBtn} ${
                view === v ? styles.calendarSwitchBtnOn : ""
              }`}
              onClick={() => setView(v)}
            >
              {VIEW_LABEL[v]}
            </button>
          ))}
        </div>
      </header>

      <div
        className={styles.calendarGrid}
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
        role="grid"
      >
        {view !== "day" &&
          WEEKDAYS.slice(0, gridCols).map((dow) => (
            <span key={dow} className={styles.calendarDow} role="columnheader">
              {dow}
            </span>
          ))}

        {filteredDays.map((day) => {
          const isHovered = hoverDate === day.date
          return (
            <div
              key={day.date}
              role="gridcell"
              aria-label={`${day.weekday} ${day.dayNumber}, ${day.posts.length} post${day.posts.length === 1 ? "" : "s"}`}
              className={`${styles.calendarCell} ${
                day.outsideMonth ? styles.calendarCellOutside : ""
              } ${day.isToday ? styles.calendarCellToday : ""}`}
              style={isHovered ? { boxShadow: "0 0 0 1px var(--pulse-teal)" } : undefined}
              onDragOver={(event) => onDragOver(event, day.date)}
              onDrop={(event) => onDrop(event, day.date)}
              onDragLeave={() => setHoverDate(null)}
            >
              <div className={styles.calendarCellHead}>
                <span>{day.dayNumber}</span>
                <span>{day.posts.length || ""}</span>
              </div>
              <div className={styles.calendarCellPosts}>
                {day.posts.map((post) => {
                  const time = `${String(post.hour).padStart(2, "0")}:${String(post.minute).padStart(2, "0")}`
                  return (
                    <button
                      key={post.id}
                      type="button"
                      draggable
                      className={`${styles.calendarPostChip} ${
                        draggingId === post.id ? styles.calendarPostChipDragging : ""
                      }`}
                      data-status={post.status}
                      aria-label={`${post.title} at ${time}, ${post.status}. Use arrow keys to reschedule.`}
                      onDragStart={(event) => onDragStart(event, post.id, day.date)}
                      onDragEnd={onDragEnd}
                      onKeyDown={(event) => onChipKey(event, post.id, day.date)}
                    >
                      <span className={styles.calendarPostChipMark}>{time}</span>
                      <span className={styles.calendarPostChipTitle}>{post.title}</span>
                      <span className={styles.calendarPostChipMark}>
                        {platformMarks(platforms, post.platforms)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default QueueCalendar
