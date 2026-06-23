/**
 * Realistic NSW Illawarra sample data used by every locations-pages
 * sub-route. Centralised so demo content stays consistent across
 * the showcase routes and the full-suburb-page composition.
 *
 * The focal suburb on the showcase is Albion Park Rail (workshop
 * address suburb), with Shellharbour, Wollongong, Dapto, Warilla,
 * Kiama, Figtree, Helensburgh, Unanderra, Berkeley as surroundings.
 */

import type {
  NearbyWorkshopEntry,
  SuburbFastFact,
  SuburbFaqItem,
  SuburbServiceTile,
  SuburbTestimonialProps,
  SurroundingSuburb,
} from "../../ui-primitives/components/locations-pages"

export const FOCAL_SUBURB = {
  name: "Albion Park Rail",
  postcode: "2527",
  state: "NSW" as const,
  lga: "Shellharbour City",
  driveMinutesFromWorkshop: 4,
  distanceKmFromWorkshop: 1.6,
  suburbHref: "/ui-primitives/locations-pages/full-suburb-page",
}

export const SUBURB_TAGLINE =
  "Drivers from Albion Park Rail get the closest Oak Flats Muffler Men catchment — mandrel-bent stainless, ADR-stamped catbacks, and lifetime weld warranty walking distance from the workshop."

export const FAST_FACTS: ReadonlyArray<SuburbFastFact> = [
  {
    id: "postcode",
    label: "Postcode",
    value: "2527",
    note: "Shellharbour City LGA",
    tone: "amber",
  },
  {
    id: "lga",
    label: "Local government",
    value: "Shellharbour",
    note: "City catchment for Albion Park Rail",
    tone: "teal",
  },
  {
    id: "population",
    label: "Population",
    value: "3,824",
    note: "ABS estimate — workshop catchment",
    tone: "amber",
  },
  {
    id: "vehicle-age",
    label: "Avg vehicle age",
    value: "11.4 yrs",
    note: "Higher mufflermen demand than NSW average",
    tone: "green",
  },
  {
    id: "distance",
    label: "From workshop",
    value: "1.6 km",
    note: "Closest catchment to Central Ave",
    tone: "red",
  },
]

export const NEARBY_WORKSHOPS: ReadonlyArray<NearbyWorkshopEntry> = [
  {
    id: "oak-flats",
    name: "Mufflermen Oak Flats",
    suburb: "47 Central Ave, Oak Flats",
    distanceKm: 1.6,
    driveTimeMinutes: 4,
    status: "open",
    statusDetail: "Closes 5:30pm",
    services: ["Catback installs", "Manta parts", "Dyno cell", "TIG welds"],
    x: 48,
    y: 56,
  },
  {
    id: "shellharbour-mobile",
    name: "Mufflermen Mobile Bay",
    suburb: "Shellharbour service truck",
    distanceKm: 6.4,
    driveTimeMinutes: 12,
    status: "closes-soon",
    statusDetail: "Off-bay 5pm",
    services: ["Mobile fitting", "Hanger repairs", "Quick swap"],
    x: 64,
    y: 64,
  },
  {
    id: "wollongong-partner",
    name: "Illawarra Exhaust Partner",
    suburb: "Unanderra workshop",
    distanceKm: 22.8,
    driveTimeMinutes: 26,
    status: "closed",
    statusDetail: "Opens Mon 7:30am",
    services: ["Pipe fabrication", "Stainless welds"],
    x: 30,
    y: 32,
  },
]

export const SURROUNDING_SUBURBS: ReadonlyArray<SurroundingSuburb> = [
  {
    id: "oak-flats",
    name: "Oak Flats",
    distanceKm: 1.6,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "shellharbour",
    name: "Shellharbour",
    distanceKm: 4.2,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "warilla",
    name: "Warilla",
    distanceKm: 5.1,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "dapto",
    name: "Dapto",
    distanceKm: 9.4,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "kiama",
    name: "Kiama",
    distanceKm: 14.6,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "wollongong",
    name: "Wollongong",
    distanceKm: 21.2,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "figtree",
    name: "Figtree",
    distanceKm: 19.6,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "unanderra",
    name: "Unanderra",
    distanceKm: 17.4,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "berkeley",
    name: "Berkeley",
    distanceKm: 13.2,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
  {
    id: "helensburgh",
    name: "Helensburgh",
    distanceKm: 58.4,
    href: "/ui-primitives/locations-pages/full-suburb-page",
  },
]

export const SUBURB_SERVICES: ReadonlyArray<SuburbServiceTile> = [
  {
    id: "muffler-repairs",
    kicker: "Workshop service",
    title: "Muffler repairs",
    description:
      "Repair-first muffler diagnosis for Albion Park Rail commuter cars, HiLux fleet utes, and Caravan tow rigs.",
    localisedChip: "Same-day muffler repair · Albion Park Rail",
    href: "/services/muffler-repairs-replacement",
  },
  {
    id: "custom-exhausts",
    kicker: "Fabrication",
    title: "Custom exhaust systems",
    description:
      "Mandrel-bent stainless cat-backs designed around the Ranger, BT-50, Triton and HiLux fleet at Albion Park Rail.",
    localisedChip: "Stainless catback fit · Albion Park Rail",
    href: "/services/custom-exhaust-systems",
  },
  {
    id: "performance",
    kicker: "Upgrades",
    title: "Performance exhausts",
    description:
      "Sports systems matched to road use — daily-driver tone targets, weekend cars, and dyno-verified upgrades.",
    localisedChip: "Performance install · Albion Park Rail",
    href: "/services/performance-exhausts",
  },
  {
    id: "tig",
    kicker: "Workshop service",
    title: "TIG welding",
    description:
      "Argon-purged TIG fabrication for cracked flanges, broken hangers, and one-off pipework for Patrol and Commodore builds.",
    localisedChip: "TIG repair · Albion Park Rail",
    href: "/services/tig-welding-fabrication",
  },
]

export const SUBURB_FAQ: ReadonlyArray<SuburbFaqItem> = [
  {
    id: "why-us",
    question: "Why do Albion Park Rail drivers book Oak Flats Muffler Men?",
    answer:
      "We're 1.6 km away on Central Ave — the closest mandrel-bend bay in the Shellharbour LGA, with on-the-bay TIG welds and Manta-grade catbacks held in stock for the Ranger, HiLux, BT-50 and Patrol that dominate the local fleet.",
  },
  {
    id: "fit-time",
    question: "How long does a catback fit take on a typical Albion Park Rail ute?",
    answer:
      "Drop the rig at 7:30am, drive it home before knock-off. Stage 1 catbacks fit in around 3 bay-hours; Stage 2 dyno-tuned installs run a half-day with the torque sheet signed on the spot.",
  },
  {
    id: "mobile-vs-workshop",
    question: "Should I drop off or book the mobile bay?",
    answer:
      "Anything that needs the dyno cell, hoist, or multi-bend stainless fabrication runs in the workshop. Mobile fitting suits hanger repairs, quick muffler swaps and bay-side TIG welds at your address — useful when the rig can't move.",
  },
  {
    id: "parking",
    question: "Where do I park around the workshop?",
    answer:
      "The Central Ave shed has six off-street bays, and angle parking runs both sides of the street. Trailers and caravans should call ahead so the team can clear the rear loading lane near the cage.",
  },
]

export const SUBURB_TESTIMONIALS: ReadonlyArray<SuburbTestimonialProps> = [
  {
    customerName: "Dale Munro",
    suburbName: "Albion Park Rail",
    vehicle: "Ford Ranger XLT (PX III)",
    quote:
      "Catback fitted before lunch. Sounds factory at idle, deep on boost. Joints look like jewellery. Lifetime crack guarantee on every Mufflermen weld.",
    rating: 5,
    source: "Google",
  },
  {
    customerName: "Sue Hennessey",
    suburbName: "Albion Park Rail",
    vehicle: "Iveco Daily caravan tow",
    quote:
      "Took our caravan tow rig in for a noise check. Found the cracked flange, rewelded under TIG, and didn't pad the bill.",
    rating: 5,
    source: "Facebook",
  },
  {
    customerName: "Brent Sialana",
    suburbName: "Albion Park Rail",
    vehicle: "Mitsubishi Triton GLS",
    quote:
      "Quoted Monday. Booked Wednesday. Done by Friday. Honest pricing, no padded labour. Best stainless on the South Coast.",
    rating: 5,
    source: "Google",
  },
]
