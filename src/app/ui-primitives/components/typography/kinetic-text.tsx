"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react"

import {
  typographyFonts,
  type KineticMotionId,
  type TypographyFontId,
} from "../../typography/typography-fonts"
import styles from "./kinetic-text.module.css"

export type KineticSize = "sm" | "md" | "lg" | "xl" | "hero"
export type KineticTextMotionId =
  | KineticMotionId
  | "cam-sync"
  | "bead-run"
  | "fan-balance"
  | "battery-charge"
  | "pressure-wave"
  | "shift-gate"
  | "supplier-glow"
  | "data-ribbon"

interface KineticTextProps {
  fontId: TypographyFontId
  motion: KineticTextMotionId
  size?: KineticSize
  children: ReactNode
  className?: string
}

const SIZE_CLASS: Record<KineticSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
  hero: styles.hero,
}

function getFontVar(fontId: TypographyFontId): string {
  const found = typographyFonts.find((font) => font.id === fontId)
  return found ? found.cssVar : "inherit"
}

function toText(children: ReactNode): string {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(toText).join("")
  return ""
}

function LetterRise({ text }: { text: string }) {
  const letters = useMemo(() => Array.from(text), [text])
  return (
    <span className={styles.motionLetterRise} aria-hidden="true">
      {letters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-glyph
          style={{ "--kt-i": index } as CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  )
}

function GlyphMotion({ text, className }: { text: string; className: string }) {
  const letters = useMemo(() => Array.from(text), [text])
  return (
    <span className={className} aria-hidden="true">
      {letters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-glyph
          style={{ "--kt-i": index } as CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  )
}

function Marquee({ text }: { text: string }) {
  const items = useMemo(() => [text, text, text, text], [text])
  return (
    <span className={styles.motionMarqueeWrap} aria-hidden="true">
      <span className={styles.motionMarqueeTrack}>
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </span>
    </span>
  )
}

function TypeOn({ text }: { text: string }) {
  return (
    <span className={styles.motionTypeOn} aria-hidden="true">
      {text}
    </span>
  )
}

const SCRAMBLE_CHARS = "█▓▒░01ABCDEFGHJKMNPQRSTUVWXYZ23456789"

function Scramble({ text }: { text: string }) {
  const [overlay, setOverlay] = useState<string | null>(null)
  const frameRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number>(0)
  const cycleStartRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) {
      return
    }

    const totalDuration = 1400
    const restDuration = 2200
    const totalCycle = totalDuration + restDuration

    function tick(now: number) {
      if (cycleStartRef.current === 0) {
        cycleStartRef.current = now
      }
      const elapsed = (now - cycleStartRef.current) % totalCycle
      if (now - lastTimestampRef.current < 60) {
        frameRef.current = window.requestAnimationFrame(tick)
        return
      }
      lastTimestampRef.current = now

      if (elapsed >= totalDuration) {
        setOverlay(null)
      } else {
        const progress = elapsed / totalDuration
        const settledChars = Math.floor(progress * text.length)
        const scrambled = Array.from(text)
          .map((char, index) => {
            if (char === " ") return " "
            if (index < settledChars) return char
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join("")
        setOverlay(scrambled)
      }

      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      cycleStartRef.current = 0
      lastTimestampRef.current = 0
    }
  }, [text])

  return (
    <span className={styles.motionScramble} aria-hidden="true">
      {overlay ?? text}
    </span>
  )
}

interface RenderedMotionProps {
  motion: KineticTextMotionId
  text: string
}

function RenderedMotion({ motion, text }: RenderedMotionProps) {
  switch (motion) {
    case "letter-rise":
      return <LetterRise text={text} />
    case "outline-fill":
      return (
        <span className={styles.motionOutlineFill} aria-hidden="true">
          {text}
        </span>
      )
    case "marquee":
      return <Marquee text={text} />
    case "type-on":
      return <TypeOn text={text} />
    case "weight-morph":
      return (
        <span className={styles.motionWeightMorph} aria-hidden="true">
          {text}
        </span>
      )
    case "scramble":
      return <Scramble text={text} />
    case "axis-swing":
      return (
        <span className={styles.motionAxisSwing} aria-hidden="true">
          {text}
        </span>
      )
    case "scanline-wipe":
      return (
        <span className={styles.motionScanlineWipe} aria-hidden="true">
          {text}
        </span>
      )
    case "color-sweep":
      return (
        <span className={styles.motionColorSweep} aria-hidden="true">
          {text}
        </span>
      )
    case "italic-shift":
      return (
        <span className={styles.motionItalicShift} aria-hidden="true">
          {text}
        </span>
      )
    case "heat-shimmer":
      return (
        <span className={styles.motionHeatShimmer} aria-hidden="true">
          {text}
        </span>
      )
    case "stamp-pop":
      return <GlyphMotion text={text} className={styles.motionStampPop} />
    case "lane-split":
      return (
        <span className={styles.motionLaneSplit} aria-hidden="true">
          {text}
        </span>
      )
    case "spark-trail":
      return (
        <span className={styles.motionSparkTrail} aria-hidden="true">
          {text}
        </span>
      )
    case "torque-tilt":
      return (
        <span className={styles.motionTorqueTilt} aria-hidden="true">
          {text}
        </span>
      )
    case "chrome-glint":
      return (
        <span className={styles.motionChromeGlint} aria-hidden="true">
          {text}
        </span>
      )
    case "signal-bounce":
      return <GlyphMotion text={text} className={styles.motionSignalBounce} />
    case "road-blur":
      return (
        <span className={styles.motionRoadBlur} aria-hidden="true">
          {text}
        </span>
      )
    case "arc-flash":
      return (
        <span className={styles.motionArcFlash} aria-hidden="true">
          {text}
        </span>
      )
    case "boost-squeeze":
      return (
        <span className={styles.motionBoostSqueeze} aria-hidden="true">
          {text}
        </span>
      )
    case "bay-door-reveal":
      return (
        <span className={styles.motionBayDoorReveal} aria-hidden="true">
          {text}
        </span>
      )
    case "rubber-burn":
      return (
        <span className={styles.motionRubberBurn} aria-hidden="true">
          {text}
        </span>
      )
    case "gauge-sweep":
      return (
        <span className={styles.motionGaugeSweep} aria-hidden="true">
          {text}
        </span>
      )
    case "weld-flicker":
      return (
        <span className={styles.motionWeldFlicker} aria-hidden="true">
          {text}
        </span>
      )
    case "dyno-pull":
      return (
        <span className={styles.motionDynoPull} aria-hidden="true">
          {text}
        </span>
      )
    case "piston-stroke":
      return <GlyphMotion text={text} className={styles.motionPistonStroke} />
    case "neon-idle":
      return (
        <span className={styles.motionNeonIdle} aria-hidden="true">
          {text}
        </span>
      )
    case "valve-tick":
      return <GlyphMotion text={text} className={styles.motionValveTick} />
    case "exhaust-wave":
      return (
        <span className={styles.motionExhaustWave} aria-hidden="true">
          {text}
        </span>
      )
    case "oil-slick":
      return (
        <span className={styles.motionOilSlick} aria-hidden="true">
          {text}
        </span>
      )
    case "grid-lock":
      return (
        <span className={styles.motionGridLock} aria-hidden="true">
          {text}
        </span>
      )
    case "relay-pulse":
      return (
        <span className={styles.motionRelayPulse} aria-hidden="true">
          {text}
        </span>
      )
    case "circuit-trace":
      return (
        <span className={styles.motionCircuitTrace} aria-hidden="true">
          {text}
        </span>
      )
    case "redline-ramp":
      return (
        <span className={styles.motionRedlineRamp} aria-hidden="true">
          {text}
        </span>
      )
    case "clutch-drop":
      return <GlyphMotion text={text} className={styles.motionClutchDrop} />
    case "turbo-spool":
      return (
        <span className={styles.motionTurboSpool} aria-hidden="true">
          {text}
        </span>
      )
    case "brake-pulse":
      return <GlyphMotion text={text} className={styles.motionBrakePulse} />
    case "paint-mask":
      return (
        <span className={styles.motionPaintMask} aria-hidden="true">
          {text}
        </span>
      )
    case "route-draw":
      return (
        <span className={styles.motionRouteDraw} aria-hidden="true">
          {text}
        </span>
      )
    case "receipt-stamp":
      return (
        <span className={styles.motionReceiptStamp} aria-hidden="true">
          {text}
        </span>
      )
    case "spark-plug-fire":
      return <GlyphMotion text={text} className={styles.motionSparkPlugFire} />
    case "hoist-lift":
      return <GlyphMotion text={text} className={styles.motionHoistLift} />
    case "tacho-needle":
      return (
        <span className={styles.motionTachoNeedle} aria-hidden="true">
          {text}
        </span>
      )
    case "visor-scan":
      return (
        <span className={styles.motionVisorScan} aria-hidden="true">
          {text}
        </span>
      )
    case "checker-wave":
      return (
        <span className={styles.motionCheckerWave} aria-hidden="true">
          {text}
        </span>
      )
    case "blueprint-pan":
      return (
        <span className={styles.motionBlueprintPan} aria-hidden="true">
          {text}
        </span>
      )
    case "marker-swipe":
      return (
        <span className={styles.motionMarkerSwipe} aria-hidden="true">
          {text}
        </span>
      )
    case "meter-step":
      return (
        <span className={styles.motionMeterStep} aria-hidden="true">
          {text}
        </span>
      )
    case "impact-stack":
      return (
        <span className={styles.motionImpactStack} aria-hidden="true">
          {text}
        </span>
      )
    case "signal-cut":
      return (
        <span className={styles.motionSignalCut} aria-hidden="true">
          {text}
        </span>
      )
    case "status-latch":
      return (
        <span className={styles.motionStatusLatch} aria-hidden="true">
          {text}
        </span>
      )
    case "cam-sync":
      return <GlyphMotion text={text} className={styles.motionCamSync} />
    case "bead-run":
      return (
        <span className={styles.motionBeadRun} aria-hidden="true">
          {text}
        </span>
      )
    case "fan-balance":
      return (
        <span className={styles.motionFanBalance} aria-hidden="true">
          {text}
        </span>
      )
    case "battery-charge":
      return (
        <span className={styles.motionBatteryCharge} aria-hidden="true">
          {text}
        </span>
      )
    case "pressure-wave":
      return <GlyphMotion text={text} className={styles.motionPressureWave} />
    case "shift-gate":
      return (
        <span className={styles.motionShiftGate} aria-hidden="true">
          {text}
        </span>
      )
    case "supplier-glow":
      return (
        <span className={styles.motionSupplierGlow} aria-hidden="true">
          {text}
        </span>
      )
    case "data-ribbon":
      return (
        <span className={styles.motionDataRibbon} aria-hidden="true">
          {text}
        </span>
      )
    default:
      return <span aria-hidden="true">{text}</span>
  }
}

export function KineticText({
  fontId,
  motion,
  size = "md",
  children,
  className,
}: KineticTextProps) {
  const text = toText(children)
  const fontVar = getFontVar(fontId)

  const classes = [styles.root, SIZE_CLASS[size], className].filter(Boolean).join(" ")
  const style: CSSProperties = {
    ["--kt-font" as string]: fontVar,
  }

  return (
    <span
      className={classes}
      style={style}
      aria-label={text}
      data-font={fontId}
      data-motion={motion}
    >
      <RenderedMotion motion={motion} text={text} />
    </span>
  )
}
