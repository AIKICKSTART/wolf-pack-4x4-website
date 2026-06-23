/**
 * Mock data for the bay-display routes — Albion Park, Lake Illawarra,
 * Oak Flats Mufflermen. Server-safe (no Date.now mutations at module scope).
 */

import type {
  CommunityItem,
  DynoResultEntry,
  FuelPriceRow,
  MenuBoardService,
  NowServingJob,
  SafetyMessage,
  SocialPost,
  VehicleQueueEntry,
} from "../components/bay-display"

export const BAY_SUMMARY_VEHICLE = "Hilux N80 GUN126R · BTR-882"
export const BAY_SUMMARY_CUSTOMER = "Aleksic"
export const BAY_SUMMARY_MECHANIC = "Jordan Pace"
export const BAY_SUMMARY_ETA = "12:40 pm"

export const QUEUE_ROWS: ReadonlyArray<VehicleQueueEntry> = [
  {
    id: "q-1",
    position: "next",
    vehicle: "Ranger PX3 3.2L · DTU-209",
    customer: "Cardona",
    bookedAt: "11:45 am",
    bay: "bay-1",
    arrived: true,
    waitedMinutes: 8,
  },
  {
    id: "q-2",
    position: "soon",
    vehicle: "Land Cruiser 79 V8 · BGS-704",
    customer: "Hennelly",
    bookedAt: "12:15 pm",
    bay: "bay-1",
  },
  {
    id: "q-3",
    position: "soon",
    vehicle: "BT-50 UR · KLB-118",
    customer: "Petrovski",
    bookedAt: "12:45 pm",
  },
  {
    id: "q-4",
    position: "later",
    vehicle: "VE Commodore SS · CTU-491",
    customer: "Rakuljic",
    bookedAt: "1:30 pm",
    bay: "bay-4",
  },
]

export const SERVING_JOBS: ReadonlyArray<NowServingJob> = [
  {
    id: "j-1",
    bay: "bay-2",
    vehicle: "Hilux N80 · Manta cat-back",
    status: "in-bay",
  },
  {
    id: "j-2",
    bay: "bay-3",
    vehicle: "Patrol Y62 · dyno tune",
    status: "dyno",
  },
  {
    id: "j-3",
    bay: "bay-4",
    vehicle: "VE Commodore SS · ignition diag",
    status: "diagnostic",
  },
  {
    id: "j-4",
    bay: "bay-1",
    vehicle: "Hilux N70 · ready for pickup",
    status: "ready",
  },
]

export const FUEL_ROWS: ReadonlyArray<FuelPriceRow> = [
  {
    id: "f-1",
    station: "Albion Park Shell",
    grade: "U91",
    perLitre: 1.96,
    trend: "up",
  },
  {
    id: "f-2",
    station: "Wollongong Coles Express",
    grade: "U95",
    perLitre: 2.08,
    trend: "flat",
  },
  {
    id: "f-3",
    station: "Lake Illawarra 7-Eleven",
    grade: "U98",
    perLitre: 2.22,
    trend: "down",
  },
  {
    id: "f-4",
    station: "Oak Flats BP",
    grade: "Diesel",
    perLitre: 2.04,
    trend: "up",
  },
]

export const COMMUNITY_ITEMS: ReadonlyArray<CommunityItem> = [
  {
    id: "c-1",
    kind: "footy",
    headline: "Steelers 24 — Knights 12 (HT)",
    detail: "Try to Latrell, conversion good",
  },
  {
    id: "c-2",
    kind: "event",
    headline: "Albion Park Farmers Market — Sat 7am",
    detail: "Behind the Showground hall",
  },
  {
    id: "c-3",
    kind: "notice",
    headline: "Princes Hwy closed Shellharbour exit Sun 5am–9am",
  },
  {
    id: "c-4",
    kind: "footy",
    headline: "Mufflermen FC v Warilla — Sun 11am",
  },
]

export const MENU_SERVICES: ReadonlyArray<MenuBoardService> = [
  {
    id: "m-1",
    name: "Cat-back system fit",
    detail: "Manta · XForce · Wigwam — 2.5 in or 3 in",
    fromPrice: 1850,
    feature: true,
  },
  {
    id: "m-2",
    name: "Pacemaker headers + Y-pipe",
    detail: "Hilux N70/N80, Patrol Y62, Land Cruiser 79",
    fromPrice: 2640,
  },
  {
    id: "m-3",
    name: "Dyno tune (3-run)",
    detail: "Power + torque + AFR fingerprint",
    fromPrice: 980,
    feature: true,
  },
  {
    id: "m-4",
    name: "DPF clean + recoat",
    detail: "Includes back-pressure check",
    fromPrice: 720,
  },
  {
    id: "m-5",
    name: "Custom turbo-back fab",
    fromPrice: 0,
  },
  {
    id: "m-6",
    name: "Hilux 3-inch lift kit fit",
    detail: "Includes wheel alignment",
    fromPrice: 1480,
  },
]

export const SAFETY_MESSAGES: ReadonlyArray<SafetyMessage> = [
  {
    id: "s-1",
    tone: "danger",
    headline: "No entry without escort",
    body: "Workshop floor is restricted past the yellow line — please wait at the counter.",
  },
  {
    id: "s-2",
    tone: "caution",
    headline: "Hot exhaust — give it 20 minutes",
    body: "Recently-fitted systems can run 200°C+ — admire from outside the bay.",
  },
  {
    id: "s-3",
    tone: "info",
    headline: "PPE required past this point",
    body: "Closed shoes and safety glasses inside the workshop bays.",
  },
]

export const DYNO_RESULTS: ReadonlyArray<DynoResultEntry> = [
  {
    id: "d-1",
    vehicle: "Patrol Y62 · McKinnon",
    peakKw: 272,
    peakNm: 528,
    customer: "McKinnon",
    baselineKw: 234,
  },
  {
    id: "d-2",
    vehicle: "Ranger PX3 3.2L · Cardona",
    peakKw: 178,
    peakNm: 502,
    customer: "Cardona",
    baselineKw: 154,
  },
  {
    id: "d-3",
    vehicle: "VE SS V8 · Rakuljic",
    peakKw: 296,
    peakNm: 558,
    customer: "Rakuljic",
    baselineKw: 258,
  },
]

export const SOCIAL_POSTS: ReadonlyArray<SocialPost> = [
  {
    id: "p-1",
    platform: "instagram",
    handle: "oakflats.mufflermen",
    imageSrc:
      "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=600&q=70",
    imageAlt: "Hilux on the hoist with new cat-back fitted",
    caption: "Hilux N80 — Manta 3-inch — sleeper deluxe",
    likes: 184,
    comments: 12,
  },
  {
    id: "p-2",
    platform: "instagram",
    handle: "oakflats.mufflermen",
    imageSrc:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=70",
    imageAlt: "Dyno cell with car strapped down",
    caption: "Patrol Y62 — 272kW at the wheels, brutal",
    likes: 312,
    comments: 28,
  },
  {
    id: "p-3",
    platform: "facebook",
    handle: "oakflatsmufflermen",
    imageSrc:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=70",
    imageAlt: "Workshop crew portrait",
    caption: "Big week from the crew — cheers Sophie & Jordan",
    likes: 96,
    comments: 7,
  },
  {
    id: "p-4",
    platform: "tiktok",
    handle: "oakflats.mufflermen",
    imageSrc:
      "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=70",
    imageAlt: "Exhaust flame video thumbnail",
    caption: "VE SS — flames on overrun, sorry neighbours",
    likes: 528,
    comments: 41,
  },
]
