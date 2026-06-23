import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "surveys",
  "title": "Surveys & quizzes",
  "group": "Marketing",
  "summary": "14 Typeform-style survey + quiz builder primitives — question card, type picker, branching logic, respondent progress/inputs (dots, NPS, Likert, navigator), analytics (distribution tile, drop-off chart, sample list), anonymous toggle, share modal, and a quiz scoring + result-reveal pair.",
  "entries": [
    {
      "key": "surveys/survey-question-card",
      "family": "surveys",
      "name": "SurveyQuestionCard",
      "label": "Survey question card",
      "description": "Builder-canvas card showing a zero-padded question number, prompt, tone-coded type chip, optional required flag and helper, with duplicate/delete/more action buttons.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/question-card",
      "tags": [
        "survey",
        "builder",
        "question"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/question-type-picker",
      "family": "surveys",
      "name": "QuestionTypePicker",
      "label": "Question type picker",
      "description": "Listbox palette of response types (single/multi-choice, short/long answer, rating, scale, ranking, matrix, date, file, NPS) each with a tone-coded icon, label and hint, highlighting an optional active type.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/type-picker",
      "tags": [
        "survey",
        "builder",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/branching-logic-editor",
      "family": "surveys",
      "name": "BranchingLogicEditor",
      "label": "Branching logic editor",
      "description": "Per-question conditional rule list rendering 'If answer [operator] [value] then [skip-to/show/end-survey] [target]' rows with tone-coded actions and add/remove controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/branching-editor",
      "tags": [
        "survey",
        "logic",
        "builder"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/survey-progress-dots",
      "family": "surveys",
      "name": "SurveyProgressDots",
      "label": "Survey progress dots",
      "description": "Respondent progress indicator rendering completed/active/remaining dots with a current/total and percent readout, clamped to safe bounds and announced via aria-live.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/progress-dots",
      "tags": [
        "survey",
        "progress",
        "respondent"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/response-analytics-tile",
      "family": "surveys",
      "name": "ResponseAnalyticsTile",
      "label": "Response analytics tile",
      "description": "Per-question analytics card with prompt, total response count, and a tone-coded horizontal distribution bar chart computing per-bucket percentages.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/analytics-tile",
      "tags": [
        "survey",
        "analytics",
        "chart"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/drop-off-chart",
      "family": "surveys",
      "name": "DropOffChart",
      "label": "Drop-off chart",
      "description": "SVG line + area chart plotting per-question completion percentage with gridlines, axis ticks, markers, and an annotation highlighting the largest drop-off point.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/drop-off",
      "tags": [
        "survey",
        "analytics",
        "chart",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/nps-input",
      "family": "surveys",
      "name": "NpsInput",
      "label": "NPS input",
      "description": "Client-side 0–10 NPS radiogroup of buttons with detractor/passive/promoter tone bands, anchor labels, and a hidden field carrying the selected score.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/nps-input",
      "tags": [
        "survey",
        "nps",
        "input"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/likert-scale-row",
      "family": "surveys",
      "name": "LikertScaleRow",
      "label": "Likert scale row",
      "description": "Client-side statement row with a 5/7/9-point radiogroup of labelled options (default disagree→agree labels) and a hidden field carrying the selected index.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/likert",
      "tags": [
        "survey",
        "likert",
        "input"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/multi-page-navigator",
      "family": "surveys",
      "name": "MultiPageNavigator",
      "label": "Multi-page navigator",
      "description": "Survey footer nav with Back / Next (or Submit on the last page), a 'Page X of Y' readout, and an optional save-and-continue-later action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/navigator",
      "tags": [
        "survey",
        "navigation",
        "respondent"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/anonymous-toggle",
      "family": "surveys",
      "name": "AnonymousToggle",
      "label": "Anonymous toggle",
      "description": "Client-side switch row toggling anonymous responses on/off with a status subtitle and an info button revealing an explanatory popover.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/anonymous-toggle",
      "tags": [
        "survey",
        "toggle",
        "privacy"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/response-sample-list",
      "family": "surveys",
      "name": "ResponseSampleList",
      "label": "Response sample list",
      "description": "List of recent responses showing an avatar (initials or anonymous), respondent name or Anonymous badge, timestamp, completion-percentage bar, and an open CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/sample-list",
      "tags": [
        "survey",
        "responses",
        "list"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/share-survey-modal",
      "family": "surveys",
      "name": "ShareSurveyModal",
      "label": "Share survey modal",
      "description": "Modal dialog for distributing a survey — public URL chip with copy, embed snippet via CodeBlock, email-invite row, and an optional mock QR-code block.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/share-modal",
      "tags": [
        "survey",
        "share",
        "modal"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/quiz-scoring-rules",
      "family": "surveys",
      "name": "QuizScoringRules",
      "label": "Quiz scoring rules",
      "description": "Quiz configuration surface showing per-question point weights with share bars, max-points total, a pass-threshold gauge, and Fail/Pass/Distinction tone bands.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/quiz-scoring",
      "tags": [
        "quiz",
        "scoring",
        "builder"
      ],
      "status": "captured"
    },
    {
      "key": "surveys/quiz-result-reveal",
      "family": "surveys",
      "name": "QuizResultReveal",
      "label": "Quiz result reveal",
      "description": "Respondent-side quiz result with earned/total score, percent, band chip, per-question correct/partial/incorrect feedback rows, and retry / share-certificate actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/surveys",
      "routeHref": "/ui-primitives/surveys/quiz-result",
      "tags": [
        "quiz",
        "result",
        "respondent"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
