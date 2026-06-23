"use client"

import { MotionConfig as FramerMotionConfig } from "framer-motion"
import type { ReactNode } from "react"

import { transitions, type TransitionTokenId } from "./motion-tokens"

export interface MotionConfigProps {
  children: ReactNode
  /**
   * Which umbrella transition preset to publish as the default to the entire
   * motion subtree. Children can still override locally via their own
   * `transition` prop.
   */
  defaultTransition?: TransitionTokenId
  /**
   * Reduced-motion strategy. `"user"` (default) respects the OS preference.
   */
  reducedMotion?: "always" | "never" | "user"
}

/**
 * Publishes the umbrella motion tokens to a framer-motion subtree.
 *
 * Wrap any region of the app with this provider so every reveal, slide,
 * scale, magnetic, tilt, scroll-reveal, etc. inherits a consistent timing
 * curve and respects reduced-motion automatically.
 */
export function MotionConfig({
  children,
  defaultTransition = "smooth",
  reducedMotion = "user",
}: MotionConfigProps) {
  const preset = transitions[defaultTransition]
  return (
    <FramerMotionConfig
      reducedMotion={reducedMotion}
      transition={{ duration: preset.duration, ease: [...preset.ease] }}
    >
      {children}
    </FramerMotionConfig>
  )
}

export default MotionConfig
