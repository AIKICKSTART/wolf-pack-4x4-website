import { CalendarDays, CheckCircle2, AlertOctagon, ListChecks } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import {
  BRIEFING_KIND_LABEL,
  BRIEFING_KIND_TONE,
  adminToneToChip,
  type BriefingItem,
  type BriefingItemKind,
  type WeeklyBriefing,
} from "./admin-hub-types"

import styles from "./weekly-briefing-card.module.css"

interface WeeklyBriefingCardProps {
  briefing: WeeklyBriefing
  className?: string
}

function KindGlyph({ kind }: { kind: BriefingItemKind }) {
  if (kind === "highlight") {
    return <CheckCircle2 size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  if (kind === "lowlight") {
    return <AlertOctagon size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  return <ListChecks size={14} strokeWidth={2.2} aria-hidden="true" />
}

function BriefingRow({ item }: { item: BriefingItem }) {
  const tone = BRIEFING_KIND_TONE[item.kind]
  return (
    <li
      className={[styles.item, styles[`tone-${tone}`]].join(" ")}
      aria-label={`${BRIEFING_KIND_LABEL[item.kind]}: ${item.title}`}
    >
      <span className={styles.itemGlyph} aria-hidden="true">
        <KindGlyph kind={item.kind} />
      </span>
      <div className={styles.itemBody}>
        <div className={styles.itemHead}>
          <span className={styles.itemTitle}>{item.title}</span>
          {item.dueLabel && (
            <span className={styles.itemDue}>Due {item.dueLabel}</span>
          )}
        </div>
        {item.detail && <p className={styles.itemDetail}>{item.detail}</p>}
      </div>
      {item.ownerInitials && (
        <Avatar
          name={item.ownerInitials}
          tone="obsidian"
          size="sm"
          className={styles.itemOwner}
        />
      )}
    </li>
  )
}

export function WeeklyBriefingCard({ briefing, className }: WeeklyBriefingCardProps) {
  const grouped = {
    highlight: briefing.items.filter((item) => item.kind === "highlight"),
    lowlight: briefing.items.filter((item) => item.kind === "lowlight"),
    action: briefing.items.filter((item) => item.kind === "action"),
  } as const

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Weekly briefing for ${briefing.weekLabel}`}
    >
      <header className={styles.head}>
        <span className={styles.headIcon} aria-hidden="true">
          <CalendarDays size={18} strokeWidth={2.2} />
        </span>
        <div className={styles.headIdentity}>
          <span className={styles.kicker}>Monday briefing</span>
          <h3 className={styles.title}>{briefing.weekLabel}</h3>
          <span className={styles.preparedBy}>
            Prepared by {briefing.preparedBy} · {briefing.preparedAt}
          </span>
        </div>
        <div className={styles.headStats} aria-label="Briefing tally">
          <Chip
            label={`${grouped.highlight.length} wins`}
            tone={adminToneToChip(BRIEFING_KIND_TONE.highlight)}
          />
          <Chip
            label={`${grouped.lowlight.length} watch`}
            tone={adminToneToChip(BRIEFING_KIND_TONE.lowlight)}
          />
          <Chip
            label={`${grouped.action.length} actions`}
            tone={adminToneToChip(BRIEFING_KIND_TONE.action)}
          />
        </div>
      </header>

      <section className={styles.group}>
        <h4 className={styles.groupHead}>{BRIEFING_KIND_LABEL.highlight}s</h4>
        <ul className={styles.list}>
          {grouped.highlight.map((item) => (
            <BriefingRow key={item.id} item={item} />
          ))}
        </ul>
      </section>

      <section className={styles.group}>
        <h4 className={styles.groupHead}>{BRIEFING_KIND_LABEL.lowlight}s</h4>
        <ul className={styles.list}>
          {grouped.lowlight.map((item) => (
            <BriefingRow key={item.id} item={item} />
          ))}
        </ul>
      </section>

      <section className={styles.group}>
        <h4 className={styles.groupHead}>{BRIEFING_KIND_LABEL.action} items</h4>
        <ul className={styles.list}>
          {grouped.action.map((item) => (
            <BriefingRow key={item.id} item={item} />
          ))}
        </ul>
      </section>
    </article>
  )
}

export default WeeklyBriefingCard
