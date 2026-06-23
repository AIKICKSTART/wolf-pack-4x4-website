import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-display.module.css"

export function RoleDisplay() {
  return <TypographyRoleCard role={typographyRoleMap.display} className={styles.role} />
}
