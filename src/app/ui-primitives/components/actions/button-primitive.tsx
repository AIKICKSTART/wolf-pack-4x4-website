"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const actionButtonVariants = cva(
  "liquid-ui-button inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,filter,background-color,border-color,color,box-shadow] duration-200 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primitive-red)] text-[var(--primitive-text-on-accent)] hover:bg-[var(--primitive-amber)]",
        destructive:
          "bg-destructive text-primary-foreground hover:bg-destructive/90",
        cool: "bg-linear-to-t border border-b-2 border-zinc-950/40 from-primary to-primary/85 text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:border-x-0 dark:border-t-0 dark:border-primary/50 dark:ring-white/5",
        outline:
          "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent text-foreground shadow-none hover:bg-accent hover:text-accent-foreground",
        link: "h-auto rounded-none bg-transparent px-0 py-0 text-primary shadow-none hover:underline underline-offset-4",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "min-h-11 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const liquidButtonVariants = cva(
  "relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/16 text-sm font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-300 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-primary-foreground shadow-[0_22px_48px_color-mix(in_oklab,var(--primitive-overlay)_46%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--primitive-text-strong)_26%,transparent)] hover:-translate-y-0.5 hover:border-white/22",
        destructive:
          "bg-destructive/20 text-[var(--primitive-text-strong)] shadow-[0_22px_48px_color-mix(in_oklab,var(--primitive-red)_22%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--primitive-text-strong)_18%,transparent)] hover:-translate-y-0.5 hover:border-destructive/45",
        outline:
          "bg-white/4 text-foreground shadow-[0_18px_38px_color-mix(in_oklab,var(--primitive-overlay)_33%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--primitive-text-strong)_18%,transparent)] hover:-translate-y-0.5 hover:bg-white/8",
        secondary:
          "bg-secondary/70 text-secondary-foreground shadow-[0_18px_38px_color-mix(in_oklab,var(--primitive-overlay)_33%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--primitive-text-strong)_16%,transparent)] hover:-translate-y-0.5 hover:bg-secondary/85",
        ghost:
          "border-transparent bg-transparent text-foreground shadow-none hover:bg-white/8 hover:text-primary-foreground",
        link: "h-auto rounded-none border-transparent bg-transparent px-0 py-0 text-primary shadow-none hover:text-primary-foreground hover:underline underline-offset-4",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "min-h-11 px-4 text-xs",
        lg: "h-12 px-8",
        xl: "h-14 px-10",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type MetalButtonVariant =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "gold"
  | "bronze"

type MetalPalette = {
  outer: string
  inner: string
  button: string
  textColor: string
  textShadow: string
}

// Metallic palettes — every paint stop is anchored to a central primitive token
// via color-mix (mixing the token toward white highlight / black shadow to render
// the brushed-metal sheen). No bare color literals: change a token, the metal re-tints.
const metalPalettes: Record<MetalButtonVariant, MetalPalette> = {
  default: {
    outer:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-text-strong)_0%,black)] to-[color-mix(in_srgb,var(--primitive-text-strong)_63%,black)]",
    inner:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-text-strong)_98%,black)] via-[color-mix(in_srgb,var(--primitive-text-strong)_24%,black)] to-[color-mix(in_srgb,var(--primitive-text-strong)_90%,black)]",
    button:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-text-strong)_73%,black)] to-[color-mix(in_srgb,var(--primitive-text-strong)_59%,black)]",
    textColor: "var(--primitive-text-strong)",
    textShadow: "0 -1px 0 color-mix(in srgb, var(--primitive-text-strong) 31%, black)",
  },
  primary: {
    outer:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-text-strong)_0%,black)] to-[color-mix(in_srgb,var(--primitive-text-strong)_63%,black)]",
    inner: "bg-gradient-to-b from-primary via-secondary to-muted",
    button: "bg-gradient-to-b from-primary to-primary/40",
    textColor: "var(--primitive-text-on-accent)",
    textShadow: "0 -1px 0 color-mix(in srgb, var(--primitive-teal) 46%, black)",
  },
  success: {
    outer:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-green)_43%,black)] to-[color-mix(in_srgb,var(--primitive-green)_70%,white)]",
    inner:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-green)_13%,white)] via-[color-mix(in_srgb,var(--primitive-green)_27%,black)] to-[color-mix(in_srgb,var(--primitive-green)_22%,white)]",
    button:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-green)_49%,white)] to-[color-mix(in_srgb,var(--primitive-green)_77%,black)]",
    textColor: "color-mix(in srgb, var(--primitive-green) 4%, white)",
    textShadow: "0 -1px 0 color-mix(in srgb, var(--primitive-green) 38%, black)",
  },
  error: {
    outer:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-red)_37%,black)] to-[color-mix(in_srgb,var(--primitive-red)_36%,white)]",
    inner:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-red)_15%,white)] via-[color-mix(in_srgb,var(--primitive-red)_43%,black)] to-[color-mix(in_srgb,var(--primitive-red)_10%,white)]",
    button:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-red)_52%,white)] to-[color-mix(in_srgb,var(--primitive-red)_81%,white)]",
    textColor: "color-mix(in srgb, var(--primitive-red) 5%, white)",
    textShadow: "0 -1px 0 color-mix(in srgb, var(--primitive-red) 65%, black)",
  },
  gold: {
    outer:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-amber)_54%,black)] to-[color-mix(in_srgb,var(--primitive-amber)_63%,white)]",
    inner:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-amber)_18%,white)] via-[color-mix(in_srgb,var(--primitive-amber)_50%,black)] to-[color-mix(in_srgb,var(--primitive-amber)_41%,white)]",
    button:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-amber)_51%,white)] to-[color-mix(in_srgb,var(--primitive-amber)_65%,black)]",
    textColor: "color-mix(in srgb, var(--primitive-amber) 13%, white)",
    textShadow: "0 -1px 0 color-mix(in srgb, var(--primitive-amber) 67%, black)",
  },
  bronze: {
    outer:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-amber)_46%,black)] to-[color-mix(in_srgb,var(--primitive-amber)_75%,white)]",
    inner:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-amber)_58%,white)] via-[color-mix(in_srgb,var(--primitive-amber)_30%,black)] to-[color-mix(in_srgb,var(--primitive-amber)_37%,white)]",
    button:
      "bg-gradient-to-b from-[color-mix(in_srgb,var(--primitive-amber)_32%,white)] to-[color-mix(in_srgb,var(--primitive-amber)_62%,black)]",
    textColor: "color-mix(in srgb, var(--primitive-amber) 9%, white)",
    textShadow: "0 -1px 0 color-mix(in srgb, var(--primitive-amber) 38%, black)",
  },
}

export interface ActionButtonProps
  extends BaseButton.Props,
    VariantProps<typeof actionButtonVariants> {}

export interface LiquidButtonProps
  extends BaseButton.Props,
    VariantProps<typeof liquidButtonVariants> {}

export interface MetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: MetalButtonVariant
}

function isLiquidSurfaceVariant(variant: LiquidButtonProps["variant"]) {
  return variant !== "ghost" && variant !== "link"
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}

function getPrefersReducedMotionSnapshot() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getTouchDeviceSnapshot() {
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
}

function getClientCapabilityServerSnapshot() {
  return false
}

function subscribeToStaticClientCapability() {
  return () => {}
}

export const ActionButton = React.forwardRef<HTMLElement, ActionButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        type={type}
        data-slot="ui-primitive-action-button"
        data-variant={variant ?? "default"}
        className={cn(actionButtonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

ActionButton.displayName = "ActionButton"

export const LiquidButton = React.forwardRef<HTMLElement, LiquidButtonProps>(
  ({ children, className, variant, size, type = "button", ...props }, ref) => {
    const showSurface = isLiquidSurfaceVariant(variant)

    return (
      <BaseButton
        ref={ref}
        type={type}
        data-slot="ui-primitive-liquid-button"
        data-variant={variant ?? "default"}
        className={cn(liquidButtonVariants({ variant, size }), className)}
        {...props}
      >
        {showSurface ? (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primitive-text-strong)_32%,transparent),color-mix(in_oklab,var(--primitive-text-strong)_5%,transparent)_38%,color-mix(in_oklab,var(--primitive-overlay)_25%,transparent))] opacity-85 transition-transform duration-300 motion-reduce:transition-none"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_16%,color-mix(in_oklab,var(--primitive-text-strong)_30%,transparent),transparent_34%),radial-gradient(circle_at_78%_110%,color-mix(in_oklab,var(--primitive-red)_18%,transparent),transparent_38%)] mix-blend-screen opacity-80"
            />
          </>
        ) : null}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </BaseButton>
    )
  }
)

LiquidButton.displayName = "LiquidButton"

function ShineEffect({ isPressed }: { isPressed: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[13px] transition-opacity duration-300",
        "motion-reduce:transition-none",
        isPressed ? "opacity-20" : "opacity-0"
      )}
    >
      <span className="absolute inset-0 rounded-[13px] bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--primitive-text-strong)_96%,black)] to-transparent" />
    </span>
  )
}

export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  (
    {
      children,
      className,
      onBlur,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      onTouchCancel,
      onTouchEnd,
      onTouchStart,
      type = "button",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const isTouchDevice = React.useSyncExternalStore(
      subscribeToStaticClientCapability,
      getTouchDeviceSnapshot,
      getClientCapabilityServerSnapshot,
    )
    const prefersReducedMotion = React.useSyncExternalStore(
      subscribeToReducedMotion,
      getPrefersReducedMotionSnapshot,
      getClientCapabilityServerSnapshot,
    )

    const palette = metalPalettes[variant]
    const transitionStyle = prefersReducedMotion
      ? "none"
      : "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)"

    const wrapperStyle: React.CSSProperties = {
      transform:
        isPressed && !prefersReducedMotion
          ? "translateY(2.5px) scale(0.99)"
          : "translateY(0) scale(1)",
      boxShadow: isPressed
        ? "0 1px 2px color-mix(in oklab, var(--primitive-overlay) 31%, transparent)"
        : isHovered && !isTouchDevice
          ? "0 4px 12px color-mix(in oklab, var(--primitive-overlay) 25%, transparent)"
          : "0 3px 8px color-mix(in oklab, var(--primitive-overlay) 17%, transparent)",
      transition: transitionStyle,
      transformOrigin: "center center",
    }

    const innerStyle: React.CSSProperties = {
      transition: transitionStyle,
      transformOrigin: "center center",
      filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.05)" : "none",
    }

    const buttonStyle: React.CSSProperties = {
      color: palette.textColor,
      textShadow: palette.textShadow,
      transform: isPressed && !prefersReducedMotion ? "scale(0.97)" : "scale(1)",
      transition: transitionStyle,
      transformOrigin: "center center",
      filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.02)" : "none",
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true)
      onMouseDown?.(event)
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      onMouseUp?.(event)
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      setIsHovered(false)
      onMouseLeave?.(event)
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isTouchDevice) {
        setIsHovered(true)
      }
      onMouseEnter?.(event)
    }

    const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
      setIsPressed(true)
      onTouchStart?.(event)
    }

    const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      onTouchEnd?.(event)
    }

    const handleTouchCancel = (event: React.TouchEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      onTouchCancel?.(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
        setIsPressed(true)
      }
      onKeyDown?.(event)
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        setIsPressed(false)
      }
      onKeyUp?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      setIsHovered(false)
      onBlur?.(event)
    }

    return (
      <div
        className={cn(
          "relative inline-flex rounded-[15px] p-[1.25px] will-change-transform",
          palette.outer,
          className
        )}
        style={wrapperStyle}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-[1px] rounded-[14px] transform-gpu will-change-transform",
            palette.inner
          )}
          style={innerStyle}
        />
        <button
          ref={ref}
          type={type}
          className={cn(
            "relative z-10 inline-flex min-h-11 w-full transform-gpu cursor-pointer items-center justify-center overflow-hidden rounded-[13px] px-6 py-2 text-sm font-semibold leading-none outline-none will-change-transform disabled:cursor-not-allowed disabled:opacity-60",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            "motion-reduce:transition-none",
            palette.button
          )}
          style={buttonStyle}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onTouchCancel={handleTouchCancel}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          {...props}
        >
          <ShineEffect isPressed={isPressed} />
          <span className="relative z-10 inline-flex items-center gap-2">
            {children ?? "Button"}
          </span>
          {isHovered && !isPressed && !isTouchDevice ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[13px] bg-gradient-to-t from-transparent to-white/5"
            />
          ) : null}
        </button>
      </div>
    )
  }
)

MetalButton.displayName = "MetalButton"

export { actionButtonVariants, liquidButtonVariants }
export type { MetalButtonVariant }
