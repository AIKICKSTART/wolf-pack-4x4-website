"use client";

/**
 * A collapsible category section for one {@link TokenGroupCatalog}. Renders a
 * disclosure button (the group label + hint + override tally) and, when
 * expanded, the grid of {@link TokenControlField}s for that group. Native
 * disclosure semantics via `aria-expanded` + `aria-controls`, keyboard
 * operable, focus-visible.
 */
import { useId } from "react";
import { ChevronRight } from "lucide-react";

import type { TokenGroupCatalog } from "../../builder/theme-catalog";
import type { PrimitiveTokenName } from "../../builder/theme";
import { TokenControlField } from "./token-control-field";
import styles from "./theme-panel.module.css";

export interface TokenGroupSectionProps {
  readonly catalog: TokenGroupCatalog;
  readonly scheme: "light" | "dark";
  readonly expanded: boolean;
  readonly onToggle: () => void;
  /** Lookup an override value for a token (undefined = inherited). */
  readonly valueOf: (token: PrimitiveTokenName) => string | undefined;
  readonly isOverridden: (token: PrimitiveTokenName) => boolean;
  readonly onChange: (token: PrimitiveTokenName, value: string) => void;
  readonly onReset: (token: PrimitiveTokenName) => void;
}

export function TokenGroupSection({
  catalog,
  scheme,
  expanded,
  onToggle,
  valueOf,
  isOverridden,
  onChange,
  onReset,
}: TokenGroupSectionProps) {
  const bodyId = useId();
  const overriddenCount = catalog.tokens.reduce(
    (total, control) =>
      isOverridden(control.token as PrimitiveTokenName) ? total + 1 : total,
    0,
  );

  return (
    <section className={styles.group}>
      <button
        type="button"
        className={styles.groupSummary}
        aria-expanded={expanded}
        aria-controls={bodyId}
        onClick={onToggle}
      >
        <span className={styles.groupChevron}>
          <ChevronRight aria-hidden="true" />
        </span>
        <span className={styles.groupHeading}>
          <span className={styles.groupLabel}>{catalog.label}</span>
          <span className={styles.groupHint}>{catalog.description}</span>
        </span>
        <span className={styles.groupTally}>
          {overriddenCount > 0
            ? `${overriddenCount}/${catalog.tokens.length}`
            : `${catalog.tokens.length}`}
        </span>
      </button>

      {expanded ? (
        <div id={bodyId} className={styles.groupBody}>
          {catalog.tokens.map((control) => {
            const token = control.token as PrimitiveTokenName;
            return (
              <TokenControlField
                key={control.token}
                control={control}
                scheme={scheme}
                overrideValue={valueOf(token)}
                isOverridden={isOverridden(token)}
                onChange={onChange}
                onReset={onReset}
              />
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
