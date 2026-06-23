import { FaqAccordion, type FaqAccordionItem } from "../marketing/faq-accordion"

import type { PartsFaqItem } from "./parts-pages-types"

import styles from "./parts-faq-section.module.css"

export interface PartsFaqSectionProps {
  heading?: string
  kicker?: string
  body?: string
  items: ReadonlyArray<PartsFaqItem>
  /** Default expanded item id. */
  defaultOpenId?: string
  className?: string
}

function toAccordionItem(item: PartsFaqItem): FaqAccordionItem {
  return { id: item.id, question: item.question, answer: <p>{item.answer}</p> }
}

export function PartsFaqSection({
  heading = "Parts FAQs",
  kicker = "Common parts questions",
  body,
  items,
  defaultOpenId,
  className,
}: PartsFaqSectionProps) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <FaqAccordion
        kicker={kicker}
        heading={heading}
        body={body}
        items={items.map(toAccordionItem)}
        defaultOpenId={defaultOpenId}
      />
    </div>
  )
}

export default PartsFaqSection
