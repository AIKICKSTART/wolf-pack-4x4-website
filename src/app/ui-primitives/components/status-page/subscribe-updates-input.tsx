"use client"

import { useId, useState } from "react"

import styles from "./subscribe-updates-input.module.css"

export type SubscribeChannel = "email" | "sms"
export type SubscribeFrequency = "instant" | "hourly" | "daily"

export interface SubscribeUpdatesInputProps {
  initialChannel?: SubscribeChannel
  initialFrequency?: SubscribeFrequency
  onSubscribe?: (state: SubscribeState) => void
  privacyNote?: string
  className?: string
}

export interface SubscribeState {
  channel: SubscribeChannel
  endpoint: string
  frequency: SubscribeFrequency
}

const FREQ_LABEL: Record<SubscribeFrequency, string> = {
  instant: "Instant",
  hourly: "Hourly digest",
  daily: "Daily digest",
}

const FREQ_ORDER: ReadonlyArray<SubscribeFrequency> = [
  "instant",
  "hourly",
  "daily",
]

export function SubscribeUpdatesInput({
  initialChannel = "email",
  initialFrequency = "instant",
  onSubscribe,
  privacyNote = "We only use this for status updates. No marketing, ever.",
  className,
}: SubscribeUpdatesInputProps) {
  const [channel, setChannel] = useState<SubscribeChannel>(initialChannel)
  const [endpoint, setEndpoint] = useState<string>("")
  const [frequency, setFrequency] = useState<SubscribeFrequency>(initialFrequency)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const id = useId()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!endpoint.trim()) return
    setSubmitted(true)
    onSubscribe?.({ channel, endpoint: endpoint.trim(), frequency })
  }

  const classes = [styles.form, className].filter(Boolean).join(" ")

  return (
    <form className={classes} onSubmit={handleSubmit} aria-label="Subscribe to status updates">
      <div className={styles.channelToggle} role="radiogroup" aria-label="Channel">
        <button
          type="button"
          role="radio"
          aria-checked={channel === "email"}
          className={[styles.channelOption, channel === "email" ? styles.channelOptionActive : ""].join(" ")}
          onClick={() => setChannel("email")}
        >
          Email
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={channel === "sms"}
          className={[styles.channelOption, channel === "sms" ? styles.channelOptionActive : ""].join(" ")}
          onClick={() => setChannel("sms")}
        >
          SMS
        </button>
      </div>

      <label className={styles.field}>
        <span className={styles.labelText}>
          {channel === "email" ? "Email address" : "Mobile number"}
        </span>
        <input
          id={`${id}-endpoint`}
          className={styles.input}
          type={channel === "email" ? "email" : "tel"}
          inputMode={channel === "email" ? "email" : "tel"}
          placeholder={channel === "email" ? "you@workshop.com" : "+61 4xx xxx xxx"}
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.labelText}>Frequency</span>
        <select
          id={`${id}-frequency`}
          className={styles.select}
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as SubscribeFrequency)}
        >
          {FREQ_ORDER.map((f) => (
            <option key={f} value={f}>
              {FREQ_LABEL[f]}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className={styles.submit}>
        {submitted ? "Subscribed" : "Subscribe"}
      </button>

      <p className={styles.privacy}>{privacyNote}</p>
    </form>
  )
}

export default SubscribeUpdatesInput
