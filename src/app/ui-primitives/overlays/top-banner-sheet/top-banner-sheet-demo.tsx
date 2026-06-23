"use client"

import { useState } from "react"

import { TopBannerSheet } from "../../components/overlays"
import type { TopBannerTone } from "../../components/overlays"
import styles from "../overlays.module.css"

interface BannerConfig {
  tone: TopBannerTone
  title: string
  message: string
  ctaLabel: string
  label: string
}

const BANNERS: Record<string, BannerConfig> = {
  info: {
    tone: "info",
    title: "Roadworthy season",
    message: "We are extending hours Mon–Fri 07:00–18:30 until 30 June for rego inspections.",
    ctaLabel: "Book a slot",
    label: "Info tone",
  },
  warning: {
    tone: "warning",
    title: "Supplier price rise",
    message: "Magnaflow stainless cat-backs will increase 7% on 14 June. Lock pricing this week.",
    ctaLabel: "Lock pricing",
    label: "Warning tone",
  },
  danger: {
    tone: "danger",
    title: "Bay 02 closed for hoist service",
    message: "Hoist 02 is offline until 19:00 today. Reschedule Bay 02 tickets to Bay 04 or 05.",
    ctaLabel: "View schedule",
    label: "Danger tone",
  },
}

export function TopBannerSheetDemo() {
  const [openKey, setOpenKey] = useState<keyof typeof BANNERS | null>(null)

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        {(Object.keys(BANNERS) as Array<keyof typeof BANNERS>).map((key) => (
          <button
            key={key}
            type="button"
            className={key === "danger" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setOpenKey(key)}
          >
            Show {BANNERS[key].label.toLowerCase()}
          </button>
        ))}
      </div>
      <span className={styles.stageHelp}>Trigger · pick a tone</span>

      {(Object.keys(BANNERS) as Array<keyof typeof BANNERS>).map((key) => {
        const banner = BANNERS[key]
        return (
          <TopBannerSheet
            key={key}
            open={openKey === key}
            onOpenChange={(value) => {
              if (!value) {
                setOpenKey(null)
              }
            }}
            title={banner.title}
            message={banner.message}
            tone={banner.tone}
            actions={
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setOpenKey(null)}
              >
                {banner.ctaLabel}
              </button>
            }
          />
        )
      })}
    </div>
  )
}
