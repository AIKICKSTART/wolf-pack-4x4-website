/**
 * Shared types for the docs-suite primitive family.
 *
 * The Mufflermen docs platform covers four product surfaces:
 *  - Operator Manual (the workshop floor playbook)
 *  - Trade Account API (the supplier-portal REST API)
 *  - Pricing Engine (the quoting + margin engine)
 *  - Hermes Chat Playbook (the AI receptionist runbook)
 *
 * Every primitive in this folder is content-pure: it accepts the data and
 * renders an accessible, themable surface. None of them fetch.
 */

export type DocsSurfaceId =
  | "operator-manual"
  | "trade-account-api"
  | "pricing-engine"
  | "hermes-chat-playbook"

export interface DocsSurface {
  id: DocsSurfaceId
  label: string
}

export type DocsDifficulty = "starter" | "intermediate" | "advanced"

export type DocsVersionId = "v1.0" | "v2.0" | "v3.0-beta"

export interface DocsVersion {
  id: DocsVersionId
  label: string
  isCurrent?: boolean
  isBreaking?: boolean
  releasedAt: string
  releasedIso: string
}

export interface DocsContributor {
  initials: string
  name: string
  role: string
}

export interface DocsArticleSummary {
  id: string
  title: string
  surface: DocsSurfaceId
  surfaceLabel: string
  category: string
  excerpt: string
  difficulty: DocsDifficulty
  readMinutes: number
  updatedAt: string
  updatedIso: string
  href: string
}

export interface DocsCategoryFilter {
  id: string
  label: string
  count: number
}

/* MDX block renderer model */

export type MdxBlockKind =
  | "prose"
  | "code"
  | "note"
  | "warning"
  | "diff"
  | "tabs"

export interface MdxProseBlock {
  kind: "prose"
  id: string
  html: string
}

export interface MdxCodeBlock {
  kind: "code"
  id: string
  language: string
  filename?: string
  code: string
}

export interface MdxNoteBlock {
  kind: "note"
  id: string
  title: string
  body: string
}

export interface MdxWarningBlock {
  kind: "warning"
  id: string
  title: string
  body: string
}

export interface MdxDiffLine {
  type: "added" | "removed" | "context"
  text: string
}

export interface MdxDiffBlock {
  kind: "diff"
  id: string
  filename: string
  lines: ReadonlyArray<MdxDiffLine>
}

export interface MdxTabPanel {
  id: string
  label: string
  language: string
  code: string
}

export interface MdxTabsBlock {
  kind: "tabs"
  id: string
  tabs: ReadonlyArray<MdxTabPanel>
}

export type MdxBlock =
  | MdxProseBlock
  | MdxCodeBlock
  | MdxNoteBlock
  | MdxWarningBlock
  | MdxDiffBlock
  | MdxTabsBlock

/* Footer / nav */

export interface DocsNavTarget {
  title: string
  href: string
  category: string
  relationHint?: string
}

/* Search modal */

export type DocsSearchGroupKind = "manual" | "api" | "playbook" | "history"

export interface DocsSearchGroup {
  id: string
  kind: DocsSearchGroupKind
  label: string
  items: ReadonlyArray<DocsSearchHit>
}

export interface DocsSearchHit {
  id: string
  title: string
  snippet: string
  href: string
  surfaceLabel: string
  kbdSequence?: ReadonlyArray<string>
}

/* TOC rail */

export interface DocsTocItem {
  id: string
  label: string
  depth: 2 | 3 | 4
}

/* Meta card */

export interface DocsArticleMeta {
  versionLabel: string
  versionIso: string
  publishedLabel: string
  publishedIso: string
  updatedLabel: string
  updatedIso: string
  author: DocsContributor
  editor: DocsContributor
  contributors: ReadonlyArray<DocsContributor>
}

/* Feedback strip */

export type DocsFeedbackVote = "helpful" | "not-helpful"

/* Related articles grid */

export interface DocsRelatedArticle {
  id: string
  title: string
  surfaceLabel: string
  href: string
  readMinutes: number
  excerpt: string
}

/* Glossary tooltip */

export interface DocsGlossaryEntry {
  term: string
  definition: string
  href?: string
}

/* API reference card */

export type DocsApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export interface DocsApiQueryParam {
  name: string
  type: string
  required: boolean
  description: string
}

export interface DocsApiTryItLink {
  label: string
  href: string
}

/* Changelog strip */

export type DocsChangelogKind = "added" | "fixed" | "changed" | "deprecated"

export interface DocsChangelogEntry {
  id: string
  kind: DocsChangelogKind
  summary: string
  occurredAt: string
  occurredIso: string
  href?: string
}

/* Breadcrumb trail */

export interface DocsBreadcrumbCrumb {
  label: string
  href?: string
}

export interface DocsPageTreeNode {
  label: string
  href: string
  isCurrent?: boolean
}

/* Edit-on-GitHub banner */

export interface DocsCommitInfo {
  sha: string
  message: string
  authorInitials: string
  authorName: string
  committedAt: string
  committedIso: string
}
