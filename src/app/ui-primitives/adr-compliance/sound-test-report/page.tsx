import type { Metadata } from "next"

import { SoundTestReport } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import { POST_MOD_WAVEFORM, PRE_MOD_WAVEFORM } from "../demo-data"
import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Sound test report | ADR compliance",
  description:
    "Primitive 03 — pre-modification and post-modification sound test report card with microphone position diagram.",
}

export default function SoundTestReportScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Test report"
        title="Sound test report"
        description="Composes a wrapping DashboardCard pattern with two AudioWaveform captures, a microphone-position sketch, signed-by chip and ComplianceBandChip. Designed to print or be shared with NSW EPA defect-notice respondents."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Sound test report" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Compliant outcome · within limit</span>
        <SoundTestReport
          title="VE Commodore SS · Cat-back compliance"
          preModDb={84.2}
          postModDb={88.6}
          limitDb={90}
          ruleLabel="ADR 28/01"
          position="stationary"
          testedIso="2026-05-27T10:48:00+10:00"
          testedAt="Mon 27 May · 10:48"
          signedBy="Will Brierley · MVRL 78421"
          preSamples={PRE_MOD_WAVEFORM}
          postSamples={POST_MOD_WAVEFORM}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Over-limit outcome · borderline borderline borderline</span>
        <SoundTestReport
          title="HSV GTSR W1 · Track exhaust review"
          preModDb={86.1}
          postModDb={94.4}
          limitDb={92}
          ruleLabel="ADR 28/02"
          position="rev-test"
          testedIso="2026-05-26T15:12:00+10:00"
          testedAt="Sun 26 May · 15:12"
          signedBy="Dean Mitchell · MVRL 88011"
          preSamples={PRE_MOD_WAVEFORM}
          postSamples={POST_MOD_WAVEFORM}
        />
      </section>
    </main>
  )
}
