/** Shared editorial data model for the Mufflermen blog-system primitive family. */

/** A blog author / workshop voice. */
export interface BlogAuthor {
  /** Display name, e.g. "Macca Reyes". */
  name: string
  /** Short role line, e.g. "Head fabricator". */
  role?: string
  /** Avatar image src. When omitted an initials monogram renders. */
  avatarSrc?: string
  /** Optional profile href. */
  href?: string
  /** One-line bio for the AuthorByline expanded form. */
  bio?: string
}

/** An editorial category / section. */
export interface BlogCategory {
  /** Stable id used for filtering. */
  id: string
  /** Human label, e.g. "Workshop". */
  label: string
  /** Accent applied to the chip. */
  accent?: BlogAccent
}

/** Brand accent palette drawn from the central tokens. */
export type BlogAccent = "red" | "amber" | "teal" | "green"

/** A blog post summary used by cards, grids, and related rows. */
export interface BlogPostSummary {
  /** Stable id / slug. */
  id: string
  /** Post permalink. */
  href: string
  /** Headline. */
  title: string
  /** One-paragraph dek / excerpt. */
  excerpt: string
  /** Hero / card image src. */
  imageSrc?: string
  /** Image alt text. */
  imageAlt?: string
  /** Primary category id (matches a BlogCategory.id). */
  categoryId: string
  /** Human category label (denormalised for standalone cards). */
  categoryLabel: string
  /** Category accent. */
  accent?: BlogAccent
  /** Author. */
  author: BlogAuthor
  /** ISO date string, e.g. "2026-05-21". */
  date: string
  /** Whole-minute reading time. */
  readingMinutes: number
  /** Flags a hero / featured treatment in grids. */
  featured?: boolean
}

/** Rich body content blocks for the BlogPostLayout. */
export type BlogBodyBlock =
  | { kind: "lede"; text: string }
  | { kind: "heading"; id: string; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "pullQuote"; text: string; attribution?: string }
  | { kind: "media"; src: string; alt: string; caption?: string }
  | { kind: "list"; ordered?: boolean; items: ReadonlyArray<string> }

/** A heading entry for the TableOfContents. */
export interface TocEntry {
  /** Matches the heading block id. */
  id: string
  /** Heading label. */
  label: string
}

/** A share target for the share row. */
export interface ShareTarget {
  /** Platform key — drives the inline glyph. */
  id: "copy" | "x" | "facebook" | "linkedin" | "email"
  /** Accessible label, e.g. "Share on X". */
  label: string
  /** Outbound href. Omit for the copy-link action. */
  href?: string
}
