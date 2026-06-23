import type { Metadata } from "next"

import {
  ConditionalLogicVisualizer,
  FieldConfigPane,
  FieldPalette,
  FormCanvas,
  MultiPageFormWizard,
  SubmissionAnalyticsCard,
} from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import {
  FORM_PAGES,
  LOGIC_AVAILABLE_FIELDS,
  LOGIC_RULES,
  PALETTE_SECTIONS,
  QUOTE_FORM_FIELDS,
  SUBMISSION_DROPOFF,
  VALIDATION_RULES,
} from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Full form builder | Form builder",
  description:
    "Composition — the visual form builder for the Mufflermen quote intake form. Palette + canvas + inspector with wizard, logic visualiser, and analytics.",
}

export default function FullFormBuilderScenePage() {
  const selected = QUOTE_FORM_FIELDS[3]

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full form builder"
        title="Full form builder scene"
        description="Drag-design surface for the Mufflermen quote intake form. The FieldPalette sits on the left, the FormCanvas centres the active page, the FieldConfigPane edits the selected row. Above sits the MultiPageFormWizard. Below the canvas — the ConditionalLogicVisualizer. The right-hand rail also surfaces the SubmissionAnalyticsCard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Full builder" },
        ]}
      />

      <MultiPageFormWizard pages={FORM_PAGES} initialPageId="vehicle" />

      <div className={styles.builderLayout}>
        <FieldPalette sections={PALETTE_SECTIONS} />

        <div className={styles.builderMain}>
          <FormCanvas
            formTitle="Quote intake form"
            formMeta="Page 1 of 4 · Your vehicle"
            fields={QUOTE_FORM_FIELDS}
            selectedFieldId="sound-preference"
            dropTargetState="idle"
          />

          <ConditionalLogicVisualizer
            rules={LOGIC_RULES}
            fields={LOGIC_AVAILABLE_FIELDS}
          />
        </div>

        <div className={styles.builderSide}>
          <FieldConfigPane field={selected} validationRules={VALIDATION_RULES.slice(0, 6)} />
          <SubmissionAnalyticsCard
            totalSubmissions={1284}
            completionRate={62}
            averageTime="1m 48s"
            dropOff={SUBMISSION_DROPOFF}
            trend="+12%"
          />
        </div>
      </div>
    </main>
  )
}
