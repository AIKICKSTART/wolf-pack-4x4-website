import styles from "./favicon-preview.module.css"

export type FaviconSize = 16 | 32 | 180 | 192

export interface FaviconPreviewProps {
  title: string
  url: string
  sizes?: ReadonlyArray<FaviconSize>
}

const DEFAULT_SIZES: ReadonlyArray<FaviconSize> = [16, 32, 180, 192]

function FaviconGlyph({ size }: { size: FaviconSize }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label={`Oak Flats mark at ${size} pixels`}
      focusable="false"
    >
      <title>{`${size}px favicon`}</title>
      <rect width="32" height="32" rx="6" fill="var(--primitive-red)" />
      <path
        d="M6 20 L11 14 L14 18 L19 12 L23 16 L26 14"
        fill="none"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth={size >= 32 ? 2.2 : 2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="22" r="1.4" fill="var(--primitive-text-on-accent)" />
    </svg>
  )
}

export function FaviconPreview({ title, url, sizes = DEFAULT_SIZES }: FaviconPreviewProps) {
  return (
    <section className={styles.wrapper} aria-label="Favicon preview">
      <header className={styles.head}>
        <span className={styles.kicker}>Favicon</span>
        <h3 className={styles.title}>Tab + home-screen identity</h3>
        <p className={styles.lede}>
          Every favicon size redraws the mark for the pixel grid it lands on. Small sizes drop the wordmark and
          rely on the chevron silhouette alone.
        </p>
      </header>
      <div className={styles.tabStrip} aria-hidden="true">
        {sizes
          .filter((size) => size <= 32)
          .map((size) => (
            <div key={`tab-${size}`} className={styles.tab}>
              <FaviconGlyph size={size} />
              <span className={styles.tabTitle}>{title}</span>
              <span className={styles.tabClose}>×</span>
            </div>
          ))}
        <span className={styles.tabUrl}>{url}</span>
      </div>
      <div className={styles.sizeRow}>
        {sizes.map((size) => (
          <figure key={size} className={styles.sizeTile}>
            <div className={styles.sizeFrame}>
              <FaviconGlyph size={size} />
            </div>
            <figcaption className={styles.sizeCaption}>
              <strong>{`${size}×${size}`}</strong>
              <span>{SIZE_USAGE[size]}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

const SIZE_USAGE: Record<FaviconSize, string> = {
  16: "Browser tab",
  32: "Bookmarks bar",
  180: "iOS home screen",
  192: "Android PWA",
}
