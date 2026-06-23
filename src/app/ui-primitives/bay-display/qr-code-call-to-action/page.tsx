import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QrCodeCallToAction } from "../../components/bay-display"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "QR code call to action | UI Primitives — Bay Display",
}

export default function QrCodeCallToActionPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.14 / Bay display"
        title="QR code call to action"
        description="Large white-tile QR card paired with an Anton hero — book online, leave a review, follow the build journey, join rewards. The QR mock is deterministic from the URL hash; swap in a real QR PNG via qrSrc at integration."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "QR code call to action" },
        ]}
      />
      <section className={styles.canvas}>
        <QrCodeCallToAction
          campaign="book"
          url="mufflermen.com.au/book"
        />
        <QrCodeCallToAction
          campaign="review"
          url="g.page/oakflats-mufflermen/review"
        />
        <QrCodeCallToAction
          campaign="follow"
          url="instagram.com/oakflats.mufflermen"
        />
        <QrCodeCallToAction
          campaign="rewards"
          url="mufflermen.com.au/rewards"
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The default headline + subhead set is driven by the campaign id —
            both are overrideable for one-off promotions. The decorative QR
            mock is a deterministic 25×25 hash of the URL with proper finder
            squares so the layout reads as a QR even in screenshots.
          </p>
        </div>
      </section>
    </main>
  )
}
