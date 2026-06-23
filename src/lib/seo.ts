import type { MetadataRoute } from "next"

import { generatedRadiusLocations } from "@/lib/generated-radius-locations"
import { siteImages } from "@/lib/site-assets"
import { business, faqs, galleryImages, services, siteUrl } from "@/lib/site-data"

export const seoLastModified = new Date("2026-06-10")
// Conversion + primary navigation pages get an explicit, fresher lastmod so the
// sitemap signals their priority distinctly rather than one uniform timestamp.
export const navLastModified = new Date("2026-06-10")

export type ServicePage = {
  slug: string
  title: string
  shortTitle: string
  serviceType: string
  metaTitle: string
  metaDescription: string
  h1: string
  lede: string
  proof: string[]
  includes: string[]
  faq: Array<{ question: string; answer: string }>
  related: string[]
}

export type LocationPage = {
  slug: string
  name: string
  officialSlug?: string
  region: string
  priority: "primary" | "secondary" | "support"
  localIntent: string
  nearby: string[]
  distanceKm?: number
  nearestBoundaryDistanceKm?: number
  source?: "curated" | "official-radius"
}

export type AreaPage = {
  slug: string
  name: string
  title: string
  metaTitle: string
  description: string
  region: string
  locationSlugs: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: "suspension-lift-kits",
    title: "Suspension and lift kits",
    shortTitle: "Suspension upgrades",
    serviceType: "4x4 suspension upgrade",
    metaTitle: "4x4 Suspension and Lift Kits Illawarra",
    metaDescription:
      "4x4 suspension upgrades, lift kits, shocks and spring packages for touring, towing and work utes across the Illawarra.",
    h1: "4x4 suspension and lift kits for Illawarra rigs",
    lede:
      "A lift kit only works when it suits the vehicle, load and tyre plan. Wolfpack 4x4 checks how the ute or wagon is used, what it carries, what it tows and how much clearance you actually need before parts are selected. The goal is a setup that sits right, rides properly and does not make the next upgrade harder.",
    proof: [
      "Suspension selected around touring, towing and work use",
      "Lift, shock and spring choices checked before parts are ordered",
      "Fitment advice from the Albion Park Rail workshop",
    ],
    includes: [
      "Lift kit and suspension package planning",
      "Shocks, springs and load-support options",
      "Clearance checks for tyres, trays, canopies and accessories",
      "Road manners and practical ride height advice",
    ],
    faq: [
      {
        question: "What size lift should I choose?",
        answer:
          "Start with how the vehicle is used. Touring weight, towing, tyre size, bull bar weight and daily driving all affect the right lift height and spring rate.",
      },
      {
        question: "Can suspension be planned before other accessories?",
        answer:
          "Yes. It should be. Bull bars, canopies, drawers, tanks and towing gear change the final weight, so the suspension plan should allow for them.",
      },
    ],
    related: ["towing-gvm-upgrades", "bull-bars-protection"],
  },
  {
    slug: "bull-bars-protection",
    title: "Bull bars and vehicle protection",
    shortTitle: "Bull bars",
    serviceType: "4x4 protection fitment",
    metaTitle: "Bull Bars and 4x4 Protection Illawarra",
    metaDescription:
      "Bull bars, side steps, bash plates, underbody protection and front-end accessories for Illawarra 4WDs and utes.",
    h1: "Bull bars and 4x4 protection fitted locally",
    lede:
      "Protection gear changes the front weight, approach angle, lighting options and recovery setup. Wolfpack 4x4 helps choose bull bars, steps, plates and protection accessories that suit the vehicle instead of just filling a catalogue cart. Bring the vehicle details and intended use, and the team will work through what fits cleanly.",
    proof: [
      "Protection planned with suspension, lighting and recovery in mind",
      "Fitment checked around sensors, trims and factory equipment",
      "Useful advice before committing to heavy accessories",
    ],
    includes: [
      "Bull bar and nudge bar planning",
      "Side steps, rails and underbody protection",
      "Front-end accessory and sensor fitment checks",
      "Accessory weight planning for suspension upgrades",
    ],
    faq: [
      {
        question: "Will a bull bar affect suspension choice?",
        answer:
          "Yes. Front-end weight matters. If a bull bar, winch and lights are planned, suspension should be selected with that final weight in mind.",
      },
      {
        question: "Can protection and lighting be planned together?",
        answer:
          "Yes. Bar choice affects mounting points, wiring paths and light position, so it is better to plan the front-end package together.",
      },
    ],
    related: ["winches-recovery-gear", "4x4-lighting-electrical"],
  },
  {
    slug: "winches-recovery-gear",
    title: "Winches and recovery gear",
    shortTitle: "Winches and recovery",
    serviceType: "4x4 recovery setup",
    metaTitle: "Winches and Recovery Gear Illawarra",
    metaDescription:
      "Winches, recovery points, straps, boards and recovery accessories for touring 4WDs, work utes and weekend tracks.",
    h1: "Winches and recovery gear for 4x4 confidence",
    lede:
      "Recovery gear is not just a winch on a bar. The mounting, recovery points, electrical load, line choice and the way the vehicle will be used all matter. Wolfpack 4x4 helps line up winches, points and recovery gear so the setup is practical before you need it on a track.",
    proof: [
      "Winch planning around bar compatibility and electrical load",
      "Recovery points and accessories matched to vehicle use",
      "Advice for beach, trail, touring and work-site recovery",
    ],
    includes: [
      "Winch and recovery point planning",
      "Recovery boards, straps and accessory advice",
      "Electrical support checks for winch installs",
      "Touring recovery kit recommendations",
    ],
    faq: [
      {
        question: "Do I need a winch for touring?",
        answer:
          "Not always, but serious touring needs a recovery plan. The right answer depends on where you drive, who you travel with and what recovery points are already fitted.",
      },
      {
        question: "Can a winch be added later?",
        answer:
          "Usually, yes. If a winch is likely later, choose a compatible bar and allow for the weight and electrical needs now.",
      },
    ],
    related: ["bull-bars-protection", "dual-battery-systems"],
  },
  {
    slug: "4x4-lighting-electrical",
    title: "4x4 lighting and electrical",
    shortTitle: "4x4 lighting",
    serviceType: "4x4 lighting and electrical upgrade",
    metaTitle: "4x4 Lighting and Electrical Illawarra",
    metaDescription:
      "Driving lights, light bars, switch gear, wiring support and touring electrical upgrades for 4WDs and utes.",
    h1: "4x4 lighting and electrical upgrades",
    lede:
      "Good lighting makes night driving safer, but poor placement, weak wiring and messy switching ruin the setup. Wolfpack 4x4 plans driving lights, light bars, work lights and electrical accessories around the vehicle, the bar work and the way you travel.",
    proof: [
      "Lighting chosen around road, trail and work use",
      "Switching, wiring paths and mounting points considered before fitment",
      "Pairs cleanly with bull bars, racks and dual battery setups",
    ],
    includes: [
      "Driving lights, light bars and work lights",
      "Switch and wiring support",
      "Accessory power planning",
      "Fitment advice for bars, racks and canopies",
    ],
    faq: [
      {
        question: "Should lights be planned with the bull bar?",
        answer:
          "Yes. Mounting points, beam position and wiring are easier to get right when the front-end package is planned together.",
      },
      {
        question: "Can lighting be added to racks or canopies?",
        answer:
          "Yes. Work lights, camp lights and rear-facing lighting should be planned with switching and cable routes before the accessory is fitted.",
      },
    ],
    related: ["bull-bars-protection", "dual-battery-systems"],
  },
  {
    slug: "dual-battery-systems",
    title: "Dual battery systems",
    shortTitle: "Dual batteries",
    serviceType: "4x4 touring power setup",
    metaTitle: "Dual Battery Systems Illawarra 4x4",
    metaDescription:
      "Dual battery planning, touring power support, fridge power, accessory power and electrical upgrade advice for 4WDs.",
    h1: "Dual battery and touring power support",
    lede:
      "Fridges, lights, chargers, winches and camp gear need a power plan before accessories pile up. Wolfpack 4x4 helps scope dual battery systems, power management and accessory wiring around how long you travel, what you run and where the vehicle has space.",
    proof: [
      "Touring power planned around real accessory loads",
      "Battery, fridge and camp-light needs scoped before parts are ordered",
      "Designed to support staged upgrades",
    ],
    includes: [
      "Dual battery and charging advice",
      "Fridge, lighting and accessory power planning",
      "Canopy, tray and interior power considerations",
      "Winch and high-load accessory planning",
    ],
    faq: [
      {
        question: "Do I need a dual battery system?",
        answer:
          "If you run a fridge, camp lights, chargers or accessories away from mains power, a second battery or power system is usually worth planning.",
      },
      {
        question: "Should power be planned before a canopy fitout?",
        answer:
          "Yes. Canopies and drawers can hide or complicate cable routes, so power planning should happen before the fitout is locked in.",
      },
    ],
    related: ["canopies-roof-racks-storage", "4x4-lighting-electrical"],
  },
  {
    slug: "canopies-roof-racks-storage",
    title: "Canopies, roof racks and storage",
    shortTitle: "Canopies and racks",
    serviceType: "4x4 touring storage setup",
    metaTitle: "Canopies Roof Racks and Storage Illawarra",
    metaDescription:
      "Canopies, roof racks, drawer systems and 4x4 storage accessories planned for touring, work utes and family travel.",
    h1: "Canopies, racks and storage for touring builds",
    lede:
      "Storage gear should make the vehicle easier to live with, not heavier and harder to use. Wolfpack 4x4 plans canopies, racks, drawers and storage accessories around payload, access, lighting, power and how the vehicle is packed for work or touring.",
    proof: [
      "Storage planning around payload and real access needs",
      "Racks, canopies, drawers and electrical paths considered together",
      "Better staging for touring and work-ute builds",
    ],
    includes: [
      "Canopy, tray and roof rack planning",
      "Drawer and storage accessory advice",
      "Payload and access checks",
      "Power and lighting considerations for fitouts",
    ],
    faq: [
      {
        question: "Will storage accessories affect payload?",
        answer:
          "Yes. Racks, canopies, drawers, tanks and tools add weight quickly. Payload should be checked before the build grows too heavy.",
      },
      {
        question: "Can racks and lighting be planned together?",
        answer:
          "Yes. Roof and canopy lighting should be planned with cable routes, switching and the rack or canopy layout.",
      },
    ],
    related: ["dual-battery-systems", "towing-gvm-upgrades"],
  },
  {
    slug: "towing-gvm-upgrades",
    title: "Towing and GVM upgrade support",
    shortTitle: "Towing and GVM",
    serviceType: "4x4 towing and load support",
    metaTitle: "Towing and GVM Upgrade Support Illawarra",
    metaDescription:
      "Towing, load support, towbar, wiring and GVM upgrade planning for 4WDs, work utes, caravans and touring vehicles.",
    h1: "Towing and GVM support for 4x4 builds",
    lede:
      "Towing changes the whole vehicle. Suspension, payload, wiring, braking, accessories and weight all need to make sense together. Wolfpack 4x4 helps plan towing and GVM-related upgrades so the vehicle is built around the load it actually carries.",
    proof: [
      "Towing advice tied to suspension and accessory weight",
      "Towbar, wiring and load-support needs checked before fitment",
      "Useful for caravans, trailers, work gear and touring loads",
    ],
    includes: [
      "Towbar, wiring and brake support advice",
      "Load-support suspension planning",
      "GVM-related upgrade pathway advice",
      "Touring weight and accessory planning",
    ],
    faq: [
      {
        question: "Should towing be considered before suspension?",
        answer:
          "Yes. Tow ball weight, canopy weight, tools and touring gear all affect spring choice and how the vehicle sits.",
      },
      {
        question: "Can Wolfpack help stage a towing setup?",
        answer:
          "Yes. Bring the vehicle details and towing target, and the team can map the practical first steps before parts are ordered.",
      },
    ],
    related: ["suspension-lift-kits", "canopies-roof-racks-storage"],
  },
  {
    slug: "performance-4x4-upgrades",
    title: "Performance 4x4 upgrades",
    shortTitle: "Performance 4x4",
    serviceType: "4x4 performance upgrade",
    metaTitle: "Performance 4x4 Upgrades Illawarra",
    metaDescription:
      "Performance 4x4 upgrades, intake support, engine-bay accessories and drivability advice for utes and touring 4WDs.",
    h1: "Performance 4x4 upgrades for stronger drivability",
    lede:
      "A useful 4x4 performance upgrade is about drivability, towing response and confidence, not just a bigger number. Wolfpack 4x4 helps plan intake support, engine-bay accessories and supporting parts around the vehicle and the way it is used.",
    proof: [
      "Performance advice focused on drivability and use case",
      "Intake and engine-bay accessories checked before ordering",
      "Can be staged with suspension, towing and touring gear",
    ],
    includes: [
      "Intake and engine-bay support accessories",
      "Drivability and towing response planning",
      "Supporting parts and fitment checks",
      "Staged performance upgrade advice",
    ],
    faq: [
      {
        question: "Are performance upgrades useful for towing?",
        answer:
          "They can be, but the right upgrade depends on the engine, load and current setup. The team will tell you when suspension or cooling support should come first.",
      },
      {
        question: "Can performance work be staged?",
        answer:
          "Yes. A sensible plan avoids buying parts twice and keeps the vehicle reliable for daily, touring and towing use.",
      },
    ],
    related: ["dual-battery-systems", "suspension-lift-kits"],
  },
  {
    slug: "4x4-parts-accessories",
    title: "4x4 parts and accessories",
    shortTitle: "4x4 parts",
    serviceType: "4x4 parts supply and fitment advice",
    metaTitle: "4x4 Parts and Accessories Illawarra",
    metaDescription:
      "4x4 parts, accessories, fitment checks and workshop-supported catalogue advice for suspension, towing, lighting and recovery gear.",
    h1: "4x4 parts and accessories with fitment advice",
    lede:
      "Parts only help when they fit the vehicle and the build plan. Wolfpack 4x4 keeps the public catalogue focused on non-muffler 4x4 categories such as suspension, towing, lighting, recovery, storage and engine-bay support gear, with workshop advice before ordering.",
    proof: [
      "Catalogue focus kept to 4x4 and accessory categories",
      "Fitment checked before parts are ordered where needed",
      "Useful for staged builds, repairs and touring upgrades",
    ],
    includes: [
      "Suspension, towing and lighting accessory lookup",
      "Recovery, storage and engine-bay category support",
      "Supplier spec and RRP checks where available",
      "Fitment advice before workshop booking",
    ],
    faq: [
      {
        question: "Will Wolfpack list muffler parts?",
        answer:
          "No. The Wolfpack public catalogue is kept to non-muffler 4x4 categories so it does not dilute the 4x4 upgrade strategy.",
      },
      {
        question: "What details help with a parts enquiry?",
        answer:
          "Send make, model, year, engine, body style, current accessories, intended use and any photos that show the fitment area.",
      },
    ],
    related: ["suspension-lift-kits", "4x4-lighting-electrical"],
  },
]
export const curatedLocations: LocationPage[] = [
  { slug: "oak-flats", name: "Oak Flats", region: "Shellharbour", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park Rail", "Lake Illawarra", "Shellharbour City Centre"] },
  { slug: "albion-park-rail", name: "Albion Park Rail", region: "Shellharbour", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Oak Flats", "Albion Park", "Yallah"] },
  { slug: "shellharbour", name: "Shellharbour", region: "Shellharbour", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Shell Cove", "Warilla", "Blackbutt"] },
  { slug: "wollongong", name: "Wollongong", region: "Wollongong", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["North Wollongong", "West Wollongong", "Coniston"] },
  { slug: "dapto", name: "Dapto", region: "Wollongong South", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Koonawarra", "Horsley", "Kanahooka"] },
  { slug: "warilla", name: "Warilla", region: "Shellharbour", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Lake Illawarra", "Barrack Heights", "Mount Warrigal"] },
  { slug: "corrimal", name: "Corrimal", region: "Wollongong North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["East Corrimal", "Bellambi", "Tarrawanna"] },
  { slug: "woonona", name: "Woonona", region: "Wollongong North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bulli", "Russell Vale", "Bellambi"] },
  { slug: "bulli", name: "Bulli", region: "Wollongong North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Woonona", "Thirroul", "Russell Vale"] },
  { slug: "thirroul", name: "Thirroul", region: "Wollongong North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Austinmer", "Bulli", "Coledale"] },
  { slug: "kiama", name: "Kiama", region: "Kiama", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bombo", "Kiama Downs", "Jamberoo"] },
  { slug: "albion-park", name: "Albion Park", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park Rail", "Calderwood", "Tullimbar"] },
  { slug: "lake-illawarra", name: "Lake Illawarra", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Warilla", "Mount Warrigal", "Oak Flats"] },
  { slug: "mount-warrigal", name: "Mount Warrigal", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Warilla", "Lake Illawarra", "Oak Flats"] },
  { slug: "barrack-heights", name: "Barrack Heights", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Warilla", "Shellharbour", "Blackbutt"] },
  { slug: "barrack-point", name: "Barrack Point", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Warilla", "Shellharbour", "Lake Illawarra"] },
  { slug: "blackbutt", name: "Blackbutt", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Shellharbour", "Flinders", "Shellharbour City Centre"] },
  { slug: "flinders", name: "Flinders", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Blackbutt", "Shell Cove", "Shellharbour"] },
  { slug: "shell-cove", name: "Shell Cove", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Shellharbour", "Flinders", "Dunmore"] },
  { slug: "shellharbour-city-centre", name: "Shellharbour City Centre", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Oak Flats", "Blackbutt", "Albion Park Rail"] },
  { slug: "calderwood", name: "Calderwood", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Tullimbar", "Albion Park Rail"] },
  { slug: "tullimbar", name: "Tullimbar", region: "Shellharbour", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Calderwood", "Yellow Rock"] },
  { slug: "dunmore", name: "Dunmore", region: "Shellharbour", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Shell Cove", "Minnamurra", "Shellharbour"] },
  { slug: "croom", name: "Croom", region: "Shellharbour", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Dunmore", "Tullimbar"] },
  { slug: "yallah", name: "Yallah", region: "Shellharbour", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park Rail", "Haywards Bay", "Dapto"] },
  { slug: "haywards-bay", name: "Haywards Bay", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Yallah", "Dapto", "Oak Flats"] },
  { slug: "yellow-rock", name: "Yellow Rock", region: "Shellharbour", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Tullimbar", "Calderwood"] },
  { slug: "tongarra", name: "Tongarra", region: "Shellharbour", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Yellow Rock", "Tullimbar"] },
  { slug: "north-macquarie", name: "North Macquarie", region: "Shellharbour", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Yellow Rock", "Macquarie Pass"] },
  { slug: "macquarie-pass", name: "Macquarie Pass", region: "Shellharbour", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Yellow Rock", "North Macquarie"] },
  { slug: "north-wollongong", name: "North Wollongong", region: "Wollongong", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Wollongong", "Fairy Meadow", "Gwynneville"] },
  { slug: "west-wollongong", name: "West Wollongong", region: "Wollongong", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Wollongong", "Figtree", "Keiraville"] },
  { slug: "coniston", name: "Coniston", region: "Wollongong", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Wollongong", "Spring Hill", "Port Kembla"] },
  { slug: "figtree", name: "Figtree", region: "Wollongong", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["West Wollongong", "Mount Saint Thomas", "Cordeaux Heights"] },
  { slug: "fairy-meadow", name: "Fairy Meadow", region: "Wollongong North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Towradgi", "North Wollongong", "Balgownie"] },
  { slug: "towradgi", name: "Towradgi", region: "Wollongong North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Fairy Meadow", "East Corrimal", "Corrimal"] },
  { slug: "east-corrimal", name: "East Corrimal", region: "Wollongong North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Corrimal", "Towradgi", "Bellambi"] },
  { slug: "bellambi", name: "Bellambi", region: "Wollongong North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Corrimal", "Woonona", "East Corrimal"] },
  { slug: "russell-vale", name: "Russell Vale", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Woonona", "Bulli", "Bellambi"] },
  { slug: "tarrawanna", name: "Tarrawanna", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Corrimal", "Balgownie", "Fernhill"] },
  { slug: "fernhill", name: "Fernhill", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Balgownie", "Corrimal", "Tarrawanna"] },
  { slug: "balgownie", name: "Balgownie", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Fairy Meadow", "Tarrawanna", "Mount Pleasant"] },
  { slug: "mount-pleasant", name: "Mount Pleasant", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Balgownie", "Mount Ousley", "Keiraville"] },
  { slug: "mount-ousley", name: "Mount Ousley", region: "Wollongong", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Mount Pleasant", "Keiraville", "Fairy Meadow"] },
  { slug: "keiraville", name: "Keiraville", region: "Wollongong", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gwynneville", "Mount Ousley", "West Wollongong"] },
  { slug: "gwynneville", name: "Gwynneville", region: "Wollongong", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["North Wollongong", "Keiraville", "Wollongong"] },
  { slug: "mangerton", name: "Mangerton", region: "Wollongong", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Wollongong", "Mount Saint Thomas", "Figtree"] },
  { slug: "mount-saint-thomas", name: "Mount Saint Thomas", region: "Wollongong", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Figtree", "Mangerton", "Coniston"] },
  { slug: "spring-hill", name: "Spring Hill", region: "Wollongong", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Coniston", "Port Kembla", "Wollongong"] },
  { slug: "port-kembla", name: "Port Kembla", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Warrawong", "Cringila", "Lake Heights"] },
  { slug: "cringila", name: "Cringila", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Port Kembla", "Warrawong", "Lake Heights"] },
  { slug: "warrawong", name: "Warrawong", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Port Kembla", "Lake Heights", "Primbee"] },
  { slug: "lake-heights", name: "Lake Heights", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Warrawong", "Berkeley", "Cringila"] },
  { slug: "berkeley", name: "Berkeley", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Lake Heights", "Unanderra", "Koonawarra"] },
  { slug: "primbee", name: "Primbee", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Warrawong", "Windang", "Port Kembla"] },
  { slug: "windang", name: "Windang", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Primbee", "Warilla", "Lake Illawarra"] },
  { slug: "unanderra", name: "Unanderra", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Figtree", "Berkeley", "Kembla Grange"] },
  { slug: "cordeaux-heights", name: "Cordeaux Heights", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Figtree", "Farmborough Heights", "Unanderra"] },
  { slug: "farmborough-heights", name: "Farmborough Heights", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Cordeaux Heights", "Unanderra", "Kembla Grange"] },
  { slug: "kembla-grange", name: "Kembla Grange", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Dapto", "Unanderra", "Horsley"] },
  { slug: "koonawarra", name: "Koonawarra", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Dapto", "Kanahooka", "Berkeley"] },
  { slug: "kanahooka", name: "Kanahooka", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Koonawarra", "Dapto", "Horsley"] },
  { slug: "horsley", name: "Horsley", region: "Wollongong South", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Dapto", "Kembla Grange", "Wongawilli"] },
  { slug: "wongawilli", name: "Wongawilli", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Horsley", "Dapto", "Kembla Grange"] },
  { slug: "brownsville", name: "Brownsville", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Dapto", "Koonawarra", "Kanahooka"] },
  { slug: "avon", name: "Avon", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Dapto", "Huntley", "Avondale"] },
  { slug: "avondale", name: "Avondale", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Dapto", "Huntley", "Yallah"] },
  { slug: "huntley", name: "Huntley", region: "Wollongong South", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Dapto", "Avondale", "Kembla Grange"] },
  { slug: "austinmer", name: "Austinmer", region: "Wollongong North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Thirroul", "Coledale", "Bulli"] },
  { slug: "coledale", name: "Coledale", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Austinmer", "Wombarra", "Thirroul"] },
  { slug: "wombarra", name: "Wombarra", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Coledale", "Scarborough", "Austinmer"] },
  { slug: "scarborough", name: "Scarborough", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Wombarra", "Clifton", "Coledale"] },
  { slug: "clifton", name: "Clifton", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Scarborough", "Coalcliff", "Stanwell Park"] },
  { slug: "coalcliff", name: "Coalcliff", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Clifton", "Stanwell Park", "Scarborough"] },
  { slug: "stanwell-park", name: "Stanwell Park", region: "Wollongong North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Coalcliff", "Otford", "Helensburgh"] },
  { slug: "stanwell-tops", name: "Stanwell Tops", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Stanwell Park", "Helensburgh", "Otford"] },
  { slug: "helensburgh", name: "Helensburgh", region: "Wollongong North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Stanwell Park", "Otford", "Darkes Forest"] },
  { slug: "otford", name: "Otford", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Helensburgh", "Stanwell Park", "Coalcliff"] },
  { slug: "darkes-forest", name: "Darkes Forest", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Helensburgh", "Maddens Plains", "Stanwell Tops"] },
  { slug: "maddens-plains", name: "Maddens Plains", region: "Wollongong North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Darkes Forest", "Bulli", "Helensburgh"] },
  { slug: "bombo", name: "Bombo", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kiama", "Kiama Downs", "Minnamurra"] },
  { slug: "kiama-downs", name: "Kiama Downs", region: "Kiama", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bombo", "Minnamurra", "Kiama"] },
  { slug: "kiama-heights", name: "Kiama Heights", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kiama", "Gerringong", "Jamberoo"] },
  { slug: "minnamurra", name: "Minnamurra", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kiama Downs", "Bombo", "Dunmore"] },
  { slug: "jamberoo", name: "Jamberoo", region: "Kiama", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kiama", "Jerrara", "Albion Park"] },
  { slug: "jerrara", name: "Jerrara", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kiama", "Jamberoo", "Saddleback Mountain"] },
  { slug: "gerringong", name: "Gerringong", region: "Kiama", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Werri Beach", "Gerroa", "Kiama"] },
  { slug: "gerroa", name: "Gerroa", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gerringong", "Werri Beach", "Kiama"] },
  { slug: "werri-beach", name: "Werri Beach", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gerringong", "Gerroa", "Kiama"] },
  { slug: "foxground", name: "Foxground", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gerringong", "Jamberoo", "Broughton Village"] },
  { slug: "saddleback-mountain", name: "Saddleback Mountain", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kiama", "Jamberoo", "Jerrara"] },
  { slug: "willow-vale", name: "Willow Vale", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gerringong", "Broughton Village", "Foxground"] },
  { slug: "broughton-village", name: "Broughton Village", region: "Kiama", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gerringong", "Foxground", "Willow Vale"] },
  { slug: "berry", name: "Berry", region: "Shoalhaven North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gerringong", "Bomaderry", "Shoalhaven Heads"] },
  { slug: "bomaderry", name: "Bomaderry", region: "Shoalhaven North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Nowra", "North Nowra", "Berry"] },
  { slug: "nowra", name: "Nowra", region: "Shoalhaven North", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bomaderry", "North Nowra", "South Nowra"] },
  { slug: "north-nowra", name: "North Nowra", region: "Shoalhaven North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Nowra", "Bomaderry", "Cambewarra"] },
  { slug: "south-nowra", name: "South Nowra", region: "Shoalhaven North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Nowra", "Worrigee", "East Nowra"] },
  { slug: "east-nowra", name: "East Nowra", region: "Shoalhaven North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Nowra", "Worrigee", "Terara"] },
  { slug: "worrigee", name: "Worrigee", region: "Shoalhaven North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["South Nowra", "East Nowra", "Nowra"] },
  { slug: "terara", name: "Terara", region: "Shoalhaven North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["East Nowra", "Nowra", "Worrigee"] },
  { slug: "cambewarra", name: "Cambewarra", region: "Shoalhaven North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Cambewarra Village", "North Nowra", "Bomaderry"] },
  { slug: "cambewarra-village", name: "Cambewarra Village", region: "Shoalhaven North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Cambewarra", "Bomaderry", "Berry"] },
  { slug: "shoalhaven-heads", name: "Shoalhaven Heads", region: "Shoalhaven North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Berry", "Gerringong", "Culburra Beach"] },
  { slug: "culburra-beach", name: "Culburra Beach", region: "Shoalhaven North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Shoalhaven Heads", "Nowra", "Huskisson"] },
  { slug: "huskisson", name: "Huskisson", region: "Shoalhaven North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Vincentia", "Sanctuary Point", "Nowra"] },
  { slug: "vincentia", name: "Vincentia", region: "Shoalhaven North", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Huskisson", "Sanctuary Point", "Nowra"] },
  { slug: "sanctuary-point", name: "Sanctuary Point", region: "Shoalhaven North", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Vincentia", "Huskisson", "Nowra"] },
  { slug: "bowral", name: "Bowral", region: "Southern Highlands", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Mittagong", "Burradoo", "Moss Vale"] },
  { slug: "mittagong", name: "Mittagong", region: "Southern Highlands", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bowral", "Braemar", "Welby"] },
  { slug: "moss-vale", name: "Moss Vale", region: "Southern Highlands", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bowral", "Burradoo", "Sutton Forest"] },
  { slug: "berrima", name: "Berrima", region: "Southern Highlands", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["New Berrima", "Bowral", "Moss Vale"] },
  { slug: "burradoo", name: "Burradoo", region: "Southern Highlands", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bowral", "Moss Vale", "Mittagong"] },
  { slug: "robertson", name: "Robertson", region: "Southern Highlands", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Albion Park", "Fitzroy Falls", "Bowral"] },
  { slug: "bundanoon", name: "Bundanoon", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Exeter", "Sutton Forest", "Moss Vale"] },
  { slug: "exeter", name: "Exeter", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bundanoon", "Sutton Forest", "Moss Vale"] },
  { slug: "sutton-forest", name: "Sutton Forest", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Moss Vale", "Exeter", "Bundanoon"] },
  { slug: "colo-vale", name: "Colo Vale", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Hill Top", "Yerrinbool", "Mittagong"] },
  { slug: "hill-top", name: "Hill Top", region: "Southern Highlands", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Colo Vale", "Yerrinbool", "Mittagong"] },
  { slug: "yerrinbool", name: "Yerrinbool", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Hill Top", "Colo Vale", "Mittagong"] },
  { slug: "braemar", name: "Braemar", region: "Southern Highlands", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Mittagong", "Welby", "Aylmerton"] },
  { slug: "welby", name: "Welby", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Mittagong", "Braemar", "Bowral"] },
  { slug: "new-berrima", name: "New Berrima", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Berrima", "Mittagong", "Moss Vale"] },
  { slug: "aylmerton", name: "Aylmerton", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Braemar", "Mittagong", "Yerrinbool"] },
  { slug: "fitzroy-falls", name: "Fitzroy Falls", region: "Southern Highlands", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Robertson", "Moss Vale", "Bowral"] },
  { slug: "appin", name: "Appin", region: "Wollondilly", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Wilton", "Douglas Park", "Helensburgh"] },
  { slug: "wilton", name: "Wilton", region: "Wollondilly", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Appin", "Douglas Park", "Picton"] },
  { slug: "picton", name: "Picton", region: "Wollondilly", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Tahmoor", "Wilton", "Thirlmere"] },
  { slug: "tahmoor", name: "Tahmoor", region: "Wollondilly", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Picton", "Bargo", "Thirlmere"] },
  { slug: "bargo", name: "Bargo", region: "Wollondilly", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Tahmoor", "Buxton", "Yerrinbool"] },
  { slug: "buxton", name: "Buxton", region: "Wollondilly", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Bargo", "Thirlmere", "Tahmoor"] },
  { slug: "thirlmere", name: "Thirlmere", region: "Wollondilly", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Picton", "Tahmoor", "Buxton"] },
  { slug: "douglas-park", name: "Douglas Park", region: "Wollondilly", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Wilton", "Appin", "Menangle"] },
  { slug: "menangle", name: "Menangle", region: "Wollondilly", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Douglas Park", "Campbelltown", "Picton"] },
  { slug: "the-oaks", name: "The Oaks", region: "Wollondilly", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Oakdale", "Picton", "Thirlmere"] },
  { slug: "oakdale", name: "Oakdale", region: "Wollondilly", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["The Oaks", "Picton", "Tahmoor"] },
  { slug: "campbelltown", name: "Campbelltown", region: "Macarthur", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Macarthur", "Leumeah", "Bradbury"] },
  { slug: "macarthur", name: "Macarthur", region: "Macarthur", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Campbelltown", "Ambarvale", "Glen Alpine"] },
  { slug: "ingleburn", name: "Ingleburn", region: "Macarthur", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Minto", "Macquarie Fields", "Glenfield"] },
  { slug: "minto", name: "Minto", region: "Macarthur", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Ingleburn", "Leumeah", "Campbelltown"] },
  { slug: "leumeah", name: "Leumeah", region: "Macarthur", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Campbelltown", "Minto", "Ruse"] },
  { slug: "glenfield", name: "Glenfield", region: "Macarthur", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Macquarie Fields", "Ingleburn", "Minto"] },
  { slug: "macquarie-fields", name: "Macquarie Fields", region: "Macarthur", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Glenfield", "Ingleburn", "Minto"] },
  { slug: "eagle-vale", name: "Eagle Vale", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Minto", "Ambarvale", "St Helens Park"] },
  { slug: "rosemeadow", name: "Rosemeadow", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Ambarvale", "St Helens Park", "Campbelltown"] },
  { slug: "ambarvale", name: "Ambarvale", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Macarthur", "Rosemeadow", "Eagle Vale"] },
  { slug: "bradbury", name: "Bradbury", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Campbelltown", "Ruse", "Glen Alpine"] },
  { slug: "glen-alpine", name: "Glen Alpine", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Macarthur", "Bradbury", "Campbelltown"] },
  { slug: "ruse", name: "Ruse", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Leumeah", "Bradbury", "Campbelltown"] },
  { slug: "blair-athol", name: "Blair Athol", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Campbelltown", "Leumeah", "Minto"] },
  { slug: "st-helens-park", name: "St Helens Park", region: "Macarthur", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Rosemeadow", "Eagle Vale", "Campbelltown"] },
  { slug: "sutherland", name: "Sutherland", region: "Sutherland Shire", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kirrawee", "Loftus", "Jannali"] },
  { slug: "engadine", name: "Engadine", region: "Sutherland Shire", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Heathcote", "Yarrawarrah", "Waterfall"] },
  { slug: "heathcote", name: "Heathcote", region: "Sutherland Shire", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Engadine", "Waterfall", "Sutherland"] },
  { slug: "waterfall", name: "Waterfall", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Heathcote", "Engadine", "Helensburgh"] },
  { slug: "miranda", name: "Miranda", region: "Sutherland Shire", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Gymea", "Caringbah", "Sylvania"] },
  { slug: "cronulla", name: "Cronulla", region: "Sutherland Shire", priority: "primary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Woolooware", "Caringbah", "Bundeena"] },
  { slug: "sylvania", name: "Sylvania", region: "Sutherland Shire", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Miranda", "Taren Point", "Sutherland"] },
  { slug: "kirrawee", name: "Kirrawee", region: "Sutherland Shire", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Sutherland", "Gymea", "Jannali"] },
  { slug: "gymea", name: "Gymea", region: "Sutherland Shire", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Kirrawee", "Miranda", "Jannali"] },
  { slug: "caringbah", name: "Caringbah", region: "Sutherland Shire", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Miranda", "Cronulla", "Taren Point"] },
  { slug: "menai", name: "Menai", region: "Sutherland Shire", priority: "secondary", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Illawong", "Como", "Sutherland"] },
  { slug: "loftus", name: "Loftus", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Sutherland", "Engadine", "Heathcote"] },
  { slug: "woolooware", name: "Woolooware", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Cronulla", "Caringbah", "Miranda"] },
  { slug: "taren-point", name: "Taren Point", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Caringbah", "Miranda", "Sylvania"] },
  { slug: "jannali", name: "Jannali", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Como", "Sutherland", "Kirrawee"] },
  { slug: "como", name: "Como", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Jannali", "Sutherland", "Illawong"] },
  { slug: "illawong", name: "Illawong", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Menai", "Como", "Sutherland"] },
  { slug: "yarrawarrah", name: "Yarrawarrah", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Engadine", "Heathcote", "Waterfall"] },
  { slug: "bundeena", name: "Bundeena", region: "Sutherland Shire", priority: "support", localIntent: "drivers planning suspension, protection, lighting, recovery, towing and touring 4x4 upgrades through Wolfpack 4x4", nearby: ["Cronulla", "Woolooware", "Caringbah"] },
]

export const locations: LocationPage[] = [...curatedLocations, ...generatedRadiusLocations]

const illawarraRegions = new Set([
  "Shellharbour",
  "Wollongong",
  "Wollongong North",
  "Wollongong South",
  "Kiama",
])

export const areaPages: AreaPage[] = [
  {
    slug: "illawarra",
    name: "Illawarra",
    title: "4x4 upgrades across the Illawarra",
    metaTitle: "4x4 Upgrades Illawarra",
    description:
      "Wolfpack 4x4 supports drivers across Wollongong, Shellharbour, Kiama and the wider Illawarra for suspension, bull bars, recovery, lighting, towing and touring accessories.",
    region: "Illawarra",
    locationSlugs: locations
      .filter((location) => illawarraRegions.has(location.region))
      .map((location) => location.slug),
  },
  {
    slug: "wollongong",
    name: "Wollongong",
    title: "4x4 upgrades for Wollongong",
    metaTitle: "4x4 Upgrades Wollongong",
    description:
      "Service pages for Wollongong, Dapto, Port Kembla, Corrimal, Figtree and surrounding suburbs planning 4x4 upgrades through Albion Park Rail.",
    region: "Wollongong",
    locationSlugs: locations
      .filter((location) => location.region.startsWith("Wollongong"))
      .map((location) => location.slug),
  },
  {
    slug: "wollongong-northern-suburbs",
    name: "Wollongong northern suburbs",
    title: "4x4 workshop for Wollongong northern suburbs",
    metaTitle: "4x4 Workshop Wollongong North",
    description:
      "Coverage for Corrimal, Woonona, Bulli, Thirroul, Austinmer, Helensburgh and northern coastal suburbs needing 4x4 parts and upgrade advice.",
    region: "Wollongong North",
    locationSlugs: locations
      .filter((location) => location.region === "Wollongong North")
      .map((location) => location.slug),
  },
  {
    slug: "wollongong-southern-suburbs",
    name: "Wollongong southern suburbs",
    title: "4x4 upgrades for Wollongong southern suburbs",
    metaTitle: "4x4 Upgrades Wollongong South",
    description:
      "Coverage for Dapto, Unanderra, Port Kembla, Warrawong, Berkeley, Figtree and nearby southern Wollongong suburbs travelling to Albion Park Rail.",
    region: "Wollongong South",
    locationSlugs: locations
      .filter((location) => location.region === "Wollongong South")
      .map((location) => location.slug),
  },
  {
    slug: "shellharbour",
    name: "Shellharbour",
    title: "4x4 upgrades near Shellharbour",
    metaTitle: "4x4 Upgrades Shellharbour",
    description:
      "Coverage for Oak Flats, Albion Park Rail, Warilla, Shellharbour, Shell Cove, Albion Park and nearby suburbs needing suspension, protection, recovery and lighting support.",
    region: "Shellharbour",
    locationSlugs: locations
      .filter((location) => location.region === "Shellharbour")
      .map((location) => location.slug),
  },
  {
    slug: "kiama",
    name: "Kiama",
    title: "4x4 touring and accessory upgrades for Kiama drivers",
    metaTitle: "4x4 Upgrades Kiama",
    description:
      "Coverage for Kiama, Bombo, Kiama Downs, Jamberoo, Gerringong, Gerroa and surrounding Kiama localities planning touring or towing 4x4 upgrades.",
    region: "Kiama",
    locationSlugs: locations
      .filter((location) => location.region === "Kiama")
      .map((location) => location.slug),
  },
  {
    slug: "hundred-km-service-radius",
    name: "100 km priority service footprint",
    title: "Priority 4x4 service areas within 100 km of Albion Park Rail",
    metaTitle: "4x4 Service Areas Within 100 km",
    description:
      "A priority service-area hub for drivers travelling to Wolfpack 4x4 from the Illawarra, Shoalhaven, Southern Highlands, Macarthur, Wollondilly and the Sutherland Shire.",
    region: "100 km radius",
    locationSlugs: locations.map((location) => location.slug),
  },
  {
    slug: "shoalhaven-north",
    name: "Shoalhaven North",
    title: "4x4 upgrades for North Shoalhaven drivers",
    metaTitle: "4x4 Upgrades North Shoalhaven",
    description:
      "Coverage for Berry, Bomaderry, Nowra, Shoalhaven Heads, Culburra Beach, Huskisson, Vincentia and nearby Shoalhaven localities planning 4x4 work at Albion Park Rail.",
    region: "Shoalhaven North",
    locationSlugs: locations
      .filter((location) => location.region === "Shoalhaven North")
      .map((location) => location.slug),
  },
  {
    slug: "southern-highlands",
    name: "Southern Highlands",
    title: "4x4 towing and touring upgrades for Southern Highlands drivers",
    metaTitle: "4x4 Upgrades Southern Highlands NSW",
    description:
      "Coverage for Bowral, Mittagong, Moss Vale, Berrima, Robertson and nearby Southern Highlands towns looking for 4x4 towing, touring and accessory advice.",
    region: "Southern Highlands",
    locationSlugs: locations
      .filter((location) => location.region === "Southern Highlands")
      .map((location) => location.slug),
  },
  {
    slug: "macarthur-wollondilly",
    name: "Macarthur and Wollondilly",
    title: "4x4 towing and touring upgrades for Macarthur and Wollondilly",
    metaTitle: "4x4 Upgrades Macarthur & Wollondilly",
    description:
      "Coverage for Appin, Wilton, Picton, Campbelltown, Ingleburn, Minto and nearby south-west corridor suburbs needing 4x4 parts or upgrade advice.",
    region: "Macarthur and Wollondilly",
    locationSlugs: locations
      .filter((location) => ["Macarthur", "Wollondilly"].includes(location.region))
      .map((location) => location.slug),
  },
  {
    slug: "sutherland-shire",
    name: "Sutherland Shire",
    title: "4x4 upgrades for Sutherland Shire drivers",
    metaTitle: "4x4 Upgrades Sutherland Shire",
    description:
      "Coverage for Sutherland, Engadine, Miranda, Cronulla, Caringbah, Kirrawee and nearby Shire suburbs comparing 4x4 upgrade and parts options.",
    region: "Sutherland Shire",
    locationSlugs: locations
      .filter((location) => location.region === "Sutherland Shire")
      .map((location) => location.slug),
  },
]

export function absoluteUrl(path = "/") {
  if (path === "/") return siteUrl
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

export function getService(slug: string) {
  return servicePages.find((service) => service.slug === slug)
}

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug)
}

export function getArea(slug: string) {
  return areaPages.find((area) => area.slug === slug)
}

type RegionSeoContext = {
  routeCue: string
  vehicleMix: string
  jobPattern: string
  bookingAdvice: string
  // The actual road in to the Albion Park Rail workshop, phrased to follow
  // "the trip in is ..." or "make the trip ...". Omitted for the official
  // radius bands, which carry per-location distanceKm instead.
  roadIn?: string
}

const regionSeoContexts: Record<string, RegionSeoContext> = {
  Shellharbour: {
    routeCue: "short local runs around Lake Illawarra, Shellharbour Road and the Albion Park Rail workshop",
    roadIn: "a short run via the Princes Highway",
    vehicleMix: "4x4 utes, touring wagons, work rigs, family tow vehicles and weekend trail builds",
    jobPattern: "suspension planning, bull bars, recovery gear, lighting, towing support and touring accessories",
    bookingAdvice: "Call ahead so the team can line up bay time and confirm which accessories should be fitted first.",
  },
  Wollongong: {
    routeCue: "city, university, hospital and industrial traffic moving between Wollongong and Albion Park Rail",
    roadIn: "south down the M1 Princes Motorway",
    vehicleMix: "trade utes, dual-cabs, touring 4WDs, tow vehicles and weekend rigs",
    jobPattern: "lift kits, bar work, winches, driving lights, dual battery support and staged accessory planning",
    bookingAdvice: "Send photos before travelling so the workshop can advise whether the job is a parts quote, inspection or booked fitment slot.",
  },
  "Wollongong North": {
    routeCue: "Princes Highway and coastal northern-suburbs travel from Corrimal, Woonona, Bulli and Helensburgh",
    roadIn: "down the M1 Princes Motorway from the northern suburbs",
    vehicleMix: "coastal 4WDs, touring vehicles, work utes, roof-rack setups and towing builds",
    jobPattern: "suspension lifts, roof racks, recovery gear, lighting, battery support and touring storage",
    bookingAdvice: "Book before driving south so parts, bay time and fitment requirements can be checked before the vehicle arrives.",
  },
  "Wollongong South": {
    routeCue: "southern Wollongong, Port Kembla, Dapto and Unanderra travel toward Albion Park Rail",
    roadIn: "down the Princes Highway through Dapto",
    vehicleMix: "industrial utes, work 4x4s, tow vehicles, family rigs and touring wagons",
    jobPattern: "load-support suspension, towing accessories, bull bars, lighting, recovery and storage fitouts",
    bookingAdvice: "Call with the vehicle specs, current accessories and intended use so the team can triage the right upgrade path.",
  },
  Kiama: {
    routeCue: "coastal and highway travel from Kiama, Gerringong, Jamberoo and nearby villages",
    roadIn: "north up the Princes Highway past Dunmore",
    vehicleMix: "coastal 4WDs, touring utes, tow vehicles, beach rigs and family wagons",
    jobPattern: "touring suspension, recovery gear, roof racks, driving lights, battery support and storage planning",
    bookingAdvice: "Send your vehicle specs first so the workshop can plan the visit around travel time from the coast or hinterland.",
  },
  "Shoalhaven North": {
    routeCue: "Princes Highway, Nowra-Bomaderry, Berry and Jervis Bay travel north toward Albion Park Rail",
    roadIn: "north up the Princes Highway past Kiama",
    vehicleMix: "touring 4WDs, coastal work utes, towing vehicles, campers and family travel rigs",
    jobPattern: "touring suspension, towing support, recovery gear, canopies, roof racks, battery support and lighting",
    bookingAdvice: "Book ahead before travelling from the Shoalhaven so parts availability and workshop timing are confirmed.",
  },
  "Southern Highlands": {
    routeCue: "Macquarie Pass, Illawarra Highway and Hume corridor travel from Bowral, Mittagong and Moss Vale",
    roadIn: "down Macquarie Pass on the Illawarra Highway",
    vehicleMix: "rural utes, highway tow vehicles, farm 4x4s, touring wagons and work rigs",
    jobPattern: "load-rated suspension, towing support, bull bars, driving lights, winches and touring storage",
    bookingAdvice: "Call before coming down the pass so the workshop can confirm fitment, parts and whether the vehicle should be left for the upgrade.",
  },
  Wollondilly: {
    routeCue: "Picton Road, Appin Road, Wilton and Tahmoor travel between the south-west corridor and Albion Park Rail",
    roadIn: "down Picton Road to the M1",
    vehicleMix: "tradie utes, 4WDs, tow vehicles, family rigs and highway touring builds",
    jobPattern: "bull bars, suspension, towing accessories, lighting, recovery gear and staged work-ute fitouts",
    bookingAdvice: "Send photos and the rego details before travelling so the upgrade can be scoped before the bay is booked.",
  },
  Macarthur: {
    routeCue: "Campbelltown, Ingleburn, Minto and Macquarie Fields travel down the freeway corridor toward Albion Park Rail",
    roadIn: "down Appin Road or Picton Road to the M1",
    vehicleMix: "dual-cabs, work utes, towing vehicles, 4WD tourers and family adventure rigs",
    jobPattern: "suspension lifts, bar work, lighting, towing support, recovery gear and performance 4x4 planning",
    bookingAdvice: "Call first so the team can confirm the build goal, likely parts and whether a booked fitment slot is needed.",
  },
  "Sutherland Shire": {
    routeCue: "southern Sydney-edge and Princes Highway travel from Sutherland, Engadine, Miranda and Cronulla",
    roadIn: "south down the M1 Princes Motorway from Waterfall",
    vehicleMix: "coastal 4WDs, trade utes, towing vehicles, touring rigs and weekend trail builds",
    jobPattern: "suspension, bull bars, winches, lighting, battery support, recovery gear and touring accessories",
    bookingAdvice: "Confirm the job by phone before travelling south so the workshop can plan parts, bay time and fitment expectations.",
  },
  "Official 0-25 km radius": {
    routeCue: "short-radius official NSW localities around Oak Flats, Albion Park Rail and the Illawarra workshop catchment",
    vehicleMix: "local 4x4s, rural-edge utes, work rigs, family tow vehicles and weekend trail builds",
    jobPattern: "suspension, bull bars, recovery gear, lighting, towing support and accessory fitment",
    bookingAdvice: "Call ahead with your vehicle specs so the workshop can confirm bay time, parts availability and upgrade order.",
  },
  "Official 25-50 km radius": {
    routeCue: "official NSW localities within a planned 25 to 50 km workshop trip toward Albion Park Rail",
    vehicleMix: "highway 4x4s, coastal drivers, towing vehicles, trade utes and touring rigs",
    jobPattern: "towing support, suspension lifts, lighting, recovery gear, canopies and touring accessories",
    bookingAdvice: "Book before travelling so the team can plan parts, bay time and the right upgrade path.",
  },
  "Official 50-75 km radius": {
    routeCue: "official NSW localities in the wider 50 to 75 km service radius travelling by highway or major regional roads",
    vehicleMix: "touring 4WDs, work utes, highway commuters, family cars and performance vehicles",
    jobPattern: "touring suspension, towing support, bull bars, battery systems, lighting and recovery planning",
    bookingAdvice: "Send photos and vehicle specs before the trip so the job can be scoped before the bay is booked.",
  },
  "Official 75-100 km radius": {
    routeCue: "outer official NSW localities inside the 100 km radius where customers usually plan 4x4 work around a booked trip",
    vehicleMix: "work utes, touring vehicles, 4WDs, towing rigs and weekend trail builds",
    jobPattern: "planned suspension, protection, recovery, lighting, towing and touring accessory upgrades",
    bookingAdvice: "Confirm the job by phone first so parts, fitment time and travel expectations are clear before heading to Albion Park Rail.",
  },
}

function regionSeoContext(location: LocationPage) {
  return regionSeoContexts[location.region] ?? regionSeoContexts.Shellharbour
}

function servicePriorityCue(service: ServicePage) {
  const cues: Record<string, string> = {
    "suspension-lift-kits": "ride height, load, tyre clearance and accessory weight",
    "bull-bars-protection": "bar fitment, sensor clearance, front-end weight and recovery points",
    "winches-recovery-gear": "winch compatibility, recovery points, electrical load and track use",
    "4x4-lighting-electrical": "mounting points, wiring paths, switching and accessory power",
    "dual-battery-systems": "fridge loads, camp lighting, charging, winch load and accessory power",
    "canopies-roof-racks-storage": "payload, access, cable routes, rack loads and storage layout",
    "towing-gvm-upgrades": "tow ball weight, payload, wiring, suspension support and touring load",
    "performance-4x4-upgrades": "drivability, towing response, intake support and staged upgrades",
    "4x4-parts-accessories": "vehicle fitment, staged build order and supplier availability",
  }

  return cues[service.slug] ?? service.includes.slice(0, 2).join(", ").toLowerCase()
}

export function locationTitle(location: LocationPage, service = "4x4 Upgrades") {
  return `${service} ${location.name} NSW`
}

// Keeps every generated title at or under ~60 chars even with the layout's
// " | Wolfpack 4x4" template suffix: long suburb names first drop
// " NSW", then fall back to an absolute title with the short brand.
function boundedMetaTitle(core: string): string | { absolute: string } {
  if (core.length <= 33) return `${core} NSW`
  if (core.length <= 37) return core
  return { absolute: `${core} | Wolfpack 4x4` }
}

export function locationMetaTitle(location: LocationPage) {
  return boundedMetaTitle(`4x4 Upgrades ${location.name}`)
}

export function serviceLocationMetaTitle(service: ServicePage, location: LocationPage) {
  return boundedMetaTitle(`${service.shortTitle} ${location.name}`)
}

// Deterministic per-slug hash so the ~1,000 suburb pages rotate through
// different structural frames instead of sharing one keyword-swap template.
function slugHash(slug: string) {
  let hash = 0
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) >>> 0
  }
  return hash
}

// Local-anchor-or-nothing: a suburb sentence only ships with a verifiable
// anchor (distanceKm from the radius dataset, or the real road in for the
// region). When neither exists, this honest frame ships instead.
const NO_ANCHOR_FRAME =
  "The workshop services the area from Albion Park Rail. Book ahead and the bay is ready when you arrive."

export function locationDescription(location: LocationPage) {
  const context = regionSeoContext(location)
  const km = typeof location.distanceKm === "number" ? Math.round(location.distanceKm) : null
  const road = context.roadIn
  const frame = slugHash(location.slug) % 4

  if (frame === 0) {
    if (km !== null)
      return `About ${km} km separates ${location.name} from the workshop bay at Albion Park Rail. Phone the job through first and the right 4x4 parts or upgrade path can be planned before you arrive.`
    if (road)
      return `From ${location.name} the run in to the workshop at Albion Park Rail is ${road}. Phone the job through first and the right 4x4 parts or upgrade path can be planned before you arrive.`
    return `The workshop services ${location.name} from Albion Park Rail. Book ahead and the bay is ready when you arrive.`
  }

  if (frame === 1) {
    const lead = `4x4 upgrades, parts and accessories for ${location.name} drivers.`
    if (km !== null)
      return `${lead} The Albion Park Rail workshop is about ${km} km away. Call first and the parts are confirmed before you commit to the drive.`
    if (road) return `${lead} The trip in is ${road}. Call first and the parts are confirmed before you set out.`
    return `${lead} ${NO_ANCHOR_FRAME}`
  }

  if (frame === 2) {
    const lead = `Booking 4x4 work from ${location.name}?`
    if (km !== null)
      return `${lead} The Albion Park Rail bay is about ${km} km away. Send the vehicle details, current accessories and target use, get a straight upgrade path, then lock in a time.`
    if (road)
      return `${lead} The drive to the Albion Park Rail bay is ${road}. Send the vehicle details, current accessories and target use, get a straight upgrade path, then lock in a time.`
    return `${lead} ${NO_ANCHOR_FRAME}`
  }

  const lead = `Wolfpack 4x4 handles ${context.vehicleMix} for ${location.name}.`
  if (km !== null) return `${lead} The bay at Albion Park Rail sits about ${km} km away, so jobs get scoped by phone before the trip.`
  if (road) return `${lead} Most customers make the trip ${road} and have the job scoped by phone first.`
  return `${lead} ${NO_ANCHOR_FRAME}`
}

export function locationWorkshopContext(location: LocationPage) {
  const context = regionSeoContext(location)
  const km = typeof location.distanceKm === "number" ? Math.round(location.distanceKm) : null
  const road = context.roadIn
  const isOfficialBand = location.region.startsWith("Official")
  const frame = (slugHash(location.slug) >> 2) % 4

  if (frame === 0) {
    const side = isOfficialBand ? "Out past the local catchment" : `From the ${location.region} side`
    return `${side}, common jobs run to ${context.jobPattern}. ${context.bookingAdvice}`
  }

  if (frame === 1) {
    return `The bay sees ${context.vehicleMix} from this area. Typical work covers ${context.jobPattern}. ${context.bookingAdvice}`
  }

  if (frame === 2) {
    const closer =
      km !== null
        ? ` That matters when the trip in is about ${km} km.`
        : road
          ? ` Most customers make the run in ${road}.`
          : ` ${NO_ANCHOR_FRAME}`
    return `Start with a phone call: describe the vehicle, current accessories and the upgrade you want, and the team scopes the job before you book. Local work usually means ${context.jobPattern}.${closer}`
  }

  return `4x4 builds go wrong when parts are chosen in isolation, so the fix gets planned around how the vehicle gets used. Around here that means ${context.vehicleMix}. ${context.bookingAdvice}`
}

export function serviceLocationPath(service: ServicePage, location: LocationPage) {
  return `/locations/${location.slug}/${service.slug}`
}

export function serviceLocationTitle(service: ServicePage, location: LocationPage) {
  return `${service.shortTitle} ${location.name} NSW`
}

export function serviceLocationDescription(service: ServicePage, location: LocationPage) {
  const base = `${service.shortTitle} for ${location.name} drivers, planned around ${servicePriorityCue(service)}.`
  const tail = " Quotes and fitment from the Albion Park Rail workshop."
  if (base.length + tail.length <= 165) return base + tail
  const shortTail = " Albion Park Rail workshop."
  return base.length + shortTail.length <= 165 ? base + shortTail : base
}

export function serviceLocationWorkshopContext(service: ServicePage, location: LocationPage) {
  const context = regionSeoContext(location)
  return `Common jobs from the ${location.region} area include ${context.jobPattern}. For ${service.shortTitle.toLowerCase()}, the workshop checks ${servicePriorityCue(service)} before quoting parts, fitment time or staged upgrade options. ${context.bookingAdvice}`
}

export function serviceLocationFaq(service: ServicePage, location: LocationPage) {
  const context = regionSeoContext(location)
  return [
    {
      question: `Do you offer ${service.shortTitle.toLowerCase()} for ${location.name} drivers?`,
      answer: `Yes. Wolfpack 4x4 serves ${location.name} and nearby suburbs including ${location.nearby.join(", ")} from the Albion Park Rail workshop, with booking advice for ${context.routeCue}.`,
    },
    {
      question: `What details help with a ${service.shortTitle.toLowerCase()} quote from ${location.name}?`,
      answer: `Send the vehicle make, model, year, engine, current accessories, desired result and clear photos. For ${location.region} work, it also helps to mention towing, touring, work use, tracks, highway driving or coastal corrosion where relevant.`,
    },
    {
      question: `Should I book before travelling from ${location.name}?`,
      answer: context.bookingAdvice,
    },
    ...service.faq.slice(0, 1),
  ]
}

export function serviceLocationKeywords(service: ServicePage, location?: LocationPage) {
  const locationPart = location ? [location.name, location.region, "NSW"] : ["Oak Flats", "Shellharbour", "Wollongong", "Illawarra"]
  return [
    service.title,
    service.shortTitle,
    service.serviceType,
    ...locationPart.map((place) => `${service.shortTitle} ${place}`),
    ...locationPart.map((place) => `4x4 workshop ${place}`),
  ]
}

export function routeEntries(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "weekly", lastModified: navLastModified },
    { url: absoluteUrl("/services"), priority: 0.95, changeFrequency: "weekly", lastModified: navLastModified },
    { url: absoluteUrl("/locations"), priority: 0.95, changeFrequency: "weekly", lastModified: seoLastModified },
    { url: absoluteUrl("/areas"), priority: 0.85, changeFrequency: "weekly", lastModified: seoLastModified },
    // Primary navigation + conversion pages — previously omitted from the sitemap.
    { url: absoluteUrl("/quote"), priority: 0.95, changeFrequency: "weekly", lastModified: navLastModified },
    { url: absoluteUrl("/contact-us"), priority: 0.9, changeFrequency: "monthly", lastModified: navLastModified },
    { url: absoluteUrl("/about-us"), priority: 0.8, changeFrequency: "monthly", lastModified: navLastModified },
    { url: absoluteUrl("/products"), priority: 0.8, changeFrequency: "weekly", lastModified: navLastModified },
    { url: absoluteUrl("/products/clothing"), priority: 0.82, changeFrequency: "weekly", lastModified: navLastModified },
    { url: absoluteUrl("/parts"), priority: 0.8, changeFrequency: "weekly", lastModified: navLastModified },
    { url: absoluteUrl("/gallery"), priority: 0.7, changeFrequency: "monthly", lastModified: navLastModified },
    { url: absoluteUrl("/blog"), priority: 0.7, changeFrequency: "weekly", lastModified: navLastModified },
    { url: absoluteUrl("/faq"), priority: 0.7, changeFrequency: "monthly", lastModified: navLastModified },
    { url: absoluteUrl("/privacy"), priority: 0.2, changeFrequency: "yearly", lastModified: seoLastModified },
    { url: absoluteUrl("/terms"), priority: 0.2, changeFrequency: "yearly", lastModified: seoLastModified },
  ]

  const serviceRoutes = servicePages.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    priority: 0.86,
    changeFrequency: "monthly" as const,
    lastModified: seoLastModified,
  }))

  const locationRoutes = locations.map((location) => ({
    url: absoluteUrl(`/locations/${location.slug}`),
    priority: location.priority === "primary" ? 0.82 : location.priority === "secondary" ? 0.72 : 0.62,
    changeFrequency: "monthly" as const,
    lastModified: seoLastModified,
  }))

  const serviceLocationRoutes = locations.flatMap((location) =>
    servicePages.map((service) => ({
      url: absoluteUrl(serviceLocationPath(service, location)),
      priority: location.priority === "primary" ? 0.7 : location.priority === "secondary" ? 0.62 : 0.52,
      changeFrequency: "monthly" as const,
      lastModified: seoLastModified,
    })),
  )

  const areaRoutes = areaPages.map((area) => ({
    url: absoluteUrl(`/areas/${area.slug}`),
    priority: ["illawarra", "hundred-km-service-radius"].includes(area.slug) ? 0.9 : 0.78,
    changeFrequency: "monthly" as const,
    lastModified: seoLastModified,
  }))

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...locationRoutes, ...serviceLocationRoutes]
}

// Self-referencing hreflang for the single-locale AU site — emitted alongside
// the canonical on every page so Google sees explicit en-AU targeting.
export function pageAlternates(path = "/") {
  const canonical = absoluteUrl(path)
  return {
    canonical,
    languages: {
      "en-AU": canonical,
      "x-default": canonical,
    },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}

// E.164-style phone for structured data (Google recommends the country code).
export function schemaPhone(phone?: string | null) {
  const value = phone ?? business.phone
  return value.startsWith("0") ? `+61 ${value.slice(1)}` : value
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: siteUrl,
    inLanguage: "en-AU",
    publisher: { "@id": `${siteUrl}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/parts?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function serviceJsonLd(service: ServicePage, location?: LocationPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: location ? `${service.title} in ${location.name}` : service.title,
    serviceType: service.serviceType,
    description: location ? serviceLocationDescription(service, location) : service.metaDescription,
    provider: {
      "@type": "AutoPartsStore",
      name: business.name,
      telephone: schemaPhone(),
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 2/8 Shaban St",
        addressLocality: "Albion Park Rail",
        addressRegion: "NSW",
        postalCode: "2527",
        addressCountry: "AU",
      },
    },
    areaServed: location
      ? {
          "@type": "Place",
          name: `${location.name}, NSW`,
        }
      : locations
          .filter((place) => place.priority === "primary")
          .map((place) => ({ "@type": "Place", name: `${place.name}, NSW` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "4x4 upgrade services",
      itemListElement: service.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      })),
    },
  }
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

type HomepageJsonLdSettings = {
  displayName?: string | null
  email?: string | null
  phone?: string | null
}

export function homepageJsonLd(settings?: HomepageJsonLdSettings | null) {
  const businessEmail = settings?.email ?? business.email
  const businessPhone = settings?.phone ?? business.phone

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteJsonLd(),
      {
        "@type": "AutoPartsStore",
        "@id": `${siteUrl}/#business`,
        // One canonical entity name everywhere; the compact variant is the alternate.
        name: business.name,
        alternateName: "Wolfpack 4x4",
        url: siteUrl,
        image: absoluteUrl(siteImages.logoPrimary),
        logo: absoluteUrl(siteImages.logoPrimary),
        telephone: schemaPhone(businessPhone),
        email: businessEmail,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Unit 2/8 Shaban St",
          addressLocality: "Albion Park Rail",
          addressRegion: "NSW",
          postalCode: "2527",
          addressCountry: "AU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`,
        sameAs: business.sameAs,
        founder: {
          "@type": "Person",
          "@id": `${siteUrl}/#founder`,
          name: business.founder.name,
          jobTitle: business.founder.jobTitle,
          worksFor: { "@id": `${siteUrl}/#business` },
        },
        areaServed: locations
          .filter((location) => location.priority !== "support")
          .map((location) => ({ "@type": "Place", name: `${location.name}, NSW` })),
        openingHoursSpecification: [
          ["Monday", "08:00", "17:00"],
          ["Tuesday", "08:00", "16:00"],
          ["Wednesday", "08:00", "16:00"],
          ["Thursday", "08:00", "16:00"],
          ["Friday", "08:00", "15:30"],
          ["Saturday", "08:00", "12:00"],
          // 00:00–00:00 explicitly marks Sunday as closed.
          ["Sunday", "00:00", "00:00"],
        ].map(([day, opens, closes]) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens,
          closes,
        })),
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
      faqJsonLd(faqs.map((item) => ({ question: item.question, answer: item.answer }))),
    ],
  }
}

// Compact business node for subpage graphs — same @id as the full LocalBusiness
// entity on the homepage so Google links them as one LocalBusiness.
function businessNodeJsonLd() {
  return {
    "@type": "AutoPartsStore",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    url: siteUrl,
    telephone: schemaPhone(),
    email: business.email,
    image: absoluteUrl(siteImages.logoPrimary),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 2/8 Shaban St",
      addressLocality: "Albion Park Rail",
      addressRegion: "NSW",
      postalCode: "2527",
      addressCountry: "AU",
    },
  }
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": absoluteUrl("/about-us"),
        url: absoluteUrl("/about-us"),
        name: "About Wolfpack 4x4",
        inLanguage: "en-AU",
        about: { "@id": `${siteUrl}/#business` },
        mainEntity: { "@id": `${siteUrl}/#business` },
      },
      businessNodeJsonLd(),
      {
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        name: business.founder.name,
        jobTitle: business.founder.jobTitle,
        worksFor: { "@id": `${siteUrl}/#business` },
      },
    ],
  }
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": absoluteUrl("/contact-us"),
        url: absoluteUrl("/contact-us"),
        name: "Contact Wolfpack 4x4",
        inLanguage: "en-AU",
        about: { "@id": `${siteUrl}/#business` },
        mainEntity: { "@id": `${siteUrl}/#business` },
      },
      {
        ...businessNodeJsonLd(),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: schemaPhone(),
          email: business.email,
          areaServed: "AU",
          availableLanguage: "en",
        },
      },
    ],
  }
}

export function productsPageJsonLd(
  items: Array<{ title: string; href: string; description: string; image?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/products"),
        url: absoluteUrl("/products"),
        name: "4x4 parts and accessories",
        inLanguage: "en-AU",
        about: { "@id": `${siteUrl}/#business` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            description: item.description,
            url: absoluteUrl(item.href),
            ...(item.image ? { image: absoluteUrl(item.image) } : {}),
          })),
        },
      },
      businessNodeJsonLd(),
    ],
  }
}

export function galleryPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CollectionPage", "ImageGallery"],
        "@id": absoluteUrl("/gallery"),
        url: absoluteUrl("/gallery"),
        name: "4x4 build gallery",
        description:
          "Wolfpack 4x4 vehicle gallery with front, side and back views for Australian 4x4 model wrap and upgrade references.",
        inLanguage: "en-AU",
        about: { "@id": `${siteUrl}/#business` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/media/wolfpack/vehicles/views/ford-ranger-raptor-side.png"),
        },
        image: galleryImages.map((item) => ({
          "@type": "ImageObject",
          contentUrl: absoluteUrl(item.src),
          caption: item.title,
          description: item.detail,
        })),
      },
      businessNodeJsonLd(),
    ],
  }
}

export function servicesIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/services"),
        url: absoluteUrl("/services"),
        name: "4x4 upgrade services",
        inLanguage: "en-AU",
        about: { "@id": `${siteUrl}/#business` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: servicePages.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: absoluteUrl(`/services/${service.slug}`),
          })),
        },
      },
      businessNodeJsonLd(),
    ],
  }
}

export function webPageJsonLd(path: string, name: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(path),
        url: absoluteUrl(path),
        name,
        ...(description ? { description } : {}),
        inLanguage: "en-AU",
        about: { "@id": `${siteUrl}/#business` },
      },
      businessNodeJsonLd(),
    ],
  }
}

export function blogIndexJsonLd(
  posts: Array<{ title: string; path: string; datePublished?: string | null }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": absoluteUrl("/blog"),
        url: absoluteUrl("/blog"),
        name: "Wolfpack 4x4 workshop blog",
        inLanguage: "en-AU",
        publisher: { "@id": `${siteUrl}/#business` },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: absoluteUrl(post.path),
          ...(post.datePublished ? { datePublished: post.datePublished } : {}),
        })),
      },
      businessNodeJsonLd(),
    ],
  }
}

import type { SeoSettingsResolved } from "@/lib/cms/seo-settings"

/**
 * homepageJsonLd with the CMS "SEO settings" LocalBusiness overrides applied
 * (geo, hours, sameAs, priceRange, address). Fallbacks equal the live literals,
 * so output is byte-equivalent when the CMS is empty or down.
 */
export function homepageJsonLdWithSeo(
  settings: HomepageJsonLdSettings | null | undefined,
  seo: SeoSettingsResolved,
) {
  const base = homepageJsonLd(settings)
  return {
    ...base,
    "@graph": base["@graph"].map((node) =>
      (node as { "@type"?: string })["@type"] === "AutoPartsStore"
        ? {
            ...node,
            telephone: schemaPhone(settings?.phone ?? seo.localBusiness.telephone),
            priceRange: seo.localBusiness.priceRange,
            address: {
              "@type": "PostalAddress",
              streetAddress: seo.localBusiness.streetAddress,
              addressLocality: seo.localBusiness.locality,
              addressRegion: seo.localBusiness.region,
              postalCode: seo.localBusiness.postcode,
              addressCountry: "AU",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: seo.localBusiness.latitude,
              longitude: seo.localBusiness.longitude,
            },
            sameAs: seo.socialProfiles.map((profile) => profile.url),
            openingHoursSpecification: seo.localBusiness.openingHours.map((hours) => ({
              "@type": "OpeningHoursSpecification",
              dayOfWeek: hours.days,
              opens: hours.opens,
              closes: hours.closes,
            })),
          }
        : node,
    ),
  }
}
