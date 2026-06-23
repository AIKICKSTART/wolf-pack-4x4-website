/**
 * Shared types for the ADR (Australian Design Rules) compliance primitives.
 * Visual reference only — no real backend.
 */

/** Tonal band classifications for measured sound pressure level (SPL). */
export type SoundComplianceBand = "legal" | "borderline" | "over"

/** Microphone position used during the noise test. */
export type TestPosition = "stationary" | "drive-by" | "rev-test"

/** Calibration / availability state of an in-workshop instrument. */
export type EquipmentStatus = "ok" | "due-soon" | "overdue" | "fault"

/** Pass / fail / not-yet-tested. */
export type ComplianceResult = "pass" | "fail" | "pending"

/** Australian Design Rule references commonly used by exhaust workshops. */
export type AdrRuleId =
  | "adr-28-01" // Sound emissions — passenger cars / light commercials
  | "adr-28-02" // Sound emissions — heavy / extended vehicles
  | "adr-79-04" // Emission control for light vehicles (Euro 5/6 equiv)
  | "adr-83-00" // Engine power / external noise — motorcycles
  | "nsw-vsi-08" // NSW Vehicle Standards Information — exhaust modifications
  | "nsw-vsi-14" // NSW Vehicle Standards Information — vehicle modifications

/** Catalogue of ADR rules — name + plain-English summary + official link. */
export interface AdrRuleDetail {
  id: AdrRuleId
  number: string
  title: string
  summary: string
  href: string
}

export const ADR_RULES: Readonly<Record<AdrRuleId, AdrRuleDetail>> = {
  "adr-28-01": {
    id: "adr-28-01",
    number: "ADR 28/01",
    title: "Stationary Sound Emissions — Light Vehicles",
    summary:
      "Caps the close-proximity stationary noise of passenger cars and light commercial vehicles at 90 dB(A) measured 0.5 m from the tailpipe at three-quarter rated engine speed.",
    href: "https://www.legislation.gov.au/F2006L01403/latest",
  },
  "adr-28-02": {
    id: "adr-28-02",
    number: "ADR 28/02",
    title: "Stationary Sound Emissions — Extended Vehicles",
    summary:
      "Sets a 92 dB(A) ceiling for buses, heavier light commercials and extended passenger vehicles measured under the same stationary close-proximity protocol.",
    href: "https://www.legislation.gov.au/F2006L01403/latest",
  },
  "adr-79-04": {
    id: "adr-79-04",
    number: "ADR 79/04",
    title: "Emission Control — Light Vehicles (Euro 5/6)",
    summary:
      "Mandates exhaust gas emission limits for new light vehicles harmonised with the Euro 5/6 regulations. Modifications must not defeat the OEM emissions system.",
    href: "https://www.legislation.gov.au/F2013L00185/latest",
  },
  "adr-83-00": {
    id: "adr-83-00",
    number: "ADR 83/00",
    title: "External Noise — Motorcycles",
    summary:
      "Caps motorcycle external noise at 94 dB(A) under the prescribed test method. Aftermarket mufflers must be ADR-approved or carry a workshop-issued compliance plate.",
    href: "https://www.legislation.gov.au/F2006L01406/latest",
  },
  "nsw-vsi-08": {
    id: "nsw-vsi-08",
    number: "NSW VSI 08",
    title: "Exhaust Noise — NSW Vehicle Standards Information",
    summary:
      "NSW EPA / TfNSW guidance on aftermarket exhaust modifications. Workshops must not fit systems above the ADR limit and may be subject to roadside defect notices.",
    href: "https://roads-waterways.transport.nsw.gov.au/business-industry/vehicle-standards-information",
  },
  "nsw-vsi-14": {
    id: "nsw-vsi-14",
    number: "NSW VSI 14",
    title: "Vehicle Modifications — Engineer Sign-Off",
    summary:
      "NSW Vehicle Standards Information 14 outlines which exhaust + engine modifications require certification by a recognised engineer and the supporting documentation.",
    href: "https://roads-waterways.transport.nsw.gov.au/business-industry/vehicle-standards-information",
  },
} as const

/** Map a measured dB(A) reading + a limit into a compliance band. */
export function classifySoundBand(
  measuredDb: number,
  limitDb: number,
  borderlineWindow = 2,
): SoundComplianceBand {
  if (measuredDb > limitDb) return "over"
  if (measuredDb >= limitDb - borderlineWindow) return "borderline"
  return "legal"
}

/** Tone mapping used by chips, meters and waveforms for the three bands. */
export const SOUND_BAND_TONE: Readonly<Record<SoundComplianceBand, "green" | "amber" | "red">> = {
  legal: "green",
  borderline: "amber",
  over: "red",
}

/** Label used on the compliance band chip glyph. */
export const SOUND_BAND_LABEL: Readonly<Record<SoundComplianceBand, string>> = {
  legal: "Legal",
  borderline: "Borderline",
  over: "Over limit",
}
