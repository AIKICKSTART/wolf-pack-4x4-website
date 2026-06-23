"use client";

/**
 * One labelled control for a single {@link TokenControl}. Renders the widget
 * matching the control's `kind` (color / slider / select / toggle), seeded with
 * the live value (override if present, else the scheme default). Every edit
 * calls back to the parent which writes the central token through the
 * ThemeProvider — this component never hardcodes a value onto a component.
 *
 * Fully accessible: each widget has a programmatic label, a help description
 * wired via `aria-describedby`, visible focus, and keyboard operability. The
 * reset control is disabled (not hidden) when there is nothing to revert.
 */
import { useId } from "react";
import { RotateCcw } from "lucide-react";

import type { TokenControl } from "../../builder/theme-catalog";
import { SURFACE_META } from "../../builder/theme-catalog";
import type { PrimitiveTokenName } from "../../builder/theme";
import {
  cssFromSliderValue,
  defaultForScheme,
  isEditableHex,
  normalizeHex,
  sliderValueFromCss,
} from "./control-values";
import styles from "./theme-panel.module.css";

export interface TokenControlFieldProps {
  readonly control: TokenControl;
  /** Active colour scheme — picks light vs dark default seed. */
  readonly scheme: "light" | "dark";
  /** Current override value for this token, if any. */
  readonly overrideValue: string | undefined;
  /** Whether this token currently carries an override at the active level. */
  readonly isOverridden: boolean;
  /** Write a value to the central token through the provider. */
  readonly onChange: (token: PrimitiveTokenName, value: string) => void;
  /** Revert this token to its inherited value. */
  readonly onReset: (token: PrimitiveTokenName) => void;
}

export function TokenControlField({
  control,
  scheme,
  overrideValue,
  isOverridden,
  onChange,
  onReset,
}: TokenControlFieldProps) {
  const widgetId = useId();
  const descId = `${widgetId}-desc`;
  const token = control.token as PrimitiveTokenName;
  const liveValue = overrideValue ?? defaultForScheme(control, scheme);

  return (
    <div className={styles.control} data-overridden={isOverridden}>
      <div className={styles.controlTop}>
        <label className={styles.controlLabel} htmlFor={widgetId}>
          {control.label}
          <span className={styles.controlToken}>{control.token}</span>
        </label>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => onReset(token)}
          disabled={!isOverridden}
          aria-label={`Reset ${control.label} to default`}
          title="Reset to default"
        >
          <RotateCcw aria-hidden="true" />
        </button>
      </div>

      <p id={descId} className={styles.controlDescription}>
        {control.description}
      </p>

      {renderWidget({
        control,
        widgetId,
        descId,
        liveValue,
        token,
        onChange,
      })}

      {control.affects.length > 0 ? (
        <ul className={styles.affects} aria-label="Surfaces affected">
          {control.affects.map((target) => (
            <li key={target} className={styles.affectChip}>
              {SURFACE_META[target].label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

interface WidgetArgs {
  readonly control: TokenControl;
  readonly widgetId: string;
  readonly descId: string;
  readonly liveValue: string;
  readonly token: PrimitiveTokenName;
  readonly onChange: (token: PrimitiveTokenName, value: string) => void;
}

function renderWidget({
  control,
  widgetId,
  descId,
  liveValue,
  token,
  onChange,
}: WidgetArgs) {
  switch (control.control.kind) {
    case "color": {
      const editableHex = isEditableHex(liveValue);
      return (
        <div className={styles.colorRow}>
          {editableHex ? (
            <input
              id={widgetId}
              type="color"
              className={styles.colorSwatch}
              value={normalizeHex(liveValue)}
              aria-describedby={descId}
              onChange={(event) => onChange(token, event.target.value)}
            />
          ) : (
            <span
              className={styles.swatchPreview}
              style={{ background: liveValue }}
              aria-hidden="true"
            />
          )}
          <input
            id={editableHex ? `${widgetId}-text` : widgetId}
            type="text"
            spellCheck={false}
            className={styles.textField}
            value={liveValue}
            aria-label={editableHex ? `${control.label} value` : control.label}
            aria-describedby={descId}
            onChange={(event) => onChange(token, event.target.value)}
          />
        </div>
      );
    }
    case "slider": {
      const spec = control.control;
      const numeric = sliderValueFromCss(liveValue, spec);
      return (
        <div className={styles.sliderRow}>
          <input
            id={widgetId}
            type="range"
            className={styles.slider}
            min={spec.min}
            max={spec.max}
            step={spec.step}
            value={numeric}
            aria-describedby={descId}
            aria-valuetext={`${numeric}${spec.unit}`}
            onChange={(event) =>
              onChange(
                token,
                cssFromSliderValue(
                  Number.parseFloat(event.target.value),
                  spec,
                  liveValue,
                ),
              )
            }
          />
          <output className={styles.sliderValue} htmlFor={widgetId}>
            {numeric}
            {spec.unit}
          </output>
        </div>
      );
    }
    case "select": {
      const spec = control.control;
      return (
        <select
          id={widgetId}
          className={styles.selectField}
          value={liveValue}
          aria-describedby={descId}
          onChange={(event) => onChange(token, event.target.value)}
        >
          {!spec.options.some((option) => option.value === liveValue) ? (
            <option value={liveValue}>Current ({liveValue})</option>
          ) : null}
          {spec.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
    case "toggle": {
      const spec = control.control;
      const checked = liveValue === spec.onValue;
      return (
        <div className={styles.toggleRow}>
          <button
            id={widgetId}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-describedby={descId}
            aria-label={control.label}
            className={styles.toggle}
            onClick={() =>
              onChange(token, checked ? spec.offValue : spec.onValue)
            }
          >
            <span className={styles.toggleKnob} aria-hidden="true" />
          </button>
          <span className={styles.toggleState}>
            {checked ? "On" : "Off"}
          </span>
        </div>
      );
    }
    default: {
      // Exhaustive: every ControlKind is handled above.
      return null;
    }
  }
}
