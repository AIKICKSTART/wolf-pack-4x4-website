"use client"

import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { ExhaustPipeIcon } from "../icons/exhaust-pipe"
import { SpannerIcon } from "../icons/spanner"
import { TachometerIcon } from "../icons/tachometer"
import { ShieldTickIcon } from "../icons/shield-tick"
import { BrakeRotorIcon } from "../icons/brake-rotor"
import { CoolantIcon } from "../icons/coolant"
import { CarSideIcon } from "../icons/car-side"
import {
  type BookingServiceOption,
  type BookingStep,
  type BookingTimeSlot,
  type PortalVehicle,
  formatAud,
  formatHour,
} from "./customer-portal-types"

import styles from "./booking-wizard.module.css"

interface BookingWizardProps {
  services: ReadonlyArray<BookingServiceOption>
  vehicles: ReadonlyArray<PortalVehicle>
  timeSlots: ReadonlyArray<BookingTimeSlot>
  /** Optional initial step (defaults to "service"). */
  initialStep?: BookingStep
  /** Optional initial selections — useful for showcase states. */
  initialServiceId?: string
  initialVehicleId?: string
  initialSlotId?: string
  className?: string
}

const STEP_ORDER: ReadonlyArray<BookingStep> = [
  "service",
  "vehicle",
  "date",
  "confirm",
]

const STEP_LABEL: Readonly<Record<BookingStep, string>> = {
  service: "Choose service",
  vehicle: "Pick vehicle",
  date: "Pick date & time",
  confirm: "Review & confirm",
}

const ICON_BY_KEY = {
  exhaust: ExhaustPipeIcon,
  spanner: SpannerIcon,
  tachometer: TachometerIcon,
  shield: ShieldTickIcon,
  brake: BrakeRotorIcon,
  coolant: CoolantIcon,
} as const

function groupSlotsByDate(
  slots: ReadonlyArray<BookingTimeSlot>,
): ReadonlyArray<{ date: string; slots: ReadonlyArray<BookingTimeSlot> }> {
  const byDate = new Map<string, BookingTimeSlot[]>()
  for (const slot of slots) {
    const bucket = byDate.get(slot.date) ?? []
    bucket.push(slot)
    byDate.set(slot.date, bucket)
  }
  return Array.from(byDate.entries()).map(([date, daySlots]) => ({
    date,
    slots: daySlots.slice().sort((a, b) => a.startHour - b.startHour),
  }))
}

function formatDateLabel(iso: string): string {
  // "2026-06-04" -> "Thu 4 Jun" without timezone-shift surprises.
  const [year, month, day] = iso.split("-").map((part) => Number.parseInt(part, 10))
  if (
    !year ||
    !month ||
    !day ||
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day)
  ) {
    return iso
  }
  const date = new Date(Date.UTC(year, month - 1, day))
  const weekday = date.toLocaleDateString("en-AU", {
    weekday: "short",
    timeZone: "UTC",
  })
  const monthShort = date.toLocaleDateString("en-AU", {
    month: "short",
    timeZone: "UTC",
  })
  return `${weekday} ${day} ${monthShort}`
}

export function BookingWizard({
  services,
  vehicles,
  timeSlots,
  initialStep = "service",
  initialServiceId,
  initialVehicleId,
  initialSlotId,
  className,
}: BookingWizardProps) {
  const [step, setStep] = useState<BookingStep>(initialStep)
  const [serviceId, setServiceId] = useState<string | undefined>(
    initialServiceId,
  )
  const [vehicleId, setVehicleId] = useState<string | undefined>(
    initialVehicleId,
  )
  const [slotId, setSlotId] = useState<string | undefined>(initialSlotId)
  const [confirmed, setConfirmed] = useState<boolean>(false)

  const stepIndex = STEP_ORDER.indexOf(step)
  const progressPct = ((stepIndex + 1) / STEP_ORDER.length) * 100

  const service = useMemo(
    () => services.find((s) => s.id === serviceId),
    [services, serviceId],
  )
  const vehicle = useMemo(
    () => vehicles.find((v) => v.id === vehicleId),
    [vehicles, vehicleId],
  )
  const slot = useMemo(
    () => timeSlots.find((s) => s.id === slotId),
    [timeSlots, slotId],
  )

  const canAdvance = ((): boolean => {
    if (step === "service") return Boolean(service)
    if (step === "vehicle") return Boolean(vehicle)
    if (step === "date") return Boolean(slot)
    if (step === "confirm") return true
    return false
  })()

  const goBack = () => {
    const previous = STEP_ORDER[stepIndex - 1]
    if (previous) setStep(previous)
  }

  const goNext = () => {
    const next = STEP_ORDER[stepIndex + 1]
    if (next) setStep(next)
  }

  const handleConfirm = () => {
    setConfirmed(true)
  }

  const classes = [styles.wizard, className].filter(Boolean).join(" ")

  if (confirmed && service && vehicle && slot) {
    return (
      <section
        className={[classes, styles.wizardDone].join(" ")}
        aria-label="Booking confirmed"
      >
        <div className={styles.successPanel}>
          <span className={styles.successKicker}>Booked</span>
          <h3 className={styles.successTitle}>
            {service.label} locked in for {vehicle.label}
          </h3>
          <p className={styles.successCopy}>
            {formatDateLabel(slot.date)} at {formatHour(slot.startHour)} — we&apos;ll
            SMS Mick when the bay&apos;s ready.
          </p>
          <button
            type="button"
            className={styles.actionGhost}
            onClick={() => {
              setConfirmed(false)
              setStep("service")
              setServiceId(undefined)
              setVehicleId(undefined)
              setSlotId(undefined)
            }}
          >
            Book another
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={classes} aria-label="Service booking wizard">
      <header className={styles.head}>
        <span className={styles.kicker}>Book a service</span>
        <h3 className={styles.title}>{STEP_LABEL[step]}</h3>
        <ol className={styles.steps} aria-label="Booking steps">
          {STEP_ORDER.map((s, idx) => {
            const reached = idx <= stepIndex
            const current = idx === stepIndex
            return (
              <li
                key={s}
                className={[
                  styles.step,
                  reached ? styles.stepReached : "",
                  current ? styles.stepCurrent : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={current ? "step" : undefined}
              >
                <span className={styles.stepDot} aria-hidden="true">
                  {idx + 1}
                </span>
                <span className={styles.stepLabel}>{STEP_LABEL[s]}</span>
              </li>
            )
          })}
        </ol>
        <ProgressLinear
          value={progressPct}
          tone="amber"
          variant="solid"
          label={`Step ${stepIndex + 1} of ${STEP_ORDER.length}`}
        />
      </header>

      <div className={styles.body}>
        {step === "service" ? (
          <fieldset
            className={styles.optionGrid}
            aria-label="Choose a service"
          >
            <legend className={styles.legend}>What does she need?</legend>
            {services.map((svc) => {
              const Icon = ICON_BY_KEY[svc.iconKey]
              const selected = svc.id === serviceId
              return (
                <button
                  key={svc.id}
                  type="button"
                  className={[
                    styles.optionCard,
                    selected ? styles.optionCardSelected : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={selected}
                  onClick={() => setServiceId(svc.id)}
                >
                  <span className={styles.optionIcon} aria-hidden="true">
                    <Icon size={28} tone="currentColor" motion="none" />
                  </span>
                  <span className={styles.optionLabel}>{svc.label}</span>
                  <span className={styles.optionDescription}>
                    {svc.description}
                  </span>
                  <span className={styles.optionMeta}>
                    <span>{svc.durationHours}h on the hoist</span>
                    <span className={styles.optionPrice}>
                      from {formatAud(svc.estimateAud, 0)}
                    </span>
                  </span>
                </button>
              )
            })}
          </fieldset>
        ) : null}

        {step === "vehicle" ? (
          <fieldset
            className={styles.vehicleGrid}
            aria-label="Pick a vehicle"
          >
            <legend className={styles.legend}>Which one&apos;s coming in?</legend>
            {vehicles.map((veh) => {
              const selected = veh.id === vehicleId
              return (
                <button
                  key={veh.id}
                  type="button"
                  className={[
                    styles.vehicleCard,
                    selected ? styles.vehicleCardSelected : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={selected}
                  onClick={() => setVehicleId(veh.id)}
                >
                  <span className={styles.vehicleIcon} aria-hidden="true">
                    <CarSideIcon size={26} tone="currentColor" motion="none" />
                  </span>
                  <span className={styles.vehicleTitle}>
                    <strong>{veh.yearMade}</strong> {veh.label}
                  </span>
                  <span className={styles.vehicleSub}>
                    {veh.rego} · {veh.bodyColour}
                  </span>
                </button>
              )
            })}
          </fieldset>
        ) : null}

        {step === "date" ? (
          <div className={styles.dateBlock}>
            <p className={styles.legend}>Pick a slot — mornings book fastest.</p>
            <div className={styles.dayColumns}>
              {groupSlotsByDate(timeSlots).map(({ date, slots }) => (
                <div key={date} className={styles.dayColumn}>
                  <span className={styles.dayLabel}>
                    {formatDateLabel(date)}
                  </span>
                  <ul className={styles.slotList}>
                    {slots.map((bookingSlot) => {
                      const selected = bookingSlot.id === slotId
                      const disabled = Boolean(bookingSlot.taken)
                      return (
                        <li key={bookingSlot.id}>
                          <button
                            type="button"
                            className={[
                              styles.slotBtn,
                              selected ? styles.slotBtnSelected : "",
                              disabled ? styles.slotBtnTaken : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            aria-pressed={selected}
                            disabled={disabled}
                            onClick={() => setSlotId(bookingSlot.id)}
                          >
                            <time>{formatHour(bookingSlot.startHour)}</time>
                            {disabled ? (
                              <span className={styles.slotBtnNote}>Booked</span>
                            ) : null}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {step === "confirm" ? (
          <div className={styles.confirmBlock}>
            <p className={styles.legend}>One look-over before you lock it in.</p>
            <dl className={styles.summary}>
              <div>
                <dt>Service</dt>
                <dd>{service?.label ?? "—"}</dd>
              </div>
              <div>
                <dt>Vehicle</dt>
                <dd>
                  {vehicle ? `${vehicle.yearMade} ${vehicle.label}` : "—"}
                </dd>
              </div>
              <div>
                <dt>Rego</dt>
                <dd>{vehicle?.rego ?? "—"}</dd>
              </div>
              <div>
                <dt>When</dt>
                <dd>
                  {slot
                    ? `${formatDateLabel(slot.date)} · ${formatHour(slot.startHour)}`
                    : "—"}
                </dd>
              </div>
              <div>
                <dt>Estimated total</dt>
                <dd className={styles.summaryTotal}>
                  {service ? `from ${formatAud(service.estimateAud, 0)}` : "—"}
                </dd>
              </div>
            </dl>
            <p className={styles.confirmFinePrint}>
              Final quote confirmed after Brad eyeballs it. SMS reminder 24h
              prior. Cancel any time before then — no charge.
            </p>
            <Chip label="No deposit · pay on pickup" tone="green" />
          </div>
        ) : null}
      </div>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.actionGhost}
          onClick={goBack}
          disabled={stepIndex === 0}
        >
          Back
        </button>
        {step === "confirm" ? (
          <button
            type="button"
            className={styles.actionPrimary}
            onClick={handleConfirm}
            disabled={!canAdvance}
          >
            Confirm booking
          </button>
        ) : (
          <button
            type="button"
            className={styles.actionPrimary}
            onClick={goNext}
            disabled={!canAdvance}
          >
            Continue
          </button>
        )}
      </footer>
    </section>
  )
}

export default BookingWizard
