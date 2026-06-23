import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-numeric.module.css"

export function RoleNumeric() {
  return <TypographyRoleCard role={typographyRoleMap.numeric} className={styles.role} />
}
