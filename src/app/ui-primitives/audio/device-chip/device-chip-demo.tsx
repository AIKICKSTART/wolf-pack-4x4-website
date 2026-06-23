"use client"

import { useState } from "react"

import { AudioDeviceChip } from "../../components/audio"
import type { AudioOutputDevice } from "../../components/audio/audio-types"

import { DEMO_DEVICES } from "../demo-data"
import styles from "../audio.module.css"

export function DeviceChipDemo() {
  const [activeId, setActiveId] = useState<string>("dev-macbook")
  const devices = DEMO_DEVICES.map((device) => ({
    ...device,
    active: device.id === activeId,
  }))

  const handleSwitch = (device: AudioOutputDevice) => {
    setActiveId(device.id)
  }

  return (
    <div className={styles.demoStack}>
      {devices.map((device) => (
        <AudioDeviceChip
          key={device.id}
          device={device}
          onSwitch={handleSwitch}
        />
      ))}
    </div>
  )
}
