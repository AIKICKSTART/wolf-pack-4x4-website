import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "forms-system",
  "title": "Forms system",
  "group": "System",
  "summary": "Canonical forms atlas: a source-of-truth board that catalogues every form family (gallery canonical + compact ops patterns) with live demos, a domain matrix, and a reusable cross-reference aside for consuming surfaces.",
  "entries": [
    {
      "key": "forms-system/forms-atlas",
      "family": "forms-system",
      "name": "FormsAtlas",
      "label": "Forms atlas",
      "description": "Source-of-truth board with hero coverage counters, a domain matrix, and live local-state demos for every canonical and compact form pattern.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-system",
      "tags": [
        "forms",
        "catalog",
        "atlas",
        "reference"
      ],
      "status": "captured"
    },
    {
      "key": "forms-system/form-pattern-references",
      "family": "forms-system",
      "name": "FormPatternReferences",
      "label": "Form pattern references",
      "description": "Aside that lists the canonical form patterns a surface consumes, linking each by id back into the forms atlas anchors.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/forms-system",
      "tags": [
        "forms",
        "reference",
        "cross-link"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
