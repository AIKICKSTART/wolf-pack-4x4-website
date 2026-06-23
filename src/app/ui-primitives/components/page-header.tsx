import Link from "next/link"

import { Breadcrumb } from "./primitives/breadcrumb"
import styles from "./page-header.module.css"

import { getPrimitiveDnaSection } from "../source-of-truth"

export interface PageHeaderCrumb {
  label: string
  href?: string
}

export interface PageHeaderProps {
  kicker: string
  title: string
  description: string
  crumbs?: PageHeaderCrumb[]
  dnaSectionId?: string
}

export function PageHeader({ kicker, title, description, crumbs, dnaSectionId }: PageHeaderProps) {
  const dna = dnaSectionId ? getPrimitiveDnaSection(dnaSectionId) : undefined
  const trail: PageHeaderCrumb[] = crumbs && crumbs.length > 0
    ? crumbs
    : [
        { label: "UI Primitives", href: "/ui-primitives" },
        { label: title },
      ]
  const productionAnswer = `${title} is a reusable Oak Flats Muffler Men UI primitive with documented states, accessibility expectations, theme behavior, and implementation evidence.`
  const primaryCta = `Review ${title} states`
  const extractableAnswer = `${title}: ${description}`

  return (
    <header
      className={styles.header}
      data-ui-primitive-page-header="true"
      data-ui-primitive-route-header="true"
    >
      <span className={styles.scanline} aria-hidden="true" />

      <Breadcrumb
        items={trail}
        className={styles.breadcrumbs}
        separator={<span className={styles.separator}>/</span>}
      />

      <span className={styles.kicker}>{kicker}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <nav className={styles.sharedDnaNav} aria-label="Shared DNA quick links">
        <Link href="/ui-primitives#source-of-truth">00 Source</Link>
        <Link href="/ui-primitives#shared-dna">01 Shared DNA</Link>
        <Link href="/ui-primitives/actions#button-primitives">Buttons</Link>
        <Link href="/ui-primitives/surfaces#card-primitives">Cards</Link>
      </nav>
      {dna ? (
        <aside className={styles.dnaContract} data-ui-primitive-dna-contract="true">
          <div>
            <span>{dna.index}</span>
            <strong>{dna.section.label}</strong>
          </div>
          <p>{dna.contract.role}</p>
          <dl>
            <div>
              <dt>Outputs</dt>
              <dd>{dna.contract.atomicOutputs.join(" / ")}</dd>
            </div>
            <div>
              <dt>Proof</dt>
              <dd>{dna.contract.evidence.join(" / ")}</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd>{dna.contract.readiness}</dd>
            </div>
          </dl>
        </aside>
      ) : null}
      <section className={styles.productionBrief} aria-label={`${title} production brief`}>
        <div>
          <span>Production answer</span>
          <p>{productionAnswer}</p>
        </div>
        <div>
          <span>Primary CTA</span>
          <strong>{primaryCta}</strong>
        </div>
        <div>
          <span>Generative search brief</span>
          <p>{extractableAnswer}</p>
        </div>
      </section>
    </header>
  )
}
