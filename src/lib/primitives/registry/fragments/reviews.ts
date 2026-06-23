import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "reviews",
  "title": "Reviews",
  "group": "Marketing",
  "summary": "14 customer-review primitives — review cards, rating breakdowns, star selectors, sentiment/verified chips, photo attachments, owner replies, filter/sort bars, a summary dashboard, a request prompt, a moderation queue, abuse flagging, and a rich reply editor — for collecting, displaying, and moderating workshop reviews.",
  "entries": [
    {
      "key": "reviews/review-card",
      "family": "reviews",
      "name": "ReviewCard",
      "label": "Review card",
      "description": "Customer review article with avatar, star rating, headline/body, verified + sentiment chips, tags, helpful button, and slots for photos and an owner reply.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/review-card",
      "tags": [
        "review",
        "rating",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/rating-breakdown-bar",
      "family": "reviews",
      "name": "RatingBreakdownBar",
      "label": "Rating breakdown bar",
      "description": "Per-star-tier distribution rendered as labelled progress meters with percentage and count, sorted 5 to 1.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/rating-breakdown-bar",
      "tags": [
        "rating",
        "distribution",
        "meter"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/star-rating-selector",
      "family": "reviews",
      "name": "StarRatingSelector",
      "label": "Star rating selector",
      "description": "Interactive radiogroup star input with optional half-star steps, hover preview, descriptive labels, and a clear-rating chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/star-rating-selector",
      "tags": [
        "rating",
        "input",
        "stars"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/review-sentiment-chip",
      "family": "reviews",
      "name": "ReviewSentimentChip",
      "label": "Review sentiment chip",
      "description": "Tone-coloured chip with a smile/meh/frown icon flagging a review as positive, mixed, or negative.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/review-sentiment-chip",
      "tags": [
        "sentiment",
        "chip",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/verified-purchase-chip",
      "family": "reviews",
      "name": "VerifiedPurchaseChip",
      "label": "Verified purchase chip",
      "description": "Green shield chip marking a verified purchase, with an optional quote-bubble tooltip showing the transaction date.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/verified-purchase-chip",
      "tags": [
        "verified",
        "chip",
        "trust"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/photo-review-attachment",
      "family": "reviews",
      "name": "PhotoReviewAttachment",
      "label": "Photo review attachment",
      "description": "Thumbnail strip of reviewer photos with numbered placeholders, an Escape-dismissable lightbox dialog, and an empty state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/photo-review-attachment",
      "tags": [
        "photos",
        "gallery",
        "lightbox"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/owner-response-card",
      "family": "reviews",
      "name": "OwnerResponseCard",
      "label": "Owner response card",
      "description": "Aside card for a workshop's reply to a review, with responder avatar, name, role, timestamp, and body.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/owner-response-card",
      "tags": [
        "reply",
        "owner",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/review-filter-chips",
      "family": "reviews",
      "name": "ReviewFilterChips",
      "label": "Review filter chips",
      "description": "Selectable chip group filtering reviews by star tier, photos, verified status, or recency, with optional per-filter counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/review-filter-chips",
      "tags": [
        "filter",
        "chips",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/review-summary-card",
      "family": "reviews",
      "name": "ReviewSummaryCard",
      "label": "Review summary card",
      "description": "Reviews overview dashboard combining overall rating, breakdown bars, a sentiment donut, a 30-day trend sparkline, and a recommend percentage.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/review-summary-card",
      "tags": [
        "summary",
        "dashboard",
        "dataviz"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/review-request-prompt",
      "family": "reviews",
      "name": "ReviewRequestPrompt",
      "label": "Review request prompt",
      "description": "Post-job feedback form with a star selector and textarea, validating input and showing a moderation confirmation on submit.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/review-request-prompt",
      "tags": [
        "form",
        "request",
        "feedback"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/review-moderation-queue",
      "family": "reviews",
      "name": "ReviewModerationQueue",
      "label": "Review moderation queue",
      "description": "Data-table queue of pending reviews showing reviewer, rating, preview, auto-flag, and status with approve/edit/reject row actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/review-moderation-queue",
      "tags": [
        "moderation",
        "table",
        "queue"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/spam-abuse-flag",
      "family": "reviews",
      "name": "SpamAbuseFlag",
      "label": "Spam / abuse flag",
      "description": "Report form with a reason radiogroup (spam, off-topic, hate, personal-info) and optional note, showing a confirmation with report ID on submit.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/spam-abuse-flag",
      "tags": [
        "report",
        "abuse",
        "moderation"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/most-helpful-sort-bar",
      "family": "reviews",
      "name": "MostHelpfulSortBar",
      "label": "Most-helpful sort bar",
      "description": "Chip-based sort control for reviews (most helpful, recent, highest/lowest rating, with photos) plus a localized result count.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/most-helpful-sort-bar",
      "tags": [
        "sort",
        "chips",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "reviews/rich-review-reply-editor",
      "family": "reviews",
      "name": "RichReviewReplyEditor",
      "label": "Rich review reply editor",
      "description": "Workshop reply composer with cursor-aware token insertion, a canned-reply macro picker, review context snippet, and a public-post action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/reviews",
      "routeHref": "/ui-primitives/reviews/rich-review-reply-editor",
      "tags": [
        "reply",
        "editor",
        "macros"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
