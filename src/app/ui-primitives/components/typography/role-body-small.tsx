import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-body-small.module.css"

export function RoleBodySmall() {
  return <TypographyRoleCard role={typographyRoleMap["body-small"]} className={styles.role} />
}
