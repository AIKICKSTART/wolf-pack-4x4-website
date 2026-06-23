import { Wrench } from "lucide-react"

// ── Reviews ────────────────────────────────────────────────────
export function Reviews() {
  return (
    <section className="section" id="reviews" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 06 ] Why customers come in</div>
            <h2 className="display display-lg" style={{ marginTop: 18 }}>
              Clear advice,{" "}
              <span className="tk-accent">
                clean fitment
              </span>
              ,<br />
              no guesswork.
            </h2>
          </div>
        </div>

        <div className="review">
          <article className="review-card glass reveal d1">
            <div>
              <span className="quote-mark">01</span>
              <blockquote>
                Customers come in for a straight diagnosis before committing to
                repair, replacement, parts or a fabricated system.
              </blockquote>
            </div>
            <div className="who">
              <div className="avatar chrome-plate">
                <Wrench className="avatar-glyph" aria-hidden="true" />
              </div>
              <div>
                <div className="n">Workshop assessment</div>
                <div className="r">Cars, utes, trucks and trailers</div>
              </div>
            </div>
          </article>

          <article className="review-card neumo reveal d2">
            <div>
              <span className="quote-mark tk-accent">
                02
              </span>
              <blockquote>
                One visit. Sound and fitment locked in before the bay — no
                rework, no surprises.
              </blockquote>
            </div>
            <div className="who">
              <div className="avatar chrome-plate">
                <Wrench className="avatar-glyph" aria-hidden="true" />
              </div>
              <div>
                <div className="n">Fabrication and fitting</div>
                <div className="r">Sound and performance you want</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
