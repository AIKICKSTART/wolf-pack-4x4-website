import type { Metadata } from "next"

import { AudioDeviceChip } from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import { DEMO_DEVICES } from "../demo-data"
import { DeviceChipDemo } from "./device-chip-demo"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Audio device chip | Audio Primitives",
  description:
    "Primitive 07 — compact chip showing the current audio output device with an optional switch action.",
}

export default function DeviceChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Device chip"
        title="Audio device chip"
        description="Compact chip representing an audio output device. Shows the device kind glyph, label, kind label, and an active-dot when this is the selected output. When given onSwitch becomes a button with a Switch hint."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Device chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Static & interactive</span>
        <div className={styles.demoStack}>
          {DEMO_DEVICES.map((device) => (
            <AudioDeviceChip key={device.id} device={device} />
          ))}
        </div>
        <span className={styles.demoLabel}>Interactive — click to switch active output</span>
        <DeviceChipDemo />
      </section>
    </main>
  )
}
