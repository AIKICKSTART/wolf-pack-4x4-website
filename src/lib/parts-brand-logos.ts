export type PartsBrandLogoSurface = "light" | "dark"
export type PartsBrandLogoTheme = "light" | "dark"

export type PartsBrandLogo = {
  id: string
  name: string
  src: string
  sourcePage: string
  sourceAsset: string
  sourceType: "PNG" | "SVG" | "JPG" | "WEBP"
  surface: PartsBrandLogoSurface
  aliases: readonly string[]
}

export function getPartsBrandLogoThemeSrc(logo: Pick<PartsBrandLogo, "id">, theme: PartsBrandLogoTheme) {
  return `/media/parts/brand-logos/${theme}/${logo.id}.webp`
}

export const partsBrandLogos: readonly PartsBrandLogo[] = [
  {
    id: "manta",
    name: "Manta",
    src: "/media/parts/brand-logos/manta.webp",
    sourcePage: "https://www.mantapro.com.au/",
    sourceAsset: "https://www.pngkey.com/png/full/94-945308_manta-exhaust-logo-exhaust-system.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["manta", "manta performance", "manta pro"],
  },
  {
    id: "mpi-automotive",
    name: "MPI Automotive",
    src: "/media/parts/brand-logos/mpi-automotive.webp",
    sourcePage: "https://www.mpiautomotive.com/",
    sourceAsset: "https://www.mpiautomotive.com/media/logo/default/MPI_Automotive_logo_1.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["mpi", "mpi automotive", "mpiautomotive", "mpi automotive service range value"],
  },
  {
    id: "redback",
    name: "Redback",
    src: "/media/parts/brand-logos/redback.webp",
    sourcePage: "https://redbackexhausts.com.au/",
    sourceAsset: "https://redbackexhausts.com.au/cdn/shop/files/redback-shopify-logo_8a8683ad-d308-400a-9bc8-c7b4ce8e6c0f.png?v=1632092062",
    sourceType: "PNG",
    surface: "light",
    aliases: ["redback", "redback exhaust", "redback exhausts", "redback enviro"],
  },
  {
    id: "xforce",
    name: "XForce",
    src: "/media/parts/brand-logos/xforce.webp",
    sourcePage: "https://xforce.com.au/",
    sourceAsset: "https://xforce.com.au/cdn/shop/files/Xforce_Logo_Final_Black.png?v=1738295489",
    sourceType: "PNG",
    surface: "light",
    aliases: ["xforce", "x-force", "x force"],
  },
  {
    id: "pacemaker",
    name: "Pacemaker",
    src: "/media/parts/brand-logos/pacemaker.webp",
    sourcePage: "https://pacemaker.com.au/",
    sourceAsset: "https://cdn.shopify.com/s/files/1/0649/4761/8049/files/Pacemaker_Logo.svg?v=1676928427",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["pacemaker", "pacemaker australia", "pacemaker_adl", "pacemaker adl"],
  },
  {
    id: "lukey",
    name: "Lukey",
    src: "/media/parts/brand-logos/lukey.webp",
    sourcePage: "https://swd.com.au/",
    sourceAsset: "https://swd.com.au/cdn/shop/collections/lukey-logo.svg?v=1702985639&width=300",
    sourceType: "SVG",
    surface: "light",
    aliases: ["lukey", "lukey mufflers"],
  },
  {
    id: "tag",
    name: "TAG",
    src: "/media/parts/brand-logos/tag.webp",
    sourcePage: "https://www.tagtowbars.com.au/",
    sourceAsset: "https://www.tagtowbars.com.au/cdn/shop/files/tag-web-logo-badge_stkr.png?v=1632103119",
    sourceType: "PNG",
    surface: "dark",
    aliases: ["tag", "tag towbars"],
  },
  {
    id: "exhaust-systems-australia",
    name: "Exhaust Systems Australia",
    src: "/media/parts/brand-logos/exhaust-systems-australia.webp",
    sourcePage: "https://exhaustsystemsaustralia.com.au/",
    sourceAsset: "https://exhaustsystemsaustralia.com.au/cdn/shop/files/ExhaustSystemsAustralia-Logo.png?v=1706051626&width=760",
    sourceType: "PNG",
    surface: "light",
    aliases: ["esa", "exhaust systems australia"],
  },
  {
    id: "swd",
    name: "SWD",
    src: "/media/parts/brand-logos/swd.webp",
    sourcePage: "https://swd.com.au/",
    sourceAsset: "https://swd.com.au/cdn/shop/files/swd_logo_assembly_877x.jpg?v=1628041749",
    sourceType: "JPG",
    surface: "light",
    aliases: ["swd", "swd australia", "specialised wholesale distribution"],
  },
  {
    id: "csc-parts",
    name: "CSC Parts",
    src: "/media/parts/brand-logos/csc-parts.webp",
    sourcePage: "https://cscparts.com.au/",
    sourceAsset: "https://cscparts.com.au/wp-content/uploads/2023/10/CSC-Group-Australia-Minimal-Logo.svg",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["csc", "csc parts", "csc group", "csc group australia"],
  },
  {
    id: "silverback-armour",
    name: "Silverback Armour",
    src: "/media/parts/brand-logos/silverback-armour.webp",
    sourcePage: "https://silverbackarmour.com.au/",
    sourceAsset: "https://silverbackarmour.com.au/assets/images/Silverback-Armour-Logo.svg",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["silverback", "silverback armour", "silverback chrome", "silverback stainless"],
  },
  {
    id: "flowtech-advantage",
    name: "Flowtech Advantage",
    src: "/media/parts/brand-logos/flowtech-advantage.webp",
    sourcePage: "https://flowtechadvantage.com.au/about-us/",
    sourceAsset: "https://flowtechadvantage.com.au/wp-content/uploads/2022/11/Flowtech-Advantage-White-Logo.svg",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["flowtech", "flowtech advantage", "flow tech", "flow tech advantage"],
  },
  {
    id: "brink",
    name: "Brink",
    src: "/media/parts/brand-logos/brink.webp",
    sourcePage: "https://swd.com.au/collections/brink",
    sourceAsset: "https://swd.com.au/cdn/shop/collections/brink-logo.svg?v=1702985674",
    sourceType: "SVG",
    surface: "light",
    aliases: ["brink", "brink towbar", "brink towbars", "brink towing"],
  },
  {
    id: "husky-performance",
    name: "Husky Performance",
    src: "/media/parts/brand-logos/husky-performance.webp",
    sourcePage: "https://www.cscgroup.com.au/",
    sourceAsset: "https://www.cscgroup.com.au/wp-content/uploads/2022/10/husky-by-CSC-Group-Australia-300x225.png",
    sourceType: "PNG",
    surface: "dark",
    aliases: ["husky", "husky performance"],
  },
  {
    id: "thermal-armour",
    name: "Thermal Armour",
    src: "/media/parts/brand-logos/thermal-armour.webp",
    sourcePage: "https://www.cscgroup.com.au/",
    sourceAsset: "https://www.cscgroup.com.au/wp-content/uploads/2022/10/Thermal-Armour-logo-in-white-300x225.png",
    sourceType: "PNG",
    surface: "dark",
    aliases: ["thermal armour", "thermal armor"],
  },
  {
    id: "blue-diamond",
    name: "Blue Diamond",
    src: "/media/parts/brand-logos/blue-diamond.webp",
    sourcePage: "https://cscparts.com.au/brand/blue-diamond/",
    sourceAsset: "https://cscparts.com.au/wp-content/uploads/2025/06/Menu-Blue-Diamond.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["blue diamond"],
  },
  {
    id: "mission-euro",
    name: "Mission Euro",
    src: "/media/parts/brand-logos/mission-euro.webp",
    sourcePage: "https://www.missioneuro.com.au/",
    sourceAsset: "https://www.missioneuro.com.au/wp-content/uploads/2025/04/Mission-Euro-horizontal-v2-01.svg",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["mission euro"],
  },
  {
    id: "raw-4x4",
    name: "RAW 4x4",
    src: "/media/parts/brand-logos/raw-4x4.webp",
    sourcePage: "https://raw4x4.com.au/",
    sourceAsset: "https://raw4x4.com.au/wp-content/uploads/2024/04/Black-Claws-Suspension-Equip-logo_Scratch-Marks_1000x500mm.png",
    sourceType: "PNG",
    surface: "dark",
    aliases: ["raw", "raw 4x4", "raw4x4", "raw suspension"],
  },
  {
    id: "radius-fabrications",
    name: "Radius Fabrications",
    src: "/media/parts/brand-logos/radius-fabrications.webp",
    sourcePage: "https://radiusfabrications.com.au/",
    sourceAsset: "https://radiusfabrications.com.au/cdn/shop/files/radius-fabrications.jpg?v=1705377588&width=800",
    sourceType: "JPG",
    surface: "light",
    aliases: ["radius", "radius fabrications"],
  },
  {
    id: "kc-hilites",
    name: "KC HiLiTES",
    src: "/media/parts/brand-logos/kc-hilites.webp",
    sourcePage: "https://radiusfabrications.com.au/collections/kc-hilites",
    sourceAsset: "https://radiusfabrications.com.au/cdn/shop/collections/KCHiLites.Logo__53126.1562980871.webp?v=1730680746",
    sourceType: "WEBP",
    surface: "light",
    aliases: ["kc", "kc hilites", "kc hilites australia", "kchilites"],
  },
  {
    id: "cross-country-4x4",
    name: "Cross Country 4x4",
    src: "/media/parts/brand-logos/cross-country-4x4.webp",
    sourcePage: "https://crosscountry4x4.com.au/",
    sourceAsset: "https://crosscountry4x4.com.au/wp-content/uploads/2023/03/logo.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["cross country", "cross country 4x4"],
  },
  {
    id: "gen-y-hitch",
    name: "GEN-Y Hitch",
    src: "/media/parts/brand-logos/gen-y-hitch.webp",
    sourcePage: "https://genyhitch.com.au/",
    sourceAsset: "https://genyhitch.com.au/cdn/shop/files/new-geny-logo.png?v=1658972187&width=1200",
    sourceType: "PNG",
    surface: "light",
    aliases: ["gen y", "gen y hitch", "gen-y", "gen-y hitch", "geny hitch"],
  },
  {
    id: "erich-jaeger",
    name: "Erich Jaeger",
    src: "/media/parts/brand-logos/erich-jaeger.webp",
    sourcePage: "https://www.erich-jaeger.com/en/company",
    sourceAsset: "https://www.erich-jaeger.com/_assets/55402c888ca2a1fbc7e9ae6dcb816da2/Images/Erich-Jaeger-Logo_2024.svg",
    sourceType: "SVG",
    surface: "light",
    aliases: ["erich jaeger", "erich jager", "erich-jaeger", "jaeger", "jager"],
  },
  {
    id: "safari",
    name: "Safari 4x4",
    src: "/media/parts/brand-logos/safari.webp",
    sourcePage: "https://safari4x4.com.au/",
    sourceAsset: "https://safari4x4.com.au/ts1687840284/attachments/CmsSetting/5/safari_logo_white.png",
    sourceType: "WEBP",
    surface: "dark",
    aliases: ["safari", "safari 4x4", "sarafi"],
  },
  {
    id: "ultimate9",
    name: "Ultimate9",
    src: "/media/parts/brand-logos/ultimate9.webp",
    sourcePage: "https://www.ultimate9.co/au/",
    sourceAsset: "https://www.ultimate9.co/static/version1779848142/frontend/Ultimate/default/en_AU/images/logo.svg",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["ultimate9", "ultimate 9"],
  },
  {
    id: "curt",
    name: "CURT",
    src: "/media/parts/brand-logos/curt.webp",
    sourcePage: "https://www.curtmfg.com/",
    sourceAsset: "https://www.curtmfg.com/media/images/top-nav-logos/curt-logo.svg",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["curt", "curt manufacturing"],
  },
  {
    id: "ultibend",
    name: "UltiBend",
    src: "/media/parts/brand-logos/ultibend.webp",
    sourcePage: "https://swd.com.au/collections/ultibend",
    sourceAsset: "https://swd.com.au/cdn/shop/collections/ultibend-logo.svg?v=1702986105",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["ultibend", "ultibend stainless", "ulti bend"],
  },
  {
    id: "xtraseal",
    name: "Xtraseal",
    src: "/media/parts/brand-logos/xtraseal.webp",
    sourcePage: "https://swd.com.au/collections/xtraseal",
    sourceAsset: "https://swd.com.au/cdn/shop/collections/xtraseal_logo.png?v=1702986694",
    sourceType: "PNG",
    surface: "light",
    aliases: ["xtraseal", "xtra seal"],
  },
  {
    id: "torca",
    name: "Torca",
    src: "/media/parts/brand-logos/torca.webp",
    sourcePage: "https://www.normaamericasds.com/product/torca-torctite-exhaust-clamp",
    sourceAsset: "https://www.normaamericasds.com/sites/default/files/2019-06/Torca-small-blue.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["torca", "torctite", "torctite clamps", "torctite clamp", "torca torctite"],
  },
  {
    id: "roadbase",
    name: "RoadBase",
    src: "/media/parts/brand-logos/roadbase.webp",
    sourcePage: "https://cscparts.com.au/brand/roadbase/",
    sourceAsset: "https://cscparts.com.au/wp-content/uploads/2026/03/Roadbase-logo.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["roadbase", "road base"],
  },
  {
    id: "dinex",
    name: "DINEX",
    src: "/media/parts/brand-logos/dinex.webp",
    sourcePage: "https://www.dinex.eu/",
    sourceAsset: "https://www.dinex.eu/img/dinex.svg",
    sourceType: "SVG",
    surface: "light",
    aliases: ["dinex"],
  },
  {
    id: "wombat",
    name: "Wombat",
    src: "/media/parts/brand-logos/wombat.webp",
    sourcePage: "https://cscparts.com.au/brand/wombat/",
    sourceAsset: "https://cscparts.com.au/wp-content/uploads/2026/03/Wombat-logo.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["wombat"],
  },
  {
    id: "ufi-filters",
    name: "UFI Filters",
    src: "/media/parts/brand-logos/ufi-filters.webp",
    sourcePage: "https://www.ufifilters.com/",
    sourceAsset: "https://www.ufifilters.com/wp-content/uploads/2020/03/loghi-testata.png",
    sourceType: "PNG",
    surface: "light",
    aliases: ["ufi", "ufi filters"],
  },
  {
    id: "diode-dynamics",
    name: "Diode Dynamics",
    src: "/media/parts/brand-logos/diode-dynamics.webp",
    sourcePage: "https://www.diodedynamics.com/",
    sourceAsset: "https://www.diodedynamics.com/",
    sourceType: "SVG",
    surface: "dark",
    aliases: ["diode dynamics"],
  },
  {
    id: "infinite-rule",
    name: "Infinite Rule",
    src: "/media/parts/brand-logos/infinite-rule.webp",
    sourcePage: "https://infiniterule.com/",
    sourceAsset: "https://infiniterule.com/wp-content/uploads/2020/12/InfiniteRuleLogo.svg",
    sourceType: "SVG",
    surface: "light",
    aliases: ["infinite rule", "infiniterule"],
  },
]

function normalizeBrandKey(value: string) {
  return value
    .replace(/&/g, " and ")
    .replace(/[_-]/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\b(pty|ltd|limited|australia|automotive)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

const logoLookup = new Map<string, PartsBrandLogo>()

for (const logo of partsBrandLogos) {
  logoLookup.set(normalizeBrandKey(logo.id), logo)
  logoLookup.set(normalizeBrandKey(logo.name), logo)

  for (const alias of logo.aliases) {
    logoLookup.set(normalizeBrandKey(alias), logo)
  }
}

function matchesNormalizedBrand(candidate: string, key: string) {
  if (candidate === key) return true

  const candidateTokens = candidate.split(" ")
  const keyTokens = key.split(" ")

  if (keyTokens.length === 1) {
    return candidateTokens.includes(key)
  }

  const paddedCandidate = ` ${candidate} `
  return paddedCandidate.includes(` ${key} `)
}

export function findPartsBrandLogo(...candidates: Array<string | null | undefined>) {
  for (const candidate of candidates) {
    const normalized = normalizeBrandKey(candidate ?? "")
    if (!normalized) continue

    const direct = logoLookup.get(normalized)
    if (direct) return direct

    for (const [key, logo] of logoLookup) {
      if (matchesNormalizedBrand(normalized, key)) {
        return logo
      }
    }
  }

  return undefined
}
