import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "workflows",
  "title": "Workflows",
  "group": "Operations",
  "summary": "A visual workflow/automation builder: a zoomable canvas, six node types (trigger, action, condition, loop, wait, end), bezier connection lines, palette rail, inspector pane, execution log, run-history table, variable explorer, and editor toolbar — all driven by a shared workflow-types contract.",
  "entries": [
    {
      "key": "workflows/workflow-canvas",
      "family": "workflows",
      "name": "WorkflowCanvas",
      "label": "Workflow canvas",
      "description": "Zoomable grid-backed canvas region that positions workflow nodes in a viewport with a zoom-percentage corner badge.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/canvas",
      "tags": [
        "canvas",
        "automation",
        "builder"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/connection-line",
      "family": "workflows",
      "name": "ConnectionLine",
      "label": "Connection line",
      "description": "SVG bezier edge with a directional arrowhead, tonal styling, and an optional midpoint label chip connecting two canvas points.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/connection-line",
      "tags": [
        "edge",
        "svg",
        "connector"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-trigger",
      "family": "workflows",
      "name": "NodeTrigger",
      "label": "Trigger node",
      "description": "Amber-toned trigger node with a Zap icon, event/source meta, optional live-listening pulse, and a right output port.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/node-trigger",
      "tags": [
        "node",
        "trigger",
        "event"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-action",
      "family": "workflows",
      "name": "NodeAction",
      "label": "Action node",
      "description": "Teal-toned action node with a Settings icon, optional service meta, running indicator, and left/right ports.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/node-action",
      "tags": [
        "node",
        "action",
        "step"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-condition",
      "family": "workflows",
      "name": "NodeCondition",
      "label": "Condition node",
      "description": "Green-toned branching node with an optional code expression and True/False output ports labeled via pills.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/node-condition",
      "tags": [
        "node",
        "condition",
        "branch"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-loop",
      "family": "workflows",
      "name": "NodeLoop",
      "label": "Loop node",
      "description": "Red-toned for-each loop node with an iteration label and left/right/bottom ports including a loop-back edge.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/node-loop",
      "tags": [
        "node",
        "loop",
        "iteration"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-wait",
      "family": "workflows",
      "name": "NodeWait",
      "label": "Wait node",
      "description": "Compact amber delay node with a Clock icon, duration title, optional schedule hint, and left/right ports.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/node-wait",
      "tags": [
        "node",
        "delay",
        "wait"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-end",
      "family": "workflows",
      "name": "NodeEnd",
      "label": "End node",
      "description": "Compact neutral terminal node with a Flag icon, optional outcome accent, and a single left input port.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/node-end",
      "tags": [
        "node",
        "end",
        "terminal"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-palette-rail",
      "family": "workflows",
      "name": "NodePaletteRail",
      "label": "Node palette rail",
      "description": "Searchable sidebar listing draggable node items grouped into sections, each with a kind-colored icon and description.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/palette-rail",
      "tags": [
        "palette",
        "sidebar",
        "drag"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/node-inspector-pane",
      "family": "workflows",
      "name": "NodeInspectorPane",
      "label": "Node inspector pane",
      "description": "Tabbed (Config/Test/Notes) configuration panel for a selected node with a kind chip, expandable advanced fields, and delete/test-run actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/inspector-pane",
      "tags": [
        "inspector",
        "config",
        "panel"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/execution-log",
      "family": "workflows",
      "name": "ExecutionLog",
      "label": "Execution log",
      "description": "Live, auto-animated event log listing run entries with per-status icons, node, message, and duration; respects reduced-motion.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/execution-log",
      "tags": [
        "log",
        "events",
        "monitoring"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/run-history-table",
      "family": "workflows",
      "name": "RunHistoryTable",
      "label": "Run history table",
      "description": "Sortable zebra DataTable of past workflow runs showing start time, trigger, status chip, duration, and a view link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/run-history",
      "tags": [
        "table",
        "history",
        "runs"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/variable-explorer",
      "family": "workflows",
      "name": "VariableExplorer",
      "label": "Variable explorer",
      "description": "Collapsible tree of available workflow variables with type chips, samples, and a copy-to-clipboard token chip per node.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/variable-explorer",
      "tags": [
        "variables",
        "tree",
        "copy"
      ],
      "status": "captured"
    },
    {
      "key": "workflows/workflow-toolbar",
      "family": "workflows",
      "name": "WorkflowToolbar",
      "label": "Workflow toolbar",
      "description": "Editor header with workflow name, a cycling status chip, version/saved meta, undo/redo, and share/test/save actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/workflows",
      "routeHref": "/ui-primitives/workflows/toolbar",
      "tags": [
        "toolbar",
        "editor",
        "controls"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
