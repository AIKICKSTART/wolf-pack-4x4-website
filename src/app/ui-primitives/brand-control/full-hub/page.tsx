import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AccessibilityGateCard,
  AssetCdnTile,
  AuditLogRow,
  BrandGuidelineCard,
  MOCK_A11Y_CHECKS,
  MOCK_ASSETS,
  MOCK_AUDIT,
  MOCK_CHANNELS,
  MOCK_COVERAGE,
  MOCK_DEPLOY,
  MOCK_DURATIONS,
  MOCK_EASINGS,
  MOCK_GUIDELINES,
  MOCK_PALETTE,
  MOCK_ROLE_MATRIX,
  MOCK_TEAM,
  MOCK_TOKEN_HISTORY,
  MOCK_TOKENS,
  MOCK_TYPE_PAIRINGS,
  MOCK_UMBRELLA_NODES,
  MotionSystemPanel,
  PaletteBuilder,
  ReleaseChannelPill,
  RoleMatrix,
  TeamRosterCard,
  ThemeDeployPanel,
  TokenEditor,
  TypographyPairingCard,
  UmbrellaImpactGraph,
  UsageCoverageStrip,
} from "../../components/brand-control"
import type {
  PermissionId,
  RoleId,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Full brand-control hub | UI Primitives",
}

const ROLES: ReadonlyArray<{ id: RoleId; label: string }> = [
  { id: "founder", label: "Daniel · Founder" },
  { id: "brand", label: "Mia · Brand" },
  { id: "parts", label: "Ben · Parts" },
  { id: "workshop", label: "Tim · Workshop" },
  { id: "contractor", label: "Kira · Contract" },
]

const PERMISSIONS: ReadonlyArray<{ id: PermissionId; label: string }> = [
  { id: "tokens.edit", label: "tokens" },
  { id: "assets.upload", label: "assets" },
  { id: "theme.deploy", label: "deploy" },
  { id: "brand.publish", label: "publish" },
  { id: "audit.read", label: "audit" },
]

export default function FullBrandControlHubPage() {
  const [knight, wordmark] = MOCK_ASSETS

  return (
    <main className={styles.subRoute}>
      <div className={styles.shell}>
        <PageHeader
          kicker="Composition"
          title="Brand control hub"
          description="Every brand-control primitive composed into the central umbrella-effect hub. Edit a token in the top-left and every consumer below repaints."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Full hub" },
          ]}
        />

        <span className={styles.notice}>
          One change cascades to every primitive — design tokens, palette, type, motion, assets, deploy, audit.
        </span>

        <section className={styles.hubGrid} aria-label="Tokens row">
          <div data-span="7" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Tokens</h2>
            <TokenEditor
              tokens={MOCK_TOKENS}
              history={MOCK_TOKEN_HISTORY}
              defaultSelectedId="amber"
            />
          </div>
          <div data-span="5" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Cascade</h2>
            <UmbrellaImpactGraph
              rootLabel="Workshop Amber"
              rootCssVar="--primitive-amber"
              nodes={MOCK_UMBRELLA_NODES}
            />
            <UsageCoverageStrip data={MOCK_COVERAGE} />
          </div>
        </section>

        <section className={styles.hubGrid} aria-label="Palette + typography row">
          <div data-span="7" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Palette</h2>
            <PaletteBuilder
              swatches={MOCK_PALETTE}
              defaultSelectedId="amber"
              defaultBackgroundId="canvas"
            />
          </div>
          <div data-span="5" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Typography</h2>
            <TypographyPairingCard pairing={MOCK_TYPE_PAIRINGS[0]} />
          </div>
        </section>

        <section className={styles.hubGrid} aria-label="Motion + assets row">
          <div data-span="6" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Motion</h2>
            <MotionSystemPanel
              durations={MOCK_DURATIONS}
              easings={MOCK_EASINGS}
              defaultDurationId="normal"
              defaultEasingId="standard"
            />
          </div>
          <div data-span="6" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Assets</h2>
            <AssetCdnTile asset={knight} />
            <AssetCdnTile asset={wordmark} />
          </div>
        </section>

        <section className={styles.hubGrid} aria-label="People + access row">
          <div data-span="8" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Access</h2>
            <RoleMatrix roles={ROLES} permissions={PERMISSIONS} cells={MOCK_ROLE_MATRIX} />
          </div>
          <div data-span="4" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Team</h2>
            {MOCK_TEAM.slice(0, 2).map((member) => (
              <TeamRosterCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section className={styles.hubGrid} aria-label="Deploy + channel row">
          <div data-span="6" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Deploy</h2>
            <ThemeDeployPanel deployment={MOCK_DEPLOY} />
          </div>
          <div data-span="6" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Gate</h2>
            <AccessibilityGateCard checks={MOCK_A11Y_CHECKS} />
            <ReleaseChannelPill channels={MOCK_CHANNELS} defaultChannelId="alpha" />
          </div>
        </section>

        <section className={styles.hubGrid} aria-label="Guidelines + audit row">
          <div data-span="6" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Guidelines</h2>
            <BrandGuidelineCard rule={MOCK_GUIDELINES[0]} />
            <BrandGuidelineCard rule={MOCK_GUIDELINES[1]} />
          </div>
          <div data-span="6" className={styles.hubSection}>
            <h2 className={styles.hubSectionTitle}>Audit</h2>
            {MOCK_AUDIT.slice(0, 4).map((entry) => (
              <AuditLogRow key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
