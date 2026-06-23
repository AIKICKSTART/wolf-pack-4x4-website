import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "code-diff",
  "title": "Code diff",
  "group": "System",
  "summary": "14 code-review and version-control primitives — unified/side-by-side/inline diffs, hunks, blame, commit + PR cards, branch and merge-conflict indicators, review threads, approval controls, and an SVG commit graph — over a shared code-diff-types contract.",
  "entries": [
    {
      "key": "code-diff/diff-hunk",
      "family": "code-diff",
      "name": "DiffHunk",
      "label": "Diff hunk",
      "description": "Single unified-diff hunk with an @@ range header and added/removed/context/meta lines with dual old/new gutters.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/diff-hunk",
      "tags": [
        "diff",
        "git",
        "code"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/side-by-side-diff",
      "family": "code-diff",
      "name": "SideBySideDiff",
      "label": "Side-by-side diff",
      "description": "Two-column diff that pairs unified diff lines into matched left (old) and right (new) rows with per-side labels and refs.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/side-by-side-diff",
      "tags": [
        "diff",
        "git",
        "split"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/inline-diff",
      "family": "code-diff",
      "name": "InlineDiff",
      "label": "Inline diff",
      "description": "Single-column inline diff with a file-path/commit-ref header and added/removed/context lines with dual gutters.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/inline-diff",
      "tags": [
        "diff",
        "git",
        "code"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/commit-card",
      "family": "code-diff",
      "name": "CommitCard",
      "label": "Commit card",
      "description": "Commit summary card with short-sha chip, author avatar/email, signed badge, branch chip, timestamp, and optional action buttons.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/commit-card",
      "tags": [
        "commit",
        "git",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/branch-indicator",
      "family": "code-diff",
      "name": "BranchIndicator",
      "label": "Branch indicator",
      "description": "Inline branch pill showing fork icon, branch name, ahead/behind commit counts, and a protection-rule chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/branch-indicator",
      "tags": [
        "branch",
        "git",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/pull-request-card",
      "family": "code-diff",
      "name": "PullRequestCard",
      "label": "Pull request card",
      "description": "PR summary card with number, title, lifecycle status chip, from/to branches, CI check rows, and a stacked reviewer avatar row.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/pull-request-card",
      "tags": [
        "pull-request",
        "git",
        "review"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/merge-conflict-marker",
      "family": "code-diff",
      "name": "MergeConflictMarker",
      "label": "Merge conflict marker",
      "description": "Conflict resolver showing ours/separator/theirs zones with the git conflict markers plus accept-ours/accept-theirs/resolve-manually actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/merge-conflict-marker",
      "tags": [
        "merge",
        "conflict",
        "git"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/blame-strip",
      "family": "code-diff",
      "name": "BlameStrip",
      "label": "Blame strip",
      "description": "Per-line git blame view pairing a sha/author rail (with hover popover of author, sha, date) against the code lines.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/blame-strip",
      "tags": [
        "blame",
        "git",
        "annotate"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/file-tree-changes",
      "family": "code-diff",
      "name": "FileTreeChanges",
      "label": "File tree changes",
      "description": "Changeset file list with per-file kind icon, insertion/deletion counts, an 8-cell add/del distribution bar, totals, and selectable rows.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/file-tree-changes",
      "tags": [
        "files",
        "changeset",
        "git"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/diff-stats-bar",
      "family": "code-diff",
      "name": "DiffStatsBar",
      "label": "Diff stats bar",
      "description": "Summary stat bar with insertion/deletion counts, files-changed chip, and a proportional add/del segmented track with legend.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/diff-stats-bar",
      "tags": [
        "stats",
        "diff",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/review-comment-thread",
      "family": "code-diff",
      "name": "ReviewCommentThread",
      "label": "Review comment thread",
      "description": "File/line-anchored review thread of avatar messages with reactions, inline suggested-change blocks, and a resolve-toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/review-comment-thread",
      "tags": [
        "review",
        "comments",
        "thread"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/approve-changes-button",
      "family": "code-diff",
      "name": "ApproveChangesButton",
      "label": "Approve changes button",
      "description": "Review-verdict control group (Approve / Request changes / Comment) with pressed state and an optional branch-policy approvals chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/approve-changes-button",
      "tags": [
        "review",
        "approval",
        "control"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/commit-graph-mini",
      "family": "code-diff",
      "name": "CommitGraphMini",
      "label": "Commit graph mini",
      "description": "Compact SVG commit graph rendering main/feature/hotfix lanes with dots, merge chevrons, and short-sha/branch labels.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/commit-graph-mini",
      "tags": [
        "graph",
        "commit",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "code-diff/cherry-pick-preview",
      "family": "code-diff",
      "name": "CherryPickPreview",
      "label": "Cherry-pick preview",
      "description": "Cherry-pick confirmation card showing the source commit, target branch chip, conflict-prediction chip, and apply/cancel actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/code-diff",
      "routeHref": "/ui-primitives/code-diff/cherry-pick-preview",
      "tags": [
        "cherry-pick",
        "git",
        "preview"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
