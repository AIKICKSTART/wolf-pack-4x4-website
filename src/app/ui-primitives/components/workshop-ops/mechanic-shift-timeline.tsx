import { Avatar } from "../primitives/avatar"
import {
  type Mechanic,
  SHIFT_BLOCK_LABEL,
  SHIFT_BLOCK_TONE,
  type ShiftBlock,
  type ShiftBlockKind,
  formatHour,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./mechanic-shift-timeline.module.css"

interface MechanicShiftTimelineProps {
  mechanics: ReadonlyArray<Mechanic>
  blocks: ReadonlyArray<ShiftBlock>
  /** Hour decimals on the X axis e.g. [7.5, 9, 12, 15, 17.5]. */
  hourTicks: ReadonlyArray<number>
  /** Day label e.g. "Wednesday 27 May". */
  dayLabel: string
  className?: string
}

function avatarToneOf(tone: ReturnType<typeof opsToneToChip>): "red" | "amber" | "teal" | "green" | "obsidian" {
  if (tone === "red" || tone === "amber" || tone === "teal" || tone === "green") {
    return tone
  }
  return "obsidian"
}

export function MechanicShiftTimeline({
  mechanics,
  blocks,
  hourTicks,
  dayLabel,
  className,
}: MechanicShiftTimelineProps) {
  const classes = [styles.timeline, className].filter(Boolean).join(" ")
  const hourStart = hourTicks[0] ?? 7
  const hourEnd = hourTicks[hourTicks.length - 1] ?? 18
  const totalHours = hourEnd - hourStart || 1

  const groupedBlocks = mechanics.map((mech) => ({
    mechanic: mech,
    blocks: blocks.filter((block) => block.mechanicId === mech.id),
  }))

  return (
    <section className={classes} aria-label={`Mechanic shifts for ${dayLabel}`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Crew shifts</span>
          <h3 className={styles.title}>{dayLabel}</h3>
        </div>
        <ul className={styles.legend} aria-label="Shift block legend">
          {(Object.keys(SHIFT_BLOCK_LABEL) as ShiftBlockKind[]).map((kind) => (
            <li key={kind} className={styles.legendItem}>
              <span
                className={styles.legendBar}
                data-tone={SHIFT_BLOCK_TONE[kind]}
                aria-hidden="true"
              />
              {SHIFT_BLOCK_LABEL[kind]}
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.matrix} role="grid">
        <div className={styles.corner} role="rowheader" aria-label="Crew" />
        <div className={styles.hourScale} role="row">
          {hourTicks.map((hour) => (
            <span key={`tick-${hour}`} className={styles.hourLabel}>
              {formatHour(hour)}
            </span>
          ))}
        </div>
        {groupedBlocks.map(({ mechanic, blocks: mechBlocks }) => (
          <div key={mechanic.id} className={styles.row} role="row">
            <div className={styles.crewCell} role="rowheader">
              <Avatar
                name={mechanic.name}
                size="sm"
                tone={avatarToneOf(opsToneToChip(mechanic.tone))}
              />
              <div className={styles.crewMeta}>
                <span className={styles.crewName}>{mechanic.name}</span>
                <span className={styles.crewRole}>{mechanic.role}</span>
              </div>
            </div>
            <div className={styles.lane} role="gridcell">
              {hourTicks.map((hour, idx) =>
                idx === 0 ? null : (
                  <span
                    key={`lane-${mechanic.id}-${hour}`}
                    className={styles.laneTick}
                    style={{
                      left: `${((hour - hourStart) / totalHours) * 100}%`,
                    }}
                    aria-hidden="true"
                  />
                ),
              )}
              {mechBlocks.map((block) => {
                const left = ((block.startHour - hourStart) / totalHours) * 100
                const width = (block.durationHours / totalHours) * 100
                const tone = SHIFT_BLOCK_TONE[block.kind]
                return (
                  <span
                    key={block.id}
                    className={styles.block}
                    data-kind={block.kind}
                    data-tone={tone}
                    style={{
                      left: `${left}%`,
                      width: `calc(${width}% - 2px)`,
                    }}
                    title={`${SHIFT_BLOCK_LABEL[block.kind]} ${formatHour(
                      block.startHour,
                    )}–${formatHour(block.startHour + block.durationHours)}${
                      block.note ? ` · ${block.note}` : ""
                    }`}
                  >
                    <span className={styles.blockLabel}>
                      {SHIFT_BLOCK_LABEL[block.kind]}
                    </span>
                    {block.kind === "sick" || block.kind === "leave" ? (
                      <span className={styles.blockChip} aria-hidden="true">
                        {block.kind === "sick" ? "SICK" : "LV"}
                      </span>
                    ) : null}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MechanicShiftTimeline
