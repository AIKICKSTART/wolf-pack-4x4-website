"use client"

import { useState } from "react"

import { VolumeSlider } from "../../components/audio"
import styles from "../audio.module.css"

export function VolumeSliderDemo() {
  const [horizontal, setHorizontal] = useState<number>(0.62)
  const [vertical, setVertical] = useState<number>(0.42)
  const [muted, setMuted] = useState<boolean>(false)

  return (
    <div className={styles.demoDouble}>
      <div className={styles.demoStack}>
        <span className={styles.demoLabel}>Horizontal with mute toggle</span>
        <VolumeSlider
          value={horizontal}
          onValueChange={setHorizontal}
          orientation="horizontal"
          showMuteToggle
          muted={muted}
          onMuteChange={setMuted}
        />
      </div>
      <div className={styles.demoStack}>
        <span className={styles.demoLabel}>Vertical</span>
        <VolumeSlider
          value={vertical}
          onValueChange={setVertical}
          orientation="vertical"
        />
      </div>
    </div>
  )
}
