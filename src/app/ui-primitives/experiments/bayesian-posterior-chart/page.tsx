import type { Metadata } from "next"

import { BayesianPosteriorChart } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Bayesian posterior | Experiments",
  description:
    "Primitive 10 — posterior density per variant + credible interval overlays + P(beat baseline) per arm.",
}

/** Synthetic bell shape sampled into N bins. */
function bellDensity(
  bins: number,
  centerRatio: number,
  width: number,
): ReadonlyArray<number> {
  const out: number[] = []
  const center = centerRatio * bins
  for (let i = 0; i < bins; i += 1) {
    const z = (i - center) / width
    out.push(Math.exp(-0.5 * z * z))
  }
  return out
}

export default function BayesianPosteriorScenePage() {
  const bins = 80

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Bayesian"
        title="Bayesian posterior chart"
        description="Posterior density per variant with 95% credible interval overlays. Each arm has a chip showing P(beat baseline) — the cleanest decision signal in a Bayesian A/B framing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Bayesian posterior" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · posteriors over conversion rate
        </span>
        <BayesianPosteriorChart
          xMin={0}
          xMax={0.32}
          xLabel="Quote → booking conversion rate"
          variants={[
            {
              id: "control",
              name: "Save then price",
              density: bellDensity(bins, 0.58, 7),
              credibleInterval: [0.176, 0.196],
              probToBeatBaseline: 0.5,
              tone: "amber",
              isBaseline: true,
            },
            {
              id: "live",
              name: "Live preview",
              density: bellDensity(bins, 0.71, 8),
              credibleInterval: [0.212, 0.236],
              probToBeatBaseline: 0.987,
              tone: "teal",
            },
            {
              id: "anim",
              name: "Live + animated",
              density: bellDensity(bins, 0.68, 10),
              credibleInterval: [0.198, 0.232],
              probToBeatBaseline: 0.81,
              tone: "green",
            },
          ]}
        />
      </section>
    </main>
  )
}
