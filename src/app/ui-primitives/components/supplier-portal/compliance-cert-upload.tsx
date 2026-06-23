"use client"

import { ShieldCheck } from "lucide-react"
import { useId, useState } from "react"

import { FileUploadForm } from "../forms-gallery/file-upload-form"
import { Chip } from "../primitives/chip"

import styles from "./compliance-cert-upload.module.css"
import type { CertificateKind, SupplierTone } from "./supplier-portal-types"

export interface ComplianceCertUploadProps {
  defaultKind?: CertificateKind
  defaultExpiry?: string
  /** Display checksum verification chip when true. */
  checksumVerified?: boolean
  onSubmit?: (payload: ComplianceCertUploadPayload) => void
}

export interface ComplianceCertUploadPayload {
  kind: CertificateKind
  expiry: string
}

const CERT_LABEL: Record<CertificateKind, string> = {
  adr: "ADR design rules",
  "iso-9001": "ISO 9001 quality",
  msds: "Safety data sheet (MSDS)",
  insurance: "Public liability insurance",
  "trade-licence": "Trade business licence",
}

const CERT_KINDS: ReadonlyArray<CertificateKind> = [
  "adr",
  "iso-9001",
  "msds",
  "insurance",
  "trade-licence",
]

function checksumTone(verified: boolean): SupplierTone {
  return verified ? "green" : "amber"
}

export function ComplianceCertUpload({
  defaultKind = "adr",
  defaultExpiry = "",
  checksumVerified = true,
  onSubmit,
}: ComplianceCertUploadProps) {
  const kindId = useId()
  const expiryId = useId()
  const [kind, setKind] = useState<CertificateKind>(defaultKind)
  const [expiry, setExpiry] = useState<string>(defaultExpiry)

  return (
    <section
      className={styles.wrap}
      role="region"
      aria-label="Compliance certificate upload"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Compliance</span>
        <h3 className={styles.title}>Upload certificate</h3>
        <Chip
          label={checksumVerified ? "Checksum verified" : "Checksum pending"}
          tone={checksumTone(checksumVerified)}
          icon={<ShieldCheck size={12} aria-hidden="true" />}
        />
      </header>

      <div className={styles.metaGrid}>
        <label className={styles.field} htmlFor={kindId}>
          <span className={styles.fieldLabel}>Certificate type</span>
          <select
            id={kindId}
            className={styles.input}
            value={kind}
            onChange={(event) => setKind(event.target.value as CertificateKind)}
          >
            {CERT_KINDS.map((option) => (
              <option key={option} value={option}>
                {CERT_LABEL[option]}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field} htmlFor={expiryId}>
          <span className={styles.fieldLabel}>Expiry date</span>
          <input
            id={expiryId}
            type="date"
            className={styles.input}
            value={expiry}
            onChange={(event) => setExpiry(event.target.value)}
            required
          />
        </label>
      </div>

      <FileUploadForm
        onSubmit={() => onSubmit?.({ kind, expiry })}
      />
    </section>
  )
}

export default ComplianceCertUpload
