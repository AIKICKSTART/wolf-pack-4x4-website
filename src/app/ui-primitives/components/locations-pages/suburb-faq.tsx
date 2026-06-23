import type { ReactNode } from "react"

import {
  FaqAccordion,
  type FaqAccordionItem,
} from "../marketing/faq-accordion"

export interface SuburbFaqItem {
  id: string
  question: string
  answer: ReactNode
}

export interface SuburbFaqProps {
  /** Suburb name used in the heading. */
  suburbName: string
  items: ReadonlyArray<SuburbFaqItem>
  /** Item id that should be open on first render. */
  defaultOpenId?: string
  className?: string
}

/**
 * Suburb FAQ — thin adapter that supplies suburb-specific copy to the
 * generic `marketing/FaqAccordion`. The heading is rewritten with the
 * suburb name so the accordion announces "Questions {suburb} drivers
 * ask" instead of generic FAQ wording.
 */
export function SuburbFaq({
  suburbName,
  items,
  defaultOpenId,
  className,
}: SuburbFaqProps) {
  const accordionItems: ReadonlyArray<FaqAccordionItem> = items.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }))

  return (
    <FaqAccordion
      kicker="Common questions"
      heading={`Questions ${suburbName} drivers ask`}
      body={`Localised FAQs for ${suburbName} — fit time, mobile vs in-workshop, parking, and why drivers in this suburb book Oak Flats Muffler Men.`}
      items={accordionItems}
      defaultOpenId={defaultOpenId ?? items[0]?.id}
      className={className}
    />
  )
}

export default SuburbFaq
