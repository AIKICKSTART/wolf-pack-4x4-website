import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { GroupChatScene } from "./group-chat-scene"
import styles from "./group-chat.module.css"

export const metadata: Metadata = {
  title: "Torque group chat & @mention routing | UI Primitives — Torque",
}

export default function GroupChatPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque / Group chat"
        title="Group chat & @mention routing"
        description="One room where the owner of Oak Flats Muffler Men and Torque's sub-agents — @blog, @social, @seo and @workshop — collaborate. @mention an agent to route the work, follow threaded replies, and watch presence and room activity update live."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "Group chat & @mention routing" },
        ]}
      />
      <section className={styles.canvas}>
        <GroupChatScene />
      </section>
    </main>
  )
}
