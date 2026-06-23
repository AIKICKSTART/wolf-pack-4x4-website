# CMS Architecture — WordPress-style CMS on the Primitive DNA

> Typed schema + editorial workflow for the Oak Flats Mufflermen CMS. This is
> **types + a doc only** — no live Payload edits. Every file lives under
> `src/app/ui-primitives/builder/cms-schema/` and is pure data/types. Every
> renderable surface is **token-driven** via the builder model's `StyleProfile`
> (central `--primitive-*` tokens) — no literal color/size/space/radius/motion.

---

## 1. Where this sits

The CMS is **Phase A** of the unified business system. It is built on three
layers that already exist and that this schema **aligns with, never forks**:

| Layer | Owns | This schema's relationship |
|---|---|---|
| **Builder data model** (`../model`) | The renderable tree: `PageConfig`, `Block`, `BlockManifest`, `PropsSchema`, `StyleProfile`, the `--primitive-*` token contract, `PageStatus`. | **Reused verbatim.** `CmsPage.config` *is* a `PageConfig`. Token deps, prop schemas, and editable fields are the builder's types, re-exported, not re-declared. |
| **Payload blocks** (`src/lib/cms/blocks/payload-blocks.ts`) | The 14 persisted content blocks (`cta`, `callout`, `quote`, `gallery`, `video`, `embed`, `accordion`, `checklist`, `divider`, `timeline`, `poll`, `table`, `code`, `codeSandbox`). | **Mirrored 1:1.** `PAYLOAD_BLOCK_TYPES` is the canonical slug tuple; a CMS block whose `blockType` matches a slug round-trips to a stored row. |
| **Payload collection** (`src/collections/MarketingPages.ts` + `shared.ts`) | The page document: `title`, `slug`, `path`, `pageType`, `seo` group, `social` group, native `versions.drafts`. | **Projected onto.** `payload-mapping.ts` exposes pure helpers that flatten a `CmsPage` onto the exact Payload field names. |

The mental model is **WordPress**, mapped onto our primitives:

| WordPress concept | This schema |
|---|---|
| Block | `ContentBlockDef` (over a builder `BlockManifest`) |
| Reusable block / synced pattern | `ReusableBlockDef` |
| Template part (header/footer/banner) | `GlobalBlockDef` + `HeaderConfig` / `FooterConfig` |
| Block pattern | `SectionTemplate` |
| Page template | `PageTemplate` |
| Post status + scheduling | `WorkflowState` + `PublishSchedule` |
| Revisions | `PageVersion` / `VersionHistory` |

---

## 2. File map

```
cms-schema/
├── content-block.ts    Reusable + global block defs; PAYLOAD_BLOCK_TYPES tuple
├── seo.ts              SEO + local-SEO (NAP/geo/hours) + AI-search fields
├── social-schema.ts    Social-preview (OG/Twitter) + schema-markup (JSON-LD union)
├── header-footer.ts    Global chrome: header/footer/template parts, nav data
├── page-template.ts    PageType (Payload-aligned) + PageTemplate + SectionTemplate
├── workflow.ts         State machine: states, roles, transition table, guards
├── version-history.ts  Immutable snapshots, diff, rollback (revert semantics)
├── cms-page.ts         CmsPage — the managed document tying it all together
├── payload-mapping.ts  The alignment bridge: pure projections onto Payload fields
├── index.ts            Public barrel
├── _mock-data.ts       End-to-end fixtures (one service page through the flow)
└── cms-architecture.md This document
```

Each source file is < 800 lines and single-responsibility.

---

## 3. The document model

```
CmsPage                         ← the managed unit (list / permission / publish)
├── pageType: PageType          ← homepage | service | location | parts | standard
│                                 (identical to MarketingPages.pageType)
├── path: string                ← MarketingPages.path (unique canonical route)
├── templateId?                 ← lineage to the PageTemplate it was created from
├── config: PageConfig          ← THE RENDERABLE CORE, owned by ../model
│   ├── blocks: Block[]         ← each Block.type is a blockType
│   ├── styleProfile            ← token selections (no literals)
│   └── meta                    ← slug, title, …
├── seo: SeoConfig              ← meta (→ Payload seo group) + local + ai
├── social: SocialSchemaConfig  ← preview (→ Payload social group) + schemaMarkup[]
├── chromeOverride?             ← per-page header/footer override
├── workflow: WorkflowStatus    ← state + approvals[] + schedule
└── history: VersionHistory     ← versions[] (immutable snapshots)
```

`CmsPage` is deliberately a **superset envelope**: it never duplicates what
`PageConfig` already holds; it adds the editorial concerns (SEO/social/workflow/
history) around it.

---

## 4. SEO, local-SEO, AI-search

`SeoConfig` (`seo.ts`) is a **typed superset of the Payload `seo` group**:

- `meta` — `metaTitle`, `metaDescription`, `canonicalPath`, `focusKeyword`,
  `noIndex` map **1:1** onto the Payload `seo` group (see `SEO_FIELD_MAP`),
  plus robots/sitemap hints (`noFollow`, `sitemapPriority`, `changeFrequency`).
- `local` — NAP (`businessName`/`address`/`telephone`), `geo`, `serviceAreas`,
  per-day `openingHours`, `googleBusinessProfile`, `priceRange`. This is the
  source for the `LocalBusiness` JSON-LD.
- `ai` — the answer-engine surface: `canonicalAnswer`, `primaryQuestion`,
  `faqs`, `entityFacts`, and `allowAiCitation` / `allowAiTraining` crawler
  opt-in, so a page is cleanly citable by LLM-backed search.

Local-SEO and AI-search have **no Payload counterpart yet** — they live in the
CMS layer and feed structured data. Adding them to Payload later is additive.

---

## 5. Social preview + schema markup

`social-schema.ts`:

- `SocialPreview` is the **superset of the Payload `social` group**:
  `title`/`description`/`imageId` map onto `social.title`/`social.description`/
  `social.image` (a media relation), plus OG/Twitter-card sharpening.
- `SchemaMarkup` is a **discriminated union** (`kind` = the schema.org `@type`):
  `LocalBusiness`, `Service`, `Product`, `FAQPage`, `BreadcrumbList`,
  `Article`, `Organization`, and a `Custom` escape hatch. The renderer emits one
  `<script type="application/ld+json">` per entry. `FAQPage` reuses the SEO
  `FaqPair` shape so AI-search and JSON-LD share **one** source of FAQ truth.

---

## 6. Header / footer / global chrome

`header-footer.ts` models the site-wide **template parts**. A `HeaderConfig` /
`FooterConfig` carries pure navigation data + a borrowed `StyleProfile` (token
selections) — never literal colors/spacing. They can reference `GlobalBlockDef`s
(announcement bar, CTA banner, newsletter) by id. `GlobalChromeConfig` bundles
header + footer + always-on global blocks; a page may override it via
`CmsPage.chromeOverride`.

---

## 7. Templates

- `SectionTemplate` — a saved `Block[]` subtree (a "pattern"); inserting it
  deep-copies the blocks with fresh ids.
- `PageTemplate` — a starting layout for a whole page: ordered `slots` (each can
  suggest a default section, constrain allowed categories, mark
  required/repeatable) + a default `StyleProfile` + default SEO/social.
  `PageTemplate.pageType` is the **Payload-aligned** `PageType`, so a template
  produces a page that round-trips to a Payload `pageType`.

---

## 8. The editorial workflow (state machine)

`workflow.ts` — the requested lifecycle, with a **human-approval gate before
production** and **rollback**:

```
                 submit            approve            publish
   ┌────────┐ ─────────▶ ┌────────┐ ───────▶ ┌──────────┐ ─────────▶ ┌───────────┐
   │ draft  │            │ review │          │ approved │            │ published │
   └────────┘ ◀───────── └────────┘          └──────────┘ ◀───────── └───────────┘
       ▲  ▲     withdraw    │  │ reject          │  ▲   unpublish          │
       │  │                 │  ▼                 │  │ withdraw             │ archive
       │  │ withdraw   ┌──────────┐   schedule   ▼  │                      ▼
       │  └─────────── │ rejected │         ┌───────────┐            ┌──────────┐
       │   (to draft)  └──────────┘         │ scheduled │ ─publish─▶ │ archived │
       │                                    └───────────┘   (fires)  └──────────┘
       └──────────────────── restore ──────────────────────────────────────┘
```

Design points:

- **The gate is structural.** The only edges into `approved` / `scheduled` /
  `published` require role `approver`+ (`roleSatisfies`). `submit` is the only
  way out of `draft` toward prod, so **an author can never self-publish**.
- **Single source of truth:** `WORKFLOW_TRANSITIONS` declares every legal edge
  (action, from, to, `minRole`, `affectsProduction`, description). The UI
  derives buttons from it via `availableActions`; `canTransition` is the pure
  guard. No edge exists outside the table.
- **Scheduling:** `schedule` parks an approved page in `scheduled` with a
  `PublishSchedule` (`scheduledFor`, IANA `timezone`, optional `expiresAt`); the
  scheduler later fires `publish`.
- **Audit:** every gate decision is an `ApprovalRecord` (who, role, decision,
  when, note) on `WorkflowStatus.approvals`, so production changes are
  attributable.
- **Storage alignment:** `toPageStatus()` collapses the 7 CMS states onto the
  builder model's 4-state `PageStatus`; `toPayloadStatus()` collapses them onto
  Payload's `_status` (`draft | published`). The fine-grained state is recovered
  from `WorkflowStatus`, not from `_status`.

---

## 9. Versioning + rollback

`version-history.ts` aligns with Payload's native `versions.drafts` on
`MarketingPages`:

- Every save snapshots the `PageConfig` into an **immutable** `PageVersion`
  (frozen `snapshot`, `versionNumber`, `workflowState` at capture, `trigger`,
  `label`, `changeSummary`, author, `isPublished`).
- `VersionHistory` is the ordered log (+ `publishedVersionId`).
- **Rollback is revert, not reset:** a `RollbackRequest` creates a *new* version
  whose snapshot equals the target's (`rolledBackFrom` records provenance),
  preserving the full forward history — Git-revert semantics.
- `VersionDiff` / `VersionDiffEntry` describe a field-level diff (path + kind +
  before/after) for the compare UI.

---

## 10. How it maps onto the existing Payload blocks (the bridge)

`payload-mapping.ts` is the load-bearing alignment contract. It imports **nothing
from Payload at runtime** — it is types + lookup tables + pure projections, so it
proves alignment without dragging the Payload config into the builder bundle.

| CMS schema | Payload | Helper |
|---|---|---|
| `SeoConfig.meta.*` | `MarketingPages.seo.*` (`metaTitle`, `metaDescription`, `canonicalPath`, `focusKeyword`, `noIndex`) | `toPayloadSeoGroup()` (rows in `SEO_FIELD_MAP`) |
| `SocialPreview` | `MarketingPages.social.*` (`title`, `description`, `image`) | `toPayloadSocialGroup()` |
| `WorkflowState` | `MarketingPages._status` (`draft`/`published`) | `toPayloadStatus()` |
| `WorkflowState` | builder `PageStatus` (4-state) | `toPageStatus()` (in `workflow.ts`) |
| `ContentBlockDef.blockType` | a `contentBlocks` slug | `persistsToPayload()`, `isPayloadBlockType()` |
| CMS block-type set | the 14 Payload slugs | `blockTypesMissingFromPayload()` — drift guard for tests |
| whole `CmsPage` | `MarketingPages` field surface | `toPayloadMarketingPageView()` |

**Block alignment rule:** the CMS never invents block field shapes. Each of the
14 `blockType`s maps to the matching Payload `Block` (whose `interfaceName` —
e.g. `CtaBlockData` — already mirrors the builder's `*Payload` interface). A
stored Payload row therefore flows through the existing `mapBlocks` into a
`BlockData<T>` and renders with **no per-block transform**. CMS-only
compositions (section templates, builder-only blocks) have a `blockType` that is
*not* a Payload slug and simply don't persist as Payload blocks — they live in
the `PageConfig` tree.

**What is additive (no Payload change required now):** local-SEO, AI-search,
structured-data graph, reusable/global blocks, page/section templates, the
fine-grained workflow + approval audit, and the version metadata. All of it
layers around the existing collection; when any piece graduates into Payload it
is a purely additive field/collection, never a breaking change.

---

## 11. Guarantees

- **No fork.** Block slugs, page types, and SEO/social field names match Payload
  exactly; `payload-mapping.ts` is the diffable proof.
- **Token-driven only.** No literal design values in any file; all skinning is a
  `StyleProfile` of `--primitive-*` token selections.
- **Strict TS, no `any`.** Untrusted input is `unknown` + narrowed; unions over
  enums; explicit types on every export.
- **No new deps, no `console.log`, files < 800 lines.**
- **Types + a doc; zero live Payload edits.**
