"use client"

import { useEffect, useRef, useState } from "react"

import styles from "./notification-rule-builder.module.css"

export type RuleSlotKind = "event" | "channel" | "delay" | "condition"

export interface RuleSlotOption {
  value: string
  label: string
  hint?: string
}

export interface RuleSlotConfig {
  kind: RuleSlotKind
  label: string
  options: ReadonlyArray<RuleSlotOption>
  defaultValue: string
}

export interface NotificationRuleValue {
  event: string
  channel: string
  delay: string
  condition: string
}

interface NotificationRuleBuilderProps {
  eventSlot: RuleSlotConfig
  channelSlot: RuleSlotConfig
  delaySlot: RuleSlotConfig
  conditionSlot: RuleSlotConfig
  onChange?: (value: NotificationRuleValue) => void
  className?: string
}

interface SlotProps {
  config: RuleSlotConfig
  value: string
  onChange: (value: string) => void
}

function Slot({ config, value, onChange }: SlotProps) {
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const selected = config.options.find((opt) => opt.value === value)

  useEffect(() => {
    if (!open) return
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <span ref={ref} className={styles.slot}>
      <button
        type="button"
        className={styles.slotTrigger}
        data-tone={config.kind}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {selected?.label ?? config.label}
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div role="listbox" className={styles.menu} aria-label={config.label}>
          {config.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              className={styles.menuItem}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
            >
              <span>{opt.label}</span>
              {opt.hint && <span className={styles.menuHint}>{opt.hint}</span>}
            </button>
          ))}
        </div>
      )}
    </span>
  )
}

export function NotificationRuleBuilder({
  eventSlot,
  channelSlot,
  delaySlot,
  conditionSlot,
  onChange,
  className,
}: NotificationRuleBuilderProps) {
  const [value, setValue] = useState<NotificationRuleValue>({
    event: eventSlot.defaultValue,
    channel: channelSlot.defaultValue,
    delay: delaySlot.defaultValue,
    condition: conditionSlot.defaultValue,
  })

  const update = (patch: Partial<NotificationRuleValue>) => {
    const next = { ...value, ...patch }
    setValue(next)
    onChange?.(next)
  }

  const eventLabel = eventSlot.options.find((o) => o.value === value.event)?.label ?? ""
  const channelLabel = channelSlot.options.find((o) => o.value === value.channel)?.label ?? ""
  const delayLabel = delaySlot.options.find((o) => o.value === value.delay)?.label ?? ""
  const conditionLabel =
    conditionSlot.options.find((o) => o.value === value.condition)?.label ?? ""

  const classes = [styles.builder, className].filter(Boolean).join(" ")

  return (
    <fieldset className={classes}>
      <legend className={styles.legend}>Notification rule</legend>
      <div className={styles.composer}>
        <span className={styles.connector}>When</span>
        <Slot
          config={eventSlot}
          value={value.event}
          onChange={(v) => update({ event: v })}
        />
        <span className={styles.connector}>send to</span>
        <Slot
          config={channelSlot}
          value={value.channel}
          onChange={(v) => update({ channel: v })}
        />
        <span className={styles.connector}>after</span>
        <Slot
          config={delaySlot}
          value={value.delay}
          onChange={(v) => update({ delay: v })}
        />
        <span className={styles.connector}>unless</span>
        <Slot
          config={conditionSlot}
          value={value.condition}
          onChange={(v) => update({ condition: v })}
        />
      </div>

      <div className={styles.preview} role="status" aria-live="polite">
        <p className={styles.previewLabel}>Preview</p>
        <p className={styles.previewText}>
          When <strong>{eventLabel}</strong>, send to <strong>{channelLabel}</strong>{" "}
          after <strong>{delayLabel}</strong>, unless <strong>{conditionLabel}</strong>.
        </p>
      </div>
    </fieldset>
  )
}

export default NotificationRuleBuilder
