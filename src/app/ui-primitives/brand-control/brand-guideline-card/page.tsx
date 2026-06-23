import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  BrandGuidelineCard,
  MOCK_GUIDELINES,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Brand guideline card | Brand control",
}

const [LOGO_RULE, VOICE_RULE, DO_RULE, DONT_RULE] = MOCK_GUIDELINES

function KnightBadgeIllustration() {
  return (
    <svg viewBox="0 0 100 100" width={84} height={84} aria-hidden="true">
      <rect x="6" y="6" width="88" height="88" rx="14" fill="var(--primitive-red)" />
      <path
        d="M30 30 L50 14 L70 30 L70 64 L50 84 L30 64 Z"
        fill="color-mix(in oklab, var(--primitive-text-on-accent) 16%, transparent)"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth="2"
      />
      <circle cx="50" cy="40" r="7" fill="var(--primitive-amber)" />
      <rect x="44" y="46" width="12" height="22" rx="3" fill="var(--primitive-text-on-accent)" />
    </svg>
  )
}

function ClearspaceIllustration() {
  return (
    <svg viewBox="0 0 200 100" width={180} height={92} aria-hidden="true">
      <rect x="50" y="20" width="60" height="60" rx="6" fill="var(--primitive-red)" />
      <rect x="20" y="50" width="170" height="2" fill="var(--primitive-amber)" strokeDasharray="3 3" />
      <text
        x="190"
        y="50"
        textAnchor="end"
        fontFamily="monospace"
        fontSize="10"
        fill="var(--primitive-amber)"
      >
        ½ badge
      </text>
    </svg>
  )
}

export default function BrandGuidelineCardRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 10"
          title="Brand guideline card"
          description="Single guideline rule (logo / voice / do / don't) with a print-friendly variant."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Brand guideline card" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            A logo clearspace rule with diagram, the voice attribute card, and a Do/Don&apos;t pair side-by-side in print mode.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Logo clearspace">
          <span className={styles.stateLabel}>State 01 · Logo</span>
          <BrandGuidelineCard rule={LOGO_RULE} illustration={<ClearspaceIllustration />} />
        </section>

        <section className={styles.stateWrap} aria-label="Voice attribute">
          <span className={styles.stateLabel}>State 02 · Voice</span>
          <BrandGuidelineCard
            rule={{
              ...VOICE_RULE,
              emphasis: '"We replaced your factory cat-back. Pickup is sharper from 2,400 rpm." — not "We facilitated an enhanced acoustic experience."',
            }}
          />
        </section>

        <section
          className={styles.stateGrid}
          aria-label="Do / Don't print mode"
        >
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 03a · Do (print)</span>
            <BrandGuidelineCard rule={DO_RULE} printMode />
          </div>
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 03b · Don&apos;t (print)</span>
            <BrandGuidelineCard
              rule={DONT_RULE}
              printMode
              illustration={<KnightBadgeIllustration />}
            />
          </div>
        </section>
      </div>
    </main>
  )
}
