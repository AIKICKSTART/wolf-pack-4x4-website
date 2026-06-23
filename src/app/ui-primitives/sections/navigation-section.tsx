import {
  Bell,
  ChevronRight,
  Command,
  Home,
  Menu,
  PanelLeft,
  Route,
  Search,
  SlidersHorizontal,
  Wrench,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"

const primaryNavItems = [
  { label: "Workshop", icon: Wrench, active: true },
  { label: "Services", icon: Menu },
  { label: "Parts", icon: SlidersHorizontal },
  { label: "Quotes", icon: Route },
]

const routeStates = [
  { label: "Desktop rail", value: "Pinned" },
  { label: "Mobile rail", value: "Drawer" },
  { label: "Command", value: "Ready" },
]

export function NavigationSection() {
  return (
    <section id="navigation" className={styles.section}>
      <SectionHeader eyebrow="06 / Navigation" title="Shell, command bar, breadcrumb, and context rails">
        The reference video uses a left gallery rail. This route mirrors that pattern and
        adds production navigation primitives for the actual site.
      </SectionHeader>

      <div className={styles.navigationGrid}>
        <article className={styles.shellPreview}>
          <div className={styles.shellSidebar}>
            <strong>OFM</strong>
            {primaryNavItems.map((item) => {
              const Icon = item.icon
              return (
                <span key={item.label} data-active={item.active || undefined}>
                  <Icon aria-hidden="true" />
                  {item.label}
                </span>
              )
            })}
          </div>
          <div className={styles.shellContent}>
            <div className={styles.commandBar}>
              <Search aria-hidden="true" />
              <span>Search primitive, service, SKU, or suburb</span>
              <kbd>/</kbd>
            </div>
            <div className={styles.breadcrumbPreview} aria-label="Breadcrumb sample">
              <span>Home</span>
              <ChevronRight aria-hidden="true" />
              <span>Services</span>
              <ChevronRight aria-hidden="true" />
              <strong>Custom exhaust</strong>
            </div>
            <div className={styles.contextRail}>
              <div>
                <span>Quote state</span>
                <strong>Photos required</strong>
              </div>
              <Button size="sm">Request media</Button>
            </div>
            <div className={styles.navControlGrid}>
              <div className={styles.navControl}>
                <PanelLeft aria-hidden="true" />
                <span>Rail density</span>
                <div className={styles.segmentedNav} role="group" aria-label="Rail density preview">
                  <button type="button" aria-pressed="true">Dense</button>
                  <button type="button">Roomy</button>
                </div>
              </div>
              <div className={styles.navControl}>
                <Command aria-hidden="true" />
                <span>Command layers</span>
                <div className={styles.commandPills} aria-label="Command scope preview">
                  <em>SKU</em>
                  <em>Suburb</em>
                  <em>Service</em>
                </div>
              </div>
              <div className={styles.navControl}>
                <Bell aria-hidden="true" />
                <span>Route status</span>
                <dl className={styles.routeStateList}>
                  {routeStates.map((state) => (
                    <div key={state.label}>
                      <dt>{state.label}</dt>
                      <dd>{state.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </article>
        <article className={styles.breadcrumbSystem}>
          <div className={styles.breadcrumbNode} data-current="false">
            <Home aria-hidden="true" />
            <span>Home</span>
          </div>
          <ChevronRight aria-hidden="true" />
          <div className={styles.breadcrumbNode} data-current="false">
            <Wrench aria-hidden="true" />
            <span>Workshop</span>
          </div>
          <ChevronRight aria-hidden="true" />
          <div className={styles.breadcrumbNode} data-current="true">
            <Route aria-hidden="true" />
            <span>Quote review</span>
          </div>
        </article>
      </div>
    </section>
  )
}
