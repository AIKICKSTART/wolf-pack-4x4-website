import { Megaphone } from "lucide-react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"

import styles from "./campaign-card.module.css"
import {
  CHANNEL_LABEL,
  STATUS_LABEL,
  STATUS_TONE,
  type CampaignStatus,
  type ChannelKind,
} from "./marketing-campaigns-types"

interface CampaignCardProps {
  name: string
  /** Internal goal note, e.g. "Drive Bay 2 dyno bookings". */
  objective: string
  status: CampaignStatus
  channels: ReadonlyArray<ChannelKind>
  audienceSize: number
  /** Window label, e.g. "Tue 6:30pm AEST". */
  sendWindow: string
  /** Optional badge content, e.g. "A/B". */
  badge?: string
  className?: string
}

const TONE_TO_CHIP: Record<
  ReturnType<() => (typeof STATUS_TONE)[CampaignStatus]>,
  ChipTone
> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function formatAudience(size: number): string {
  if (size >= 1000) {
    return `${(size / 1000).toFixed(size >= 10000 ? 0 : 1)}k`
  }
  return size.toLocaleString("en-AU")
}

export function CampaignCard({
  name,
  objective,
  status,
  channels,
  audienceSize,
  sendWindow,
  badge,
  className,
}: CampaignCardProps) {
  const accent = STATUS_TONE[status]
  const chipTone = TONE_TO_CHIP[accent]
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Campaign: ${name}`}
    >
      <DashboardCard
        label={badge ? `Campaign · ${badge}` : "Campaign"}
        value={name}
        meta={objective}
        icon={<Megaphone strokeWidth={2.2} size={16} aria-hidden="true" />}
        surface="glass"
        className={styles.card}
      />
      <div className={styles.chips} aria-label="Campaign meta">
        <Chip label={STATUS_LABEL[status]} tone={chipTone} selected />
        {channels.map((channel) => (
          <Chip
            key={channel}
            label={CHANNEL_LABEL[channel]}
            tone="teal"
          />
        ))}
        <Chip
          label={`Audience · ${formatAudience(audienceSize)}`}
          tone="neutral"
        />
        <Chip label={`Send · ${sendWindow}`} tone="amber" />
      </div>
    </section>
  )
}

export default CampaignCard
