/**
 * THEME CONTROL PANEL — public barrel.
 *
 * A token-driven visual control surface. It reads the theme catalog
 * (`builder/theme-catalog`) to render grouped controls by level + category, and
 * writes every edit back to the central `--primitive-*` tokens through the
 * {@link ThemeProvider} (`builder/theme`). No component is ever hardcoded — a
 * control only re-points a token, and the CSS cascade re-themes the subtree.
 */
export { ThemeControlPanel, type ThemeControlPanelProps } from "./theme-control-panel";
export { ThemePreviewStrip } from "./theme-preview-strip";
export { TokenGroupSection, type TokenGroupSectionProps } from "./token-group-section";
export {
  TokenControlField,
  type TokenControlFieldProps,
} from "./token-control-field";
export {
  useTokenOverrides,
  scopeIdForLevel,
  type TokenOverridesController,
} from "./use-token-overrides";
export {
  defaultForScheme,
  sliderValueFromCss,
  cssFromSliderValue,
  isEditableHex,
  normalizeHex,
} from "./control-values";
