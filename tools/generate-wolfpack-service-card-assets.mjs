import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")
const outputDir = path.join(repoRoot, "public", "media", "wolfpack", "services")
const width = 1280
const height = 560

const services = [
  {
    slug: "suspension-lift-kits",
    title: "Suspension and lift kits",
    eyebrow: "STANCE / LOAD / CONTROL",
    alt: "Wolfpack 4x4 suspension and lift kit service card with full lifted ute and coilover components",
    variant: "suspension",
  },
  {
    slug: "bull-bars-protection",
    title: "Bull bars and protection",
    eyebrow: "FRONT END / ARMOUR / RECOVERY",
    alt: "Wolfpack 4x4 bull bar and protection service card with full front bar assembly",
    variant: "protection",
  },
  {
    slug: "winches-recovery-gear",
    title: "Winches and recovery gear",
    eyebrow: "WINCHES / POINTS / TRACKS",
    alt: "Wolfpack 4x4 winch and recovery gear service card with winch drum hook and recovery boards",
    variant: "recovery",
  },
  {
    slug: "4x4-lighting-electrical",
    title: "4x4 lighting and electrical",
    eyebrow: "BEAMS / SWITCHING / POWER",
    alt: "Wolfpack 4x4 lighting and electrical service card with light bar driving lights and wiring",
    variant: "lighting",
  },
  {
    slug: "dual-battery-systems",
    title: "Dual battery systems",
    eyebrow: "BATTERY / CHARGE / CONTROL",
    alt: "Wolfpack 4x4 dual battery system service card with battery boxes charger and wiring",
    variant: "battery",
  },
  {
    slug: "canopies-roof-racks-storage",
    title: "Canopies, racks and storage",
    eyebrow: "CANOPY / RACK / DRAWERS",
    alt: "Wolfpack 4x4 canopy roof rack and storage service card with ute canopy drawer and awning layout",
    variant: "touring",
  },
  {
    slug: "towing-gvm-upgrades",
    title: "Towing and GVM support",
    eyebrow: "TOWING / LOAD / PAYLOAD",
    alt: "Wolfpack 4x4 towing and GVM service card with tow hitch load support and rear ute stance",
    variant: "towing",
  },
  {
    slug: "performance-4x4-upgrades",
    title: "Performance 4x4 upgrades",
    eyebrow: "INTAKE / RESPONSE / DRIVE",
    alt: "Wolfpack 4x4 performance upgrade service card with snorkel intake and engine bay support parts",
    variant: "performance",
  },
  {
    slug: "4x4-parts-accessories",
    title: "4x4 parts and accessories",
    eyebrow: "PARTS / FITMENT / SUPPORT",
    alt: "Wolfpack 4x4 parts and accessories service card with organised upgrade parts on a workshop bench",
    variant: "parts",
  },
]

const accent = {
  blue: "#008cff",
  cyan: "#20d7ff",
  purple: "#7d31ff",
  violet: "#b44cff",
  ink: "#05070d",
  steel: "#d8e4f1",
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function neonLine(x1, y1, x2, y2, color = "url(#wolfpackBlue)", widthValue = 5, opacity = 1) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${widthValue}" stroke-linecap="round" opacity="${opacity}" filter="url(#glow)"/>`
}

function tyre(x, y, r = 54) {
  const treads = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 360) / 16
    return `<rect x="${x - 7}" y="${y - r - 8}" width="14" height="22" rx="3" fill="#0a0d14" stroke="#283247" stroke-width="2" transform="rotate(${angle} ${x} ${y})"/>`
  }).join("")
  return `
    <g>
      ${treads}
      <circle cx="${x}" cy="${y}" r="${r}" fill="#05070b" stroke="#6e7483" stroke-width="8"/>
      <circle cx="${x}" cy="${y}" r="${r - 18}" fill="#0d111b" stroke="url(#wolfpackBlue)" stroke-width="5"/>
      <circle cx="${x}" cy="${y}" r="12" fill="#1d2330" stroke="${accent.purple}" stroke-width="4"/>
      ${Array.from({ length: 8 }, (_, i) => `<circle cx="${x + Math.cos((i * Math.PI) / 4) * 26}" cy="${y + Math.sin((i * Math.PI) / 4) * 26}" r="4" fill="${i % 2 ? accent.purple : accent.blue}"/>`).join("")}
    </g>`
}

function wolfBadge(x, y, scale = 1) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" filter="url(#glow)">
      <path d="M0 -52 L37 -20 L54 32 L18 57 L0 37 L-18 57 L-54 32 L-37 -20Z" fill="#080b13" stroke="url(#wolfpackBlue)" stroke-width="7"/>
      <path d="M-25 -4 L-8 10 L-20 21 M25 -4 L8 10 L20 21" fill="none" stroke="${accent.purple}" stroke-width="6" stroke-linecap="round"/>
      <path d="M-14 31 L0 43 L14 31" fill="none" stroke="#eef6ff" stroke-width="5" stroke-linecap="round"/>
    </g>`
}

function uteSide({ canopy = false, rack = false, snorkel = false, rear = false } = {}) {
  const body = rear
    ? `<path d="M280 226 H835 L920 278 V356 H246 V292Z" fill="#090d15" stroke="#c8d5e4" stroke-width="6"/>
       <path d="M770 224 H902 L952 278 V346 H790Z" fill="#0e1320" stroke="#52617a" stroke-width="5"/>`
    : `<path d="M182 286 L247 218 H490 L565 286 H1036 L1102 336 V371 H149 V333Z" fill="#090d15" stroke="#cbd7e7" stroke-width="6"/>
       <path d="M284 230 H462 L524 286 H240Z" fill="#111827" stroke="#52617a" stroke-width="5"/>
       <path d="M584 250 H884 L1012 292 H566Z" fill="#0d1220" stroke="#52617a" stroke-width="5"/>`
  const tray = canopy
    ? `<path d="M612 198 H932 L1028 286 H578 L602 228Z" fill="#0b0f18" stroke="url(#wolfpackBlue)" stroke-width="6"/>
       <path d="M650 222 H836 L878 270 H628Z" fill="#111827" stroke="#465979" stroke-width="4"/>`
    : ""
  const roof = rack ? `<path d="M610 176 H930" stroke="#dce8f7" stroke-width="7" stroke-linecap="round"/><path d="M650 158 H895" stroke="url(#wolfpackPurple)" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>` : ""
  const snork = snorkel ? `<path d="M246 218 C222 160 236 122 286 112" fill="none" stroke="#dce8f7" stroke-width="14" stroke-linecap="round"/><circle cx="292" cy="112" r="18" fill="#070a10" stroke="url(#wolfpackBlue)" stroke-width="5"/>` : ""

  return `
    <g>
      <ellipse cx="640" cy="421" rx="500" ry="36" fill="#020306" opacity=".62"/>
      ${snork}
      ${body}
      ${tray}
      ${roof}
      <path d="M190 319 C362 270 529 303 686 285 C823 270 970 286 1086 333" fill="none" stroke="url(#slash)" stroke-width="8" opacity=".86"/>
      <path d="M250 362 H1025" stroke="#273348" stroke-width="8"/>
      ${neonLine(296, 308, 475, 289, "url(#wolfpackBlue)", 5, 0.9)}
      ${neonLine(585, 316, 965, 316, "url(#wolfpackPurple)", 5, 0.8)}
      ${tyre(322, 374, 58)}
      ${tyre(926, 374, 58)}
      ${wolfBadge(701, 324, 0.38)}
    </g>`
}

function coilover(x, y, scale = 1, rotate = -16) {
  const coils = Array.from({ length: 8 }, (_, i) => {
    const yy = -92 + i * 24
    return `<path d="M-34 ${yy} C-8 ${yy - 18} 8 ${yy + 18} 34 ${yy}" fill="none" stroke="${i % 2 ? accent.purple : accent.blue}" stroke-width="7" stroke-linecap="round"/>`
  }).join("")
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" filter="url(#shadow)">
      <rect x="-16" y="-132" width="32" height="264" rx="12" fill="#dbe6f4" stroke="#111827" stroke-width="5"/>
      ${coils}
      <circle cx="0" cy="-152" r="24" fill="#070a11" stroke="url(#wolfpackBlue)" stroke-width="6"/>
      <circle cx="0" cy="152" r="24" fill="#070a11" stroke="url(#wolfpackPurple)" stroke-width="6"/>
    </g>`
}

function suspensionSubject() {
  return `
    ${uteSide({ rack: true })}
    ${coilover(188, 260, 0.82, -19)}
    ${coilover(1060, 260, 0.74, 17)}
    <path d="M377 452 C486 488 772 486 884 452" fill="none" stroke="url(#wolfpackBlue)" stroke-width="8" stroke-linecap="round" opacity=".75"/>`
}

function protectionSubject() {
  return `
    <g filter="url(#shadow)">
      <path d="M337 160 H840 L940 242 V389 H244 V242Z" fill="#090c13" stroke="#d5dfed" stroke-width="7"/>
      <path d="M382 184 H793 L872 249 H304Z" fill="#101827" stroke="#53627a" stroke-width="5"/>
      <path d="M250 316 H940 L1014 376 V421 H177 V376Z" fill="#070a10" stroke="#aeb9c8" stroke-width="8"/>
      <path d="M207 350 H984 M304 304 H876 M410 275 H768" stroke="url(#wolfpackBlue)" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
      <rect x="281" y="348" width="154" height="42" rx="11" fill="#0e1320" stroke="${accent.purple}" stroke-width="5"/>
      <rect x="756" y="348" width="154" height="42" rx="11" fill="#0e1320" stroke="${accent.blue}" stroke-width="5"/>
      <circle cx="358" cy="369" r="15" fill="${accent.blue}"/>
      <circle cx="833" cy="369" r="15" fill="${accent.purple}"/>
      <path d="M188 421 H1000" stroke="#252e40" stroke-width="14" stroke-linecap="round"/>
      ${wolfBadge(596, 348, 0.5)}
    </g>`
}

function recoverySubject() {
  return `
    <g filter="url(#shadow)">
      <rect x="263" y="205" width="446" height="142" rx="28" fill="#070a10" stroke="#dbe6f4" stroke-width="8"/>
      <rect x="332" y="241" width="305" height="70" rx="24" fill="#121826" stroke="url(#wolfpackBlue)" stroke-width="6"/>
      <path d="M374 276 H592" stroke="#d8e4f1" stroke-width="18" stroke-linecap="round"/>
      <path d="M405 240 V312 M455 240 V312 M505 240 V312 M555 240 V312" stroke="${accent.purple}" stroke-width="6" opacity=".84"/>
      <path d="M638 276 C760 274 805 330 746 382 C711 413 649 398 655 343" fill="none" stroke="#dbe6f4" stroke-width="16" stroke-linecap="round"/>
      <path d="M632 275 H742" stroke="url(#wolfpackPurple)" stroke-width="9" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M806 171 L955 141 L1002 376 L852 407Z" fill="#0a0f18" stroke="url(#wolfpackBlue)" stroke-width="7"/>
      <path d="M855 185 L930 170 M866 233 L941 218 M876 281 L952 266 M887 330 L963 315" stroke="${accent.purple}" stroke-width="9" stroke-linecap="round"/>
      <path d="M219 376 H697" stroke="#273348" stroke-width="12" stroke-linecap="round"/>
      ${wolfBadge(226, 218, 0.44)}
    </g>`
}

function lightingSubject() {
  const leds = Array.from({ length: 18 }, (_, i) => `<circle cx="${333 + i * 34}" cy="258" r="9" fill="${i % 2 ? accent.purple : accent.cyan}" filter="url(#glow)"/>`).join("")
  return `
    <g filter="url(#shadow)">
      <rect x="292" y="214" width="696" height="90" rx="18" fill="#070a10" stroke="#dce8f7" stroke-width="7"/>
      <rect x="321" y="238" width="638" height="42" rx="12" fill="#101827" stroke="url(#wolfpackBlue)" stroke-width="4"/>
      ${leds}
      <circle cx="355" cy="377" r="74" fill="#070a10" stroke="#dce8f7" stroke-width="7"/>
      <circle cx="925" cy="377" r="74" fill="#070a10" stroke="#dce8f7" stroke-width="7"/>
      <circle cx="355" cy="377" r="43" fill="#101827" stroke="url(#wolfpackBlue)" stroke-width="6"/>
      <circle cx="925" cy="377" r="43" fill="#101827" stroke="url(#wolfpackPurple)" stroke-width="6"/>
      ${neonLine(440, 377, 840, 377, "url(#wolfpackBlue)", 7, 0.75)}
      <path d="M404 431 C530 481 751 481 876 431" fill="none" stroke="#2b3548" stroke-width="10" stroke-linecap="round"/>
      ${wolfBadge(640, 375, 0.46)}
    </g>`
}

function batterySubject() {
  return `
    <g filter="url(#shadow)">
      <rect x="242" y="218" width="257" height="173" rx="22" fill="#090d15" stroke="#dce8f7" stroke-width="7"/>
      <rect x="781" y="218" width="257" height="173" rx="22" fill="#090d15" stroke="#dce8f7" stroke-width="7"/>
      <rect x="292" y="189" width="75" height="35" rx="9" fill="#121826" stroke="url(#wolfpackBlue)" stroke-width="5"/>
      <rect x="914" y="189" width="75" height="35" rx="9" fill="#121826" stroke="url(#wolfpackPurple)" stroke-width="5"/>
      <text x="371" y="310" text-anchor="middle" class="subjectText">BATTERY A</text>
      <text x="910" y="310" text-anchor="middle" class="subjectText">BATTERY B</text>
      <rect x="540" y="202" width="200" height="205" rx="26" fill="#070a10" stroke="url(#wolfpackBlue)" stroke-width="7"/>
      <text x="640" y="276" text-anchor="middle" class="subjectText">DC/DC</text>
      <text x="640" y="328" text-anchor="middle" class="microText">CHARGE</text>
      <path d="M499 300 C538 247 540 250 540 250 M740 250 C781 250 781 301 781 301" fill="none" stroke="${accent.blue}" stroke-width="9" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M499 340 C539 399 540 392 540 392 M740 392 C781 392 781 341 781 341" fill="none" stroke="${accent.purple}" stroke-width="9" stroke-linecap="round" filter="url(#glow)"/>
      ${wolfBadge(640, 388, 0.35)}
    </g>`
}

function touringSubject() {
  return `
    ${uteSide({ canopy: true, rack: true })}
    <g filter="url(#shadow)">
      <rect x="516" y="389" width="352" height="58" rx="12" fill="#070a10" stroke="#dce8f7" stroke-width="5"/>
      <path d="M548 417 H835 M650 389 V447 M758 389 V447" stroke="url(#wolfpackBlue)" stroke-width="5"/>
      <path d="M879 194 H1118 L1160 238 H907Z" fill="#0a0f18" stroke="url(#wolfpackPurple)" stroke-width="5"/>
      <path d="M909 226 H1150" stroke="${accent.blue}" stroke-width="6" stroke-linecap="round"/>
    </g>`
}

function towingSubject() {
  return `
    ${uteSide({ rear: true })}
    <g filter="url(#shadow)">
      <path d="M924 364 H1072" stroke="#dce8f7" stroke-width="16" stroke-linecap="round"/>
      <circle cx="1103" cy="364" r="25" fill="#070a10" stroke="url(#wolfpackBlue)" stroke-width="8"/>
      <path d="M1098 364 H1170" stroke="${accent.purple}" stroke-width="9" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M213 166 H451 L493 236 H172Z" fill="#090d15" stroke="url(#wolfpackPurple)" stroke-width="6"/>
      <text x="333" y="214" text-anchor="middle" class="subjectText">GVM</text>
      <path d="M302 240 L255 306 M364 240 L411 306" stroke="#dce8f7" stroke-width="8" stroke-linecap="round"/>
      <path d="M233 308 H434" stroke="url(#wolfpackBlue)" stroke-width="7" stroke-linecap="round"/>
    </g>`
}

function performanceSubject() {
  return `
    <g filter="url(#shadow)">
      <path d="M226 360 C278 237 432 197 554 250 C638 287 720 238 825 203 C918 172 1033 198 1084 287" fill="#090d15" stroke="#dce8f7" stroke-width="7"/>
      <path d="M282 337 C390 283 489 306 579 335 C710 379 818 262 1001 278" fill="none" stroke="url(#wolfpackBlue)" stroke-width="10" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M196 355 H1082 V432 H196Z" fill="#070a10" stroke="#52617a" stroke-width="6"/>
      <path d="M385 226 C322 131 347 88 448 72" fill="none" stroke="#dce8f7" stroke-width="15" stroke-linecap="round"/>
      <circle cx="456" cy="72" r="28" fill="#070a10" stroke="url(#wolfpackPurple)" stroke-width="7"/>
      <circle cx="738" cy="320" r="62" fill="#070a10" stroke="#dce8f7" stroke-width="7"/>
      <path d="M738 320 L773 281" stroke="${accent.purple}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="738" cy="320" r="15" fill="${accent.blue}"/>
      <rect x="514" y="382" width="266" height="50" rx="12" fill="#121826" stroke="url(#wolfpackBlue)" stroke-width="5"/>
      ${wolfBadge(638, 254, 0.42)}
    </g>`
}

function partsSubject() {
  const boxes = [
    [212, 234, 184, 122, "FILTER"],
    [438, 196, 174, 160, "LIGHT"],
    [658, 226, 185, 130, "TOW"],
    [884, 196, 188, 160, "KIT"],
  ]
  return `
    <g filter="url(#shadow)">
      <path d="M144 391 H1136 V452 H144Z" fill="#090d15" stroke="#dce8f7" stroke-width="6"/>
      ${boxes
        .map(
          ([x, y, w, h, label], i) => `
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#070a10" stroke="${i % 2 ? "url(#wolfpackPurple)" : "url(#wolfpackBlue)"}" stroke-width="6"/>
            <path d="M${x + 22} ${y + 35} H${x + w - 22} M${x + 22} ${y + h - 35} H${x + w - 22}" stroke="#53627a" stroke-width="5" stroke-linecap="round"/>
            <text x="${x + w / 2}" y="${y + h / 2 + 13}" text-anchor="middle" class="subjectText">${label}</text>`,
        )
        .join("")}
      <path d="M237 423 H1031" stroke="url(#wolfpackBlue)" stroke-width="7" stroke-linecap="round" filter="url(#glow)"/>
      ${wolfBadge(640, 386, 0.38)}
    </g>`
}

function subjectFor(variant) {
  switch (variant) {
    case "suspension":
      return suspensionSubject()
    case "protection":
      return protectionSubject()
    case "recovery":
      return recoverySubject()
    case "lighting":
      return lightingSubject()
    case "battery":
      return batterySubject()
    case "touring":
      return touringSubject()
    case "towing":
      return towingSubject()
    case "performance":
      return performanceSubject()
    case "parts":
    default:
      return partsSubject()
  }
}

function chromeFrame(service) {
  return `
    <rect x="32" y="32" width="1216" height="496" rx="26" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
    <rect x="54" y="52" width="202" height="48" rx="14" fill="#05070d" stroke="url(#wolfpackBlue)" stroke-width="3" filter="url(#glow)"/>
    ${wolfBadge(81, 76, 0.2)}
    <text x="112" y="83" class="brandText">WOLFPACK 4X4</text>
    <text x="1028" y="87" class="microText" text-anchor="end">${esc(service.eyebrow)}</text>
    <text x="1028" y="494" class="titleText" text-anchor="end">${esc(service.title)}</text>
    <path d="M76 476 H364" stroke="url(#wolfpackBlue)" stroke-width="5" stroke-linecap="round" filter="url(#glow)"/>
    <path d="M916 111 H1200" stroke="url(#wolfpackPurple)" stroke-width="4" stroke-linecap="round" opacity=".72"/>
  `
}

function background() {
  const floorLines = Array.from({ length: 9 }, (_, i) => {
    const y = 390 + i * 18
    return `<path d="M${80 - i * 22} ${y} H${1200 + i * 22}" stroke="rgba(255,255,255,.06)" stroke-width="2"/>`
  }).join("")
  const verticals = Array.from({ length: 11 }, (_, i) => {
    const x = 102 + i * 112
    return `<path d="M${x} 128 L${x + (i - 5) * 24} 529" stroke="rgba(0,140,255,.08)" stroke-width="2"/>`
  }).join("")

  return `
    <rect width="1280" height="560" fill="#03050a"/>
    <rect width="1280" height="560" fill="url(#bayGlow)" opacity=".94"/>
    <path d="M0 383 H1280 V560 H0Z" fill="url(#floorGlow)" opacity=".85"/>
    ${floorLines}
    ${verticals}
    <path d="M72 135 H1208 M72 167 H1208 M72 199 H1208" stroke="rgba(255,255,255,.035)" stroke-width="2"/>
    <path d="M74 119 C259 63 421 94 566 121 C722 151 910 114 1198 73" fill="none" stroke="url(#slash)" stroke-width="6" opacity=".26"/>
    <text x="640" y="315" text-anchor="middle" class="watermarkText">WOLFPACK</text>
  `
}

function svgFor(service) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="wolfpackBlue" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${accent.cyan}"/>
      <stop offset=".48" stop-color="${accent.blue}"/>
      <stop offset="1" stop-color="#2358ff"/>
    </linearGradient>
    <linearGradient id="wolfpackPurple" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${accent.violet}"/>
      <stop offset=".5" stop-color="${accent.purple}"/>
      <stop offset="1" stop-color="#3556ff"/>
    </linearGradient>
    <linearGradient id="slash" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${accent.blue}"/>
      <stop offset=".5" stop-color="${accent.purple}"/>
      <stop offset="1" stop-color="${accent.cyan}"/>
    </linearGradient>
    <radialGradient id="bayGlow" cx="50%" cy="52%" r="70%">
      <stop offset="0" stop-color="#152647"/>
      <stop offset=".36" stop-color="#090d1b"/>
      <stop offset=".78" stop-color="#03050a"/>
      <stop offset="1" stop-color="#010207"/>
    </radialGradient>
    <linearGradient id="floorGlow" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#071b35"/>
      <stop offset=".5" stop-color="#080910"/>
      <stop offset="1" stop-color="#251049"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="15" flood-color="#000000" flood-opacity=".58"/>
    </filter>
    <style>
      .brandText { font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 900; letter-spacing: 2px; fill: #eef6ff; }
      .microText { font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 900; letter-spacing: 3px; fill: #c9d6e7; }
      .titleText { font-family: Impact, Arial Black, Arial, sans-serif; font-size: 42px; letter-spacing: 1px; fill: #eef6ff; paint-order: stroke; stroke: rgba(0,0,0,.4); stroke-width: 4px; }
      .watermarkText { font-family: Impact, Arial Black, Arial, sans-serif; font-size: 154px; letter-spacing: 4px; fill: rgba(255,255,255,.026); }
      .subjectText { font-family: Arial Black, Arial, sans-serif; font-size: 30px; letter-spacing: 2px; fill: #eef6ff; }
    </style>
  </defs>
  ${background()}
  <g transform="translate(0 0)">
    ${subjectFor(service.variant)}
  </g>
  ${chromeFrame(service)}
</svg>`
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true })

  const manifest = []
  for (const service of services) {
    const svg = svgFor(service)
    const svgPath = path.join(outputDir, `${service.slug}.svg`)
    const pngPath = path.join(outputDir, `${service.slug}.png`)
    fs.writeFileSync(svgPath, svg)
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngPath)
    manifest.push({
      slug: service.slug,
      src: `/media/wolfpack/services/${service.slug}.png`,
      svg: `/media/wolfpack/services/${service.slug}.svg`,
      title: `${service.title} | Wolfpack 4x4`,
      alt: service.alt,
      width,
      height,
    })
  }

  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify({ width, height, totalImages: manifest.length, services: manifest }, null, 2)}\n`,
  )

  console.log(`Generated ${manifest.length} Wolfpack service card images in ${path.relative(repoRoot, outputDir)}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
