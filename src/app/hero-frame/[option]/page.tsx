import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { getHeroOption, heroOptions } from "@/app/ui-primitives/video-heroes/hero-options"
import {
  heroComponentForOption,
  renderHeroForOption,
} from "@/app/ui-primitives/video-heroes/hero-renderer"

import styles from "../hero-frame.module.css"

export const dynamicParams = false

export const metadata: Metadata = {
  title: "Hero frame preview",
  robots: { index: false, follow: false },
}

export function generateStaticParams(): Array<{ option: string }> {
  return heroOptions.map((option) => ({ option: option.id }))
}

interface FramePageProps {
  params: Promise<{ option: string }>
}

/**
 * Bare full-bleed hero for a single option, rendered chrome-free (no sidebar)
 * via the /hero-frame layout. Loaded inside the preview page's device iframes
 * at each viewport width so the hero's own responsive behaviour is shown true
 * to size across desktop -> mobile.
 */
export default async function HeroFramePage({ params }: FramePageProps) {
  const { option: optionId } = await params
  const option = getHeroOption(optionId)
  if (!option) {
    notFound()
  }

  const component = heroComponentForOption(option)

  return (
    <main className={styles.stage} aria-label={`${option.name} full hero`}>
      {renderHeroForOption({ option, component })}
      <Image
        className={styles.logo}
        src="/media/wolfpack/wolfpack-logo-transparent.png"
        alt="Wolfpack 4x4"
        width={168}
        height={62}
        priority
      />
    </main>
  )
}
