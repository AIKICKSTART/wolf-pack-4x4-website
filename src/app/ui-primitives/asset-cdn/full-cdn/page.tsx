import type { Metadata } from "next"

import {
  BulkProcessJobRow,
  CacheInvalidationCard,
  CdnRegionMap,
  ImagePresetCard,
  UsageQuotaTile,
  VideoTranscodeRow,
} from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_BULK_JOBS,
  DEMO_CACHE_INVALIDATIONS,
  DEMO_PRESETS,
  DEMO_QUOTAS,
  DEMO_REGIONS,
  DEMO_VIDEO_TRANSCODE_JOBS,
} from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Full CDN | Asset CDN",
  description:
    "Asset-CDN composition — region map, quota tiles, transcode jobs, invalidations, bulk jobs, and image presets combined into a working CDN console.",
}

export default function FullCdnScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full CDN"
        title="Full CDN console"
        description="Region map sits at the top with the quota tiles. Transcode jobs and invalidations flank each other below. Bulk processing pipelines stack underneath, and the preset catalogue closes out the page. Every primitive shipped in this folder, composed together."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Full CDN" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Composition · asset-cdn primitives</span>

        <div className={styles.full}>
          <div className={`${styles.fullCol} ${styles.fullFull}`}>
            <CdnRegionMap regions={DEMO_REGIONS} highlightId="syd" />
          </div>

          <div className={`${styles.fullCol} ${styles.fullFull}`}>
            <div className={styles.demoQuotaGrid}>
              {DEMO_QUOTAS.map((quota) => (
                <UsageQuotaTile key={quota.resource} quota={quota} />
              ))}
            </div>
          </div>

          <div className={styles.fullCol}>
            <div className={styles.demoStack}>
              <span className={styles.demoLabel}>Replicate transcode queue</span>
              {DEMO_VIDEO_TRANSCODE_JOBS.slice(0, 3).map((job) => (
                <VideoTranscodeRow key={job.id} job={job} />
              ))}
            </div>
          </div>

          <div className={styles.fullCol}>
            <div className={styles.demoStack}>
              <span className={styles.demoLabel}>Recent invalidations</span>
              {DEMO_CACHE_INVALIDATIONS.map((invalidation) => (
                <CacheInvalidationCard key={invalidation.id} invalidation={invalidation} />
              ))}
            </div>
          </div>

          <div className={`${styles.fullCol} ${styles.fullFull}`}>
            <div className={styles.demoStack}>
              <span className={styles.demoLabel}>Bulk pipelines</span>
              {DEMO_BULK_JOBS.slice(0, 3).map((job) => (
                <BulkProcessJobRow key={job.id} job={job} />
              ))}
            </div>
          </div>

          <div className={`${styles.fullCol} ${styles.fullFull}`}>
            <span className={styles.demoLabel}>Preset catalogue</span>
            <div className={styles.demoPresetGrid}>
              {DEMO_PRESETS.slice(0, 4).map((preset, index) => (
                <ImagePresetCard
                  key={preset.id}
                  preset={preset}
                  selected={index === 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
