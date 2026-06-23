/**
 * CMS schema — public barrel.
 *
 * A typed, WordPress-style CMS architecture layered on the Primitive DNA and
 * aligned to the existing Payload setup (no fork). Pure data + types only:
 *
 *   - content-block   — reusable + global block defs over the builder model +
 *                       the 14 Payload blocks.
 *   - seo             — SEO + local-SEO + AI-search fields.
 *   - social-schema   — social-preview + schema-markup (JSON-LD) fields.
 *   - header-footer   — global chrome (header/footer/template parts).
 *   - page-template   — page templates + section templates.
 *   - workflow        — draft→review→approved→scheduled→published state machine
 *                       with a human-approval gate, rollback, scheduling.
 *   - version-history — immutable version snapshots + diff + rollback types.
 *   - cms-page        — the managed CMS document tying it all together.
 *   - payload-mapping — the bridge proving alignment with Payload.
 *
 * TOKEN-DRIVEN ONLY: every renderable surface references central `--primitive-*`
 * tokens via the builder model; no literal color/size/space/radius/motion here.
 */

// — Content blocks ————————————————————————————————————————
export {
  GLOBAL_SLOTS,
  PAYLOAD_BLOCK_TYPES,
  isGlobalSlot,
  isPayloadBlockType,
} from "./content-block"
export type {
  ContentBlockDef,
  ContentBlockScope,
  ContentBlockType,
  GlobalBlockDef,
  GlobalSlot,
  PayloadBlockType,
  ReusableBlockDef,
} from "./content-block"

// — SEO ————————————————————————————————————————————————————
export { DAYS_OF_WEEK, DEFAULT_SEO_META } from "./seo"
export type {
  AiSearch,
  DayOfWeek,
  EntityFact,
  FaqPair,
  GeoPoint,
  LocalSeo,
  OpeningHours,
  PostalAddress,
  SeoConfig,
  SeoMeta,
  SitemapChangeFrequency,
} from "./seo"

// — Social + schema markup ————————————————————————————————
export { DEFAULT_SOCIAL_PREVIEW } from "./social-schema"
export type {
  AggregateRating,
  ArticleSchema,
  BreadcrumbItem,
  BreadcrumbSchema,
  CustomSchema,
  FaqPageSchema,
  LocalBusinessSchema,
  OgType,
  OrganizationSchema,
  ProductSchema,
  ServiceSchema,
  SchemaMarkup,
  SocialPreview,
  SocialSchemaConfig,
  TwitterCardType,
} from "./social-schema"

// — Header / footer / global chrome ———————————————————————
export type {
  FooterColumn,
  FooterConfig,
  FooterLayout,
  GlobalChromeConfig,
  HeaderConfig,
  HeaderLayout,
  NavItem,
  SocialLink,
} from "./header-footer"

// — Page + section templates ——————————————————————————————
export { PAGE_TYPES, isPageType } from "./page-template"
export type {
  PageTemplate,
  PageTemplateSlot,
  PageType,
  SectionTemplate,
} from "./page-template"

// — Workflow state machine ————————————————————————————————
export {
  WORKFLOW_ROLE_ORDER,
  WORKFLOW_ROLES,
  WORKFLOW_STATES,
  WORKFLOW_TRANSITIONS,
  availableActions,
  canTransition,
  isWorkflowState,
  roleSatisfies,
  toPageStatus,
} from "./workflow"
export type {
  ApprovalRecord,
  PublishSchedule,
  TransitionCheck,
  WorkflowAction,
  WorkflowRole,
  WorkflowState,
  WorkflowStatus,
  WorkflowTransition,
} from "./workflow"

// — Version history + rollback ————————————————————————————
export {
  findVersion,
  latestVersion,
  nextVersionNumber,
} from "./version-history"
export type {
  PageVersion,
  RollbackRequest,
  RollbackResult,
  VersionDiff,
  VersionDiffEntry,
  VersionHistory,
  VersionTrigger,
} from "./version-history"

// — CMS page document —————————————————————————————————————
export { CMS_PAGE_SCHEMA_VERSION } from "./cms-page"
export type { CmsPage } from "./cms-page"

// — Payload alignment bridge ——————————————————————————————
export {
  SEO_FIELD_MAP,
  blockTypesMissingFromPayload,
  persistsToPayload,
  toPayloadMarketingPageView,
  toPayloadSeoGroup,
  toPayloadSocialGroup,
  toPayloadStatus,
} from "./payload-mapping"
export type {
  PayloadMarketingPageView,
  PayloadSeoGroup,
  PayloadSocialGroup,
  PayloadStatus,
} from "./payload-mapping"
