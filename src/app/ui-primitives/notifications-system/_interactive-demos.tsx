"use client"

import {
  DeliveryReportRow,
  EventTemplateCard,
  NotificationCenterPanel,
  QuietHoursPill,
  ToastCard,
  type DeliveryReportRowSpec,
  type EventTemplateValue,
  type NotificationCentreItem,
} from "../components/notifications-system"

import styles from "./notifications-system.module.css"

interface RetryableDeliveryReportRowsProps {
  rows: ReadonlyArray<DeliveryReportRowSpec>
}

interface PreviewableEventTemplateCardProps {
  initialValue: EventTemplateValue
  eventLabel: string
  channelLabel: string
}

interface NotificationCenterPanelDemoProps {
  items: ReadonlyArray<NotificationCentreItem>
  markAll?: boolean
}

export function RetryableDeliveryReportRows({ rows }: RetryableDeliveryReportRowsProps) {
  return (
    <div className={styles.delList}>
      {rows.map((row) => (
        <DeliveryReportRow key={row.id} row={row} onRetry={() => undefined} />
      ))}
    </div>
  )
}

export function PreviewableEventTemplateCard({
  initialValue,
  eventLabel,
  channelLabel,
}: PreviewableEventTemplateCardProps) {
  return (
    <EventTemplateCard
      initialValue={initialValue}
      eventLabel={eventLabel}
      channelLabel={channelLabel}
      onPreview={() => undefined}
    />
  )
}

export function NotificationCenterPanelDemo({ items, markAll = false }: NotificationCenterPanelDemoProps) {
  return (
    <NotificationCenterPanel
      items={items}
      onMarkAll={markAll ? () => undefined : undefined}
      onClose={() => undefined}
    />
  )
}

export function QuietHoursPillDemos() {
  return (
    <>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A - Active (right now)</span>
        <div className={styles.pillRow}>
          <QuietHoursPill
            state="active"
            windowLabel="19:00 - 07:00"
            daysLabel="Mon-Fri"
            onEdit={() => undefined}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B - Scheduled (queued for later)</span>
        <div className={styles.pillRow}>
          <QuietHoursPill
            state="scheduled"
            windowLabel="19:00 - 07:00"
            daysLabel="Tonight"
            onEdit={() => undefined}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C - Inactive</span>
        <div className={styles.pillRow}>
          <QuietHoursPill
            state="inactive"
            windowLabel="No window"
            daysLabel="Never"
            onEdit={() => undefined}
          />
        </div>
      </section>
    </>
  )
}

export function ToastCardActionDemos() {
  return (
    <>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B - Action + dismiss + countdown (6s)</span>
        <ToastCard
          tone="warning"
          title="Inventory low - Walker mid-muffler 50213"
          description="Last unit reserved 14 min ago. Reorder window closes today 16:00."
          actionLabel="Reorder"
          durationMs={6000}
          metaLine="29 May - 09:14"
          onDismiss={() => undefined}
          onAction={() => undefined}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C - Title only, no description</span>
        <ToastCard tone="success" title="Saved - quote draft QF-0242" durationMs={0} onDismiss={() => undefined} />
      </section>
    </>
  )
}
