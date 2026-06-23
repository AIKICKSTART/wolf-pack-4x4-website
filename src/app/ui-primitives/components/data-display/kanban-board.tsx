import { Avatar } from "../primitives/avatar"
import styles from "./kanban-board.module.css"

export type KanbanStage = "backlog" | "progress" | "review" | "done"
export type KanbanPriority = "low" | "med" | "high"

export interface KanbanCard {
  id: string
  code: string
  title: string
  sub?: string
  tags?: ReadonlyArray<string>
  priority?: KanbanPriority
  due?: string
  assignees?: ReadonlyArray<{ name: string; avatarSrc?: string }>
}

export interface KanbanColumn {
  stage: KanbanStage
  title: string
  cards: ReadonlyArray<KanbanCard>
}

interface KanbanBoardProps {
  columns: ReadonlyArray<KanbanColumn>
  className?: string
}

export function KanbanBoard({ columns, className }: KanbanBoardProps) {
  const classes = [styles.board, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="list" aria-label="Kanban board">
      {columns.map((column) => (
        <section
          key={column.stage}
          className={styles.column}
          data-stage={column.stage}
          aria-label={`${column.title} column with ${column.cards.length} cards`}
        >
          <header className={styles.columnHead}>
            <span className={styles.columnTitle}>
              <span className={styles.columnDot} aria-hidden="true" />
              {column.title}
            </span>
            <span className={styles.countChip}>{column.cards.length}</span>
          </header>
          <ul className={styles.stack}>
            {column.cards.map((card) => (
              <li key={card.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardCode}>{card.code}</span>
                  {card.priority && (
                    <span
                      className={styles.cardPriority}
                      data-priority={card.priority}
                      aria-label={`Priority: ${card.priority}`}
                    />
                  )}
                </div>
                <p className={styles.cardTitle}>{card.title}</p>
                {card.sub && <p className={styles.cardSub}>{card.sub}</p>}
                {card.tags && card.tags.length > 0 && (
                  <div className={styles.cardTags}>
                    {card.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {(card.due || (card.assignees && card.assignees.length > 0)) && (
                  <div className={styles.cardFooter}>
                    {card.assignees && card.assignees.length > 0 && (
                      <div className={styles.avatarStack}>
                        {card.assignees.slice(0, 4).map((assignee) => (
                          <Avatar
                            key={assignee.name}
                            name={assignee.name}
                            src={assignee.avatarSrc}
                            size="sm"
                            tone="obsidian"
                          />
                        ))}
                      </div>
                    )}
                    {card.due && <span className={styles.cardMeta}>{card.due}</span>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default KanbanBoard
