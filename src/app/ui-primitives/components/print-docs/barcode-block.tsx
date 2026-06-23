import styles from "./barcode-block.module.css"

interface BarcodeBlockProps {
  value: string
  label?: string
  height?: number
  hideHumanReadable?: boolean
}

interface Bar {
  x: number
  width: number
}

function hashChar(char: string, index: number): number {
  return (char.charCodeAt(0) * 31 + index * 17) & 0x7fffffff
}

function buildBars(value: string): { bars: ReadonlyArray<Bar>; totalWidth: number } {
  const widths = [1, 2, 3] as const
  const padX = 4
  let cursor = padX
  const bars: Bar[] = []

  // Quiet zone before — represented by leaving cursor at padX
  // Start guard
  for (let i = 0; i < 3; i += 1) {
    bars.push({ x: cursor, width: 1 })
    cursor += 2
  }

  for (let i = 0; i < value.length; i += 1) {
    const h = hashChar(value[i], i)
    // 6 bars per character
    for (let j = 0; j < 6; j += 1) {
      const w = widths[(h >> (j * 2)) % widths.length]
      const isBar = j % 2 === 0
      if (isBar) {
        bars.push({ x: cursor, width: w })
      }
      cursor += w
    }
  }

  // End guard
  for (let i = 0; i < 3; i += 1) {
    bars.push({ x: cursor, width: 1 })
    cursor += 2
  }

  cursor += padX
  return { bars, totalWidth: cursor }
}

export function BarcodeBlock({
  value,
  label,
  height = 56,
  hideHumanReadable = false,
}: BarcodeBlockProps) {
  const { bars, totalWidth } = buildBars(value)
  const viewBox = `0 0 ${totalWidth} ${height}`
  const ariaLabel = `Barcode encoding value ${value}`

  return (
    <div className={styles.block} data-value={value}>
      <svg
        className={styles.svg}
        viewBox={viewBox}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="none"
      >
        <rect x={0} y={0} width={totalWidth} height={height} className={styles.paperFill} />
        {bars.map((bar, index) => (
          <rect
            key={`${bar.x}-${index}`}
            x={bar.x}
            y={2}
            width={bar.width}
            height={height - (hideHumanReadable ? 4 : 14)}
            className={styles.inkFill}
          />
        ))}
      </svg>
      {!hideHumanReadable ? (
        <span className={styles.label}>{label ?? value}</span>
      ) : null}
    </div>
  )
}

export default BarcodeBlock
