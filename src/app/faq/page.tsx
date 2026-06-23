import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { PublicNav } from "@/components/mufflermen/public-nav"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { PublicConversionDock, PublicSiteFooter } from "@/lib/cms/public-ui"
import { faqJsonLd, pageAlternates, servicePages } from "@/lib/seo"
import { business, faqs } from "@/lib/site-data"

export const revalidate = 3600

const fallbackMetadata: Metadata = {
  title: { absolute: "4x4 Upgrade FAQs | Wolfpack 4x4" },
  description:
    "Answers to common 4x4 upgrade questions — suspension, bull bars, winches, lighting, towing support, parts, fitment and booking at Wolfpack 4x4.",
  alternates: pageAlternates("/faq"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/faq")
  return contentOverrideMetadata(override, fallbackMetadata, "/faq")
}

function overrideText(value: string | null | undefined) {
  const text = value?.trim()
  return text && !/\$\{[^}]*\}/.test(text) ? text : undefined
}

function overrideList<Row, Value>(
  rows: Row[] | null | undefined,
  toValue: (row: Row) => Value | undefined,
) {
  const list = (rows ?? [])
    .map(toValue)
    .filter((value): value is Value => value !== undefined)
  return list.length > 0 ? list : undefined
}

export default async function FaqPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/faq"),
  ])

  const overrideGeneralFaqs = overrideList(
    contentOverride?.content?.faqPage?.generalFaqs,
    (row) => {
      const question = overrideText(row.question)
      const answer = overrideText(row.answer)
      return question && answer ? { answer, question } : undefined
    },
  )
  const generalFaqs =
    overrideGeneralFaqs ?? faqs.map((item) => ({ question: item.question, answer: item.answer }))
  const heroEyebrow = overrideText(contentOverride?.hero?.eyebrow) ?? "FAQs"
  const heroTitle = overrideText(contentOverride?.hero?.headline)
  const heroLede =
    overrideText(contentOverride?.hero?.lede) ?? overrideText(contentOverride?.summary)
  const serviceFaqGroups = servicePages.map((service) => ({
    title: service.title,
    slug: service.slug,
    items: service.faq,
  }))
  const allFaqs = [...generalFaqs, ...serviceFaqGroups.flatMap((group) => group.items)]

  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />
      <PublicNav displayName={business.name} />
      <main className="seo-page">
        <section className="seo-hero">
          <div className="seo-kicker">{heroEyebrow}</div>
          {heroTitle ? (
            <h1 className="seo-heading">{heroTitle}</h1>
          ) : (
            <h1 className="seo-heading">
              4x4 upgrade <span className="seo-heading-accent">questions, answered</span>
            </h1>
          )}
          {heroLede ? (
            <p>{heroLede}</p>
          ) : (
            <p>
              Straight answers from the workshop — suspension, protection, recovery,
              lighting, parts, fitment and how to book. Can&rsquo;t find your question? Call {business.phone} and
              the team will talk it through with your vehicle in mind.
            </p>
          )}
        </section>

        <section className="seo-section">
          <h2 className="seo-heading-sm">General</h2>
          <div className="seo-faq-list">
            {generalFaqs.map((item) => (
              <details key={item.question} className="seo-faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {serviceFaqGroups.map((group) => (
          <section key={group.slug} className="seo-section">
            <h2 className="seo-heading-sm">
              <Link href={`/services/${group.slug}`}>{group.title}</Link>
            </h2>
            <div className="seo-faq-list">
              {group.items.map((item) => (
                <details key={item.question} className="seo-faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="seo-section seo-faq-cta">
          <p>Still unsure? Send the vehicle details and the team will point you the right way.</p>
          <div className="seo-part-cta">
            <Link className="btn btn-red" href="/quote">
              <span>Request a quote</span>
              <span className="arrow" />
            </Link>
            <Link className="btn btn-chrome" href="/contact-us">
              <span>Contact the workshop</span>
            </Link>
          </div>
        </section>
      </main>
      <PublicSiteFooter settings={siteSettings} />
      <PublicConversionDock settings={siteSettings} />
    </>
  )
}
