import type { Metadata } from "next"

import { CalloutBlock } from "../../components/block-editor"
import { PageHeader } from "../../components/page-header"
import type { BlockData, CalloutPayload } from "../../components/block-editor"

import { CALLOUT_BLOCK, SAMPLE_ERROR } from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Callout block | Block editor",
  description:
    "Primitive 11 — info / warning / tip / danger callout with icon + dismissible flag. Render, edit, and error states.",
}

const KINDS: ReadonlyArray<BlockData<CalloutPayload>> = (
  ["info", "warning", "tip", "danger"] as const
).map((kind, idx) => ({
  ...CALLOUT_BLOCK,
  id: `${CALLOUT_BLOCK.id}-${kind}`,
  payload: {
    ...CALLOUT_BLOCK.payload,
    kind,
    title:
      kind === "info"
        ? "Bay 3 is bookings-only today"
        : kind === "warning"
        ? "DPF cleaning needs specialised tools"
        : kind === "tip"
        ? "Drop the keys in the slot if you arrive after 5pm"
        : "Danger — turbo line under pressure",
    body:
      kind === "info"
        ? "Walk-ins are still welcome at the parts counter, but the hoist is locked to scheduled jobs."
        : kind === "warning"
        ? "Diesel particulate filter regen and bake-off requires our Bay 5 oven and a proprietary ash scale."
        : kind === "tip"
        ? "Slip the slip+rego under the rolladoor — Daniel collects the run sheet at 6am sharp."
        : "Do not crack the oil-feed line on a hot turbo. Wait for engine-off + 30 minutes minimum.",
    dismissible: idx % 2 === 0,
  },
}))

export default function CalloutBlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Callout"
        title="Callout block"
        description="Four callout kinds — info, warning, tip, danger — with tinted icons and optional dismiss button. Edit mode flips kind and dismissibility."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Callout" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <span className={styles.stateLabel}>Render mode · four kinds</span>
          {KINDS.map((demo) => (
            <CalloutBlock key={demo.id} data={demo} mode="preview" />
          ))}
          <span className={`${styles.stateLabel} ${styles.stateLabelEdit}`}>
            Edit mode · kind + dismissible
          </span>
          <CalloutBlock data={CALLOUT_BLOCK} mode="edit" />
          <span className={`${styles.stateLabel} ${styles.stateLabelError}`}>
            Error state
          </span>
          <CalloutBlock data={CALLOUT_BLOCK} mode="error" error={SAMPLE_ERROR} />
        </div>
      </section>
    </main>
  )
}
