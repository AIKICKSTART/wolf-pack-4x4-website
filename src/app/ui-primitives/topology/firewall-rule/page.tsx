import type { Metadata } from "next"

import { FirewallRuleRow } from "../../components/topology"
import { PageHeader } from "../../components/page-header"

import styles from "../topology.module.css"

export const metadata: Metadata = {
  title: "Firewall rule row | Topology",
  description:
    "Primitive 10 - firewall rule row with priority, action, protocol, endpoints, ports and comment.",
}

export default function FirewallRuleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Firewall rule"
        title="Firewall rule row"
        description="Semantic table row for allow, deny and log firewall rules across source, destination, protocol and ports."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Topology", href: "/ui-primitives/topology" },
          { label: "Firewall rule" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Ruleset excerpt</span>
        <table className={styles.fwTable}>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Action</th>
              <th>Protocol</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Ports</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <FirewallRuleRow
              priority={10}
              action="allow"
              protocol="https"
              source="0.0.0.0/0"
              destination="sg-alb-prod"
              ports="443"
              comment="Public web edge"
            />
            <FirewallRuleRow
              priority={30}
              action="allow"
              protocol="tcp"
              source="sg-web-prod"
              destination="sg-app-prod"
              ports="3000-3041"
              comment="App traffic"
            />
            <FirewallRuleRow
              priority={90}
              action="deny"
              protocol="any"
              source="0.0.0.0/0"
              destination="sg-db-prod"
              ports="all"
              comment="No public database access"
            />
          </tbody>
        </table>
      </section>
    </main>
  )
}
