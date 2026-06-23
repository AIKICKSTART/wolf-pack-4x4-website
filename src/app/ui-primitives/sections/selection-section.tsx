import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"

export function SelectionSection() {
  return (
    <section id="selection" className={styles.section}>
      <SectionHeader eyebrow="04 / Selection" title="Tabs, badges, chips, toggles, and checked states">
        Selection primitives are standardized for route filtering, job status flags, and
        shop-floor workflows.
      </SectionHeader>

      <div className={styles.selectionGrid}>
        <article className={styles.samplePanel}>
          <div className={styles.sampleHeader}>
            <h3>Tabs</h3>
            <Badge variant="outline">Keyboard-ready</Badge>
          </div>
          <Tabs defaultValue="overview" className={styles.tabsDemo}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="fitment">Fitment</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p>Shared job summary with vehicle, service, and quote state.</p>
            </TabsContent>
            <TabsContent value="fitment">
              <p>Clearance, pipe diameter, hanger, and ADR note checks.</p>
            </TabsContent>
            <TabsContent value="media">
              <p>Required photos, supplier images, and handover media status.</p>
            </TabsContent>
          </Tabs>
        </article>

        <article className={styles.samplePanel}>
          <div className={styles.sampleHeader}>
            <h3>Badges</h3>
            <Badge variant="outline">Status flags</Badge>
          </div>
          <div className={styles.badgeWall}>
            <Badge>Booked</Badge>
            <Badge variant="secondary">Fitment OK</Badge>
            <Badge variant="outline">Awaiting photos</Badge>
            <Badge variant="destructive">Supplier issue</Badge>
            <Badge variant="ghost">Draft</Badge>
          </div>
        </article>

        <article className={styles.samplePanel}>
          <div className={styles.sampleHeader}>
            <h3>Check and radio rows</h3>
            <Badge variant="secondary">Forms</Badge>
          </div>
          <div className={styles.choiceStack}>
            <label>
              <input type="checkbox" defaultChecked />
              <span>Legal volume required</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>Performance sound target</span>
            </label>
            <label>
              <input name="slot" type="radio" defaultChecked />
              <span>Morning drop-off</span>
            </label>
            <label>
              <input name="slot" type="radio" />
              <span>Afternoon inspection</span>
            </label>
          </div>
        </article>

        <article className={styles.samplePanel}>
          <div className={styles.sampleHeader}>
            <h3>Toggle chips</h3>
            <Badge variant="outline">Filter rail</Badge>
          </div>
          <div className={styles.chipGrid}>
            <button type="button" aria-pressed="true">Stainless</button>
            <button type="button">Mild steel</button>
            <button type="button">3 inch</button>
            <button type="button">4x4</button>
            <button type="button">ADR notes</button>
          </div>
        </article>
      </div>
    </section>
  )
}
