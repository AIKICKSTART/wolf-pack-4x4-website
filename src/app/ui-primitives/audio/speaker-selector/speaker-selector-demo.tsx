"use client"

import { useState } from "react"

import { SpeakerSelector } from "../../components/audio"
import { DEMO_DEVICES } from "../demo-data"

export function SpeakerSelectorDemo() {
  const [activeId, setActiveId] = useState<string>("dev-macbook")
  return (
    <SpeakerSelector
      devices={DEMO_DEVICES}
      activeDeviceId={activeId}
      onDeviceChange={setActiveId}
    />
  )
}
