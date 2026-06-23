"use client"

import { useState } from "react"

import { MiniDatePicker } from "../../components/calendar"
import styles from "../calendar.module.css"

const TODAY = new Date(2026, 4, 28)

export function DatePickerShowcase() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 4, 28))

  return (
    <div className={styles.row}>
      <MiniDatePicker
        value={date}
        onChange={setDate}
        today={TODAY}
        defaultMonth={TODAY}
      />
    </div>
  )
}
