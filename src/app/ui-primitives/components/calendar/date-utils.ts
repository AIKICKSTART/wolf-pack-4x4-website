/**
 * Pure date helpers for calendar primitives.
 * No external dependencies. All functions return new Date instances or primitive
 * values; none of them mutate inputs.
 */

export const WEEKDAY_LONG: ReadonlyArray<string> = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export const WEEKDAY_SHORT: ReadonlyArray<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export const WEEKDAY_MIN: ReadonlyArray<string> = ["S", "M", "T", "W", "T", "F", "S"]

export const MONTH_LONG: ReadonlyArray<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const MONTH_SHORT: ReadonlyArray<string> = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

/** Returns a new Date offset by N days. Does not mutate the input. */
export function addDays(date: Date, days: number): Date {
  const next = new Date(date.getTime())
  next.setDate(next.getDate() + days)
  return next
}

/** Returns a new Date offset by N months. Clamps day if target month is shorter. */
export function addMonths(date: Date, months: number): Date {
  const next = new Date(date.getTime())
  const targetMonth = next.getMonth() + months
  next.setDate(1)
  next.setMonth(targetMonth)
  const daysInTarget = endOfMonth(next).getDate()
  next.setDate(Math.min(date.getDate(), daysInTarget))
  return next
}

/** Returns the first day of the month for the given date. */
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/** Returns the last day of the month for the given date. */
export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/** Returns the Sunday-based start-of-week for the given date. */
export function startOfWeek(date: Date, weekStartsOn: 0 | 1 = 0): Date {
  const day = date.getDay()
  const diff = (day - weekStartsOn + 7) % 7
  return addDays(startOfDay(date), -diff)
}

/** Returns the end-of-week date (Saturday by default) for the given date. */
export function endOfWeek(date: Date, weekStartsOn: 0 | 1 = 0): Date {
  return addDays(startOfWeek(date, weekStartsOn), 6)
}

/** Returns midnight on the given date. */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** Returns true if a and b are the same calendar day. */
export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Returns true if a and b are the same year-month. */
export function sameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

/** Returns true if `date` lies between start and end (inclusive on both ends, day-level). */
export function isWithinRange(date: Date, start: Date, end: Date): boolean {
  const d = startOfDay(date).getTime()
  const s = startOfDay(start).getTime()
  const e = startOfDay(end).getTime()
  const lo = Math.min(s, e)
  const hi = Math.max(s, e)
  return d >= lo && d <= hi
}

/** Pads a number to a two-digit string. */
function pad2(value: number): string {
  return value.toString().padStart(2, "0")
}

/** Formats a Date as "HH:MM" with 24h or 12h clock. */
export function formatTime(date: Date, clock: 12 | 24 = 24): string {
  const hours = date.getHours()
  const mins = date.getMinutes()
  if (clock === 24) {
    return `${pad2(hours)}:${pad2(mins)}`
  }
  const period = hours >= 12 ? "PM" : "AM"
  const display = hours % 12 === 0 ? 12 : hours % 12
  return `${display}:${pad2(mins)} ${period}`
}

/** Formats a time range "09:00 – 11:30". */
export function formatRange(start: Date, end: Date, clock: 12 | 24 = 24): string {
  return `${formatTime(start, clock)} – ${formatTime(end, clock)}`
}

/** Formats a date as "Wed 28 May 2026". */
export function formatLongDate(date: Date): string {
  const wd = WEEKDAY_SHORT[date.getDay()]
  return `${wd} ${date.getDate()} ${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`
}

/** Formats a date as "May 2026". */
export function formatMonthYear(date: Date): string {
  return `${MONTH_LONG[date.getMonth()]} ${date.getFullYear()}`
}

/** Returns the matrix of 42 dates (6 rows × 7 cols) that fills a month-view grid. */
export function buildMonthMatrix(reference: Date, weekStartsOn: 0 | 1 = 0): Date[] {
  const first = startOfMonth(reference)
  const gridStart = startOfWeek(first, weekStartsOn)
  const cells: Date[] = []
  for (let index = 0; index < 42; index += 1) {
    cells.push(addDays(gridStart, index))
  }
  return cells
}

/** Returns the days of a single week starting at weekStartsOn. */
export function buildWeekDays(reference: Date, weekStartsOn: 0 | 1 = 0): Date[] {
  const start = startOfWeek(reference, weekStartsOn)
  return Array.from({ length: 7 }, (_, index) => addDays(start, index))
}

/** Returns an array of hour labels (06:00..21:00 inclusive) given a range. */
export function buildHourLabels(startHour: number, endHour: number, clock: 12 | 24 = 24): string[] {
  const labels: string[] = []
  for (let hour = startHour; hour <= endHour; hour += 1) {
    if (clock === 24) {
      labels.push(`${pad2(hour)}:00`)
    } else {
      const period = hour >= 12 ? "PM" : "AM"
      const display = hour % 12 === 0 ? 12 : hour % 12
      labels.push(`${display} ${period}`)
    }
  }
  return labels
}

/** Returns minutes since midnight for the given Date. */
export function minutesFromMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

/** Returns difference in calendar days between two dates (b - a). */
export function diffInDays(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}
