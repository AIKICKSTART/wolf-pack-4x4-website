/**
 * Surfaces family — component documentation manifest (docs-1).
 *
 * Read-only docs for the three surface primitives that establish the system's
 * depth language: glassmorphism, neumorphism, and material elevation. All three
 * are pure presentational wrappers (`children: ReactNode`) — they are containers
 * that accept any block tree. Token-driven only.
 *
 * Source of truth: src/app/ui-primitives/components/surfaces/*.tsx (read-only).
 */

import { DEFAULT_ACCESSIBILITY_RULES } from "../model"
import type { ComponentDocFamily } from "./types"

const BARREL = "@/app/ui-primitives/components/surfaces"

const surfacesDocs: ComponentDocFamily = {
  family: "surfaces",
  title: "Surfaces",
  group: "Foundations",
  summary:
    "Three depth-language container primitives — frosted glass, soft neumorphism, and material elevation — each a token-driven wrapper around arbitrary children.",
  barrelPath: BARREL,
  entries: [
    {
      manifest: {
        type: "surfaces/glass-surface",
        name: "Glass Surface",
        category: "Foundations",
        kind: "primitive",
        version: "1.0.0",
        summary:
          "Frosted-glass container with a backdrop blur, a tone tint, and three blur intensities.",
        componentPath: BARREL,
        importName: "GlassSurface",
        propsSchema: {
          fields: [
            {
              key: "tone",
              type: "enum",
              required: false,
              options: ["chrome", "obsidian", "amber"],
              description: "Glass tint. Defaults to \"obsidian\".",
            },
            {
              key: "intensity",
              type: "enum",
              required: false,
              options: ["low", "med", "high"],
              description: "Backdrop blur strength. Defaults to \"med\".",
            },
            {
              key: "className",
              type: "string",
              required: false,
              description: "Extra class merged onto the surface element.",
            },
            {
              key: "children",
              type: "json",
              required: true,
              description: "Content rendered inside the glass surface.",
            },
          ],
        },
        defaultProps: { tone: "obsidian", intensity: "med" },
        editableFields: [
          {
            path: "tone",
            label: "Tone",
            control: "select",
            valueType: "enum",
            options: ["chrome", "obsidian", "amber"],
            hint: "Glass tint colour.",
          },
          {
            path: "intensity",
            label: "Blur intensity",
            control: "select",
            valueType: "enum",
            options: ["low", "med", "high"],
          },
        ],
        tokenDependencies: [
          { token: "--primitive-glass-soft", category: "color", usage: "low-intensity glass fill" },
          { token: "--primitive-glass-strong", category: "color", usage: "high-intensity glass fill" },
          { token: "--primitive-line", category: "color", usage: "hairline edge" },
          { token: "--primitive-amber", category: "color", usage: "amber tone tint" },
          { token: "--primitive-radius-lg", category: "radius", usage: "surface corner radius" },
          { token: "--primitive-shadow-soft", category: "shadow", usage: "ambient lift" },
        ],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [{ kind: "primitive" }, { kind: "component" }],
        responsiveRules: [
          { breakpoint: "xs", span: 12 },
          { breakpoint: "lg", span: 6 },
        ],
        accessibilityRules: {
          ...DEFAULT_ACCESSIBILITY_RULES,
          role: undefined,
          notes: [
            "Decorative wrapper — contributes no landmark. Wrap meaningful content in its own semantic element.",
          ],
        },
        previewConfig: {
          sampleProps: { tone: "obsidian", intensity: "med" },
          aspectRatio: "16/9",
          background: "media",
          thumbnailBreakpoint: "lg",
          animate: false,
        },
        codeExample: {
          language: "tsx",
          caption: "Frosted obsidian glass panel over a media backdrop.",
          code: `import { GlassSurface } from "${BARREL}"

export function GlassPanel() {
  return (
    <GlassSurface tone="obsidian" intensity="med">
      <h3>Booking confirmed</h3>
      <p>Your exhaust inspection is scheduled for Thursday 9am.</p>
    </GlassSurface>
  )
}`,
        },
        setupInstructions: {
          steps: [
            `Import { GlassSurface } from "${BARREL}".`,
            "Place it over a textured or image background so the blur reads.",
            "Pass tone + intensity; nest your content as children.",
          ],
          notes: [
            "backdrop-filter needs a non-flat background behind it to be visible.",
          ],
        },
        tags: ["surface", "glass", "depth", "container"],
      },
      role: "Frosted-glass depth container.",
      usageExamples: [
        {
          title: "Chrome glass over hero image",
          scenario: "A light-tinted glass card floating on a workshop photo.",
          code: `<GlassSurface tone="chrome" intensity="high">
  <p>Oak Flats Mufflermen — since 1987.</p>
</GlassSurface>`,
        },
      ],
      a11y: {
        keyboard: ["No own keyboard behaviour; focus belongs to the children."],
        screenReader: [
          "Renders a plain div with no role. Provide semantics inside children.",
        ],
        reducedMotion: "No motion of its own; respects reduced-motion via children.",
        focus: ["Focus styling is the responsibility of nested interactive children."],
      },
      responsive: {
        mobile: "Full-bleed fill; blur intensity unchanged.",
        tablet: "Sits in a 2-column grid when the parent provides one.",
        desktop: "Half-width panel typical; corner radius constant via token.",
        hasHorizontalScroll: false,
      },
      cms: {
        isCmsBlock: false,
        draggable: true,
        acceptsChildren: true,
        repeaterProps: [],
        notes: [
          "A structural container, not a standalone CMS block — used to wrap other blocks for depth.",
        ],
      },
      agent: {
        steps: [
          "Confirm there is a non-flat background behind the surface.",
          "Choose tone (obsidian for dark UI, chrome for light, amber for accent).",
          "Nest semantic children; never rely on the wrapper for structure.",
        ],
        pitfalls: [
          "Glass over a solid flat colour looks like a plain panel — the blur has nothing to sample.",
        ],
        requirements: ["Children are required."],
      },
    },
    {
      manifest: {
        type: "surfaces/neuo-surface",
        name: "Neuo Surface",
        category: "Foundations",
        kind: "primitive",
        version: "1.0.0",
        summary:
          "Soft neumorphic container with extruded or pressed (inset) elevation and three tones.",
        componentPath: BARREL,
        importName: "NeuoSurface",
        propsSchema: {
          fields: [
            {
              key: "pressed",
              type: "boolean",
              required: false,
              description: "Inset (pressed-in) appearance. Defaults to false (raised).",
            },
            {
              key: "tone",
              type: "enum",
              required: false,
              options: ["obsidian", "ash", "amber"],
              description: "Surface tone. Defaults to \"obsidian\".",
            },
            { key: "className", type: "string", required: false },
            { key: "children", type: "json", required: true },
          ],
        },
        defaultProps: { pressed: false, tone: "obsidian" },
        editableFields: [
          {
            path: "tone",
            label: "Tone",
            control: "select",
            valueType: "enum",
            options: ["obsidian", "ash", "amber"],
          },
          { path: "pressed", label: "Pressed (inset)", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: [
          { token: "--primitive-panel", category: "color", usage: "raised surface fill" },
          { token: "--primitive-recessed", category: "color", usage: "pressed inset fill" },
          { token: "--primitive-shadow-raised", category: "shadow", usage: "extruded dual shadow" },
          { token: "--primitive-shadow-inset", category: "shadow", usage: "pressed inner shadow" },
          { token: "--primitive-radius-lg", category: "radius", usage: "corner radius" },
          { token: "--primitive-amber", category: "color", usage: "amber tone tint" },
        ],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [{ kind: "primitive" }, { kind: "component" }],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: {
          ...DEFAULT_ACCESSIBILITY_RULES,
          notes: ["Decorative wrapper; pressed state is purely visual, not a toggle role."],
        },
        previewConfig: {
          sampleProps: { tone: "obsidian", pressed: false },
          aspectRatio: "1/1",
          background: "panel",
          thumbnailBreakpoint: "lg",
          animate: false,
        },
        codeExample: {
          language: "tsx",
          caption: "Raised neumorphic tile holding a metric.",
          code: `import { NeuoSurface } from "${BARREL}"

export function NeuoTile() {
  return (
    <NeuoSurface tone="obsidian">
      <span>Jobs completed</span>
      <strong>1,284</strong>
    </NeuoSurface>
  )
}`,
        },
        setupInstructions: {
          steps: [
            `Import { NeuoSurface } from "${BARREL}".`,
            "Use a tone matching the surrounding canvas (neumorphism needs same-colour ground).",
            "Toggle pressed for inset wells (inputs, recessed groups).",
          ],
          notes: ["Neumorphism reads best on a panel of the same base colour, not on imagery."],
        },
        tags: ["surface", "neumorphism", "depth", "container"],
      },
      role: "Soft neumorphic raised/pressed container.",
      usageExamples: [
        {
          title: "Pressed input well",
          scenario: "An inset surface used as a recessed field group.",
          code: `<NeuoSurface tone="ash" pressed>
  <input aria-label="Search jobs" />
</NeuoSurface>`,
        },
      ],
      a11y: {
        keyboard: ["No own keyboard behaviour."],
        screenReader: ["Plain div; pressed is visual only and exposes no state to AT."],
        reducedMotion: "Static; no transitions.",
        focus: ["Focus belongs to nested controls."],
      },
      responsive: {
        mobile: "Full-width tile.",
        tablet: "Commonly arranged in a metric grid by the parent.",
        desktop: "Fixed corner radius; shadow spread constant via token.",
        hasHorizontalScroll: false,
      },
      cms: {
        isCmsBlock: false,
        draggable: true,
        acceptsChildren: true,
        repeaterProps: [],
        notes: ["Container primitive; wrap content blocks to give them neumorphic depth."],
      },
      agent: {
        steps: [
          "Match tone to the parent canvas colour.",
          "Use pressed for recessed wells, raised (default) for cards.",
        ],
        pitfalls: ["Neumorphism on imagery or high-contrast grounds loses the soft-shadow effect."],
        requirements: ["Children are required."],
      },
    },
    {
      manifest: {
        type: "surfaces/material-surface",
        name: "Material Surface",
        category: "Foundations",
        kind: "primitive",
        version: "1.0.0",
        summary:
          "Material-style container with six elevation levels (0–5) and four tonal roles.",
        componentPath: BARREL,
        importName: "MaterialSurface",
        propsSchema: {
          fields: [
            {
              key: "elevation",
              type: "number",
              required: false,
              min: 0,
              max: 5,
              description: "Elevation level 0–5. Defaults to 1.",
            },
            {
              key: "tone",
              type: "enum",
              required: false,
              options: ["primary", "secondary", "tertiary", "surface"],
              description: "Tonal role. Defaults to \"surface\".",
            },
            { key: "className", type: "string", required: false },
            { key: "children", type: "json", required: true },
          ],
        },
        defaultProps: { elevation: 1, tone: "surface" },
        editableFields: [
          {
            path: "elevation",
            label: "Elevation",
            control: "number",
            valueType: "number",
            hint: "0 (flat) to 5 (highest lift).",
          },
          {
            path: "tone",
            label: "Tone",
            control: "select",
            valueType: "enum",
            options: ["primary", "secondary", "tertiary", "surface"],
          },
        ],
        tokenDependencies: [
          { token: "--primitive-card-bg", category: "color", usage: "surface fill" },
          { token: "--primitive-panel-strong", category: "color", usage: "primary tonal fill" },
          { token: "--primitive-shadow-soft", category: "shadow", usage: "low elevation" },
          { token: "--primitive-shadow-deep", category: "shadow", usage: "high elevation" },
          { token: "--primitive-radius-md", category: "radius", usage: "corner radius" },
        ],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [{ kind: "primitive" }, { kind: "component" }],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: {
          ...DEFAULT_ACCESSIBILITY_RULES,
          notes: ["Decorative wrapper; elevation is visual only."],
        },
        previewConfig: {
          sampleProps: { elevation: 2, tone: "surface" },
          aspectRatio: "4/3",
          background: "canvas",
          thumbnailBreakpoint: "lg",
          animate: false,
        },
        codeExample: {
          language: "tsx",
          caption: "Elevated material card on the canvas.",
          code: `import { MaterialSurface } from "${BARREL}"

export function MaterialCard() {
  return (
    <MaterialSurface elevation={2} tone="surface">
      <h3>Service summary</h3>
      <p>Full exhaust system replacement.</p>
    </MaterialSurface>
  )
}`,
        },
        setupInstructions: {
          steps: [
            `Import { MaterialSurface } from "${BARREL}".`,
            "Pick an elevation (0 flat → 5 modal-level) and tonal role.",
            "Nest content as children.",
          ],
          notes: ["Higher elevation = more shadow spread; reserve 4–5 for overlays."],
        },
        tags: ["surface", "material", "elevation", "container"],
      },
      role: "Material elevation container.",
      usageExamples: [
        {
          title: "Flat surface (elevation 0)",
          scenario: "A grouped section with no lift, just tonal separation.",
          code: `<MaterialSurface elevation={0} tone="secondary">
  <p>Grouped settings</p>
</MaterialSurface>`,
        },
      ],
      a11y: {
        keyboard: ["No own keyboard behaviour."],
        screenReader: ["Plain div; elevation has no AT meaning."],
        reducedMotion: "Static.",
        focus: ["Focus belongs to nested controls."],
      },
      responsive: {
        mobile: "Full-width card.",
        tablet: "Sits in parent grid; elevation constant.",
        desktop: "Elevation shadow scales via token, not viewport.",
        hasHorizontalScroll: false,
      },
      cms: {
        isCmsBlock: false,
        draggable: true,
        acceptsChildren: true,
        repeaterProps: [],
        notes: ["Container primitive; the elevation prop maps cleanly to a number control in the CMS."],
      },
      agent: {
        steps: [
          "Default to elevation 1–2 for cards.",
          "Use tone to express hierarchy (primary > secondary > tertiary > surface).",
        ],
        pitfalls: ["Stacking many high-elevation surfaces flattens the perceived hierarchy."],
        requirements: ["Children are required.", "elevation must be an integer 0–5."],
      },
    },
  ],
}

export default surfacesDocs
