"use client"

import { useState } from "react"

import {
  ApiReferenceCard,
  ArticleMetaCard,
  BreadcrumbDocTrail,
  ChangelogStrip,
  DocsSearchModal,
  EditOnGithubBanner,
  FeedbackHelpfulStrip,
  FooterNavRow,
  GlossaryTooltipTrigger,
  MdxBlockRenderer,
  RelatedArticlesGrid,
  TableOfContentsRail,
  VersionSelector,
} from "../../components/docs-suite"
import type { DocsVersionId } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import {
  DOCS_BLOCKS,
  DOCS_BREADCRUMB,
  DOCS_CHANGELOG,
  DOCS_COMMIT,
  DOCS_GLOSSARY,
  DOCS_META,
  DOCS_NEXT,
  DOCS_PAGE_TREE,
  DOCS_PREVIOUS,
  DOCS_RELATED,
  DOCS_SEARCH_GROUPS,
  DOCS_TOC,
  DOCS_VERSIONS,
} from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export default function FullDocsScenePage() {
  const [version, setVersion] = useState<DocsVersionId>("v2.0")
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false)

  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 15"
        title="Full docs scene"
        description="The complete docs page composition — breadcrumb, version selector, edit-on-GitHub banner, meta card, glossary inline, MDX body, TOC rail, changelog, feedback, related, and the footer nav row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Full docs scene" },
        ]}
      />
      <section
        className={[styles.canvas, styles.canvasWide].join(" ")}
        aria-label="Full docs scene demo"
      >
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            What the real /docs/[surface]/[slug] route renders. Proves every primitive lines up
            without overlap, with or without the TOC rail visible.
          </p>
        </div>

        <div className={styles.stage}>
          <div className={styles.stageRow}>
            <BreadcrumbDocTrail items={DOCS_BREADCRUMB} pageTree={DOCS_PAGE_TREE} />
            <div style={{ display: "flex", gap: "var(--primitive-space-2-5)", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                style={{
                  appearance: "none",
                  cursor: "pointer",
                  background: "var(--primitive-control-surface)",
                  border: "1px solid var(--primitive-line)",
                  color: "var(--primitive-text-strong)",
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: "var(--primitive-text-2xs)",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0 var(--primitive-space-3)",
                  height: 38,
                  borderRadius: "var(--primitive-radius-md)",
                }}
              >
                Open palette
              </button>
              <VersionSelector versions={DOCS_VERSIONS} value={version} onChange={setVersion} />
            </div>
          </div>

          <EditOnGithubBanner
            repo="mufflermen/docs"
            editHref="https://github.com/mufflermen/docs/edit/main/trade-account-api/tokens.mdx"
            commit={DOCS_COMMIT}
          />

          <div className={styles.fullArticle}>
            <div className={styles.fullArticleMain}>
              <div className={styles.glossaryProse}>
                <p>
                  This page documents how to issue a scoped trade-account API token. Before
                  reading further, you should understand the{" "}
                  <GlossaryTooltipTrigger entry={DOCS_GLOSSARY} /> the pricing engine enforces
                  — token scopes are bound to that floor too.
                </p>
              </div>

              <MdxBlockRenderer blocks={DOCS_BLOCKS} />

              <ApiReferenceCard
                method="POST"
                path="/v2/tokens"
                description="Issue a scoped trade-account API token for one supplier portal."
                parameters={[
                  {
                    name: "supplier",
                    type: "string",
                    required: true,
                    description: "Supplier slug.",
                  },
                  {
                    name: "scopes",
                    type: "string[]",
                    required: true,
                    description: "Allowed scopes from stock.read, stock.write, orders.read, orders.write.",
                  },
                ]}
                tryIt={{
                  label: "Try in sandbox",
                  href: "https://trade-sandbox.mufflermen.com.au/console",
                }}
              />

              <FeedbackHelpfulStrip />

              <RelatedArticlesGrid articles={DOCS_RELATED} />

              <FooterNavRow previous={DOCS_PREVIOUS} next={DOCS_NEXT} />
            </div>

            <div className={styles.fullArticleAside}>
              <ArticleMetaCard meta={DOCS_META} />
              <TableOfContentsRail items={DOCS_TOC} />
              <ChangelogStrip
                entries={DOCS_CHANGELOG.slice(0, 3)}
                viewAllHref="/ui-primitives/docs-suite/changelog-strip"
              />
            </div>
          </div>
        </div>

        <DocsSearchModal
          open={paletteOpen}
          groups={DOCS_SEARCH_GROUPS}
          onClose={() => setPaletteOpen(false)}
        />
      </section>
    </main>
  )
}
