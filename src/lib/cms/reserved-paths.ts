/**
 * First URL segments owned by the application's static routes (or the server
 * infrastructure). CMS page-builder pages must not publish under these — Next
 * route precedence means a static route always wins, so a page stored at a
 * reserved path would silently never render. This set is the registry to
 * update whenever a new top-level static route is added.
 *
 * `/campaigns/*` is intentionally NOT reserved for MarketingPages: the
 * dedicated campaigns route serves those documents by slug.
 */
export const RESERVED_FIRST_SEGMENTS: ReadonlySet<string> = new Set([
  "about",
  "about-us",
  "admin",
  "api",
  "areas",
  "blog",
  "contact",
  "contact-us",
  "control",
  "faq",
  "gallery",
  "graphql",
  "graphql-playground",
  "hero-frame",
  "llms.txt",
  "locations",
  "media",
  "parts",
  "privacy",
  "privacy-policy",
  "products",
  "quote",
  "services",
  "terms",
  "ui-primitives",
  "_next",
])

/** First segment of a normalized public path ("/specials/sale" -> "specials"). */
export function firstPathSegment(path: string): string {
  return path.replace(/^\/+/, "").split("/")[0] ?? ""
}

/** True when a CMS page may publish at this path (not shadowed by app routes). */
export function isPublishablePath(path: string): boolean {
  const segment = firstPathSegment(path)
  if (!segment) return false
  return !RESERVED_FIRST_SEGMENTS.has(segment.toLowerCase())
}
