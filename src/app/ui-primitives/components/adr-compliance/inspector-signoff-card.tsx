import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"

import styles from "./inspector-signoff-card.module.css"

export interface InspectorSignoffCardProps {
  /** Inspector / technician name. */
  inspectorName: string
  /** Trade qualification, e.g. "MTA · Cert III Auto". */
  qualification: string
  /** Licence number, e.g. "MVRL 78421". */
  licenceNumber: string
  /** ISO timestamp of sign-off. */
  signedIso: string
  /** Friendly sign-off label, e.g. "Mon 27 May · 14:18". */
  signedAt: string
  /** Number of photo evidence files attached. */
  photoEvidenceCount: number
  /** Optional avatar image src. */
  avatarSrc?: string
  /** Visible signature glyph rendered as a typed signature placeholder. */
  signatureGlyph?: string
  className?: string
}

export function InspectorSignoffCard({
  inspectorName,
  qualification,
  licenceNumber,
  signedIso,
  signedAt,
  photoEvidenceCount,
  avatarSrc,
  signatureGlyph,
  className,
}: InspectorSignoffCardProps) {
  return (
    <article
      className={`${styles.card} ${className ?? ""}`.trim()}
      aria-label={`Inspector sign-off by ${inspectorName}`}
    >
      <Avatar name={inspectorName} src={avatarSrc} size="lg" tone="amber" status="online" />
      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.kicker}>Signed off · ADR compliance</span>
          <h4 className={styles.name}>{inspectorName}</h4>
          <span className={styles.licence}>Licence {licenceNumber}</span>
        </div>

        <div className={styles.chipRow}>
          <Chip label={qualification} tone="teal" />
          <Chip label={`${photoEvidenceCount} photos`} tone="neutral" />
          <Chip label="NSW VSI 14 trained" tone="green" />
        </div>

        <div className={styles.timestamp}>
          <span>
            Signed
            <strong>
              <time dateTime={signedIso}> {signedAt}</time>
            </strong>
          </span>
          <span className={styles.signGlyph} aria-hidden="true">
            {signatureGlyph ?? `~ ${inspectorName} ~`}
          </span>
        </div>
      </div>
    </article>
  )
}

export default InspectorSignoffCard
