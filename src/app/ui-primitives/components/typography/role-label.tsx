import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-label.module.css"

export function RoleLabel() {
  return <TypographyRoleCard role={typographyRoleMap.label} className={styles.role} />
}
