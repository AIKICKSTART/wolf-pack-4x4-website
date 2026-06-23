"use client"

import {
  Bluetooth,
  ChevronDown,
  Headphones,
  Smartphone,
  Speaker,
  Tv2,
  Volume2,
  type LucideIcon,
} from "lucide-react"
import { useState } from "react"

import { Popover } from "../primitives/popover"
import type { AudioOutputDevice } from "./audio-types"
import styles from "./speaker-selector.module.css"

interface SpeakerSelectorProps {
  devices: ReadonlyArray<AudioOutputDevice>
  activeDeviceId?: string
  onDeviceChange?: (deviceId: string) => void
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

export function SpeakerSelector({
  devices,
  activeDeviceId,
  onDeviceChange,
  className,
}: SpeakerSelectorProps) {
  const [open, setOpen] = useState<boolean>(false)
  const active =
    devices.find((d) => d.id === activeDeviceId) ??
    devices.find((d) => d.active) ??
    devices[0]
  const ActiveIcon = active ? DEVICE_ICON[active.kind] : Speaker

  const handleSelect = (deviceId: string) => {
    onDeviceChange?.(deviceId)
    setOpen(false)
  }

  const triggerClasses = [styles.trigger, className].filter(Boolean).join(" ")

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement="bottom"
      align="end"
      contentClassName={styles.popup}
      trigger={
        <button
          type="button"
          className={triggerClasses}
          aria-label={`Audio output: ${active ? active.label : "Default"}`}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className={styles.triggerIcon} aria-hidden="true">
            <ActiveIcon size={14} strokeWidth={2.2} />
          </span>
          <span className={styles.triggerLabel}>
            {active ? active.label : "Output device"}
          </span>
          <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
        </button>
      }
    >
      <ul className={styles.list} role="listbox" aria-label="Output devices">
        {devices.map((device) => {
          const Icon = DEVICE_ICON[device.kind]
          const selected = active?.id === device.id
          return (
            <li key={device.id}>
              <button
                type="button"
                className={styles.option}
                role="option"
                aria-selected={selected}
                onClick={() => handleSelect(device.id)}
              >
                <span className={styles.optionIcon} aria-hidden="true">
                  <Icon size={14} strokeWidth={2.2} />
                </span>
                <span className={styles.optionBody}>
                  <span className={styles.optionLabel}>{device.label}</span>
                  {device.subtitle ? (
                    <span className={styles.optionSubtitle}>{device.subtitle}</span>
                  ) : null}
                </span>
                {selected ? (
                  <span className={styles.optionMark} aria-hidden="true">
                    ●
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </Popover>
  )
}

export default SpeakerSelector
