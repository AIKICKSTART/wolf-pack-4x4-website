import type { Metadata } from "next"

import { FadeIn } from "../../components/motion"
import {
  BlockLibraryPanel,
  CollectionRow,
  FieldBuilder,
  I18nLanguageSwitcher,
  MediaPicker,
  PageCanvas,
  PageTree,
  PublishFlow,
  ResponsiveToolbar,
  RevisionTimeline,
  SeoChecklist,
  SlotInspector,
  TemplateGallery,
} from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import {
  CMS_BLOCKS,
  CMS_CANVAS_BLOCKS,
  CMS_COLLECTIONS,
  CMS_LOCALES,
  CMS_MEDIA_ITEMS,
  CMS_PAGE_TREE,
  CMS_PARTS_FIELDS,
  CMS_REVISIONS,
  CMS_SEO_CHECKS,
  CMS_SLOT_GROUPS,
  CMS_TEMPLATES,
} from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Full studio | CMS",
  description:
    "Composed live workshop CMS studio — page tree, canvas, inspector, publish flow, SEO, revisions and collections wired into a single dashboard.",
}

export default function FullStudioPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full studio"
        title="Workshop CMS studio"
        description="The composed Mufflermen CMS studio — page tree, canvas, inspector, responsive preview, template gallery, publish flow, revisions, SEO checklist, media picker, schema designer, collections and locales. Real Oak Flats Mufflermen content model. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Full studio" },
        ]}
      />

      <FadeIn>
        <div className={styles.studioShell}>
          <I18nLanguageSwitcher locales={CMS_LOCALES} defaultLocale="en-AU" />

          <div className={styles.studioTopGrid}>
            <PageTree
              nodes={CMS_PAGE_TREE}
              selectedId="page-wollongong"
              defaultExpandedIds={["page-home", "page-suburbs", "page-services", "page-parts"]}
            />
            <PageCanvas
              pageTitle="Wollongong workshop landing"
              pageSlug="suburbs/wollongong"
              blocks={CMS_CANVAS_BLOCKS}
            />
            <SlotInspector
              blockName="Service feature grid"
              blockCategory="Feature"
              blockSummary="Editing the trust strip — six-up service grid."
              groups={CMS_SLOT_GROUPS}
            />
          </div>

          <div className={styles.studioMidGrid}>
            <BlockLibraryPanel blocks={CMS_BLOCKS} defaultCategory="all" />
            <PublishFlow
              pageTitle="Wollongong workshop landing"
              slug="suburbs/wollongong"
              state="scheduled"
              reviewer="DF"
              scheduledFor="30 May · 08:00 AEST"
              branch="suburbs-rollout"
              changeRequests={1}
            />
          </div>

          <ResponsiveToolbar defaultViewport="desktop" />

          <div className={styles.studioMidGrid}>
            <SeoChecklist
              pageTitle="Wollongong suburb landing"
              url="/suburbs/wollongong"
              checks={CMS_SEO_CHECKS}
            />
            <RevisionTimeline entries={CMS_REVISIONS} />
          </div>

          <TemplateGallery
            templates={CMS_TEMPLATES}
            selectedId="tpl-suburb-illawarra"
            defaultCategory="suburb"
          />

          <div className={styles.studioMidGrid}>
            <MediaPicker
              items={CMS_MEDIA_ITEMS}
              defaultSelectedId="media-hero-1"
              defaultFocalPoint={{ x: 38, y: 42 }}
            />
            <FieldBuilder
              collectionName="Parts catalogue"
              initialFields={CMS_PARTS_FIELDS}
            />
          </div>

          <section
            className={styles.demoSurface}
            aria-label="Workshop collections"
          >
            <span className={styles.demoLabel}>Collections · 6 active</span>
            <div className={styles.demoStack}>
              {CMS_COLLECTIONS.map((item, index) => (
                <CollectionRow key={item.id} item={item} selected={index === 0} />
              ))}
            </div>
          </section>
        </div>
      </FadeIn>
    </main>
  )
}
