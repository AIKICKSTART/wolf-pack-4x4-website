import { Avatar } from "../primitives/avatar"
import type { ContactChannel } from "./crm-types"
import styles from "./contact-card-mini.module.css"

interface ContactCardMiniProps {
  id: string
  name: string
  role: string
  avatarSrc?: string
  channel: ContactChannel
  channelValue: string
  className?: string
}

const CHANNEL_LABEL: Record<ContactChannel, string> = {
  phone: "Call",
  email: "Email",
  sms: "Text",
  dm: "Message",
}

const CHANNEL_GLYPH: Record<ContactChannel, string> = {
  phone: "☎",
  email: "✉",
  sms: "▢",
  dm: "◐",
}

const CHANNEL_HREF: Record<ContactChannel, (value: string) => string> = {
  phone: (v) => `tel:${v.replace(/\s/g, "")}`,
  email: (v) => `mailto:${v}`,
  sms: (v) => `sms:${v.replace(/\s/g, "")}`,
  dm: () => "#",
}

export function ContactCardMini({
  id,
  name,
  role,
  avatarSrc,
  channel,
  channelValue,
  className,
}: ContactCardMiniProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-contact-id={id}
      aria-label={`Contact: ${name}, ${role}`}
    >
      <Avatar name={name} src={avatarSrc} size="md" tone="obsidian" />
      <div className={styles.body}>
        <h4 className={styles.name}>{name}</h4>
        <span className={styles.role}>{role}</span>
      </div>
      <a
        className={styles.channel}
        data-channel={channel}
        href={CHANNEL_HREF[channel](channelValue)}
        aria-label={`${CHANNEL_LABEL[channel]} ${name}`}
      >
        <span aria-hidden="true">{CHANNEL_GLYPH[channel]}</span>
        <span>{CHANNEL_LABEL[channel]}</span>
      </a>
    </article>
  )
}

export default ContactCardMini
