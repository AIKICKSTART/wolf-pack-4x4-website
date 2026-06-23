import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DeviceSourceSelector } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Device source selector | Screen recorder",
  description:
    "Primitive 14 — source picker with microphone, speaker and camera dropdowns plus test-mic and test-camera CTAs.",
}

const MICROPHONES = [
  { id: "mic-rode", label: "Rode NT-USB Mini", subtitle: "Bench mic · USB 2.0", active: true },
  { id: "mic-dpa", label: "DPA 6060 Lav", subtitle: "Brodie · wireless" },
  { id: "mic-built", label: "MacBook Pro built-in", subtitle: "Backup only" },
]

const SPEAKERS = [
  { id: "spk-yamaha", label: "Yamaha HS5 monitors", subtitle: "Desk · 1/4-inch", active: true },
  { id: "spk-built", label: "MacBook Pro built-in" },
  { id: "spk-airpods", label: "AirPods Pro · Brodie", subtitle: "Bluetooth · 84% battery" },
]

const CAMERAS = [
  { id: "cam-logi", label: "Logitech Brio 4K", subtitle: "Tripod · over-shoulder", active: true },
  { id: "cam-built", label: "MacBook Pro FaceTime HD", subtitle: "720p · backup" },
  { id: "cam-iphone", label: "iPhone Continuity Camera", subtitle: "Hand-held overhead" },
]

export default function DeviceSourceSelectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Device source selector"
        title="Device source selector"
        description="The pre-record device picker. Microphone, speaker and camera dropdowns surface every detected input, with quick test CTAs for mic-and-camera before the operator commits to a take."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Device source selector" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop bench setup</span>
        <DeviceSourceSelector
          microphones={MICROPHONES}
          speakers={SPEAKERS}
          cameras={CAMERAS}
          microphoneId="mic-rode"
          speakerId="spk-yamaha"
          cameraId="cam-logi"
        />
      </section>
    </main>
  )
}
