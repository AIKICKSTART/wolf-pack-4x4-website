import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "calendar",
  "title": "Calendar &amp; scheduling",
  "group": "Operations",
  "summary": "11 calendar and scheduling primitives: month/week/day/agenda event views, mini and dual-month range date pickers, 12/24h time and time-range pickers, a recurrence-rule builder, an interactive weekly schedule grid, an event card, and a bay availability grid — sharing a local date-utils module.",
  "entries": [
    {
      "key": "calendar/month-view",
      "family": "calendar",
      "name": "CalendarMonthView",
      "label": "Month view",
      "description": "Six-week month grid that groups events by day, shows up to three tone-colored chips per cell with a +N more overflow, and marks today.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/month",
      "tags": [
        "calendar",
        "month",
        "events"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/week-view",
      "family": "calendar",
      "name": "CalendarWeekView",
      "label": "Week view",
      "description": "Seven-day time-grid with an hour column, per-day event blocks positioned by start/end minutes, and a current-time now-line when today is in range.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/week",
      "tags": [
        "calendar",
        "week",
        "timegrid"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/day-view",
      "family": "calendar",
      "name": "CalendarDayView",
      "label": "Day view",
      "description": "Single-day hourly schedule list where each hour row stacks its events (with bay and time-range chips) or shows an open marker when empty.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/day",
      "tags": [
        "calendar",
        "day",
        "schedule"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/agenda-view",
      "family": "calendar",
      "name": "CalendarAgendaView",
      "label": "Agenda view",
      "description": "Scrollable upcoming-schedule list that groups events by day in ascending order, with per-day headers and bay/technician detail per event.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/agenda",
      "tags": [
        "calendar",
        "agenda",
        "list"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/mini-date-picker",
      "family": "calendar",
      "name": "MiniDatePicker",
      "label": "Mini date picker",
      "description": "Compact single-month date picker with keyboard arrow navigation, today/selected/range highlighting, and optional month-nav chevrons.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/date-picker",
      "tags": [
        "date-picker",
        "input",
        "calendar"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/date-range-picker",
      "family": "calendar",
      "name": "DateRangePicker",
      "label": "Date range picker",
      "description": "Dual-month range picker with quick presets (today, last 7, this/last month, custom), two-click start/end selection, and a live selection summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/date-range",
      "tags": [
        "date-range",
        "presets",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/time-picker",
      "family": "calendar",
      "name": "TimePicker",
      "label": "Time picker",
      "description": "Scrollable hour/minute listbox time picker supporting 12h or 24h clock, configurable minute step, and an AM/PM block in 12h mode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/time",
      "tags": [
        "time-picker",
        "input",
        "listbox"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/time-range-picker",
      "family": "calendar",
      "name": "TimeRangePicker",
      "label": "Time range picker",
      "description": "Pairs two TimePickers as from/to with a divider and a computed duration summary that flags invalid ranges.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/time-range",
      "tags": [
        "time-range",
        "duration",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/recurrence-picker",
      "family": "calendar",
      "name": "RecurrencePicker",
      "label": "Recurrence picker",
      "description": "Recurrence-rule builder for interval + daily/weekly/monthly frequency, weekday toggles, day-of-month, and never/on-date/after-count end conditions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/recurrence",
      "tags": [
        "recurrence",
        "rrule",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/schedule-grid",
      "family": "calendar",
      "name": "ScheduleGrid",
      "label": "Schedule grid",
      "description": "Weekday-by-hour matrix of available/booked/blocked slots where clicking a cell cycles its state and fires an onSelect callback, with a legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/schedule-grid",
      "tags": [
        "schedule",
        "grid",
        "interactive"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/event-card",
      "family": "calendar",
      "name": "EventCard",
      "label": "Event card",
      "description": "Tone-colored event card in compact or expanded variants showing time range, optional icon, description, location, and stacked attendee avatars.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/event-card",
      "tags": [
        "event",
        "card",
        "attendees"
      ],
      "status": "captured"
    },
    {
      "key": "calendar/availability-grid",
      "family": "calendar",
      "name": "AvailabilityGrid",
      "label": "Availability grid",
      "description": "Bay-by-hour occupancy matrix rendering free/busy/blocked/maintenance states per cell with a legend and accessible per-cell labels.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/calendar",
      "routeHref": "/ui-primitives/calendar/availability",
      "tags": [
        "availability",
        "bays",
        "grid"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
