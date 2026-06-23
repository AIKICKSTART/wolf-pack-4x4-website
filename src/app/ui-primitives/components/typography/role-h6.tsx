import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-h6.module.css"

export function RoleH6() {
  return <TypographyRoleCard role={typographyRoleMap.h6} className={styles.role} />
}
