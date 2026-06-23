import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-dense-table.module.css"

export function RoleDenseTable() {
  return <TypographyRoleCard role={typographyRoleMap["dense-table"]} className={styles.role} />
}
