import {
  Clock,
  Flag,
  GitBranch,
  Repeat,
  Search,
  Settings,
  Zap,
} from "lucide-react"
import type { ReactNode } from "react"

import type {
  WorkflowNodeKind,
  WorkflowPaletteSection,
} from "./workflow-types"
import styles from "./node-palette-rail.module.css"

interface NodePaletteRailProps {
  sections: ReadonlyArray<WorkflowPaletteSection>
  /** Header search placeholder. */
  searchPlaceholder?: string
  className?: string
}

const KIND_ICON: Record<WorkflowNodeKind, ReactNode> = {
  trigger: <Zap strokeWidth={2.4} />,
  action: <Settings strokeWidth={2.2} />,
  condition: <GitBranch strokeWidth={2.2} />,
  loop: <Repeat strokeWidth={2.2} />,
  wait: <Clock strokeWidth={2.2} />,
  end: <Flag strokeWidth={2.2} />,
}

const KIND_CLASS: Record<WorkflowNodeKind, string> = {
  trigger: styles.itemTrigger,
  action: styles.itemAction,
  condition: styles.itemCondition,
  loop: styles.itemLoop,
  wait: styles.itemWait,
  end: styles.itemEnd,
}

export function NodePaletteRail({
  sections,
  searchPlaceholder = "Search nodes…",
  className,
}: NodePaletteRailProps) {
  const classes = [styles.rail, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      aria-label="Workflow node palette"
    >
      <div className={styles.search} role="search">
        <Search aria-hidden="true" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          aria-label="Filter nodes"
          readOnly
        />
      </div>
      <div className={styles.sections}>
        {sections.map((section) => (
          <section key={section.id} className={styles.section}>
            <span className={styles.sectionTitle}>{section.title}</span>
            <ul className={styles.items}>
              {section.items.map((item) => (
                <li
                  key={item.id}
                  className={[styles.item, KIND_CLASS[item.kind]].join(" ")}
                  draggable
                  aria-label={`Drag ${item.name} onto the canvas`}
                  tabIndex={0}
                >
                  <span className={styles.itemIcon} aria-hidden="true">
                    {KIND_ICON[item.kind]}
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemTitle}>{item.name}</span>
                    <span className={styles.itemDesc}>{item.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  )
}
