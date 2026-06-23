import styles from "./mood-board.module.css"

export type MoodTileKind = "image" | "swatch" | "texture" | "type" | "quote"

export interface MoodTile {
  id: string
  kind: MoodTileKind
  label: string
  detail?: string
  background?: string
  span?: "tall" | "wide" | "square"
}

export interface MoodBoardProps {
  tiles: ReadonlyArray<MoodTile>
}

export function MoodBoard({ tiles }: MoodBoardProps) {
  return (
    <section className={styles.wrapper} aria-label="Brand mood board">
      <header className={styles.head}>
        <span className={styles.kicker}>Mood board</span>
        <h2 className={styles.title}>Workshop, grit, and chrome</h2>
        <p className={styles.lede}>
          A pinned composition of references — surfaces, textures, type pairings, and atmospheric colour pulls
          that define the Oak Flats Mufflermen visual register.
        </p>
      </header>
      <div className={styles.masonry}>
        {tiles.map((tile) => (
          <article
            key={tile.id}
            className={[
              styles.tile,
              styles[`kind-${tile.kind}`],
              tile.span ? styles[`span-${tile.span}`] : "",
            ].join(" ")}
            style={tile.background ? { background: tile.background } : undefined}
          >
            <span className={styles.tileLabel}>{tile.label}</span>
            {tile.detail ? <span className={styles.tileDetail}>{tile.detail}</span> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
