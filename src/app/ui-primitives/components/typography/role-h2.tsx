import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-h2.module.css"

export function RoleH2() {
  return <TypographyRoleCard role={typographyRoleMap.h2} className={styles.role} />
}
