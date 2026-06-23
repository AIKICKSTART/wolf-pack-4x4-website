import { ChevronRight, ImageIcon, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"

const denseListItems = ["Leak inspection", "Bracket repair", "Tip alignment", "Handover call"] as const

export function SurfacesSection() {
  return (
    <section id="surfaces" className={styles.section}>
      <SectionHeader eyebrow="05 / Surfaces" title="Cards, panels, lists, tables, and empty states">
        Surfaces stay compact and scannable so the brand effect does not overpower parts,
        services, or operational status.
      </SectionHeader>

      <div className={styles.surfaceGrid}>
        <Card className={styles.componentCard}>
          <CardHeader>
            <CardTitle>Reusable card shell</CardTitle>
            <CardDescription>Header, content, footer, and action slot.</CardDescription>
            <CardAction>
              <Badge>Ready</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className={styles.cardMediaStub}>
              <ImageIcon aria-hidden="true" />
              <span>Job media preview</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">Inspect</Button>
          </CardFooter>
        </Card>

        <article className={styles.listPanel}>
          <h3>Dense list</h3>
          {denseListItems.map((item, index) => (
            <div className={styles.listRow} key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              <ChevronRight aria-hidden="true" />
            </div>
          ))}
          <Separator />
        </article>

        <article className={styles.tablePanel}>
          <h3>Spec table</h3>
          <div role="table" aria-label="Exhaust specification sample">
            <div role="row">
              <span role="columnheader">Pipe</span>
              <span role="columnheader">Material</span>
              <span role="columnheader">Status</span>
            </div>
            <div role="row">
              <span role="cell">3 inch</span>
              <span role="cell">Stainless</span>
              <span role="cell">Approved</span>
            </div>
            <div role="row">
              <span role="cell">2.5 inch</span>
              <span role="cell">Mild steel</span>
              <span role="cell">Quote</span>
            </div>
          </div>
        </article>

        <article className={styles.emptyPanel}>
          <Search aria-hidden="true" />
          <h3>No matching parts</h3>
          <p>Shorten the part number, vehicle model, supplier, or category filter.</p>
          <Button size="sm" variant="outline">Reset filters</Button>
        </article>
      </div>
    </section>
  )
}
