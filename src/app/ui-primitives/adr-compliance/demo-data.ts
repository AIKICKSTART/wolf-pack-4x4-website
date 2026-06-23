import type { RpmSample } from "../components/adr-compliance"
import type { AudioWaveformSamples } from "../components/audio/audio-types"

export const RPM_SAMPLES_POST_MOD: ReadonlyArray<RpmSample> = [
  { rpm: 800, db: 64 },
  { rpm: 1500, db: 71 },
  { rpm: 2500, db: 78 },
  { rpm: 3500, db: 83 },
  { rpm: 4500, db: 87 },
  { rpm: 5500, db: 89 },
  { rpm: 6500, db: 91 },
]

export const RPM_SAMPLES_PRE_MOD: ReadonlyArray<RpmSample> = [
  { rpm: 800, db: 58 },
  { rpm: 1500, db: 64 },
  { rpm: 2500, db: 70 },
  { rpm: 3500, db: 74 },
  { rpm: 4500, db: 78 },
  { rpm: 5500, db: 81 },
  { rpm: 6500, db: 82 },
]

export const PRE_MOD_WAVEFORM: AudioWaveformSamples = Array.from({ length: 48 }, (_, i) => {
  const phase = i / 48
  return 0.18 + Math.abs(Math.sin(phase * Math.PI * 5)) * 0.36
})

export const POST_MOD_WAVEFORM: AudioWaveformSamples = Array.from({ length: 48 }, (_, i) => {
  const phase = i / 48
  const base = 0.32 + Math.abs(Math.sin(phase * Math.PI * 6.2)) * 0.5
  return Math.min(0.96, base + (i % 3 === 0 ? 0.08 : 0))
})

export const SAMPLE_VEHICLE = {
  rego: "ABC123",
  vin: "6H8VFZ72F8L123456",
  description: "2008 Holden VE Commodore SS — Sedan",
  customerName: "Mason Carragher",
}

export const SAMPLE_WORKSHOP = {
  name: "Oak Flats Mufflermen",
  abn: "12 345 678 901",
  address: "Unit 4 / 21 Industrial Rd, Oak Flats NSW 2529",
  technician: "Will Brierley",
  technicianLicence: "MVRL 78421",
}
