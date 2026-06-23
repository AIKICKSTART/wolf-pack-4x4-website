export interface VehicleCollectionFrame {
  title: string
  path: string
  role: string
}

export interface VehicleImageCollection {
  slug: string
  vehicle: string
  colourStandard: "Yellow" | "Red" | "Black"
  badgeAction: string
  status: string
  salesProof: string
  description: string
  frames: ReadonlyArray<VehicleCollectionFrame>
}

export const approvedVehicleImageCollections: ReadonlyArray<VehicleImageCollection> = [
  {
    slug: "falcon-gt-ho",
    vehicle: "Ford Falcon GT-HO",
    colourStandard: "Yellow",
    badgeAction: "Scope the note",
    status: "Dual exhaust, single tips",
    salesProof: "Dual exhaust with single tips only. One single polished tip per rear outlet. No twin-tip or quad-tip setup.",
    description:
      "The corrected GT-HO set keeps the black paint, gold stripe, chrome bumpers and period stance while showing the exhaust brief properly: dual rear exit, one polished single tip per side, tucked under the valance and checked against saved Falcon underbody references.",
    frames: [
      {
        title: "Classic muscle",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-01-hero-front-three-quarter-card.webp",
        role: "Front fitment view",
      },
      {
        title: "Single tips",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-02-rear-three-quarter-single-tips-card.webp",
        role: "Rear sound view",
      },
      {
        title: "One per side",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-03-rear-tip-detail-single-tips-card.webp",
        role: "Muffler tip detail",
      },
      {
        title: "Period profile",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-04-full-side-profile-card.webp",
        role: "Side clearance view",
      },
      {
        title: "Route it clean",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-05-underbody-routing-card.webp",
        role: "Underbody routing",
      },
      {
        title: "Proper clearance",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-06-rear-straight-tip-spacing-card.webp",
        role: "Rear tip spacing",
      },
      {
        title: "Done properly",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-07-undercarriage-axle-clearance-card.webp",
        role: "Axle clearance routing",
      },
      {
        title: "Check the route",
        path: "/media/generated/home-vehicles/ford-falcon-gtho-nomask-08-high-angle-workshop-hero-card.webp",
        role: "Underbody routing",
      },
    ],
  },
  {
    slug: "dodge-ram-trx",
    vehicle: "Dodge RAM TRX",
    colourStandard: "Red",
    badgeAction: "Build the truck",
    status: "Ten-frame workshop brief",
    salesProof: "Use the RAM set to agree stance, wheel clearance, rear exit, tip finish and underbody routing before bay time.",
    description:
      "Dodge RAM TRX: the black, chrome and red Muffler Men workshop set shows the details that matter before the first cut: stance, badge detail, side clearance, wheel package, outlet angle, rear exit, tip finish and finished rear attitude.",
    frames: [
      {
        title: "Set the stance",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-01-hero-front-three-quarter-card.webp",
        role: "Front fitment view",
      },
      {
        title: "Check clearance",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-02-low-front-detail-card.webp",
        role: "Front detail view",
      },
      {
        title: "Badge the build",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-03-badge-detail-card.webp",
        role: "Supercharged badge detail",
      },
      {
        title: "Check the side",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-04-full-side-profile-card.webp",
        role: "Side clearance view",
      },
      {
        title: "Badge the door",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-05-door-badge-detail-card.webp",
        role: "Door branding detail",
      },
      {
        title: "Clear the wheel",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-06-front-wheel-clearance-card.webp",
        role: "Wheel clearance view",
      },
      {
        title: "Ready for bay time",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-07-wheel-macro-card.webp",
        role: "Wheel finish detail",
      },
      {
        title: "Route it clean",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-08-underbody-routing-rear-exit-prep-card.webp",
        role: "Underbody routing",
      },
      {
        title: "Rear view",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-09-rear-three-quarter-finished-attitude-card.webp",
        role: "Rear sound view",
      },
      {
        title: "Workshop brief",
        path: "/media/generated/home-vehicles/dodge-ram-trx-nomask-10-high-angle-workshop-hero-card.webp",
        role: "Workshop roofline view",
      },
    ],
  },
  {
    slug: "nissan-gtr-r35",
    vehicle: "Nissan GT-R R35",
    colourStandard: "Black",
    badgeAction: "Plan the system",
    status: "Ten-frame workshop brief",
    salesProof: "Use the GT-R set to agree stance, wheel clearance, quad rear exit, tip finish and underbody routing before bay time.",
    description:
      "Nissan GT-R R35: the black, chrome and red Muffler Men workshop set shows the details that matter before the first cut: stance, badge detail, side clearance, wheel package, quad outlet angle, rear exit, tip finish and finished rear attitude.",
    frames: [
      {
        title: "Set the stance",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-01-hero-front-three-quarter-card.webp",
        role: "Front fitment view",
      },
      {
        title: "Check clearance",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-02-low-front-detail-card.webp",
        role: "Front detail view",
      },
      {
        title: "Badge the build",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-03-badge-detail-card.webp",
        role: "GT-R badge detail",
      },
      {
        title: "Check the side",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-04-full-side-profile-card.webp",
        role: "Side clearance view",
      },
      {
        title: "Vent and door",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-05-door-badge-detail-card.webp",
        role: "Fender vent detail",
      },
      {
        title: "Clear the wheel",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-06-front-wheel-clearance-card.webp",
        role: "Wheel clearance view",
      },
      {
        title: "Ready for bay time",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-07-wheel-macro-card.webp",
        role: "Wheel finish detail",
      },
      {
        title: "Route it clean",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-08-underbody-routing-rear-exit-prep-card.webp",
        role: "Underbody routing",
      },
      {
        title: "Quad rear finish",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-09-rear-three-quarter-finished-attitude-card.webp",
        role: "Rear sound view",
      },
      {
        title: "Workshop brief",
        path: "/media/generated/home-vehicles/nissan-gtr-r35-nomask-10-high-angle-workshop-hero-card.webp",
        role: "Workshop roofline view",
      },
    ],
  },
]
