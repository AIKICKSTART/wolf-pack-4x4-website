"use client"

import { useState } from "react"

import {
  AddonChipRow,
  BookingConfirmationCard,
  BookingDateSelector,
  CustomerDetailsForm,
  DurationPicker,
  NoShowPolicyCard,
  ServicePickerCard,
  TimeSlotGrid,
} from "../../components/booking-widget"
import type {
  ClockFormat,
  CustomerDetailsValues,
} from "../../components/booking-widget"
import {
  POLICY_RULES,
  SAMPLE_ADDONS,
  SAMPLE_CONFIRMATION,
  SAMPLE_CUSTOMER,
  SAMPLE_DATES,
  SAMPLE_DURATIONS,
  SAMPLE_SERVICES,
  SAMPLE_SLOTS,
} from "../sample-data"
import styles from "../booking-widget.module.css"

export function FullBookingFlowShowcase() {
  const [serviceId, setServiceId] = useState<string>(SAMPLE_SERVICES[2].id)
  const [date, setDate] = useState<string | null>("2026-06-04")
  const [slot, setSlot] = useState<string | null>("10:00")
  const [clock, setClock] = useState<ClockFormat>("12h")
  const [duration, setDuration] = useState<number | null>(60)
  const [addons, setAddons] = useState<ReadonlyArray<string>>(["pre-inspection", "sound-demo"])
  const [customer, setCustomer] = useState<CustomerDetailsValues>(SAMPLE_CUSTOMER)

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id],
    )
  }

  return (
    <div className={styles.flowGrid}>
      <article className={styles.flowStep}>
        <header className={styles.flowHead}>
          <span className={styles.flowKicker}>Step 1 · Service</span>
          <h2 className={styles.flowTitle}>What can we book?</h2>
        </header>
        <div className={styles.row} role="radiogroup" aria-label="Choose a service">
          {SAMPLE_SERVICES.map((service) => (
            <ServicePickerCard
              key={service.id}
              service={service}
              selected={serviceId === service.id}
              onSelect={setServiceId}
              groupName="service"
            />
          ))}
        </div>
      </article>

      <article className={styles.flowStep}>
        <header className={styles.flowHead}>
          <span className={styles.flowKicker}>Step 2 · When</span>
          <h2 className={styles.flowTitle}>Pick a date and time</h2>
        </header>
        <BookingDateSelector
          dates={SAMPLE_DATES}
          selectedIso={date}
          onSelect={setDate}
        />
        <TimeSlotGrid
          slots={SAMPLE_SLOTS}
          selectedId={slot}
          onSelect={setSlot}
          clock={clock}
          onClockChange={setClock}
        />
      </article>

      <article className={styles.flowStep}>
        <header className={styles.flowHead}>
          <span className={styles.flowKicker}>Step 3 · Configure</span>
          <h2 className={styles.flowTitle}>How long and what extras</h2>
        </header>
        <div className={styles.flowCols}>
          <DurationPicker
            options={SAMPLE_DURATIONS}
            selectedMinutes={duration}
            onSelect={setDuration}
          />
          <AddonChipRow
            addons={SAMPLE_ADDONS}
            selectedIds={addons}
            onToggle={toggleAddon}
          />
        </div>
      </article>

      <article className={styles.flowStep}>
        <header className={styles.flowHead}>
          <span className={styles.flowKicker}>Step 4 · Customer</span>
          <h2 className={styles.flowTitle}>Your details</h2>
        </header>
        <CustomerDetailsForm values={customer} onChange={setCustomer} />
      </article>

      <article className={styles.flowStep}>
        <header className={styles.flowHead}>
          <span className={styles.flowKicker}>Step 5 · Confirm</span>
          <h2 className={styles.flowTitle}>Booking confirmed</h2>
        </header>
        <BookingConfirmationCard
          confirmation={{
            ...SAMPLE_CONFIRMATION,
            customer,
          }}
        />
      </article>

      <NoShowPolicyCard
        rules={POLICY_RULES}
        cancellationDeadline="24h before"
        rescheduleAllowance="1 free reschedule"
        contactPhone="(02) 4232 9988"
      />
    </div>
  )
}
