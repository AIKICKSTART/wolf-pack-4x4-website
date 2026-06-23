import type { ComponentType } from "react"

import { GlassSurface } from "../surfaces/glass-surface"
import { MaterialSurface } from "../surfaces/material-surface"
import { NeuoSurface } from "../surfaces/neuo-surface"

import styles from "./animated-icon.module.css"
import type { IconProps, IconState, IconTone } from "./icon-types"

export type AnimatedIconFrame = "none" | "glass" | "neuo" | "material"

interface AnimatedIconProps extends IconProps {
  icon: ComponentType<IconProps>
  tooltip?: string
  frame?: AnimatedIconFrame
}

const TONE_CLASS: Record<IconTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  obsidian: styles.toneObsidian,
  currentColor: styles.toneCurrent,
}

const FRAME_CLASS: Record<AnimatedIconFrame, string> = {
  none: styles.frameNone,
  glass: styles.frameGlass,
  neuo: styles.frameNeuo,
  material: styles.frameMaterial,
}

interface FramedProps {
  frame: AnimatedIconFrame
  children: React.ReactNode
  state: IconState
}

function FramedSurface({ frame, children, state }: FramedProps) {
  const stateAttr = state === "loading" ? styles.stateLoading : undefined
  const classes = [styles.frame, FRAME_CLASS[frame], stateAttr].filter(Boolean).join(" ")

  if (frame === "glass") {
    return (
      <GlassSurface tone="obsidian" intensity="low" className={classes}>
        {children}
      </GlassSurface>
    )
  }

  if (frame === "neuo") {
    return (
      <NeuoSurface tone="obsidian" className={classes}>
        {children}
      </NeuoSurface>
    )
  }

  if (frame === "material") {
    return (
      <MaterialSurface elevation={2} tone="surface" className={classes}>
        {children}
      </MaterialSurface>
    )
  }

  return (
    <span className={classes} data-state={state}>
      {children}
    </span>
  )
}

export function AnimatedIcon({
  icon: Icon,
  tone = "red",
  size = 32,
  state = "idle",
  motion = "none",
  variant = "monoline",
  tooltip,
  title,
  frame = "none",
  className,
}: AnimatedIconProps) {
  const hostClasses = [styles.host, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  const iconTitle = title ?? tooltip

  return (
    <span className={hostClasses} data-tone={tone} data-motion={motion} data-state={state}>
      <FramedSurface frame={frame} state={state}>
        <Icon
          tone={tone}
          size={size}
          state={state}
          motion={motion}
          variant={variant}
          title={iconTitle}
        />
      </FramedSurface>
      {tooltip ? (
        <span className={styles.tooltip} role="tooltip">
          {tooltip}
        </span>
      ) : null}
    </span>
  )
}
