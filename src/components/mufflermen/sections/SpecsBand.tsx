import { CountUpWatcher } from "@/app/ui-primitives/components/motion/count-up-watcher"

// ── Specs band ─────────────────────────────────────────────────
export function SpecsBand() {
  return (
    <section className="section experience-stats-section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal experience-stats-head">
          <div>
            <div className="label-red">[ 03 ] By the numbers</div>
            <h2 className="display display-md" style={{ marginTop: 18 }}>
              Local 4x4 upgrade work.
            </h2>
            <p className="lead experience-stats-lede">
              Local 4x4 knowledge, practical fitment advice and the right
              route before parts are ordered.
            </p>
          </div>
        </div>
        <div className="specs reveal experience-stats">
          <div className="spec-cell experience-stat-card experience-stat-card-primary">
            <div className="experience-stat-index">01</div>
            <div className="v chrome-text experience-stat-value">
              <CountUpWatcher
                to={30}
                suffix="+"
                duration={900}
                ariaLabel="4x4 upgrade experience"
                className="experience-stat-count"
              />
            </div>
            <div className="k">Upgrade categories covered</div>
            <div className="desc">
              Locally operated 4x4 upgrade and parts workshop serving the
              Illawarra.
            </div>
          </div>
          <div className="spec-cell experience-stat-card">
            <div className="experience-stat-index">02</div>
            <div className="v chrome-text experience-stat-value">Most makes</div>
            <div className="k">Utes · 4WDs · tourers · work rigs</div>
            <div className="desc">
              From daily drivers to touring and work-ute builds. If
              the fitment is unusual, start the conversation here.
            </div>
          </div>
          <div className="spec-cell experience-stat-card">
            <div className="experience-stat-index">03</div>
            <div className="v experience-stat-value experience-stat-value-accent tk-accent">
              Fitment
            </div>
            <div className="k">Expert fitting</div>
            <div className="desc">
              Suspension, protection, recovery, lighting, towing and touring
              accessories for popular 4x4 platforms.
            </div>
          </div>
          <div className="spec-cell experience-stat-card">
            <div className="experience-stat-index">04</div>
            <div className="v chrome-text experience-stat-value">Quick or custom</div>
            <div className="k">Timing depends on the job</div>
            <div className="desc">
              Straightforward fitment turnaround is fast. Fabrication work is
              scheduled to suit the scope — call to confirm.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
