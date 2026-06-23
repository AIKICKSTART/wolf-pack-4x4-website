"use client"

import { useEffect, useRef, useState } from "react"

type Breakpoint = {
  name: string
  width: number
  height: number
}

const BREAKPOINTS: Breakpoint[] = [
  { name: "Mobile", width: 375, height: 812 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "Desktop", width: 1440, height: 900 },
]

type SeoPagePreviewProps = {
  src: string
}

export function SeoPagePreview({ src }: SeoPagePreviewProps) {
  const [active, setActive] = useState<Breakpoint>(BREAKPOINTS[0])
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      const available = container.clientWidth
      setScale(available > 0 && available < active.width ? available / active.width : 1)
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(container)
    return () => observer.disconnect()
  }, [active])

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {BREAKPOINTS.map((breakpoint) => {
          const isActive = breakpoint.name === active.name
          return (
            <button
              key={breakpoint.name}
              onClick={() => setActive(breakpoint)}
              type="button"
              style={{
                backgroundColor: isActive ? "var(--theme-elevation-800, #1f2937)" : "var(--theme-elevation-50, #f3f4f6)",
                border: "1px solid var(--theme-elevation-250, #d1d5db)",
                borderRadius: 6,
                color: isActive ? "var(--theme-elevation-0, #ffffff)" : "inherit",
                cursor: "pointer",
                fontSize: 12,
                padding: "5px 12px",
              }}
            >
              {breakpoint.name} {breakpoint.width}&times;{breakpoint.height}
            </button>
          )
        })}
        <a href={src} rel="noreferrer" target="_blank" style={{ fontSize: 12, marginLeft: "auto" }}>
          Open page &#8599;
        </a>
      </div>
      <div ref={containerRef} style={{ maxWidth: "100%", overflow: "hidden" }}>
        <div style={{ height: active.height * scale, width: active.width * scale }}>
          <iframe
            src={src}
            title={`Page preview (${active.name})`}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--theme-elevation-250, #d1d5db)",
              borderRadius: 8,
              height: active.height,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: active.width,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SeoPagePreview
