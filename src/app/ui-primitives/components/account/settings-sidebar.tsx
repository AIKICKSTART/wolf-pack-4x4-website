import Link from "next/link"
import {
  AlertTriangle,
  Bell,
  CreditCard,
  KeyRound,
  MonitorSmartphone,
  Plug,
  ScrollText,
  ShieldCheck,
  User,
  Users,
  type LucideIcon,
} from "lucide-react"

import styles from "./settings-sidebar.module.css"

export interface SettingsSidebarItem {
  id: string
  href: string
  label: string
  description?: string
  icon: LucideIcon
  group: "personal" | "workspace" | "platform" | "danger"
}

interface SettingsSidebarProps {
  activeId: string
  items?: ReadonlyArray<SettingsSidebarItem>
  ariaLabel?: string
  className?: string
}

const DEFAULT_ITEMS: ReadonlyArray<SettingsSidebarItem> = [
  {
    id: "profile",
    href: "/ui-primitives/account/profile",
    label: "Profile",
    description: "Identity & locale",
    icon: User,
    group: "personal",
  },
  {
    id: "billing",
    href: "/ui-primitives/account/billing",
    label: "Billing",
    description: "Plan, invoices, methods",
    icon: CreditCard,
    group: "workspace",
  },
  {
    id: "team",
    href: "/ui-primitives/account/team",
    label: "Team",
    description: "Members & invites",
    icon: Users,
    group: "workspace",
  },
  {
    id: "integrations",
    href: "/ui-primitives/account/integrations",
    label: "Integrations",
    description: "Connected services",
    icon: Plug,
    group: "workspace",
  },
  {
    id: "notifications",
    href: "/ui-primitives/account/notifications",
    label: "Notifications",
    description: "Channels & cadence",
    icon: Bell,
    group: "personal",
  },
  {
    id: "security",
    href: "/ui-primitives/account/security",
    label: "Security",
    description: "Password, 2FA, alerts",
    icon: ShieldCheck,
    group: "platform",
  },
  {
    id: "sessions",
    href: "/ui-primitives/account/sessions",
    label: "Sessions",
    description: "Active device list",
    icon: MonitorSmartphone,
    group: "platform",
  },
  {
    id: "api-tokens",
    href: "/ui-primitives/account/api-tokens",
    label: "API tokens",
    description: "Programmatic access",
    icon: KeyRound,
    group: "platform",
  },
  {
    id: "audit-log",
    href: "/ui-primitives/account/audit-log",
    label: "Audit log",
    description: "Workspace activity",
    icon: ScrollText,
    group: "platform",
  },
  {
    id: "danger-zone",
    href: "/ui-primitives/account/danger-zone",
    label: "Danger zone",
    description: "Destructive actions",
    icon: AlertTriangle,
    group: "danger",
  },
]

const GROUP_TITLES: Record<SettingsSidebarItem["group"], string> = {
  personal: "Personal",
  workspace: "Workspace",
  platform: "Platform",
  danger: "Danger zone",
}

export function SettingsSidebar({
  activeId,
  items = DEFAULT_ITEMS,
  ariaLabel = "Account settings",
  className,
}: SettingsSidebarProps) {
  const itemsByGroup = items.reduce<Record<string, SettingsSidebarItem[]>>((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = []
    }
    acc[item.group].push(item)
    return acc
  }, {})

  const groupOrder: ReadonlyArray<SettingsSidebarItem["group"]> = [
    "personal",
    "workspace",
    "platform",
    "danger",
  ]

  const classes = [styles.nav, className].filter(Boolean).join(" ")

  return (
    <nav aria-label={ariaLabel} className={classes}>
      {groupOrder.map((group) => {
        const groupItems = itemsByGroup[group]
        if (!groupItems || groupItems.length === 0) {
          return null
        }
        return (
          <div key={group} className={styles.group}>
            <span className={styles.groupTitle}>{GROUP_TITLES[group]}</span>
            <ul className={styles.list}>
              {groupItems.map((item) => {
                const Icon = item.icon
                const isActive = item.id === activeId
                const linkClasses = [
                  styles.link,
                  isActive ? styles.linkActive : "",
                  item.group === "danger" ? styles.linkDanger : "",
                ]
                  .filter(Boolean)
                  .join(" ")
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={linkClasses}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className={styles.iconWrap} aria-hidden="true">
                        <Icon size={14} strokeWidth={2} />
                      </span>
                      <span className={styles.linkText}>
                        <span className={styles.label}>{item.label}</span>
                        {item.description && (
                          <span className={styles.description}>{item.description}</span>
                        )}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

export default SettingsSidebar
