import type { Metadata } from "next"
import {
  Activity,
  ArrowDownRight,
  Bell,
  ChevronRight,
  Command,
  Gauge,
  Home,
  Map as MapIcon,
  Route,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Wrench,
} from "lucide-react"

import { PageHeader } from "../components/page-header"
import { NavigationSection } from "../sections"
import styles from "../ui-primitives.module.css"
import nav from "./navigation.module.css"

export const metadata: Metadata = {
  title: "Navigation | UI Primitives",
}

interface RailItem {
  label: string
  icon: typeof Wrench
  active?: boolean
  badge?: { value: string; tone?: "red" | "amber" }
}

const operatorLinks: RailItem[] = [
  { label: "Workshop", icon: Wrench, active: true, badge: { value: "4" } },
  { label: "Quotes", icon: Route, badge: { value: "12", tone: "amber" } },
  { label: "Parts", icon: SlidersHorizontal },
]

const insightLinks: RailItem[] = [
  { label: "Coverage", icon: MapIcon },
  { label: "Alerts", icon: Bell, badge: { value: "2", tone: "amber" } },
]

interface RouteStat {
  label: string
  value: string
  icon: typeof Gauge
  trend: string
  tone?: "up" | "down"
}

const routeStats: RouteStat[] = [
  { label: "Active routes", value: "06", icon: Route, trend: "+2 this week", tone: "up" },
  { label: "Median TTI", value: "184ms", icon: Gauge, trend: "-12ms", tone: "up" },
  { label: "Command hits", value: "1,204", icon: Command, trend: "+18%", tone: "up" },
  { label: "Stale links", value: "3", icon: Activity, trend: "+1 to triage", tone: "down" },
]

interface LadderState {
  label: string
  value: string
  state: "ok" | "wait" | "idle"
}

const routeStates: LadderState[] = [
  { label: "Desktop rail", value: "Pinned", state: "ok" },
  { label: "Mobile rail", value: "Drawer", state: "ok" },
  { label: "Command", value: "Ready", state: "ok" },
  { label: "Quote media", value: "Awaiting", state: "wait" },
]

const navTabs = ["Overview", "Pipeline", "Media"]

export default function NavigationPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Shell, rails, menus, command bars"
        description="Navigation primitives for the public site, control surfaces, and deeper app shells so route changes feel consistent across workshop and operator flows."
        dnaSectionId="navigation"
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Navigation" },
        ]}
      />

      <section className={nav.showcase} aria-labelledby="navigation-showcase-title">
        <header className={nav.showcaseHead}>
          <span className={nav.showcaseKicker}>
            <Route aria-hidden="true" width={12} height={12} />
            Operator shell
          </span>
          <h2 id="navigation-showcase-title" className={nav.showcaseTitle}>
            One rail, one command bar, every route legible
          </h2>
          <p className={nav.showcaseLede}>
            The reference layout pairs a pinned operator rail with a command bar, a live
            breadcrumb trail, and a route-status ladder — the same shell the workshop and
            quote flows render.
          </p>
        </header>

        <div className={nav.bento}>
          <article className={`${nav.panel} ${nav.shell}`} aria-label="Application shell preview">
            <nav className={nav.shellRail} aria-label="Workshop navigation">
              <div className={nav.railHead}>
                <span className={nav.railWordmark}>OFM</span>
                <span className={nav.railTag}>OPS</span>
              </div>

              <span className={nav.railGroupLabel}>Operate</span>
              {operatorLinks.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={nav.navLink}
                    data-active={item.active || undefined}
                    aria-current={item.active ? "page" : undefined}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className={nav.navBadge} data-tone={item.badge.tone}>
                        {item.badge.value}
                      </span>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </button>
                )
              })}

              <span className={nav.railGroupLabel}>Observe</span>
              {insightLinks.map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.label} type="button" className={nav.navLink}>
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className={nav.navBadge} data-tone={item.badge.tone}>
                        {item.badge.value}
                      </span>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </button>
                )
              })}
            </nav>

            <div className={nav.shellBody}>
              <div className={nav.commandRow}>
                <label className={nav.command}>
                  <Search aria-hidden="true" />
                  <input
                    className={nav.commandInput}
                    type="search"
                    placeholder="Search primitive, service, SKU, or suburb"
                    aria-label="Command search"
                  />
                  <kbd className={nav.kbd}>/</kbd>
                </label>
                <button type="button" className={nav.cmdButton}>
                  <Command aria-hidden="true" />
                  Command
                </button>
              </div>

              <div className={nav.tabs} role="tablist" aria-label="Shell views">
                {navTabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    className={nav.tab}
                    aria-selected={index === 0}
                    tabIndex={index === 0 ? 0 : -1}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <nav className={nav.trail} aria-label="Breadcrumb">
                <a className={nav.crumb} href="#navigation">
                  <Home aria-hidden="true" />
                  Home
                </a>
                <ChevronRight className={nav.crumbSep} aria-hidden="true" />
                <a className={nav.crumb} href="#navigation">
                  <Wrench aria-hidden="true" />
                  Workshop
                </a>
                <ChevronRight className={nav.crumbSep} aria-hidden="true" />
                <span className={nav.crumb} aria-current="page">
                  <Route aria-hidden="true" />
                  Quote review
                </span>
              </nav>

              <div className={nav.contextCard}>
                <div>
                  <span className={nav.contextLabel}>Quote state</span>
                  <strong className={nav.contextValue}>Photos required</strong>
                </div>
                <button type="button" className={nav.cmdButton}>
                  <Bell aria-hidden="true" />
                  Request media
                </button>
              </div>
            </div>
          </article>

          <article className={`${nav.panel} ${nav.stats}`} aria-label="Route metrics">
            {routeStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={nav.stat}>
                  <span className={nav.statHead}>
                    <Icon aria-hidden="true" />
                    {stat.label}
                  </span>
                  <span className={nav.statValue}>{stat.value}</span>
                  <span className={nav.statTrend} data-tone={stat.tone}>
                    {stat.tone === "down" ? (
                      <ArrowDownRight aria-hidden="true" />
                    ) : (
                      <TrendingUp aria-hidden="true" />
                    )}
                    {stat.trend}
                  </span>
                </div>
              )
            })}
          </article>

          <article className={`${nav.panel} ${nav.ladder}`} aria-label="Route status">
            <span className={nav.ladderHead}>
              <Activity aria-hidden="true" />
              Route status
            </span>
            <dl className={nav.ladderList}>
              {routeStates.map((state) => (
                <div key={state.label} className={nav.ladderRow}>
                  <span className={nav.ladderDot} data-state={state.state} aria-hidden="true" />
                  <dt className={nav.ladderTerm}>{state.label}</dt>
                  <dd className={nav.ladderDesc}>{state.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>

      <NavigationSection />
    </main>
  )
}
