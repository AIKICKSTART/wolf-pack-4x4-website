"use client"

import {
  Bluetooth,
  Headphones,
  Smartphone,
  Speaker,
  Tv2,
  Volume2,
  type LucideIcon,
} from "lucide-react"

import type { AudioOutputDevice } from "./audio-types"
import styles from "./audio-device-chip.module.css"

interface AudioDeviceChipProps {
  device: AudioOutputDevice
  /** Optional handler — when supplied the chip becomes a button. */
  onSwitch?: (device: AudioOutputDevice) => void
  className?: string
}

const DEVICE_ICON: Record<AudioOutputDevice["kind"], LucideIcon> = {
  speakers: Volume2,
  headphones: Headphones,
  bluetooth: Bluetooth,
  "av-receiver": Speaker,
  phone: Smartphone,
  tv: Tv2,
}

const DEVICE_KIND_LABEL: Record<AudioOutputDevice["kind"], string> = {
  speakers: "Speakers",
  headphones: "Headphones",
  bluetooth: "Bluetooth",
  "av-receiver": "AV Receiver",
  phone: "Phone",
  tv: "Television",
}

export function AudioDeviceChip({
  device,
  onSwitch,
  className,
}: AudioDeviceChipProps) {
  const Icon = DEVICE_ICON[device.kind]
  const isInteractive = typeof onSwitch === "function"
  const classes = [
    styles.chip,
    device.active ? styles.active : "",
    isInteractive ? styles.interactive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const content = (
    <>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={14} strokeWidth={2.2} />
      </span>
      <span className={styles.body}>
        <span className={styles.label}>{device.label}</span>
        <span className={styles.kind}>
          {device.subtitle ?? DEVICE_KIND_LABEL[device.kind]}
        </span>
      </span>
      {device.active ? (
        <span className={styles.dot} aria-label="Active output">
          ●
        </span>
      ) : null}
      {isInteractive ? (
        <span className={styles.switch} aria-hidden="true">
          Switch
        </span>
      ) : null}
    </>
  )

  if (isInteractive) {
    return (
      <button
        type="button"
        className={classes}
        onClick={() => onSwitch?.(device)}
        aria-label={`Switch to ${device.label}`}
      >
        {content}
      </button>
    )
  }

  return <span className={classes}>{content}</span>
}

export default AudioDeviceChip
