import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "forms-gallery",
  "title": "Forms gallery",
  "group": "System",
  "summary": "10 standalone, fully-controlled form primitives (contact, booking, vehicle intake, multi-step quote, rating feedback, newsletter, multi-question survey, drag-drop upload, address with autocomplete, and collapsible search filters) — each accepts onSubmit(FormData) plus typed defaultValues, with accessible labels, ARIA roles, and inline success/validation states.",
  "entries": [
    {
      "key": "forms-gallery/contact-form",
      "family": "forms-gallery",
      "name": "ContactForm",
      "label": "Contact form",
      "description": "Workshop enquiry form with name/email/phone/subject select, message textarea, mock attachment toggle, consent checkbox, and inline success banner.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/contact",
      "tags": [
        "contact",
        "enquiry",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/booking-form",
      "family": "forms-gallery",
      "name": "BookingForm",
      "label": "Booking form",
      "description": "Workshop bay booking with rego input, drop-off/wait toggle, a custom month calendar date picker, time-slot radio group, and callback opt-in.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/booking",
      "tags": [
        "booking",
        "calendar",
        "scheduling"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/vehicle-intake-form",
      "family": "forms-gallery",
      "name": "VehicleIntakeForm",
      "label": "Vehicle intake form",
      "description": "Vehicle profile capture with mock rego lookup, make/year/engine/body selects, fuel-type radio chips, a photo-tray toggle grid, and notes.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/vehicle-intake",
      "tags": [
        "vehicle",
        "intake",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/quote-request-form",
      "family": "forms-gallery",
      "name": "QuoteRequestForm",
      "label": "Quote request form",
      "description": "Three-step wizard (vehicle, multi-select services, contact) with a stepper header, private/fleet audience toggle, and back/continue navigation.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/quote-request",
      "tags": [
        "quote",
        "multi-step",
        "wizard"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/feedback-form",
      "family": "forms-gallery",
      "name": "FeedbackForm",
      "label": "Feedback form",
      "description": "Star-rating feedback with hover/focus preview copy, category radio chips, title/message fields, photo-attach toggle, and an anonymous send switch.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/feedback",
      "tags": [
        "feedback",
        "rating",
        "review"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/newsletter-signup",
      "family": "forms-gallery",
      "name": "NewsletterSignup",
      "label": "Newsletter signup",
      "description": "Compact single-email subscribe form with inline submit button that swaps to a confirmation success state with a reset action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/newsletter",
      "tags": [
        "newsletter",
        "subscribe",
        "email"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/survey-form",
      "family": "forms-gallery",
      "name": "SurveyForm",
      "label": "Survey form",
      "description": "Multi-question survey with a live ProgressLinear progress bar, 1-10 recommendation scale, multi-select chips, reorderable ranking list, notes, and a satisfaction slider.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/survey",
      "tags": [
        "survey",
        "progress",
        "questionnaire"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/file-upload-form",
      "family": "forms-gallery",
      "name": "FileUploadForm",
      "label": "File upload form",
      "description": "Drag-and-drop upload zone with browse fallback, per-file progress bars, type/size validation badges, removable file rows, and a total-size readout.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/file-upload",
      "tags": [
        "upload",
        "drag-drop",
        "files"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/address-form",
      "family": "forms-gallery",
      "name": "AddressForm",
      "label": "Address form",
      "description": "Address form with country select driving state options, a street autocomplete menu, cycling suburb chip, postcode pattern mask, and an optional separate delivery column.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/address",
      "tags": [
        "address",
        "autocomplete",
        "shipping"
      ],
      "status": "captured"
    },
    {
      "key": "forms-gallery/search-filter-form",
      "family": "forms-gallery",
      "name": "SearchFilterForm",
      "label": "Search filter form",
      "description": "Faceted search panel with keyword input, sort dropdown, and collapsible groups for price range slider, category chips, vehicle-type chips, and a suppliers-only toggle.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-gallery",
      "routeHref": "/ui-primitives/forms-gallery/search-filter",
      "tags": [
        "search",
        "filter",
        "faceted"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
