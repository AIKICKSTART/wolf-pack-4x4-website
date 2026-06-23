"use client"

import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"
import { PhoneRingIcon } from "../icons/phone-ring"
import { EnvelopeTrailIcon } from "../icons/envelope-trail"
import { SignalPulseIcon } from "../icons/signal-pulse"
import {
  CHANNEL_LABEL,
  type NotificationChannel,
  type NotificationTopic,
} from "./customer-portal-types"

import styles from "./notification-pref-panel.module.css"

interface NotificationPrefPanelProps {
  topics: ReadonlyArray<NotificationTopic>
  /** Optional change handler, fires on every toggle. */
  onChange?: (
    topicId: string,
    channel: NotificationChannel,
    enabled: boolean,
  ) => void
  className?: string
}

const CHANNEL_ICON: Readonly<
  Record<NotificationChannel, typeof PhoneRingIcon>
> = {
  sms: PhoneRingIcon,
  email: EnvelopeTrailIcon,
  push: SignalPulseIcon,
}

const CHANNEL_DESCRIPTION: Readonly<Record<NotificationChannel, string>> = {
  sms: "0412 884 920",
  email: "mick.davis@outlook.com",
  push: "Mufflermen app",
}

type State = Record<string, Record<NotificationChannel, boolean>>

function buildInitial(topics: ReadonlyArray<NotificationTopic>): State {
  const state: State = {}
  for (const topic of topics) {
    state[topic.id] = {
      sms: topic.channels.sms,
      email: topic.channels.email,
      push: topic.channels.push,
    }
  }
  return state
}

const CHANNELS: ReadonlyArray<NotificationChannel> = ["sms", "email", "push"]

export function NotificationPrefPanel({
  topics,
  onChange,
  className,
}: NotificationPrefPanelProps) {
  const [state, setState] = useState<State>(() => buildInitial(topics))

  const summary = useMemo(() => {
    let onCount = 0
    let totalCount = 0
    for (const topic of topics) {
      for (const channel of CHANNELS) {
        totalCount += 1
        if (state[topic.id]?.[channel]) {
          onCount += 1
        }
      }
    }
    return { onCount, totalCount }
  }, [state, topics])

  const handleToggle = (topicId: string, channel: NotificationChannel) => {
    setState((current) => {
      const topicState = current[topicId] ?? { sms: false, email: false, push: false }
      const next: State = {
        ...current,
        [topicId]: { ...topicState, [channel]: !topicState[channel] },
      }
      onChange?.(topicId, channel, next[topicId][channel])
      return next
    })
  }

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Notification preferences">
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Notifications</span>
          <h3 className={styles.title}>How should we hit you up?</h3>
        </div>
        <Chip
          label={`${summary.onCount} of ${summary.totalCount} channels on`}
          tone="amber"
        />
      </header>

      <div className={styles.channelLegend} role="presentation">
        <span className={styles.channelLegendCell}>Topic</span>
        {CHANNELS.map((channel) => {
          const Icon = CHANNEL_ICON[channel]
          return (
            <span
              key={channel}
              className={styles.channelLegendCell}
              aria-label={`${CHANNEL_LABEL[channel]} — ${CHANNEL_DESCRIPTION[channel]}`}
            >
              <span className={styles.channelIcon} aria-hidden="true">
                <Icon size={16} tone="currentColor" motion="none" />
              </span>
              <span className={styles.channelTextStack}>
                <span className={styles.channelHead}>
                  {CHANNEL_LABEL[channel]}
                </span>
                <span className={styles.channelSub}>
                  {CHANNEL_DESCRIPTION[channel]}
                </span>
              </span>
            </span>
          )
        })}
      </div>

      <ul className={styles.topicList}>
        {topics.map((topic) => {
          const topicState = state[topic.id]
          return (
            <li key={topic.id} className={styles.topicRow}>
              <div className={styles.topicText}>
                <span className={styles.topicLabel}>{topic.label}</span>
                <span className={styles.topicDesc}>{topic.description}</span>
              </div>
              {CHANNELS.map((channel) => {
                const enabled = Boolean(topicState?.[channel])
                return (
                  <label
                    key={channel}
                    className={[
                      styles.toggle,
                      enabled ? styles.toggleOn : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className={styles.srOnly}>
                      {CHANNEL_LABEL[channel]} for {topic.label}
                    </span>
                    <input
                      type="checkbox"
                      className={styles.toggleInput}
                      checked={enabled}
                      onChange={() => handleToggle(topic.id, channel)}
                      aria-label={`${enabled ? "Disable" : "Enable"} ${CHANNEL_LABEL[channel]} for ${topic.label}`}
                    />
                    <span className={styles.toggleTrack}>
                      <span className={styles.toggleThumb} aria-hidden="true" />
                    </span>
                  </label>
                )
              })}
            </li>
          )
        })}
      </ul>

      <footer className={styles.foot}>
        Quiet hours: 9pm – 7am on SMS &amp; push. Email always goes through.
      </footer>
    </section>
  )
}

export default NotificationPrefPanel
