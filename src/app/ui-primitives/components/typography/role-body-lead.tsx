import { TypographyRoleCard } from "./typography-role-card"
import { typographyRoleMap } from "./typography-role-data"
import styles from "./role-body-lead.module.css"

export function RoleBodyLead() {
  return <TypographyRoleCard role={typographyRoleMap["body-lead"]} className={styles.role} />
}
