import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-mono.module.css"

export function RoleMono() {
  return <TypographyRoleCard role={typographyRoleMap.mono} className={styles.role} />
}
