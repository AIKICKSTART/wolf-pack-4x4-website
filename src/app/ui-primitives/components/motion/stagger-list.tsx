"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Children, type ReactNode } from "react"

import { durations, easings } from "./motion-tokens"
import type { RevealDirection } from "./reveal"

export type StaggerListTag = "ul" | "ol" | "div"

export interface StaggerListProps {
  children: ReactNode
  /** Direction every child travels from before entering view. */
  from?: RevealDirection
  /** Delay before the first child reveals (ms). */
  gap?: number
  /** Step between each child reveal (ms). */
  stagger?: number
  /** Wrapper tag — semantic list (default `ul`) or generic `div`. */
  as?: StaggerListTag
  /** Offset distance per child (px). */
  distance?: number
  className?: string
}

const OFFSET: Record<RevealDirection, { x: number; y: number }> = {
  below: { x: 0, y: 1 },
  above: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  fade: { x: 0, y: 0 },
}

/**
 * Renders children with an auto-staggered reveal once the container enters
 * the viewport. Children are wrapped in `motion.li` (or `motion.div`)
 * to inherit the parent variants.
 */
export function StaggerList({
  children,
  from = "below",
  gap = 60,
  stagger = 80,
  as = "ul",
  distance = 20,
  className,
}: StaggerListProps) {
  const reduceMotion = useReducedMotion()
  const offset = OFFSET[from]

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: gap / 1000,
        staggerChildren: stagger / 1000,
      },
    },
  }

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, x: 0, y: 0 },
        visible: { opacity: 1, x: 0, y: 0 },
      }
    : {
        hidden: {
          opacity: 0,
          x: offset.x * distance,
          y: offset.y * distance,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: durations.normal / 1000,
            ease: [...easings.decel] as [number, number, number, number],
          },
        },
      }

  const sharedContainerProps = {
    className,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.2 },
    variants: containerVariants,
  }

  const items = Children.toArray(children)
  const ChildTag = as === "div" ? motion.div : motion.li

  const renderedItems = items.map((child, index) => (
    <ChildTag key={index} variants={itemVariants}>
      {child}
    </ChildTag>
  ))

  if (as === "ol") {
    return (
      <motion.ol {...sharedContainerProps}>{renderedItems}</motion.ol>
    )
  }
  if (as === "div") {
    return (
      <motion.div {...sharedContainerProps}>{renderedItems}</motion.div>
    )
  }
  return <motion.ul {...sharedContainerProps}>{renderedItems}</motion.ul>
}

export default StaggerList
