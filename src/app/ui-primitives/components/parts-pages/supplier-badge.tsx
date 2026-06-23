import Image from "next/image"

import { Chip } from "../primitives/chip"

import {
  findPartsBrandLogo,
  getPartsBrandLogoThemeSrc,
  type PartsBrandLogo,
} from "@/lib/parts-brand-logos"

import type { SupplierTone } from "./parts-pages-types"

import styles from "./supplier-badge.module.css"

export interface SupplierBadgeProps {
  name: string
  tone: SupplierTone
  /** Optional supplier code, e.g. "MPI", "RBK". */
  code?: string
  /** Verified by Oak Flats Muffler Men chip. */
  verified?: boolean
  /** Optional warranty chip text, e.g. "Lifetime mufflers". */
  warranty?: string
  /** Variant — inline (default) for chips, stacked for cards. */
  variant?: "inline" | "stacked"
  /** Optional override for official brand artwork. Falls back to the shared resolver. */
  logoSrc?: string
  className?: string
}

const TONE_CLASS: Record<SupplierTone, string> = {
  manta: styles.toneManta,
  redback: styles.toneRedback,
  xforce: styles.toneXforce,
  pacemaker: styles.tonePacemaker,
  lukey: styles.toneLukey,
  hushpower: styles.toneHushpower,
  neutral: styles.toneNeutral,
}

type ResolvedSupplierLogo = Pick<PartsBrandLogo, "id" | "name" | "src" | "sourceAsset" | "surface"> & {
  sourcePage?: string
  sourceType: PartsBrandLogo["sourceType"] | "OVERRIDE"
  status: "official" | "override"
}

function resolveSupplierLogo({
  code,
  logoSrc,
  name,
}: Pick<SupplierBadgeProps, "code" | "logoSrc" | "name">): ResolvedSupplierLogo | undefined {
  const officialLogo = findPartsBrandLogo(name, code)

  if (officialLogo) {
    return { ...officialLogo, status: "official" }
  }

  if (logoSrc) {
    return {
      id: "override",
      name,
      src: logoSrc,
      sourceAsset: logoSrc,
      sourceType: "OVERRIDE",
      surface: "light",
      status: "override",
    }
  }

  return undefined
}

export function SupplierBadge({
  name,
  tone,
  code,
  verified,
  warranty,
  variant = "inline",
  logoSrc,
  className,
}: SupplierBadgeProps) {
  const brandLogo = resolveSupplierLogo({ code, logoSrc, name })
  const markClass = [
    styles.mark,
    brandLogo ? styles.logoMark : "",
    brandLogo?.surface === "dark" ? styles.logoMarkDark : "",
    brandLogo?.surface === "light" ? styles.logoMarkLight : "",
    !brandLogo ? styles.fallbackMark : "",
  ]
    .filter(Boolean)
    .join(" ")

  const rootClass = [
    styles.badge,
    TONE_CLASS[tone],
    variant === "stacked" ? styles.stacked : styles.inline,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const logoAuditAttributes = brandLogo
    ? {
        "data-logo-id": brandLogo.id,
        "data-logo-name": brandLogo.name,
        "data-logo-source-asset": brandLogo.sourceAsset,
        "data-logo-source-page": brandLogo.sourcePage,
        "data-logo-source-type": brandLogo.sourceType,
        "data-logo-status": brandLogo.status,
      }
    : {
        "data-logo-name": name,
        "data-logo-status": "fallback",
      }

  return (
    <div className={rootClass} aria-label={`Supplier: ${name}`}>
      <span
        className={markClass}
        title={brandLogo?.sourcePage ? `Official logo source: ${brandLogo.sourcePage}` : undefined}
        {...logoAuditAttributes}
      >
        {brandLogo ? (
          <>
            <Image
              className={`${styles.logoImage} ${styles.logoImageLight}`}
              src={
                brandLogo.status === "official"
                  ? getPartsBrandLogoThemeSrc(brandLogo, "light")
                  : brandLogo.src
              }
              alt={`${brandLogo.name} official supplier logo for light mode`}
              width={1200}
              height={420}
              sizes="88px"
            />
            <Image
              className={`${styles.logoImage} ${styles.logoImageDark}`}
              src={
                brandLogo.status === "official"
                  ? getPartsBrandLogoThemeSrc(brandLogo, "dark")
                  : brandLogo.src
              }
              alt={`${brandLogo.name} official supplier logo`}
              width={1200}
              height={420}
              sizes="88px"
            />
          </>
        ) : (
          <span
            className={styles.fallbackText}
            role="img"
            aria-label={`Official supplier logo unavailable for ${name}`}
          >
            No official logo
          </span>
        )}
      </span>
      <div className={styles.copy}>
        <span className={styles.role}>Supplier</span>
        <span className={styles.name}>{name}</span>
        {code && <span className={styles.code}>{code}</span>}
      </div>
      {(verified || warranty) && (
        <div className={styles.chips} aria-label="Supplier guarantees">
          {verified && <Chip label="Verified by Oak Flats" tone="green" />}
          {warranty && <Chip label={warranty} tone="amber" />}
        </div>
      )}
    </div>
  )
}

export default SupplierBadge
