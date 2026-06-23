import type { Metadata } from "next"

import {
  ConnectionLine,
  ExecutionLog,
  NodeAction,
  NodeCondition,
  NodeEnd,
  NodeInspectorPane,
  NodePaletteRail,
  NodeTrigger,
  NodeWait,
  RunHistoryTable,
  VariableExplorer,
  WorkflowCanvas,
  WorkflowToolbar,
  type InspectorField,
  type WorkflowLogEntry,
  type WorkflowPaletteSection,
  type WorkflowRun,
  type WorkflowVariable,
} from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Full workflow builder | Workflows",
  description:
    "Composition — full visual workflow builder for the Mufflermen 'new booking → confirm + remind' workflow.",
}

const PALETTE: ReadonlyArray<WorkflowPaletteSection> = [
  {
    id: "triggers",
    title: "Triggers",
    items: [
      { id: "webhook", name: "Webhook", kind: "trigger", description: "POST · custom URL" },
      { id: "schedule", name: "Schedule", kind: "trigger", description: "Cron expression" },
    ],
  },
  {
    id: "actions",
    title: "Actions",
    items: [
      { id: "sms", name: "Send SMS", kind: "action", description: "Twilio · sms.send" },
      { id: "email", name: "Send email", kind: "action", description: "Postmark · transactional" },
      { id: "slack", name: "Slack message", kind: "action", description: "#floor channel" },
    ],
  },
  {
    id: "logic",
    title: "Logic",
    items: [
      { id: "if", name: "If / else", kind: "condition", description: "Branch on expression" },
      { id: "loop", name: "For each", kind: "loop", description: "Iterate a collection" },
    ],
  },
  {
    id: "time",
    title: "Time",
    items: [
      { id: "delay", name: "Wait", kind: "wait", description: "Pause for duration" },
    ],
  },
  {
    id: "output",
    title: "Output",
    items: [
      { id: "end", name: "End", kind: "end", description: "Close branch" },
    ],
  },
]

const INSPECTOR_CONFIG: ReadonlyArray<InspectorField> = [
  { id: "label", label: "Label", value: "Send confirmation SMS" },
  { id: "service", label: "Service", value: "Twilio · sms.send" },
  { id: "to", label: "Recipient", value: "{{trigger.customer.phone}}", code: true },
  {
    id: "body",
    label: "Body template",
    value:
      "Hi {{customer.first_name}}, your {{vehicle.platform}} booking is confirmed for {{booking.start_at}}.",
  },
]

const INSPECTOR_ADVANCED: ReadonlyArray<InspectorField> = [
  { id: "retry", label: "Retry policy", value: "3 attempts · exponential backoff" },
  { id: "timeout", label: "Timeout", value: "10 seconds" },
]

const LOG: ReadonlyArray<WorkflowLogEntry> = [
  {
    id: "le-005",
    timestamp: "09:42:08",
    node: "Send confirmation SMS",
    status: "running",
    message: "Connecting to Twilio…",
  },
  {
    id: "le-004",
    timestamp: "09:42:05",
    node: "Condition · Hilux platform?",
    status: "success",
    message: "Matched · branch True",
    duration: "11ms",
  },
  {
    id: "le-003",
    timestamp: "09:42:05",
    node: "Fetch booking",
    status: "success",
    message: "200 OK · booking_id=bk_4128",
    duration: "184ms",
  },
  {
    id: "le-002",
    timestamp: "09:42:04",
    node: "Trigger · New booking",
    status: "success",
    message: "Webhook payload received",
    duration: "3ms",
  },
  {
    id: "le-001",
    timestamp: "09:30:00",
    node: "Wait 2 hours",
    status: "queued",
    message: "Will resume at 11:30",
  },
]

const RUNS: ReadonlyArray<WorkflowRun> = [
  {
    id: "run_h31n",
    startedAt: "2026-05-28 09:42:04",
    trigger: "New booking · Webhook",
    status: "running",
    duration: "—",
  },
  {
    id: "run_h2zb",
    startedAt: "2026-05-28 09:18:30",
    trigger: "New booking · Webhook",
    status: "success",
    duration: "2.4s",
  },
  {
    id: "run_h2yk",
    startedAt: "2026-05-28 08:01:00",
    trigger: "Daily 8am · Cron",
    status: "success",
    duration: "12.8s",
  },
  {
    id: "run_h2vp",
    startedAt: "2026-05-27 14:33:18",
    trigger: "New booking · Webhook",
    status: "failed",
    duration: "4.1s",
  },
]

const VARIABLES: ReadonlyArray<WorkflowVariable> = [
  {
    path: "trigger",
    label: "trigger",
    type: "object",
    sample: "Webhook payload",
    children: [
      {
        path: "trigger.customer",
        label: "customer",
        type: "object",
        children: [
          {
            path: "trigger.customer.first_name",
            label: "first_name",
            type: "string",
            sample: "Daniel",
          },
          {
            path: "trigger.customer.phone",
            label: "phone",
            type: "string",
            sample: "+61 4xx xxx xxx",
          },
        ],
      },
      {
        path: "trigger.booking",
        label: "booking",
        type: "object",
        children: [
          {
            path: "trigger.booking.vehicle.platform",
            label: "vehicle.platform",
            type: "string",
            sample: "Hilux",
          },
          {
            path: "trigger.booking.start_at",
            label: "start_at",
            type: "date",
            sample: "2026-06-02T08:30:00",
          },
        ],
      },
    ],
  },
]

export default function FullBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full workflow builder"
        title="Full workflow builder scene"
        description="The complete visual builder for the Mufflermen 'new booking → check Hilux platform → confirmation SMS / fitment reminder → wait 2 hours → end' workflow. Composes WorkflowToolbar + NodePaletteRail + WorkflowCanvas with 7 connected nodes + NodeInspectorPane right + ExecutionLog + RunHistoryTable bottom."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Full builder" },
        ]}
      />

      <WorkflowToolbar
        name="New booking · confirm + remind"
        initialStatus="active"
        version="v7"
        savedMeta="Saved · 2 minutes ago"
        canUndo
        canRedo={false}
      />

      <div className={styles.builderLayout}>
        <NodePaletteRail sections={PALETTE} />
        <div className={styles.builderMain}>
          <div className={styles.canvasStage}>
            <WorkflowCanvas
              ariaLabel="New booking workflow canvas"
              height={520}
              zoomLabel="100%"
            >
              <NodeTrigger
                name="New booking"
                source="Webhook · POST /bookings"
                x={12}
                y={34}
                live
              />
              <NodeCondition
                name="Hilux platform?"
                expression="booking.vehicle.platform === 'Hilux'"
                x={36}
                y={34}
              />
              <NodeAction
                name="Send confirmation SMS"
                service="Twilio · sms.send"
                x={60}
                y={18}
                running
              />
              <NodeAction
                name="Send fitment reminder"
                service="Postmark · transactional"
                x={60}
                y={56}
              />
              <NodeWait
                duration="Wait 2 hours"
                schedule="Mon–Fri 9–17"
                x={82}
                y={18}
              />
              <NodeEnd outcome="Customer notified" x={82} y={56} />
              <NodeEnd label="Done" outcome="Reminder scheduled" x={94} y={18} />

              <ConnectionLine
                from={{ x: 175, y: 205 }}
                to={{ x: 320, y: 205 }}
                tone="amber"
                label="On booking"
              />
              <ConnectionLine
                from={{ x: 440, y: 165 }}
                to={{ x: 540, y: 110 }}
                tone="green"
                label="True"
              />
              <ConnectionLine
                from={{ x: 440, y: 245 }}
                to={{ x: 540, y: 340 }}
                tone="red"
                label="False"
              />
              <ConnectionLine
                from={{ x: 660, y: 110 }}
                to={{ x: 780, y: 110 }}
                tone="teal"
                label="Confirmed"
              />
              <ConnectionLine
                from={{ x: 660, y: 340 }}
                to={{ x: 780, y: 340 }}
                tone="teal"
                label="Reminder sent"
              />
              <ConnectionLine
                from={{ x: 900, y: 110 }}
                to={{ x: 940, y: 110 }}
                tone="neutral"
              />
            </WorkflowCanvas>
          </div>

          <ExecutionLog entries={LOG} summary={`${LOG.length} events`} />
          <RunHistoryTable runs={RUNS} kicker="Recent runs" />
        </div>
        <div className={styles.builderMain}>
          <NodeInspectorPane
            kind="action"
            name="Send confirmation SMS"
            subtitle="Twilio · sms.send · v3"
            configFields={INSPECTOR_CONFIG}
            advancedFields={INSPECTOR_ADVANCED}
          />
          <VariableExplorer
            variables={VARIABLES}
            kicker="Available at this step"
          />
        </div>
      </div>
    </main>
  )
}
