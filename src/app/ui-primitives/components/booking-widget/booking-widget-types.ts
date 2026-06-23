/**
 * Shared types for the embedded booking widget primitives.
 *
 * These are intentionally narrow string-literal unions, modelled on the
 * embedded Calendly/Cal.com-style widgets a customer drops into a marketing
 * site or partner page to book a Mufflermen workshop slot.
 */

export type SlotAvailability = "available" | "few-left" | "full" | "closed"

export type RecurrenceFrequency =
  | "weekly"
  | "fortnightly"
  | "monthly"
  | "custom"

export type CancellationReason =
  | "schedule-conflict"
  | "vehicle-sold"
  | "found-elsewhere"
  | "weather"
  | "price-changed"
  | "other"

export type EmbedMode = "iframe" | "popup" | "inline"

export type ClockFormat = "12h" | "24h"

export interface MoneyAud {
  /** Cents as integer to avoid float drift. */
  cents: number
  /** Always "AUD" for the Oak Flats workshop. */
  currency: "AUD"
}

export interface BookingService {
  id: string
  name: string
  durationMinutes: number
  price: MoneyAud
  /** Concurrent customers a bay can handle for this service. */
  capacity: number
  /** Optional short description rendered under the title. */
  blurb?: string
  /** Optional accent tone used on the leading rail. */
  accent?: "red" | "amber" | "teal" | "green"
}

export interface BookingDateOption {
  /** ISO date, e.g. "2026-06-04". */
  iso: string
  /** Local weekday short label e.g. "Thu". */
  weekday: string
  /** Day-of-month e.g. 4. */
  day: number
  /** Month short label e.g. "Jun". */
  month: string
  /** Number of slots still available. */
  availableSlots: number
  /** Total slot count, used to render a "few left" hint. */
  totalSlots: number
  /** True when the workshop is closed (Sundays). */
  isClosed: boolean
}

export interface TimeSlot {
  /** Slot id within the date, e.g. "08:30". */
  id: string
  /** Stored 24-hour format minutes since midnight. */
  minutesSinceMidnight: number
  availability: SlotAvailability
  /** Bay id assigned for the slot, e.g. "BAY-2". */
  bayId?: string
}

export type AmPmBand = "AM" | "PM"

export interface DurationOption {
  /** Duration in minutes. */
  minutes: number
  /** Price for this duration. */
  price: MoneyAud
}

export interface AddonItem {
  id: string
  label: string
  blurb: string
  price: MoneyAud
}

export interface TimeZoneOption {
  /** IANA name, e.g. "Australia/Sydney". */
  id: string
  /** Display name, e.g. "Sydney". */
  city: string
  /** UTC offset string e.g. "+10:00". */
  offset: string
  /** Country grouping e.g. "Australia". */
  country: string
}

export interface CustomerDetailsValues {
  fullName: string
  email: string
  phone: string
  vehicle: string
  notes: string
}

export interface BookingConfirmation {
  bookingId: string
  serviceName: string
  dateLabel: string
  timeLabel: string
  durationLabel: string
  bayLabel: string
  customer: CustomerDetailsValues
}
