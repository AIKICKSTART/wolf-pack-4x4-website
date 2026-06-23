"use client"

import { useState } from "react"

import { SoundPresetRow } from "../../components/notifications-system"

import { MOCK_SOUND_PRESETS } from "../_mock-data"
import styles from "../notifications-system.module.css"

export function SoundPresetPickerDemo() {
  const [selected, setSelected] = useState<string>("muffler-purr")

  return (
    <div className={styles.demoStack}>
      {MOCK_SOUND_PRESETS.map((preset) => (
        <SoundPresetRow
          key={preset.id}
          preset={preset}
          selected={selected === preset.id}
          onSelect={(id) => setSelected(id)}
        />
      ))}
    </div>
  )
}
