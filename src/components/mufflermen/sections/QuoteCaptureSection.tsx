import { ContactEnquiryForm } from "@/components/mufflermen/contact-enquiry-form"
import { BrandCarbonIcon } from "../shared/brand-icon"
import { contactFromCms } from "../shared/contact"
import type { HomepageCmsSettings } from "../shared/types"

export function QuoteCaptureSection({ settings }: { settings: HomepageCmsSettings | null }) {
  const contact = contactFromCms(settings)
  const quoteChecklist = [
    "Vehicle make, model, year and engine",
    "Photos of the current accessories, suspension, tray, canopy or fitment area",
    "The clearance, towing, touring or off-road result you want",
  ]
  const proofPoints = [
    { label: "Local workshop", value: "Oak Flats / Albion Park Rail" },
    { label: "Best first step", value: "Call before booking the bay" },
    { label: "Quoted work", value: "Suspension, protection, lighting, recovery and parts" },
  ]

  return (
    <section className="section quote-capture-section" id="quote-request" aria-labelledby="quote-request-title">
      <div className="wrap quote-capture-layout">
        <div className="quote-capture-copy reveal">
          <span className="label-red">[ Quote request ] Workshop-ready details</span>
          <h2 id="quote-request-title" className="display display-lg">
            Send the vehicle details.
            <br />
            <span>Get the right 4x4 path.</span>
          </h2>
          <p className="lead">
            The fastest quote starts with the vehicle, current setup and the result
            you want. Wolfpack 4x4 can then steer you toward supplied parts,
            fitment or a staged upgrade plan.
          </p>
        </div>

        <div className="quote-capture-form reveal">
          <ContactEnquiryForm />
        </div>

        <div className="quote-capture-support reveal d1">
          <div className="quote-capture-contact">
            <a className="btn btn-red" href={contact.phoneHref}>
              <span>Call the workshop</span>
              <span className="arrow" />
            </a>
            <a className="btn btn-ghost" href={contact.emailHref}>
              <span>Email vehicle details</span>
              <span className="arrow" />
            </a>
          </div>

          <div className="quote-capture-mini" aria-label="Workshop contact details">
            <span>{contact.phone}</span>
            <span>{contact.openingHours}</span>
            <a href={contact.mapHref}>Map and directions</a>
          </div>

          <div className="quote-capture-proof" aria-label="Quote proof points">
            {proofPoints.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="quote-capture-card glass">
            <div className="quote-capture-icon brand-carbon-icon" aria-hidden="true">
              <BrandCarbonIcon name="quote" />
            </div>
            <div>
              <h3>What to send</h3>
              <ul className="quote-capture-list">
                {quoteChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
