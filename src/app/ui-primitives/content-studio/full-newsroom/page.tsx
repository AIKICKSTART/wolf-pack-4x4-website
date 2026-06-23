import type { Metadata } from "next"

import { FadeIn } from "../../components/motion"
import { PageHeader } from "../../components/page-header"
import {
  CoAuthorStrip,
  CommentThreadCard,
  ContentBlockCard,
  CoverArtStudio,
  FrontmatterPanel,
  LongFormEditor,
  MediaBinder,
  OutlineRail,
  PublishScheduler,
  ReadabilityScoreTile,
  RevisionDiffViewer,
  SeoInspector,
  SocialRepurposeCard,
  TaxonomyTree,
} from "../../components/content-studio"

import { DEMO_ASSETS } from "../../asset-library/asset-library-fixtures"
import {
  AUTHORS,
  BLOCK_SNIPPETS,
  COVER_SUGGESTIONS,
  CO_AUTHORS,
  DRAFT_COMMENTS,
  FOCUSED_BLOCK_ID,
  HERO_BLOCKS,
  HERO_FRONTMATTER,
  OUTLINE,
  READABILITY,
  REPURPOSE_OUTPUTS,
  REVISION_DIFF,
  REVISION_NEW,
  REVISION_OLD,
  SEO_META_PREVIEW,
  SEO_SIGNALS,
  TAXONOMY,
} from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Full newsroom | Content studio",
  description:
    "Composition — Mufflermen editorial newsroom assembled from the 14 content-studio primitives. Outline rail, long-form editor, frontmatter, SEO, comments, repurpose, cover studio, revision diff.",
}

const AUTHOR_CHIPS = [
  { id: AUTHORS.daniel.id, label: "Daniel F." },
  { id: AUTHORS.mia.id, label: "Mia P." },
  { id: AUTHORS.ben.id, label: "Ben S." },
]

const PILOT_REPURPOSE = REPURPOSE_OUTPUTS.slice(0, 3)
const PRIMARY_SNIPPETS = BLOCK_SNIPPETS.slice(0, 3)

export default function FullNewsroomScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Editorial newsroom"
        title="Mufflermen editorial newsroom"
        description="A composed newsroom surface — outline rail and taxonomy on the left, the long-form block editor in the centre, the SEO inspector + readability + comments aside on the right, frontmatter and publish scheduler across the top, repurpose cards and cover studio along the bottom. All 14 primitives, composed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Full newsroom" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · 14 primitives</span>

        <FadeIn>
          <div className={styles.newsroom}>
            <header className={styles.newsroomHeader}>
              <CoAuthorStrip slots={CO_AUTHORS} />
              <PublishScheduler
                defaultDate={new Date(2026, 5, 4)}
                defaultTime="08:30"
                defaultTimezone="AEST"
                defaultCadence="one-off"
              />
            </header>

            <div className={styles.newsroomFrontmatter}>
              <FrontmatterPanel
                frontmatter={HERO_FRONTMATTER}
                authorChips={AUTHOR_CHIPS}
              />
            </div>

            <aside className={styles.newsroomRail}>
              <OutlineRail entries={OUTLINE} />
              <TaxonomyTree
                nodes={TAXONOMY}
                defaultExpanded={["cat-workshop"]}
                selectedId="cat-workshop"
              />
              <ReadabilityScoreTile
                score={READABILITY}
                label="Flesch · plain English"
              />
            </aside>

            <div className={styles.newsroomCanvas}>
              <LongFormEditor
                blocks={HERO_BLOCKS}
                focusedBlockId={FOCUSED_BLOCK_ID}
                title="Why your Falcon's twin pipes are growling"
                byline="Daniel Fleuren · Mia Pellegrino · Ben Sokolic"
              />
              <CoverArtStudio
                coverAlt={HERO_FRONTMATTER.coverAlt}
                focalX={HERO_FRONTMATTER.coverFocalX}
                focalY={HERO_FRONTMATTER.coverFocalY}
                suggestions={COVER_SUGGESTIONS}
                defaultRatio="16:9"
              />
              <RevisionDiffViewer
                oldRevision={REVISION_OLD}
                newRevision={REVISION_NEW}
                lines={REVISION_DIFF}
              />
              <MediaBinder
                assets={DEMO_ASSETS}
                insertedIds={["asset-manta-catback"]}
                defaultKind="image"
              />
            </div>

            <aside className={styles.newsroomAside}>
              <SeoInspector
                signals={SEO_SIGNALS}
                metaPreview={SEO_META_PREVIEW}
              />
              <section
                aria-label="Editorial comments on draft"
                className={styles.demoStack}
              >
                {DRAFT_COMMENTS.map((comment) => (
                  <CommentThreadCard key={comment.id} comment={comment} />
                ))}
              </section>
              <section
                aria-label="Reusable snippets"
                className={styles.demoStack}
              >
                {PRIMARY_SNIPPETS.map((snippet) => (
                  <ContentBlockCard key={snippet.id} snippet={snippet} compact />
                ))}
              </section>
              <section
                aria-label="Social repurpose queue"
                className={styles.demoStack}
              >
                {PILOT_REPURPOSE.map((output) => (
                  <SocialRepurposeCard
                    key={output.channel}
                    output={output}
                    sourceTitle={HERO_FRONTMATTER.title}
                  />
                ))}
              </section>
            </aside>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
