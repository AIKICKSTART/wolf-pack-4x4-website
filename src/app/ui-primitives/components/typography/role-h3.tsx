import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-h3.module.css"

export function RoleH3() {
  return <TypographyRoleCard role={typographyRoleMap.h3} className={styles.role} />
}
