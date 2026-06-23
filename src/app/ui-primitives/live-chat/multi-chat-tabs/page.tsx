"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { MultiChatTabs } from "../../components/live-chat"

import { MULTI_CHAT_TABS } from "../_mock-data"
import styles from "../live-chat.module.css"

export default function MultiChatTabsScenePage() {
  const [activeId, setActiveId] = useState<string>("q1")

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Tabs"
        title="Multi-chat tabs"
        description="Tab strip across active chats. Each tab shows the visitor avatar, name, a short context line and an unread badge. The active tab uses the Mufflermen-red lift; non-active tabs sit flat. Close affordance lives inside the tab and is stopPropagation-safe. role=tablist with role=tab on each pill."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Multi-chat tabs" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · 4 active chats · close + new
        </span>
        <MultiChatTabs
          tabs={MULTI_CHAT_TABS}
          activeId={activeId}
          onSelect={setActiveId}
          onClose={() => undefined}
          onNew={() => undefined}
        />
      </section>
    </main>
  )
}
