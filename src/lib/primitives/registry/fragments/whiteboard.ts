import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "whiteboard",
  "title": "Whiteboard",
  "group": "Content",
  "summary": "14 collaborative-whiteboard primitives — an infinite dotted canvas, a vertical tool palette, sticky notes, shape/connector/arrow/frame tools, a pen-stroke layer, a text box, a colour picker, selection box, cursor presence, vote dots, and mind-map nodes — for building Figma/Miro-style board surfaces.",
  "entries": [
    {
      "key": "whiteboard/whiteboard-canvas",
      "family": "whiteboard",
      "name": "WhiteboardCanvas",
      "label": "Whiteboard canvas",
      "description": "Infinite dotted-grid canvas stage with a board-name chip plus zoom/position chrome and a content surface slot.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/whiteboard-canvas",
      "tags": [
        "canvas",
        "stage",
        "grid",
        "collaboration"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/drawing-tool-palette",
      "family": "whiteboard",
      "name": "DrawingToolPalette",
      "label": "Drawing tool palette",
      "description": "Vertical toolbar of 8 selectable drawing tools (hand, pen, highlighter, eraser, shape, sticky, text, connector) with active state and keyboard hints.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/drawing-tool-palette",
      "tags": [
        "toolbar",
        "tools",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/wb-sticky-note",
      "family": "whiteboard",
      "name": "WbStickyNote",
      "label": "Sticky note",
      "description": "Tilted paper sticky note with body text, author chip, optional net-vote count and timestamp across six paper tones.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/wb-sticky-note",
      "tags": [
        "sticky",
        "note",
        "annotation"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/shape-tool-card",
      "family": "whiteboard",
      "name": "ShapeToolCard",
      "label": "Shape tool card",
      "description": "Shape picker panel with six SVG shape glyphs plus size chips and fill/stroke swatch rows.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/shape-tool-card",
      "tags": [
        "shapes",
        "picker",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/connector-line-tool",
      "family": "whiteboard",
      "name": "ConnectorLineTool",
      "label": "Connector line",
      "description": "SVG connector between two canvas points in straight/orthogonal/curved shapes with selectable arrow/dot/diamond caps and an optional mid-line label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/connector-line-tool",
      "tags": [
        "connector",
        "line",
        "svg",
        "diagram"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/hand-drawn-arrow",
      "family": "whiteboard",
      "name": "HandDrawnArrow",
      "label": "Hand-drawn arrow",
      "description": "Freehand SVG arrow in loose/scratchy/marker wobble styles across five tone colours.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/hand-drawn-arrow",
      "tags": [
        "arrow",
        "sketch",
        "svg",
        "annotation"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/frame-outline",
      "family": "whiteboard",
      "name": "FrameOutline",
      "label": "Frame outline",
      "description": "Titled bounding frame with an id badge and dimension label that wraps child board content in five tones.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/frame-outline",
      "tags": [
        "frame",
        "container",
        "layout"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/wb-color-swatch-picker",
      "family": "whiteboard",
      "name": "WbColorSwatchPicker",
      "label": "Colour swatch picker",
      "description": "Tool-colour picker with a swatch grid, optional recent-colours strip, live preview and a validated hex input.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/wb-color-swatch-picker",
      "tags": [
        "color",
        "picker",
        "swatches",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/cursor-presence-marker",
      "family": "whiteboard",
      "name": "CursorPresenceMarker",
      "label": "Cursor presence marker",
      "description": "Live-collaborator cursor pointer with a name chip in six tones and active/idle states.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/cursor-presence-marker",
      "tags": [
        "presence",
        "cursor",
        "collaboration"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/wb-selection-box",
      "family": "whiteboard",
      "name": "WbSelectionBox",
      "label": "Selection box",
      "description": "Selection overlay with eight resize handles, a rotation stem/label and an optional grouped-objects count chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/wb-selection-box",
      "tags": [
        "selection",
        "transform",
        "handles"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/pen-stroke-layer",
      "family": "whiteboard",
      "name": "PenStrokeLayer",
      "label": "Pen stroke layer",
      "description": "SVG freehand pen stroke from a point array, rendering a smoothed bezier path or a pressure-varying filled polygon.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/pen-stroke-layer",
      "tags": [
        "pen",
        "ink",
        "freehand",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/text-box-tool",
      "family": "whiteboard",
      "name": "TextBoxTool",
      "label": "Text box tool",
      "description": "Auto-growing canvas text box with a floating toolbar for font family, size, bold/italic and text colour.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/text-box-tool",
      "tags": [
        "text",
        "editor",
        "typography",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/vote-dot",
      "family": "whiteboard",
      "name": "VoteDot",
      "label": "Vote dot",
      "description": "Round vote-count badge in three sizes and several tones with an optional pulse halo for new votes.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/vote-dot",
      "tags": [
        "vote",
        "dot",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "whiteboard/mind-map-node",
      "family": "whiteboard",
      "name": "MindMapNode",
      "label": "Mind-map node",
      "description": "Collapsible mind-map tree node with depth-driven tone, a child-count chip and an expand/collapse toggle.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/whiteboard",
      "routeHref": "/ui-primitives/whiteboard/mind-map-node",
      "tags": [
        "mindmap",
        "tree",
        "node"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
