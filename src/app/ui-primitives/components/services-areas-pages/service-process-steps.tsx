import {
  CarSideIcon,
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  MigWelderIcon,
  TachometerIcon,
} from "../icons"
import { ProcessSteps } from "../marketing"

import type { ServiceProcessStep } from "./services-areas-types"

export interface ServiceProcessStepsProps {
  /** Section kicker, e.g. "Workshop process". */
  kicker?: string
  /** Section heading. */
  title: string
  /** Ordered process steps. */
  steps: ReadonlyArray<ServiceProcessStep>
}

function StepIcon({ iconKey }: { iconKey: ServiceProcessStep["iconKey"] }) {
  switch (iconKey) {
    case "drop-off":
      return <CarSideIcon size={22} tone="teal" />
    case "fitment":
      return <ClipboardCheckIcon size={22} tone="amber" />
    case "build":
      return <MigWelderIcon size={22} tone="red" />
    case "test":
      return <TachometerIcon size={22} tone="green" />
    case "handover":
      return <CheckeredFlagIcon size={22} tone="amber" />
    default:
      return null
  }
}

/**
 * Service process-steps adapter. Composes the marketing `ProcessSteps`
 * primitive and supplies workshop-specific icons from the shared icons
 * library. Step numbering, layout, and reveal motion come straight from
 * the shared primitive.
 *
 * The step list is rendered as a semantic ordered list inside the
 * primitive.
 */
export function ServiceProcessSteps({
  kicker = "Workshop process",
  title,
  steps,
}: ServiceProcessStepsProps) {
  return (
    <ProcessSteps
      kicker={kicker}
      heading={title}
      steps={steps.map((step) => ({
        id: step.id,
        title: step.title,
        body: step.body,
        icon: <StepIcon iconKey={step.iconKey} />,
      }))}
    />
  )
}

export default ServiceProcessSteps
