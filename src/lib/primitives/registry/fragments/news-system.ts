import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  family: "news-system",
  title: "News System",
  group: "Content",
  summary:
    "Newsroom primitives for editorial publishing — a layout-toggling article index, story cards, breaking-news banner, featured hero, press-release layout, category tabs, scrolling ticker, and a shared article meta row, all driven by a typed NewsItem model.",
  entries: [
    {
      key: "news-system/news-index",
      family: "news-system",
      name: "NewsIndex",
      label: "News index",
      description:
        "Newsroom article listing with a grid/list layout toggle that renders a collection of NewsCard items under a kicker and title.",
      kind: "section",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#news-index",
      tags: ["news", "index", "listing", "grid", "list"],
      status: "improved",
    },
    {
      key: "news-system/news-card",
      family: "news-system",
      name: "NewsCard",
      label: "News card",
      description:
        "Single story card with a tone-coded rail, meta row, headline link, summary, and optional author byline; renders as a vertical card or horizontal list row.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#news-card",
      tags: ["news", "card", "article", "tone"],
      status: "improved",
    },
    {
      key: "news-system/breaking-news-banner",
      family: "news-system",
      name: "BreakingNewsBanner",
      label: "Breaking news banner",
      description:
        "Dismissible alert banner with a breaking-news badge, headline link, relative timestamp, and read-more CTA.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#breaking-news-banner",
      tags: ["news", "banner", "breaking", "alert"],
      status: "improved",
    },
    {
      key: "news-system/featured-news-hero",
      family: "news-system",
      name: "FeaturedNewsHero",
      label: "Featured news hero",
      description:
        "Lead-story hero pairing a tone-coded kicker, headline, summary, meta row, and CTA with an optional sidebar list of secondary stories.",
      kind: "section",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#featured-news-hero",
      tags: ["news", "hero", "featured", "lead-story"],
      status: "improved",
    },
    {
      key: "news-system/press-release-layout",
      family: "news-system",
      name: "PressReleaseLayout",
      label: "Press release layout",
      description:
        "Formal press-release document with dateline, standfirst, multi-section body, and a media-contact footer with email and phone links.",
      kind: "section",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#press-release-layout",
      tags: ["news", "press-release", "document", "contact"],
      status: "improved",
    },
    {
      key: "news-system/news-category-tabs",
      family: "news-system",
      name: "NewsCategoryTabs",
      label: "News category tabs",
      description:
        "Keyboard-navigable ARIA tablist of news categories with per-tab counts, tone styling, and an optional aggregated All tab.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#news-category-tabs",
      tags: ["news", "tabs", "category", "filter"],
      status: "improved",
    },
    {
      key: "news-system/news-ticker-strip",
      family: "news-system",
      name: "NewsTickerStrip",
      label: "News ticker strip",
      description:
        "Horizontally scrolling newswire ticker with a fixed left cap and tone-tagged headline entries duplicated for a seamless marquee.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#news-ticker-strip",
      tags: ["news", "ticker", "marquee", "newswire"],
      status: "improved",
    },
    {
      key: "news-system/news-meta-row",
      family: "news-system",
      name: "NewsMetaRow",
      label: "News meta row",
      description:
        "Compact article metadata row showing a tone-coded category tag, source, relative or absolute timestamp, and optional read-time.",
      kind: "primitive",
      importPath: "@/app/ui-primitives/components/news-system",
      routeHref: "/ui-primitives/news-system#news-meta-row",
      tags: ["news", "meta", "byline", "timestamp"],
      status: "improved",
    },
  ],
}

export default manifest
