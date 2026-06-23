import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "./torque-chat.module.css"
import { TorqueChatScene } from "./torque-chat-scene"

export const metadata: Metadata = {
  title: "Torque assistant chat | UI Primitives — Torque",
}

export default function TorqueChatPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque / Customer chat"
        title="Torque assistant chat"
        description="The customer-facing Torque conversation surface — where the owner of Oak Flats Muffler Men sends one message and Torque drafts the blog, the social posts, and the booking call-to-action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "Torque assistant chat" },
        ]}
      />
      <section className={styles.canvas}>
        <TorqueChatScene />
      </section>
    </main>
  )
}
