export const supplierSystemManifestPath =
  "/media/brand/supplier-systems/manifests/supplier-system-assets.json"

export type SupplierSystemBrand =
  | "Manta / MPI Automotive"
  | "XForce / SWD"

export type SupplierSystemColor = "black" | "red" | "yellow"

export interface SupplierSystemAsset {
  slug: string
  vehicle: string
  supplierBrand: SupplierSystemBrand
  systemType: string
  sourceReference: string
  allowedColor: SupplierSystemColor
  sourceLogos: ReadonlyArray<string>
  heroPath: string
  squarePath: string
  storyPath: string
  undercarriagePath: string
  productSystemBenchPath: string
  installDetailPath: string
  proofNotes: string
  tone: string
}

export const supplierSystemAssets: ReadonlyArray<SupplierSystemAsset> = [
  {
    slug: "hsv-gtsr-w1-manta-mpi",
    vehicle: "HSV GTSR W1",
    supplierBrand: "Manta / MPI Automotive",
    systemType: "Dual 3in full exhaust system with coated headers",
    sourceReference: "HOLK128-178C-GTSR / VF HSV GTS-R LSA full-system mapping",
    allowedColor: "black",
    sourceLogos: [
      "/media/parts/brand-logos/manta.webp",
      "/media/parts/brand-logos/mpi-automotive.webp",
    ],
    heroPath: "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/hero.webp",
    squarePath: "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/square.webp",
    storyPath: "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/story.webp",
    undercarriagePath: "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/undercarriage.webp",
    productSystemBenchPath:
      "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/product-bench.webp",
    installDetailPath:
      "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/install-detail.webp",
    proofNotes:
      "Regenerated as a Manta/MPI set after rejecting the earlier XForce/SWD GTSR candidate as a supplier mismatch.",
    tone: "var(--primitive-red)",
  },
  {
    slug: "ford-falcon-gt-ho-manta-mpi",
    vehicle: "Ford Falcon XY GT-HO Phase III",
    supplierBrand: "Manta / MPI Automotive",
    systemType: "Classic Falcon V8 full exhaust system",
    sourceReference: "MKFD0283 / Falcon XR-XT-XW-XY 302-351 V8 full-system mapping",
    allowedColor: "yellow",
    sourceLogos: [
      "/media/parts/brand-logos/manta.webp",
      "/media/parts/brand-logos/mpi-automotive.webp",
    ],
    heroPath: "/media/brand/supplier-systems/ford-falcon-gt-ho-manta-mpi/hero.webp",
    squarePath: "/media/brand/supplier-systems/ford-falcon-gt-ho-manta-mpi/square.webp",
    storyPath: "/media/brand/supplier-systems/ford-falcon-gt-ho-manta-mpi/story.webp",
    undercarriagePath:
      "/media/brand/supplier-systems/ford-falcon-gt-ho-manta-mpi/undercarriage.webp",
    productSystemBenchPath:
      "/media/brand/supplier-systems/ford-falcon-gt-ho-manta-mpi/product-bench.webp",
    installDetailPath:
      "/media/brand/supplier-systems/ford-falcon-gt-ho-manta-mpi/install-detail.webp",
    proofNotes:
      "Generated with period-correct Falcon V8 routing and Manta/MPI packaging inside the scene.",
    tone: "var(--primitive-amber)",
  },
  {
    slug: "subaru-wrx-xforce-swd",
    vehicle: "Subaru WRX STI",
    supplierBrand: "XForce / SWD",
    systemType: "WRX/STI turbo-back / cat-back performance system",
    sourceReference: "ESSWVB22VKBK and SWD WRX/STI turbo-back catalogue mapping",
    allowedColor: "red",
    sourceLogos: [
      "/media/parts/brand-logos/xforce.webp",
      "/media/parts/brand-logos/swd.webp",
    ],
    heroPath: "/media/brand/supplier-systems/subaru-wrx-xforce-swd/hero.webp",
    squarePath: "/media/brand/supplier-systems/subaru-wrx-xforce-swd/square.webp",
    storyPath: "/media/brand/supplier-systems/subaru-wrx-xforce-swd/story.webp",
    undercarriagePath: "/media/brand/supplier-systems/subaru-wrx-xforce-swd/undercarriage.webp",
    productSystemBenchPath:
      "/media/brand/supplier-systems/subaru-wrx-xforce-swd/product-bench.webp",
    installDetailPath:
      "/media/brand/supplier-systems/subaru-wrx-xforce-swd/install-detail.webp",
    proofNotes:
      "Generated as a red WRX/STI XForce/SWD set with matching hero, hoist, product bench, and install detail scenes.",
    tone: "var(--primitive-teal)",
  },
]
