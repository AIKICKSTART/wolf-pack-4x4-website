"use client"

import { useMemo, useState } from "react"

import { CampaignCard } from "../../components/marketing-campaigns/campaign-card"
import { Chip } from "../../components/primitives/chip"
import type { ChipTone } from "../../components/primitives/chip"
import { QueueCalendar } from "../../components/social-scheduler"
import type { PlatformDescriptor } from "../../components/social-scheduler"

import {
  CALENDAR_DAYS_BY_CAMPAIGN,
  CAMPAIGNS,
  type CalendarCampaign,
  type CampaignKey,
} from "./_demo-data"
import styles from "./social-calendar.module.css"

interface CalendarBoardProps {
  platforms: ReadonlyArray<PlatformDescriptor>
}

const FILTER_TONE: Record<CalendarCampaign["tone"], ChipTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
}

/**
 * Interactive calendar surface: campaign filter chips drive which posts the
 * QueueCalendar shows, and the active non-"all" campaign surfaces a CampaignCard.
 * Drag/keyboard rescheduling stays inside the QueueCalendar primitive.
 */
export function CalendarBoard({ platforms }: CalendarBoardProps) {
  const [active, setActive] = useState<CampaignKey>("all")

  const days = CALENDAR_DAYS_BY_CAMPAIGN[active]
  const activeCampaign = useMemo<CalendarCampaign | undefined>(
    () => CAMPAIGNS.find((campaign) => campaign.key === active && campaign.key !== "all"),
    [active],
  )

  return (
    <section className={styles.boardFrame} aria-labelledby="social-calendar-board-title">
      <header className={styles.boardHead}>
        <span className={styles.boardHeadText}>
          <span className={styles.boardKicker}>Monthly plan</span>
          <h2 id="social-calendar-board-title" className={styles.boardTitle}>
            Content calendar
          </h2>
        </span>
        <div
          className={styles.filterBar}
          role="group"
          aria-label="Filter calendar by campaign"
        >
          {CAMPAIGNS.map((campaign) => (
            <Chip
              key={campaign.key}
              label={campaign.name}
              tone={FILTER_TONE[campaign.tone]}
              selected={active === campaign.key}
              onSelect={() => setActive(campaign.key)}
            />
          ))}
        </div>
      </header>

      {activeCampaign ? (
        <CampaignCard
          name={activeCampaign.name}
          objective={activeCampaign.objective}
          status={activeCampaign.status}
          channels={[...activeCampaign.channels]}
          audienceSize={activeCampaign.audienceSize}
          sendWindow={activeCampaign.sendWindow}
          badge={activeCampaign.badge}
          className={styles.activeCampaign}
        />
      ) : (
        <p className={styles.filterHint}>
          Showing every scheduled post across the four channels. Pick a campaign to focus the
          month.
        </p>
      )}

      <QueueCalendar
        title="Mufflermen social queue"
        initialView="month"
        days={days}
        platforms={platforms}
      />

      <ul className={styles.statusLegend} aria-label="Post status key">
        <li className={styles.legendItem} data-status="scheduled">
          Scheduled
        </li>
        <li className={styles.legendItem} data-status="in-review">
          In review
        </li>
        <li className={styles.legendItem} data-status="draft">
          Draft
        </li>
        <li className={styles.legendItem} data-status="published">
          Published
        </li>
        <li className={styles.legendItem} data-status="failed">
          Failed
        </li>
      </ul>
    </section>
  )
}
