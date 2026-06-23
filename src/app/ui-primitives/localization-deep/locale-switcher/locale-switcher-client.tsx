"use client"

import { useState } from "react"

import { LocaleSwitcher } from "../../components/localization-deep"
import type { LocaleSwitcherEntry } from "../../components/localization-deep"

import styles from "../localization-deep.module.css"

interface Props {
  locales: ReadonlyArray<LocaleSwitcherEntry>
}

export function LocaleSwitcherClient({ locales }: Props) {
  const [primary, setPrimary] = useState("en-AU")
  const [translator, setTranslator] = useState("zh-CN")
  const [review, setReview] = useState("ar-SA")

  return (
    <section className={styles.stageFrame}>
      <span className={styles.stageCaption}>Primary working locale</span>
      <LocaleSwitcher
        locales={locales}
        value={primary}
        onChange={setPrimary}
        label="Primary working locale"
      />

      <span className={styles.stageCaption}>Translator target</span>
      <LocaleSwitcher
        locales={locales}
        value={translator}
        onChange={setTranslator}
        label="Translator target"
      />

      <span className={styles.stageCaption}>Review queue locale</span>
      <LocaleSwitcher
        locales={locales}
        value={review}
        onChange={setReview}
        label="Review queue locale"
      />
    </section>
  )
}
