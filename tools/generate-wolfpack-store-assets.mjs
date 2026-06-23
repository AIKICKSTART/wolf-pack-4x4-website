import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")
const productsPath = path.join(repoRoot, "data", "wolfpack-store-products.json")
const outputDir = path.join(repoRoot, "public", "media", "wolfpack", "store")

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"))
const views = ["front", "back", "side", "detail"]
const size = 1200

const categoryAccent = new Map([
  ["Apparel", ["#008cff", "#7c2cff"]],
  ["Headwear", ["#00b8ff", "#6f35ff"]],
  ["Camp Gear", ["#18b6ff", "#8b36ff"]],
  ["Recovery", ["#169bff", "#5d33f6"]],
  ["Lighting", ["#00d4ff", "#742dff"]],
  ["Protection", ["#008cff", "#5928ff"]],
  ["Touring Storage", ["#16a4ff", "#7d34ff"]],
  ["Suspension", ["#0a91ff", "#8f34ff"]],
  ["Performance", ["#00b8ff", "#723cff"]],
])

const motifs = [
  { key: "alpha", label: "ALPHA", icon: "wolf", line: "LEAD" },
  { key: "summit", label: "SUMMIT", icon: "mountain", line: "CLIMB" },
  { key: "recovery", label: "RECOVERY", icon: "hook", line: "PULL" },
  { key: "storm", label: "STORM", icon: "bolt", line: "STRIKE" },
  { key: "coastal", label: "COAST", icon: "wave", line: "ROAM" },
  { key: "forge", label: "FORGE", icon: "plate", line: "BUILD" },
  { key: "touring", label: "TOURING", icon: "compass", line: "RANGE" },
  { key: "night", label: "NIGHT", icon: "beam", line: "LIGHT" },
  { key: "payload", label: "PAYLOAD", icon: "spring", line: "CARRY" },
  { key: "track", label: "TRACK", icon: "tread", line: "GRIP" },
  { key: "camp", label: "CAMP", icon: "flame", line: "BASE" },
  { key: "badge", label: "BADGE", icon: "paw", line: "PACK" },
]

const trimStyles = ["slash", "chevron", "hex", "topo", "tread", "circuit", "rally", "signal"]

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function slugLabel(value, max = 26) {
  const text = String(value).toUpperCase()
  return text.length <= max ? text : `${text.slice(0, max - 3)}...`
}

function hashString(value) {
  let hash = 2166136261
  for (const char of value) {
    hash ^= char.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function productTheme(product, view) {
  const seed = hashString(`${product.id}:${view}`)
  const base = categoryAccent.get(product.category) ?? ["#008cff", "#7c2cff"]
  return {
    seed,
    blue: base[0],
    purple: base[1],
    motif: motifs[seed % motifs.length],
    trim: trimStyles[Math.floor(seed / 7) % trimStyles.length],
    packNo: String((seed % 89) + 11).padStart(2, "0"),
    angle: (seed % 42) - 21,
    bandY: 410 + (seed % 170),
    shift: (seed % 160) - 80,
    detailCode: product.id
      .split("-")
      .map((part) => part.slice(0, 2).toUpperCase())
      .join(""),
  }
}

function motifIcon(theme, x, y, scale = 1, opacity = 1) {
  const stroke = theme.blue
  const fill = theme.purple
  const common = `transform="translate(${x} ${y}) scale(${scale})" opacity="${opacity}" filter="url(#softGlow)"`

  switch (theme.motif.icon) {
    case "wolf":
      return `<g ${common}><path d="M0 -74 L50 -28 L72 42 L28 74 L0 48 L-28 74 L-72 42 L-50 -28Z" fill="#05070c" stroke="${stroke}" stroke-width="9"/><path d="M-34 -8 L-10 10 L-24 22 M34 -8 L10 10 L24 22" fill="none" stroke="${fill}" stroke-width="8" stroke-linecap="round"/><path d="M-18 38 L0 52 L18 38" fill="none" stroke="#f1f6ff" stroke-width="7" stroke-linecap="round"/></g>`
    case "mountain":
      return `<g ${common}><path d="M-84 66 L-28 -58 L16 20 L48 -28 L94 66Z" fill="#07090e" stroke="${stroke}" stroke-width="9"/><path d="M-28 -58 L-8 -15 L-42 -18 M48 -28 L62 2 L36 -2" fill="none" stroke="${fill}" stroke-width="8"/></g>`
    case "hook":
      return `<g ${common}><path d="M-42 -72 C38 -52 62 8 28 56 C4 90 -56 74 -50 22" fill="none" stroke="${stroke}" stroke-width="18" stroke-linecap="round"/><path d="M-70 -20 L-30 28 L-2 -34" fill="none" stroke="${fill}" stroke-width="12" stroke-linecap="round"/></g>`
    case "bolt":
      return `<g ${common}><path d="M8 -88 L-62 18 H-8 L-24 90 L70 -34 H16Z" fill="${fill}" stroke="${stroke}" stroke-width="8"/></g>`
    case "wave":
      return `<g ${common}><path d="M-96 20 C-58 -38 -12 -38 26 20 C48 54 76 54 98 18" fill="none" stroke="${stroke}" stroke-width="15" stroke-linecap="round"/><path d="M-86 54 C-48 8 -18 8 18 54 C42 82 72 82 96 52" fill="none" stroke="${fill}" stroke-width="11" stroke-linecap="round"/></g>`
    case "plate":
      return `<g ${common}><path d="M-78 -48 H78 L100 -18 V58 L70 84 H-70 L-100 58 V-18Z" fill="#06080d" stroke="${stroke}" stroke-width="8"/><circle cx="-48" cy="-12" r="10" fill="${fill}"/><circle cx="48" cy="-12" r="10" fill="${fill}"/><path d="M-42 40 H42" stroke="#eef5ff" stroke-width="10" stroke-linecap="round"/></g>`
    case "compass":
      return `<g ${common}><circle cx="0" cy="0" r="84" fill="#06080d" stroke="${stroke}" stroke-width="8"/><path d="M0 -70 L25 20 L0 70 L-25 20Z" fill="${fill}" stroke="#eef5ff" stroke-width="5"/><path d="M-70 0 H70 M0 -70 V70" stroke="${stroke}" stroke-width="5" opacity=".7"/></g>`
    case "beam":
      return `<g ${common}><rect x="-86" y="-42" width="172" height="84" rx="20" fill="#05070c" stroke="${stroke}" stroke-width="8"/><circle cx="-42" cy="0" r="18" fill="${fill}"/><circle cx="0" cy="0" r="18" fill="${stroke}"/><circle cx="42" cy="0" r="18" fill="${fill}"/><path d="M96 -26 L156 -52 M96 0 H166 M96 26 L156 52" stroke="${stroke}" stroke-width="8" stroke-linecap="round"/></g>`
    case "spring":
      return `<g ${common}><path d="M-64 -66 C34 -104 34 -36 -42 -48 C-118 -60 -104 8 -18 -8 C68 -24 72 46 -28 32 C-112 20 -112 84 -10 62 C52 48 80 70 90 92" fill="none" stroke="${stroke}" stroke-width="13" stroke-linecap="round"/><path d="M36 -72 L74 72" stroke="${fill}" stroke-width="10" stroke-linecap="round"/></g>`
    case "tread":
      return `<g ${common}>${Array.from({ length: 6 }, (_, i) => `<path d="M${-84 + i * 34} -70 L${-58 + i * 34} -42 V70 L${-84 + i * 34} 42Z" fill="${i % 2 ? fill : stroke}" opacity=".9"/>`).join("")}</g>`
    case "flame":
      return `<g ${common}><path d="M0 -86 C68 -20 84 42 28 84 C-34 118 -100 42 -34 -18 C-18 -34 -18 -62 0 -86Z" fill="${fill}" stroke="${stroke}" stroke-width="8"/><path d="M0 -18 C32 18 32 50 2 66 C-28 48 -22 18 0 -18Z" fill="#05070c"/></g>`
    case "paw":
    default:
      return `<g ${common}><circle cx="-52" cy="-30" r="24" fill="${stroke}"/><circle cx="0" cy="-54" r="25" fill="${fill}"/><circle cx="52" cy="-30" r="24" fill="${stroke}"/><circle cx="-28" cy="14" r="24" fill="${fill}"/><circle cx="28" cy="14" r="24" fill="${stroke}"/><path d="M-52 78 Q0 18 52 78 Q0 102 -52 78Z" fill="#eef5ff" stroke="#05070c" stroke-width="7"/></g>`
  }
}

function patternOverlay(theme) {
  if (theme.trim === "hex") {
    return Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => {
        const x = 140 + col * 138 + (row % 2) * 68
        const y = 170 + row * 92
        return `<path d="M${x} ${y - 28} L${x + 36} ${y - 8} V${y + 32} L${x} ${y + 52} L${x - 36} ${y + 32} V${y - 8}Z" fill="none" stroke="url(#slash)" stroke-width="3" opacity=".18"/>`
      }).join(""),
    ).join("")
  }

  if (theme.trim === "topo") {
    return Array.from({ length: 7 }, (_, i) => {
      const y = 210 + i * 95
      return `<path d="M90 ${y} C260 ${y - 60} 360 ${y + 70} 520 ${y} S790 ${y - 55} 1110 ${y + 20}" fill="none" stroke="url(#slash)" stroke-width="4" opacity=".18"/>`
    }).join("")
  }

  if (theme.trim === "tread") {
    return Array.from({ length: 11 }, (_, i) => `<path d="M${50 + i * 118} 120 L${170 + i * 118} 360 M${-10 + i * 118} 840 L${110 + i * 118} 1080" stroke="url(#slash)" stroke-width="18" opacity=".12"/>`).join("")
  }

  if (theme.trim === "circuit") {
    return Array.from({ length: 10 }, (_, i) => {
      const x = 105 + i * 110
      return `<path d="M${x} 155 V${260 + (i % 4) * 40} H${x + 54} V${610 - (i % 5) * 28}" fill="none" stroke="url(#slash)" stroke-width="5" opacity=".16"/><circle cx="${x + 54}" cy="${610 - (i % 5) * 28}" r="9" fill="${i % 2 ? theme.blue : theme.purple}" opacity=".42"/>`
    }).join("")
  }

  if (theme.trim === "rally") {
    return `<path d="M-60 290 H1260 M-60 745 H1260" stroke="url(#slash)" stroke-width="32" opacity=".14"/><path d="M120 160 L1080 1030" stroke="url(#slash)" stroke-width="8" opacity=".28"/>`
  }

  if (theme.trim === "signal") {
    return Array.from({ length: 6 }, (_, i) => `<circle cx="${600 + theme.shift}" cy="${560}" r="${160 + i * 82}" fill="none" stroke="url(#slash)" stroke-width="5" opacity="${0.24 - i * 0.025}"/>`).join("")
  }

  if (theme.trim === "chevron") {
    return Array.from({ length: 8 }, (_, i) => `<path d="M${-120 + i * 220} 220 L${60 + i * 220} 560 L${-120 + i * 220} 900" fill="none" stroke="url(#slash)" stroke-width="18" opacity=".12"/>`).join("")
  }

  return Array.from({ length: 10 }, (_, i) => `<path d="M${-140 + i * 150} 1030 L${300 + i * 150} 90" stroke="url(#slash)" stroke-width="12" opacity=".13"/>`).join("")
}

function sceneTexture(product, view, theme) {
  const callouts = [
    product.category.toUpperCase(),
    product.type.toUpperCase(),
    `PACK-${theme.packNo}`,
    theme.motif.label,
    view.toUpperCase(),
  ]

  return `
    <g opacity=".96">
      ${patternOverlay(theme)}
      ${motifIcon(theme, 1020, 235, 0.62, 0.34)}
      ${motifIcon(theme, 184, 830, 0.5, 0.26)}
      <path d="M90 ${theme.bandY} H1110" stroke="url(#slash)" stroke-width="6" opacity=".34"/>
      ${callouts
        .map(
          (item, i) =>
            `<text x="${118 + i * 218}" y="${1012 + (i % 2) * 38}" class="micro" fill="${i % 2 ? theme.purple : theme.blue}">${esc(item)}</text>`,
        )
        .join("")}
    </g>`
}

function productArtwork(product, view, theme) {
  const viewLines = {
    front: ["FRONT CREST", "CUSTOM DROP"],
    back: ["BACK PRINT", "PACK ISSUE"],
    side: ["SIDE PROFILE", "FITMENT READY"],
    detail: ["DETAIL VIEW", "MATERIAL CALL"],
  }
  const [lineA, lineB] = viewLines[view]
  const visualShort = slugLabel(product.visual, 31)
  return `
    <g transform="translate(${724 + theme.shift * 0.1} ${view === "detail" ? 260 : 300}) rotate(${theme.angle * 0.18})">
      <rect x="-146" y="-48" width="292" height="96" rx="10" fill="#030407" stroke="url(#slash)" stroke-width="4" opacity=".82"/>
      ${motifIcon(theme, -106, 0, 0.26, 1)}
      <text x="-28" y="-8" class="tiny" fill="#eef5ff">${esc(lineA)}</text>
      <text x="-28" y="28" class="tinyBlue">${esc(lineB)} ${theme.packNo}</text>
    </g>
    <g transform="translate(600 926)">
      <rect x="-330" y="-48" width="660" height="72" rx="8" fill="#05070b" stroke="#263247" stroke-width="3" opacity=".88"/>
      <text x="0" y="-4" text-anchor="middle" class="tiny">${esc(visualShort)}</text>
      <text x="0" y="28" text-anchor="middle" class="tinyBlue">WOLFPACK 4X4 / ${esc(theme.motif.line)} / ISSUE ${theme.packNo}</text>
    </g>`
}

function productShape(product, view, theme) {
  const type = product.type.toLowerCase()
  const category = product.category
  const [blue, purple] = theme ? [theme.blue, theme.purple] : categoryAccent.get(category) ?? ["#008cff", "#7c2cff"]
  const transform = view === "side" ? "translate(95 0) scale(0.82 1)" : ""
  const opacityBack = view === "back" ? 0.92 : 1

  if (type.includes("tee") || type.includes("shirt") || type.includes("long sleeve")) {
    const sleeves = type.includes("long sleeve") ? "M275 330 L145 600 L230 645 L340 455" : "M278 330 L150 475 L240 545 L342 430"
    const rightSleeve = type.includes("long sleeve") ? "M925 330 L1055 600 L970 645 L860 455" : "M922 330 L1050 475 L960 545 L858 430"
    return `
      <g transform="${transform}" opacity="${opacityBack}">
        <path d="${sleeves}" fill="#07090e" stroke="${blue}" stroke-width="7" />
        <path d="${rightSleeve}" fill="#07090e" stroke="${purple}" stroke-width="7" />
        <path d="M330 305 L465 255 Q600 320 735 255 L870 305 L830 870 Q600 930 370 870 Z" fill="url(#fabric)" stroke="#202636" stroke-width="8" />
        <path d="M468 270 Q600 335 732 270 Q700 380 600 392 Q500 380 468 270Z" fill="#050609" stroke="#2a3344" stroke-width="6" />
        <path d="M372 505 Q600 610 828 505" fill="none" stroke="url(#slash)" stroke-width="24" opacity=".82" />
        <text x="600" y="${view === "back" ? 565 : 548}" text-anchor="middle" class="mark">${view === "back" ? "WOLFPACK 4X4" : "WOLFPACK"}</text>
      </g>`
  }

  if (type.includes("hoodie") || type.includes("jacket") || type.includes("shell") || type.includes("puffer")) {
    const quilt = type.includes("puffer")
      ? Array.from({ length: 7 }, (_, i) => `<path d="M350 ${390 + i * 70} H850" stroke="#242b38" stroke-width="5" opacity=".75" />`).join("")
      : ""
    return `
      <g transform="${transform}">
        <path d="M440 255 Q600 120 760 255 L820 860 Q600 942 380 860 Z" fill="#06070b" stroke="#1f2634" stroke-width="9" />
        <path d="M420 300 L245 640 L330 700 L438 495" fill="#07090e" stroke="${blue}" stroke-width="7" />
        <path d="M780 300 L955 640 L870 700 L762 495" fill="#07090e" stroke="${purple}" stroke-width="7" />
        <path d="M495 270 Q600 355 705 270 L690 420 Q600 485 510 420Z" fill="#090d15" stroke="#293345" stroke-width="7" />
        <path d="M600 345 V880" stroke="${view === "back" ? "#273143" : blue}" stroke-width="9" />
        ${quilt}
        <path d="M410 555 Q600 645 790 555" fill="none" stroke="url(#slash)" stroke-width="22" opacity=".78" />
        <text x="600" y="${view === "back" ? 610 : 548}" text-anchor="middle" class="mark">${view === "back" ? "LEAD PROTECT DOMINATE" : "WOLFPACK"}</text>
      </g>`
  }

  if (type.includes("pants") || type.includes("shorts") || type.includes("boardshorts")) {
    const legBottom = type.includes("short") ? 720 : 940
    return `
      <g transform="${transform}">
        <path d="M420 260 H780 L820 ${legBottom} Q715 ${legBottom + 30} 630 ${legBottom} L600 500 L570 ${legBottom} Q485 ${legBottom + 30} 380 ${legBottom} Z" fill="url(#fabric)" stroke="#242b38" stroke-width="9" />
        <path d="M420 355 H780" stroke="${blue}" stroke-width="16" />
        <path d="M486 470 H562 V650 H470 Z" fill="#090d15" stroke="${purple}" stroke-width="6" />
        <path d="M638 470 H714 V650 H622 Z" fill="#090d15" stroke="${blue}" stroke-width="6" />
        <text x="600" y="330" text-anchor="middle" class="smallmark">WOLFPACK</text>
      </g>`
  }

  if (type.includes("cap") || type.includes("hat") || type.includes("beanie")) {
    const brim = type.includes("beanie") ? "" : `<path d="M630 620 Q830 610 985 690 Q820 750 610 705Z" fill="#05070c" stroke="${purple}" stroke-width="8" />`
    const crown = type.includes("beanie")
      ? `<path d="M360 500 Q420 255 600 235 Q780 255 840 500 V690 H360 Z" fill="url(#fabric)" stroke="#252d3c" stroke-width="9" /><path d="M350 665 H850 V780 H350Z" fill="#080b12" stroke="${blue}" stroke-width="8" />`
      : `<path d="M305 570 Q405 285 600 285 Q795 285 895 570 Q725 650 600 640 Q475 650 305 570Z" fill="url(#fabric)" stroke="#252d3c" stroke-width="9" />`
    return `
      <g transform="${transform}">
        ${crown}
        ${brim}
        <path d="M480 540 Q600 475 720 540" fill="none" stroke="url(#slash)" stroke-width="18" />
        <text x="600" y="${type.includes("beanie") ? 737 : 555}" text-anchor="middle" class="mark">W</text>
      </g>`
  }

  if (type.includes("sock") || type.includes("glove") || type.includes("gaiter")) {
    return `
      <g transform="${transform}">
        <path d="M355 270 H525 V705 Q525 835 405 835 H285 Q245 790 300 735 L355 680Z" fill="url(#fabric)" stroke="#242b38" stroke-width="8" />
        <path d="M675 270 H845 V705 Q845 835 725 835 H605 Q565 790 620 735 L675 680Z" fill="url(#fabric)" stroke="#242b38" stroke-width="8" />
        <path d="M355 660 H525" stroke="${blue}" stroke-width="18" />
        <path d="M675 660 H845" stroke="${purple}" stroke-width="18" />
        <text x="600" y="530" text-anchor="middle" class="mark">PACK</text>
      </g>`
  }

  if (type.includes("chair")) {
    return `
      <g transform="${transform}">
        <path d="M350 295 H850 L790 645 H410Z" fill="url(#fabric)" stroke="#242b38" stroke-width="9" />
        <path d="M410 645 H790 L875 855 H325Z" fill="#06080d" stroke="#242b38" stroke-width="9" />
        <path d="M365 860 L470 645 M835 860 L730 645 M330 305 L445 860 M870 305 L755 860" stroke="${blue}" stroke-width="16" stroke-linecap="round" />
        <text x="600" y="485" text-anchor="middle" class="mark">WOLFPACK</text>
      </g>`
  }

  if (type.includes("table")) {
    return `
      <g transform="${transform}">
        <path d="M260 410 H940 L850 620 H350Z" fill="url(#fabric)" stroke="#242b38" stroke-width="9" />
        <path d="M360 620 L270 875 M840 620 L930 875 M450 620 L520 875 M750 620 L680 875" stroke="${blue}" stroke-width="15" stroke-linecap="round" />
        <text x="600" y="535" text-anchor="middle" class="mark">WOLFPACK</text>
      </g>`
  }

  if (type.includes("bag") || type.includes("roll") || type.includes("cooler") || type.includes("blanket")) {
    return `
      <g transform="${transform}">
        <path d="M295 410 Q600 270 905 410 V775 Q600 900 295 775Z" fill="url(#fabric)" stroke="#242b38" stroke-width="9" />
        <path d="M425 415 Q600 330 775 415" fill="none" stroke="${blue}" stroke-width="18" stroke-linecap="round" />
        <path d="M330 610 H870" stroke="${purple}" stroke-width="13" opacity=".86" />
        <text x="600" y="620" text-anchor="middle" class="mark">WOLFPACK</text>
      </g>`
  }

  if (type.includes("mug") || type.includes("bottle")) {
    const bottle = type.includes("bottle")
    return `
      <g transform="${transform}">
        ${
          bottle
            ? `<path d="M515 245 H685 L720 360 V900 H480 V360Z" fill="url(#fabric)" stroke="#242b38" stroke-width="9" /><path d="M510 210 H690 V285 H510Z" fill="#07090e" stroke="${blue}" stroke-width="8" />`
            : `<path d="M390 390 H735 V800 Q560 875 390 800Z" fill="url(#fabric)" stroke="#242b38" stroke-width="9" /><path d="M725 500 Q900 520 840 665 Q805 740 725 715" fill="none" stroke="${blue}" stroke-width="28" />`
        }
        <text x="600" y="${bottle ? 625 : 610}" text-anchor="middle" class="mark">${bottle ? "PACK" : "W"}</text>
      </g>`
  }

  if (product.id.includes("recovery-board")) {
    return `
      <g transform="${transform}">
        <path d="M270 300 L805 210 L930 780 L395 890Z" fill="#080b12" stroke="#242b38" stroke-width="9"/>
        <path d="M340 342 L875 252" stroke="${blue}" stroke-width="20"/>
        ${Array.from({ length: 8 }, (_, i) => `<path d="M${360 + i * 58} ${405 - i * 10} l42 -8 l18 82 l-42 8Z" fill="${i % 2 ? purple : blue}" opacity=".92"/>`).join("")}
        <path d="M505 260 L960 380 L842 875 L388 760Z" fill="#05070c" stroke="#242b38" stroke-width="9" opacity=".92"/>
        ${Array.from({ length: 7 }, (_, i) => `<path d="M${560 + i * 48} ${390 + i * 10} l38 10 l-18 76 l-38 -10Z" fill="${i % 2 ? blue : purple}" opacity=".9"/>`).join("")}
        <text x="600" y="630" text-anchor="middle" class="mark">WOLFPACK</text>
      </g>`
  }

  if (type.includes("recovery") || product.id.includes("shackle") || product.id.includes("rope") || product.id.includes("snatch")) {
    return `
      <g transform="${transform}">
        <path d="M330 530 C450 330 750 330 870 530 C780 742 420 742 330 530Z" fill="none" stroke="${blue}" stroke-width="46" stroke-linecap="round"/>
        <path d="M340 575 C470 770 730 770 860 575" fill="none" stroke="${purple}" stroke-width="36" stroke-linecap="round"/>
        <rect x="370" y="405" width="460" height="280" rx="26" fill="#06080d" stroke="#242b38" stroke-width="9"/>
        <path d="M405 500 H795 M405 585 H795" stroke="url(#slash)" stroke-width="18" stroke-linecap="round"/>
        <text x="600" y="570" text-anchor="middle" class="mark">RECOVERY</text>
      </g>`
  }

  if (type.includes("lighting") || product.id.includes("light")) {
    const round = product.id.includes("driving")
    return `
      <g transform="${transform}">
        ${
          round
            ? `<circle cx="455" cy="560" r="158" fill="#05070c" stroke="#242b38" stroke-width="12"/><circle cx="745" cy="560" r="158" fill="#05070c" stroke="#242b38" stroke-width="12"/><circle cx="455" cy="560" r="112" fill="#101723" stroke="${blue}" stroke-width="12"/><circle cx="745" cy="560" r="112" fill="#101723" stroke="${purple}" stroke-width="12"/>`
            : `<rect x="245" y="470" width="710" height="166" rx="34" fill="#05070c" stroke="#242b38" stroke-width="11"/><rect x="305" y="520" width="590" height="66" rx="18" fill="#111827" stroke="url(#slash)" stroke-width="8"/>`
        }
        ${Array.from({ length: round ? 8 : 12 }, (_, i) => `<circle cx="${round ? (i < 4 ? 415 + i * 28 : 705 + (i - 4) * 28) : 348 + i * 45}" cy="${round ? 560 : 553}" r="${round ? 11 : 15}" fill="${i % 2 ? purple : blue}" filter="url(#softGlow)"/>`).join("")}
        <path d="M300 708 H900" stroke="url(#slash)" stroke-width="18" stroke-linecap="round"/>
        <text x="600" y="760" text-anchor="middle" class="smallmark">WOLFPACK LIGHTING</text>
      </g>`
  }

  if (type.includes("bull bar") || product.id.includes("bull-bar")) {
    return `
      <g transform="${transform}">
        <path d="M250 455 Q600 315 950 455 V690 Q600 850 250 690Z" fill="#05070c" stroke="#242b38" stroke-width="12"/>
        <path d="M300 520 H900 M360 455 V740 M840 455 V740" stroke="${blue}" stroke-width="22" stroke-linecap="round"/>
        <path d="M250 690 H950" stroke="${purple}" stroke-width="24" stroke-linecap="round"/>
        <rect x="440" y="558" width="320" height="72" rx="12" fill="#101723" stroke="url(#slash)" stroke-width="7"/>
        <circle cx="380" cy="725" r="32" fill="none" stroke="${purple}" stroke-width="14"/>
        <circle cx="820" cy="725" r="32" fill="none" stroke="${purple}" stroke-width="14"/>
        <text x="600" y="615" text-anchor="middle" class="smallmark">WOLFPACK 4X4</text>
      </g>`
  }

  if (type.includes("protection") || product.id.includes("slider") || product.id.includes("plate")) {
    return `
      <g transform="${transform}">
        <path d="M225 420 L865 285 L980 610 L340 760Z" fill="#070a10" stroke="#242b38" stroke-width="10"/>
        <path d="M305 505 L910 380" stroke="url(#slash)" stroke-width="22" stroke-linecap="round"/>
        <path d="M325 630 L920 502" stroke="${blue}" stroke-width="14" stroke-linecap="round"/>
        ${Array.from({ length: 8 }, (_, i) => `<circle cx="${405 + i * 62}" cy="${545 - i * 12}" r="15" fill="${i % 2 ? purple : blue}"/>`).join("")}
        <text x="600" y="670" text-anchor="middle" class="mark">ARMOUR</text>
      </g>`
  }

  if (type.includes("rack") || type.includes("awning") || type.includes("storage") || type.includes("towing")) {
    return `
      <g transform="${transform}">
        <path d="M230 455 H970 L880 720 H320Z" fill="#05070c" stroke="#242b38" stroke-width="10"/>
        ${Array.from({ length: 6 }, (_, i) => `<path d="M${315 + i * 116} 455 L${270 + i * 116} 720" stroke="${i % 2 ? purple : blue}" stroke-width="12" stroke-linecap="round"/>`).join("")}
        <path d="M300 545 H900 M350 635 H850" stroke="#151c29" stroke-width="28" stroke-linecap="round"/>
        <rect x="420" y="720" width="360" height="92" rx="18" fill="#080b12" stroke="url(#slash)" stroke-width="8"/>
        <text x="600" y="782" text-anchor="middle" class="smallmark">TOURING</text>
      </g>`
  }

  if (type.includes("suspension") || product.id.includes("airbag")) {
    return `
      <g transform="${transform}">
        <path d="M390 245 L495 245 L455 900 L350 900Z" fill="#07090e" stroke="#242b38" stroke-width="9"/>
        <path d="M705 245 L810 245 L850 900 L745 900Z" fill="#07090e" stroke="#242b38" stroke-width="9"/>
        ${Array.from({ length: 9 }, (_, i) => `<path d="M360 ${330 + i * 55} C420 ${300 + i * 55} 455 ${360 + i * 55} 500 ${330 + i * 55}" fill="none" stroke="${i % 2 ? purple : blue}" stroke-width="16" stroke-linecap="round"/>`).join("")}
        ${Array.from({ length: 9 }, (_, i) => `<path d="M700 ${330 + i * 55} C760 ${300 + i * 55} 795 ${360 + i * 55} 840 ${330 + i * 55}" fill="none" stroke="${i % 2 ? blue : purple}" stroke-width="16" stroke-linecap="round"/>`).join("")}
        <rect x="315" y="875" width="590" height="56" rx="24" fill="#111827" stroke="url(#slash)" stroke-width="8"/>
        <text x="600" y="805" text-anchor="middle" class="smallmark">LIFT KIT</text>
      </g>`
  }

  if (type.includes("intake") || product.id.includes("snorkel")) {
    return `
      <g transform="${transform}">
        <path d="M415 850 V340 Q415 250 515 250 H670 Q745 250 745 325 Q745 395 672 395 H548 V850Z" fill="#05070c" stroke="#242b38" stroke-width="11"/>
        <path d="M520 330 H690" stroke="${blue}" stroke-width="18" stroke-linecap="round"/>
        <path d="M472 475 H705 M472 610 H705 M472 745 H650" stroke="url(#slash)" stroke-width="15" stroke-linecap="round"/>
        <text x="600" y="552" text-anchor="middle" class="mark">AIR</text>
      </g>`
  }

  if (type.includes("electronics") || type.includes("tyre gear")) {
    return `
      <g transform="${transform}">
        <rect x="330" y="360" width="540" height="360" rx="38" fill="#05070c" stroke="#242b38" stroke-width="11"/>
        <rect x="410" y="435" width="380" height="112" rx="20" fill="#111827" stroke="url(#slash)" stroke-width="8"/>
        <path d="M410 630 H790 M470 700 C470 830 730 830 730 700" fill="none" stroke="${blue}" stroke-width="17" stroke-linecap="round"/>
        <circle cx="485" cy="493" r="22" fill="${blue}"/><circle cx="715" cy="493" r="22" fill="${purple}"/>
        <text x="600" y="510" text-anchor="middle" class="smallmark">BOOST</text>
      </g>`
  }

  if (type.includes("visual package") || type.includes("decals")) {
    return `
      <g transform="${transform}">
        <path d="M240 360 H960 L900 792 H300Z" fill="#05070c" stroke="#242b38" stroke-width="10"/>
        <path d="M300 450 C480 365 610 610 900 420" fill="none" stroke="url(#slash)" stroke-width="46" stroke-linecap="round"/>
        <path d="M330 610 C520 520 660 735 870 590" fill="none" stroke="${blue}" stroke-width="22" stroke-linecap="round"/>
        <path d="M365 742 H835" stroke="${purple}" stroke-width="18" stroke-linecap="round"/>
        <text x="600" y="680" text-anchor="middle" class="mark">WRAP</text>
      </g>`
  }

  return `
    <g transform="${transform}">
      <path d="M240 530 Q600 320 960 530 L900 760 Q600 900 300 760Z" fill="url(#fabric)" stroke="#242b38" stroke-width="9" />
      <path d="M315 570 Q600 440 885 570" fill="none" stroke="url(#slash)" stroke-width="28" />
      <path d="M420 685 H780" stroke="${blue}" stroke-width="18" stroke-linecap="round" />
      <text x="600" y="648" text-anchor="middle" class="mark">WOLFPACK</text>
    </g>`
}

function renderSvg(product, view) {
  const theme = productTheme(product, view)
  const [blue, purple] = [theme.blue, theme.purple]
  const label = slugLabel(product.name)
  const viewLabel = view.toUpperCase()

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(product.name)} ${viewLabel} Wolfpack concept</title>
  <desc id="desc">${esc(product.summary)}</desc>
  <defs>
    <radialGradient id="stage" cx="50%" cy="42%" r="58%">
      <stop offset="0%" stop-color="#1e2638"/>
      <stop offset="48%" stop-color="#080b12"/>
      <stop offset="100%" stop-color="#030407"/>
    </radialGradient>
    <linearGradient id="fabric" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111724"/>
      <stop offset="45%" stop-color="#05070c"/>
      <stop offset="100%" stop-color="#151b29"/>
    </linearGradient>
    <linearGradient id="slash" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${blue}"/>
      <stop offset="52%" stop-color="#202bff"/>
      <stop offset="100%" stop-color="${purple}"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="${blue}" flood-opacity=".42"/>
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity=".46"/>
    </filter>
    <style>
      .mark{font-family:Arial Black,Impact,sans-serif;font-size:58px;letter-spacing:3px;fill:#eef5ff;paint-order:stroke;stroke:#020306;stroke-width:8px}
      .smallmark{font-family:Arial Black,Impact,sans-serif;font-size:35px;letter-spacing:5px;fill:#eef5ff;paint-order:stroke;stroke:#020306;stroke-width:5px}
      .meta{font-family:Consolas,Monaco,monospace;font-size:24px;letter-spacing:6px;fill:#aeb9cf}
      .name{font-family:Arial Black,Impact,sans-serif;font-size:34px;letter-spacing:1px;fill:#f3f6fb}
      .tiny{font-family:Arial Black,Impact,sans-serif;font-size:22px;letter-spacing:2px;fill:#edf5ff}
      .tinyBlue{font-family:Consolas,Monaco,monospace;font-size:18px;letter-spacing:4px;fill:${blue}}
      .micro{font-family:Consolas,Monaco,monospace;font-size:15px;letter-spacing:4px;font-weight:700}
    </style>
  </defs>
  <rect width="1200" height="1200" fill="url(#stage)"/>
  <circle cx="600" cy="610" r="410" fill="${blue}" opacity=".09" filter="url(#glow)"/>
  <circle cx="805" cy="360" r="210" fill="${purple}" opacity=".13" filter="url(#glow)"/>
  <path d="M132 942 C320 876 452 850 600 850 C748 850 880 876 1068 942" fill="none" stroke="url(#slash)" stroke-width="8" opacity=".52"/>
  ${sceneTexture(product, view, theme)}
  ${productShape(product, view, theme)}
  ${productArtwork(product, view, theme)}
  <g>
    <rect x="82" y="82" width="244" height="62" rx="8" fill="#05070b" stroke="${blue}" stroke-width="3" opacity=".95"/>
    <text x="204" y="122" text-anchor="middle" class="meta">${esc(viewLabel)}</text>
    <text x="600" y="1072" text-anchor="middle" class="name">${esc(label)}</text>
    <text x="600" y="1114" text-anchor="middle" class="meta">${esc(product.category.toUpperCase())} - WOLFPACK 4X4</text>
  </g>
</svg>
`
}

fs.mkdirSync(outputDir, { recursive: true })

for (const product of products) {
  for (const view of views) {
    const svg = renderSvg(product, view)
    const svgPath = path.join(outputDir, `${product.id}-${view}.svg`)
    const pngPath = path.join(outputDir, `${product.id}-${view}.png`)
    fs.writeFileSync(svgPath, svg, "utf8")
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngPath)
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  imageSize: { width: size, height: size },
  viewCount: views.length,
  productCount: products.length,
  totalImages: products.length * views.length,
  views,
  products: products.map((product) => ({
    id: product.id,
    images: Object.fromEntries(views.map((view) => [view, `/media/wolfpack/store/${product.id}-${view}.png`])),
  })),
}

fs.writeFileSync(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8")
console.log(`Generated ${manifest.totalImages} Wolfpack store assets for ${manifest.productCount} products.`)
