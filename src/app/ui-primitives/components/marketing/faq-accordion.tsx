"use client"

import { Accordion } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./faq-accordion.module.css"

export interface FaqAccordionItem {
  id: string
  question: string
  answer: ReactNode
}

export interface FaqAccordionProps {
  kicker?: string
  heading?: string
  body?: string
  items: ReadonlyArray<FaqAccordionItem>
  /** Initially expanded item id. */
  defaultOpenId?: string
  className?: string
}

export function FaqAccordion({
  kicker,
  heading,
  body,
  items,
  defaultOpenId,
  className,
}: FaqAccordionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")
  const defaultValue = defaultOpenId ? [defaultOpenId] : []

  return (
    <section className={classes} aria-label={heading ?? "Frequently asked questions"}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}

      <Accordion.Root
        className={styles.root}
        defaultValue={defaultValue}
        loopFocus
      >
        {items.map((item) => (
          <Accordion.Item key={item.id} value={item.id} className={styles.item}>
            <Accordion.Header className={styles.itemHeader}>
              <Accordion.Trigger className={styles.trigger}>
                <span className={styles.question}>{item.question}</span>
                <ChevronDown
                  className={styles.chevron}
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className={styles.panel}>
              <div className={styles.panelInner}>{item.answer}</div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}

export default FaqAccordion
