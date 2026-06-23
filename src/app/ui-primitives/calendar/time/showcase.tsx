"use client"

import { useState } from "react"

import { TimePicker, type TimeValue } from "../../components/calendar"
import styles from "../calendar.module.css"

export function TimePickerShowcase() {
  const [time24, setTime24] = useState<TimeValue>({ hours: 9, minutes: 30 })
  const [time12, setTime12] = useState<TimeValue>({ hours: 13, minutes: 0 })

  return (
    <div className={styles.row}>
      <TimePicker value={time24} onChange={setTime24} clock={24} step={5} label="Drop-off time" />
      <TimePicker value={time12} onChange={setTime12} clock={12} step={15} label="Pickup time" />
    </div>
  )
}
