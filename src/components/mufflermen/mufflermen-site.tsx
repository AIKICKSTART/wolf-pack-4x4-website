"use client"

import * as React from "react"

import { EMPTY_HOMEPAGE_CMS } from "./shared/contact"
import type { MufflermenSiteProps } from "./shared/types"
import { Nav } from "./sections/Nav"
import { ConversionDock } from "./sections/ConversionDock"
import { HeroCinema } from "./sections/HeroCinema"
import { Marquee } from "./sections/Marquee"
import { Services } from "./sections/Services"
import { ProcessPinned } from "./sections/ProcessPinned"
import { HoistCinema } from "./sections/HoistCinema"
import { RolloutCinema } from "./sections/RolloutCinema"
import { Footer } from "./sections/Footer"

// ── Root ───────────────────────────────────────────────────────
// Varied conversion funnel — sell + close. Useful info up front (what we fix →
// why us → how it works), broken by distinct cinematic moments (main hero →
// side-by-side systems → workshop hoist) and a final close. Motion: reveal
// cascade, [data-parallax] drift, scroll-progress bar, pinned process story,
// and a sticky close dock that fades in past the hero. The quote form lives on
// the dedicated /quote page; unused section components stay in ./sections/*.
export function MufflermenSite({
  cmsPrimitiveContent,
  homepageCms = EMPTY_HOMEPAGE_CMS,
}: MufflermenSiteProps) {
  // Scroll-reveal cascade
  React.useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Scroll-linked parallax drift for [data-parallax] media (compositor-only,
  // reduced-motion safe). data-parallax = px of counter-drift across the pass.
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    )
    if (!nodes.length) return
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      for (const el of nodes) {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        const speed = Number(el.dataset.parallax) || 40
        const progress = (r.top + r.height / 2 - vh / 2) / vh
        el.style.setProperty("--py", `${(-progress * speed).toFixed(1)}px`)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Scroll-progress bar + sticky close-dock reveal (shown past the hero)
  React.useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".scroll-progress")
    const dock = document.querySelector<HTMLElement>(".home-conversion-dock")
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      if (bar) {
        const p = max > 0 ? Math.min(1, y / max) : 0
        bar.style.transform = `scaleX(${p.toFixed(4)})`
      }
      if (dock) dock.classList.toggle("is-visible", y > window.innerHeight * 0.7)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Ambient mouse-follow highlight
  React.useEffect(() => {
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const tx = (e.clientX / window.innerWidth) * 100
      const ty = (e.clientY / window.innerHeight) * 100
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const a = document.querySelector<HTMLElement>(".ambient")
        if (a) {
          a.style.setProperty("--mx", `${tx}%`)
          a.style.setProperty("--my", `${ty}%`)
        }
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <>
      <div className="mufflermen-public dashboard">
        <div className="ambient" />
        <Nav settings={homepageCms.settings} />
        <div className="scroll-progress" aria-hidden="true" />
        <ConversionDock settings={homepageCms.settings} />
        <main>
          <HeroCinema content={homepageCms} />
          <Marquee />
          <Services />
          <HoistCinema />
          <ProcessPinned />
          {cmsPrimitiveContent}
          <RolloutCinema settings={homepageCms.settings} />
        </main>
        <Footer settings={homepageCms.settings} />
      </div>
    </>
  )
}
