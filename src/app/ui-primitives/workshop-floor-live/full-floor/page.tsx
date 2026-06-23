import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  BayCameraFeedCard,
  BayHourlyUtilisation,
  BayLiveStatusCard,
  CustomerWaitingArea,
  DynoActiveReadout,
  HandoverReadyBanner,
  IncomingCustomerBanner,
  LiveJobProgressStrip,
  LiveRevenuePulse,
  LiveSoundBandChip,
  NextUpQueue,
  PartsPullRequestRow,
  TechnicianLocationPin,
  WorkshopFloorPlan,
} from "../../components/workshop-floor-live"
import type {
  BayHourlyRow,
  NextUpEntry,
  PartsPullRequestRowProps,
  WaitingCustomer,
} from "../../components/workshop-floor-live"
import { BAY_PLAN, TECHS } from "../workshop-floor-mock"
import styles from "../workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Full-floor composition | UI Primitives — Workshop Floor Live",
}

const hourlyRows: ReadonlyArray<BayHourlyRow> = [
  { bay: "bay-1", hours: [0.1, 0.4, 0.65, 0.78, 0.92, 0.55, 0.78, 0.86, 0.62, 0.35, 0.18] },
  { bay: "bay-2", hours: [0.0, 0.32, 0.6, 0.74, 0.96, 1.0, 0.92, 0.68, 0.55, 0.4, 0.22] },
  { bay: "bay-3", hours: [0.0, 0.18, 0.42, 0.71, 0.85, 0.94, 1.0, 1.0, 0.75, 0.38, 0.12] },
  { bay: "bay-4", hours: [0.06, 0.22, 0.45, 0.5, 0.62, 0.7, 0.58, 0.45, 0.32, 0.2, 0.08] },
]

const queue: ReadonlyArray<NextUpEntry> = [
  {
    id: "q-1",
    vehicle: "Ranger PX3 3.2L · DTU-209",
    customer: "Cardona",
    bookedAt: "11:45 am",
    bay: "bay-1",
    service: "XForce mid-muffler swap",
    arrived: true,
  },
  {
    id: "q-2",
    vehicle: "Land Cruiser 79 V8 · BGS-704",
    customer: "Hennelly",
    bookedAt: "12:15 pm",
    bay: "bay-1",
    service: "Pacemaker headers + Y-pipe",
    arrived: false,
  },
  {
    id: "q-3",
    vehicle: "BT-50 UR · KLB-118",
    customer: "Petrovski",
    bookedAt: "12:45 pm",
    service: "Wigwam mid-mount muffler",
    arrived: false,
  },
]

const pulls: ReadonlyArray<PartsPullRequestRowProps> = [
  {
    sku: "MAN-MK24-405",
    partName: "Manta 3in stainless cat-back",
    qty: 1,
    bay: "bay-2",
    status: "delivered",
    requestedBy: "Jordan P.",
    at: "11:48",
  },
  {
    sku: "PAC-LC79-HDR",
    partName: "Pacemaker 5-into-1 headers",
    qty: 1,
    bay: "bay-1",
    status: "picking",
    requestedBy: "Trent W.",
    at: "11:52",
  },
  {
    sku: "XFC-PX3-MAN",
    partName: "XForce twin-tip mid-muffler",
    qty: 1,
    bay: "bay-1",
    status: "back-order",
    requestedBy: "Trent W.",
    at: "11:56",
  },
]

const waiting: ReadonlyArray<WaitingCustomer> = [
  {
    id: "w-1",
    name: "Cardona",
    vehicle: "Ranger PX3 3.2L",
    waitedMinutes: 12,
    offered: "coffee",
  },
  {
    id: "w-2",
    name: "Aleksic",
    vehicle: "Hilux N80 GUN126R",
    waitedMinutes: 38,
    offered: "waiting-room",
  },
]

export default function FullFloorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.FF / Workshop floor live"
        title="Full-floor composition"
        description="All fourteen workshop-floor-live primitives wired together as the single back-wall ops monitor — floor plan, bay cards, dyno cell, job progress, parts pulls, waiting area, revenue pulse and the incoming + handover banners that book-end the day."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop floor live", href: "/ui-primitives/workshop-floor-live" },
          { label: "Full-floor" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.fullFloor}>
          <IncomingCustomerBanner
            customer="Cardona"
            vehicle="Ranger PX3 3.2L · DTU-209"
            eta="in 6 min"
            phone="0422 188 314"
            bay="bay-1"
            service="XForce mid-muffler · 1.5h slot"
          />

          <div className={styles.fullFloorRow}>
            <WorkshopFloorPlan bays={BAY_PLAN} technicians={TECHS} />
            <div className={styles.fullFloor}>
              <LiveRevenuePulse
                todayAud={7240}
                jobsCompleted={6}
                yesterdayAud={6480}
                trend={[240, 580, 980, 1620, 2440, 3120, 4080, 5160, 6210, 7240]}
              />
              <LiveSoundBandChip measuredDb={88.6} bay="bay-3" rpm={3700} />
            </div>
          </div>

          <div className={styles.fullFloorTrio}>
            <BayLiveStatusCard
              bay="bay-1"
              state="idle"
              technician={{ name: "Trent Williams", role: "Workshop manager" }}
              elapsedMinutes={0}
              progressPercent={0}
            />
            <BayLiveStatusCard
              bay="bay-2"
              state="in-progress"
              vehicle="Hilux N80 GUN126R · BTR-882"
              customer="Aleksic"
              technician={{ name: "Jordan Pace", role: "Apprentice Y3" }}
              jobNumber="WS-2604-12"
              elapsedMinutes={84}
              etaHandover="12:40 pm"
              progressPercent={64}
            />
            <BayLiveStatusCard
              bay="bay-3"
              state="dyno-running"
              vehicle="Patrol Y62 5.6L · QXK-014"
              customer="McKinnon"
              technician={{ name: "Sophie Tan", role: "Lead fitter" }}
              jobNumber="WS-2604-09"
              elapsedMinutes={152}
              etaHandover="1:20 pm"
              progressPercent={82}
            />
          </div>

          <div className={styles.fullFloorRow}>
            <DynoActiveReadout
              vehicle="Patrol Y62 5.6L · QXK-014"
              peakKilowatts={272}
              peakTorqueNm={528}
              currentRpm={4150}
              maxRpm={6500}
              lambda={0.94}
              run="Run 03 / 04"
            />
            <div className={styles.fullFloor}>
              <LiveJobProgressStrip
                jobNumber="WS-2604-12"
                vehicle="Hilux N80 · Manta cat-back"
                percent={64}
                checkpoints={[
                  { stage: "drop-off", state: "done", at: "08:14" },
                  { stage: "diagnostic", state: "done", at: "08:42" },
                  { stage: "build", state: "active", at: "09:30" },
                  { stage: "test", state: "pending" },
                  { stage: "handover", state: "pending" },
                ]}
              />
              <LiveJobProgressStrip
                jobNumber="WS-2604-09"
                vehicle="Patrol Y62 · Dyno tune"
                percent={82}
                checkpoints={[
                  { stage: "drop-off", state: "done", at: "07:50" },
                  { stage: "diagnostic", state: "done", at: "08:20" },
                  { stage: "build", state: "done", at: "10:05" },
                  { stage: "test", state: "active", at: "11:24" },
                  { stage: "handover", state: "pending" },
                ]}
              />
            </div>
          </div>

          <BayHourlyUtilisation rows={hourlyRows} />

          <div className={styles.fullFloorTrio}>
            <BayCameraFeedCard
              bay="bay-2"
              cameraName="Cam-2 · hoist west"
              timestamp="11:58:42"
              quality="live"
              lastSnapshot="11:54 · cat-back fit"
            />
            <BayCameraFeedCard
              bay="bay-3"
              cameraName="Cam-3 · dyno cell"
              timestamp="11:58:38"
              quality="delayed"
              lastSnapshot="11:50 · pull 03 start"
            />
            <BayCameraFeedCard
              bay="bay-4"
              cameraName="Cam-4 · ceiling"
              timestamp="—"
              quality="offline"
            />
          </div>

          <div className={styles.fullFloorRow}>
            <div className={styles.fullFloor}>
              <NextUpQueue entries={queue} />
              <div className={styles.canvas}>
                {pulls.map((p) => (
                  <PartsPullRequestRow key={`${p.sku}-${p.at}`} {...p} />
                ))}
              </div>
            </div>
            <div className={styles.fullFloor}>
              <CustomerWaitingArea
                customers={waiting}
                estimatedWait="8–12 min"
                coffeesPoured={14}
              />
              <div className={styles.row}>
                <TechnicianLocationPin
                  name="Jordan Pace"
                  role="Apprentice Y3"
                  location="bay-2"
                  doing="Hanging the Manta mid-section"
                  online
                />
                <TechnicianLocationPin
                  name="Sophie Tan"
                  role="Lead fitter"
                  location="dyno"
                  doing="Run 03 of 04 — Patrol Y62"
                  online
                />
                <TechnicianLocationPin
                  name="Trent Williams"
                  role="Workshop manager"
                  location="bay-4"
                  doing="Reading VE Commodore complaint"
                  online
                />
                <TechnicianLocationPin
                  name="Dean Okafor"
                  role="Parts runner"
                  location="parts"
                  doing="Picking MAN-MK24-405"
                  online
                />
              </div>
            </div>
          </div>

          <HandoverReadyBanner
            jobNumber="WS-2604-09"
            vehicle="Patrol Y62 5.6L · QXK-014"
            customer="McKinnon"
            bay="bay-3"
            photoCount={8}
            soundClipCaptured
            signalledTo="front-desk"
          />
        </div>

        <div className={styles.note}>
          <span>Composition</span>
          <p>
            Every primitive in the workshop-floor-live umbrella appears on this
            page wired with realistic Oak Flats Mufflermen data — Hilux N80
            Manta cat-back in Bay 2, Patrol Y62 dyno tune in Bay 3, parts
            pulls flowing from Dean at the parts area, and a green handover
            banner sitting at the bottom waiting for McKinnon to walk in.
          </p>
        </div>
      </section>
    </main>
  )
}
