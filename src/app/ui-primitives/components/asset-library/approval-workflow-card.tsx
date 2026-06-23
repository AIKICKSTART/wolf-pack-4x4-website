import { Avatar } from "../primitives/avatar"

import {
  APPROVAL_STEP_LABEL,
  APPROVAL_STEP_ORDER,
  type ApprovalComment,
  type ApprovalReviewer,
  type ApprovalStep,
} from "./asset-library-types"

import styles from "./approval-workflow-card.module.css"

interface ApprovalWorkflowCardProps {
  currentStep: ApprovalStep
  reviewers: ReadonlyArray<ApprovalReviewer>
  thread: ReadonlyArray<ApprovalComment>
  className?: string
}

export function ApprovalWorkflowCard({
  currentStep,
  reviewers,
  thread,
  className,
}: ApprovalWorkflowCardProps) {
  const currentIndex = APPROVAL_STEP_ORDER.indexOf(currentStep)

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label="Approval workflow"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Approval workflow</span>
        <h3 className={styles.title}>{APPROVAL_STEP_LABEL[currentStep]}</h3>
      </header>

      <ol className={styles.stepper} aria-label="Workflow steps">
        {APPROVAL_STEP_ORDER.map((step, index) => {
          const isDone = index < currentIndex
          const isActive = index === currentIndex
          return (
            <li
              key={step}
              className={[
                styles.step,
                isDone ? styles.stepDone : "",
                isActive ? styles.stepActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              <span className={styles.stepDot} aria-hidden="true">
                {isDone ? "✓" : index + 1}
              </span>
              <span className={styles.stepLabel}>
                {APPROVAL_STEP_LABEL[step]}
              </span>
            </li>
          )
        })}
      </ol>

      <section className={styles.reviewers} aria-label="Reviewers">
        <span className={styles.subkicker}>Reviewers</span>
        <ul className={styles.reviewerList}>
          {reviewers.map((reviewer) => (
            <li key={reviewer.id} className={styles.reviewerRow}>
              <Avatar
                name={reviewer.name}
                src={reviewer.avatar}
                size="sm"
                tone="obsidian"
              />
              <div className={styles.reviewerInfo}>
                <span className={styles.reviewerName}>{reviewer.name}</span>
                <span className={styles.reviewerStep}>
                  {APPROVAL_STEP_LABEL[reviewer.step]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.thread} aria-label="Approval thread">
        <span className={styles.subkicker}>Thread</span>
        <ul className={styles.threadList}>
          {thread.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <Avatar
                name={comment.author.name}
                src={comment.author.avatar}
                size="sm"
                tone="obsidian"
              />
              <div className={styles.commentBody}>
                <div className={styles.commentMeta}>
                  <span className={styles.commentAuthor}>
                    {comment.author.name}
                  </span>
                  <time
                    className={styles.commentTime}
                    dateTime={comment.timestamp}
                  >
                    {comment.timestamp}
                  </time>
                </div>
                <p className={styles.commentText}>{comment.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default ApprovalWorkflowCard
