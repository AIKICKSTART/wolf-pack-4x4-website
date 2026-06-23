"use client"

import { GitBranch, LogOut, Mail, Settings2, Target, Timer, Zap } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./journey-node-card.module.css"
import { NODE_LABEL, type JourneyNodeKind } from "./marketing-automation-types"

const KIND_CLASS: Record<JourneyNodeKind, string> = {
  trigger: styles.toneTrigger,
  wait: styles.toneWait,
  condition: styles.toneCondition,
  action: styles.toneAction,
  goal: styles.toneGoal,
  exit: styles.toneExit,
}

function GlyphFor({ kind }: { kind: JourneyNodeKind }): ReactNode {
  const props = { size: 12, strokeWidth: 2.4, "aria-hidden": true } as const
  switch (kind) {
    case "trigger":
      return <Zap {...props} />
    case "wait":
      return <Timer {...props} />
    case "condition":
      return <GitBranch {...props} />
    case "action":
      return <Mail {...props} />
    case "goal":
      return <Target {...props} />
    case "exit":
      return <LogOut {...props} />
  }
}

export interface JourneyNodeCardProps {
  kind: JourneyNodeKind
  title: string
  subtitle?: string
  active?: boolean
  onConfigure?: () => void
  className?: string
}

export function JourneyNodeCard({
  kind,
  title,
  subtitle,
  active = false,
  onConfigure,
  className,
}: JourneyNodeCardProps) {
  const classes = [styles.card, KIND_CLASS[kind], className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      data-active={active}
      aria-current={active ? "step" : undefined}
      aria-label={`${NODE_LABEL[kind]} · ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          <GlyphFor kind={kind} />
          {NODE_LABEL[kind]}
        </span>
      </header>
      <div className={styles.title}>{title}</div>
      {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
      {onConfigure ? (
        <button
          type="button"
          className={styles.config}
          aria-label={`Configure ${title}`}
          onClick={onConfigure}
        >
          <Settings2 size={11} strokeWidth={2.4} aria-hidden="true" />
          Configure
        </button>
      ) : null}
    </article>
  )
}

export default JourneyNodeCard
