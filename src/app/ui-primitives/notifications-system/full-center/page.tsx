import type { Metadata } from "next"

import {
  BannerStrip,
  DeliveryReportRow,
  DigestScheduler,
  DoNotDisturbCard,
  EventTemplateCard,
  NotificationCenterPanel,
  PreferencePanel,
  PriorityRuleRow,
  PushPermissionCard,
  QuietHoursPill,
  SnoozeController,
  SoundPresetRow,
  ToastStack,
} from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import {
  MOCK_BANNERS,
  MOCK_CENTRE_ITEMS,
  MOCK_CHANNELS,
  MOCK_DELIVERY_REPORTS,
  MOCK_DIGEST_DAILY,
  MOCK_EVENTS,
  MOCK_PREFERENCE_VALUE,
  MOCK_PRIORITY_RULES,
  MOCK_SNOOZE_DURATIONS,
  MOCK_SOUND_PRESETS,
  MOCK_TEMPLATE_INVOICE_PAID,
  MOCK_TOASTS,
} from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Full notification centre | Notifications system",
  description:
    "Composition — every notifications-system primitive arranged into one cohesive operations scene for the workshop.",
}

function eventLabel(id: string): string {
  return MOCK_EVENTS.find((event) => event.id === id)?.label ?? id
}

export default function FullCenterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Notifications system"
        title="Full notification centre"
        description="All fourteen primitives composed into one workshop operations scene — banners up top, toast stack live, notification centre on the right, with snooze, DND, digest, sounds, preferences, priority rules, templates, and delivery reports underneath."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Full centre" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live workshop banners</span>
        <div className={styles.demoBanner}>
          <BannerStrip spec={MOCK_BANNERS[1]} />
          <BannerStrip spec={MOCK_BANNERS[0]} />
        </div>
      </section>

      <div className={styles.centerWrap}>
        <div className={styles.centerMain}>
          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Live toasts + quiet-hours pill</span>
            <div className={styles.pillRow}>
              <QuietHoursPill
                state="active"
                windowLabel="19:00 – 07:00"
                daysLabel="Mon–Fri"
              />
              <QuietHoursPill
                state="scheduled"
                windowLabel="Sat 13:00 – Mon 07:00"
                daysLabel="Weekend"
              />
            </div>
            <div className={styles.demoCorner}>
              <span className={styles.demoCornerLabel}>Anchor · top-right</span>
              <ToastStack toasts={MOCK_TOASTS} placement="top-right" collapsedCount={2} />
            </div>
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Channel preferences</span>
            <PreferencePanel
              events={MOCK_EVENTS}
              channels={MOCK_CHANNELS}
              initialValue={MOCK_PREFERENCE_VALUE}
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Priority rules</span>
            <div className={styles.priorityList}>
              {MOCK_PRIORITY_RULES.map((rule) => (
                <PriorityRuleRow
                  key={rule.id}
                  rule={rule}
                  eventLabel={eventLabel(rule.event)}
                />
              ))}
            </div>
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Template editor · Invoice paid</span>
            <EventTemplateCard
              initialValue={MOCK_TEMPLATE_INVOICE_PAID}
              eventLabel="Invoice paid"
              channelLabel="Email"
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Latest delivery report</span>
            <div className={styles.delList}>
              {MOCK_DELIVERY_REPORTS.slice(0, 5).map((row) => (
                <DeliveryReportRow
                  key={row.id}
                  row={row}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.centerSide}>
          <NotificationCenterPanel items={MOCK_CENTRE_ITEMS} />

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Push permission</span>
            <PushPermissionCard state="prompt" />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Snooze</span>
            <SnoozeController durations={MOCK_SNOOZE_DURATIONS} defaultSelected="1h" />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Do not disturb</span>
            <DoNotDisturbCard
              initialValue={{
                enabled: true,
                weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                window: { startHour: 19, startMinute: 0, endHour: 7, endMinute: 0 },
              }}
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Sounds</span>
            <div className={styles.demoStack}>
              <SoundPresetRow preset={MOCK_SOUND_PRESETS[0]} selected />
              <SoundPresetRow preset={MOCK_SOUND_PRESETS[3]} selected={false} />
              <SoundPresetRow preset={MOCK_SOUND_PRESETS[4]} selected={false} />
            </div>
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Digest schedule</span>
            <DigestScheduler initialValue={MOCK_DIGEST_DAILY} />
          </section>
        </aside>
      </div>
    </main>
  )
}
