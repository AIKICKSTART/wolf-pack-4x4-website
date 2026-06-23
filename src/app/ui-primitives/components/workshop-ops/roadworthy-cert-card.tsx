import { Chip } from "../primitives/chip"
import { ShieldTickIcon } from "../icons/shield-tick"
import {
  CERT_STATUS_LABEL,
  CERT_STATUS_TONE,
  CERT_TYPE_LABEL,
  type RoadworthyCert,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./roadworthy-cert-card.module.css"

interface RoadworthyCertCardProps {
  cert: RoadworthyCert
  className?: string
}

export function RoadworthyCertCard({
  cert,
  className,
}: RoadworthyCertCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const tone = opsToneToChip(CERT_STATUS_TONE[cert.status])
  const isPink = cert.certType === "pink-slip"
  const isBlue = cert.certType === "blue-slip"

  const faultLabel =
    cert.faultCount === 0
      ? "No faults"
      : `${cert.faultCount} fault${cert.faultCount === 1 ? "" : "s"}`

  return (
    <article
      className={classes}
      data-cert={cert.id}
      data-cert-type={cert.certType}
      aria-label={`${CERT_TYPE_LABEL[cert.certType]} for ${cert.vehicleLabel}`}
    >
      <header className={styles.head}>
        <div
          className={[
            styles.banner,
            isPink ? styles.bannerPink : "",
            isBlue ? styles.bannerBlue : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={styles.bannerType}>
            {CERT_TYPE_LABEL[cert.certType]}
          </span>
          <span className={styles.bannerNumber}>{cert.certNumber}</span>
        </div>
        <Chip label={CERT_STATUS_LABEL[cert.status]} tone={tone} />
      </header>

      <section className={styles.identity} aria-label="Vehicle details">
        <div className={styles.vehicle}>
          <span className={styles.vehicleLabel}>{cert.vehicleLabel}</span>
          <span className={styles.customer}>{cert.customerLabel}</span>
        </div>
        <span className={styles.regoPlate}>{cert.rego}</span>
      </section>

      <dl className={styles.facts}>
        <div>
          <dt>Inspector</dt>
          <dd>{cert.inspectorName}</dd>
        </div>
        <div>
          <dt>Issued</dt>
          <dd>
            {cert.issuedAt ? (
              <time>{cert.issuedAt}</time>
            ) : (
              <span className={styles.factPending}>Pending</span>
            )}
          </dd>
        </div>
        <div>
          <dt>Expires</dt>
          <dd>
            {cert.expiresAt ? (
              <time>{cert.expiresAt}</time>
            ) : (
              <span className={styles.factPending}>—</span>
            )}
          </dd>
        </div>
        <div>
          <dt>Faults</dt>
          <dd
            className={
              cert.faultCount > 0 ? styles.factWarn : styles.factOk
            }
          >
            {faultLabel}
          </dd>
        </div>
      </dl>

      <footer className={styles.foot}>
        <div className={styles.ervBlock}>
          <span
            className={styles.ervGlyph}
            data-verified={cert.ervVerifiedAt ? "true" : "false"}
            aria-hidden="true"
          >
            <ShieldTickIcon
              size={18}
              tone={cert.ervVerifiedAt ? "green" : "amber"}
              motion="none"
            />
          </span>
          <div className={styles.ervMeta}>
            <span className={styles.ervLabel}>NSW RTA eSafety</span>
            <span className={styles.ervStatus}>
              {cert.ervVerifiedAt
                ? `Verified · ${cert.ervVerifiedAt}`
                : "Awaiting upload to ERV"}
            </span>
          </div>
        </div>
      </footer>
    </article>
  )
}

export default RoadworthyCertCard
