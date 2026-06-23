"use client"

import { PluralizationEditor } from "../../components/localization-deep"
import type {
  CldrPluralCategory,
  PluralizationEditorForm,
} from "../../components/localization-deep"

import styles from "../localization-deep.module.css"

interface Props {
  enForms: ReadonlyArray<PluralizationEditorForm>
  zhForms: ReadonlyArray<PluralizationEditorForm>
  ruForms: ReadonlyArray<PluralizationEditorForm>
}

const englishSelector = (count: number): CldrPluralCategory =>
  count === 1 ? "one" : "other"

const chineseSelector = (): CldrPluralCategory => "other"

const richSelector = (count: number): CldrPluralCategory => {
  if (count === 0) return "zero"
  if (count === 1) return "one"
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "few"
  if (mod10 === 0 || (mod10 >= 5 && mod10 <= 9) || (mod100 >= 11 && mod100 <= 14)) {
    return "many"
  }
  return "other"
}

export function PluralizationEditorClient({
  enForms,
  zhForms,
  ruForms,
}: Props) {
  return (
    <section className={styles.stageFrame}>
      <span className={styles.stageCaption}>en-AU · one / other</span>
      <PluralizationEditor
        locale="en-AU"
        translationKey="cart.summary.itemCount"
        supportedCategories={["one", "other"]}
        initialForms={enForms}
        initialCount={1}
        selectCategory={englishSelector}
      />

      <span className={styles.stageCaption}>zh-CN · other only</span>
      <PluralizationEditor
        locale="zh-CN"
        translationKey="cart.summary.itemCount"
        supportedCategories={["other"]}
        initialForms={zhForms}
        initialCount={3}
        selectCategory={chineseSelector}
      />

      <span className={styles.stageCaption}>ru · zero / one / few / many / other</span>
      <PluralizationEditor
        locale="ru"
        translationKey="cart.summary.itemCount"
        supportedCategories={["zero", "one", "few", "many", "other"]}
        initialForms={ruForms}
        initialCount={5}
        selectCategory={richSelector}
      />
    </section>
  )
}
