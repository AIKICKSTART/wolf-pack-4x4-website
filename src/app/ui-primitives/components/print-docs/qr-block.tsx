import styles from "./qr-block.module.css"

interface QrBlockProps {
  value: string
  label?: string
  size?: number
  hideLabel?: boolean
}

const GRID = 21

function hashString(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function isFinderRegion(x: number, y: number): boolean {
  const inTL = x < 7 && y < 7
  const inTR = x >= GRID - 7 && y < 7
  const inBL = x < 7 && y >= GRID - 7
  return inTL || inTR || inBL
}

function isFinderPixel(x: number, y: number): boolean {
  function inFinderAt(originX: number, originY: number): boolean {
    const lx = x - originX
    const ly = y - originY
    if (lx < 0 || ly < 0 || lx > 6 || ly > 6) return false
    if (lx === 0 || ly === 0 || lx === 6 || ly === 6) return true
    if (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4) return true
    return false
  }
  return (
    inFinderAt(0, 0) ||
    inFinderAt(GRID - 7, 0) ||
    inFinderAt(0, GRID - 7)
  )
}

function buildGrid(value: string): ReadonlyArray<ReadonlyArray<boolean>> {
  const seed = hashString(value)
  const rows: boolean[][] = []
  for (let y = 0; y < GRID; y += 1) {
    const row: boolean[] = []
    for (let x = 0; x < GRID; x += 1) {
      if (isFinderRegion(x, y)) {
        row.push(isFinderPixel(x, y))
      } else if (y === 6) {
        row.push(x % 2 === 0)
      } else if (x === 6) {
        row.push(y % 2 === 0)
      } else {
        const h = (seed ^ (x * 2654435761) ^ (y * 40503)) >>> 0
        row.push((h & 1) === 1)
      }
    }
    rows.push(row)
  }
  return rows
}

export function QrBlock({
  value,
  label,
  size = 128,
  hideLabel = false,
}: QrBlockProps) {
  const grid = buildGrid(value)
  const cells: Array<{ x: number; y: number }> = []
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      if (grid[y][x]) {
        cells.push({ x, y })
      }
    }
  }

  return (
    <div className={styles.block} data-value={value} style={{ ["--qr-size" as string]: `${size}px` }}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${GRID} ${GRID}`}
        role="img"
        aria-label={`QR code encoding value ${value}`}
        shapeRendering="crispEdges"
      >
        <rect x={0} y={0} width={GRID} height={GRID} className={styles.paperFill} />
        {cells.map((cell) => (
          <rect
            key={`${cell.x}-${cell.y}`}
            x={cell.x}
            y={cell.y}
            width={1}
            height={1}
            className={styles.inkFill}
          />
        ))}
      </svg>
      {!hideLabel ? (
        <span className={styles.label}>{label ?? value}</span>
      ) : null}
    </div>
  )
}

export default QrBlock
