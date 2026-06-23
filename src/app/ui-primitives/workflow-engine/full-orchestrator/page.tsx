import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AuditTrailRail,
  ConditionBranchCard,
  DelayStepCard,
  ErrorHandlerCard,
  FanOutCard,
  ManualApprovalCard,
  RetryPolicyBlock,
  RunHistoryRow,
  RunTraceViewer,
  StepNodeCard,
  TemplateLibraryGrid,
  TriggerConfigCard,
  VariablePassRow,
  WorkflowBuilderCanvas,
} from "../../components/workflow-engine"

import {
  QUOTE_AUDIT_ENTRIES,
  QUOTE_FOLLOWUP_EDGES,
  QUOTE_FOLLOWUP_STEPS,
  QUOTE_RUN_HISTORY,
  QUOTE_TRIGGER_PAYLOAD,
  REFUND_APPROVAL,
  REFUND_TRACE_SPANS,
  REFUND_VAR_ROWS,
  SMS_ERROR_ACTIONS,
  WELCOME_FAN_OUT_LANES,
  WORKSHOP_TEMPLATES,
} from "../_mock-data"
import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Full workflow orchestrator | Workflow engine",
  description:
    "Composed workflow engine — trigger + canvas + step + history + approval + retry + fan-out + error + audit + templates wired together for the quote follow-up + refund + welcome scenarios.",
}

export default function FullOrchestratorScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Orchestrator"
        title="Full workflow orchestrator"
        description="Every workflow engine primitive wired together. Trigger fires, the canvas shows the flow, the run history sits alongside, the manager-approval gate halts the refund workflow, the retry policy editor shapes Twilio's fallback, fan-out runs the welcome series, errors get caught, variables flow, audit trail tracks every move and the template library waits to spawn the next workflow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Full orchestrator" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real workflows invoked
      </span>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Header strip · trigger + inspected step + delay anchor
        </span>
        <div className={styles.headerStrip}>
          <TriggerConfigCard
            title="Shopify · quote.created"
            kind="webhook"
            config="POST /hooks/shopify/quote-created"
            lastFiredLabel="09:14 AEST"
            invocations7d={1_246}
            samplePayload={QUOTE_TRIGGER_PAYLOAD}
            armed
          />
          <StepNodeCard
            kicker="Quote follow-up · v3.2"
            kind="action"
            title="Send follow-up SMS"
            subtitle="Twilio · sms.send · template:tpl-nudge-3d"
            status="running"
            metrics={[
              { label: "Last", value: "1.4s" },
              { label: "p95", value: "2.8s" },
              { label: "Vol", value: "184/d" },
            ]}
            inputs={["customer", "vehicle", "quote"]}
            outputs={["smsId", "ok"]}
          />
          <DelayStepCard
            kicker="Quote follow-up"
            title="Wait 3 business days"
            durationMs={3 * 24 * 60 * 60 * 1000}
            resumeAtLabel="Mon 09:00"
            timezone="Australia/Sydney"
            skipWeekends
            skipHolidays
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Canvas · quote follow-up · SMS step mid-fire
        </span>
        <WorkflowBuilderCanvas
          steps={QUOTE_FOLLOWUP_STEPS}
          edges={QUOTE_FOLLOWUP_EDGES}
          selectedStepId="s4"
          ariaLabel="Composed quote follow-up canvas"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Run history · last six runs alongside live inspector
        </span>
        <div className={styles.builderTop}>
          <div className={styles.demoStack}>
            {QUOTE_RUN_HISTORY.slice(0, 4).map((run) => (
              <RunHistoryRow
                key={run.runId}
                runId={run.runId}
                startedAt={run.startedAt}
                triggerKind={run.triggerKind}
                triggerLabel={run.triggerLabel}
                status={run.status}
                durationMs={run.durationMs}
                stepsCompleted={run.stepsCompleted}
                stepsTotal={run.stepsTotal}
                finalStepLabel={run.finalStepLabel}
              />
            ))}
          </div>
          <ConditionBranchCard
            kicker="Quote follow-up · v3.2"
            title="Customer responded to quote?"
            defaultExpression="quote.lastReplyAt > quote.sentAt"
            yesLabel="Mark already engaged"
            yesService="CRM · note.append"
            noLabel="Send follow-up SMS"
            noService="Twilio · sms.send"
            hitRateYes={0.41}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Approval + retry + fan-out · resilience grid
        </span>
        <div className={styles.builderMid}>
          <ManualApprovalCard
            kicker={REFUND_APPROVAL.kicker}
            title={REFUND_APPROVAL.title}
            approverName={REFUND_APPROVAL.approverName}
            approverRole={REFUND_APPROVAL.approverRole}
            approverInitials={REFUND_APPROVAL.approverInitials}
            reason={REFUND_APPROVAL.reason}
            amount={REFUND_APPROVAL.amount}
            requestedAtLabel={REFUND_APPROVAL.requestedAtLabel}
            expiresInMs={REFUND_APPROVAL.expiresInMs}
          />
          <RetryPolicyBlock
            kicker="Twilio SMS · sms.send"
            title="Aggressive backoff"
            maxAttempts={5}
            baseDelayMs={30_000}
            backoff="exponential"
            jitterEnabled
          />
          <FanOutCard
            kicker="Customer welcome · v2"
            title="Triple-tap welcome"
            join="all"
            lanes={WELCOME_FAN_OUT_LANES}
            concurrencyCap={4}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Errors + variables · the data + failure plane
        </span>
        <div className={styles.builderBottom}>
          <ErrorHandlerCard
            kicker="Error · twilio.sms.send"
            title="Carrier flake fallback"
            attachedTo="step:s4 · send-followup-sms"
            matchPattern="TwilioError · 4xx or 5xx"
            severity="red"
            actions={SMS_ERROR_ACTIONS}
          />
          <div className={styles.demoStack}>
            {REFUND_VAR_ROWS.slice(0, 4).map((row, idx) => (
              <VariablePassRow
                key={`${row.source}-${idx}`}
                source={row.source}
                sourceKind={row.sourceKind}
                type={row.type}
                target={row.target}
                sample={row.sample}
                required={row.required}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Run trace + audit trail · forensic + compliance pane
        </span>
        <div className={styles.builderBottom}>
          <RunTraceViewer
            runId="RUN-RF-1138"
            kicker="Refund flow"
            title="Refund > $200 · run trace"
            totalDurationMs={23_750}
            spans={REFUND_TRACE_SPANS}
          />
          <AuditTrailRail
            kicker="Quote follow-up · v3.x"
            title="Audit trail"
            entries={QUOTE_AUDIT_ENTRIES.slice(0, 4)}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Template library · where new workflows are born
        </span>
        <TemplateLibraryGrid templates={WORKSHOP_TEMPLATES} />
      </section>
    </main>
  )
}
