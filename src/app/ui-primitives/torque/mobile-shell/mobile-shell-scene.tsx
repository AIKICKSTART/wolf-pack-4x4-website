"use client"

/**
 * "Torque on mobile" — composed phone shell.
 *
 * Customer-facing assistant identity is "Torque — your Mufflermen business
 * assistant" everywhere in this view. (Dev note only: the runtime codename is
 * intentionally kept out of all customer-visible strings below.)
 *
 * Built entirely from existing mobile-shell primitives (viewport, status bar,
 * loading bar, app bar, chip row, toast, bottom nav, FAB, drawer, modal sheet,
 * action sheet). No primitive is modified — they are imported and composed; the
 * chat bubbles and approval card are local composition markup.
 */

import {
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  Home,
  Menu,
  Pencil,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react"
import { useCallback, useState, type ReactElement } from "react"

import {
  ActionSheet,
  type ActionSheetItem,
  BottomNavBar,
  type BottomNavItem,
  ChipFilterRow,
  Fab,
  MobileDrawer,
  MobileLoadingBar,
  MobileStatusBar,
  MobileToast,
  ModalSheet,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "./torque-mobile.module.css"
import {
  APPROVAL_QUOTE,
  CHAT_TURNS,
  DRAWER_LINKS,
  FILTER_CHIPS,
  NAV_ITEMS,
  SUPPLIER_NOTE,
  TORQUE_ASSISTANT,
  type ChatTurn,
} from "./_demo-data"

const NAV_ICONS: Record<string, ReactElement> = {
  today: <Home size={20} strokeWidth={2.2} />,
  approvals: <ShieldCheck size={20} strokeWidth={2.2} />,
  torque: <Sparkles size={20} strokeWidth={2.2} />,
  shop: <ShoppingBag size={20} strokeWidth={2.2} />,
}

const NAV_BAR_ITEMS: ReadonlyArray<BottomNavItem> = NAV_ITEMS.map((item) => ({
  id: item.id,
  label: item.label,
  badge: item.badge,
  icon: NAV_ICONS[item.id] ?? <Home size={20} strokeWidth={2.2} />,
}))

function TorqueAvatar() {
  return (
    <span
      className={styles.torqueAvatar}
      role="img"
      aria-label={`${TORQUE_ASSISTANT.name}, ${TORQUE_ASSISTANT.role}`}
    >
      <span aria-hidden="true">{TORQUE_ASSISTANT.avatarInitial}</span>
    </span>
  )
}

function ChatBubble({ turn }: { turn: ChatTurn }) {
  const isOwner = turn.role === "owner"
  return (
    <li className={[styles.turn, isOwner ? styles.turnOwner : styles.turnTorque].join(" ")}>
      <div
        className={[styles.bubble, isOwner ? styles.bubbleOwner : styles.bubbleTorque].join(" ")}
        aria-label={isOwner ? "Owner message" : `${TORQUE_ASSISTANT.name} message`}
      >
        {turn.paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <time className={styles.turnTime}>{turn.timestamp}</time>
    </li>
  )
}

function ApprovalSnippet({
  approved,
  onApprove,
  onEdit,
}: {
  approved: boolean
  onApprove: () => void
  onEdit: () => void
}) {
  const quote = APPROVAL_QUOTE
  return (
    <article className={styles.approval} aria-label={`Quote ${quote.reference} awaiting approval`}>
      <header className={styles.approvalHead}>
        <span className={styles.approvalTag}>
          <ShieldCheck size={11} strokeWidth={2.6} aria-hidden="true" />
          Needs sign-off
        </span>
        <span className={styles.approvalRef}>{quote.reference}</span>
      </header>

      <div className={styles.approvalCustomer}>
        <span className={styles.approvalName}>{quote.customerName}</span>
        <span className={styles.approvalVehicle}>{quote.vehicle}</span>
        <span className={styles.approvalNoise}>
          <CheckCircle2 size={13} strokeWidth={2.4} aria-hidden="true" />
          {quote.noiseNote}
        </span>
      </div>

      <ul className={styles.lineList}>
        {quote.lines.map((line) => (
          <li key={line.id} className={styles.lineItem}>
            <span className={styles.lineLabel}>{line.label}</span>
            <span className={styles.lineAmount}>{line.amount}</span>
            <span className={styles.lineDetail}>{line.detail}</span>
          </li>
        ))}
      </ul>

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>{quote.totalLabel}</span>
        <span className={styles.totalValue}>{quote.total}</span>
      </div>

      {approved ? (
        <p className={styles.approvedState} role="status">
          <Check size={15} strokeWidth={2.8} aria-hidden="true" />
          Sent to {quote.customerName}
        </p>
      ) : (
        <div className={styles.approvalActions}>
          <button type="button" className={styles.editBtn} onClick={onEdit}>
            <Pencil size={14} strokeWidth={2.4} aria-hidden="true" />
            Tweak
          </button>
          <button type="button" className={styles.approveBtn} onClick={onApprove}>
            <Check size={15} strokeWidth={2.8} aria-hidden="true" />
            Approve &amp; send
          </button>
        </div>
      )}
    </article>
  )
}

export function MobileShellScene() {
  const [activeNav, setActiveNav] = useState<string>("today")
  const [filters, setFilters] = useState<ReadonlyArray<string>>(["needs-you"])
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)
  const [actionSheetOpen, setActionSheetOpen] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState<boolean>(false)
  const [approved, setApproved] = useState<boolean>(false)

  const toggleFilter = useCallback((id: string) => {
    setFilters((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    )
  }, [])

  const handleApprove = useCallback(() => {
    setApproved(true)
    setToastOpen(true)
  }, [])

  const fabItems: ReadonlyArray<ActionSheetItem> = [
    {
      id: "quote",
      label: "New quote",
      description: "Price an exhaust or service for a customer",
      icon: <Plus size={18} strokeWidth={2.4} />,
      onSelect: () => undefined,
    },
    {
      id: "booking",
      label: "Book a bay",
      description: "Reserve a hoist at Oak Flats",
      icon: <Calendar size={18} strokeWidth={2.4} />,
      onSelect: () => undefined,
    },
    {
      id: "supplier",
      label: "Check supplier ETA",
      description: SUPPLIER_NOTE.supplier,
      icon: <Truck size={18} strokeWidth={2.4} />,
      onSelect: () => setSheetOpen(true),
    },
  ]

  return (
    <div className={styles.split}>
      <MobileViewport label="Torque on mobile — owner app">
        <div className={styles.screen}>
          <MobileStatusBar time="7:42" carrier="5G" battery={78} tone="dark" />
          <MobileLoadingBar active={false} mode="indeterminate" tone="red" />
          <TopAppBar
            title="Torque"
            subtitle="Oak Flats Muffler Men"
            leading={
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Open menu"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
            }
            trailing={
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Supplier news"
                onClick={() => setSheetOpen(true)}
              >
                <Bell size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
            }
          />
          <ChipFilterRow
            options={FILTER_CHIPS}
            active={filters}
            onToggle={toggleFilter}
            onClear={() => setFilters([])}
            label="Filter today's feed"
          />

          <div className={styles.feed}>
            <MobileToast
              open={toastOpen}
              tone="success"
              title="Quote sent to Mark Stevens"
              description={`${APPROVAL_QUOTE.reference} · ${APPROVAL_QUOTE.total} fitted`}
              onDismiss={() => setToastOpen(false)}
            />

            <div className={styles.feedHeading}>
              <span className={styles.feedKicker}>Wednesday · {activeNav}</span>
              <h2 className={styles.feedTitle}>What needs you</h2>
            </div>

            <section className={styles.assistantRow} aria-label="Assistant">
              <TorqueAvatar />
              <span className={styles.assistantMeta}>
                <span className={styles.assistantName}>{TORQUE_ASSISTANT.name}</span>
                <span className={styles.assistantRole}>{TORQUE_ASSISTANT.role}</span>
              </span>
            </section>

            <ol className={styles.thread} aria-label="Torque conversation">
              <ChatBubble turn={CHAT_TURNS[0]} />
              <ChatBubble turn={CHAT_TURNS[1]} />
              <li className={[styles.turn, styles.turnTorque].join(" ")}>
                <ApprovalSnippet
                  approved={approved}
                  onApprove={handleApprove}
                  onEdit={() => setSheetOpen(true)}
                />
              </li>
            </ol>
          </div>

          <BottomNavBar
            items={NAV_BAR_ITEMS}
            activeId={activeNav}
            onSelect={setActiveNav}
            variant="pill"
          />
        </div>

        <Fab
          variant="icon"
          tone="red"
          icon={<Plus size={20} strokeWidth={2.6} />}
          label="Quick action"
          position="bottom-right"
          onClick={() => setActionSheetOpen(true)}
        />

        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Oak Flats Muffler Men"
          footer={<span className={styles.drawerFoot}>Torque · v1.4 · Illawarra NSW</span>}
        >
          <ul className={styles.drawerList}>
            {DRAWER_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  className={styles.drawerBtn}
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className={styles.drawerBtnLabel}>{link.label}</span>
                  <span className={styles.drawerBtnHint}>{link.hint}</span>
                </button>
              </li>
            ))}
          </ul>
        </MobileDrawer>

        <ModalSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          snap="half"
          title="Supplier update"
          description="Torque flagged this overnight"
        >
          <div className={styles.sheetBody}>
            <p className={styles.sheetLead}>
              Good news for Mark&apos;s Ranger Raptor job — the cat-back you priced is back in
              stock and freight is already booked to the workshop.
            </p>
            <div className={styles.supplierCard}>
              <span className={styles.supplierName}>{SUPPLIER_NOTE.supplier}</span>
              <span className={styles.supplierMsg}>{SUPPLIER_NOTE.message}</span>
              <span className={styles.supplierEta}>
                <Truck size={12} strokeWidth={2.4} aria-hidden="true" />
                ETA {SUPPLIER_NOTE.eta}
              </span>
            </div>
          </div>
        </ModalSheet>

        <ActionSheet
          open={actionSheetOpen}
          onClose={() => setActionSheetOpen(false)}
          title="Quick action"
          description="What do you need to do on the go?"
          items={fabItems}
        />
      </MobileViewport>

      <aside className={styles.controls} aria-label="Screen notes">
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>On the go</h2>
          <span className={styles.controlsHelp}>
            Status → loading → app bar → chips → chat + approval → bottom nav · FAB → action sheet
          </span>
        </div>

        <div className={styles.controlsRow}>
          <button type="button" className={styles.secondaryBtn} onClick={() => setDrawerOpen(true)}>
            Open menu
          </button>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => setActionSheetOpen(true)}
          >
            Quick action
          </button>
          <span className={styles.statusPill}>Tab: {activeNav}</span>
        </div>

        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} aria-hidden="true" />
            <span>
              <strong>Approve from the phone.</strong> Torque drops a fitted, volume-legal quote
              into the thread for one-tap sign-off.
            </span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} aria-hidden="true" />
            <span>
              <strong>Drawer + bottom-sheet.</strong> Menu slides in from the left; supplier news
              rises as a bottom-sheet modal.
            </span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureDot} aria-hidden="true" />
            <span>
              <strong>FAB action sheet.</strong> New quote, book a bay, or check a supplier ETA
              without leaving the feed.
            </span>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default MobileShellScene
