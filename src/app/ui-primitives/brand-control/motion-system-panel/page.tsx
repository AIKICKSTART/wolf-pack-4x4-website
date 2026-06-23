import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_DURATIONS,
  MOCK_EASINGS,
  MotionSystemPanel,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Motion system | Brand control",
}

const SNAPPY_DURATIONS = MOCK_DURATIONS.slice(0, 3)
const SLOW_DURATIONS = MOCK_DURATIONS.slice(2)

export default function MotionSystemPanelRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 04"
          title="Motion system panel"
          description="Duration × easing tokens with a live scrubber. The dot rides the active easing curve so you can feel the rhythm before adopting it."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Motion system" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            Default mid-tempo (Normal × Standard), a snappier UI-tier preview, and a slow cinematic preview. The scrubber respects prefers-reduced-motion.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Default mid-tempo">
          <span className={styles.stateLabel}>State 01 · Normal · Standard</span>
          <MotionSystemPanel
            durations={MOCK_DURATIONS}
            easings={MOCK_EASINGS}
            defaultDurationId="normal"
            defaultEasingId="standard"
          />
        </section>

        <section className={styles.stateWrap} aria-label="Snappy UI tier">
          <span className={styles.stateLabel}>State 02 · Fast · Snappy</span>
          <MotionSystemPanel
            durations={SNAPPY_DURATIONS}
            easings={MOCK_EASINGS}
            defaultDurationId="fast"
            defaultEasingId="snappy"
          />
        </section>

        <section className={styles.stateWrap} aria-label="Cinematic slow tier">
          <span className={styles.stateLabel}>State 03 · Epic · Muffler torque</span>
          <MotionSystemPanel
            durations={SLOW_DURATIONS}
            easings={MOCK_EASINGS}
            defaultDurationId="epic"
            defaultEasingId="muffler"
          />
        </section>
      </div>
    </main>
  )
}
