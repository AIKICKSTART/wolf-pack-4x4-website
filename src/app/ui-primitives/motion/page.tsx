import type { Metadata } from "next"
import type { ReactNode } from "react"

import { PageHeader } from "../components/page-header"
import {
  CountUpWatcher,
  FadeIn,
  GradientTrail,
  Magnetic,
  MotionConfig,
  MorphText,
  ParallaxText,
  Reveal,
  ScaleIn,
  ScrollReveal,
  SlideIn,
  StaggerList,
  Tilt,
  durations,
  easings,
  formatEasing,
  transitions,
} from "../components/motion"
import { Chip, type ChipTone } from "../components/primitives/chip"
import { Kbd, KbdGroup } from "../components/primitives/kbd"
import {
  ProgressLinear,
  type ProgressLinearTone,
} from "../components/primitives/progress-linear"

import { ConfettiDemo } from "./confetti-demo"
import styles from "./motion.module.css"

export const metadata: Metadata = {
  title: "Motion System | UI Primitives",
}

interface SectionMeta {
  index: string
  id: string
  title: string
  primitive: string
  trigger: string
  state: string
  contract: string
  description: string
  tone: ChipTone
  progressTone: ProgressLinearTone
  readiness: number
}

interface ContractCard {
  title: string
  body: string
  chip: string
  key: string
  tone: ChipTone
  progressTone: ProgressLinearTone
  value: number
}

const CONTRACT_CARDS: ReadonlyArray<ContractCard> = [
  {
    title: "Token rail",
    body: "Every primitive resolves duration, easing, and transition presets from the shared manifest before local overrides.",
    chip: "shared manifest",
    key: "hero",
    tone: "red",
    progressTone: "red",
    value: 92,
  },
  {
    title: "Trigger clarity",
    body: "Each demo states the event boundary first: viewport, pointer, scroll progress, loop, or active prop transition.",
    chip: "observable",
    key: "in-view",
    tone: "teal",
    progressTone: "teal",
    value: 88,
  },
  {
    title: "Motion safety",
    body: "The lab keeps reduced-motion behaviour visible in the contract so animation never becomes the only state signal.",
    chip: "reduced-safe",
    key: "OS",
    tone: "green",
    progressTone: "green",
    value: 100,
  },
]

const SECTIONS: ReadonlyArray<SectionMeta> = [
  {
    index: "01",
    id: "reveal",
    title: "Reveal",
    primitive: "Reveal",
    trigger: "In-view",
    state: "fires once",
    contract: "Transform + opacity resolves to final state under reduced motion.",
    description:
      "Generic reveal wrapper for content that should enter once. Use it when the content itself is static and the entrance is the only motion layer.",
    tone: "red",
    progressTone: "red",
    readiness: 94,
  },
  {
    index: "02",
    id: "stagger-list",
    title: "Stagger list",
    primitive: "StaggerList",
    trigger: "In-view group",
    state: "child rail",
    contract:
      "The container watches the viewport, then children inherit a per-item delay.",
    description:
      "Auto-staggers every child of a list. Use for task flows, process cards, and ordered workshop states where sequence improves scanability.",
    tone: "amber",
    progressTone: "amber",
    readiness: 90,
  },
  {
    index: "03",
    id: "fade-in",
    title: "Fade in",
    primitive: "FadeIn",
    trigger: "In-view",
    state: "opacity only",
    contract: "No spatial movement, so dense text and media remain stable.",
    description:
      "Single-purpose fade for dense type, charts, and full-bleed media where adding transform motion would feel noisy.",
    tone: "neutral",
    progressTone: "teal",
    readiness: 96,
  },
  {
    index: "04",
    id: "slide-in",
    title: "Slide in",
    primitive: "SlideIn",
    trigger: "In-view",
    state: "directional",
    contract: "Distance and direction are explicit, with emphasized easing.",
    description:
      "Directional slide-in for panels and drawers that need a clear origin. The overshoot tail keeps the land intentional without feeling loose.",
    tone: "teal",
    progressTone: "teal",
    readiness: 89,
  },
  {
    index: "05",
    id: "scale-in",
    title: "Scale in",
    primitive: "ScaleIn",
    trigger: "In-view",
    state: "anchored",
    contract: "Scale is paired with opacity and an explicit transform origin.",
    description:
      "Scale-from-anchor tiles. Useful for quote cards, status tiles, and compact success states that should feel placed rather than dropped.",
    tone: "green",
    progressTone: "green",
    readiness: 91,
  },
  {
    index: "06",
    id: "magnetic",
    title: "Magnetic",
    primitive: "Magnetic",
    trigger: "Pointer",
    state: "hover pull",
    contract: "Pointer translation is clamped, spring-smoothed, and reset.",
    description:
      "Mouse-attracted wrapper for high-value controls. It resets on pointer leave or blur and stays inert under reduced motion.",
    tone: "red",
    progressTone: "red",
    readiness: 84,
  },
  {
    index: "07",
    id: "tilt",
    title: "Tilt",
    primitive: "Tilt",
    trigger: "Pointer",
    state: "3D spring",
    contract: "Pointer position maps to clamped rotateX / rotateY values.",
    description:
      "3D tilt with perspective context for premium cards. Reduced-motion disables rotation so the component keeps the same readable surface.",
    tone: "amber",
    progressTone: "amber",
    readiness: 86,
  },
  {
    index: "08",
    id: "parallax-text",
    title: "Parallax text",
    primitive: "ParallaxText",
    trigger: "Scroll",
    state: "viewport progress",
    contract: "Each instance owns its scroll measurement and y-axis range.",
    description:
      "Long-form text drifts as the user scrolls through the wrapper. Reserve it for editorial bands and hero-grade rhythm changes.",
    tone: "teal",
    progressTone: "teal",
    readiness: 82,
  },
  {
    index: "09",
    id: "scroll-reveal",
    title: "Scroll reveal",
    primitive: "ScrollReveal",
    trigger: "Scroll",
    state: "continuous",
    contract: "Opacity and drift ramp with scroll progress instead of firing once.",
    description:
      "Continuous scroll-bound reveal for scrolly compositions where the user should feel progress through a sequence.",
    tone: "green",
    progressTone: "green",
    readiness: 85,
  },
  {
    index: "10",
    id: "morph-text",
    title: "Morph text",
    primitive: "MorphText",
    trigger: "Hover / interval",
    state: "crossfade",
    contract: "Width is reserved by a hidden sizer so layout does not jump.",
    description:
      "Text state swap for compact labels and headlines. Hover and interval modes both keep a stable layout and announce changes politely.",
    tone: "amber",
    progressTone: "amber",
    readiness: 93,
  },
  {
    index: "11",
    id: "gradient-trail",
    title: "Gradient trail",
    primitive: "GradientTrail",
    trigger: "Loop",
    state: "decorative",
    contract: "Consumer supplies the path; the SVG remains aria-hidden.",
    description:
      "Stroke-dash animation that traces along any supplied SVG path. Use as a supporting layer, never as the only status indicator.",
    tone: "teal",
    progressTone: "teal",
    readiness: 87,
  },
  {
    index: "12",
    id: "count-up-watcher",
    title: "Count-up watcher",
    primitive: "CountUpWatcher",
    trigger: "In-view",
    state: "number tween",
    contract: "The existing CountUp primitive starts only after visibility.",
    description:
      "A count-up value behind an in-view gate. Reduced motion snaps the number to its final value while preserving the metric context.",
    tone: "green",
    progressTone: "green",
    readiness: 95,
  },
  {
    index: "13",
    id: "confetti-on-success",
    title: "Confetti on success",
    primitive: "ConfettiOnSuccess",
    trigger: "Active prop",
    state: "rising edge",
    contract: "A false-to-true active prop flip fires a single burst or cannon.",
    description:
      "Celebratory state primitive for completed jobs and successful flows. The visual burst is paired with a persistent button state in the demo.",
    tone: "red",
    progressTone: "red",
    readiness: 88,
  },
]

const TRAIL_PATH =
  "M 0 22 Q 30 4 60 22 T 120 22 T 180 22 T 240 22 T 300 22 T 360 22"

function SectionShell({
  meta,
  children,
}: {
  meta: SectionMeta
  children: ReactNode
}) {
  return (
    <section
      className={styles.section}
      data-tone={meta.tone}
      aria-labelledby={`motion-section-${meta.id}`}
    >
      <header className={styles.sectionHeader}>
        <span className={styles.sectionIndex}>{meta.index}</span>
        <div className={styles.sectionHeaderBody}>
          <div className={styles.metaRow}>
            <Chip label={meta.primitive} tone={meta.tone} selected />
            <Kbd size="sm">{meta.trigger}</Kbd>
            <Kbd size="sm">{meta.state}</Kbd>
          </div>
          <h2 id={`motion-section-${meta.id}`}>{meta.title}</h2>
          <p>{meta.description}</p>
        </div>
        <aside className={styles.contractRail} aria-label={`${meta.title} motion contract`}>
          <span>{meta.contract}</span>
          <ProgressLinear
            label="Lab readiness"
            value={meta.readiness}
            tone={meta.progressTone}
            variant="segmented"
            segments={8}
            showLabel
          />
        </aside>
      </header>
      <div className={styles.demo}>{children}</div>
    </section>
  )
}

function DemoCue({
  tone = "neutral",
  label,
  children,
}: {
  tone?: ChipTone
  label: string
  children: ReactNode
}) {
  return (
    <div className={styles.cueRow}>
      <Chip label={label} tone={tone} selected />
      <span className={styles.trigger}>{children}</span>
    </div>
  )
}

export default function MotionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Umbrella motion system"
        description="Every reveal, slide, scale, magnetic, tilt, scroll-reveal, and morph in the Oak Flats Mufflermen voice shares a single easing and duration manifest. Edit one token and the whole subtree cascades."
        dnaSectionId="motion"
      />

      <MotionConfig defaultTransition="hero" reducedMotion="user">
        <section className={styles.labBridge} aria-labelledby="motion-contract-title">
          <div className={styles.bridgeCopy}>
            <div className={styles.metaRow} aria-label="Motion lab status">
              <Chip label="Dark-first" tone="red" selected />
              <Chip label="Light parity" tone="teal" selected />
              <Chip label="Reduced-motion ready" tone="green" selected />
            </div>
            <h2 id="motion-contract-title">Production primitive lab</h2>
            <p>
              This route now reads like a QA surface for the motion layer: each primitive has a trigger,
              a state contract, a readiness rail, and a live demo wired through the same provider.
            </p>
            <div className={styles.bridgeKeys} aria-label="Shared motion controls">
              <KbdGroup separator="">
                <Kbd size="sm">MotionConfig</Kbd>
                <Kbd size="sm">hero</Kbd>
              </KbdGroup>
              <KbdGroup separator="">
                <Kbd size="sm">OS</Kbd>
                <Kbd size="sm">reduce</Kbd>
              </KbdGroup>
            </div>
          </div>
          <div className={styles.bridgePanel} aria-label="Motion contract checks">
            {CONTRACT_CARDS.map((card) => (
              <article key={card.title} className={styles.contractCard}>
                <header>
                  <Chip label={card.chip} tone={card.tone} selected />
                  <Kbd size="sm">{card.key}</Kbd>
                </header>
                <strong>{card.title}</strong>
                <p>{card.body}</p>
                <ProgressLinear
                  label="Coverage"
                  value={card.value}
                  tone={card.progressTone}
                  variant="segmented"
                  segments={10}
                  showLabel
                />
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.section}
          data-tone="red"
          aria-labelledby="motion-section-motion-config"
        >
          <header className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>00</span>
            <div className={styles.sectionHeaderBody}>
              <div className={styles.metaRow}>
                <Chip label="MotionConfig" tone="red" selected />
                <Kbd size="sm">provider</Kbd>
                <Kbd size="sm">user preference</Kbd>
              </div>
              <h2 id="motion-section-motion-config">MotionConfig provider</h2>
              <p>
                The showcase runs through the shared provider, publishing the same transition preset
                and reduced-motion strategy to every child primitive below.
              </p>
            </div>
            <aside className={styles.contractRail} aria-label="Provider contract">
              <span>Default transition is hero; reduced motion follows the operating system.</span>
              <ProgressLinear
                label="Provider coverage"
                value={100}
                tone="red"
                variant="segmented"
                segments={8}
                showLabel
              />
            </aside>
          </header>
          <div className={styles.demo}>
            <DemoCue label="Scope" tone="red">
              hero transition preset flows through reveal and slide primitives
            </DemoCue>
            <div className={styles.providerGrid}>
              <Reveal from="below" delay={80}>
                <div className={styles.demoCard}>
                  <strong>Provider active</strong>
                  <span>Reveal, slide, scale, magnetic, tilt, and scroll primitives inherit one timing rail.</span>
                </div>
              </Reveal>
              <SlideIn from="left" distance={72}>
                <div className={styles.demoCard}>
                  <strong>Reduced motion</strong>
                  <span>Operating-system motion preference stays respected across the subtree.</span>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        <SectionShell meta={SECTIONS[0]}>
          <DemoCue label="Trigger" tone="red">
            scroll element into view
          </DemoCue>
          <Reveal from="below" delay={80}>
            <h3 className={styles.demoHeadline}>Rebuilt to order</h3>
          </Reveal>
          <Reveal from="left" delay={220}>
            <div className={styles.demoCard}>
              <strong>Bay 04 release</strong>
              <span>Stainless cat-back, mandrel-bent, dyno-sheet attached.</span>
            </div>
          </Reveal>
        </SectionShell>

        <SectionShell meta={SECTIONS[1]}>
          <DemoCue label="Trigger" tone="amber">
            container enters viewport, then children inherit stagger
          </DemoCue>
          <StaggerList from="below" stagger={90} className={styles.staggerGrid}>
            <div className={styles.demoCard}>
              <strong>Diagnose</strong>
              <span>Pull the existing rig, image every weld.</span>
            </div>
            <div className={styles.demoCard}>
              <strong>Pattern</strong>
              <span>Set the bends against a clean rolling chassis.</span>
            </div>
            <div className={styles.demoCard}>
              <strong>Fabricate</strong>
              <span>Mandrel bends and TIG welds to spec.</span>
            </div>
            <div className={styles.demoCard}>
              <strong>Sign off</strong>
              <span>Dyno and leak check before the keys go back.</span>
            </div>
          </StaggerList>
        </SectionShell>

        <SectionShell meta={SECTIONS[2]}>
          <DemoCue label="Trigger">
            element enters viewport without spatial movement
          </DemoCue>
          <FadeIn delay={120}>
            <h3 className={styles.demoHeadline}>Half a century on Oak Flats Road</h3>
          </FadeIn>
        </SectionShell>

        <SectionShell meta={SECTIONS[3]}>
          <DemoCue label="Trigger" tone="teal">
            element enters viewport from the right
          </DemoCue>
          <SlideIn from="right" distance={120}>
            <div className={styles.demoCard}>
              <strong>Twin-tip release</strong>
              <span>4-inch polished, slash-cut, hangers welded in.</span>
            </div>
          </SlideIn>
        </SectionShell>

        <SectionShell meta={SECTIONS[4]}>
          <DemoCue label="Trigger" tone="green">
            element enters viewport from bottom-left origin
          </DemoCue>
          <ScaleIn from={0.92} origin="bottom left">
            <div className={styles.demoCard}>
              <strong>Quote 2415</strong>
              <span>Catalytic converter swap, in-stock, 3-day turnaround.</span>
            </div>
          </ScaleIn>
        </SectionShell>

        <SectionShell meta={SECTIONS[5]}>
          <DemoCue label="Pointer" tone="red">
            hover or focus the control surface
          </DemoCue>
          <div className={styles.centeredDemo}>
            <Magnetic strength={18}>
              <button type="button" className={styles.demoButton}>
                Book a bay
              </button>
            </Magnetic>
          </div>
        </SectionShell>

        <SectionShell meta={SECTIONS[6]}>
          <DemoCue label="Pointer" tone="amber">
            hover the card surface
          </DemoCue>
          <Tilt maxRotate={9}>
            <span className={styles.tiltCard}>
              <strong>Stage one cat-back</strong>
              <span>SUS304, mandrel, 2.5-inch, 4-inch tips</span>
            </span>
          </Tilt>
        </SectionShell>

        <SectionShell meta={SECTIONS[7]}>
          <DemoCue label="Scroll" tone="teal">
            scroll past the wrapper to move the text rail
          </DemoCue>
          <ParallaxText range={90}>
            <div className={styles.parallaxStrip}>
              <p>Workshop. Floor. Tested.</p>
              <p>Driven. Logged. Signed off.</p>
            </div>
          </ParallaxText>
        </SectionShell>

        <SectionShell meta={SECTIONS[8]}>
          <DemoCue label="Scroll" tone="green">
            continuous progress through the viewport
          </DemoCue>
          <div className={styles.scrollStack}>
            <ScrollReveal yDrift={80} className={styles.scrollRevealItem}>
              <div className={styles.demoCard}>
                <strong>Logged - Stage 1</strong>
                <span>Headers on, mid-pipe matched.</span>
              </div>
            </ScrollReveal>
            <ScrollReveal
              yDrift={80}
              startProgress={0.1}
              endProgress={0.7}
              className={styles.scrollRevealItem}
            >
              <div className={styles.demoCard}>
                <strong>Logged - Stage 2</strong>
                <span>Cat-back to back-pressure spec.</span>
              </div>
            </ScrollReveal>
          </div>
        </SectionShell>

        <SectionShell meta={SECTIONS[9]}>
          <DemoCue label="Hover" tone="amber">
            pointer or focus toggles the headline state
          </DemoCue>
          <p className={styles.morphRow}>
            <span>Hover</span>
            <MorphText from="Off the rack" to="Built proper" trigger="hover" />
          </p>
          <DemoCue label="Interval" tone="amber">
            timed interval repeats every 2.4 seconds
          </DemoCue>
          <p className={styles.morphRow}>
            <span>Cycle</span>
            <MorphText from="Bay 04" to="Bay 02" trigger="interval" intervalMs={2400} />
          </p>
        </SectionShell>

        <SectionShell meta={SECTIONS[10]}>
          <DemoCue label="Loop" tone="teal">
            CSS keyframes trace the path continuously
          </DemoCue>
          <div className={styles.trailStrip}>
            <span className={styles.trailLabel}>Pipe pressure - live trace</span>
            <GradientTrail d={TRAIL_PATH} viewBox="0 0 360 44" thickness={3} />
          </div>
        </SectionShell>

        <SectionShell meta={SECTIONS[11]}>
          <DemoCue label="Trigger" tone="green">
            element enters viewport, then numbers count once
          </DemoCue>
          <div className={styles.countRow}>
            <div className={styles.countCell}>
              <strong>
                <CountUpWatcher to={1284} suffix=" jobs" duration={1600} />
              </strong>
              <span>Lifetime tickets - Bay 02-05</span>
            </div>
            <div className={styles.countCell}>
              <strong>
                <CountUpWatcher to={62} suffix="%" duration={1400} />
              </strong>
              <span>Returning customers - last 12mo</span>
            </div>
            <div className={styles.countCell}>
              <strong>
                <CountUpWatcher to={3.8} decimals={1} suffix=" yrs" duration={1400} />
              </strong>
              <span>Average build longevity</span>
            </div>
          </div>
        </SectionShell>

        <SectionShell meta={SECTIONS[12]}>
          <DemoCue label="Success" tone="red">
            click the control to flip the active prop
          </DemoCue>
          <ConfettiDemo />
        </SectionShell>

        <section className={styles.section} data-tone="amber" aria-labelledby="motion-section-tokens">
          <header className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>14</span>
            <div className={styles.sectionHeaderBody}>
              <div className={styles.metaRow}>
                <Chip label="Manifest" tone="amber" selected />
                <Kbd size="sm">duration</Kbd>
                <Kbd size="sm">easing</Kbd>
                <Kbd size="sm">transition</Kbd>
              </div>
              <h2 id="motion-section-tokens">Motion tokens</h2>
              <p>
                Every primitive above pulls from this single manifest. Easings render as
                cubic-bezier strings, durations are milliseconds, and transition presets compose both.
              </p>
            </div>
            <aside className={styles.contractRail} aria-label="Motion token coverage">
              <span>The route exposes the raw contract so token edits can be audited visually.</span>
              <ProgressLinear
                label="Token coverage"
                value={100}
                tone="amber"
                variant="segmented"
                segments={8}
                showLabel
              />
            </aside>
          </header>
          <div className={styles.tokenGrid}>
            {(Object.keys(durations) as Array<keyof typeof durations>).map((id) => (
              <div key={`duration-${id}`} className={styles.tokenChip}>
                <Chip label="Duration" tone="teal" selected />
                <strong>{id}</strong>
                <code>{durations[id]}ms</code>
              </div>
            ))}
            {(Object.keys(easings) as Array<keyof typeof easings>).map((id) => (
              <div key={`easing-${id}`} className={styles.tokenChip}>
                <Chip label="Easing" tone="amber" selected />
                <strong>{id}</strong>
                <code>{formatEasing(easings[id])}</code>
              </div>
            ))}
            {(Object.keys(transitions) as Array<keyof typeof transitions>).map((id) => (
              <div key={`transition-${id}`} className={styles.tokenChip}>
                <Chip label="Transition" tone="red" selected />
                <strong>{id}</strong>
                <code>
                  {Math.round(transitions[id].duration * 1000)}ms / {formatEasing(transitions[id].ease)}
                </code>
              </div>
            ))}
          </div>
        </section>
      </MotionConfig>
    </main>
  )
}
