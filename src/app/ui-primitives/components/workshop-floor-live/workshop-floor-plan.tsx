import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import { BAY_LABEL } from "../roster/roster-types"
import {
  BAY_LIVE_STATE_LABEL,
  TECH_LOCATION_LABEL,
  type BayId,
  type BayLiveState,
  type TechLocation,
} from "./workshop-floor-types"
import styles from "./workshop-floor-plan.module.css"

export interface FloorPlanBay {
  bay: BayId
  state: BayLiveState
  /** Optional short label like "N80 Manta" rendered inside the bay box. */
  label?: string
}

export interface FloorPlanTechnician {
  id: string
  name: string
  location: TechLocation
  avatarSrc?: string
}

interface WorkshopFloorPlanProps {
  bays: ReadonlyArray<FloorPlanBay>
  technicians: ReadonlyArray<FloorPlanTechnician>
  className?: string
}

// SVG viewBox is 600 × 360. Coordinates anchored to a known grid so the floor
// reads top-down: roller door at top, parts at right, dyno at bottom-right.
const BAY_RECTS: Readonly<
  Record<BayId, { x: number; y: number; w: number; h: number }>
> = {
  "bay-1": { x: 30, y: 70, w: 130, h: 120 },
  "bay-2": { x: 170, y: 70, w: 130, h: 120 },
  "bay-3": { x: 310, y: 70, w: 130, h: 120 },
  "bay-4": { x: 450, y: 70, w: 120, h: 120 },
}

const TECH_POSITIONS: Readonly<Record<TechLocation, { x: number; y: number }>> = {
  "bay-1": { x: 95, y: 150 },
  "bay-2": { x: 235, y: 150 },
  "bay-3": { x: 375, y: 150 },
  "bay-4": { x: 510, y: 150 },
  parts: { x: 550, y: 245 },
  dyno: { x: 510, y: 305 },
  office: { x: 65, y: 305 },
  "off-floor": { x: 30, y: 30 },
}

const TONE_COLOUR: Readonly<Record<BayLiveState, string>> = {
  idle: "var(--primitive-muted)",
  "in-progress": "var(--primitive-amber)",
  diagnostic: "var(--primitive-teal)",
  "dyno-running": "var(--primitive-red)",
  handover: "var(--primitive-green)",
  blocked: "var(--primitive-red)",
}

export function WorkshopFloorPlan({
  bays,
  technicians,
  className,
}: WorkshopFloorPlanProps) {
  const classes = [styles.frame, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Workshop floor plan — top-down view"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Floor plan · live</span>
        <h3 className={styles.title}>Oak Flats workshop</h3>
      </header>

      <div className={styles.canvas}>
        <svg
          viewBox="0 0 600 360"
          role="img"
          aria-label="Top-down floor plan with four bays, roller door, hoist, parts area and dyno"
          className={styles.svg}
        >
          <title>Workshop floor plan</title>
          <desc>
            Four bays across the front, parts area on the right, dyno bottom-right,
            office bottom-left, roller door at top-centre.
          </desc>

          {/* outer slab */}
          <rect
            x={10}
            y={10}
            width={580}
            height={340}
            rx={8}
            fill="color-mix(in oklab, var(--primitive-text-strong) 2%, transparent)"
            stroke="var(--primitive-line)"
          />

          {/* roller door (top centre) */}
          <g>
            <rect
              x={220}
              y={10}
              width={160}
              height={14}
              rx={3}
              fill="color-mix(in oklab, var(--primitive-red) 18%, transparent)"
              stroke="var(--primitive-red)"
            />
            <text
              x={300}
              y={42}
              textAnchor="middle"
              className={styles.label}
            >
              Roller door
            </text>
          </g>

          {/* parts area (right) */}
          <g>
            <rect
              x={460}
              y={210}
              width={120}
              height={60}
              rx={6}
              fill="color-mix(in oklab, var(--primitive-teal) 8%, transparent)"
              stroke="var(--primitive-teal)"
              strokeDasharray="4 4"
            />
            <text x={520} y={245} textAnchor="middle" className={styles.label}>
              Parts
            </text>
          </g>

          {/* dyno (bottom right) */}
          <g>
            <rect
              x={460}
              y={285}
              width={120}
              height={50}
              rx={6}
              fill="color-mix(in oklab, var(--primitive-red) 10%, transparent)"
              stroke="var(--primitive-red)"
            />
            <text x={520} y={315} textAnchor="middle" className={styles.label}>
              Dyno cell
            </text>
          </g>

          {/* office (bottom left) */}
          <g>
            <rect
              x={20}
              y={285}
              width={120}
              height={50}
              rx={6}
              fill="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
              stroke="var(--primitive-line)"
            />
            <text x={80} y={315} textAnchor="middle" className={styles.label}>
              Front office
            </text>
          </g>

          {/* hoist symbol next to bay 1 */}
          <g>
            <circle
              cx={95}
              cy={250}
              r={12}
              fill="color-mix(in oklab, var(--primitive-amber) 18%, transparent)"
              stroke="var(--primitive-amber)"
            />
            <text x={95} y={254} textAnchor="middle" className={styles.label}>
              H
            </text>
            <text x={95} y={275} textAnchor="middle" className={styles.label}>
              Hoist
            </text>
          </g>

          {/* bays */}
          {bays.map((bay) => {
            const r = BAY_RECTS[bay.bay]
            const colour = TONE_COLOUR[bay.state]
            return (
              <g key={bay.bay}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx={6}
                  fill="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
                  stroke={colour}
                  strokeWidth={1.5}
                />
                <text
                  x={r.x + 8}
                  y={r.y + 18}
                  className={styles.bayLabel}
                >
                  {BAY_LABEL[bay.bay]}
                </text>
                <text
                  x={r.x + 8}
                  y={r.y + 34}
                  className={styles.bayState}
                  fill={colour}
                >
                  {BAY_LIVE_STATE_LABEL[bay.state]}
                </text>
                {bay.label && (
                  <text
                    x={r.x + r.w / 2}
                    y={r.y + r.h - 10}
                    textAnchor="middle"
                    className={styles.bayJob}
                  >
                    {bay.label}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* DOM avatars positioned absolutely over the SVG */}
        <div className={styles.techLayer} aria-hidden="false">
          {technicians.map((tech) => {
            const pos = TECH_POSITIONS[tech.location]
            const leftPct = (pos.x / 600) * 100
            const topPct = (pos.y / 360) * 100
            return (
              <span
                key={tech.id}
                className={styles.techPin}
                style={{ left: `${leftPct}%`, top: `${topPct}%` } as CSSProperties}
                title={`${tech.name} · ${TECH_LOCATION_LABEL[tech.location]}`}
              >
                <Avatar
                  name={tech.name}
                  src={tech.avatarSrc}
                  size="sm"
                  tone="red"
                />
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WorkshopFloorPlan
