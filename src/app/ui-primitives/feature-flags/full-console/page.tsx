import type { Metadata } from "next"

import {
  AudienceFilterCard,
  EnvironmentTabs,
  ExperimentResultsCard,
  FlagCard,
  FlagDependencyGraph,
  FlagDetailPane,
  FlagSearch,
  KillSwitchButton,
  RecentFlagChangesLog,
  RolloutCanaryBar,
  RolloutSlider,
  VariantPicker,
  type FlagChangeRecord,
  type FlagDetailChange,
  type FlagDetailEnvBadge,
  type FlagDetailLinkedExperiment,
} from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"
import { ConsoleRulesList } from "./console-rules-client"

export const metadata: Metadata = {
  title: "Feature flags full console | Feature flags",
  description:
    "Composition — wires EnvironmentTabs + FlagSearch + flag list + FlagDetailPane + RecentFlagChangesLog + KillSwitchButton into one mock console.",
}

const DETAIL_ENV: ReadonlyArray<FlagDetailEnvBadge> = [
  { env: "dev", status: "on", rolloutPercent: 100 },
  { env: "staging", status: "on", rolloutPercent: 100 },
  { env: "prod", status: "ramping", rolloutPercent: 25 },
]

const DETAIL_CHANGES: ReadonlyArray<FlagDetailChange> = [
  {
    id: "ch-1",
    who: "Jess R · Product",
    when: "10 min ago",
    message: "Bumped Production from 5% → 25%.",
  },
  {
    id: "ch-2",
    who: "Marcus P · Engineering",
    when: "2 hr ago",
    message: "Added rule workspace IN (oak-flats, wollongong-east).",
  },
]

const DETAIL_EXPERIMENTS: ReadonlyArray<FlagDetailLinkedExperiment> = [
  { id: "exp-1", name: "exp-pricing-uplift-v3", status: "running" },
  { id: "exp-2", name: "exp-bay-availability-pilot", status: "paused" },
]

const AUDIT: ReadonlyArray<FlagChangeRecord> = [
  {
    id: "a-1",
    flagKey: "quote-instant-pricing",
    flagName: "Instant pricing on quotes",
    who: "Jess R",
    whoRole: "Product",
    when: "10 min ago",
    environment: "prod",
    fromValue: "ramping 5%",
    toValue: "ramping 25%",
  },
  {
    id: "a-2",
    flagKey: "parts-3d-viewer",
    flagName: "3D parts viewer",
    who: "Marcus P",
    whoRole: "Engineer",
    when: "32 min ago",
    environment: "staging",
    fromValue: "off",
    toValue: "on",
  },
  {
    id: "a-3",
    flagKey: "compliance-receipt-qr",
    flagName: "Compliance receipt QR",
    who: "Tom V",
    whoRole: "Compliance",
    when: "1 hr ago",
    environment: "prod",
    fromValue: "on",
    toValue: "killed",
    note: "Incident MUF-2026-0511",
  },
  {
    id: "a-4",
    flagKey: "workshop-bay-availability-realtime",
    flagName: "Realtime bay availability",
    who: "Priya K",
    whoRole: "Engineer",
    when: "3 hr ago",
    environment: "dev",
    fromValue: "off",
    toValue: "on",
  },
]

export default function FullConsolePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Console"
        title="Feature flags full console"
        description="Composed mock of the Mufflermen feature flag console — environment switcher, flag search, the active flag list, an open detail pane on the active flag, a dependency graph and a recent-changes audit table. Visual reference only, no backend is wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Full console" },
        ]}
      />

      <div className={styles.consoleShell}>
        <EnvironmentTabs
          defaultEnv="prod"
          tabs={[
            { env: "dev", status: "on", flagCount: 64 },
            { env: "staging", status: "on", flagCount: 41 },
            { env: "prod", status: "ramping", flagCount: 28 },
          ]}
        />

        <FlagSearch
          owners={[
            { id: "booking", label: "Booking" },
            { id: "parts", label: "Parts" },
            { id: "workshop", label: "Workshop" },
            { id: "compliance", label: "Compliance" },
            { id: "mobile", label: "Mobile" },
          ]}
          initialState={{
            query: "",
            ownerIds: ["booking"],
            status: "ramping",
            includeArchived: false,
          }}
        />

        <div className={styles.consoleGrid}>
          <div className={styles.flagList} aria-label="Active flags">
            <FlagCard
              name="Instant pricing on quotes"
              flagKey="quote-instant-pricing"
              description="Active flag — currently rolling out to 25% in Production."
              initialOn
              environments={[
                { env: "dev", status: "on" },
                { env: "staging", status: "on" },
                { env: "prod", status: "ramping" },
              ]}
              variants={[
                { id: "control", name: "Control", weight: 50 },
                { id: "live", name: "Live", weight: 50 },
              ]}
              lastModified="10 min ago"
              owner="Jess R · Booking"
            />
            <FlagCard
              name="3D parts viewer"
              flagKey="parts-3d-viewer"
              initialOn={false}
              environments={[
                { env: "dev", status: "on" },
                { env: "staging", status: "on" },
                { env: "prod", status: "off" },
              ]}
              lastModified="32 min ago"
              owner="Marcus P · Parts"
            />
            <FlagCard
              name="Compliance receipt QR"
              flagKey="compliance-receipt-qr"
              initialOn={false}
              environments={[
                { env: "dev", status: "on" },
                { env: "staging", status: "on" },
                { env: "prod", status: "killed" },
              ]}
              lastModified="1 hr ago"
              owner="Tom V · Compliance"
            />

            <FlagDetailPane
              name="Instant pricing on quotes"
              flagKey="quote-instant-pricing"
              description="Recalculates the quote total on each line edit instead of waiting for save."
              owner="Jess R · Booking"
              envBadges={DETAIL_ENV}
              variants={
                <VariantPicker
                  label="Variants"
                  variants={[
                    { id: "control", name: "Control", weight: 50, tone: "teal" },
                    { id: "live", name: "Live preview", weight: 50, tone: "amber" },
                  ]}
                />
              }
              rollout={<RolloutSlider defaultValue={25} label="Production rollout" snap />}
              rules={<ConsoleRulesList />}
              killSwitch={
                <KillSwitchButton
                  flagName="quote-instant-pricing"
                  label="Kill quote-instant-pricing"
                />
              }
              recentChanges={DETAIL_CHANGES}
              linkedExperiments={DETAIL_EXPERIMENTS}
            />
          </div>

          <aside className={styles.consoleSidebar} aria-label="Console context">
            <RolloutCanaryBar
              currentStepPercent={25}
              eta="14 min"
              steps={[
                { percent: 1, reached: true, label: "Internal" },
                { percent: 5, reached: true, label: "Oak Flats" },
                { percent: 25, reached: false, label: "NSW beta" },
                { percent: 50, reached: false, label: "AU" },
                { percent: 100, reached: false, label: "Global" },
              ]}
            />
            <AudienceFilterCard
              name="NSW mobile beta"
              description="Mobile app users inside NSW."
              memberCount={12450}
              criteria={[
                { label: "geo = AU-NSW", tone: "green" },
                { label: "device IN ios + android", tone: "teal" },
              ]}
            />
            <FlagDependencyGraph
              height={200}
              nodes={[
                { id: "auth-v2", label: "auth-v2", layer: 0, tone: "teal" },
                { id: "qip", label: "quote-instant-pricing", layer: 1, tone: "amber" },
                { id: "wba", label: "bay-availability", layer: 2, tone: "green" },
              ]}
              edges={[
                { from: "auth-v2", to: "qip" },
                { from: "qip", to: "wba" },
              ]}
            />
            <ExperimentResultsCard
              name="exp-pricing-uplift-v3"
              sampleSize={28430}
              variants={[
                {
                  id: "c",
                  name: "Control",
                  conversionRate: 18.4,
                  uplift: 0,
                  pValue: 1,
                  isControl: true,
                },
                {
                  id: "l",
                  name: "Live preview",
                  conversionRate: 22.1,
                  uplift: 20.1,
                  pValue: 0.0009,
                  isWinner: true,
                },
              ]}
            />
          </aside>
        </div>

        <RecentFlagChangesLog records={AUDIT} caption="Production changes — last 24 hours" />
      </div>
    </main>
  )
}
