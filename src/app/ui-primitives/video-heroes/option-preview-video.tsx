"use client"

import { useEffect, useRef, useState } from "react"

interface OptionPreviewVideoProps {
  src: string
  poster: string
}

export function OptionPreviewVideo({ src, poster }: OptionPreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduceMotion.matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setShouldLoad(true)
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { rootMargin: "520px 0px", threshold: 0.08 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return
    void video.play().catch(() => undefined)
  }, [shouldLoad])

  return (
    <video
      ref={videoRef}
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      poster={poster}
      src={shouldLoad ? src : undefined}
      data-src={src}
      aria-hidden="true"
    />
  )
}
