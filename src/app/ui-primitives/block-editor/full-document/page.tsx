import type { Metadata } from "next"

import {
  AccordionBlock,
  CalloutBlock,
  ChecklistBlock,
  CodeBlock,
  CodeSandboxBlock,
  CtaBlock,
  DividerBlock,
  EmbedBlock,
  GalleryBlock,
  PollBlock,
  QuoteBlock,
  TableBlock,
  TimelineBlock,
  VideoBlock,
} from "../../components/block-editor"
import { FadeIn } from "../../components/motion"
import { PageHeader } from "../../components/page-header"

import {
  ACCORDION_BLOCK,
  CALLOUT_BLOCK,
  CHECKLIST_BLOCK,
  CODE_BLOCK,
  CTA_BLOCK,
  DIVIDER_BLOCK,
  EMBED_BLOCK,
  GALLERY_BLOCK,
  POLL_BLOCK,
  QUOTE_BLOCK,
  SANDBOX_BLOCK,
  TABLE_BLOCK,
  TIMELINE_BLOCK,
  VIDEO_BLOCK,
} from "../_mock-data"
import styles from "../block-editor.module.css"

export const metadata: Metadata = {
  title: "Full document | Block editor",
  description:
    "Composition — every block-editor primitive assembled into a single long-form Mufflermen post.",
}

export default function FullDocumentScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Long-form document"
        title="Falcon twin pipes — full block-editor composition"
        description="A composed long-form post mixing every block — masthead, gallery, code, callout, video, table, sandbox, quote, poll, checklist, timeline, embed, accordion, CTA — exactly as a host CMS would render the canonical document."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor", href: "/ui-primitives/block-editor" },
          { label: "Full document" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · 14 primitives</span>

        <FadeIn>
          <article className={styles.document}>
            <header className={styles.documentMasthead}>
              <span className={styles.documentMastheadKicker}>
                Workshop tales · Bay 3 · 2026-05-29
              </span>
              <h2 className={styles.documentMastheadTitle}>
                Why your Falcon&apos;s twin pipes are growling
              </h2>
              <span className={styles.documentByline}>
                Daniel Fleuren · Mia Pellegrino · Ben Sokolic
              </span>
            </header>

            <GalleryBlock data={GALLERY_BLOCK} mode="render" />

            <CalloutBlock data={CALLOUT_BLOCK} mode="render" />

            <CodeBlock data={CODE_BLOCK} mode="render" />

            <DividerBlock
              data={{
                ...DIVIDER_BLOCK,
                payload: { variant: "icon", label: "On the dyno" },
              }}
              mode="render"
            />

            <VideoBlock data={VIDEO_BLOCK} mode="render" />

            <TableBlock data={TABLE_BLOCK} mode="render" />

            <CodeSandboxBlock data={SANDBOX_BLOCK} mode="render" />

            <QuoteBlock data={QUOTE_BLOCK} mode="render" />

            <DividerBlock
              data={{
                ...DIVIDER_BLOCK,
                payload: { variant: "wave" },
              }}
              mode="render"
            />

            <PollBlock data={POLL_BLOCK} mode="render" />

            <ChecklistBlock data={CHECKLIST_BLOCK} mode="render" />

            <TimelineBlock data={TIMELINE_BLOCK} mode="render" />

            <EmbedBlock data={EMBED_BLOCK} mode="render" />

            <AccordionBlock data={ACCORDION_BLOCK} mode="render" />

            <CtaBlock data={CTA_BLOCK} mode="render" />
          </article>
        </FadeIn>
      </section>
    </main>
  )
}
