import { Breadcrumb } from "../primitives"

import type { ServicesCrumb } from "./services-areas-types"

export interface ServicesBreadcrumbProps {
  /** Crumbs from Home through to the current page. Last entry is current. */
  crumbs: ReadonlyArray<ServicesCrumb>
  /** Optional aria-label override. */
  ariaLabel?: string
}

/**
 * Services breadcrumb adapter. Composes the shared primitives `Breadcrumb`
 * primitive and supplies the typed `ServicesCrumb[]` shape.
 *
 * Distinct from the locations breadcrumb because services crumbs never
 * carry a postcode badge — the underlying Breadcrumb primitive renders
 * crumb labels and hrefs only.
 */
export function ServicesBreadcrumb({
  crumbs,
  ariaLabel = "Services breadcrumb",
}: ServicesBreadcrumbProps) {
  return (
    <Breadcrumb
      items={crumbs.map((crumb) => ({ label: crumb.label, href: crumb.href }))}
      ariaLabel={ariaLabel}
    />
  )
}

export default ServicesBreadcrumb
