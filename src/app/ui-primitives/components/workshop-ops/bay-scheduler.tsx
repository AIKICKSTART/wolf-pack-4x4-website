"use client"

import { useMemo } from "react"

import { Chip } from "../primitives/chip"
import {
  BAY_ID_ORDER,
  BAY_LABEL,
  BAY_STATE_LABEL,
  BAY_STATE_TONE,
  type BayBooking,
  type BayDayState,
  type Mechanic,
  TICKET_PRIORITY_TONE,
  TICKET_STATUS_LABEL,
  type WorkshopBayId,
  formatHour,
  formatHoursLabel,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./bay-scheduler.module.css"

interface BaySchedulerProps {
  /** Day label e.g. "Tuesday 26 May". */
  dayLabel: string
  /** Hours rendered on the X axis (24h decimal hours, e.g. 7.5, 8, 8.5). */
  hourTicks: ReadonlyArray<number>
  bookings: ReadonlyArray<BayBooking>
  bayStates: ReadonlyArray<BayDayState>
  mechanics: ReadonlyArray<Mechanic>
  /** Bay IDs to render (defaults to BAY_ID_ORDER). */
  bayIds?: ReadonlyArray<WorkshopBayId>
  className?: string
}

function mechanicById(
  mechanics: ReadonlyArray<Mechanic>,
  id: string | undefined,
): Mechanic | undefined {
  if (!id) return undefined
  return mechanics.find((mech) => mech.id === id)
}

export function BayScheduler({
  dayLabel,
  hourTicks,
  bookings,
  bayStates,
  mechanics,
  bayIds = BAY_ID_ORDER,
  className,
}: BaySchedulerProps) {
  const classes = [styles.scheduler, className].filter(Boolean).join(" ")

  const hourStart = hourTicks[0] ?? 7
  const hourEnd = hourTicks[hourTicks.length - 1] ?? 18
  const totalHours = hourEnd - hourStart || 1

  const bayStateMap = useMemo(() => {
    const map = new Map<WorkshopBayId, BayDayState>()
    for (const state of bayStates) {
      map.set(state.bayId, state)
    }
    return map
  }, [bayStates])

  const bookingsByBay = useMemo(() => {
    const map = new Map<WorkshopBayId, BayBooking[]>()
    for (const id of bayIds) {
      map.set(id, [])
    }
    for (const booking of bookings) {
      const list = map.get(booking.bayId) ?? []
      list.push(booking)
      map.set(booking.bayId, list)
    }
    return map
  }, [bookings, bayIds])

  return (
    <section
      className={classes}
      aria-label={`Bay schedule for ${dayLabel}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Bay schedule</span>
          <h3 className={styles.title}>{dayLabel}</h3>
        </div>
        <ul className={styles.legend} aria-label="Bay state legend">
          {Object.keys(BAY_STATE_LABEL).map((key) => {
            const stateKey = key as keyof typeof BAY_STATE_LABEL
            return (
              <li key={stateKey} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  data-tone={BAY_STATE_TONE[stateKey]}
                  aria-hidden="true"
                />
                {BAY_STATE_LABEL[stateKey]}
              </li>
            )
          })}
        </ul>
      </header>

      <div className={styles.grid} role="grid" aria-label="Bay schedule grid">
        <div className={styles.corner} role="columnheader" aria-label="Bays" />
        <div className={styles.hourRow} role="row">
          {hourTicks.map((hour) => (
            <span
              key={`tick-${hour}`}
              role="columnheader"
              className={styles.hourTick}
            >
              {formatHour(hour)}
            </span>
          ))}
        </div>

        {bayIds.map((bayId) => {
          const bayState = bayStateMap.get(bayId)
          const stateTone = bayState
            ? BAY_STATE_TONE[bayState.state]
            : "neutral"
          const bookingsForBay = bookingsByBay.get(bayId) ?? []

          return (
            <div key={bayId} className={styles.bayRow} role="row">
              <div
                className={styles.bayHeader}
                role="rowheader"
                data-tone={stateTone}
              >
                <span className={styles.bayName}>{BAY_LABEL[bayId]}</span>
                {bayState ? (
                  <span className={styles.bayState}>
                    {BAY_STATE_LABEL[bayState.state]}
                  </span>
                ) : null}
              </div>
              <div
                className={styles.bayTrack}
                role="gridcell"
                aria-label={`${BAY_LABEL[bayId]} bookings`}
              >
                {hourTicks.map((hour, idx) =>
                  idx === 0 ? null : (
                    <span
                      key={`grid-${bayId}-${hour}`}
                      className={styles.gridLine}
                      style={{
                        left: `${((hour - hourStart) / totalHours) * 100}%`,
                      }}
                      aria-hidden="true"
                    />
                  ),
                )}
                {bookingsForBay.map((booking) => {
                  const mech = mechanicById(mechanics, booking.mechanicId)
                  const left =
                    ((booking.startHour - hourStart) / totalHours) * 100
                  const width = (booking.durationHours / totalHours) * 100
                  const tone = TICKET_PRIORITY_TONE[booking.priority]
                  const stateToneStr = opsToneToChip(tone)

                  return (
                    <button
                      key={booking.id}
                      type="button"
                      className={styles.booking}
                      data-tone={stateToneStr}
                      data-pinned={booking.pinned ? "true" : undefined}
                      draggable
                      aria-label={`${booking.customerLabel} · ${booking.vehicleLabel} · ${formatHour(
                        booking.startHour,
                      )}–${formatHour(
                        booking.startHour + booking.durationHours,
                      )}`}
                      style={{
                        left: `${left}%`,
                        width: `calc(${width}% - 4px)`,
                      }}
                    >
                      <span className={styles.bookingLabel}>
                        {booking.customerLabel}
                      </span>
                      <span className={styles.bookingMeta}>
                        <span>{booking.vehicleLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{formatHoursLabel(booking.durationHours)}</span>
                      </span>
                      <span className={styles.bookingFoot}>
                        <span className={styles.bookingMechanic}>
                          {mech ? mech.initials : "—"}
                        </span>
                        <span className={styles.bookingStatus}>
                          {TICKET_STATUS_LABEL[booking.status]}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <footer className={styles.foot}>
        <span className={styles.footLabel}>Today&apos;s mechanics</span>
        <div className={styles.mechChips}>
          {mechanics.map((mech) => (
            <Chip
              key={mech.id}
              label={`${mech.initials} · ${mech.name.split(" ")[0]}`}
              tone={opsToneToChip(mech.tone)}
            />
          ))}
        </div>
      </footer>
    </section>
  )
}

export default BayScheduler
