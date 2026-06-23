import Link from "next/link"

import styles from "./button-dna-link.module.css"

export function ButtonDnaLink({ className }: { className?: string }) {
  const classes = [styles.link, className].filter(Boolean).join(" ")

  return (
    <Link className={classes} href="/ui-primitives/actions#button-primitives" prefetch={false}>
      Button DNA
    </Link>
  )
}
