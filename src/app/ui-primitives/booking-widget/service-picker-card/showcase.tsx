"use client"

import { useState } from "react"

import { ServicePickerCard } from "../../components/booking-widget"
import { SAMPLE_SERVICES } from "../sample-data"
import styles from "../booking-widget.module.css"

export function ServicePickerShowcase() {
  const [selected, setSelected] = useState<string>(SAMPLE_SERVICES[2].id)

  return (
    <div className={styles.row} role="radiogroup" aria-label="Choose a service">
      {SAMPLE_SERVICES.map((service) => (
        <ServicePickerCard
          key={service.id}
          service={service}
          selected={selected === service.id}
          onSelect={setSelected}
          groupName="service"
        />
      ))}
    </div>
  )
}
