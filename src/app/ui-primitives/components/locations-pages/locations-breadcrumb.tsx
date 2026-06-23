import { Breadcrumb, type BreadcrumbItem } from "../primitives/breadcrumb"

import type { SuburbState } from "./locations-pages-types"

import styles from "./locations-breadcrumb.module.css"

export interface LocationsBreadcrumbCrumb {
  label: string
  href?: string
}

export interface LocationsBreadcrumbProps {
  /** Suburb name for the focal suburb crumb. */
  suburbName: string
  /** Suburb href. */
  suburbHref: string
  /** State badge — appears at the right of the breadcrumb. */
  state: SuburbState
  /** Optional service crumb appended after the suburb. */
  service?: LocationsBreadcrumbCrumb
  /** Override the leading "Home" label. */
  homeLabel?: string
  /** Override the "Locations" segment label. */
  locationsLabel?: string
  /** Override the "Locations" segment href. */
  locationsHref?: string
  className?: string
}

/**
 * Locations breadcrumb — thin adapter over `primitives/Breadcrumb` that
 * supplies suburb-specific crumbs plus a trailing state badge.
 *
 * The state badge keeps geographic context permanently visible on
 * suburb pages, which is what differentiates this from the generic
 * breadcrumb primitive.
 */
export function LocationsBreadcrumb({
  suburbName,
  suburbHref,
  state,
  service,
  homeLabel = "Home",
  locationsLabel = "Locations",
  locationsHref = "/locations",
  className,
}: LocationsBreadcrumbProps) {
  const items: BreadcrumbItem[] = service
    ? [
        { label: homeLabel, href: "/" },
        { label: locationsLabel, href: locationsHref },
        { label: suburbName, href: suburbHref },
        service,
      ]
    : [
        { label: homeLabel, href: "/" },
        { label: locationsLabel, href: locationsHref },
        { label: suburbName, href: suburbHref },
      ]

  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="navigation" aria-label="Locations breadcrumb">
      <Breadcrumb items={items} ariaLabel="Locations breadcrumb trail" />
      <span className={styles.stateBadge}>
        <span className={styles.stateLabel}>State</span>
        <span className={styles.stateValue}>{state}</span>
      </span>
    </div>
  )
}

export default LocationsBreadcrumb
