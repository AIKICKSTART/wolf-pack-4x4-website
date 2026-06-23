import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-eyebrow.module.css"

export function RoleEyebrow() {
  return <TypographyRoleCard role={typographyRoleMap.eyebrow} className={styles.role} />
}
