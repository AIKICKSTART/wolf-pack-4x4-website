import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "photo-editor",
  "title": "Photo editor",
  "group": "Media",
  "summary": "14 photo-editing surfaces — canvas stage, tool palette, layers, crop, brush, levels/curves, filter presets, text, selection, history, export, before/after, swatches, and mask thumbnails — sharing a typed photo-editor state contract.",
  "entries": [
    {
      "key": "photo-editor/image-canvas",
      "family": "photo-editor",
      "name": "ImageCanvas",
      "label": "Image canvas",
      "description": "Zoomable/pannable canvas stage with cursor-mode chip, coordinate readout, pan track, and slot for overlay children.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/image-canvas",
      "tags": [
        "canvas",
        "zoom",
        "stage"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/tool-palette",
      "family": "photo-editor",
      "name": "ToolPalette",
      "label": "Tool palette",
      "description": "Vertical tool toolbar of the 8 canonical editor tools with glyphs, keyboard shortcuts, and a foreground/background colour slot.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/tool-palette",
      "tags": [
        "toolbar",
        "tools",
        "shortcuts"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/layers-panel",
      "family": "photo-editor",
      "name": "LayersPanel",
      "label": "Layers panel",
      "description": "Layer list with kind tints, visibility/lock/mask toggles, depth indentation, and a blend-mode + opacity bar for the selected layer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/layers-panel",
      "tags": [
        "layers",
        "blend",
        "opacity"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/crop-overlay",
      "family": "photo-editor",
      "name": "CropOverlay",
      "label": "Crop overlay",
      "description": "Crop tool with aspect-ratio preset radio group and a handle-decorated crop rectangle showing live pixel dimensions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/crop-overlay",
      "tags": [
        "crop",
        "aspect-ratio",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/brush-settings",
      "family": "photo-editor",
      "name": "BrushSettings",
      "label": "Brush settings",
      "description": "Brush configuration panel with live tip preview, size/hardness/flow sliders, a pressure-response sparkline, and colour swatches.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/brush-settings",
      "tags": [
        "brush",
        "sliders",
        "color"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/levels-curves-editor",
      "family": "photo-editor",
      "name": "LevelsCurvesEditor",
      "label": "Levels / curves editor",
      "description": "Histogram-backed tonal editor with Levels/Curves tabs, an SVG curve path with anchors, black/mid/white markers, and point sliders.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/levels-curves",
      "tags": [
        "histogram",
        "curves",
        "tonal"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/filter-presets-grid",
      "family": "photo-editor",
      "name": "FilterPresetsGrid",
      "label": "Filter presets grid",
      "description": "Grid of CSS-filter preview thumbnails as a radio group, with an active-preset chip and a strength slider.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/filter-presets",
      "tags": [
        "filters",
        "presets",
        "grid"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/text-tool-overlay",
      "family": "photo-editor",
      "name": "TextToolOverlay",
      "label": "Text tool overlay",
      "description": "Text-overlay editor showing a live styled text preview plus font, size, weight radio group, and fill-colour controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/text-tool",
      "tags": [
        "text",
        "typography",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/selection-marquee",
      "family": "photo-editor",
      "name": "SelectionMarquee",
      "label": "Selection marquee",
      "description": "Marching-ants selection rectangle positioned over a surface proxy, with boolean-mode (new/add/subtract/intersect) radio controls and corner handles.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/selection-marquee",
      "tags": [
        "selection",
        "marquee",
        "boolean"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/history-panel",
      "family": "photo-editor",
      "name": "HistoryPanel",
      "label": "History panel",
      "description": "Edit-history step list with action chips, current-step highlight, dimmed future steps, jump-back affordance, and timestamps.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/history-panel",
      "tags": [
        "history",
        "undo",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/export-options-card",
      "family": "photo-editor",
      "name": "ExportOptionsCard",
      "label": "Export options card",
      "description": "Export settings card with JPG/PNG/WebP format picker, quality and long-edge sliders with presets, estimated filesize, and an export CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/export-options",
      "tags": [
        "export",
        "format",
        "quality"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/before-after-slider",
      "family": "photo-editor",
      "name": "BeforeAfterSlider",
      "label": "Before / after slider",
      "description": "Split before/after comparison stage with a draggable divider slider and a labelled split-position range readout.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/before-after",
      "tags": [
        "compare",
        "before-after",
        "slider"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/color-swatch-library",
      "family": "photo-editor",
      "name": "ColorSwatchLibrary",
      "label": "Colour swatch library",
      "description": "Saved-swatch grid plus an extracted-palette weighted bar from the active document, with add/extract/export actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/color-swatches",
      "tags": [
        "swatches",
        "palette",
        "color"
      ],
      "status": "captured"
    },
    {
      "key": "photo-editor/mask-thumbnail-row",
      "family": "photo-editor",
      "name": "MaskThumbnailRow",
      "label": "Mask thumbnail row",
      "description": "Row of per-layer mask thumbnails with deterministic gradient density, region/density chips, and an inverted-mask tag.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/photo-editor",
      "routeHref": "/ui-primitives/photo-editor/mask-thumbnails",
      "tags": [
        "masks",
        "thumbnails",
        "layers"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
