import { PrintSheet } from "./print-sheet"

import styles from "./print-consent-form.module.css"

export interface ConsentFormCustomer {
  name: string
  phone: string
  email: string
  licenceNumber: string
}

export interface ConsentFormVehicle {
  rego: string
  make: string
  model: string
  year: number
  vin: string
}

export interface ConsentAcknowledgement {
  id: string
  label: string
}

interface PrintConsentFormProps {
  consentNumber: string
  preparedAt: string
  preparedIso: string
  customer: ConsentFormCustomer
  vehicle: ConsentFormVehicle
  scopeOfWork: string
  riskDisclosure: string
  adrReference: string
  acknowledgements: ReadonlyArray<ConsentAcknowledgement>
  workshopName: string
  workshopAbn: string
}

export function PrintConsentForm({
  consentNumber,
  preparedAt,
  preparedIso,
  customer,
  vehicle,
  scopeOfWork,
  riskDisclosure,
  adrReference,
  acknowledgements,
  workshopName,
  workshopAbn,
}: PrintConsentFormProps) {
  return (
    <PrintSheet
      format="A4"
      ariaLabel={`Customer consent form ${consentNumber}`}
      header={
        <div className={styles.head}>
          <div>
            <span className={styles.kicker}>Customer authorisation</span>
            <h1>Workshop consent form</h1>
            <p className={styles.subline}>
              Required for any modification, performance work, or emissions-affecting work.
            </p>
          </div>
          <dl className={styles.docMeta}>
            <div>
              <dt>Form no.</dt>
              <dd>{consentNumber}</dd>
            </div>
            <div>
              <dt>Prepared</dt>
              <dd>
                <time dateTime={preparedIso}>{preparedAt}</time>
              </dd>
            </div>
            <div>
              <dt>ADR ref</dt>
              <dd>{adrReference}</dd>
            </div>
          </dl>
        </div>
      }
      footer={
        <>
          <span>{workshopName} · ABN {workshopAbn} · Retain signed copy on file for the life of the vehicle.</span>
          <span>Failure to declare modifications to the relevant authority may void registration.</span>
        </>
      }
    >
      <section className={styles.blocks} aria-label="Customer and vehicle details">
        <article className={styles.block}>
          <span className={styles.blockKicker}>Customer</span>
          <strong>{customer.name}</strong>
          <dl>
            <div>
              <dt>Phone</dt>
              <dd>{customer.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{customer.email}</dd>
            </div>
            <div>
              <dt>Licence</dt>
              <dd>{customer.licenceNumber}</dd>
            </div>
          </dl>
        </article>
        <article className={styles.block}>
          <span className={styles.blockKicker}>Vehicle</span>
          <strong>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </strong>
          <dl>
            <div>
              <dt>Rego</dt>
              <dd>{vehicle.rego}</dd>
            </div>
            <div>
              <dt>VIN</dt>
              <dd>{vehicle.vin}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className={styles.scope} aria-label="Scope of authorised work">
        <span className={styles.sectionKicker}>Scope of authorised work</span>
        <p>{scopeOfWork}</p>
      </section>

      <section className={styles.risk} aria-label="Risk disclosure">
        <span className={styles.sectionKicker}>Risk disclosure</span>
        <p>{riskDisclosure}</p>
      </section>

      <section className={styles.acks} aria-label="Acknowledgements">
        <span className={styles.sectionKicker}>I acknowledge that:</span>
        <ul>
          {acknowledgements.map((ack) => (
            <li key={ack.id}>
              <span className={styles.checkBox} aria-hidden="true" />
              <span>{ack.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.signoff} aria-label="Signatures">
        <div>
          <span className={styles.sectionKicker}>Customer signature</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>{customer.name} · Date</small>
        </div>
        <div>
          <span className={styles.sectionKicker}>Workshop witness</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>Name · Role · Date</small>
        </div>
      </section>
    </PrintSheet>
  )
}

export default PrintConsentForm
