import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_ROLE_MATRIX,
  RoleMatrix,
} from "../../components/brand-control"
import type {
  PermissionId,
  RoleId,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Role matrix | Brand control",
}

const ROLES: ReadonlyArray<{ id: RoleId; label: string }> = [
  { id: "founder", label: "Founder · Daniel" },
  { id: "brand", label: "Brand · Mia" },
  { id: "parts", label: "Parts · Ben" },
  { id: "workshop", label: "Workshop · Tim" },
  { id: "contractor", label: "Contractor · Kira" },
]

const PERMISSIONS: ReadonlyArray<{ id: PermissionId; label: string }> = [
  { id: "tokens.edit", label: "tokens.edit" },
  { id: "assets.upload", label: "assets.upload" },
  { id: "theme.deploy", label: "theme.deploy" },
  { id: "brand.publish", label: "brand.publish" },
  { id: "audit.read", label: "audit.read" },
]

const READONLY_CELLS = MOCK_ROLE_MATRIX.map((c) =>
  c.level === "write" || c.level === "admin" ? { ...c, level: "read" as const } : c
)

const LOCKDOWN_CELLS = MOCK_ROLE_MATRIX.map((c) =>
  c.roleId === "founder" ? c : { ...c, level: "none" as const, inheritedFrom: undefined }
)

export default function RoleMatrixRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 06"
          title="Role matrix"
          description="Role × permission matrix. Inherited cells arrow back to the source role so you can audit cascading access at a glance."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Role matrix" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            Default Oak Flats roles, a read-only audit snapshot (every write demoted), and a lockdown state where only the founder retains permissions.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Default role matrix">
          <span className={styles.stateLabel}>State 01 · Default</span>
          <RoleMatrix roles={ROLES} permissions={PERMISSIONS} cells={MOCK_ROLE_MATRIX} />
        </section>

        <section className={styles.stateWrap} aria-label="Read-only matrix">
          <span className={styles.stateLabel}>State 02 · Read-only audit</span>
          <RoleMatrix roles={ROLES} permissions={PERMISSIONS} cells={READONLY_CELLS} />
        </section>

        <section className={styles.stateWrap} aria-label="Lockdown matrix">
          <span className={styles.stateLabel}>State 03 · Lockdown</span>
          <RoleMatrix roles={ROLES} permissions={PERMISSIONS} cells={LOCKDOWN_CELLS} />
        </section>
      </div>
    </main>
  )
}
