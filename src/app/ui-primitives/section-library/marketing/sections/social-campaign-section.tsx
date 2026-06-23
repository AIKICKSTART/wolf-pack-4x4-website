"use client"

import {
  NewsletterCta,
  ProcessSteps,
  type ProcessStep,
} from "@/app/ui-primitives/components/marketing"

import { sectionIcon, type SectionIconName } from "../icons"

import styles from "./social-campaign-section.module.css"

export interface SocialChannelStat {
  id: string
  /** Channel name, e.g. "Instagram". */
  name: string
  /** Handle, e.g. "@oakflatsmufflermen". */
  handle: string
  /** Follower / audience count, formatted. */
  audience: string
  /** Channel link. */
  href: string
  icon: SectionIconName
}

export interface SocialCampaignSectionProps {
  kicker: string
  heading: string
  body: string
  /** Social channels — rendered as a linked channel rail. */
  channels: ReadonlyArray<SocialChannelStat>
  /** Campaign flow — composes ProcessSteps. */
  steps: ReadonlyArray<ProcessStep>
  /** Newsletter capture heading. */
  captureHeading: string
  /** Newsletter capture body. */
  captureBody?: string
  /** Fired with the entered email on subscribe. */
  onSubscribe?: (email: string) => void | Promise<void>
  className?: string
}

function ChannelCard({ channel }: { channel: SocialChannelStat }) {
  return (
    <a className={styles.channel} href={channel.href}>
      <span className={styles.channelIcon} aria-hidden="true">
        {sectionIcon(channel.icon)}
      </span>
      <span className={styles.channelMeta}>
        <strong className={styles.channelName}>{channel.name}</strong>
        <span className={styles.channelHandle}>{channel.handle}</span>
      </span>
      <span className={styles.channelAudience}>{channel.audience}</span>
    </a>
  )
}

/**
 * Social campaign section — a linked channel rail, the campaign flow rendered
 * via ProcessSteps, and a NewsletterCta capture. Composes existing primitives;
 * token-driven; light/dark via tokens; reduced-motion respected by the children.
 */
export function SocialCampaignSection({
  kicker,
  heading,
  body,
  channels,
  steps,
  captureHeading,
  captureBody,
  onSubscribe,
  className,
}: SocialCampaignSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <header className={styles.header}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.body}>{body}</p>
      </header>

      <ul className={styles.channels} aria-label="Follow Mufflermen">
        {channels.map((channel) => (
          <li key={channel.id} className={styles.channelCell}>
            <ChannelCard channel={channel} />
          </li>
        ))}
      </ul>

      <ProcessSteps steps={steps} />

      <div className={styles.capture}>
        <NewsletterCta
          heading={captureHeading}
          body={captureBody}
          ctaLabel="Get the drops"
          onSubmit={onSubscribe}
        />
      </div>
    </section>
  )
}

export default SocialCampaignSection
