import type { Metadata } from "next"

import {
  AnonymousToggle,
  BranchingLogicEditor,
  DropOffChart,
  QuestionTypePicker,
  ResponseAnalyticsTile,
  ShareSurveyModal,
  SurveyProgressDots,
  SurveyQuestionCard,
} from "../../components/surveys"
import { PageHeader } from "../../components/page-header"

import {
  BAY_DISTRIBUTION,
  BRANCH_RULES,
  CX_SURVEY_QUESTIONS,
  DISTRIBUTION_BUCKETS,
  DROP_OFF_POINTS,
  QUESTION_TYPE_OPTIONS,
} from "../fixtures"
import styles from "../surveys.module.css"

export const metadata: Metadata = {
  title: "Full survey builder | Surveys",
  description: "Composition — palette + canvas + analytics rail + footer.",
}

export default function FullSurveyBuilderScenePage() {
  const selectedQuestion = CX_SURVEY_QUESTIONS[0]

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full survey builder"
        title="Full survey builder scene"
        description="End-to-end composition — Question type picker on the left, the survey question canvas in the centre with the branching logic editor pinned under the selected question, response analytics and drop-off in the side rail, and an anonymous toggle plus share-modal trigger sitting in the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes", href: "/ui-primitives/surveys" },
          { label: "Full builder" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition — Mufflermen post-job CX survey</span>

        <SurveyProgressDots total={5} current={1} />

        <div className={styles.builderLayout}>
          <QuestionTypePicker options={QUESTION_TYPE_OPTIONS} activeType={selectedQuestion.type} />

          <div className={styles.builderMain}>
            {CX_SURVEY_QUESTIONS.map((q, idx) => (
              <SurveyQuestionCard
                key={q.id}
                index={q.index}
                prompt={q.prompt}
                type={q.type}
                required={q.required}
                helper={q.helper}
                selected={idx === 0}
              />
            ))}

            <BranchingLogicEditor
              sourceLabel={`Q0${selectedQuestion.index} — ${selectedQuestion.prompt}`}
              rules={BRANCH_RULES}
            />
          </div>

          <aside className={styles.builderSide}>
            <ResponseAnalyticsTile
              question="How likely are you to recommend us?"
              meta="Q01 / NPS — live"
              responseCount={156}
              buckets={DISTRIBUTION_BUCKETS}
            />
            <ResponseAnalyticsTile
              question="Was Bay 2 tidy?"
              meta="Q02 / Single choice — live"
              responseCount={156}
              buckets={BAY_DISTRIBUTION}
            />
            <DropOffChart
              points={DROP_OFF_POINTS}
              title="Drop-off"
              caption="Q04 long answer leaks 29 pts."
            />
          </aside>
        </div>

        <div className={styles.builderFooter}>
          <AnonymousToggle defaultPressed />
          <ShareSurveyModal
            surveyTitle="Post-job CX survey"
            publicUrl="https://surveys.mufflermen.com.au/r/cx-post-job"
            qrCaption="Print this QR on the loaner key tag — respondents scan once the keys are returned."
          />
        </div>
      </section>
    </main>
  )
}
