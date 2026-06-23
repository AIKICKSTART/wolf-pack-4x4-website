import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "workflow-engine",
  "title": "Workflow engine",
  "group": "System",
  "summary": "14 deterministic-automation primitives — a pannable/zoomable builder canvas, step/trigger/condition/delay/fan-out/retry/error/variable config cards, run-history rows, a gantt-style run-trace viewer, a manual-approval card, an audit-trail rail, and a template library grid — all sharing one EngineStep/EngineStatus/EngineTone vocabulary.",
  "entries": [
    {
      "key": "workflow-engine/workflow-builder-canvas",
      "family": "workflow-engine",
      "name": "WorkflowBuilderCanvas",
      "label": "Workflow builder canvas",
      "description": "Pannable, zoomable node-graph canvas that renders EngineStep nodes and bezier EngineEdge connectors with a dot-grid, zoom controls, and a live minimap.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/workflow-builder-canvas",
      "tags": [
        "canvas",
        "node-graph",
        "builder",
        "minimap"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/step-node-card",
      "family": "workflow-engine",
      "name": "StepNodeCard",
      "label": "Step node card",
      "description": "Inspector panel for one workflow step showing kind glyph, title/subtitle, status chip, optional metric chips, and labelled input/output ports.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/step-node-card",
      "tags": [
        "step",
        "inspector",
        "ports",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/trigger-config-card",
      "family": "workflow-engine",
      "name": "TriggerConfigCard",
      "label": "Trigger config card",
      "description": "Surfaces a workflow trigger (webhook/cron/event/manual) with its config string, last-fired/invocation meta, armed status, and a sample JSON payload via CodeBlock.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/trigger-config-card",
      "tags": [
        "trigger",
        "webhook",
        "cron",
        "config"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/run-history-row",
      "family": "workflow-engine",
      "name": "RunHistoryRow",
      "label": "Run history row",
      "description": "Tile-shaped row for a single workflow run showing trigger, started timestamp, a step-progress strip, status pill, tabular duration, and a trace link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/run-history-row",
      "tags": [
        "run",
        "history",
        "progress",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/manual-approval-card",
      "family": "workflow-engine",
      "name": "ManualApprovalCard",
      "label": "Manual approval card",
      "description": "Pauses a workflow for a named approver — shows requestor, reason, dollar amount, expiry urgency chip, and a comment field with local approve/reject decision state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/manual-approval-card",
      "tags": [
        "approval",
        "gate",
        "human-in-loop",
        "decision"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/retry-policy-block",
      "family": "workflow-engine",
      "name": "RetryPolicyBlock",
      "label": "Retry policy block",
      "description": "Read-only retry-policy editor showing max attempts, base delay, backoff strategy, jitter toggle, and a bar-chart preview of projected per-attempt delays.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/retry-policy-block",
      "tags": [
        "retry",
        "backoff",
        "policy",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/fan-out-card",
      "family": "workflow-engine",
      "name": "FanOutCard",
      "label": "Fan-out card",
      "description": "Parallel fan-out visualisation listing lanes with per-lane status and runtime bars, plus join strategy, lane count, concurrency cap, and total-runtime chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/fan-out-card",
      "tags": [
        "parallel",
        "fan-out",
        "lanes",
        "concurrency"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/error-handler-card",
      "family": "workflow-engine",
      "name": "ErrorHandlerCard",
      "label": "Error handler card",
      "description": "Shows an error handler attached to a step — its match pattern, severity, and an ordered chain of catch/compensate/alert/retry actions with optional 7-day hit counts.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/error-handler-card",
      "tags": [
        "error",
        "handler",
        "compensate",
        "alert"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/variable-pass-row",
      "family": "workflow-engine",
      "name": "VariablePassRow",
      "label": "Variable pass row",
      "description": "Single data-mapping row showing a source path and kind, variable type chip, target path, and optional required/sample annotations for the workflow data plane.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/variable-pass-row",
      "tags": [
        "variable",
        "mapping",
        "data-plane",
        "type"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/condition-branch-card",
      "family": "workflow-engine",
      "name": "ConditionBranchCard",
      "label": "Condition branch card",
      "description": "Visualises an if/else gate with an editable expression textarea and YES/NO branch tiles showing downstream step labels and optional hit-rate percentages.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/condition-branch-card",
      "tags": [
        "condition",
        "branch",
        "if-else",
        "expression"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/delay-step-card",
      "family": "workflow-engine",
      "name": "DelayStepCard",
      "label": "Delay step card",
      "description": "Pauses a workflow for a configured duration — shows the pause window, optional resume-at label, timezone, and skip-weekends/skip-holidays toggles.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/delay-step-card",
      "tags": [
        "delay",
        "wait",
        "timezone",
        "schedule"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/run-trace-viewer",
      "family": "workflow-engine",
      "name": "RunTraceViewer",
      "label": "Run trace viewer",
      "description": "Gantt-style run trace with a time scale and expandable spans showing per-step status, offset/duration timeline bars, and level-toned inline messages.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/run-trace-viewer",
      "tags": [
        "trace",
        "gantt",
        "timeline",
        "observability"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/audit-trail-rail",
      "family": "workflow-engine",
      "name": "AuditTrailRail",
      "label": "Audit trail rail",
      "description": "Vertical timeline rail of audit entries (created/edited/published/disabled/approved/reverted) with actor, role, timestamp, version tag, and event-toned bullets.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/audit-trail-rail",
      "tags": [
        "audit",
        "timeline",
        "history",
        "governance"
      ],
      "status": "captured"
    },
    {
      "key": "workflow-engine/template-library-grid",
      "family": "workflow-engine",
      "name": "TemplateLibraryGrid",
      "label": "Template library grid",
      "description": "Grid of workflow-template tiles, each with category, icon, summary, step count, install count, tone accent, and an optional recommended badge.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/workflow-engine",
      "routeHref": "/ui-primitives/workflow-engine/template-library-grid",
      "tags": [
        "templates",
        "library",
        "grid",
        "gallery"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
