import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "bay-display",
  "title": "Bay display",
  "group": "Operations",
  "summary": "14 workshop-floor signage primitives for the Oak Flats Mufflermen bay display — live bay status, vehicle queue, customer call-up, now-serving and dyno marquees, weather/fuel/community tickers, workshop clock, service menu, staff recognition, safety rotation, social wall, and QR call-to-action.",
  "entries": [
    {
      "key": "bay-display/bay-status-hero",
      "family": "bay-display",
      "name": "BayStatusHero",
      "label": "Bay status hero",
      "description": "Large per-bay status hero showing current vehicle, customer, mechanic and handover ETA with a tone-accented status chip and optional pulse.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/bay-status-hero",
      "tags": [
        "bay",
        "status",
        "signage",
        "operations"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/vehicle-queue-rail",
      "family": "bay-display",
      "name": "VehicleQueueRail",
      "label": "Vehicle queue rail",
      "description": "Ordered rail of upcoming queue cards with next/soon/later position chips, booked time, assigned bay and wait time.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/vehicle-queue-rail",
      "tags": [
        "queue",
        "booking",
        "signage"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/customer-call-banner",
      "family": "bay-display",
      "name": "CustomerCallBanner",
      "label": "Customer call banner",
      "description": "Assertive alert banner that calls a named customer with kinetic headline text and an optional gesture-triggered bell with mute control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/customer-call-banner",
      "tags": [
        "alert",
        "customer",
        "audio",
        "signage"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/now-serving-strip",
      "family": "bay-display",
      "name": "NowServingStrip",
      "label": "Now serving strip",
      "description": "Horizontal marquee ticker of live floor jobs, each showing bay label, vehicle and current status, with pause-on-hover.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/now-serving-strip",
      "tags": [
        "marquee",
        "jobs",
        "ticker"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/weather-strip",
      "family": "bay-display",
      "name": "WeatherStrip",
      "label": "Weather strip",
      "description": "Local weather and tide strip with condition icon, big temperature, wind, humidity and next Lake Illawarra tide height/phase.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/weather-strip",
      "tags": [
        "weather",
        "tides",
        "local"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/fuel-price-strip",
      "family": "bay-display",
      "name": "FuelPriceStrip",
      "label": "Fuel price strip",
      "description": "Local fuel-watch list of stations with grade, per-litre price and rising/falling/steady trend indicators plus an as-at timestamp.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/fuel-price-strip",
      "tags": [
        "fuel",
        "prices",
        "trend"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/workshop-clock-tile",
      "family": "bay-display",
      "name": "WorkshopClockTile",
      "label": "Workshop clock tile",
      "description": "Live analog + digital clock tile that ticks after mount, showing time, date and current shift label, SSR-seeded.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/workshop-clock-tile",
      "tags": [
        "clock",
        "shift",
        "time"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/community-ticker",
      "family": "bay-display",
      "name": "CommunityTicker",
      "label": "Community ticker",
      "description": "Around-town marquee of footy/event/notice items with kind chips, headline and optional detail line.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/community-ticker",
      "tags": [
        "marquee",
        "community",
        "ticker"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/service-menu-board",
      "family": "bay-display",
      "name": "ServiceMenuBoard",
      "label": "Service menu board",
      "description": "Priced workshop menu board listing services with detail, leader dots and from-price (or POA), highlighting featured offers.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/service-menu-board",
      "tags": [
        "menu",
        "pricing",
        "services"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/staff-recognition-card",
      "family": "bay-display",
      "name": "StaffRecognitionCard",
      "label": "Staff recognition card",
      "description": "Employee-of-the-week card with avatar/photo, name, role, tenure and a quoted recognition reason.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/staff-recognition-card",
      "tags": [
        "staff",
        "recognition",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/dyno-result-marquee",
      "family": "bay-display",
      "name": "DynoResultMarquee",
      "label": "Dyno result marquee",
      "description": "Marquee of latest dyno results showing vehicle, peak kW/Nm, optional power gain delta and the happy customer's name.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/dyno-result-marquee",
      "tags": [
        "dyno",
        "marquee",
        "performance"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/safety-message-tile",
      "family": "bay-display",
      "name": "SafetyMessageTile",
      "label": "Safety message tile",
      "description": "Auto-rotating safety tile cycling info/caution/danger messages with tone icon, headline, body and progress dots; respects reduced-motion.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/safety-message-tile",
      "tags": [
        "safety",
        "rotation",
        "signage"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/social-media-wall",
      "family": "bay-display",
      "name": "SocialMediaWall",
      "label": "Social media wall",
      "description": "Grid of social posts with Next/Image media, platform badge, handle, caption and like/comment counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/social-media-wall",
      "tags": [
        "social",
        "grid",
        "media"
      ],
      "status": "captured"
    },
    {
      "key": "bay-display/qr-code-call-to-action",
      "family": "bay-display",
      "name": "QrCodeCallToAction",
      "label": "QR call to action",
      "description": "Campaign QR call-to-action with headline/subhead, URL chip and either a real QR image or a deterministic decorative QR grid hashed from the URL.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bay-display",
      "routeHref": "/ui-primitives/bay-display/qr-code-call-to-action",
      "tags": [
        "qr",
        "cta",
        "campaign"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
