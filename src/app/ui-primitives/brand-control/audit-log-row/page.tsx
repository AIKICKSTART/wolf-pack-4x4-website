import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AuditLogRow,
  MOCK_AUDIT,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Audit log row | Brand control",
}

const [TOKEN_EDIT, PUBLISH, DEPLOY, UPLOAD, ROLLBACK] = MOCK_AUDIT

export default function AuditLogRowRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 08"
          title="Audit log row"
          description="Single audit entry — actor, action, resource, relative timestamp, and an optional before/after diff strip."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Audit log row" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            A token edit (Mia changing amber), a publish + deploy pair, and an upload/rollback pair to show every action tone.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Token edit">
          <span className={styles.stateLabel}>State 01 · Token edit</span>
          <AuditLogRow entry={TOKEN_EDIT} />
        </section>

        <section className={styles.stateWrap} aria-label="Publish + deploy">
          <span className={styles.stateLabel}>State 02 · Publish + deploy</span>
          <AuditLogRow entry={PUBLISH} />
          <AuditLogRow entry={DEPLOY} />
        </section>

        <section className={styles.stateWrap} aria-label="Upload + rollback">
          <span className={styles.stateLabel}>State 03 · Upload + rollback</span>
          <AuditLogRow entry={UPLOAD} />
          <AuditLogRow entry={ROLLBACK} />
        </section>
      </div>
    </main>
  )
}
