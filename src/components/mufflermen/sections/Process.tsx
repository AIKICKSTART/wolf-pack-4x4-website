// ── Process ────────────────────────────────────────────────────
export function Process() {
  const steps = [
    {
      tag: "Step 01",
      title: "Call or send details",
      body: "Start with the vehicle, the issue, the sound target and the fitment outcome you want.",
    },
    {
      tag: "Step 02",
      title: "Assess the right path",
      body: "The workshop scopes whether the job needs repair, replacement, parts, truck work, trailer repair or custom fabrication.",
    },
    {
      tag: "Step 03",
      title: "Fabricate and fit",
      body: "Systems are selected, shaped and fitted around the vehicle with mandrel bends, practical routing and clean hanger geometry where required.",
    },
    {
      tag: "Step 04",
      title: "Fitment & handover",
      body: "Final fitment is checked around clearance, sound and everyday use before handover.",
    },
  ]
  return (
    <section className="section" id="process" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 04 ] How we work</div>
            <h2 className="display display-lg" style={{ marginTop: 18 }}>
              From quote to{" "}
              <span className="tk-accent">
                roar
              </span>
              .
            </h2>
          </div>
          <p className="lead">
            Exhaust work scheduled around your job — no guesswork, no surprises.
          </p>
        </div>

        <div className="process">
          {steps.map((s, i) => (
            <div key={s.tag} className={`step neumo reveal d${i + 1}`}>
              <span className="pill">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
