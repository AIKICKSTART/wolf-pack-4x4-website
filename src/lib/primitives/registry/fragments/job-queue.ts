import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "job-queue",
  "title": "Job queue",
  "group": "Operations",
  "summary": "14 background-job and worker-fleet primitives — rows, queue-depth and timing charts, worker status/autoscale meters, retry-policy and concurrency controls, failed/dead-letter handling, scheduling, and pipeline visualization — sharing job kind/status/priority/worker tone maps.",
  "entries": [
    {
      "key": "job-queue/job-row",
      "family": "job-queue",
      "name": "JobRow",
      "label": "Job row",
      "description": "Table row for a single job showing id/queue, kind, status, duration, attempt/max chips and view-payload/retry actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/job-row",
      "tags": [
        "job",
        "table-row",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/queue-depth-chart",
      "family": "job-queue",
      "name": "QueueDepthChart",
      "label": "Queue depth chart",
      "description": "Stacked area chart of queue depth over time across high/normal/low priority lanes with a current in-flight headline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/queue-depth-chart",
      "tags": [
        "chart",
        "queue",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/worker-status-grid",
      "family": "job-queue",
      "name": "WorkerStatusGrid",
      "label": "Worker status grid",
      "description": "Grid of worker cards showing state, uptime, current job kind and a segmented concurrency progress bar, with a busy/total summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/worker-status-grid",
      "tags": [
        "worker",
        "fleet",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/retry-policy-editor",
      "family": "job-queue",
      "name": "RetryPolicyEditor",
      "label": "Retry policy editor",
      "description": "Stateful form to edit max attempts, backoff strategy, base/max delay and on-final-error action for a queue's retry policy.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/retry-policy-editor",
      "tags": [
        "retry",
        "policy",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/failed-jobs-panel",
      "family": "job-queue",
      "name": "FailedJobsPanel",
      "label": "Failed jobs panel",
      "description": "Data table of recent failures with expandable rows revealing the error message and full stack trace, plus per-row retry/discard actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/failed-jobs-panel",
      "tags": [
        "failure",
        "table",
        "stack-trace"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/job-retry-button",
      "family": "job-queue",
      "name": "JobRetryButton",
      "label": "Job retry button",
      "description": "Retry button that opens a confirm dialog and an optional step picker to re-enqueue a job from the start or a chosen pipeline step.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/job-retry-button",
      "tags": [
        "retry",
        "button",
        "confirm"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/concurrency-limits-card",
      "family": "job-queue",
      "name": "ConcurrencyLimitsCard",
      "label": "Concurrency limits card",
      "description": "Per-queue concurrency caps with used/cap progress bars and range sliders to adjust each queue's in-flight limit.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/concurrency-limits-card",
      "tags": [
        "concurrency",
        "limits",
        "slider"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/job-timing-distribution",
      "family": "job-queue",
      "name": "JobTimingDistribution",
      "label": "Job timing distribution",
      "description": "Histogram of job durations with a percentile row (p50/p95/etc.) and a list of outlier job chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/job-timing-distribution",
      "tags": [
        "timing",
        "histogram",
        "percentiles"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/dead-letter-queue-card",
      "family": "job-queue",
      "name": "DeadLetterQueueCard",
      "label": "Dead letter queue card",
      "description": "Dead-letter summary with stranded count, oldest age, a sample inspect list, and a confirm-guarded replay-all action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/dead-letter-queue-card",
      "tags": [
        "dead-letter",
        "replay",
        "failure"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/job-kind-filter",
      "family": "job-queue",
      "name": "JobKindFilter",
      "label": "Job kind filter",
      "description": "Multi-select chip row to filter by job kind, showing per-kind counts and a running selected-count/total summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/job-kind-filter",
      "tags": [
        "filter",
        "chips",
        "multi-select"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/priority-queue-indicator",
      "family": "job-queue",
      "name": "PriorityQueueIndicator",
      "label": "Priority queue indicator",
      "description": "Compact backlog readout per high/normal/low priority lane with a total-pending headline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/priority-queue-indicator",
      "tags": [
        "priority",
        "backlog",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/scheduled-jobs-upcoming",
      "family": "job-queue",
      "name": "ScheduledJobsUpcoming",
      "label": "Scheduled jobs upcoming",
      "description": "Activity-feed list of upcoming scheduled jobs with countdown labels and per-row edit/cancel actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/scheduled-jobs-upcoming",
      "tags": [
        "scheduled",
        "upcoming",
        "feed"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/worker-autoscale-meter",
      "family": "job-queue",
      "name": "WorkerAutoscaleMeter",
      "label": "Worker autoscale meter",
      "description": "Radial meter of current vs ceiling pod count with scale-out/scale-in cooldowns and a scaling-out/in/steady verb.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/worker-autoscale-meter",
      "tags": [
        "autoscale",
        "meter",
        "pods"
      ],
      "status": "captured"
    },
    {
      "key": "job-queue/task-pipeline-visualization",
      "family": "job-queue",
      "name": "TaskPipelineVisualization",
      "label": "Task pipeline visualization",
      "description": "Workflow-canvas pipeline showing ordered steps with index, status chip, duration and connectors, highlighting the running step.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/job-queue",
      "routeHref": "/ui-primitives/job-queue/task-pipeline-visualization",
      "tags": [
        "pipeline",
        "workflow",
        "data-viz"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
