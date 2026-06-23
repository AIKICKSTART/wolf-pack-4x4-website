import { BRANCH_KIND_TONE, type BranchPreview } from "./deploy-console-types"
import styles from "./branch-preview-deck.module.css"
import shell from "./deploy-console.module.css"

export interface BranchPreviewDeckProps {
  previews: ReadonlyArray<BranchPreview>
  caption?: string
  kicker?: string
  className?: string
}

const KIND_LABEL: Record<BranchPreview["kind"], string> = {
  main: "Trunk",
  feature: "Feature",
  hotfix: "Hotfix",
  release: "Release",
}

function toneClassFor(kind: BranchPreview["kind"]): string {
  switch (BRANCH_KIND_TONE[kind]) {
    case "red":
      return shell.toneRed
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    case "green":
      return shell.toneGreen
    case "violet":
      return shell.toneViolet
    default:
      return shell.toneNeutral
  }
}

export function BranchPreviewDeck({
  previews,
  caption = "Preview deployments",
  kicker = "Branch previews",
  className,
}: BranchPreviewDeckProps) {
  return (
    <section
      className={[shell.shell, styles.deck, className].filter(Boolean).join(" ")}
      aria-label={`${caption} — ${previews.length} branches`}
    >
      <header className={shell.shellHead}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>{kicker}</span>
          <h3 className={shell.title}>{caption}</h3>
          <p className={shell.subtitle}>
            Every push spins up an isolated preview at{" "}
            <code className={styles.host}>&lt;branch&gt;.preview.mufflermen.com.au</code>
          </p>
        </div>
        <span className={shell.chip + " " + shell.toneTeal}>
          {previews.length} active
        </span>
      </header>

      <ul className={styles.grid}>
        {previews.map((preview) => {
          const toneCls = toneClassFor(preview.kind)
          return (
            <li key={preview.branch} className={[styles.card, toneCls].join(" ")}>
              <div className={styles.thumb} aria-hidden="true">
                <span className={styles.thumbGlyph}>{preview.thumbGlyph}</span>
                <span className={styles.thumbHost}>{preview.previewUrl.replace(/^https?:\/\//, "")}</span>
              </div>
              <div className={styles.body}>
                <header className={styles.head}>
                  <span className={[shell.chip, toneCls].join(" ")}>
                    {KIND_LABEL[preview.kind]}
                  </span>
                  {preview.prNumber ? (
                    <span className={styles.pr}>#{preview.prNumber}</span>
                  ) : null}
                </header>
                <h4 className={styles.branch}>{preview.branch}</h4>
                <span className={styles.meta}>
                  <code className={styles.sha}>{preview.headSha}</code>
                  <span>{preview.authoredBy}</span>
                  <span>{preview.authoredAt}</span>
                </span>
                <span className={styles.commits}>
                  <span className={shell.tabular}>{preview.commitsAhead}</span>{" "}
                  commits ahead of main
                </span>
              </div>
              <footer className={styles.foot}>
                <a
                  className={[shell.button, shell.buttonGhost, toneCls].join(" ")}
                  href={preview.previewUrl}
                  aria-label={`Open preview ${preview.branch}`}
                >
                  Open preview →
                </a>
                <button
                  type="button"
                  className={[shell.button, toneCls].join(" ")}
                  aria-label={`Share preview link for ${preview.branch}`}
                >
                  Share link
                </button>
              </footer>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default BranchPreviewDeck
