import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "roster",
  "title": "Roster",
  "group": "Operations",
  "summary": "14 workshop roster and workforce primitives — technician profiles, scheduling, time clock, leave, skills/certs, coverage, bays, breaks, overtime, training, reviews and apprentice progress — composed from shared calendar, chart, data-display and primitive building blocks.",
  "entries": [
    {
      "key": "roster/technician-profile-card",
      "family": "roster",
      "name": "TechnicianProfileCard",
      "label": "Technician profile card",
      "description": "Profile card showing a technician's avatar, role, shift-status chip, certification chips and the bays they are rostered onto today.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/technician-profile",
      "tags": [
        "technician",
        "profile",
        "certifications"
      ],
      "status": "captured"
    },
    {
      "key": "roster/daily-schedule-strip",
      "family": "roster",
      "name": "DailyScheduleStrip",
      "label": "Daily schedule strip",
      "description": "Vertical timeline of one technician's day rendering ordered job, break, training and travel blocks as compact tone-coded event cards.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/daily-schedule",
      "tags": [
        "schedule",
        "timeline",
        "shifts"
      ],
      "status": "captured"
    },
    {
      "key": "roster/shift-swap-modal",
      "family": "roster",
      "name": "ShiftSwapModal",
      "label": "Shift swap modal",
      "description": "Dialog for requesting a shift swap — shows the user's shift, a radio list of teammate candidates and selectable reason chips before submitting.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/shift-swap",
      "tags": [
        "shift",
        "swap",
        "dialog"
      ],
      "status": "captured"
    },
    {
      "key": "roster/time-off-request-form",
      "family": "roster",
      "name": "TimeOffRequestForm",
      "label": "Time off request form",
      "description": "Leave request form with leave-type chip selector, start/end date inputs and an optional reason textarea submitted for manager approval.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/time-off-request",
      "tags": [
        "leave",
        "form",
        "time-off"
      ],
      "status": "captured"
    },
    {
      "key": "roster/clock-in-out-widget",
      "family": "roster",
      "name": "ClockInOutWidget",
      "label": "Clock in/out widget",
      "description": "Time-clock control with live status chip, elapsed-shift and break readouts, and stateful clock-in, start/end break and clock-out actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/clock-in-out",
      "tags": [
        "timeclock",
        "attendance",
        "shift"
      ],
      "status": "captured"
    },
    {
      "key": "roster/skill-cert-matrix",
      "family": "roster",
      "name": "SkillCertMatrix",
      "label": "Skill & cert matrix",
      "description": "Data-table matrix of technicians against skills, with per-cell certification-level chips and amber/red expiry warning chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/skill-cert-matrix",
      "tags": [
        "skills",
        "certifications",
        "matrix"
      ],
      "status": "captured"
    },
    {
      "key": "roster/roster-calendar-overlay",
      "family": "roster",
      "name": "RosterCalendarOverlay",
      "label": "Roster calendar overlay",
      "description": "Week roster surface overlaying technician-tinted calendar events, a per-weekday coverage strip and a per-bay availability grid.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/roster-calendar",
      "tags": [
        "calendar",
        "coverage",
        "week"
      ],
      "status": "captured"
    },
    {
      "key": "roster/coverage-gap-warning",
      "family": "roster",
      "name": "CoverageGapWarning",
      "label": "Coverage gap warning",
      "description": "Alert card flagging an under-covered window, computing the hour shortfall against required hours with required/actual chips and an assign-cover action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/coverage-gap",
      "tags": [
        "coverage",
        "alert",
        "warning"
      ],
      "status": "captured"
    },
    {
      "key": "roster/bay-assignment-grid",
      "family": "roster",
      "name": "BayAssignmentGrid",
      "label": "Bay assignment grid",
      "description": "Bays-by-hour grid showing which technician (as a tone-coded chip) is assigned to each bay across the working day, with empty cells for unassigned slots.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/bay-assignment-grid",
      "tags": [
        "bays",
        "assignment",
        "grid"
      ],
      "status": "captured"
    },
    {
      "key": "roster/lunch-break-tracker",
      "family": "roster",
      "name": "LunchBreakTracker",
      "label": "Lunch break tracker",
      "description": "List of technicians on break with avatar, progress bar of taken-vs-allowance minutes, a remaining-time chip and an optional extend-break action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/lunch-break",
      "tags": [
        "breaks",
        "tracker",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "roster/overtime-tally-chip",
      "family": "roster",
      "name": "OvertimeTallyChip",
      "label": "Overtime tally",
      "description": "Metric block of weekly and monthly overtime hours with threshold-coded chips that turn amber near and red at the cap.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/overtime-tally",
      "tags": [
        "overtime",
        "metrics",
        "threshold"
      ],
      "status": "captured"
    },
    {
      "key": "roster/training-session-card",
      "family": "roster",
      "name": "TrainingSessionCard",
      "label": "Training session card",
      "description": "Card for an upcoming training session showing topic, trainer, date, attendee/capacity count chip and an optional list of linked materials.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/training-session",
      "tags": [
        "training",
        "session",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "roster/performance-review-row",
      "family": "roster",
      "name": "PerformanceReviewRow",
      "label": "Performance review row",
      "description": "Compact list row showing a technician's avatar, role, last-review date and a tone-coded performance-rating chip with an open-review action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/performance-review",
      "tags": [
        "performance",
        "review",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "roster/apprentice-progress-meter",
      "family": "roster",
      "name": "ApprenticeProgressMeter",
      "label": "Apprentice progress meter",
      "description": "Apprentice qualification panel pairing a radial completion meter with a segmented modules-done progress bar and an optional next-module preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/roster",
      "routeHref": "/ui-primitives/roster/apprentice-progress",
      "tags": [
        "apprentice",
        "progress",
        "training"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
