import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-h4.module.css"

export function RoleH4() {
  return <TypographyRoleCard role={typographyRoleMap.h4} className={styles.role} />
}
