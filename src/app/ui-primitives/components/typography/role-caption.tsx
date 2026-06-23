import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-caption.module.css"

export function RoleCaption() {
  return <TypographyRoleCard role={typographyRoleMap.caption} className={styles.role} />
}
