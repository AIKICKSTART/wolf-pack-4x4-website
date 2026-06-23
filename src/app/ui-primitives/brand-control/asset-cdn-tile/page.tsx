import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AssetCdnTile, MOCK_ASSETS } from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Asset CDN tile | Brand control",
}

const [KNIGHT, WORDMARK, MONOGRAM, PATTERN] = MOCK_ASSETS

function WordmarkPreview() {
  return (
    <svg viewBox="0 0 220 60" width={160} height={42} aria-hidden="true">
      <text
        x="110"
        y="42"
        textAnchor="middle"
        fontFamily="Anton, Impact, sans-serif"
        fontSize="36"
        letterSpacing="2"
        fill="var(--primitive-body)"
      >
        OAK FLATS
      </text>
    </svg>
  )
}

function MonogramPreview() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: 56,
        height: 56,
        borderRadius: "var(--primitive-radius-lg)",
        background: "var(--primitive-red)",
        color: "var(--primitive-text-on-accent)",
        fontFamily: "var(--primitive-font-display)",
        fontSize: "var(--primitive-text-xl)",
        letterSpacing: 1.5,
      }}
    >
      OFM
    </div>
  )
}

function PatternPreview() {
  return (
    <div
      style={{
        width: 96,
        height: 56,
        borderRadius: "var(--primitive-radius-md)",
        backgroundImage:
          "repeating-linear-gradient(45deg, color-mix(in oklab, var(--primitive-text-strong) 8%, transparent) 0 4px, transparent 4px 8px)",
        background:
          "repeating-linear-gradient(45deg, color-mix(in oklab, var(--primitive-text-strong) 18%, transparent) 0 3px, var(--primitive-canvas) 3px 7px)",
      }}
    />
  )
}

export default function AssetCdnTileRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 05"
          title="Asset CDN tile"
          description="Single brand asset card — usage count, variants, master byte size, uploader trace."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Asset CDN tile" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            The primary knight badge with the default custom thumb, the OFM wordmark with an inline SVG preview, and the carbon-fibre pattern tile.
          </p>
        </div>

        <section className={styles.stateGrid} aria-label="Asset tiles">
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 01 · Knight badge</span>
            <AssetCdnTile asset={KNIGHT} />
          </div>
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 02 · Wordmark</span>
            <AssetCdnTile asset={WORDMARK} preview={<WordmarkPreview />} />
          </div>
          <div className={styles.stateWrap}>
            <span className={styles.stateLabel}>State 03 · Monogram + pattern</span>
            <AssetCdnTile asset={MONOGRAM} preview={<MonogramPreview />} />
            <AssetCdnTile asset={PATTERN} preview={<PatternPreview />} />
          </div>
        </section>
      </div>
    </main>
  )
}
