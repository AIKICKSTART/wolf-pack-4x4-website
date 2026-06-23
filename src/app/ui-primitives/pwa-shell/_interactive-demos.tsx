"use client"

import { BiometricUnlockCard } from "../components/pwa-shell"

export function BiometricUnlockPinFallbackDemo() {
  return (
    <BiometricUnlockCard
      kind="fingerprint"
      state="error"
      crewName="Tatts Cleary"
      crewRole="Welder - Bay 3"
      initials="TC"
      pinFilled={2}
      errorMessage="Try again - glove smudged the sensor"
      onUsePin={() => undefined}
    />
  )
}
