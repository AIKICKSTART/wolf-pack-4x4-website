"use client"

import { useState } from "react"

import {
  carbonRedIcons,
  type CarbonRedIcon,
  type CarbonRedVariant,
} from "@/app/ui-primitives/components/icons-carbon-red"

import { AnimatedIconsTab } from "./_animated-tab"
import styles from "./icons-hub.module.css"

const TABS = [
  { id: "premium", label: "Premium" },
  { id: "animated", label: "Supplier logos" },
] as const

type TabId = (typeof TABS)[number]["id"]

const ICON_DNA_CONTRACTS = [
  {
    source: "Foundations",
    title: "Stroke, scale, and focus",
    body: "Uses --primitive-icon-stroke, 52px control wells, 96px premium art, and --primitive-focus-shadow before route-local styling.",
  },
  {
    source: "Surfaces",
    title: "Carbon and Red material",
    body: "Premium cards keep the carbon tile, chrome edge, red clearcoat highlight, and panel depth from the shared material stack.",
  },
  {
    source: "Typography",
    title: "Labels and audit text",
    body: "Icon labels use compact mono rhythm, supplier names use display roles, and long asset paths wrap without page overflow.",
  },
  {
    source: "Motion",
    title: "Hover and focus discipline",
    body: "Hover lift is short and reversible, focus is tokenized, and reduced-motion removes transform without hiding state.",
  },
] as const

const ICON_USAGE_RULES = [
  "Use card art for selection tiles, dashboards, and hero-level icon wells.",
  "Use transparent glyph art only inside an existing Carbon and Red surface.",
  "Keep supplier logos source-backed from the local parts manifest and surface-specific light or dark assets.",
  "Do not recolor supplier marks; place them on approved plates and show source evidence where audit matters.",
] as const

const PREMIUM_CATEGORIES = [
  { id: "all", label: "All", count: carbonRedIcons.length },
  ...Array.from(
    new Map(carbonRedIcons.map((icon) => [icon.category, icon.categoryLabel])).entries(),
  ).map(([id, label]) => ({
    id,
    label,
    count: carbonRedIcons.filter((icon) => icon.category === id).length,
  })),
]

function PremiumGrid({
  variant,
  items,
}: {
  variant: CarbonRedVariant
  items: readonly CarbonRedIcon[]
}) {
  return (
    <div className={styles.premiumGrid}>
      {items.map((icon) => (
        <figure key={icon.id} className={styles.premiumCell} data-carbon-red-icon={icon.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.premiumImg}
            data-carbon-red-icon-img="true"
            data-carbon-red-variant={variant}
            src={variant === "glyph" ? icon.glyph : icon.card}
            alt={icon.label}
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
          />
          <figcaption className={styles.premiumLabel}>{icon.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function PremiumSections({ variant }: { variant: CarbonRedVariant }) {
  return (
    <div className={styles.premiumSections}>
      {PREMIUM_CATEGORIES.filter((category) => category.id !== "all").map((category) => {
        const items = carbonRedIcons.filter((icon) => icon.category === category.id)

        return (
          <section key={category.id} className={styles.premiumSection}>
            <div className={styles.premiumSectionHead}>
              <h2>{category.label}</h2>
              <span>{items.length} marks</span>
            </div>
            <PremiumGrid variant={variant} items={items} />
          </section>
        )
      })}
    </div>
  )
}

export function IconsHubClient() {
  const [tab, setTab] = useState<TabId>("premium")
  const [premiumVariant, setPremiumVariant] = useState<CarbonRedVariant>("card")
  const [premiumCategory, setPremiumCategory] = useState("all")
  const [premiumQuery, setPremiumQuery] = useState("")

  const active = TABS.find((t) => t.id === tab)
  const premiumNeedle = premiumQuery.trim().toLowerCase()
  const premiumItems = carbonRedIcons.filter((icon) => {
    const matchesCategory = premiumCategory === "all" || icon.category === premiumCategory
    const haystack =
      `${icon.label} ${icon.id} ${icon.categoryLabel} ${icon.aliases.join(" ")}`.toLowerCase()
    return matchesCategory && (!premiumNeedle || haystack.includes(premiumNeedle))
  })
  const showPremiumSections = premiumCategory === "all" && premiumNeedle.length === 0

  return (
    <>
      <section className={styles.dnaPanel} aria-labelledby="icons-dna-title">
        <div className={styles.dnaIntro}>
          <span className={styles.dnaKicker}>Production icon DNA</span>
          <h2 id="icons-dna-title">Shared icon rules inherit from completed routes</h2>
          <p>
            Icons now bind Foundations stroke and focus tokens, Surfaces material depth,
            Typography label roles, and reduced-motion interaction states before they move into
            Theming, Actions, Forms, and Navigation.
          </p>
        </div>
        <div className={styles.dnaGrid}>
          {ICON_DNA_CONTRACTS.map((item) => (
            <article key={item.title} className={styles.dnaCard}>
              <span>{item.source}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <ul className={styles.usageList} aria-label="Downstream icon usage rules">
          {ICON_USAGE_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <div role="tablist" aria-label="Icon sets" className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "premium" ? (
        <>
          <div className={styles.finishRow}>
            <span>Style</span>
            {(["card", "glyph"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={premiumVariant === v}
                className={`${styles.finishBtn} ${premiumVariant === v ? styles.finishBtnActive : ""}`}
                onClick={() => setPremiumVariant(v)}
              >
                {v}
              </button>
            ))}
            <span className={`${styles.count} ${styles.countPush}`}>
              {premiumItems.length} / {carbonRedIcons.length} marks / carbon tile / transparent glyph
            </span>
          </div>
          <div className={styles.premiumTools}>
            <div className={styles.categoryRail} aria-label="Premium icon categories">
              {PREMIUM_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={premiumCategory === category.id}
                  className={`${styles.categoryBtn} ${
                    premiumCategory === category.id ? styles.categoryBtnActive : ""
                  }`}
                  onClick={() => setPremiumCategory(category.id)}
                >
                  <span>{category.label}</span>
                  <span className={styles.categoryCount}>{category.count}</span>
                </button>
              ))}
            </div>
            <label className={styles.searchField}>
              <span className={styles.visuallyHidden}>Search premium icons</span>
              <input
                type="search"
                value={premiumQuery}
                onChange={(event) => setPremiumQuery(event.target.value)}
                placeholder="Search premium icons"
              />
            </label>
          </div>
        </>
      ) : null}

      <div role="tabpanel" aria-label={active?.label} className={styles.tabPanel}>
        {tab === "animated" ? (
          <AnimatedIconsTab />
        ) : showPremiumSections ? (
          <PremiumSections key={premiumVariant} variant={premiumVariant} />
        ) : (
          <PremiumGrid key={premiumVariant} variant={premiumVariant} items={premiumItems} />
        )}
      </div>
    </>
  )
}
