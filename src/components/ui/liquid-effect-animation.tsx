"use client"

import { useEffect, useId, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"

type LiquidApp = {
  dispose?: () => void
  loadImage?: (url: string) => void
  setRain?: (enabled: boolean) => void
  liquidPlane?: {
    material?: {
      metalness?: number
      roughness?: number
    }
    uniforms?: {
      displacementScale?: {
        value: number
      }
    }
  }
}

type LiquidEffectAnimationProps = {
  canvasClassName?: string
  className?: string
  fixed?: boolean
  imageUrl?: string
  rain?: boolean
}

const DEFAULT_LIQUID_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/enhanced_8bfe61b0-d431-433a-8acb-49d508bf88b4-image-vWzKFKS7vQy7s8wfQYzEpaoiYaVMkr.png"

export function LiquidEffectAnimation({
  canvasClassName,
  className,
  fixed = true,
  imageUrl = DEFAULT_LIQUID_IMAGE,
  rain = false,
}: LiquidEffectAnimationProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<LiquidApp | null>(null)
  const reactId = useId()
  const canvasId = useMemo(
    () => `liquid-canvas-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId],
  )

  useEffect(() => {
    if (!canvasRef.current) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduceMotion.matches) return

    const script = document.createElement("script")
    script.type = "module"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvasId = ${JSON.stringify(canvasId)};
      const canvas = document.getElementById(canvasId);
      window.__liquidApps = window.__liquidApps || {};

      if (canvas && !window.__liquidApps[canvasId]) {
        const app = LiquidBackground(canvas);
        app.loadImage(${JSON.stringify(imageUrl)});
        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;
        app.setRain(${JSON.stringify(rain)});
        window.__liquidApps[canvasId] = app;
      }
    `

    document.body.appendChild(script)

    return () => {
      const app = window.__liquidApps?.[canvasId]
      appRef.current = app ?? null

      if (appRef.current?.dispose) {
        appRef.current.dispose()
      }

      if (window.__liquidApps) {
        delete window.__liquidApps[canvasId]
      }

      script.remove()
    }
  }, [canvasId, imageUrl, rain])

  return (
    <div
      className={cn(
        "m-0 h-full w-full touch-none overflow-hidden",
        fixed && "fixed inset-0",
        className,
      )}
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <canvas
        ref={canvasRef}
        id={canvasId}
        className={cn("h-full w-full", fixed && "fixed inset-0", canvasClassName)}
      />
    </div>
  )
}

declare global {
  interface Window {
    __liquidApps?: Record<string, LiquidApp>
  }
}
