import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-h1.module.css"

export function RoleH1() {
  return <TypographyRoleCard role={typographyRoleMap.h1} className={styles.role} />
}
