import type { Metadata } from "next"

import {
  AnalyticsFunnelTile,
  AntiSpamShieldCard,
  ConditionalLogicCard,
  DataExportCard,
  FieldConfigPanel,
  FileUploadZone,
  FormBuilderCanvas,
  FormPublishCard,
  MultiStepFormRail,
  NotificationRuleRow,
  PaymentFieldCard,
  SubmissionDetailPanel,
  SubmissionInboxRow,
  WebhookTriggerRow,
} from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import {
  BOOK_SERVICE_FIELDS,
  CONDITIONAL_RULES,
  EXPORT_PRESETS,
  EXPORT_RANGE,
  FIELD_CONFIG_DRAFT,
  FUNNEL_STAGES,
  INBOX_ENTRIES,
  NOTIFICATION_RULES,
  PALETTE_SECTIONS,
  PAYMENT_FIELD_DRAFT,
  PUBLISH_EMBED_SNIPPET,
  PUBLISH_SHARE_LINK,
  PUBLISH_TARGETS,
  SPAM_SHIELD_RULES,
  SUBMISSION_ANSWERS,
  SUBMISSION_AUDIT,
  UPLOAD_FILES,
  WEBHOOK_TRIGGERS,
  WIZARD_STEPS,
} from "../fixtures"
import styles from "../forms-platform.module.css"

const TOTAL_BLOCKED = SPAM_SHIELD_RULES.reduce(
  (sum, rule) => sum + rule.blocked,
  0,
)

export const metadata: Metadata = {
  title: "Full forms-platform scene | Forms platform",
  description:
    "Composition — Oak Flats Mufflermen forms-platform operator view with builder canvas, inspector, wizard rail, anti-spam, payment, inbox, notifications, webhooks, publish, and the funnel tile.",
}

export default function FullFormsPlatformScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full forms-platform scene"
        title="Full forms-platform scene"
        description="One-page operator surface for the Mufflermen forms platform — drag the builder, inspect the selected field, watch the wizard rail, review the inbox, audit a single submission, manage the anti-spam shield, monitor Stripe payments, wire webhooks to Hermes, export the past 28 days, publish the form, and read the funnel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Full forms-platform" },
        ]}
      />

      <MultiStepFormRail
        title="Book a Service · 5 steps"
        steps={WIZARD_STEPS}
      />

      <div className={styles.fullLayout}>
        <div className={styles.fullStack}>
          <FormBuilderCanvas
            palette={PALETTE_SECTIONS}
            formTitle="Book a Service"
            hint="Step 1 of 5 · Vehicle"
            fields={BOOK_SERVICE_FIELDS}
            selectedFieldId="f-service-type"
            activeDropIndex={2}
          />

          <SubmissionDetailPanel
            formName="Book a Service · VL Walkinshaw"
            submitter="Mick Stafford"
            submitterEmail="mick.s@oldmate.com.au"
            status="reviewing"
            submittedAt="2026-05-29 09:14:02 AEST"
            workshop="Oak Flats · Bay 2"
            sourceLabel="Embed · mufflermen.com.au/book"
            answers={SUBMISSION_ANSWERS}
            audit={SUBMISSION_AUDIT}
          />

          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>
              Submissions inbox · 18 today
            </span>
            <div className={styles.demoRowList}>
              {INBOX_ENTRIES.map((entry) => (
                <SubmissionInboxRow key={entry.id} entry={entry} />
              ))}
            </div>
          </div>

          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>
              Hermes webhook triggers
            </span>
            <div className={styles.demoRowList}>
              {WEBHOOK_TRIGGERS.map((trigger) => (
                <WebhookTriggerRow key={trigger.id} trigger={trigger} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.fullStack}>
          <FieldConfigPanel draft={FIELD_CONFIG_DRAFT} />

          <AntiSpamShieldCard
            title="Anti-spam shield"
            subtitle="Across Book a Service, Quote, Trade Apply"
            totalBlocked={TOTAL_BLOCKED}
            rules={SPAM_SHIELD_RULES}
          />

          <PaymentFieldCard draft={PAYMENT_FIELD_DRAFT} />

          <FileUploadZone
            title="Drop photos, rego, video"
            hint="HEIC · PDF · JPG · MP4 · 50 MB"
            files={UPLOAD_FILES}
          />

          <AnalyticsFunnelTile
            title="Book a Service funnel"
            stages={FUNNEL_STAGES}
            periodLabel="Last 28 days"
            conversionPct={41}
          />

          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Conditional rules</span>
            <div className={styles.demoRowList}>
              {CONDITIONAL_RULES.map((rule) => (
                <ConditionalLogicCard key={rule.id} rule={rule} />
              ))}
            </div>
          </div>

          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Notifications</span>
            <div className={styles.demoRowList}>
              {NOTIFICATION_RULES.map((rule) => (
                <NotificationRuleRow key={rule.id} rule={rule} />
              ))}
            </div>
          </div>

          <DataExportCard
            title="Export submissions"
            range={EXPORT_RANGE}
            presets={EXPORT_PRESETS}
            selectedPresetId="x-csv"
            totalRows={64}
          />

          <FormPublishCard
            formName="Book a Service"
            shareLink={PUBLISH_SHARE_LINK}
            embedSnippet={PUBLISH_EMBED_SNIPPET}
            targets={PUBLISH_TARGETS}
            activeTargetId="inline-embed"
            published
          />
        </div>
      </div>
    </main>
  )
}
