import type { Metadata } from "next"

import {
  BranchPreviewDeck,
  CdnCacheTile,
  DeployGateCard,
  DeployTimeline,
  DnsRecordRow,
  EnvEditor,
  HealthcheckHeatmap,
  IncidentBanner,
  ReleaseNotesCard,
  RollbackPanel,
  RuntimeVersionTile,
  SecretVaultRow,
  SslCertCard,
  TrafficShiftCard,
} from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import {
  BRANCH_PREVIEWS,
  CDN_PATTERNS,
  CERTIFICATES,
  DEPLOY_HISTORY,
  DNS_RECORDS,
  ENV_VARIABLES,
  GATE_CHECKS_RUNNING,
  HEALTHCHECKS,
  INCIDENT_ACTIVE,
  RELEASE_NOTES_BREAKING,
  REVISIONS,
  RUNTIME_VERSIONS,
  SECRETS,
  TRAFFIC_SHIFT_CANARY,
} from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Full deploy control room | Deploy console",
  description:
    "Composition — Oak Flats Mufflermen production deploy control room assembled from the 14 primitives.",
}

const SECRET_TRIO = SECRETS.slice(0, 3)
const RUNTIME_TRIO = RUNTIME_VERSIONS.slice(0, 3)
const DNS_TRIO = DNS_RECORDS.slice(0, 3)

export default function FullControlRoomPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Deploy control room"
        title="Mufflermen deploy control room"
        description="A composed internal control room wired from the 14 deploy-console primitives. Active SEV2 banner up top, runtime grid + deploy gate next to the secret vault and rollback panel, healthcheck heatmap + deploy timeline + branch previews + traffic shift card across the main column, env editor + DNS + SSL + release notes + CDN tiles down the aside."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Full control room" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Composition · production deploy control room · SEV2 active
        </span>
        <div className={styles.controlRoom}>
          <IncidentBanner incident={INCIDENT_ACTIVE} />

          <div className={styles.demoSplit}>
            <DeployGateCard
              title="Hotfix burn-in · v3.42.7-rc1"
              description="Lint mid-run. Security + build queued; owner approval will fire last."
              checks={GATE_CHECKS_RUNNING}
              kicker="Production · v3.42.7-rc1"
              deployHref="#promote"
            />
            <TrafficShiftCard initial={TRAFFIC_SHIFT_CANARY} />
          </div>

          <div className={styles.controlRoomSplit}>
            <div className={styles.controlRoomCol}>
              <HealthcheckHeatmap endpoints={HEALTHCHECKS} />
              <DeployTimeline entries={DEPLOY_HISTORY} />
              <BranchPreviewDeck previews={BRANCH_PREVIEWS} />
              <EnvEditor variables={ENV_VARIABLES} initialScope="production" />
            </div>

            <aside className={styles.controlRoomAside}>
              <section className={styles.demoSurface} aria-label="Runtime pins">
                <span className={styles.demoLabel}>Runtime · pinned</span>
                <div className={styles.demoStack}>
                  {RUNTIME_TRIO.map((runtime) => (
                    <RuntimeVersionTile key={runtime.kind} runtime={runtime} />
                  ))}
                </div>
              </section>

              <section className={styles.demoSurface} aria-label="Secret vault">
                <span className={styles.demoLabel}>Secret vault</span>
                <div className={styles.demoStack}>
                  {SECRET_TRIO.map((entry) => (
                    <SecretVaultRow key={entry.key} entry={entry} />
                  ))}
                </div>
              </section>

              <section className={styles.demoSurface} aria-label="CDN cache">
                <span className={styles.demoLabel}>CDN cache</span>
                <div className={styles.demoStack}>
                  <CdnCacheTile pattern={CDN_PATTERNS[2]} />
                  <CdnCacheTile pattern={CDN_PATTERNS[3]} />
                </div>
              </section>

              <section className={styles.demoSurface} aria-label="DNS">
                <span className={styles.demoLabel}>DNS · top 3 records</span>
                <div className={styles.demoStack}>
                  {DNS_TRIO.map((record) => (
                    <DnsRecordRow key={`${record.host}-${record.type}`} record={record} />
                  ))}
                </div>
              </section>

              <section className={styles.demoSurface} aria-label="Certificates">
                <span className={styles.demoLabel}>TLS · expiring soonest</span>
                <SslCertCard certificate={CERTIFICATES[2]} />
              </section>

              <section className={styles.demoSurface} aria-label="Upcoming release">
                <span className={styles.demoLabel}>Upcoming release</span>
                <ReleaseNotesCard notes={RELEASE_NOTES_BREAKING} />
              </section>
            </aside>
          </div>

          <RollbackPanel revisions={REVISIONS} />
        </div>
      </section>
    </main>
  )
}
