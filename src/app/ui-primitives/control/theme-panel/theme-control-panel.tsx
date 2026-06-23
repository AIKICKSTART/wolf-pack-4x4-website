"use client";

/**
 * THEME CONTROL PANEL.
 *
 * Grouped token controls organized by control LEVEL (global / component-set /
 * individual / section / page) and, within a level, by CATEGORY (Color,
 * Typography, Spacing, …). Editing any control writes the central
 * `--primitive-*` token through the {@link ThemeProvider} override channel — it
 * sets a CSS custom property on the provider wrapper, NEVER a component
 * hardcode — so every descendant (including the live preview strip) re-themes
 * from the single source of truth.
 *
 * Must be rendered inside a {@link ThemeProvider}. The companion showcase route
 * supplies one. Accessible: the level switcher is a tablist, categories are
 * disclosure sections, every control is labelled, focus is visible, and motion
 * respects `prefers-reduced-motion` (handled in CSS).
 */
import { useCallback, useMemo, useState } from "react";

import { useStyleProfile } from "../../builder/theme";
import {
  CONTROL_LEVELS,
  CONTROL_LEVEL_BY_KEY,
  getCatalogsForLevel,
  type ControlLevel,
} from "../../builder/theme-catalog";
import { ThemePreviewStrip } from "./theme-preview-strip";
import { TokenGroupSection } from "./token-group-section";
import { useTokenOverrides } from "./use-token-overrides";
import styles from "./theme-panel.module.css";

export interface ThemeControlPanelProps {
  /** Level the panel opens on. Defaults to `global`. */
  readonly initialLevel?: ControlLevel;
  /** Optional extra class on the shell wrapper. */
  readonly className?: string;
}

export function ThemeControlPanel({
  initialLevel = "global",
  className,
}: ThemeControlPanelProps) {
  const { profile } = useStyleProfile();
  const scheme: "light" | "dark" = profile.scheme === "light" ? "light" : "dark";

  const [level, setLevel] = useState<ControlLevel>(initialLevel);
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const {
    setToken,
    resetToken,
    resetLevel,
    resetAll,
    totalOverrideCount,
    valueOf,
    isOverridden,
  } = useTokenOverrides(level);

  const catalogs = useMemo(() => getCatalogsForLevel(level), [level]);
  const levelSpec = CONTROL_LEVEL_BY_KEY[level];

  const toggleGroup = useCallback((group: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  }, []);

  const selectLevel = useCallback((next: ControlLevel) => {
    setLevel(next);
    // Open the first category of the new level so the panel is never blank.
    setOpenGroups((prev) => {
      const first = getCatalogsForLevel(next)[0]?.group;
      if (first === undefined || prev.has(first)) return prev;
      const seeded = new Set(prev);
      seeded.add(first);
      return seeded;
    });
  }, []);

  // Seed the first category open on initial render.
  const firstGroup = catalogs[0]?.group;
  const effectiveOpen = useMemo<ReadonlySet<string>>(() => {
    if (openGroups.size > 0 || firstGroup === undefined) return openGroups;
    return new Set<string>([firstGroup]);
  }, [openGroups, firstGroup]);

  return (
    <div className={[styles.shell, className].filter(Boolean).join(" ")}>
      <div className={styles.panel}>
        <header className={styles.panelHeader}>
          <div className={styles.titleBlock}>
            <span className={styles.kicker}>Theme control</span>
            <h2 className={styles.title}>Token control panel</h2>
            <p className={styles.subtitle}>
              Edit a central design token and the whole subtree re-themes. Every
              change writes a <code>--primitive-*</code> custom property through
              the theme provider — never a component hardcode.
            </p>
          </div>
          <div className={styles.headerMeta}>
            <span className={styles.countBadge}>
              {totalOverrideCount} edited
            </span>
            <button
              type="button"
              className={styles.levelTab}
              onClick={resetLevel}
            >
              Reset level
            </button>
            <button
              type="button"
              className={styles.levelTab}
              onClick={resetAll}
            >
              Reset all
            </button>
          </div>
        </header>

        <div
          className={styles.levelTabs}
          role="tablist"
          aria-label="Control level"
        >
          {CONTROL_LEVELS.map((spec) => (
            <button
              key={spec.level}
              type="button"
              role="tab"
              id={`theme-level-tab-${spec.level}`}
              aria-selected={spec.level === level}
              aria-controls={`theme-level-panel-${spec.level}`}
              tabIndex={spec.level === level ? 0 : -1}
              className={styles.levelTab}
              onClick={() => selectLevel(spec.level)}
            >
              {spec.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`theme-level-panel-${level}`}
          aria-labelledby={`theme-level-tab-${level}`}
        >
          <p className={styles.levelDescription}>{levelSpec.description}</p>

          <div className={styles.groups}>
            {catalogs.map((catalog) => (
              <TokenGroupSection
                key={catalog.group}
                catalog={catalog}
                scheme={scheme}
                expanded={effectiveOpen.has(catalog.group)}
                onToggle={() => toggleGroup(catalog.group)}
                valueOf={valueOf}
                isOverridden={isOverridden}
                onChange={setToken}
                onReset={resetToken}
              />
            ))}
          </div>
        </div>
      </div>

      <ThemePreviewStrip />
    </div>
  );
}
