import { siteImages } from "@/lib/site-assets"

export const siteUrl = "https://wolfpack4x4.au"

export const business = {
  name: "Wolfpack 4x4",
  shortName: "Wolfpack",
  phone: "02 4256 9256",
  mobile: "",
  email: "Info@wolfpack4x4.au",
  address: "Unit 2/8 Shaban St, Albion Park Rail NSW 2527",
  geo: { latitude: -34.5739, longitude: 150.8158 },
  founder: { name: "Wolfpack 4x4", jobTitle: "4x4 upgrade team" },
  sameAs: ["https://www.facebook.com/p/Wolfpack-4x4-61550788820371/"],
  serviceArea:
    "Oak Flats, Albion Park Rail, Shellharbour, Wollongong, Illawarra, Shoalhaven, Southern Highlands, Macarthur, Wollondilly and Sutherland Shire",
  hours: [
    ["Monday", "8:00 am - 5:00 pm"],
    ["Tuesday", "8:00 am - 5:00 pm"],
    ["Wednesday", "8:00 am - 5:00 pm"],
    ["Thursday", "8:00 am - 5:00 pm"],
    ["Friday", "8:00 am - 5:00 pm"],
    ["Saturday", "By appointment"],
    ["Sunday", "Closed"],
  ],
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
]

export const services = [
  {
    title: "Suspension and lift kits",
    description:
      "Lift kits, shocks, springs and suspension packages selected around how the 4x4 is loaded, towed and driven.",
    image: "/media/wolfpack/services/suspension-lift-kits.webp",
  },
  {
    title: "Bull bars and vehicle protection",
    description:
      "Bull bars, side steps, underbody protection and front-end accessories fitted for touring, work utes and weekend tracks.",
    image: "/media/wolfpack/services/bull-bars-protection.webp",
  },
  {
    title: "Winches and recovery gear",
    description:
      "Winches, recovery points, straps, boards and practical recovery setup advice before the vehicle leaves the workshop.",
    image: "/media/wolfpack/services/winches-recovery-gear.webp",
  },
  {
    title: "4x4 lighting and electrical",
    description:
      "Driving lights, light bars, dual battery support, power management and touring electrical upgrades.",
    image: "/media/wolfpack/services/4x4-lighting-electrical.webp",
  },
  {
    title: "Canopies, racks and storage",
    description:
      "Canopies, roof racks, drawer systems and storage accessories planned around payload, access and real trip use.",
    image: "/media/wolfpack/services/canopies-roof-racks-storage.webp",
  },
  {
    title: "Performance 4x4 upgrades",
    description:
      "Breathing, intake, tuning-support and drivability upgrades for utes and 4WDs that need stronger response.",
    image: "/media/wolfpack/services/performance-4x4-upgrades.webp",
  },
  {
    title: "Towing and touring packages",
    description:
      "Towbar, brake, wiring and load-carrying advice for work vehicles, family tourers and caravan setups.",
    image: "/media/wolfpack/services/towing-gvm-upgrades.webp",
  },
  {
    title: "4x4 parts and accessories",
    description:
      "Workshop-supported parts lookup for suspension, towing, lighting, protection, recovery and touring gear.",
    image: "/media/wolfpack/services/4x4-parts-accessories.webp",
  },
]

export const productCategories = [
  "Suspension and lift components",
  "Bull bars and vehicle protection",
  "Winches and recovery gear",
  "Lighting and electrical accessories",
  "Towing, racks, canopies and storage",
]

export const proofPoints = [
  { value: "4x4", label: "upgrades and accessories" },
  { value: "Fitment", label: "parts selected around your vehicle" },
  { value: "Local", label: "Albion Park Rail workshop support" },
]

export const faqs = [
  {
    question: "Can Wolfpack 4x4 build a staged upgrade plan?",
    answer:
      "Yes. The team can plan suspension, protection, recovery, lighting and touring accessories in stages so the vehicle is not upgraded twice.",
  },
  {
    question: "Should I call before ordering parts?",
    answer:
      "Yes. Send the make, model, year, engine, tray or canopy setup, current suspension, tyre size and how the vehicle is used so fitment can be checked first.",
  },
  {
    question: "What areas does Wolfpack 4x4 serve?",
    answer:
      "Wolfpack 4x4 supports Oak Flats, Albion Park Rail, Shellharbour, Wollongong, the Illawarra and surrounding NSW touring and work-ute customers who book ahead.",
  },
  {
    question: "Does Wolfpack 4x4 handle parts as well as upgrades?",
    answer:
      "Yes. The public parts catalogue is focused on non-muffler 4x4 categories such as suspension, towing, lighting, recovery, storage and engine-bay support gear.",
  },
]

export const vehicleGalleryVehicles = [
  {
    slug: "ford-ranger-raptor",
    label: "Ford Ranger Raptor",
    title: "Raptor stance, Wolfpack finish.",
    detail:
      "Accurate Ranger Raptor-style platform with Ford badging retained, then finished in Wolfpack black, blue and purple wrap graphics.",
    views: [
      {
        key: "front",
        label: "Front",
        src: "/media/wolfpack/vehicles/views/ford-ranger-raptor-front.webp",
        alt: "Front view of a Ford Ranger Raptor with Ford badge and Wolfpack black blue purple wrap",
      },
      {
        key: "side",
        label: "Side",
        src: "/media/wolfpack/vehicles/views/ford-ranger-raptor-side.webp",
        alt: "Side view of a Ford Ranger Raptor with Wolfpack black blue purple wrap",
      },
      {
        key: "back",
        label: "Back",
        src: "/media/wolfpack/vehicles/views/ford-ranger-raptor-back.webp",
        alt: "Back view of a Ford Ranger Raptor with Ford badge and Wolfpack black blue purple wrap",
      },
    ],
  },
  {
    slug: "toyota-hilux-gr-sport",
    label: "Toyota HiLux GR Sport",
    title: "GR Sport cues with Wolfpack energy.",
    detail:
      "HiLux GR Sport styling, visible Toyota and GR cues, high-clearance tyres and Wolfpack wrap direction for a performance 4x4 build.",
    views: [
      {
        key: "front",
        label: "Front",
        src: "/media/wolfpack/vehicles/views/toyota-hilux-gr-sport-front.webp",
        alt: "Front view of a Toyota HiLux GR Sport with Toyota badge and Wolfpack wrap",
      },
      {
        key: "side",
        label: "Side",
        src: "/media/wolfpack/vehicles/views/toyota-hilux-gr-sport-side.webp",
        alt: "Side view of a Toyota HiLux GR Sport with Wolfpack wrap",
      },
      {
        key: "back",
        label: "Back",
        src: "/media/wolfpack/vehicles/views/toyota-hilux-gr-sport-back.webp",
        alt: "Back view of a Toyota HiLux GR Sport with Toyota badge and Wolfpack wrap",
      },
    ],
  },
  {
    slug: "nissan-patrol-warrior",
    label: "Nissan Patrol Warrior",
    title: "Big touring platform, pack identity.",
    detail:
      "Patrol Warrior-style touring stance with visible Nissan and Warrior details plus Wolfpack blue and purple workshop lighting.",
    views: [
      {
        key: "front",
        label: "Front",
        src: "/media/wolfpack/vehicles/views/nissan-patrol-warrior-front.webp",
        alt: "Front view of a Nissan Patrol Warrior with Nissan badge and Wolfpack wrap",
      },
      {
        key: "side",
        label: "Side",
        src: "/media/wolfpack/vehicles/views/nissan-patrol-warrior-side.webp",
        alt: "Side view of a Nissan Patrol Warrior with Wolfpack wrap",
      },
      {
        key: "back",
        label: "Back",
        src: "/media/wolfpack/vehicles/views/nissan-patrol-warrior-back.webp",
        alt: "Back view of a Nissan Patrol Warrior with Nissan badge and Wolfpack wrap",
      },
    ],
  },
  {
    slug: "isuzu-dmax-blade",
    label: "Isuzu D-MAX Blade",
    title: "Blade work ute, Wolfpack treatment.",
    detail:
      "D-MAX Blade-style proportions with Isuzu and Blade badging kept visible, built into a Wolfpack performance 4x4 visual.",
    views: [
      {
        key: "front",
        label: "Front",
        src: "/media/wolfpack/vehicles/views/isuzu-dmax-blade-front.webp",
        alt: "Front view of an Isuzu D-MAX Blade with Isuzu badge and Wolfpack wrap",
      },
      {
        key: "side",
        label: "Side",
        src: "/media/wolfpack/vehicles/views/isuzu-dmax-blade-side.webp",
        alt: "Side view of an Isuzu D-MAX Blade with Wolfpack wrap",
      },
      {
        key: "back",
        label: "Back",
        src: "/media/wolfpack/vehicles/views/isuzu-dmax-blade-back.webp",
        alt: "Back view of an Isuzu D-MAX Blade with Isuzu badge and Wolfpack wrap",
      },
    ],
  },
  {
    slug: "mitsubishi-triton-gsr",
    label: "Mitsubishi Triton GSR",
    title: "Triton GSR in the Wolfpack wrap system.",
    detail:
      "Current Triton GSR-style front end, Mitsubishi badge and Wolfpack wrap graphics for a late-model Australian ute build.",
    views: [
      {
        key: "front",
        label: "Front",
        src: "/media/wolfpack/vehicles/views/mitsubishi-triton-gsr-front.webp",
        alt: "Front view of a Mitsubishi Triton GSR with Mitsubishi badge and Wolfpack wrap",
      },
      {
        key: "side",
        label: "Side",
        src: "/media/wolfpack/vehicles/views/mitsubishi-triton-gsr-side.webp",
        alt: "Side view of a Mitsubishi Triton GSR with Wolfpack wrap",
      },
      {
        key: "back",
        label: "Back",
        src: "/media/wolfpack/vehicles/views/mitsubishi-triton-gsr-back.webp",
        alt: "Back view of a Mitsubishi Triton GSR with Mitsubishi badge and Wolfpack wrap",
      },
    ],
  },
  {
    slug: "toyota-landcruiser-79",
    label: "Toyota LandCruiser 79",
    title: "Classic 79 Series, modern Wolfpack finish.",
    detail:
      "LandCruiser 79-style touring ute with Toyota and LandCruiser badges visible, wrapped in Wolfpack black, blue and purple.",
    views: [
      {
        key: "front",
        label: "Front",
        src: "/media/wolfpack/vehicles/views/toyota-landcruiser-79-front.webp",
        alt: "Front view of a Toyota LandCruiser 79 with Toyota badge and Wolfpack wrap",
      },
      {
        key: "side",
        label: "Side",
        src: "/media/wolfpack/vehicles/views/toyota-landcruiser-79-side.webp",
        alt: "Side view of a Toyota LandCruiser 79 with Wolfpack wrap",
      },
      {
        key: "back",
        label: "Back",
        src: "/media/wolfpack/vehicles/views/toyota-landcruiser-79-back.webp",
        alt: "Back view of a Toyota LandCruiser 79 with Toyota badge and Wolfpack wrap",
      },
    ],
  },
]

export const galleryImages = vehicleGalleryVehicles.flatMap((vehicle) =>
  vehicle.views.map((view) => ({
    src: view.src,
    alt: view.alt,
    label: `${vehicle.label} ${view.label}`,
    title: vehicle.title,
    detail: vehicle.detail,
  })),
)

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: business.name,
  url: siteUrl,
  image: `${siteUrl}${siteImages.logoPrimary}`,
  telephone: business.phone,
  email: business.email,
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
  areaServed: business.serviceArea,
  openingHoursSpecification: [
    ["Monday", "08:00", "17:00"],
    ["Tuesday", "08:00", "17:00"],
    ["Wednesday", "08:00", "17:00"],
    ["Thursday", "08:00", "17:00"],
    ["Friday", "08:00", "17:00"],
  ].map(([day, opens, closes]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day,
    opens,
    closes,
  })),
}
