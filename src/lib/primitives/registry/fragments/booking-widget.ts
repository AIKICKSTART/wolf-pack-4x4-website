import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "booking-widget",
  "title": "Booking widget",
  "group": "Operations",
  "summary": "14 booking-flow primitives — service/date/time/duration/addon pickers, customer form, confirmation card, embed snippet, time-zone, recurring, group-size, reschedule, cancellation, and no-show policy — sharing a typed BookingService/TimeSlot/MoneyAud envelope, AUD formatting, and full ARIA roles.",
  "entries": [
    {
      "key": "booking-widget/service-picker-card",
      "family": "booking-widget",
      "name": "ServicePickerCard",
      "label": "Service picker card",
      "description": "Selectable service card (role=radio) showing accent rail, duration, AUD price, and per-bay capacity chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/service-picker-card",
      "tags": [
        "booking",
        "service",
        "radio"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/booking-date-selector",
      "family": "booking-widget",
      "name": "BookingDateSelector",
      "label": "Booking date selector",
      "description": "Horizontally-scrollable date tile strip with prev/next nav and per-day slot-availability badges (few/full/closed).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/booking-date-selector",
      "tags": [
        "booking",
        "date",
        "calendar"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/time-slot-grid",
      "family": "booking-widget",
      "name": "TimeSlotGrid",
      "label": "Time slot grid",
      "description": "AM/PM-banded time-slot grid (role=grid) with availability tones and a 12h/24h clock-format toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/time-slot-grid",
      "tags": [
        "booking",
        "time",
        "slots"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/duration-picker",
      "family": "booking-widget",
      "name": "DurationPicker",
      "label": "Duration picker",
      "description": "Radiogroup of duration chips, each showing formatted duration and its AUD price.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/duration-picker",
      "tags": [
        "booking",
        "duration",
        "radio"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/addon-chip-row",
      "family": "booking-widget",
      "name": "AddonChipRow",
      "label": "Add-on chip row",
      "description": "Multi-select checkbox chip row of optional add-ons with a live running AUD add-ons total.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/addon-chip-row",
      "tags": [
        "booking",
        "addons",
        "checkbox"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/customer-details-form",
      "family": "booking-widget",
      "name": "CustomerDetailsForm",
      "label": "Customer details form",
      "description": "Controlled booking form collecting name, mobile, email, vehicle, and notes with labelled inputs and autocomplete.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/customer-details-form",
      "tags": [
        "booking",
        "form",
        "customer"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/booking-confirmation-card",
      "family": "booking-widget",
      "name": "BookingConfirmationCard",
      "label": "Booking confirmation card",
      "description": "Confirmation status card with booking detail list, scannable QR (faux SVG or image), and Google/Apple/Outlook calendar actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/booking-confirmation-card",
      "tags": [
        "booking",
        "confirmation",
        "qr"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/booking-embed-snippet",
      "family": "booking-widget",
      "name": "BookingEmbedSnippet",
      "label": "Booking embed snippet",
      "description": "Tabbed iframe/popup/inline embed-code generator with optional styling customization, rendered via CodeBlock.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/booking-embed-snippet",
      "tags": [
        "booking",
        "embed",
        "code"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/time-zone-selector",
      "family": "booking-widget",
      "name": "TimeZoneSelector",
      "label": "Time zone selector",
      "description": "Searchable time-zone listbox filtering by city/country/id, with a current-zone chip and auto-detect action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/time-zone-selector",
      "tags": [
        "booking",
        "timezone",
        "search"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/recurring-booking-option",
      "family": "booking-widget",
      "name": "RecurringBookingOption",
      "label": "Recurring booking option",
      "description": "Fieldset for repeating bookings — frequency radio chips, an occurrences stepper, and an end-date input.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/recurring-booking-option",
      "tags": [
        "booking",
        "recurring",
        "schedule"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/group-booking-party-size",
      "family": "booking-widget",
      "name": "GroupBookingPartySize",
      "label": "Group booking party size",
      "description": "Party-size stepper computing per-person and total AUD pricing with a threshold-based group discount.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/group-booking-party-size",
      "tags": [
        "booking",
        "group",
        "pricing"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/reschedule-modal",
      "family": "booking-widget",
      "name": "RescheduleModal",
      "label": "Reschedule modal",
      "description": "Modal dialog showing the original booking and composing the date selector, time-slot grid, and a reason picker to confirm a reschedule.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/reschedule-modal",
      "tags": [
        "booking",
        "reschedule",
        "modal"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/cancellation-flow",
      "family": "booking-widget",
      "name": "CancellationFlow",
      "label": "Cancellation flow",
      "description": "Three-step cancellation dialog (reason, refund policy, confirm) with a step indicator and refund-window warning.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/cancellation-flow",
      "tags": [
        "booking",
        "cancellation",
        "flow"
      ],
      "status": "captured"
    },
    {
      "key": "booking-widget/no-show-policy-card",
      "family": "booking-widget",
      "name": "NoShowPolicyCard",
      "label": "No-show policy card",
      "description": "Aside card listing no-show rules, cancellation deadline and reschedule allowance chips, with a tel: contact CTA and optional alert tone.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/booking-widget",
      "routeHref": "/ui-primitives/booking-widget/no-show-policy-card",
      "tags": [
        "booking",
        "policy",
        "no-show"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
