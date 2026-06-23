<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:graphify -->
# Codebase understanding — use graphify first

A persistent knowledge graph of this repo lives in `graphify-out/` (graph.json, GRAPH_REPORT.md, GRAPH_TREE.html). It is the map of the codebase: ~32k symbol nodes / ~58k edges across `src/` and vendored `infra/` subrepos.

**Before** answering an architecture/"where is X"/"what calls Y" question or starting a non-trivial change, consult the graph instead of grepping blind:

```bash
graphify query "how does <feature> work?"     # BFS context (add --dfs to trace one path)
graphify explain "PageHeader"                  # a node + everything it connects to
graphify path "useFetch" "Media"               # shortest path between two symbols
```

Start points: read `graphify-out/GRAPH_REPORT.md` for god nodes (top abstractions: `PageHeader`, `Chip`, `useT`, `useFetch`) and community clusters.

**After** changing code, refresh the graph (AST-only, local tree-sitter, no LLM key needed):

```bash
graphify update .
```

Full rebuild (also key-free) is driven by `.graphify_build.py` via the Python 3.14 interpreter that owns the `graphify` module. Docs/image semantic layers are intentionally not extracted (no LLM backend configured).
<!-- END:graphify -->
