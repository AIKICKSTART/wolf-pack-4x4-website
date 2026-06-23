import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./surveys.module.css"

export const metadata: Metadata = {
  title: "Surveys & quizzes | UI Primitives",
  description:
    "Typeform-style survey + quiz builder primitives — question card, type picker, branching logic, progress dots, analytics tiles, drop-off chart, NPS, Likert, navigator, anonymous toggle, response samples, share modal, quiz scoring, and quiz result reveal.",
}

interface SurveyScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<SurveyScene> = [
  {
    kicker: "Primitive 01",
    title: "Survey question card",
    body: "Builder canvas card with number, prompt input, type chip, required toggle, and delete / duplicate kebab.",
    href: "/ui-primitives/surveys/question-card",
    accent: "amber",
    glyph: "Q?",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Question type picker",
    body: "Palette of 11 response types — single, multi, short, long, rating, scale, ranking, matrix, date, file, NPS.",
    href: "/ui-primitives/surveys/type-picker",
    accent: "teal",
    glyph: "+++",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 03",
    title: "Branching logic editor",
    body: "Per-question rules — If answer [op] [value], skip to question — with show / skip / end-survey actions.",
    href: "/ui-primitives/surveys/branching-editor",
    accent: "violet",
    glyph: "↬",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Survey progress dots",
    body: "Dot progress for the respondent view — completed filled, current highlighted, remaining empty, % readout.",
    href: "/ui-primitives/surveys/progress-dots",
    accent: "amber",
    glyph: "●●○",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Response analytics tile",
    body: "Per-question tile — prompt, response count, tone-coded distribution bar chart with percentages.",
    href: "/ui-primitives/surveys/analytics-tile",
    accent: "green",
    glyph: "▥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Drop-off chart",
    body: "SVG line + area chart tracking % completing each question with annotations on the biggest drops.",
    href: "/ui-primitives/surveys/drop-off",
    accent: "red",
    glyph: "↘",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "NPS input",
    body: "0–10 NPS button row with detractor / passive / promoter tone bands and anchor labels.",
    href: "/ui-primitives/surveys/nps-input",
    accent: "red",
    glyph: "0–10",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 08",
    title: "Likert scale row",
    body: "Statement on the left, 5 / 7 / 9 point radio scale across — Strongly disagree → Strongly agree.",
    href: "/ui-primitives/surveys/likert",
    accent: "teal",
    glyph: "○○●",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 09",
    title: "Multi-page navigator",
    body: "Footer navigator — Back / Next + Page X of Y + Save &amp; continue later. Submit appears on the last page.",
    href: "/ui-primitives/surveys/navigator",
    accent: "amber",
    glyph: "◄ ►",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Anonymous toggle",
    body: "Anonymous responses switch with an info popover explaining how respondent identity is handled.",
    href: "/ui-primitives/surveys/anonymous-toggle",
    accent: "violet",
    glyph: "ANON",
    state: "Stateful · press",
  },
  {
    kicker: "Primitive 11",
    title: "Response sample list",
    body: "Recent responses with respondent (or Anonymous), timestamp, completion % bar, and open CTA.",
    href: "/ui-primitives/surveys/sample-list",
    accent: "teal",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Share survey modal",
    body: "Modal — public URL chip, embed snippet via CodeBlock, email distribution row, and QR primitive.",
    href: "/ui-primitives/surveys/share-modal",
    accent: "amber",
    glyph: "↗",
    state: "Stateful · copy",
  },
  {
    kicker: "Primitive 13",
    title: "Quiz scoring rules",
    body: "Per-question weights, total max points, pass threshold gauge, and Fail / Pass / Distinction tone bands.",
    href: "/ui-primitives/surveys/quiz-scoring",
    accent: "amber",
    glyph: "∑",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Quiz result reveal",
    body: "Respondent-side score reveal — earned / total, band chip, per-question feedback rows, retry CTA.",
    href: "/ui-primitives/surveys/quiz-result",
    accent: "green",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full survey builder",
    body: "Palette left + question canvas centre + analytics rail right with anonymous toggle and share trigger.",
    href: "/ui-primitives/surveys/full-builder",
    accent: "red",
    glyph: "≡QQ▥",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<SurveyScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function SurveysIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Surveys & quizzes / 14 primitives + composition"
        title="Survey + quiz builder primitives"
        description="Typeform-style designer for post-job CX surveys and technician ADR quizzes — palette of response types, question cards with branching logic, respondent-side progress and inputs, drop-off and per-question analytics, distribution surface, and a quiz scoring + result reveal pair. Visual reference only — no real survey persistence wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Surveys & quizzes" },
        ]}
      />

      <span className={styles.notice}>Visual reference only — distinct from forms, notifications, and support NPS</span>

      <section className={styles.grid} aria-label="Survey builder primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
