"use client"

import { useCallback, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import { Canvas, useThree } from "@react-three/fiber"

import { ThreeFallback, type ThreeFallbackVariant } from "./three-fallback"

type CanvasProps = ComponentProps<typeof Canvas>

interface SceneCanvasProps extends Omit<CanvasProps, "children"> {
  children: ReactNode
  fallbackVariant: ThreeFallbackVariant
  fallback?: ReactNode
  fallbackCopy?: string
}

interface ContextGuardProps {
  onContextLost: () => void
}

const MAX_CONTEXT_RECOVERIES = 1

function ContextGuard({ onContextLost }: ContextGuardProps) {
  const { gl } = useThree()
  const handledRef = useRef(false)

  useEffect(() => {
    const canvas = gl.domElement
    const context = gl.getContext()
    const handleContextLost = (event: Event) => {
      if (event.defaultPrevented) return
      event.preventDefault()
      if (handledRef.current) return
      handledRef.current = true
      onContextLost()
    }
    const checkContext = () => {
      if (handledRef.current || !context.isContextLost()) return
      handledRef.current = true
      onContextLost()
    }

    canvas.addEventListener("webglcontextlost", handleContextLost, false)
    const intervalId = window.setInterval(checkContext, 250)
    checkContext()

    return () => {
      window.clearInterval(intervalId)
      canvas.removeEventListener("webglcontextlost", handleContextLost, false)
    }
  }, [gl, onContextLost])

  return null
}

export function SceneCanvas({
  children,
  fallback,
  fallbackVariant,
  fallbackCopy,
  ...canvasProps
}: SceneCanvasProps) {
  const [recoveryAttempt, setRecoveryAttempt] = useState(0)
  const lastLossAtRef = useRef(0)

  const handleContextLost = useCallback(() => {
    const now = Date.now()
    if (now - lastLossAtRef.current < 1200) return
    lastLossAtRef.current = now
    setRecoveryAttempt((current) => current + 1)
  }, [])

  if (recoveryAttempt > MAX_CONTEXT_RECOVERIES) {
    return fallback ?? (
      <ThreeFallback
        variant={fallbackVariant}
        copy={fallbackCopy ?? "WebGL was reset by the browser. Showing the resilient scene poster."}
      />
    )
  }

  return (
    <Canvas key={recoveryAttempt} {...canvasProps}>
      <ContextGuard onContextLost={handleContextLost} />
      {children}
    </Canvas>
  )
}

export default SceneCanvas
