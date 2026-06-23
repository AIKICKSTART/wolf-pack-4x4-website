"use client"

import { useState } from "react"

import {
  CompletenessMatrix,
  FallbackRuleCard,
  GlossaryRow,
  ImportExportCard,
  InterpolationPanel,
  LocaleSwitcher,
  MtPreviewCard,
  PluralizationEditor,
  QaIssueRow,
  RightToLeftTile,
  StringKeyRow,
  StyleGuideCard,
  TranslationEditor,
  TranslationMemoryRow,
} from "../../components/localization-deep"
import type {
  CldrPluralCategory,
  CompletenessNamespace,
  FallbackRuleCardProps,
  GlossaryRowProps,
  ImportExportCardProps,
  InterpolationPanelProps,
  LocaleSwitcherEntry,
  MtPreviewCardProps,
  PluralizationEditorForm,
  QaIssueRowProps,
  RightToLeftTileProps,
  StringKeyRowProps,
  StyleGuideCardProps,
  TranslationEditorProps,
  TranslationMemoryRowProps,
} from "../../components/localization-deep"

import styles from "../localization-deep.module.css"

const englishSelector = (count: number): CldrPluralCategory =>
  count === 1 ? "one" : "other"

interface Props {
  initialLocale: string
  localeEntries: ReadonlyArray<LocaleSwitcherEntry>
  translationEditor: TranslationEditorProps
  mtPreview: MtPreviewCardProps
  fallback: FallbackRuleCardProps
  completenessLocales: ReadonlyArray<string>
  completenessNamespaces: ReadonlyArray<CompletenessNamespace>
  stringKeyRows: ReadonlyArray<StringKeyRowProps>
  glossaryRows: ReadonlyArray<GlossaryRowProps>
  interpolation: InterpolationPanelProps
  pluralForms: ReadonlyArray<PluralizationEditorForm>
  rtlTile: RightToLeftTileProps
  translationMemoryRows: ReadonlyArray<TranslationMemoryRowProps>
  styleGuideAu: StyleGuideCardProps
  styleGuideZh: StyleGuideCardProps
  importExportCards: ReadonlyArray<ImportExportCardProps>
  qaIssueRows: ReadonlyArray<QaIssueRowProps>
}

export function FullTranslatorClient({
  initialLocale,
  localeEntries,
  translationEditor,
  mtPreview,
  fallback,
  completenessLocales,
  completenessNamespaces,
  stringKeyRows,
  glossaryRows,
  interpolation,
  pluralForms,
  rtlTile,
  translationMemoryRows,
  styleGuideAu,
  styleGuideZh,
  importExportCards,
  qaIssueRows,
}: Props) {
  const [activeLocale, setActiveLocale] = useState(initialLocale)

  return (
    <div className={styles.fullGrid}>
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Translator console</span>
        <div className={styles.fullTopBar}>
          <LocaleSwitcher
            locales={localeEntries}
            value={activeLocale}
            onChange={setActiveLocale}
            label="Active translator locale"
          />
        </div>
      </section>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Live translation in flight</span>
        <TranslationEditor {...translationEditor} />
      </section>

      <div className={styles.stageColumns}>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Machine translation</span>
          <MtPreviewCard {...mtPreview} />
        </section>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Fallback chain</span>
          <FallbackRuleCard {...fallback} />
        </section>
      </div>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Coverage heat grid</span>
        <CompletenessMatrix
          locales={completenessLocales}
          namespaces={completenessNamespaces}
        />
      </section>

      <div className={styles.stageColumns}>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>String keys</span>
          <div className={styles.stack}>
            {stringKeyRows.slice(0, 3).map((row) => (
              <StringKeyRow key={row.translationKey} {...row} />
            ))}
          </div>
        </section>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Glossary lock</span>
          <div className={styles.stack}>
            {glossaryRows.slice(0, 3).map((row) => (
              <GlossaryRow key={row.term} {...row} />
            ))}
          </div>
        </section>
      </div>

      <div className={styles.stageColumns}>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>Interpolation tokens</span>
          <InterpolationPanel {...interpolation} />
        </section>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>CLDR plurals</span>
          <PluralizationEditor
            locale="en-AU"
            translationKey="cart.summary.itemCount"
            supportedCategories={["one", "other"]}
            initialForms={pluralForms}
            initialCount={1}
            selectCategory={englishSelector}
          />
        </section>
      </div>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>RTL preview · ar-SA</span>
        <RightToLeftTile {...rtlTile} />
      </section>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Translation memory · suggestions</span>
        <div className={styles.stack}>
          {translationMemoryRows.slice(0, 3).map((row, index) => (
            <TranslationMemoryRow
              key={`${row.source}-${index}`}
              {...row}
            />
          ))}
        </div>
      </section>

      <div className={styles.stageColumns}>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>en-AU style guide</span>
          <StyleGuideCard {...styleGuideAu} />
        </section>
        <section className={styles.stageFrame}>
          <span className={styles.stageCaption}>zh-CN style guide</span>
          <StyleGuideCard {...styleGuideZh} />
        </section>
      </div>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Exchange (XLIFF / CSV / TMX)</span>
        <div className={styles.stageRow}>
          {importExportCards.slice(0, 3).map((card, index) => (
            <ImportExportCard
              key={`${card.operation}-${card.format}-${index}`}
              {...card}
            />
          ))}
        </div>
      </section>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>QA queue</span>
        <div className={styles.stack}>
          {qaIssueRows.map((row, index) => (
            <QaIssueRow
              key={`${row.translationKey}-${row.locale}-${index}`}
              {...row}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
