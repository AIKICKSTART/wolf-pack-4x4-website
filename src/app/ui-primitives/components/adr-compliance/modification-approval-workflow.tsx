import {
  ClipboardCheck,
  ClipboardSignature,
  Gauge,
  ScrollText,
  Wrench,
} from "lucide-react"
import type { ReactNode } from "react"

import { ProcessSteps, type ProcessStep } from "../marketing/process-steps"

import styles from "./modification-approval-workflow.module.css"

interface ModificationApprovalWorkflowProps {
  /** Optional kicker, default "Modification approval workflow". */
  kicker?: string
  /** Optional heading. */
  heading?: string
  /** Optional body copy. */
  body?: string
  /** Override the default 5-step model. */
  steps?: ReadonlyArray<ProcessStep>
  className?: string
}

const DEFAULT_STEPS: ReadonlyArray<{
  id: string
  title: string
  body: string
  icon: ReactNode
}> = [
  {
    id: "declaration",
    title: "Customer declaration",
    body: "Customer signs the modification + ADR awareness declaration. Workshop captures rego, VIN and the modification scope.",
    icon: <ClipboardSignature size={18} aria-hidden="true" />,
  },
  {
    id: "pre-mod",
    title: "Pre-modification test",
    body: "Capture stationary dB(A) baseline at the certified microphone position. Stored to the job file.",
    icon: <Gauge size={18} aria-hidden="true" />,
  },
  {
    id: "modification",
    title: "Modification work",
    body: "Fit the cat-back, manifold or muffler change. Photograph every join and joint for the evidence pack.",
    icon: <Wrench size={18} aria-hidden="true" />,
  },
  {
    id: "post-mod",
    title: "Post-modification test",
    body: "Re-measure stationary dB(A), then drive-by. Confirm the post-mod result is within the ADR band.",
    icon: <ClipboardCheck size={18} aria-hidden="true" />,
  },
  {
    id: "certificate",
    title: "Certificate of compliance",
    body: "Issue the ADR certificate with technician sign-off, verification QR and a copy mailed to the customer.",
    icon: <ScrollText size={18} aria-hidden="true" />,
  },
]

export function ModificationApprovalWorkflow({
  kicker = "Modification approval · 5 steps",
  heading = "From declaration to certificate",
  body = "Every modification follows the same documented flow so the workshop, customer and NSW regulator see the same evidence trail.",
  steps,
  className,
}: ModificationApprovalWorkflowProps) {
  const resolvedSteps: ReadonlyArray<ProcessStep> = steps ?? DEFAULT_STEPS

  return (
    <section className={`${styles.wrap} ${className ?? ""}`.trim()}>
      <ProcessSteps
        kicker={kicker}
        heading={heading}
        body={body}
        steps={resolvedSteps}
      />
    </section>
  )
}

export default ModificationApprovalWorkflow
