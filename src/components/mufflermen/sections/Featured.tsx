import Image from "next/image"
import Link from "next/link"

import { CountUpWatcher } from "@/app/ui-primitives/components/motion/count-up-watcher"
import {
  FEATURED_BUILD_COLLAGE,
  FEATURED_BUILD_IMAGE,
} from "../shared/media"

// ── Featured build ─────────────────────────────────────────────
export function Featured() {
  return (
    <section className="section featured-build-section" id="builds">
      <div className="wrap">
        <div className="section-head feature-section-head reveal">
          <div>
            <div className="label-red">[ 04 ] Featured build</div>
            <h2 className="display display-lg feature-section-title">
              <span className="tk-ink">Touring 4x4.</span>
              <br />
              <span className="tk-ink">Fitment-first build.</span>
            </h2>
          </div>
          <p className="feature-section-lede">
            Know the stance, clearance and fit before any parts are ordered.
          </p>
        </div>

        <div className="feature feature-case-study glass reveal">
          <div className="feature-media">
            <div className="feature-collage" aria-label={FEATURED_BUILD_IMAGE.alt}>
              {FEATURED_BUILD_COLLAGE.map((image) => (
                <div key={image.src} className={`feature-collage-cell ${image.cls}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      image.cls === "hero"
                        ? "(max-width: 980px) 100vw, 34vw"
                        : "(max-width: 980px) 42vw, 12vw"
                    }
                    className="feature-img"
                    unoptimized
                  />
                  <span className="feature-collage-label">
                    <span>{image.title}</span>
                    <strong>{image.label}</strong>
                  </span>
                </div>
              ))}
            </div>
            <div className="feature-gradient" />
            <div className="feature-beads" />
            <div className="feature-tag">
              <span className="tag red">
                <span className="tag-dot" />
                Workshop fitment
              </span>
              <span className="tag">
                <span className="tag-dot" />
                Touring setup
              </span>
            </div>
          </div>

          <div className="feature-body">
            <div>
              <div className="label">Workshop focus · clearance and fitment</div>
              <h3 className="display display-md">
                4x4 upgrade work shaped to fit.
              </h3>
              <p
                className="body-md"
                style={{ marginTop: 20, maxWidth: 420 }}
              >
                Scope the suspension, protection and accessory load before the
                bay is booked, then match the parts to the result the owner wants.
              </p>
              <p className="feature-proof-note">
                Proof points: stance, clearance, accessory load, recovery access
                and fitment notes in one build record.
              </p>
            </div>

            <div className="feature-specs">
              <div>
                <div className="v chrome-text">
                  Parts
                </div>
                <div className="k">4x4 accessories</div>
              </div>
              <div>
                <div className="v chrome-text">
                  Most
                </div>
                <div className="k">Makes and models</div>
              </div>
              <div>
                <div className="v tk-accent">
                  <CountUpWatcher to={30} suffix="+" />
                </div>
                <div className="k">Years local experience</div>
              </div>
              <div>
                <div className="v chrome-text">
                  Wait
                </div>
                <div className="k">Timing confirmed before booking</div>
              </div>
            </div>

            <div className="feature-actions">
              <Link className="btn btn-chrome" href="/services/suspension-lift-kits">
                <span>Explore upgrade services</span>
                <span className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
