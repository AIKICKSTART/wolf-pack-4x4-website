import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./code-diff.module.css"

export const metadata: Metadata = {
  title: "Code diff | UI Primitives",
  description:
    "Code-diff and version-control primitives — diff hunks, side-by-side + inline diffs, commit cards, branch chips, pull request cards, merge-conflict markers, blame strips, file-tree changes, diff stats, review-comment threads with suggestions, approve-changes buttons, mini commit graphs, and cherry-pick previews — plus a full PR review composition.",
}

interface Scene {
  index: string
  title: string
  href: string
  description: string
  accent: "teal" | "amber" | "red" | "green" | "purple" | "neutral"
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    index: "01",
    title: "Diff hunk",
    href: "/ui-primitives/code-diff/diff-hunk",
    description:
      "Single hunk surface with @@ range strip and tone-coded lines (added / removed / context / meta) for old + new line numbers.",
    accent: "teal",
    state: "Stateless · region role",
  },
  {
    index: "02",
    title: "Side-by-side diff",
    href: "/ui-primitives/code-diff/side-by-side-diff",
    description:
      "Two-column diff — old version left, new version right — line numbers per side, paired additions/removals.",
    accent: "amber",
    state: "Stateless · paired",
  },
  {
    index: "03",
    title: "Inline diff",
    href: "/ui-primitives/code-diff/inline-diff",
    description:
      "Single-column unified diff with +/- markers and tone-coded backgrounds. The default GitHub-style view.",
    accent: "red",
    state: "Stateless · compact",
  },
  {
    index: "04",
    title: "Commit card",
    href: "/ui-primitives/code-diff/commit-card",
    description:
      "Commit summary — short sha chip, author avatar, message subject + body, branch chip, signed-status chip, action buttons.",
    accent: "teal",
    state: "Stateless · actions",
  },
  {
    index: "05",
    title: "Branch indicator",
    href: "/ui-primitives/code-diff/branch-indicator",
    description:
      "Compact branch chip — fork icon + name + ahead/behind chip + protection badge (review required / admins only).",
    accent: "amber",
    state: "Stateless · variants",
  },
  {
    index: "06",
    title: "Pull request card",
    href: "/ui-primitives/code-diff/pull-request-card",
    description:
      "PR card — number, title, author, status chip (Draft / Open / Changes / Approved / Merged / Closed), check rows, reviewer avatars.",
    accent: "green",
    state: "Stateless · status-driven",
  },
  {
    index: "07",
    title: "Merge conflict marker",
    href: "/ui-primitives/code-diff/merge-conflict-marker",
    description:
      "Conflict zone — <<<<<<< HEAD / ======= / >>>>>>> branch with explanatory chips and accept-ours / accept-theirs / resolve-manually CTAs.",
    accent: "red",
    state: "Stateless · handlers",
  },
  {
    index: "08",
    title: "Blame strip",
    href: "/ui-primitives/code-diff/blame-strip",
    description:
      "Left rail of per-line commit chips with hover popover showing author, date, and short sha.",
    accent: "neutral",
    state: "Stateless · hover popover",
  },
  {
    index: "09",
    title: "File tree changes",
    href: "/ui-primitives/code-diff/file-tree-changes",
    description:
      "Changed files list — status icon per file (Added / Modified / Renamed / Deleted), +/- per file, distribution bar, total chip.",
    accent: "amber",
    state: "Stateless · selectable",
  },
  {
    index: "10",
    title: "Diff stats bar",
    href: "/ui-primitives/code-diff/diff-stats-bar",
    description:
      "Horizontal stats bar — insertions vs deletions as colored segments, total files chip, legend.",
    accent: "green",
    state: "Stateless · ratio bar",
  },
  {
    index: "11",
    title: "Review comment thread",
    href: "/ui-primitives/code-diff/review-comment-thread",
    description:
      "Code-review thread anchored to a line — avatar, body, reactions, inline code suggestion block, resolve toggle.",
    accent: "teal",
    state: "Stateful · resolve toggle",
  },
  {
    index: "12",
    title: "Approve changes button",
    href: "/ui-primitives/code-diff/approve-changes-button",
    description:
      "Three-up verdict — Approve / Request changes / Comment with required-by-policy chip when branch protection requires.",
    accent: "green",
    state: "Stateful · aria-pressed",
  },
  {
    index: "13",
    title: "Commit graph mini",
    href: "/ui-primitives/code-diff/commit-graph-mini",
    description:
      "SVG mini commit graph — colored lanes for main / feature / hotfix, dots per commit, merge chevrons, sha labels.",
    accent: "purple",
    state: "Stateless · SVG",
  },
  {
    index: "14",
    title: "Cherry-pick preview",
    href: "/ui-primitives/code-diff/cherry-pick-preview",
    description:
      "Cherry-pick preview — selected commit summary, target branch chip, conflict-prediction chip, apply + cancel actions.",
    accent: "purple",
    state: "Stateless · prediction-driven",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  purple: styles.accentPurple,
  neutral: styles.accentNeutral,
}

export default function CodeDiffPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Code diff · 14 primitives + 1 composition"
        title="See every change"
        description="Code-diff and version-control primitives — hunks, side-by-side and inline diffs, commit cards, PR cards, merge-conflict markers, blame strips, file trees, stat bars, review threads, approve buttons, mini commit graphs, and cherry-pick previews. Tuned for the Mufflermen monorepo: quote-instant-pricing flags, the 3D parts catalogue, and bay-availability realtime sync."
      />
      <section className={styles.section} aria-label="Code-diff primitives index">
        <header>
          <span className={styles.kicker}>Index · 14 primitives + Full PR review</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Every primitive renders at full scale in its own sub-route with realistic Mufflermen
            data — feature branches, signed commits from Marcus / Jordan / Sophie, signed-by-policy
            chips. Composition lives under{" "}
            <code style={{ color: "var(--primitive-amber)" }}>/full-pr-review</code>.
          </p>
        </header>
        <div className={styles.grid}>
          {SCENES.map((scene) => (
            <Link
              key={scene.href}
              className={`${styles.thumb} ${ACCENT_CLASS[scene.accent]}`}
              href={scene.href}
            >
              <div className={styles.thumbHead}>
                <span className={styles.thumbIndex}>{scene.index}</span>
                <span className={styles.thumbState}>{scene.state}</span>
              </div>
              <h3 className={styles.thumbTitle}>{scene.title}</h3>
              <p className={styles.thumbCopy}>{scene.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            className={`${styles.thumb} ${styles.accentRed}`}
            href="/ui-primitives/code-diff/full-pr-review"
          >
            <div className={styles.thumbHead}>
              <span className={styles.thumbIndex}>15</span>
              <span className={styles.thumbState}>Composition · bonus</span>
            </div>
            <h3 className={styles.thumbTitle}>Full PR review composition</h3>
            <p className={styles.thumbCopy}>
              PullRequestCard header, DiffStatsBar, FileTreeChanges on the left rail,
              SideBySideDiff with ReviewCommentThread overlaid, ApproveChangesButton at the foot,
              and a CommitGraphMini side panel — every primitive assembled.
            </p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
