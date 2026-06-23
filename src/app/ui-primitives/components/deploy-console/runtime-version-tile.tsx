import {
  RUNTIME_DRIFT_LABEL,
  RUNTIME_DRIFT_TONE,
  type RuntimeVersion,
} from "./deploy-console-types"
import styles from "./runtime-version-tile.module.css"
import shell from "./deploy-console.module.css"

export interface RuntimeVersionTileProps {
  runtime: RuntimeVersion
  className?: string
}

function toneClassFor(runtime: RuntimeVersion): string {
  switch (RUNTIME_DRIFT_TONE[runtime.drift]) {
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    case "green":
      return shell.toneGreen
    default:
      return shell.toneNeutral
  }
}

const KIND_GLYPH: Record<RuntimeVersion["kind"], string> = {
  node: "▲",
  next: "N",
  pnpm: "p",
  docker: "▢",
  postgres: "Pg",
  redis: "R",
}

export function RuntimeVersionTile({ runtime, className }: RuntimeVersionTileProps) {
  const toneCls = toneClassFor(runtime)
  return (
    <article
      className={[shell.shell, toneCls, styles.tile, className].filter(Boolean).join(" ")}
      aria-label={`${runtime.label} runtime — ${RUNTIME_DRIFT_LABEL[runtime.drift]}`}
    >
      <header className={styles.head}>
        <span className={styles.glyph} aria-hidden="true">
          {KIND_GLYPH[runtime.kind]}
        </span>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>Runtime</span>
          <h3 className={styles.label}>{runtime.label}</h3>
        </div>
        <span className={[shell.chip, toneCls].join(" ")}>
          {RUNTIME_DRIFT_LABEL[runtime.drift]}
        </span>
      </header>

      <dl className={styles.versions}>
        <div className={styles.versionRow}>
          <dt>Current</dt>
          <dd className={[styles.versionValue, styles.versionCurrent].join(" ")}>
            {runtime.currentVersion}
          </dd>
        </div>
        <div className={styles.versionRow}>
          <dt>Pinned</dt>
          <dd className={styles.versionValue}>{runtime.pinnedVersion}</dd>
        </div>
        <div className={styles.versionRow}>
          <dt>Latest</dt>
          <dd className={styles.versionValue}>{runtime.latestVersion}</dd>
        </div>
      </dl>

      {runtime.supportWindow ? (
        <footer className={styles.foot}>
          <span className={shell.sectionLabel}>Support window</span>
          <span className={styles.supportWindow}>{runtime.supportWindow}</span>
        </footer>
      ) : null}
    </article>
  )
}

export default RuntimeVersionTile
