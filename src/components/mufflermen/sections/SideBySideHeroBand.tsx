import { SideBySideHero } from "@/app/ui-primitives/components/video-heroes"
import { PERFORMANCE_ROAD_VIDEO } from "../shared/media"

export function SideBySideHeroBand() {
  return (
    <section className="section video-hero-band" id="performance-systems" aria-label="Performance 4x4 systems">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ Performance ] 4x4 systems by vehicle</div>
            <h2 className="display display-md" style={{ marginTop: 18, maxWidth: 820 }}>
              Pick the goal. We plan the build.
            </h2>
          </div>
          <p className="lead">
            Suspension, protection, lighting, recovery and towing support matched
            to the vehicle, load and terrain you are planning for.
          </p>
        </div>
      </div>
      <div className="video-hero-stage reveal">
        <SideBySideHero
          headline="Clearance and control, dialled to the drive."
          subhead="Choose a build path by vehicle and intended use. The workshop fits the parts around clearance, towing and everyday driving."
          primaryCta={{ label: "Quote my vehicle", href: "/quote", emphasis: "primary" }}
          secondaryCta={{ label: "Browse 4x4 parts", href: "/parts", emphasis: "ghost" }}
          specs={[
            { label: "SYSTEMS", value: "SUSPENSION · PROTECTION" },
            { label: "GEAR", value: "LIGHTING · RECOVERY" },
            { label: "FIT", value: "MOST MAKES" },
          ]}
          serial="WOLFPACK · 4X4"
          videoSrc={PERFORMANCE_ROAD_VIDEO.videoSrc}
          posterSrc={PERFORMANCE_ROAD_VIDEO.posterSrc}
        />
      </div>
    </section>
  )
}
