import { FaqAccordion } from "../marketing"

import type { ServiceFaq } from "./services-areas-types"

export interface ServiceFaqBlockProps {
  /** Section kicker, e.g. "Questions". */
  kicker?: string
  /** Section heading. */
  title: string
  /** FAQ entries rendered as an accordion. */
  faqs: ReadonlyArray<ServiceFaq>
  /** ID of the initially-open FAQ. Defaults to the first. */
  initialOpenId?: string
}

/**
 * Service FAQ adapter. Composes the marketing `FaqAccordion` primitive
 * (which is built on the Base UI accordion) and supplies the typed
 * `ServiceFaq` shape.
 */
export function ServiceFaqBlock({
  kicker = "Questions",
  title,
  faqs,
  initialOpenId,
}: ServiceFaqBlockProps) {
  const defaultId = initialOpenId ?? faqs[0]?.id

  return (
    <FaqAccordion
      kicker={kicker}
      heading={title}
      defaultOpenId={defaultId}
      items={faqs.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      }))}
    />
  )
}

export default ServiceFaqBlock
