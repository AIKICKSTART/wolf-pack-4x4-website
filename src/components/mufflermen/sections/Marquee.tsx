// ── Marquee ────────────────────────────────────────────────────
export function Marquee() {
  const items = [
    "Suspension lifts",
    "Bull bars",
    "Winches",
    "Recovery gear",
    "Driving lights",
    "Dual batteries",
    "Canopies",
    "Roof racks",
    "Towing support",
    "GVM planning",
    "Touring storage",
    "4x4 parts",
  ]
  return (
    <section className="marquee" aria-label="4x4 upgrade capabilities">
      <div className="marquee-track" aria-hidden="true">
        {[...items, ...items].map((it, i) => (
          <span key={i}>{it}</span>
        ))}
      </div>
    </section>
  )
}
