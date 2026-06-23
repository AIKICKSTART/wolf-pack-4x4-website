import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")
const generatedRoot = "C:\\Users\\verri\\.codex\\generated_images"
const storeDir = path.join(repoRoot, "public", "media", "wolfpack", "store")
const sourceGroup = process.env.WOLFPACK_SOURCE_GROUP || "apparel"
const sourceDir = path.join(repoRoot, "public", "media", "wolfpack", "generated", sourceGroup)
const size = 1200
const views = ["front", "back", "side", "detail"]

function latestGeneratedPng() {
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
        files.push(full)
      }
    }
  }
  walk(generatedRoot)
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
  return files[0]
}

async function main() {
  const id = process.argv[2]
  const sourceArg = process.argv[3]

  if (!id) {
    throw new Error("Usage: node tools/process-wolfpack-apparel-sheet.mjs <product-id> [source.png]")
  }

  const source = sourceArg ? path.resolve(sourceArg) : latestGeneratedPng()
  if (!source || !fs.existsSync(source)) {
    throw new Error(`Source image not found: ${source || "(none)"}`)
  }

  fs.mkdirSync(sourceDir, { recursive: true })
  fs.mkdirSync(storeDir, { recursive: true })

  const sourceCopy = path.join(sourceDir, `${id}-sheet.png`)
  fs.copyFileSync(source, sourceCopy)

  const metadata = await sharp(sourceCopy).metadata()
  const sourceWidth = metadata.width ?? 0
  const sourceHeight = metadata.height ?? 0
  const cellWidth = Math.floor(sourceWidth / 2)
  const cellHeight = Math.floor(sourceHeight / 2)
  const cells = [
    { left: 0, top: 0 },
    { left: cellWidth, top: 0 },
    { left: 0, top: cellHeight },
    { left: cellWidth, top: cellHeight },
  ]

  for (const [index, view] of views.entries()) {
    const { left, top } = cells[index]
    const out = path.join(storeDir, `${id}-${view}.png`)
    await sharp(sourceCopy)
      .extract({
        left,
        top,
        width: index % 2 === 0 ? cellWidth : sourceWidth - cellWidth,
        height: index < 2 ? cellHeight : sourceHeight - cellHeight,
      })
      .resize(size, size, {
        fit: "contain",
        background: { r: 3, g: 5, b: 10, alpha: 1 },
      })
      .png({ compressionLevel: 9 })
      .toFile(out)
  }

  console.log(JSON.stringify({ id, source: sourceCopy, views, size }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
