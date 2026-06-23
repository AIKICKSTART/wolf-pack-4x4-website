"use client"

import styles from "./device-source-selector.module.css"

import type { CaptureDevice } from "./screen-recorder-types"

interface DeviceSourceSelectorProps {
  microphones: ReadonlyArray<CaptureDevice>
  speakers: ReadonlyArray<CaptureDevice>
  cameras: ReadonlyArray<CaptureDevice>
  microphoneId: string
  speakerId: string
  cameraId: string
  onMicrophoneChange?: (id: string) => void
  onSpeakerChange?: (id: string) => void
  onCameraChange?: (id: string) => void
  onTestMic?: () => void
  onTestCamera?: () => void
}

type DeviceKind = "microphone" | "speaker" | "camera"

interface DeviceGroupProps {
  kind: DeviceKind
  label: string
  devices: ReadonlyArray<CaptureDevice>
  selectedId: string
  onChange?: (id: string) => void
  glyph: string
}

function DeviceGroup({
  kind,
  label,
  devices,
  selectedId,
  onChange,
  glyph,
}: DeviceGroupProps) {
  const selected = devices.find((d) => d.id === selectedId) ?? devices[0]
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        <span className={styles.fieldGlyph} aria-hidden="true">{glyph}</span>
        {label}
      </span>
      <span className={styles.selectWrap}>
        <select
          className={styles.select}
          value={selectedId}
          onChange={(event) => onChange?.(event.target.value)}
          aria-label={label}
        >
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.label}
              {device.subtitle ? ` — ${device.subtitle}` : ""}
            </option>
          ))}
        </select>
        <span className={styles.caret} aria-hidden="true">▾</span>
      </span>
      {selected?.subtitle ? (
        <span className={styles.subtitle}>{selected.subtitle}</span>
      ) : (
        <span className={styles.subtitle}>{devices.length} {kind === "speaker" ? "outputs" : "sources"} detected</span>
      )}
    </label>
  )
}

export function DeviceSourceSelector({
  microphones,
  speakers,
  cameras,
  microphoneId,
  speakerId,
  cameraId,
  onMicrophoneChange,
  onSpeakerChange,
  onCameraChange,
  onTestMic,
  onTestCamera,
}: DeviceSourceSelectorProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.kicker}>Source devices</span>

      <div className={styles.grid}>
        <DeviceGroup
          kind="microphone"
          label="Microphone"
          devices={microphones}
          selectedId={microphoneId}
          onChange={onMicrophoneChange}
          glyph="🎙"
        />
        <DeviceGroup
          kind="speaker"
          label="Speaker"
          devices={speakers}
          selectedId={speakerId}
          onChange={onSpeakerChange}
          glyph="🔈"
        />
        <DeviceGroup
          kind="camera"
          label="Camera"
          devices={cameras}
          selectedId={cameraId}
          onChange={onCameraChange}
          glyph="📷"
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={[styles.test, styles.testMic].join(" ")}
          onClick={onTestMic}
        >
          <span aria-hidden="true">●</span> Test microphone
        </button>
        <button
          type="button"
          className={[styles.test, styles.testCamera].join(" ")}
          onClick={onTestCamera}
        >
          <span aria-hidden="true">▣</span> Test camera
        </button>
      </div>
    </div>
  )
}
