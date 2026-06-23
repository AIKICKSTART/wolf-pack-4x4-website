/**
 * Realistic sample data for the booking-widget primitive showcases.
 * Oak Flats Mufflermen — Sydney AU, AUD pricing, Bay 1 / 2 / 3.
 * Workshop is open Mon–Sat, closed Sundays.
 */
import type {
  AddonItem,
  BookingConfirmation,
  BookingDateOption,
  BookingService,
  CustomerDetailsValues,
  DurationOption,
  TimeSlot,
  TimeZoneOption,
} from "../components/booking-widget"

export const SAMPLE_SERVICES: ReadonlyArray<BookingService> = [
  {
    id: "sound-check",
    name: "Sound check",
    durationMinutes: 30,
    price: { cents: 0, currency: "AUD" },
    capacity: 1,
    blurb: "30-min decibel test + tail-pipe inspection. No charge.",
    accent: "teal",
  },
  {
    id: "bay-drop-off",
    name: "Bay drop-off slot",
    durationMinutes: 240,
    price: { cents: 0, currency: "AUD" },
    capacity: 1,
    blurb: "Drop the car and we'll quote on-site. Hold time only.",
    accent: "amber",
  },
  {
    id: "custom-exhaust",
    name: "Custom exhaust install",
    durationMinutes: 360,
    price: { cents: 180000, currency: "AUD" },
    capacity: 1,
    blurb: "Full custom from cat-back. Pricing varies — final on-site.",
    accent: "red",
  },
  {
    id: "quote-consult",
    name: "Quote consultation",
    durationMinutes: 45,
    price: { cents: 0, currency: "AUD" },
    capacity: 1,
    blurb: "Sit with the lead tech. Bring make + model. Free.",
    accent: "green",
  },
]

export const SAMPLE_DATES: ReadonlyArray<BookingDateOption> = [
  { iso: "2026-06-01", weekday: "Mon", day: 1, month: "Jun", availableSlots: 6, totalSlots: 10, isClosed: false },
  { iso: "2026-06-02", weekday: "Tue", day: 2, month: "Jun", availableSlots: 2, totalSlots: 10, isClosed: false },
  { iso: "2026-06-03", weekday: "Wed", day: 3, month: "Jun", availableSlots: 8, totalSlots: 10, isClosed: false },
  { iso: "2026-06-04", weekday: "Thu", day: 4, month: "Jun", availableSlots: 4, totalSlots: 10, isClosed: false },
  { iso: "2026-06-05", weekday: "Fri", day: 5, month: "Jun", availableSlots: 0, totalSlots: 10, isClosed: false },
  { iso: "2026-06-06", weekday: "Sat", day: 6, month: "Jun", availableSlots: 5, totalSlots: 6, isClosed: false },
  { iso: "2026-06-07", weekday: "Sun", day: 7, month: "Jun", availableSlots: 0, totalSlots: 0, isClosed: true },
  { iso: "2026-06-08", weekday: "Mon", day: 8, month: "Jun", availableSlots: 7, totalSlots: 10, isClosed: false },
  { iso: "2026-06-09", weekday: "Tue", day: 9, month: "Jun", availableSlots: 3, totalSlots: 10, isClosed: false },
  { iso: "2026-06-10", weekday: "Wed", day: 10, month: "Jun", availableSlots: 9, totalSlots: 10, isClosed: false },
  { iso: "2026-06-11", weekday: "Thu", day: 11, month: "Jun", availableSlots: 6, totalSlots: 10, isClosed: false },
  { iso: "2026-06-12", weekday: "Fri", day: 12, month: "Jun", availableSlots: 1, totalSlots: 10, isClosed: false },
]

export const SAMPLE_SLOTS: ReadonlyArray<TimeSlot> = [
  { id: "08:00", minutesSinceMidnight: 480, availability: "available", bayId: "BAY-1" },
  { id: "08:30", minutesSinceMidnight: 510, availability: "available", bayId: "BAY-2" },
  { id: "09:00", minutesSinceMidnight: 540, availability: "few-left", bayId: "BAY-3" },
  { id: "09:30", minutesSinceMidnight: 570, availability: "full" },
  { id: "10:00", minutesSinceMidnight: 600, availability: "available", bayId: "BAY-2" },
  { id: "10:30", minutesSinceMidnight: 630, availability: "available", bayId: "BAY-1" },
  { id: "11:00", minutesSinceMidnight: 660, availability: "few-left", bayId: "BAY-3" },
  { id: "11:30", minutesSinceMidnight: 690, availability: "available", bayId: "BAY-1" },
  { id: "13:00", minutesSinceMidnight: 780, availability: "available", bayId: "BAY-1" },
  { id: "13:30", minutesSinceMidnight: 810, availability: "few-left", bayId: "BAY-2" },
  { id: "14:00", minutesSinceMidnight: 840, availability: "available", bayId: "BAY-3" },
  { id: "14:30", minutesSinceMidnight: 870, availability: "full" },
  { id: "15:00", minutesSinceMidnight: 900, availability: "available", bayId: "BAY-2" },
  { id: "15:30", minutesSinceMidnight: 930, availability: "available", bayId: "BAY-1" },
  { id: "16:00", minutesSinceMidnight: 960, availability: "closed" },
]

export const SAMPLE_DURATIONS: ReadonlyArray<DurationOption> = [
  { minutes: 30, price: { cents: 4500, currency: "AUD" } },
  { minutes: 45, price: { cents: 6000, currency: "AUD" } },
  { minutes: 60, price: { cents: 9500, currency: "AUD" } },
  { minutes: 90, price: { cents: 14500, currency: "AUD" } },
  { minutes: 120, price: { cents: 19500, currency: "AUD" } },
]

export const SAMPLE_ADDONS: ReadonlyArray<AddonItem> = [
  {
    id: "pre-inspection",
    label: "Pre-inspection",
    blurb: "We scan under-car before quote.",
    price: { cents: 6500, currency: "AUD" },
  },
  {
    id: "loaner-car",
    label: "Loaner car",
    blurb: "Manual Hilux ute, half-day.",
    price: { cents: 9500, currency: "AUD" },
  },
  {
    id: "sound-demo",
    label: "Sound demo",
    blurb: "Record before + after audio clip.",
    price: { cents: 0, currency: "AUD" },
  },
  {
    id: "detail-wash",
    label: "Detail wash",
    blurb: "Wheels + sills clean on collection.",
    price: { cents: 5000, currency: "AUD" },
  },
]

export const SAMPLE_TIME_ZONES: ReadonlyArray<TimeZoneOption> = [
  { id: "Australia/Sydney", city: "Sydney", offset: "+10:00", country: "Australia" },
  { id: "Australia/Melbourne", city: "Melbourne", offset: "+10:00", country: "Australia" },
  { id: "Australia/Brisbane", city: "Brisbane", offset: "+10:00", country: "Australia" },
  { id: "Australia/Perth", city: "Perth", offset: "+08:00", country: "Australia" },
  { id: "Australia/Adelaide", city: "Adelaide", offset: "+09:30", country: "Australia" },
  { id: "Pacific/Auckland", city: "Auckland", offset: "+12:00", country: "New Zealand" },
  { id: "Asia/Singapore", city: "Singapore", offset: "+08:00", country: "Singapore" },
  { id: "Asia/Tokyo", city: "Tokyo", offset: "+09:00", country: "Japan" },
  { id: "Europe/London", city: "London", offset: "+00:00", country: "United Kingdom" },
  { id: "America/Los_Angeles", city: "Los Angeles", offset: "-08:00", country: "United States" },
]

export const SAMPLE_CUSTOMER: CustomerDetailsValues = {
  fullName: "Brett Anderson",
  email: "brett@oakflats.com.au",
  phone: "0412 345 678",
  vehicle: "CGB-741 — 2014 Holden Commodore SS",
  notes: "Sounds like a blow at the mid-muffler. Happy to wait.",
}

export const SAMPLE_CONFIRMATION: BookingConfirmation = {
  bookingId: "MM-26-00417",
  serviceName: "Custom exhaust install",
  dateLabel: "Thursday 4 Jun 2026",
  timeLabel: "08:00 AM",
  durationLabel: "6h hold",
  bayLabel: "Bay 2",
  customer: SAMPLE_CUSTOMER,
}

export const POLICY_RULES: ReadonlyArray<string> = [
  "Arrive within the 15-minute grace window or the bay is released.",
  "A no-show inside the free-cancel window is a $0 reschedule.",
  "A no-show outside the window incurs a $45 missed-slot fee.",
  "Two no-shows in 90 days require deposit on the next booking.",
]
