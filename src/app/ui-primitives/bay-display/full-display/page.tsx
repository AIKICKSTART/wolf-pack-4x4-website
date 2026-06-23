import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  BayStatusHero,
  CommunityTicker,
  CustomerCallBanner,
  DynoResultMarquee,
  FuelPriceStrip,
  NowServingStrip,
  QrCodeCallToAction,
  SafetyMessageTile,
  ServiceMenuBoard,
  SocialMediaWall,
  StaffRecognitionCard,
  VehicleQueueRail,
  WeatherStrip,
  WorkshopClockTile,
} from "../../components/bay-display"
import {
  COMMUNITY_ITEMS,
  DYNO_RESULTS,
  FUEL_ROWS,
  MENU_SERVICES,
  QUEUE_ROWS,
  SAFETY_MESSAGES,
  SERVING_JOBS,
  SOCIAL_POSTS,
} from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Full-display composition | UI Primitives — Bay Display",
}

const SEED = new Date("2026-05-29T11:48:00+10:00")
const HIGH_TIDE = new Date("2026-05-29T14:32:00+10:00")

export default function FullDisplayPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.FD / Bay display"
        title="Full-display composition"
        description="All fourteen bay-display primitives wired together as a 4K-ready signage wall — customer call hero up top, four bay hero cards in a row, dyno reel, weather + fuel + clock pillars, queue rail, menu board, safety + recognition + socials, QR closer at the bottom."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Full-display" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.signage}>
          <CustomerCallBanner
            title="Mr"
            surname="Davis"
            message="Patrol ready — keys at the counter"
            bayLabel="Bay 3"
          />

          <NowServingStrip jobs={SERVING_JOBS} speed={26} />

          <div className={styles.signageQuad}>
            <BayStatusHero
              bay="bay-1"
              status="waiting"
              vehicle="Ranger PX3 3.2L · DTU-209"
              customer="Cardona"
              mechanic="Trent Williams"
              eta="12:00 pm"
              pulse
            />
            <BayStatusHero
              bay="bay-2"
              status="in-bay"
              vehicle="Hilux N80 GUN126R · BTR-882"
              customer="Aleksic"
              mechanic="Jordan Pace"
              eta="12:40 pm"
              pulse
            />
            <BayStatusHero
              bay="bay-3"
              status="dyno"
              vehicle="Patrol Y62 5.6L · QXK-014"
              customer="McKinnon"
              mechanic="Sophie Tan"
              eta="1:20 pm"
              pulse
            />
            <BayStatusHero
              bay="bay-4"
              status="diagnostic"
              vehicle="VE Commodore SS · CTU-491"
              customer="Rakuljic"
              mechanic="Trent Williams"
              eta="2:05 pm"
              pulse
            />
          </div>

          <DynoResultMarquee entries={DYNO_RESULTS} speed={24} />

          <div className={styles.signageHero}>
            <VehicleQueueRail entries={QUEUE_ROWS} />
            <WorkshopClockTile initialTime={SEED} shift="morning" />
          </div>

          <div className={styles.signageTrio}>
            <WeatherStrip
              tempC={18}
              feelsLikeC={16}
              condition="partly-cloudy"
              windKmh={12}
              windDir="E"
              humidity={64}
              tideHeightM={1.7}
              tideAt={HIGH_TIDE}
              tidePhase="rising"
            />
            <FuelPriceStrip rows={FUEL_ROWS} asAt="as at 11:48 am" />
            <SafetyMessageTile messages={SAFETY_MESSAGES} />
          </div>

          <ServiceMenuBoard
            heading="Workshop menu"
            kicker="Albion Park"
            services={MENU_SERVICES}
          />

          <div className={styles.signageHero}>
            <SocialMediaWall posts={SOCIAL_POSTS} />
            <div className={styles.signage}>
              <StaffRecognitionCard
                name="Sophie Tan"
                role="Lead fitter"
                tenureLabel="5 years at Oak Flats"
                reason="Saved the McKinnon Patrol tune by spotting a cracked manifold on the third pull."
              />
              <CommunityTicker items={COMMUNITY_ITEMS} speed={20} />
            </div>
          </div>

          <div className={styles.duo}>
            <QrCodeCallToAction
              campaign="book"
              url="mufflermen.com.au/book"
            />
            <QrCodeCallToAction
              campaign="review"
              url="g.page/oakflats-mufflermen/review"
            />
          </div>
        </div>

        <div className={styles.note}>
          <span>Composition</span>
          <p>
            Every primitive in the bay-display family appears on this page
            wired with realistic Oak Flats data — Cardona&apos;s Ranger up next in
            Bay 1, Aleksic&apos;s Hilux N80 mid-build in Bay 2, McKinnon&apos;s Patrol
            on the dyno in Bay 3, Rakuljic&apos;s VE Commodore diagnostic in Bay 4.
            Albion Park 18°C E winds 12 km/h. U91 $1.96/L. Lake Illawarra high
            tide 1.7 m at 14:32. Designed to project at 4K on a back-wall
            screen — typography, contrast and motion all dialled for distance.
          </p>
        </div>
      </section>
    </main>
  )
}
