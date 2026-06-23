import Image from "next/image"
import Link from "next/link"

import { GALLERY_TILES } from "../shared/media"

// ── Gallery ────────────────────────────────────────────────────
export function Gallery() {
  return (
    <section className="section" id="gallery" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 05 ] From the workshop</div>
            <h2 className="display display-lg" style={{ marginTop: 18 }}>
              Real vehicles. Real fitment. Real{" "}
              <span className="tk-accent">
                proof
              </span>
              .
            </h2>
          </div>
          <Link className="btn btn-ghost" href="/parts">
            <span>Search parts catalogue</span>
            <span className="arrow" />
          </Link>
        </div>

        <div className="gallery reveal">
          {GALLERY_TILES.map((tile) => (
            <div key={tile.tag} className={`tile ${tile.cls}`}>
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                className="tile-image"
              />
              <div className="tile-shade" />
              <div className="tile-frame" />
              <div className="tile-label">
                <span className="ph">[ {tile.ph} ]</span>
                <span className="tag">#{tile.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
