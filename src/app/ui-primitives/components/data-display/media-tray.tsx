import Image from "next/image"

import styles from "./media-tray.module.css"

export interface MediaTrayItem {
  id: string
  title: string
  meta?: string
  tag?: string
  src?: string
  /** Placeholder fallback text when no src is provided. */
  placeholder?: string
}

interface MediaTrayProps {
  title?: string
  kicker?: string
  items: ReadonlyArray<MediaTrayItem>
  className?: string
  ariaLabel?: string
}

export function MediaTray({
  title,
  kicker,
  items,
  className,
  ariaLabel,
}: MediaTrayProps) {
  const classes = [styles.tray, className].filter(Boolean).join(" ")
  const label = ariaLabel ?? title ?? "Media tray"

  return (
    <section className={classes} aria-label={label}>
      {(title || kicker) && (
        <header className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {kicker && <span className={styles.kicker}>{kicker}</span>}
        </header>
      )}
      <div className={styles.scroller} tabIndex={0}>
        {items.map((item) => (
          <figure key={item.id} className={styles.figure}>
            <div className={styles.media}>
              {item.tag && <span className={styles.tag}>{item.tag}</span>}
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  width={280}
                  height={210}
                  unoptimized
                />
              ) : (
                <span className={styles.placeholder} aria-hidden="true">
                  {item.placeholder ?? "Media"}
                </span>
              )}
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.captionTitle}>{item.title}</span>
              {item.meta && <span className={styles.captionMeta}>{item.meta}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default MediaTray
