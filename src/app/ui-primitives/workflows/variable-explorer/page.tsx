import type { Metadata } from "next"

import {
  VariableExplorer,
  type WorkflowVariable,
} from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Variable explorer | Workflows",
  description:
    "Primitive 13 — Collapsible tree of variables available at each step, with type chips and copy-on-click `{{token}}` chips.",
}

const VARIABLES: ReadonlyArray<WorkflowVariable> = [
  {
    path: "trigger",
    label: "trigger",
    type: "object",
    sample: "Webhook payload",
    children: [
      {
        path: "trigger.event",
        label: "event",
        type: "string",
        sample: "booking.created",
      },
      {
        path: "trigger.customer",
        label: "customer",
        type: "object",
        children: [
          {
            path: "trigger.customer.first_name",
            label: "first_name",
            type: "string",
            sample: "Daniel",
          },
          {
            path: "trigger.customer.email",
            label: "email",
            type: "string",
            sample: "daniel@oakflatsmufflers.com.au",
          },
          {
            path: "trigger.customer.phone",
            label: "phone",
            type: "string",
            sample: "+61 4xx xxx xxx",
          },
        ],
      },
      {
        path: "trigger.booking",
        label: "booking",
        type: "object",
        children: [
          {
            path: "trigger.booking.id",
            label: "id",
            type: "string",
            sample: "bk_4128",
          },
          {
            path: "trigger.booking.start_at",
            label: "start_at",
            type: "date",
            sample: "2026-06-02T08:30:00+10:00",
          },
          {
            path: "trigger.booking.vehicle",
            label: "vehicle",
            type: "object",
            children: [
              {
                path: "trigger.booking.vehicle.platform",
                label: "platform",
                type: "string",
                sample: "Hilux",
              },
              {
                path: "trigger.booking.vehicle.year",
                label: "year",
                type: "number",
                sample: "2018",
              },
            ],
          },
          {
            path: "trigger.booking.deposit_paid",
            label: "deposit_paid",
            type: "boolean",
            sample: "true",
          },
        ],
      },
    ],
  },
  {
    path: "step_2.output",
    label: "step_2.output",
    type: "object",
    sample: "Fetch booking → JSON",
    children: [
      {
        path: "step_2.output.items",
        label: "items",
        type: "array",
        sample: "3 items",
      },
      {
        path: "step_2.output.total",
        label: "total",
        type: "number",
        sample: "1280.00",
      },
    ],
  },
  {
    path: "now",
    label: "now",
    type: "date",
    sample: "Server time",
  },
]

export default function VariableExplorerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Variable explorer"
        title="Variable explorer"
        description="A collapsible tree of variables available at each step. Each row shows the variable label, sample value, type chip, and a copy-on-click `{{token}}` chip that briefly flashes green to confirm the copy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Variable explorer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Available at step 3</span>
        <div className={styles.demoInline}>
          <VariableExplorer variables={VARIABLES} kicker="Available at step 3" />
        </div>
      </section>
    </main>
  )
}
