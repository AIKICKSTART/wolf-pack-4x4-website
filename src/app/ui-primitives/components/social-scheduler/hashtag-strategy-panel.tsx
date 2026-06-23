import { TrendingUp, TrendingDown, Minus } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type { HashtagDescriptor, HashtagGroup } from "./social-scheduler-types"

interface HashtagStrategyPanelProps {
  title?: string
  groups: ReadonlyArray<HashtagGroup>
}

const CATEGORY_LABEL: Record<HashtagGroup["category"], string> = {
  branded: "Branded",
  trending: "Trending",
  community: "Community",
  local: "Local",
}

function formatReach(reach: number): string {
  if (reach >= 1_000_000) return `${(reach / 1_000_000).toFixed(1)}M`
  if (reach >= 1000) return `${(reach / 1000).toFixed(0)}k`
  return String(reach)
}

function TrendIcon({ trend }: { trend: HashtagDescriptor["trend"] }) {
  if (trend === "up") {
    return (
      <span className={styles.hashtagTrendUp} aria-label="Trending up">
        <TrendingUp size={11} aria-hidden="true" />
      </span>
    )
  }
  if (trend === "down") {
    return (
      <span className={styles.hashtagTrendDown} aria-label="Trending down">
        <TrendingDown size={11} aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className={styles.hashtagTrendFlat} aria-label="Steady">
      <Minus size={11} aria-hidden="true" />
    </span>
  )
}

const COMP_CLASS: Record<HashtagDescriptor["competition"], string> = {
  low: styles.hashtagCompLow,
  med: styles.hashtagCompMed,
  high: styles.hashtagCompHigh,
}

export function HashtagStrategyPanel({
  title = "Hashtag strategy",
  groups,
}: HashtagStrategyPanelProps) {
  const totalReach = groups.reduce(
    (sum, group) =>
      sum + group.hashtags.reduce((groupSum, tag) => groupSum + tag.reach, 0),
    0,
  )

  return (
    <section
      className={`${styles.frame} ${styles.hashtagPanel}`}
      aria-label={title}
    >
      <header className={styles.hashtagHead}>
        <h2 className={styles.hashtagTitle}>{title}</h2>
        <span className={styles.composerEyebrow}>
          Total reach estimate · {formatReach(totalReach)}
        </span>
      </header>

      <div className={styles.hashtagGroups}>
        {groups.map((group) => (
          <article key={group.id} className={styles.hashtagGroup}>
            <header className={styles.hashtagGroupHead}>
              <span className={styles.hashtagGroupLabel}>{group.label}</span>
              <span className={styles.hashtagGroupCat}>
                {CATEGORY_LABEL[group.category]} · {group.hashtags.length} tags
              </span>
            </header>
            <div className={styles.hashtagList} role="list">
              {group.hashtags.map((tag) => (
                <div
                  key={tag.tag}
                  className={styles.hashtagRow}
                  role="listitem"
                  aria-label={`${tag.tag}, ${formatReach(tag.reach)} reach, ${tag.competition} competition`}
                >
                  <span className={styles.hashtagRowTag}>{tag.tag}</span>
                  <span className={styles.hashtagRowReach}>
                    {formatReach(tag.reach)}
                  </span>
                  <span className={styles.hashtagRowTrend}>
                    <TrendIcon trend={tag.trend} />
                  </span>
                  <span
                    className={`${styles.hashtagRowComp} ${COMP_CLASS[tag.competition]}`}
                  >
                    {tag.competition}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HashtagStrategyPanel
