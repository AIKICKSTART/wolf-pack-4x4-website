import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-body-base.module.css"

export function RoleBodyBase() {
  return <TypographyRoleCard role={typographyRoleMap["body-base"]} className={styles.role} />
}
