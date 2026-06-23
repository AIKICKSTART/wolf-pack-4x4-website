import type { Metadata } from "next"

import {
  AudioWaveformTrack,
  ClipThumbnailStrip,
  ClipTrimHandles,
  ColorGradingWheels,
  CueMarkerPin,
  EffectChip,
  PlayheadCursor,
  SpeedRampCurve,
  SubtitleRow,
  TimelineRuler,
  TimelineTrack,
  TrackRowHeader,
  TransitionBetweenClips,
} from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Full video editor | Video editor",
  description:
    "Composition — multi-track stack for the Workshop tour - Bay 2 exhaust install. Two video tracks, two audio tracks, one subtitle row, color wheels, speed ramp, and a playhead spanning the lot.",
}

const TOTAL_SEC = 36
const PX_PER_SEC = 28

function buildWaveform(seed: number, length: number): ReadonlyArray<number> {
  return Array.from({ length }, (_, index) => {
    const phase = (index + seed) / length
    const envelope = Math.sin(phase * Math.PI * 2) * 0.5 + 0.5
    const detail = Math.sin(phase * Math.PI * 18 + seed) * 0.18
    const grit = Math.sin(phase * Math.PI * 51 + seed * 0.5) * 0.08
    return Math.max(0.08, envelope * 0.72 + detail + grit)
  })
}

const CUES = [
  { index: 1, startSec: 1.2, endSec: 4.2, text: "Right-o, Hilux just rolled in." },
  { index: 2, startSec: 5.4, endSec: 9.4, text: "Old muffler's cooked — pulling it now." },
  { index: 3, startSec: 11.0, endSec: 15.2, text: "Manta cat-back, three-inch bore." },
  { index: 4, startSec: 16.0, endSec: 20.6, text: "Bolt-on fit, no flares needed." },
  { index: 5, startSec: 22.2, endSec: 27.0, text: "On the dyno — listen to her sing." },
  { index: 6, startSec: 28.6, endSec: 33.0, text: "Owner's grinning. That's the brief." },
] as const

const TRACK_HEADER_WIDTH = 184

export default function FullVideoEditorScenePage() {
  const timelineWidth = TOTAL_SEC * PX_PER_SEC

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full video editor"
        title="Workshop tour — Bay 2 exhaust install"
        description="The 14 timeline primitives composed into a working layout: ruler + two video tracks with thumbnails, transitions and effect chips, two audio tracks with waveforms and a level meter, one subtitle row, color grading wheels and a speed ramp aside, with a playhead spanning the lot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Full editor" },
        ]}
      />
      <section className={styles.compositionLayout}>
        <div className={styles.compositionMain}>
          <TimelineRuler
            durationSec={TOTAL_SEC}
            pxPerSec={PX_PER_SEC}
            fps={24}
            zoomLabel="1.0×"
          />
          <div
            className={styles.timelineStage}
            role="application"
            aria-roledescription="timeline"
            aria-label="Workshop tour — Bay 2 exhaust install timeline"
          >
            <div className={styles.trackStack}>
              <TimelineTrack
                kind="video"
                label="V1 · Cam A"
                meta="BMPCC 6K · 24fps"
                density="tall"
              >
                <TimelineLane width={timelineWidth}>
                  <div style={{ position: "absolute", left: 0, top: 6, bottom: 6, width: 4 * PX_PER_SEC }}>
                    <ClipThumbnailStrip
                      name="B-roll Hilux arrive"
                      durationSec={4}
                      thumbnails={[
                        { label: "Hilux 01" },
                        { label: "Hilux 02" },
                        { label: "Hilux 03" },
                      ]}
                    />
                    <div style={{ position: "absolute", top: -20, left: 4 }}>
                      <EffectChip kind="color" name="Warm-bay" enabled compact />
                    </div>
                  </div>
                  <div style={{ position: "absolute", left: 4 * PX_PER_SEC, top: "50%", transform: "translateY(-50%)", height: 38 }}>
                    <TransitionBetweenClips kind="cross-fade" durationSec={0.4} />
                  </div>
                  <div style={{ position: "absolute", left: 4.4 * PX_PER_SEC, top: 6, bottom: 6, width: 6 * PX_PER_SEC }}>
                    <ClipThumbnailStrip
                      name="Tear down old muffler"
                      durationSec={6}
                      state="selected"
                      thumbnails={[
                        { label: "Tear 01" },
                        { label: "Tear 02" },
                        { label: "Tear 03" },
                        { label: "Tear 04" },
                      ]}
                    />
                    <ClipTrimHandles activeSide="none" showDelta={false} />
                  </div>
                  <div style={{ position: "absolute", left: 10.4 * PX_PER_SEC, top: 6, bottom: 6, width: 6 * PX_PER_SEC }}>
                    <ClipThumbnailStrip
                      name="Manta cat-back fit"
                      durationSec={6}
                      thumbnails={[
                        { label: "Manta 01" },
                        { label: "Manta 02" },
                        { label: "Manta 03" },
                        { label: "Manta 04" },
                      ]}
                    />
                    <div style={{ position: "absolute", top: -20, left: 4 }}>
                      <EffectChip kind="stabilize" name="Gimbal" enabled compact />
                    </div>
                  </div>
                  <div style={{ position: "absolute", left: 16.4 * PX_PER_SEC, top: "50%", transform: "translateY(-50%)", height: 38 }}>
                    <TransitionBetweenClips kind="dissolve" durationSec={0.7} />
                  </div>
                  <div style={{ position: "absolute", left: 17.1 * PX_PER_SEC, top: 6, bottom: 6, width: 8 * PX_PER_SEC }}>
                    <ClipThumbnailStrip
                      name="Dyno run"
                      durationSec={8}
                      thumbnails={[
                        { label: "Dyno 01" },
                        { label: "Dyno 02" },
                        { label: "Dyno 03" },
                        { label: "Dyno 04" },
                        { label: "Dyno 05" },
                      ]}
                    />
                    <div style={{ position: "absolute", top: -20, left: 4 }}>
                      <EffectChip kind="lut" name="Workshop Steel" enabled compact />
                    </div>
                  </div>
                  <div style={{ position: "absolute", left: 25.1 * PX_PER_SEC, top: "50%", transform: "translateY(-50%)", height: 38 }}>
                    <TransitionBetweenClips kind="cut" durationSec={0} />
                  </div>
                  <div style={{ position: "absolute", left: 25.2 * PX_PER_SEC, top: 6, bottom: 6, width: 9 * PX_PER_SEC }}>
                    <ClipThumbnailStrip
                      name="Owner reaction"
                      durationSec={9}
                      thumbnails={[
                        { label: "Owner 01" },
                        { label: "Owner 02" },
                        { label: "Owner 03" },
                      ]}
                    />
                  </div>
                </TimelineLane>
              </TimelineTrack>

              <TimelineTrack
                kind="video"
                label="V2 · Cam B"
                meta="GoPro · overhead"
                density="regular"
              >
                <TimelineLane width={timelineWidth}>
                  <div style={{ position: "absolute", left: 5 * PX_PER_SEC, top: 6, bottom: 6, width: 12 * PX_PER_SEC }}>
                    <ClipThumbnailStrip
                      name="Overhead · Tear+Fit"
                      durationSec={12}
                      thumbnails={[
                        { label: "OH 01" },
                        { label: "OH 02" },
                        { label: "OH 03" },
                        { label: "OH 04" },
                      ]}
                    />
                  </div>
                  <div style={{ position: "absolute", left: 22 * PX_PER_SEC, top: 6, bottom: 6, width: 5 * PX_PER_SEC }}>
                    <ClipThumbnailStrip
                      name="Tailpipe macro"
                      durationSec={5}
                      thumbnails={[
                        { label: "Pipe 01" },
                        { label: "Pipe 02" },
                      ]}
                    />
                  </div>
                </TimelineLane>
              </TimelineTrack>

              <TimelineTrack
                kind="audio"
                label="A1 · Boom"
                meta="Sennheiser 416"
                density="regular"
                solo
              >
                <div style={{ position: "absolute", inset: "6px 8px", width: `calc(${timelineWidth}px - 16px)`, height: "calc(100% - 12px)" }}>
                  <AudioWaveformTrack
                    name="Boom · Sennheiser 416"
                    samples={buildWaveform(0.4, 96)}
                    durationSec={TOTAL_SEC}
                    selection={{ startSec: 22, endSec: 27 }}
                    level={{ left: 0.78, right: 0.72 }}
                  />
                </div>
              </TimelineTrack>

              <TimelineTrack
                kind="audio"
                label="A2 · Lav"
                meta="Brodie · DPA 6060"
                density="dense"
              >
                <div style={{ position: "absolute", inset: "4px 8px", width: `calc(${timelineWidth}px - 16px)`, height: "calc(100% - 8px)" }}>
                  <AudioWaveformTrack
                    name="Lav · Brodie"
                    samples={buildWaveform(1.6, 84)}
                    durationSec={TOTAL_SEC}
                    level={{ left: 0.42, right: 0.46 }}
                  />
                </div>
              </TimelineTrack>

              <TimelineTrack
                kind="subtitles"
                label="SUB · EN-AU"
                meta="Auto + Brodie review"
                density="dense"
              >
                <div style={{ position: "absolute", inset: "4px 8px", width: `calc(${timelineWidth}px - 16px)`, height: "calc(100% - 8px)" }}>
                  <SubtitleRow cues={CUES} durationSec={TOTAL_SEC} pxPerSec={PX_PER_SEC} />
                </div>
              </TimelineTrack>
            </div>

            <div style={{ position: "absolute", left: TRACK_HEADER_WIDTH + 1, top: 0, bottom: 0, right: 0, pointerEvents: "none" }}>
              <PlayheadCursor
                atSec={14.6}
                durationSec={TOTAL_SEC}
                pxPerSec={PX_PER_SEC}
              />
              <CueMarkerPin
                marker={{ index: 1, atSec: 4.5, label: "ADR check", tone: "amber", note: "Re-record Brodie line over Manta fit." }}
                pxPerSec={PX_PER_SEC}
              />
              <CueMarkerPin
                marker={{ index: 2, atSec: 22.8, label: "Sound demo · dyno revs", tone: "red" }}
                pxPerSec={PX_PER_SEC}
              />
              <CueMarkerPin
                marker={{ index: 3, atSec: 31.4, label: "Hero outro", tone: "green" }}
                pxPerSec={PX_PER_SEC}
              />
            </div>
          </div>
        </div>

        <aside className={styles.compositionAside}>
          <ColorGradingWheels
            title="Workshop Steel grade"
            shadows={{ hueDegrees: 198, saturation: 0.62, lift: 0.42 }}
            midtones={{ hueDegrees: 20, saturation: 0.12, lift: 0.5 }}
            highlights={{ hueDegrees: 36, saturation: 0.48, lift: 0.68 }}
          />
          <div style={{ display: "grid", gap: 10 }}>
            <TrackRowHeader compact kind="effect" shortName="FX" name="LUT · Workshop Steel" />
            <TrackRowHeader compact kind="effect" shortName="FX" name="Stabilize · gimbal" />
            <TrackRowHeader compact kind="audio" shortName="A3" name="Workshop ambient" armed />
          </div>
        </aside>
      </section>

      <section className={styles.compositionFooter}>
        <SpeedRampCurve
          width={520}
          height={140}
          title="Dyno run speed ramp"
          anchors={[
            { t: 0, speed: 1 },
            { t: 0.18, speed: 0.5 },
            { t: 0.42, speed: 0.5 },
            { t: 0.62, speed: 1 },
            { t: 0.84, speed: 2 },
            { t: 1, speed: 1 },
          ]}
        />
        <div className={styles.demoSurface}>
          <span className={styles.demoLabel}>Effects on Dyno run · popover</span>
          <div style={{ display: "grid", gap: 10 }}>
            <EffectChip
              kind="lut"
              name="Cinematic LUT · Workshop Steel"
              enabled
              popoverOpen
              parameters={[
                { label: "Intensity", value: 0.78, display: "78%" },
                { label: "Highlights", value: 0.42, display: "+0.42" },
                { label: "Shadows", value: 0.26, display: "-0.26" },
                { label: "Tint", value: 0.6, display: "Warm" },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

interface TimelineLaneProps {
  width: number
  children: React.ReactNode
}

function TimelineLane({ width, children }: TimelineLaneProps) {
  return (
    <div style={{ position: "absolute", inset: 0, width: `${width}px`, height: "100%" }}>
      {children}
    </div>
  )
}
