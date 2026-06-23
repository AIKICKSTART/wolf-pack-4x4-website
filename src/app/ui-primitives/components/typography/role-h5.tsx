import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-h5.module.css"

export function RoleH5() {
  return <TypographyRoleCard role={typographyRoleMap.h5} className={styles.role} />
}
