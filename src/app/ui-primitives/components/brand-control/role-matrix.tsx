import { CornerDownRight, Shield } from "lucide-react"
import type { ReactNode } from "react"

import type {
  PermissionId,
  PermissionLevel,
  RoleId,
  RoleMatrixCell,
} from "./brand-control-types"
import styles from "./brand-control.module.css"

interface RoleMatrixProps {
  roles: ReadonlyArray<{ id: RoleId; label: string }>
  permissions: ReadonlyArray<{ id: PermissionId; label: string }>
  cells: ReadonlyArray<RoleMatrixCell>
  className?: string
  caption?: string
}

const LEVEL_CLASS: Record<PermissionLevel, string> = {
  none: styles.permNone,
  inherit: styles.permInherit,
  read: styles.permRead,
  write: styles.permWrite,
  admin: styles.permAdmin,
}

const LEVEL_LABEL: Record<PermissionLevel, string> = {
  none: "None",
  inherit: "Inherit",
  read: "Read",
  write: "Write",
  admin: "Admin",
}

function lookup(
  cells: ReadonlyArray<RoleMatrixCell>,
  roleId: RoleId,
  permissionId: PermissionId
): RoleMatrixCell | undefined {
  return cells.find((c) => c.roleId === roleId && c.permissionId === permissionId)
}

function renderLevel(cell: RoleMatrixCell | undefined): ReactNode {
  if (!cell) {
    return <span className={`${styles.permPill} ${styles.permNone}`}>—</span>
  }
  const pillClass = `${styles.permPill} ${LEVEL_CLASS[cell.level]}`
  if (cell.level === "inherit" && cell.inheritedFrom) {
    return (
      <span className={pillClass} title={`Inherited from ${cell.inheritedFrom}`}>
        <CornerDownRight size={11} aria-hidden="true" />
        {cell.inheritedFrom}
      </span>
    )
  }
  return <span className={pillClass}>{LEVEL_LABEL[cell.level]}</span>
}

/**
 * Role × permission matrix with inheritance arrows. Sticky first column,
 * tabular numerics, semantic table markup so screen readers can navigate
 * row-by-column.
 */
export function RoleMatrix({
  roles,
  permissions,
  cells,
  caption,
  className,
}: RoleMatrixProps) {
  return (
    <article
      className={[styles.card, styles.cardWide, className].filter(Boolean).join(" ")}
      aria-label="Role permission matrix"
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Shield size={12} aria-hidden="true" /> Umbrella · Access
          </span>
          <h3 className={styles.title}>Role matrix</h3>
          <p className={styles.subtitle}>
            Inherited permissions arrow back to the source role.
          </p>
        </div>
      </header>

      <div style={{ overflowX: "auto" }}>
        <table className={styles.matrix}>
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr>
              <th scope="col">Role</th>
              {permissions.map((perm) => (
                <th key={perm.id} scope="col">
                  {perm.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <th scope="row">{role.label}</th>
                {permissions.map((perm) => (
                  <td key={perm.id}>
                    {renderLevel(lookup(cells, role.id, perm.id))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default RoleMatrix
