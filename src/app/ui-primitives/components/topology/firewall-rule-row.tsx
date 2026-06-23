import { CircleSlash, FileText, ShieldCheck } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./firewall-rule-row.module.css"
import type { FirewallAction, ProtocolKind } from "./topology-types"

interface FirewallRuleRowProps {
  /** Numeric rule priority — lower wins. */
  priority: number
  /** Action — allow / deny / log. */
  action: FirewallAction
  /** Protocol the rule matches. */
  protocol: ProtocolKind
  /** Source CIDR / SG id / `any`. */
  source: string
  /** Destination CIDR / SG id / `any`. */
  destination: string
  /** Port range or list — e.g. `443` or `8080-8090` or `22, 3306`. */
  ports: string
  /** Optional comment. */
  comment?: string
}

const ACTION_LABEL: Record<FirewallAction, string> = {
  allow: "Allow",
  deny: "Deny",
  log: "Log",
}

const ACTION_TONE: Record<FirewallAction, string> = {
  allow: styles.actionAllow,
  deny: styles.actionDeny,
  log: styles.actionLog,
}

const ACTION_ICON: Record<FirewallAction, ReactNode> = {
  allow: <ShieldCheck strokeWidth={2.4} />,
  deny: <CircleSlash strokeWidth={2.4} />,
  log: <FileText strokeWidth={2.4} />,
}

export function FirewallRuleRow({
  priority,
  action,
  protocol,
  source,
  destination,
  ports,
  comment,
}: FirewallRuleRowProps) {
  return (
    <tr className={styles.row}>
      <td className={styles.priorityCell}>
        <span className={styles.priorityBadge}>#{priority.toString().padStart(3, "0")}</span>
      </td>
      <td className={styles.actionCell}>
        <span className={[styles.actionChip, ACTION_TONE[action]].join(" ")}>
          <span className={styles.actionIcon} aria-hidden="true">
            {ACTION_ICON[action]}
          </span>
          {ACTION_LABEL[action]}
        </span>
      </td>
      <td className={styles.protocolCell}>{protocol.toUpperCase()}</td>
      <td className={styles.endpointCell}>
        <span className={styles.endpointLabel}>From</span>
        <code>{source}</code>
      </td>
      <td className={styles.endpointCell}>
        <span className={styles.endpointLabel}>To</span>
        <code>{destination}</code>
      </td>
      <td className={styles.portsCell}>
        <code>{ports}</code>
      </td>
      <td className={styles.commentCell}>{comment ?? ""}</td>
    </tr>
  )
}
