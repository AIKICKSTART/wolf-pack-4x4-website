import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-kinetic-safe.module.css"

export function RoleKineticSafe() {
  return <TypographyRoleCard role={typographyRoleMap["kinetic-safe"]} className={styles.role} />
}
