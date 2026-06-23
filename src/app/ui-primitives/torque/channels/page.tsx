import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { ChannelsBand, ChannelsConsole } from "./_components"
import styles from "./channels.module.css"

export const metadata: Metadata = {
  title: "Platform channels | Torque",
  description:
    "The Oak Flats Muffler Men connected channels — Telegram, website live chat, SMS, email and Discord — with live health, an add-channel flow, the Telegram-bot setup, routing rules and an audit trail. Composed entirely from registered primitives.",
}

export default function ChannelsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Platform channels"
        title="Platform channels"
        description="Connect every place a customer can reach Oak Flats Muffler Men and let Torque answer there — Telegram, the website chat, SMS, email and more. Live health, an add-channel flow, the Telegram-bot setup, routing and audit, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Platform channels" },
        ]}
      />

      <ChannelsBand />
      <ChannelsConsole />
    </main>
  )
}
