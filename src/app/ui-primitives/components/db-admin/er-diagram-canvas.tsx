import type { ErEdge, ErNode } from "./db-admin-types"
import styles from "./er-diagram-canvas.module.css"

interface ErDiagramCanvasProps {
  nodes: ReadonlyArray<ErNode>
  edges: ReadonlyArray<ErEdge>
  /** Visible viewBox size in px — defaults to 1000 × 600. */
  width?: number
  height?: number
  /** Toggle the minimap panel. */
  showMinimap?: boolean
  className?: string
}

const ROW_HEIGHT = 22
const HEADER_HEIGHT = 38
const DEFAULT_NODE_WIDTH = 220

function nodeBox(node: ErNode): { x: number; y: number; width: number; height: number } {
  const width = node.width ?? DEFAULT_NODE_WIDTH
  const height = HEADER_HEIGHT + node.columns.length * ROW_HEIGHT
  return { x: node.x, y: node.y, width, height }
}

function findColumnAnchor(
  node: ErNode,
  columnName: string,
  side: "left" | "right",
): { x: number; y: number } {
  const box = nodeBox(node)
  const index = node.columns.findIndex((column) => column.name === columnName)
  const safeIndex = index === -1 ? 0 : index
  const y = box.y + HEADER_HEIGHT + safeIndex * ROW_HEIGHT + ROW_HEIGHT / 2
  const x = side === "left" ? box.x : box.x + box.width
  return { x, y }
}

function buildEdgePath(
  source: { x: number; y: number },
  target: { x: number; y: number },
): string {
  const dx = Math.max(60, Math.abs(target.x - source.x) / 2)
  const c1 = { x: source.x + (source.x < target.x ? dx : -dx), y: source.y }
  const c2 = { x: target.x + (source.x < target.x ? -dx : dx), y: target.y }
  return `M ${source.x} ${source.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${target.x} ${target.y}`
}

export function ErDiagramCanvas({
  nodes,
  edges,
  width = 1000,
  height = 600,
  showMinimap = true,
  className,
}: ErDiagramCanvasProps) {
  const classes = [styles.canvas, className].filter(Boolean).join(" ")
  const nodesByName = new Map(nodes.map((node) => [node.name, node]))

  const minimapScale = 0.12

  return (
    <div className={classes} role="region" aria-label="Entity relationship diagram">
      <div className={styles.gridFine} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <span className={styles.legend} aria-hidden="true">
        <span>
          <span className={`${styles.dot} ${styles.dotPk}`} />
          PK
        </span>
        <span>
          <span className={`${styles.dot} ${styles.dotFk}`} />
          FK
        </span>
        <span>{nodes.length} tables · {edges.length} relations</span>
      </span>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${nodes.length} table entities, ${edges.length} foreign key relationships`}
      >
        <defs>
          <marker
            id="er-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className={styles.edgeArrow} />
          </marker>
        </defs>

        {edges.map((edge) => {
          const source = nodesByName.get(edge.fromTable)
          const target = nodesByName.get(edge.toTable)
          if (!source || !target) {
            return null
          }
          const sourceBox = nodeBox(source)
          const targetBox = nodeBox(target)
          const sourceSide = sourceBox.x < targetBox.x ? "right" : "left"
          const targetSide = sourceSide === "right" ? "left" : "right"
          const sourceAnchor = findColumnAnchor(source, edge.fromColumn, sourceSide)
          const targetAnchor = findColumnAnchor(target, edge.toColumn, targetSide)
          return (
            <path
              key={edge.id}
              className={styles.edge}
              d={buildEdgePath(sourceAnchor, targetAnchor)}
              markerEnd="url(#er-arrow)"
            />
          )
        })}

        {nodes.map((node) => {
          const box = nodeBox(node)
          return (
            <g key={node.id} aria-label={`Table ${node.name}`}>
              <rect
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                rx={6}
                className={styles.nodeRect}
              />
              <rect
                x={box.x}
                y={box.y}
                width={box.width}
                height={HEADER_HEIGHT}
                rx={6}
                className={styles.nodeHeader}
              />
              {node.schema ? (
                <text
                  x={box.x + 12}
                  y={box.y + 14}
                  className={styles.nodeSchema}
                >
                  {node.schema}
                </text>
              ) : null}
              <text
                x={box.x + 12}
                y={box.y + 28}
                className={styles.nodeTitle}
              >
                {node.name}
              </text>
              {node.columns.map((column, index) => {
                const rowY = box.y + HEADER_HEIGHT + index * ROW_HEIGHT
                return (
                  <g key={column.name}>
                    {index % 2 === 1 ? (
                      <rect
                        x={box.x + 1}
                        y={rowY}
                        width={box.width - 2}
                        height={ROW_HEIGHT}
                        className={styles.columnRowAlt}
                      />
                    ) : null}
                    {column.isPrimaryKey ? (
                      <circle
                        cx={box.x + 10}
                        cy={rowY + ROW_HEIGHT / 2}
                        r={3}
                        className={styles.pkDot}
                      />
                    ) : column.isForeignKey ? (
                      <circle
                        cx={box.x + 10}
                        cy={rowY + ROW_HEIGHT / 2}
                        r={3}
                        className={styles.fkDot}
                      />
                    ) : null}
                    <text
                      x={box.x + 22}
                      y={rowY + ROW_HEIGHT / 2 + 4}
                      className={styles.column}
                    >
                      {column.name}
                    </text>
                    <text
                      x={box.x + box.width - 12}
                      y={rowY + ROW_HEIGHT / 2 + 4}
                      className={styles.columnType}
                    >
                      {column.type}
                    </text>
                  </g>
                )
              })}
            </g>
          )
        })}
      </svg>
      {showMinimap ? (
        <div className={styles.minimap} aria-hidden="true">
          {nodes.map((node) => {
            const box = nodeBox(node)
            return (
              <span
                key={node.id}
                className={styles.minimapNode}
                style={{
                  left: `${box.x * minimapScale}%`,
                  top: `${box.y * minimapScale}%`,
                  width: `${box.width * minimapScale}%`,
                  height: `${box.height * minimapScale}%`,
                }}
              />
            )
          })}
          <span className={styles.minimapViewport} />
        </div>
      ) : null}
    </div>
  )
}

export default ErDiagramCanvas
