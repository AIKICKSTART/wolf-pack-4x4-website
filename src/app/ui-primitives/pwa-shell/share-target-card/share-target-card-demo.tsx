"use client"

import { Building2, MessageSquare, PhoneCall, Wrench } from "lucide-react"
import { useState } from "react"

import { ShareTargetCard } from "../../components/pwa-shell"
import type { PwaShareChannel } from "../../components/pwa-shell"
import styles from "../pwa-shell.module.css"

const CHANNELS: ReadonlyArray<PwaShareChannel> = [
  {
    id: "front-counter",
    label: "Front counter",
    recipient: "Bex on reception",
    icon: <PhoneCall size={12} strokeWidth={2.4} />,
  },
  {
    id: "bay-2",
    label: "Bay 2 crew",
    recipient: "Roo · Macca · Tatts",
    icon: <Wrench size={12} strokeWidth={2.4} />,
  },
  {
    id: "supplier",
    label: "Supplier",
    recipient: "Manta · Smithfield",
    icon: <Building2 size={12} strokeWidth={2.4} />,
  },
  {
    id: "sms",
    label: "Customer SMS",
    recipient: "Holden VE Ute · ABC123",
    icon: <MessageSquare size={12} strokeWidth={2.4} />,
  },
]

export function ShareTargetCardDemo() {
  const [selected, setSelected] = useState<ReadonlyArray<string>>(["bay-2"])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    )
  }

  return (
    <div className={styles.states}>
      <div className={styles.stateCard}>
        <header className={styles.stateHead}>
          <span className={styles.stateKicker}>State · 01</span>
          <h2 className={styles.stateTitle}>Text-only share</h2>
        </header>
        <p className={styles.stateBody}>Single channel pre-selected, no media.</p>
        <ShareTargetCard
          caption="Hey crew — VE Ute will be 15 min late, traffic on the Princes."
          source="Customer SMS"
          receivedAt="2 min ago"
          channels={CHANNELS}
          selectedChannelIds={["front-counter"]}
          onShare={() => undefined}
        />
      </div>
      <div className={styles.stateCard}>
        <header className={styles.stateHead}>
          <span className={styles.stateKicker}>State · 02</span>
          <h2 className={styles.stateTitle}>With image attachment</h2>
        </header>
        <p className={styles.stateBody}>Image preview pill with file size.</p>
        <ShareTargetCard
          caption="Snapped exhaust hanger, just under the rear muffler — need a quote please."
          source="Photos"
          receivedAt="Just now"
          media={{ kind: "image", label: "exhaust-hanger.jpg", size: "1.8 MB" }}
          channels={CHANNELS}
          selectedChannelIds={["front-counter", "bay-2"]}
          onShare={() => undefined}
          onCancel={() => undefined}
        />
      </div>
      <div className={styles.stateCard}>
        <header className={styles.stateHead}>
          <span className={styles.stateKicker}>State · 03</span>
          <h2 className={styles.stateTitle}>Interactive · tap channels</h2>
        </header>
        <p className={styles.stateBody}>Try toggling the chips. Share button disabled at zero.</p>
        <ShareTargetCard
          caption="Catback fit-up looks good. Welds curing, sending pics to Manta + customer."
          source="Crew Bay 2"
          receivedAt="Just now"
          media={{ kind: "video", label: "fit-up-clip.mp4", size: "12.4 MB" }}
          channels={CHANNELS}
          selectedChannelIds={selected}
          onToggleChannel={toggle}
          onShare={() => undefined}
          onCancel={() => undefined}
        />
      </div>
    </div>
  )
}
