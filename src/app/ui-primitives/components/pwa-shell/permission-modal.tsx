"use client"

import {
  Bell,
  Camera,
  CheckCircle2,
  HardDrive,
  Mic,
  Navigation,
  ShieldCheck,
  Users,
} from "lucide-react"

import { MufflermenMonogramIcon } from "../icons/mufflermen-monogram"
import type { PwaPermissionKind } from "./pwa-shell-types"
import styles from "./permission-modal.module.css"

interface PermissionModalProps {
  kind: PwaPermissionKind
  title?: string
  rationale?: string
  benefits?: ReadonlyArray<string>
  appName?: string
  appDomain?: string
  onAllow?: () => void
  onDeny?: () => void
  className?: string
}

const KIND_ICON: Record<PwaPermissionKind, typeof Camera> = {
  camera: Camera,
  microphone: Mic,
  location: Navigation,
  notifications: Bell,
  contacts: Users,
  storage: HardDrive,
}

const KIND_TITLE: Record<PwaPermissionKind, string> = {
  camera: "Use the camera",
  microphone: "Use the microphone",
  location: "Share your location",
  notifications: "Send you notifications",
  contacts: "Read your contacts",
  storage: "Save files offline",
}

const KIND_RATIONALE: Record<PwaPermissionKind, string> = {
  camera:
    "Snap the VIN plate and underbody pics straight onto the job sheet so the office sees what you see.",
  microphone:
    "Tap to record a voice note for the customer — quicker than typing on greasy hands.",
  location:
    "Show the closest Mufflermen workshop and route customers to the bay, even on the back roads.",
  notifications:
    "Ping you when a customer's car arrives, when parts land at the back dock, and when a job is ready.",
  contacts:
    "Pre-fill customer details from the address book on call-backs so no rego gets typed twice.",
  storage:
    "Keep job sheets, manuals and PDFs available even in the underground hoist bay where signal drops.",
}

const KIND_BENEFITS: Record<PwaPermissionKind, ReadonlyArray<string>> = {
  camera: [
    "Capture VIN plates with one tap",
    "Snap photos that auto-attach to jobs",
    "Original photos stay on this device only",
  ],
  microphone: [
    "Voice memos transcribed to job notes",
    "Push-to-talk to the front counter",
    "Recordings stay encrypted at rest",
  ],
  location: [
    "Snap to the closest workshop in seconds",
    "Show estimated drive time from current spot",
    "Used only while the app is open",
  ],
  notifications: [
    "Ringing when parts land or jobs change",
    "Quiet hours match workshop trading hours",
    "Turn off any category in Settings",
  ],
  contacts: [
    "Pre-fill rego look-ups for repeat customers",
    "Read-only — we never edit your address book",
    "Stored locally on the workshop tablet",
  ],
  storage: [
    "Job sheets work in dead-zone bays",
    "Up to 200 MB cached locally",
    "Clear any time in Settings",
  ],
}

export function PermissionModal({
  kind,
  title,
  rationale,
  benefits,
  appName = "Mufflermen Crew",
  appDomain = "crew.mufflermen.com.au",
  onAllow,
  onDeny,
  className,
}: PermissionModalProps) {
  const Icon = KIND_ICON[kind]
  const headline = title ?? KIND_TITLE[kind]
  const reason = rationale ?? KIND_RATIONALE[kind]
  const upsides = benefits ?? KIND_BENEFITS[kind]
  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="dialog"
      aria-labelledby="permission-modal-title"
      aria-describedby="permission-modal-rationale"
    >
      <header className={styles.brand}>
        <span className={styles.brandIcon} aria-hidden="true">
          <MufflermenMonogramIcon size={20} />
        </span>
        <div>
          <h2 className={styles.brandName}>{appName}</h2>
          <span className={styles.brandDomain}>{appDomain}</span>
        </div>
      </header>
      <div className={styles.body}>
        <span className={styles.glyph} aria-hidden="true">
          <Icon size={32} strokeWidth={1.8} />
        </span>
        <h3 id="permission-modal-title" className={styles.title}>
          {headline}
        </h3>
        <p id="permission-modal-rationale" className={styles.rationale}>
          {reason}
        </p>
      </div>
      <ul className={styles.benefits}>
        {upsides.map((benefit, index) => (
          <li key={index} className={styles.benefit}>
            <span className={styles.benefitIcon} aria-hidden="true">
              <CheckCircle2 size={14} strokeWidth={2.4} />
            </span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.allowBtn}
          onClick={onAllow}
          aria-label={`Allow ${headline}`}
        >
          <ShieldCheck size={14} strokeWidth={2.4} aria-hidden="true" />
          Allow
        </button>
        <button
          type="button"
          className={styles.denyBtn}
          onClick={onDeny}
          aria-label={`Don't allow ${headline}`}
        >
          Not now
        </button>
      </div>
      <p className={styles.fine}>
        You can change this any time in Settings → Privacy
      </p>
    </section>
  )
}

export default PermissionModal
