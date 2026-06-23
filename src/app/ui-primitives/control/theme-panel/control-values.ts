/**
 * Value <-> CSS-string helpers for the theme control panel.
 *
 * These translate between the editable widget value (a number for sliders, a
 * hex/string for colors, a string for selects/toggles) and the CSS value the
 * panel writes back to the central `--primitive-*` token via the ThemeProvider.
 *
 * No design literals live here — only structural parsing. Every value the panel
 * emits is the token's own scale value (px/rem/ms/em/number) or a token
 * reference / `color-mix(... var(--primitive-*) ...)` carried verbatim from the
 * catalog. The panel never invents a raw palette color.
 */
import type {
  SliderControlSpec,
  TokenControl,
} from "../../builder/theme-catalog";

/** Resolve the catalog default a control should seed with for a given scheme. */
export function defaultForScheme(
  control: TokenControl,
  scheme: "light" | "dark",
): string {
  if (scheme === "light" && control.lightDefault !== undefined) {
    return control.lightDefault;
  }
  return control.default;
}

/**
 * Parse the leading numeric component out of a slider's CSS value so the range
 * input can be seeded. Handles plain numbers, unit suffixes, and `clamp(...)`
 * where the slider edits the rem cap (the last clamp arg). Returns the spec
 * midpoint when nothing parseable is found so the control still renders.
 */
export function sliderValueFromCss(
  value: string,
  spec: SliderControlSpec,
): number {
  const fromClamp = value.includes("clamp(")
    ? extractClampCap(value)
    : undefined;
  const source = fromClamp ?? value;
  const match = source.match(/-?\d*\.?\d+/);
  if (match === null) {
    return clampToSpec((spec.min + spec.max) / 2, spec);
  }
  const parsed = Number.parseFloat(match[0]);
  return Number.isFinite(parsed) ? clampToSpec(parsed, spec) : spec.min;
}

/** Pull the rem cap (third arg) out of a `clamp(min, pref, MAX)` expression. */
function extractClampCap(value: string): string | undefined {
  const inner = value.slice(value.indexOf("clamp(") + "clamp(".length);
  const args = splitTopLevel(inner);
  return args.length > 0 ? args[args.length - 1] : undefined;
}

/** Split a comma list while respecting nested parentheses (for clamp/calc). */
function splitTopLevel(input: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of input) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === "," && depth <= 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim().length > 0) parts.push(current.trim());
  return parts;
}

/** Constrain a parsed number to the slider's declared bounds. */
function clampToSpec(value: number, spec: SliderControlSpec): number {
  return Math.min(spec.max, Math.max(spec.min, value));
}

/**
 * Build the CSS string a slider emits. Fixed-size tokens get `value + unit`.
 * Fluid `clamp(...)` tokens preserve their min + preferred terms and only swap
 * the rem cap, so the fluid behaviour is kept while the operator tunes the max.
 */
export function cssFromSliderValue(
  value: number,
  spec: SliderControlSpec,
  currentCss: string,
): string {
  const rounded = roundForStep(value, spec.step);
  if (currentCss.includes("clamp(") && spec.unit === "rem") {
    return replaceClampCap(currentCss, `${rounded}rem`);
  }
  return `${rounded}${spec.unit}`;
}

/** Round a value to the precision implied by the slider step. */
function roundForStep(value: number, step: number): number {
  if (step <= 0) return value;
  const decimals = (String(step).split(".")[1] ?? "").length;
  const snapped = Math.round(value / step) * step;
  return Number.parseFloat(snapped.toFixed(decimals));
}

/** Replace only the cap term of a clamp expression, preserving the rest. */
function replaceClampCap(value: string, nextCap: string): string {
  const open = value.indexOf("clamp(");
  if (open < 0) return nextCap;
  const start = open + "clamp(".length;
  const close = findMatchingParen(value, start);
  if (close < 0) return nextCap;
  const args = splitTopLevel(value.slice(start, close));
  if (args.length === 0) return nextCap;
  args[args.length - 1] = nextCap;
  return `${value.slice(0, start)}${args.join(", ")}${value.slice(close)}`;
}

/** Index of the paren that closes the `clamp(` opened just before `from`. */
function findMatchingParen(value: string, from: number): number {
  let depth = 1;
  for (let index = from; index < value.length; index += 1) {
    if (value[index] === "(") depth += 1;
    if (value[index] === ")") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/**
 * Whether a color value is a flat hex the native `<input type="color">` can
 * edit directly. Token references, `rgba()`, gradients, and `color-mix(...)`
 * are not directly editable by the native swatch and fall back to a text field.
 */
export function isEditableHex(value: string): boolean {
  return HEX_PATTERN.test(value.trim());
}

/**
 * The hex the native color input should show. When the live value is not a flat
 * hex (a token ref / rgba / gradient), the input cannot represent it, so the
 * caller renders a text field instead — this only normalizes true hex input to
 * the 6-digit form the native widget expects.
 */
export function normalizeHex(value: string): string {
  const trimmed = value.trim();
  if (!HEX_PATTERN.test(trimmed)) return trimmed;
  if (trimmed.length === 4) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  if (trimmed.length === 9) return trimmed.slice(0, 7);
  return trimmed;
}
