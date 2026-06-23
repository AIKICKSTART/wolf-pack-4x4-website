"use client"

import {
  ArrowRightCircle,
  Briefcase,
  Building2,
  MessageSquare,
  Package,
  PhoneCall,
  ScanLine,
  Wrench,
} from "lucide-react"
import { useEffect, useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
} from "../../components/mobile-shell"
import {
  AppShortcutRow,
  BiometricUnlockCard,
  HomeScreenTile,
  InstallPromptCard,
  NetworkQualityMeter,
  OfflineIndicatorStrip,
  PermissionModal,
  PullToRefreshLoader,
  ShareTargetCard,
  SplashScreen,
  SyncStatusTile,
  UpdateAvailableBanner,
  WakeLockToggle,
} from "../../components/pwa-shell"
import type {
  PwaShareChannel,
  PwaShortcutAction,
  PwaSyncEntity,
} from "../../components/pwa-shell"
import styles from "../pwa-shell.module.css"

type ShellStage =
  | "splash"
  | "unlock"
  | "permission"
  | "home"
  | "share"
  | "install"

const STAGE_ORDER: ReadonlyArray<ShellStage> = [
  "splash",
  "unlock",
  "permission",
  "home",
  "share",
  "install",
]

const STAGE_LABEL: Record<ShellStage, string> = {
  splash: "Boot splash · 64%",
  unlock: "Face ID unlock",
  permission: "Notifications prompt",
  home: "Home tiles + sync",
  share: "Share target receiver",
  install: "Install prompt",
}

const STAGE_HINT: Record<ShellStage, string> = {
  splash: "Cold boot — bay queue hydrating",
  unlock: "Lead mechanic returning from smoko",
  permission: "Pre-prompt before OS dialog",
  home: "Quick actions + sync tile + meter",
  share: "Customer pic shared into the app",
  install: "Reception adding the PWA to home screen",
}

const SYNC_ENTITIES: ReadonlyArray<PwaSyncEntity> = [
  { id: "jobs", label: "Bay jobs", pending: 2, lastSyncedAt: "2m ago" },
  { id: "parts", label: "Parts movements", pending: 12, lastSyncedAt: "9m ago" },
  { id: "photos", label: "VIN photos", pending: 1, lastSyncedAt: "Just now" },
]

const SHORTCUTS: ReadonlyArray<PwaShortcutAction> = [
  {
    id: "scan",
    label: "Scan VIN",
    hint: "Tap to point camera",
    tone: "red",
    icon: <ScanLine size={18} strokeWidth={2.2} />,
  },
  {
    id: "next",
    label: "Advance bay",
    hint: "Move queue forward",
    tone: "teal",
    icon: <ArrowRightCircle size={18} strokeWidth={2.2} />,
  },
  {
    id: "parts",
    label: "Parts arrived",
    hint: "Scan back-dock receipts",
    tone: "amber",
    icon: <Package size={18} strokeWidth={2.2} />,
  },
]

const SHARE_CHANNELS: ReadonlyArray<PwaShareChannel> = [
  {
    id: "front-counter",
    label: "Front counter",
    recipient: "Bex on reception",
    icon: <PhoneCall size={12} strokeWidth={2.4} />,
  },
  {
    id: "bay-2",
    label: "Bay 2 crew",
    recipient: "Roo · Macca · Tatts",
    icon: <Wrench size={12} strokeWidth={2.4} />,
  },
  {
    id: "supplier",
    label: "Supplier",
    recipient: "Manta Exhaust",
    icon: <Building2 size={12} strokeWidth={2.4} />,
  },
  {
    id: "sms",
    label: "Customer SMS",
    recipient: "ABC123",
    icon: <MessageSquare size={12} strokeWidth={2.4} />,
  },
]

export function FullMobileShellDemo() {
  const [stage, setStage] = useState<ShellStage>("splash")
  const [bootProgress, setBootProgress] = useState<number>(18)
  const [wakeLock, setWakeLock] = useState<boolean>(true)
  const [selectedChannels, setSelectedChannels] = useState<ReadonlyArray<string>>([
    "bay-2",
    "front-counter",
  ])

  useEffect(() => {
    if (stage !== "splash") {
      return
    }
    const id = window.setInterval(() => {
      setBootProgress((prev) => (prev >= 96 ? 18 : Math.min(96, prev + 9)))
    }, 800)
    return () => window.clearInterval(id)
  }, [stage])

  const stageIndex = STAGE_ORDER.indexOf(stage)
  const advance = () => {
    const next = STAGE_ORDER[(stageIndex + 1) % STAGE_ORDER.length]
    if (next) {
      setStage(next)
    }
  }
  const reset = () => {
    setStage("splash")
    setBootProgress(18)
  }

  return (
    <div className={styles.composedSplit}>
      <MobileViewport label="Mufflermen Crew PWA composition">
        <MobileStatusBar />
        {stage === "splash" && (
          <SplashScreen
            progress={bootProgress}
            bootStep={
              bootProgress < 40
                ? "Hydrating local DB…"
                : bootProgress < 75
                  ? "Catching up on bay queue…"
                  : "Almost there…"
            }
          />
        )}
        {stage === "unlock" && (
          <div className={styles.composedShell}>
            <OfflineIndicatorStrip
              state="syncing"
              pendingChanges={15}
              lastSyncedAt="9m ago"
            />
            <BiometricUnlockCard
              kind="face"
              crewName="Roo Ainsworth"
              crewRole="Lead Mechanic · Bay 2"
              initials="RA"
              state="scanning"
              pinFilled={0}
            />
          </div>
        )}
        {stage === "permission" && (
          <div className={styles.composedShell}>
            <OfflineIndicatorStrip
              state="online"
              lastSyncedAt="just now"
            />
            <PermissionModal kind="notifications" />
          </div>
        )}
        {stage === "home" && (
          <div className={styles.composedShell}>
            <OfflineIndicatorStrip
              state="online"
              lastSyncedAt="just now"
            />
            <UpdateAvailableBanner
              newVersion="v3.4.2"
              releasedAt="12 min ago"
              onSnooze={() => undefined}
              onReload={() => undefined}
            />
            <PullToRefreshLoader progress={0} state="idle" />
            <div className={styles.tileGrid}>
              <HomeScreenTile
                title="Today's bays"
                hint="4 booked"
                tone="red"
                icon={<Briefcase size={18} strokeWidth={2.2} />}
                badgeCount={4}
                metrics={[
                  { label: "In bay", value: "2" },
                  { label: "Queue", value: "2" },
                ]}
              />
              <HomeScreenTile
                title="Parts queue"
                hint="Manta on the dock"
                tone="amber"
                icon={<Package size={18} strokeWidth={2.2} />}
                metrics={[
                  { label: "Dock", value: "12" },
                  { label: "On order", value: "5" },
                ]}
              />
            </div>
            <SyncStatusTile
              state="syncing"
              entities={SYNC_ENTITIES}
              lastSyncedAt="2m ago"
              nextSyncAt="0:24"
            />
            <NetworkQualityMeter
              quality="4g"
              latencyMs={68}
              downKbps={18400}
              upKbps={7200}
              carrier="Telstra · 4G LTE"
            />
            <AppShortcutRow
              title="Quick actions"
              subtitle="Press · hold"
              actions={SHORTCUTS}
            />
            <WakeLockToggle
              enabled={wakeLock}
              batteryCostPctPerHour={wakeLock ? 11 : 6}
              hint={
                wakeLock
                  ? "Quoting on bay 2 — keep awake"
                  : "Tablet will dim normally"
              }
              onToggle={() => setWakeLock((prev) => !prev)}
            />
          </div>
        )}
        {stage === "share" && (
          <div className={styles.composedShell}>
            <OfflineIndicatorStrip state="online" lastSyncedAt="just now" />
            <ShareTargetCard
              caption="Snapped exhaust on the VE Ute — bracket cracked, mid-pipe wobbly. Quote ASAP please?"
              source="Customer SMS"
              receivedAt="Just now"
              media={{ kind: "image", label: "exhaust-bracket.jpg", size: "1.6 MB" }}
              channels={SHARE_CHANNELS}
              selectedChannelIds={selectedChannels}
              onToggleChannel={(id) =>
                setSelectedChannels((prev) =>
                  prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
                )
              }
              onShare={() => undefined}
              onCancel={() => undefined}
            />
          </div>
        )}
        {stage === "install" && (
          <div className={styles.composedShell}>
            <OfflineIndicatorStrip state="online" lastSyncedAt="just now" />
            <InstallPromptCard
              platform="ios"
              onInstall={() => undefined}
              onDismiss={() => undefined}
            />
          </div>
        )}
      </MobileViewport>
      <aside className={styles.composedAside}>
        <h3>Walkthrough</h3>
        <p style={{ margin: 0, color: "var(--primitive-body)", fontSize: 12, lineHeight: 1.5 }}>
          Stage <strong style={{ color: "var(--primitive-amber)" }}>{stageIndex + 1} / {STAGE_ORDER.length}</strong>:
          {" "}<strong style={{ color: "var(--primitive-text-strong)" }}>{STAGE_LABEL[stage]}</strong>
        </p>
        <p style={{ margin: 0, color: "var(--primitive-muted)", fontSize: 11, lineHeight: 1.5 }}>
          {STAGE_HINT[stage]}
        </p>
        <ul>
          {STAGE_ORDER.map((entry, index) => (
            <li key={entry}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span style={{ color: entry === stage ? "var(--primitive-text-strong)" : "inherit" }}>
                {STAGE_LABEL[entry]}
              </span>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={advance}
            style={{
              flex: 1,
              appearance: "none",
              height: 38,
              borderRadius: "var(--primitive-btn-radius)",
              border: "none",
              background: "var(--primitive-btn-primary-bg)",
              color: "var(--primitive-btn-primary-fg)",
              boxShadow: "var(--primitive-btn-primary-shadow)",
              fontFamily: "var(--primitive-font-mono)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Next stage →
          </button>
          <button
            type="button"
            onClick={reset}
            style={{
              appearance: "none",
              padding: "0 14px",
              height: 38,
              borderRadius: "var(--primitive-btn-radius)",
              border: "1px solid var(--primitive-btn-secondary-border)",
              background: "var(--primitive-btn-secondary-bg)",
              color: "var(--primitive-btn-secondary-fg)",
              fontFamily: "var(--primitive-font-mono)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </aside>
    </div>
  )
}
