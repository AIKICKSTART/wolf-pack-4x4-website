import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { ProfileScreen } from "./_components"
import styles from "./profile.module.css"

export const metadata: Metadata = {
  title: "User profile | Torque",
  description:
    "The Oak Flats Muffler Men owner profile — identity and plan, a 30-day activity summary, notification preferences, signed-in devices and a recent-actions log. Composed entirely from registered account primitives.",
}

export default function ProfilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Account / Profile"
        title="User profile"
        description="The workshop principal's profile inside the Oak Flats Muffler Men workspace — who you are on every quote and reply, what's moved through your bays this cycle, how Torque reaches you, and where you're signed in. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "User profile" },
        ]}
      />

      <ProfileScreen />
    </main>
  )
}
