import { FullBleedMarqueeHero } from "@/app/ui-primitives/components/video-heroes"
import { SOCIAL_OUTRO_VIDEO } from "../shared/media"

export function MarqueeHeroBand() {
  return (
    <FullBleedMarqueeHero
      headline="Performance 4x4 upgrades, one workshop."
      subhead="Suspension, protection, lighting, recovery, towing and touring accessories — booked around your vehicle in Albion Park Rail."
      cta={{ label: "Call the workshop", href: "tel:+61242569256" }}
      marqueePhrases={[
        "SUSPENSION",
        "BULL BARS",
        "WINCHES",
        "LIGHTING",
        "TOURING GEAR",
        "ALBION PARK RAIL NSW",
      ]}
      videoSrc={SOCIAL_OUTRO_VIDEO.videoSrc}
      posterSrc={SOCIAL_OUTRO_VIDEO.posterSrc}
    />
  )
}
