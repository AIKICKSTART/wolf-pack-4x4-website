/**
 * Surface-target metadata — human labels for each {@link SurfaceTarget}.
 * Used to render the "affects" hints in the control panel.
 */
import type { SurfaceTarget } from "./types";

export interface SurfaceMeta {
  readonly target: SurfaceTarget;
  readonly label: string;
}

export const SURFACE_META: Readonly<Record<SurfaceTarget, SurfaceMeta>> = {
  canvas: { target: "canvas", label: "Canvas background" },
  panels: { target: "panels", label: "Panels" },
  cards: { target: "cards", label: "Cards" },
  sidebar: { target: "sidebar", label: "Sidebar" },
  nav: { target: "nav", label: "Navigation" },
  footer: { target: "footer", label: "Footer" },
  controls: { target: "controls", label: "Controls" },
  fields: { target: "fields", label: "Form fields" },
  buttons: { target: "buttons", label: "Buttons" },
  icons: { target: "icons", label: "Icons" },
  typography: { target: "typography", label: "Text" },
  meters: { target: "meters", label: "Meters / progress" },
  code: { target: "code", label: "Code blocks" },
  overlays: { target: "overlays", label: "Overlays / scrims" },
  focus: { target: "focus", label: "Focus rings" },
  media: { target: "media", label: "Media overlays" },
  tables: { target: "tables", label: "Tables / stats" },
  all: { target: "all", label: "Everything" },
};
