"use client"

import type { VerificationResult } from "./backup-types"

import styles from "./backup-verification-result.module.css"

interface BackupVerificationResultProps {
  result: VerificationResult
  onVerifyNow?: (snapshotId: string) => void
  className?: string
}

function StatusIcon({ passed }: { passed: boolean }) {
  if (passed) {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="8" cy="8" r="7" className={styles.iconDiscPass} stroke="currentColor" />
        <path
          d="M5 8.3l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <circle cx="8" cy="8" r="7" className={styles.iconDiscFail} stroke="currentColor" />
      <path
        d="M5.5 5.5l5 5M10.5 5.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BackupVerificationResult({
  result,
  onVerifyNow,
  className,
}: BackupVerificationResultProps) {
  const overallPassed = result.checksumPassed && result.restoreTestPassed
  const classes = [
    styles.card,
    overallPassed ? styles.passed : styles.failed,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Verification for ${result.snapshotId}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Verification</span>
        <span className={styles.snapId}>{result.snapshotId}</span>
        <span
          className={[
            styles.overall,
            overallPassed ? styles.overallPass : styles.overallFail,
          ].join(" ")}
        >
          {overallPassed ? "All checks passed" : "Checks failed"}
        </span>
      </header>

      <ul className={styles.checks}>
        <li className={result.checksumPassed ? styles.pass : styles.fail}>
          <StatusIcon passed={result.checksumPassed} />
          <span className={styles.checkLabel}>Checksum</span>
          <span className={styles.checkValue}>
            {result.checksumPassed ? "Match" : "Mismatch"}
          </span>
        </li>
        <li className={result.restoreTestPassed ? styles.pass : styles.fail}>
          <StatusIcon passed={result.restoreTestPassed} />
          <span className={styles.checkLabel}>Restore test</span>
          <span className={styles.checkValue}>
            {result.restoreTestPassed ? "Boots cleanly" : "Boot failed"}
          </span>
        </li>
      </ul>

      {result.message ? (
        <p className={styles.message}>{result.message}</p>
      ) : null}

      <footer className={styles.footer}>
        <span className={styles.lastVerified}>
          Last verified <time dateTime={result.lastVerifiedAt}>{result.lastVerifiedAt}</time>
        </span>
        <button
          type="button"
          className={styles.verifyBtn}
          onClick={() => onVerifyNow?.(result.snapshotId)}
        >
          Verify now
        </button>
      </footer>
    </article>
  )
}

export default BackupVerificationResult
