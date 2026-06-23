import { PrintComplianceCert } from "../print-docs/print-compliance-cert"

import styles from "./certificate-of-compliance-template.module.css"

export interface CertificateOfComplianceTemplateProps {
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
  className?: string
}

export function CertificateOfComplianceTemplate({
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
  className,
}: CertificateOfComplianceTemplateProps) {
  return (
    <section
      className={`${styles.wrap} ${className ?? ""}`.trim()}
      aria-label={`Certificate of compliance preview — ${certificateNumber}`}
    >
      <span className={styles.previewLabel}>In-app preview · ADR cert</span>
      <div className={styles.frame}>
        <PrintComplianceCert
          certificateNumber={certificateNumber}
          issuedAt={issuedAt}
          issuedIso={issuedIso}
          customerName={customerName}
          vehicleDescription={vehicleDescription}
          vehicleRego={vehicleRego}
          vehicleVin={vehicleVin}
          workCertified={workCertified}
          adrReference={adrReference}
          technicianName={technicianName}
          technicianLicence={technicianLicence}
          workshopName={workshopName}
          workshopAbn={workshopAbn}
          workshopAddress={workshopAddress}
          verificationUrl={verificationUrl}
        />
      </div>
    </section>
  )
}

export default CertificateOfComplianceTemplate
