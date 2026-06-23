"use client"

import { useState } from "react"

import { DockCornerQuick } from "@/app/ui-primitives/components/chrome"

export function CornerQuickDemo() {
  const [composerCount, setComposerCount] = useState<number>(0)

  return (
    <DockCornerQuick
      layout="static"
      hintLabel={`Composer used ${composerCount}x`}
      chatBadge={2}
      onComposeClick={() => setComposerCount((value) => value + 1)}
      onChatClick={() => undefined}
      onScrollTopClick={() => undefined}
      onThemeToggleClick={() => undefined}
    />
  )
}
