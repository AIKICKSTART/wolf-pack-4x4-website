"use client"

import { useCallback, useMemo, useState } from "react"

import type {
  FilterCondition,
  FilterGroup,
  FilterGroupLogic,
  FilterOperator,
} from "./reports-types"
import styles from "./filter-builder-tree.module.css"

const OPERATOR_LABEL: Record<FilterOperator, string> = {
  equals: "=",
  "not-equals": "≠",
  "greater-than": ">",
  "less-than": "<",
  contains: "contains",
  in: "in",
  between: "between",
}

interface FilterBuilderTreeProps {
  rootGroup: FilterGroup
  className?: string
}

function buildPreview(group: FilterGroup, depth = 0): string {
  const parts: string[] = []
  for (const condition of group.conditions) {
    parts.push(
      `${condition.field} ${OPERATOR_LABEL[condition.operator]} '${condition.value}'`,
    )
  }
  for (const child of group.groups ?? []) {
    parts.push(`(${buildPreview(child, depth + 1)})`)
  }
  const joiner = ` ${group.logic} `
  return parts.join(joiner)
}

function setLogicAt(
  group: FilterGroup,
  targetId: string,
  logic: FilterGroupLogic,
): FilterGroup {
  if (group.id === targetId) {
    return { ...group, logic }
  }
  return {
    ...group,
    groups: group.groups?.map((child) => setLogicAt(child, targetId, logic)),
  }
}

function removeCondition(group: FilterGroup, conditionId: string): FilterGroup {
  return {
    ...group,
    conditions: group.conditions.filter((condition) => condition.id !== conditionId),
    groups: group.groups?.map((child) => removeCondition(child, conditionId)),
  }
}

function addConditionTo(group: FilterGroup, targetId: string): FilterGroup {
  if (group.id === targetId) {
    const nextId = `c-${Math.random().toString(36).slice(2, 7)}`
    const newCondition: FilterCondition = {
      id: nextId,
      field: "field",
      operator: "equals",
      value: "value",
    }
    return { ...group, conditions: [...group.conditions, newCondition] }
  }
  return {
    ...group,
    groups: group.groups?.map((child) => addConditionTo(child, targetId)),
  }
}

function addGroupTo(group: FilterGroup, targetId: string): FilterGroup {
  if (group.id === targetId) {
    const nextId = `g-${Math.random().toString(36).slice(2, 7)}`
    const newGroup: FilterGroup = {
      id: nextId,
      logic: "AND",
      conditions: [
        {
          id: `c-${Math.random().toString(36).slice(2, 7)}`,
          field: "field",
          operator: "equals",
          value: "value",
        },
      ],
    }
    return { ...group, groups: [...(group.groups ?? []), newGroup] }
  }
  return {
    ...group,
    groups: group.groups?.map((child) => addGroupTo(child, targetId)),
  }
}

interface GroupNodeProps {
  group: FilterGroup
  onLogic: (groupId: string, logic: FilterGroupLogic) => void
  onAddCondition: (groupId: string) => void
  onAddGroup: (groupId: string) => void
  onRemoveCondition: (conditionId: string) => void
}

function GroupNode({
  group,
  onLogic,
  onAddCondition,
  onAddGroup,
  onRemoveCondition,
}: GroupNodeProps) {
  return (
    <div className={styles.group} role="treeitem" aria-expanded="true" aria-selected="false">
      <div className={styles.groupHead}>
        <div className={styles.logicToggle} role="radiogroup" aria-label="Logic operator">
          <button
            type="button"
            role="radio"
            aria-checked={group.logic === "AND"}
            className={`${styles.logicChoice} ${group.logic === "AND" ? styles.logicChoiceActive : ""}`}
            onClick={() => onLogic(group.id, "AND")}
          >
            AND
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={group.logic === "OR"}
            className={`${styles.logicChoice} ${group.logic === "OR" ? styles.logicChoiceActive : ""}`}
            onClick={() => onLogic(group.id, "OR")}
          >
            OR
          </button>
        </div>
      </div>

      {group.conditions.map((condition) => (
        <div
          key={condition.id}
          className={styles.condition}
          role="treeitem"
          aria-selected="false"
        >
          <span className={styles.chip}>{condition.field}</span>
          <span className={`${styles.chip} ${styles.chipMuted}`}>
            {OPERATOR_LABEL[condition.operator]}
          </span>
          <span className={styles.chip}>{condition.value}</span>
          <button
            type="button"
            className={styles.removeBtn}
            aria-label={`Remove condition for ${condition.field}`}
            onClick={() => onRemoveCondition(condition.id)}
          >
            ×
          </button>
        </div>
      ))}

      {group.groups?.map((child) => (
        <GroupNode
          key={child.id}
          group={child}
          onLogic={onLogic}
          onAddCondition={onAddCondition}
          onAddGroup={onAddGroup}
          onRemoveCondition={onRemoveCondition}
        />
      ))}

      <div className={styles.addRow}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => onAddCondition(group.id)}
        >
          + Condition
        </button>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => onAddGroup(group.id)}
        >
          + Group
        </button>
      </div>
    </div>
  )
}

export function FilterBuilderTree({ rootGroup, className }: FilterBuilderTreeProps) {
  const [tree, setTree] = useState<FilterGroup>(rootGroup)

  const handleLogic = useCallback((groupId: string, logic: FilterGroupLogic) => {
    setTree((current) => setLogicAt(current, groupId, logic))
  }, [])

  const handleAddCondition = useCallback((groupId: string) => {
    setTree((current) => addConditionTo(current, groupId))
  }, [])

  const handleAddGroup = useCallback((groupId: string) => {
    setTree((current) => addGroupTo(current, groupId))
  }, [])

  const handleRemoveCondition = useCallback((conditionId: string) => {
    setTree((current) => removeCondition(current, conditionId))
  }, [])

  const preview = useMemo(() => buildPreview(tree), [tree])

  const classes = [styles.tree, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Filter builder">
      <div className={styles.head}>
        <span>Filter tree</span>
        <span>WHERE clause preview</span>
      </div>
      <div role="tree" aria-label="Filter conditions">
        <GroupNode
          group={tree}
          onLogic={handleLogic}
          onAddCondition={handleAddCondition}
          onAddGroup={handleAddGroup}
          onRemoveCondition={handleRemoveCondition}
        />
      </div>
      <div className={styles.sql} aria-live="polite">
        <span className={styles.sqlLabel}>WHERE</span>
        {preview || "(empty)"}
      </div>
    </section>
  )
}

export default FilterBuilderTree
