import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-control.module.css"

export function RoleControl() {
  return <TypographyRoleCard role={typographyRoleMap.control} className={styles.role} />
}
