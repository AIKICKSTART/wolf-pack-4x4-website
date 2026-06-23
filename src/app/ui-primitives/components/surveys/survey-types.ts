/** Shared types for the Typeform-style survey + quiz builder primitives. */

export type QuestionType =
  | "single-choice"
  | "multi-choice"
  | "short-answer"
  | "long-answer"
  | "rating"
  | "scale"
  | "ranking"
  | "matrix"
  | "date"
  | "file"
  | "nps"

export type QuestionTone =
  | "teal"
  | "amber"
  | "violet"
  | "green"
  | "red"
  | "neutral"

export type BranchOperator =
  | "equals"
  | "not-equals"
  | "contains"
  | "greater-than"
  | "less-than"
  | "is-answered"
  | "is-empty"

export type BranchAction = "skip-to" | "show-question" | "end-survey"

export type LikertScale = 5 | 7 | 9

export type QuizBand = "fail" | "pass" | "distinction"

export interface BranchRule {
  id: string
  /** Operator applied against this question's answer. */
  operator: BranchOperator
  /** Display value reference. Visual reference only. */
  value: string
  action: BranchAction
  /** Question id or page id this rule targets. */
  targetId: string
  targetLabel: string
}

export interface SurveyQuestion {
  id: string
  /** 1-based display number rendered on the card. */
  index: number
  type: QuestionType
  prompt: string
  required: boolean
  /** Optional helper line shown under the prompt. */
  helper?: string
}

export interface QuestionDistributionBucket {
  label: string
  /** Response count for this bucket. */
  count: number
  tone: QuestionTone
}

export interface DropOffPoint {
  /** Question label or id displayed on the axis. */
  question: string
  /** Percentage 0-100 of respondents who completed this question. */
  completion: number
  /** Flag the biggest drop for annotation rendering. */
  annotation?: string
}

export interface ResponseSample {
  id: string
  /** Display name or "Anonymous" when respondent opted out. */
  respondent: string
  /** Human-friendly timestamp such as "12 min ago". */
  timestamp: string
  /** 0-100 completion percentage. */
  completion: number
  /** When true the response was submitted anonymously. */
  anonymous: boolean
}

export interface QuizAnswerScore {
  id: string
  questionLabel: string
  /** Points earned by the respondent on this question. */
  earned: number
  /** Maximum points available on this question. */
  max: number
  /** Tone band for the per-question feedback chip. */
  feedback: "correct" | "partial" | "incorrect"
  /** Short copy shown next to the chip. */
  note: string
}

export interface QuizScoringBand {
  id: QuizBand
  label: string
  /** Inclusive lower bound percentage. */
  minPercent: number
  /** Inclusive upper bound percentage. */
  maxPercent: number
  /** Display copy explaining the band. */
  description: string
}

export interface SurveyPage {
  id: string
  title: string
  questionCount: number
}
