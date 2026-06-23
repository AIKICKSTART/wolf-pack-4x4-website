import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AfterRecordPreview,
  AudioLevelMeter,
  DeviceSourceSelector,
  LiveAnnotationOverlay,
  RecordModePicker,
  RecordedClipTrimHandles,
  RecordingControls,
  RecordingRegionSelector,
  RecordingTimerPill,
  RecordingWatermarkBadge,
  ShareRecordingModal,
  StartRecordButton,
  TranscriptGenerationStatus,
  WebcamBubble,
} from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Full screen recorder flow | Screen recorder",
  description:
    "Composition — Workshop tour Bay 2 install walkthrough. Pre-record stage with mode picker + device selector + webcam bubble preview + start button; recording stage with timer pill, controls, region selector, annotation overlay and audio meter; post-record stage with preview, trim handles, transcript status and share modal.",
}

const MICROPHONES = [
  { id: "mic-rode", label: "Rode NT-USB Mini", subtitle: "Bench mic · USB 2.0", active: true },
  { id: "mic-dpa", label: "DPA 6060 Lav", subtitle: "Brodie · wireless" },
  { id: "mic-built", label: "MacBook Pro built-in", subtitle: "Backup only" },
]
const SPEAKERS = [
  { id: "spk-yamaha", label: "Yamaha HS5 monitors", subtitle: "Desk · 1/4-inch", active: true },
  { id: "spk-built", label: "MacBook Pro built-in" },
]
const CAMERAS = [
  { id: "cam-logi", label: "Logitech Brio 4K", subtitle: "Tripod · over-shoulder", active: true },
  { id: "cam-iphone", label: "iPhone Continuity Camera", subtitle: "Hand-held overhead" },
]

export default function FullScreenRecorderFlowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full screen recorder flow"
        title="Workshop tour — Bay 2 install walkthrough"
        description="Loom-style three-stage flow composed of the 14 primitives. Pre-record selects mode + sources + camera position, recording overlays the region selector with controls and annotation, and post-record reviews + trims + transcribes + shares."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Full recorder flow" },
        ]}
      />

      <span className={styles.notice}>
        Capture pipeline mocked — three stages stitched for review
      </span>

      <div className={styles.flowLayout}>
        <section className={styles.demoSurface}>
          <header className={styles.stageHeader}>
            <span className={styles.stageNumber}>1</span>
            <div>
              <span className={styles.stageKicker}>Pre-record</span>
              <h2 className={styles.stageTitle}>Pick mode, sources and a webcam corner</h2>
            </div>
          </header>
          <div className={styles.flowStageRow}>
            <div className={styles.demoStack}>
              <RecordModePicker value="screen+camera" />
              <DeviceSourceSelector
                microphones={MICROPHONES}
                speakers={SPEAKERS}
                cameras={CAMERAS}
                microphoneId="mic-rode"
                speakerId="spk-yamaha"
                cameraId="cam-logi"
              />
            </div>
            <aside className={styles.flowAside}>
              <WebcamBubble position="bottom-right" sizePx={108} mirrored />
              <div className={styles.demoStage} style={{ minHeight: 200 }}>
                <StartRecordButton state="idle" />
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.demoSurface}>
          <header className={styles.stageHeader}>
            <span className={styles.stageNumber}>2</span>
            <div>
              <span className={styles.stageKicker}>Recording</span>
              <h2 className={styles.stageTitle}>Brodie walks through the bay 2 install</h2>
            </div>
          </header>
          <div className={styles.flowStageRow}>
            <div className={styles.regionStage}>
              <RecordingRegionSelector
                resolution="1080p"
                fps={30}
                stageLabel="Capturing 1456×820 region"
              />
              <div className={styles.regionOverlay}>
                <div className={styles.regionFloatRow}>
                  <RecordingTimerPill elapsedSec={342} bandwidthLabel="4.2 Mbps" />
                </div>
                <div className={styles.regionFloatRowBottom}>
                  <RecordingControls
                    state="recording"
                    elapsedSec={342}
                    storageLabel="1.4 GB left"
                  />
                </div>
              </div>
            </div>
            <aside className={styles.flowAside}>
              <AudioLevelMeter left={0.62} right={0.58} peak={0.78} />
              <RecordingWatermarkBadge
                brand="Oak Flats Mufflermen"
                tagline="Workshop tour"
                position="bottom-right"
                opacity={0.7}
              />
            </aside>
          </div>
          <div className={styles.demoStack} style={{ marginTop: 18 }}>
            <span className={styles.demoLabel}>Live annotation overlay — pause to mark up</span>
            <LiveAnnotationOverlay activeTool="box" activeColor="var(--primitive-red)" />
          </div>
        </section>

        <section className={styles.demoSurface}>
          <header className={styles.stageHeader}>
            <span className={styles.stageNumber}>3</span>
            <div>
              <span className={styles.stageKicker}>Post-record</span>
              <h2 className={styles.stageTitle}>Review, trim, transcribe and share</h2>
            </div>
          </header>
          <div className={styles.flowStageRow}>
            <div className={styles.demoStack}>
              <AfterRecordPreview
                title="Workshop tour — Bay 2 install walkthrough"
                durationSec={482}
                sizeLabel="184 MB"
                resolutionLabel="1080p · 30fps · WebM"
              />
              <RecordedClipTrimHandles
                durationSec={482}
                startSec={6}
                endSec={468}
                playheadSec={184}
                activeSide="none"
              />
              <TranscriptGenerationStatus status="processing" etaSec={48} />
            </div>
            <aside className={styles.modalCol}>
              <ShareRecordingModal
                recordingTitle="Workshop tour — Bay 2 install walkthrough"
                shareUrl="https://share.mufflermen.com.au/r/bay2-install-walkthrough"
                privacy="team"
                emailRecipients="brodie@mufflermen.com.au, kelsey@mufflermen.com.au"
                expiryDate="2026-07-31"
              />
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
