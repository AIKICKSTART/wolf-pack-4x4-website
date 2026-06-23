import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "search",
  "title": "Search",
  "group": "System",
  "summary": "14 search-surface primitives — global/inline inputs, suggestion + history affordances, faceted filtering, typed result cards (product/file/person/card), results list with query highlighting, relevance meter, empty state, and a search analytics dashboard card.",
  "entries": [
    {
      "key": "search/global-search-bar",
      "family": "search",
      "name": "GlobalSearchBar",
      "label": "Global search bar",
      "description": "Forward-ref command-style search bar with tone variants, slash-shortcut Kbd hint, leading badge / trailing slots, clearable input, and controlled or uncontrolled value.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/global-bar",
      "tags": [
        "search",
        "input",
        "command",
        "shortcut"
      ],
      "status": "captured"
    },
    {
      "key": "search/inline-search-input",
      "family": "search",
      "name": "InlineSearchInput",
      "label": "Inline search input",
      "description": "Labelled list-filter input with debounced onChange, clear button, live result-count status, and a pulse animation on change.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/inline-input",
      "tags": [
        "search",
        "input",
        "filter",
        "debounce"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-suggestion-list",
      "family": "search",
      "name": "SearchSuggestionList",
      "label": "Search suggestion list",
      "description": "Keyboard-navigable ARIA listbox grouping recent/popular/links/custom suggestions with per-kind icons, active-index clamping, and select callbacks.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/suggestions",
      "tags": [
        "search",
        "suggestions",
        "autocomplete",
        "listbox"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-history-row",
      "family": "search",
      "name": "SearchHistoryRow",
      "label": "Search history row",
      "description": "Recallable past-query row with timestamp time element, optional result count, and a remove action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/history-row",
      "tags": [
        "search",
        "history",
        "recent",
        "recall"
      ],
      "status": "captured"
    },
    {
      "key": "search/faceted-filter-sidebar",
      "family": "search",
      "name": "FacetedFilterSidebar",
      "label": "Faceted filter sidebar",
      "description": "Collapsible faceted refine sidebar supporting checkbox, chip, toggle, and range facet groups with applied-count badge and clear-all.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/faceted-sidebar",
      "tags": [
        "search",
        "filter",
        "facets",
        "sidebar"
      ],
      "status": "captured"
    },
    {
      "key": "search/active-filter-chip-bar",
      "family": "search",
      "name": "ActiveFilterChipBar",
      "label": "Active filter chip bar",
      "description": "Horizontal bar of applied-filter chips with group:label display, per-chip dismiss, active count, clear-all, and an empty hint.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/active-filters",
      "tags": [
        "search",
        "filter",
        "chips",
        "facets"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-results-list",
      "family": "search",
      "name": "SearchResultsList",
      "label": "Search results list",
      "description": "Result list with query-highlighted titles/snippets, per-kind tone tags, compact/comfortable variants, total count, and an empty-state slot.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/results-list",
      "tags": [
        "search",
        "results",
        "highlight",
        "list"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-result-card",
      "family": "search",
      "name": "SearchResultCard",
      "label": "Search result card",
      "description": "Web-style result card with title/url/source, query-highlighted snippet, optional thumbnail and tag chips, rendering as anchor or article.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/result-card",
      "tags": [
        "search",
        "result",
        "card",
        "highlight"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-result-product",
      "family": "search",
      "name": "SearchResultProduct",
      "label": "Search result product",
      "description": "Parts-catalog product result with SKU, fitment, price, supplier, in-stock state with on-hand count, thumbnail, and a view-part CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/result-product",
      "tags": [
        "search",
        "result",
        "product",
        "commerce"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-result-file",
      "family": "search",
      "name": "SearchResultFile",
      "label": "Search result file",
      "description": "File/document result row with per-kind icon and tone (pdf/doc/image/sheet/zip), path, size, modified time, and optional owner.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/result-file",
      "tags": [
        "search",
        "result",
        "file",
        "document"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-result-person",
      "family": "search",
      "name": "SearchResultPerson",
      "label": "Search result person",
      "description": "Person result card with avatar or derived-initials fallback, presence dot, role, workshop, and email/phone/chat contact actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/result-person",
      "tags": [
        "search",
        "result",
        "person",
        "contact"
      ],
      "status": "captured"
    },
    {
      "key": "search/relevance-bar",
      "family": "search",
      "name": "RelevanceBar",
      "label": "Relevance bar",
      "description": "Score meter (role=meter) that classifies 0-100 relevance into high/medium/low confidence with a tinted fill and optional chip label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/relevance-bar",
      "tags": [
        "search",
        "relevance",
        "meter",
        "score"
      ],
      "status": "captured"
    },
    {
      "key": "search/no-results-state",
      "family": "search",
      "name": "NoResultsState",
      "label": "No results state",
      "description": "Live-region empty state echoing the failed query with alternative-search suggestions, a request action, and a back-to-all link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/no-results",
      "tags": [
        "search",
        "empty-state",
        "no-results",
        "suggestions"
      ],
      "status": "captured"
    },
    {
      "key": "search/search-analytics-card",
      "family": "search",
      "name": "SearchAnalyticsCard",
      "label": "Search analytics card",
      "description": "Search-analytics dashboard card with total-searches/zero-result KPIs, a trend sparkline, and a sortable top-queries data table with CTR and trend icons.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/search",
      "routeHref": "/ui-primitives/search/analytics",
      "tags": [
        "search",
        "analytics",
        "dashboard",
        "data-viz"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
