import {
  ENCRYPTION_LABEL,
  KEY_MGMT_LABEL,
  type EncryptionAlgo,
  type KeyManagementBacking,
} from "./compliance-types"
import styles from "./encryption-status-indicator.module.css"

export interface EncryptionStatusIndicatorProps {
  /** Algorithm protecting data at rest. */
  atRestAlgo: EncryptionAlgo
  /** Optional FIPS-140 module / library backing the at-rest algo. */
  atRestModule?: string
  /** TLS version protecting data in transit. */
  inTransitAlgo: EncryptionAlgo
  /** Optional cipher suite shown next to in-transit chip. */
  inTransitSuite?: string
  /** Key management backing. */
  keyManagement: KeyManagementBacking
  /** Last key rotation timestamp, e.g. "2026-04-12". */
  lastKeyRotation: string
  /** Rotation cadence label, e.g. "Every 90 days". */
  rotationCadence: string
  className?: string
}

export function EncryptionStatusIndicator({
  atRestAlgo,
  atRestModule,
  inTransitAlgo,
  inTransitSuite,
  keyManagement,
  lastKeyRotation,
  rotationCadence,
  className,
}: EncryptionStatusIndicatorProps) {
  return (
    <section
      className={[styles.indicator, className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Encryption status"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Encryption posture</span>
        <h3 className={styles.title}>Data is encrypted</h3>
        <p className={styles.body}>
          At-rest and in-transit encryption are enforced. Keys are managed and
          rotated against the documented cadence.
        </p>
      </header>

      <div className={styles.row}>
        <div className={styles.tile}>
          <span className={styles.tileLabel}>At rest</span>
          <span className={styles.tileValue}>
            {ENCRYPTION_LABEL[atRestAlgo]}
          </span>
          {atRestModule ? (
            <span className={styles.tileSub}>{atRestModule}</span>
          ) : null}
          <span className={styles.activeChip}>Active</span>
        </div>

        <div className={styles.tile}>
          <span className={styles.tileLabel}>In transit</span>
          <span className={styles.tileValue}>
            {ENCRYPTION_LABEL[inTransitAlgo]}
          </span>
          {inTransitSuite ? (
            <span className={styles.tileSub}>{inTransitSuite}</span>
          ) : null}
          <span className={styles.activeChip}>Active</span>
        </div>

        <div className={styles.tile}>
          <span className={styles.tileLabel}>Key management</span>
          <span className={styles.tileValue}>{KEY_MGMT_LABEL[keyManagement]}</span>
          <span className={styles.kmChip}>Backed</span>
        </div>
      </div>

      <footer className={styles.foot}>
        <span>
          Last rotation
          <span className={styles.footValue}>{lastKeyRotation}</span>
        </span>
        <span>
          Cadence
          <span className={styles.footValue}>{rotationCadence}</span>
        </span>
      </footer>
    </section>
  )
}

export default EncryptionStatusIndicator
