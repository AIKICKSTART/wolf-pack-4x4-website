import { QrBlock } from "./qr-block"
import { PrintSheet } from "./print-sheet"

import styles from "./print-compliance-cert.module.css"

interface PrintComplianceCertProps {
  certificateNumber: string
  issuedAt: string
  issuedIso: string
  customerName: string
  vehicleDescription: string
  vehicleRego: string
  vehicleVin: string
  workCertified: string
  adrReference: string
  technicianName: string
  technicianLicence: string
  workshopName: string
  workshopAbn: string
  workshopAddress: string
  verificationUrl: string
}

export function PrintComplianceCert({
  certificateNumber,
  issuedAt,
  issuedIso,
  customerName,
  vehicleDescription,
  vehicleRego,
  vehicleVin,
  workCertified,
  adrReference,
  technicianName,
  technicianLicence,
  workshopName,
  workshopAbn,
  workshopAddress,
  verificationUrl,
}: PrintComplianceCertProps) {
  return (
    <PrintSheet format="A4" ariaLabel={`Certificate of compliance ${certificateNumber}`}>
      <div className={styles.certFrame}>
        <div className={styles.ornament} aria-hidden="true">
          <span className={styles.cornerTL} />
          <span className={styles.cornerTR} />
          <span className={styles.cornerBL} />
          <span className={styles.cornerBR} />
        </div>

        <div className={styles.inner}>
          <header className={styles.crest}>
            <div className={styles.crestRing} aria-hidden="true">
              <span>OFM</span>
            </div>
            <span className={styles.kicker}>Oak Flats Mufflermen</span>
          </header>

          <h1 className={styles.title}>
            Certificate
            <span>of</span>
            Compliance
          </h1>

          <p className={styles.preamble}>This is to certify that the work described below has been performed in accordance with the relevant Australian Design Rules and the in-service vehicle standards of New South Wales.</p>

          <dl className={styles.certDetails}>
            <div>
              <dt>Issued to</dt>
              <dd>{customerName}</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>{vehicleDescription}</dd>
            </div>
            <div>
              <dt>Registration</dt>
              <dd>{vehicleRego}</dd>
            </div>
            <div>
              <dt>VIN</dt>
              <dd>{vehicleVin}</dd>
            </div>
            <div>
              <dt>Work certified</dt>
              <dd>{workCertified}</dd>
            </div>
            <div>
              <dt>ADR reference</dt>
              <dd>{adrReference}</dd>
            </div>
          </dl>

          <footer className={styles.certFooter}>
            <div className={styles.signatures}>
              <div>
                <span className={styles.kicker}>Certified by</span>
                <div className={styles.signLine} aria-hidden="true" />
                <strong>{technicianName}</strong>
                <small>Licence {technicianLicence}</small>
              </div>
              <div>
                <span className={styles.kicker}>Issued</span>
                <strong>
                  <time dateTime={issuedIso}>{issuedAt}</time>
                </strong>
                <small>Cert no. {certificateNumber}</small>
              </div>
            </div>
            <div className={styles.verify}>
              <QrBlock value={verificationUrl} label="Verify online" size={96} />
            </div>
          </footer>

          <p className={styles.workshopFooter}>
            {workshopName} · ABN {workshopAbn} · {workshopAddress}
          </p>
        </div>
      </div>
    </PrintSheet>
  )
}

export default PrintComplianceCert
