import type { AccessSource, PermissionCellState } from "./permission-types"
import styles from "./permission-inheritance-tree.module.css"

export interface InheritanceNode {
  readonly id: string
  readonly label: string
  readonly source: AccessSource
  readonly grantedBy: string
  readonly state: PermissionCellState
  readonly note?: string
}

interface PermissionInheritanceTreeProps {
  /** Permission the tree resolves, e.g. `jobs.edit`. */
  permission: string
  /** Final effective state after resolution. */
  effective: PermissionCellState
  nodes: ReadonlyArray<InheritanceNode>
  className?: string
}

const STATE_LABEL: Record<PermissionCellState, string> = {
  allow: "Allowed",
  deny: "Denied",
  inherited: "Inherited",
}

const SOURCE_LABEL: Record<AccessSource, string> = {
  direct: "Direct grant",
  inherited: "Inherited",
  group: "Group rule",
  workspace: "Workspace default",
}

export function PermissionInheritanceTree({
  permission,
  effective,
  nodes,
  className,
}: PermissionInheritanceTreeProps) {
  const classes = [styles.tree, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Resolution path for ${permission}`}>
      <header className={styles.head}>
        <span className={styles.label}>Resolving</span>
        <code className={styles.permission}>{permission}</code>
        <span className={styles.effective} data-state={effective}>
          <span aria-hidden="true">→</span>
          <strong>{STATE_LABEL[effective]}</strong>
        </span>
      </header>

      <ol className={styles.nodes}>
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1
          return (
            <li key={node.id} className={styles.node} data-state={node.state}>
              <span className={styles.rail} aria-hidden="true">
                <span className={styles.dot} />
                {!isLast && <span className={styles.connector} />}
              </span>
              <div className={styles.body}>
                <header className={styles.nodeHead}>
                  <span className={styles.nodeSource}>{SOURCE_LABEL[node.source]}</span>
                  <span className={styles.nodeState} data-state={node.state}>
                    {STATE_LABEL[node.state]}
                  </span>
                </header>
                <p className={styles.nodeLabel}>{node.label}</p>
                <p className={styles.nodeGranted}>
                  via <strong>{node.grantedBy}</strong>
                </p>
                {node.note && <p className={styles.nodeNote}>{node.note}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default PermissionInheritanceTree
