import type {
  BranchRule,
  DropOffPoint,
  QuestionDistributionBucket,
  QuestionType,
  QuizAnswerScore,
  QuizScoringBand,
  ResponseSample,
  SurveyQuestion,
} from "../components/surveys"

export interface QuestionTypeOptionFixture {
  type: QuestionType
  label: string
  hint: string
}

export const QUESTION_TYPE_OPTIONS: ReadonlyArray<QuestionTypeOptionFixture> = [
  { type: "single-choice", label: "Single choice", hint: "One answer only" },
  { type: "multi-choice", label: "Multi choice", hint: "Pick many" },
  { type: "short-answer", label: "Short answer", hint: "One-line text" },
  { type: "long-answer", label: "Long answer", hint: "Paragraph" },
  { type: "rating", label: "Rating", hint: "1–5 stars" },
  { type: "scale", label: "Scale", hint: "Slider 0–10" },
  { type: "ranking", label: "Ranking", hint: "Drag to order" },
  { type: "matrix", label: "Matrix", hint: "Likert grid" },
  { type: "date", label: "Date", hint: "Date picker" },
  { type: "file", label: "File", hint: "Photo upload" },
  { type: "nps", label: "NPS", hint: "0–10 promoter" },
]

export const CX_SURVEY_QUESTIONS: ReadonlyArray<SurveyQuestion> = [
  {
    id: "q1",
    index: 1,
    type: "nps",
    prompt: "How likely are you to recommend Oak Flats Mufflermen to a mate?",
    required: true,
    helper: "Anchors at 0 (never) and 10 (already telling everyone).",
  },
  {
    id: "q2",
    index: 2,
    type: "single-choice",
    prompt: "Was Bay 2 tidy when you collected the car?",
    required: true,
    helper: "Select one — drives the workshop cleanliness KPI.",
  },
  {
    id: "q3",
    index: 3,
    type: "multi-choice",
    prompt: "Which parts of the visit felt smooth?",
    required: false,
    helper: "Pick all that apply.",
  },
  {
    id: "q4",
    index: 4,
    type: "long-answer",
    prompt: "Anything we could fix before your next service?",
    required: false,
    helper: "Free text — feeds into the workshop pulse review.",
  },
  {
    id: "q5",
    index: 5,
    type: "rating",
    prompt: "Rate the loaner car experience",
    required: false,
    helper: "1–5 stars — skipped automatically if no loaner used.",
  },
]

export const BRANCH_RULES: ReadonlyArray<BranchRule> = [
  {
    id: "r1",
    operator: "less-than",
    value: "7",
    action: "skip-to",
    targetId: "q4",
    targetLabel: "Q04 — What could we fix?",
  },
  {
    id: "r2",
    operator: "equals",
    value: "No",
    action: "show-question",
    targetId: "q4",
    targetLabel: "Q04 — What could we fix?",
  },
  {
    id: "r3",
    operator: "greater-than",
    value: "8",
    action: "end-survey",
    targetId: "end",
    targetLabel: "Thank-you screen",
  },
]

export const DISTRIBUTION_BUCKETS: ReadonlyArray<QuestionDistributionBucket> = [
  { label: "Detractors (0–6)", count: 18, tone: "red" },
  { label: "Passives (7–8)", count: 42, tone: "amber" },
  { label: "Promoters (9–10)", count: 96, tone: "green" },
]

export const BAY_DISTRIBUTION: ReadonlyArray<QuestionDistributionBucket> = [
  { label: "Spotless", count: 84, tone: "green" },
  { label: "Acceptable", count: 56, tone: "teal" },
  { label: "Untidy", count: 12, tone: "amber" },
  { label: "Messy", count: 4, tone: "red" },
]

export const DROP_OFF_POINTS: ReadonlyArray<DropOffPoint> = [
  { question: "Q1", completion: 100 },
  { question: "Q2", completion: 96 },
  { question: "Q3", completion: 87 },
  { question: "Q4", completion: 58, annotation: "Long-answer drop" },
  { question: "Q5", completion: 54 },
  { question: "End", completion: 51 },
]

export const RESPONSE_SAMPLES: ReadonlyArray<ResponseSample> = [
  {
    id: "rs1",
    respondent: "Renee Tualima",
    timestamp: "12 min ago",
    completion: 100,
    anonymous: false,
  },
  {
    id: "rs2",
    respondent: "Anonymous",
    timestamp: "38 min ago",
    completion: 82,
    anonymous: true,
  },
  {
    id: "rs3",
    respondent: "Brett McAlister",
    timestamp: "2 hr ago",
    completion: 60,
    anonymous: false,
  },
  {
    id: "rs4",
    respondent: "Anonymous",
    timestamp: "5 hr ago",
    completion: 100,
    anonymous: true,
  },
  {
    id: "rs5",
    respondent: "Sasha Drozd",
    timestamp: "Yesterday",
    completion: 96,
    anonymous: false,
  },
]

export const ADR_QUIZ_QUESTIONS: ReadonlyArray<{ id: string; label: string; points: number }> = [
  { id: "qz1", label: "ADR 83/00 stationary noise dBA limit", points: 4 },
  { id: "qz2", label: "Manta system part code for Falcon FG-X", points: 3 },
  { id: "qz3", label: "Catalytic converter inspection interval", points: 2 },
  { id: "qz4", label: "Resonator delete legality in NSW", points: 3 },
  { id: "qz5", label: "Acceptable backpressure psi range", points: 3 },
]

export const QUIZ_BANDS: ReadonlyArray<QuizScoringBand> = [
  {
    id: "fail",
    label: "Fail",
    minPercent: 0,
    maxPercent: 59,
    description: "Re-book the ADR refresher with the foreman before next shift.",
  },
  {
    id: "pass",
    label: "Pass",
    minPercent: 60,
    maxPercent: 84,
    description: "Cleared for tail-pipe and resonator work under supervision.",
  },
  {
    id: "distinction",
    label: "Distinction",
    minPercent: 85,
    maxPercent: 100,
    description: "Sign off independent ADR jobs and mentor apprentices.",
  },
]

export const QUIZ_ANSWERS: ReadonlyArray<QuizAnswerScore> = [
  {
    id: "qa1",
    questionLabel: "ADR 83/00 stationary noise dBA limit",
    earned: 4,
    max: 4,
    feedback: "correct",
    note: "90 dBA at 50% of max engine RPM — nailed it.",
  },
  {
    id: "qa2",
    questionLabel: "Manta part code for Falcon FG-X",
    earned: 2,
    max: 3,
    feedback: "partial",
    note: "Right series, wrong cat-back code.",
  },
  {
    id: "qa3",
    questionLabel: "Catalytic converter inspection interval",
    earned: 2,
    max: 2,
    feedback: "correct",
    note: "Every 40,000 km or annual logbook service.",
  },
  {
    id: "qa4",
    questionLabel: "Resonator delete legality in NSW",
    earned: 0,
    max: 3,
    feedback: "incorrect",
    note: "Defect notice applies — must remain unless tuned to ADR 83.",
  },
  {
    id: "qa5",
    questionLabel: "Acceptable backpressure psi range",
    earned: 3,
    max: 3,
    feedback: "correct",
    note: "1.5–3 psi at idle on naturally aspirated engines.",
  },
]
