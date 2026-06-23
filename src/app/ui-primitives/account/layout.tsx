import type { ReactNode } from "react"

import styles from "./account.module.css"
import { AccountSidebar } from "./account-sidebar"

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.shell}>
      <aside className={styles.aside} aria-label="Account settings navigation">
        <AccountSidebar />
      </aside>
      <section className={styles.content} aria-label="Account content">
        {children}
      </section>
    </main>
  )
}
