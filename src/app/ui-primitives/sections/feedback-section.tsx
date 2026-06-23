import { AlertTriangle, CheckCircle2, Minus } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"

export function FeedbackSection() {
  return (
    <section id="feedback" className={styles.section}>
      <SectionHeader eyebrow="07 / Feedback" title="Dialog, sheet, alerts, snackbar, progress, and skeletons">
        These were the main missing visible primitives from the current website audit.
      </SectionHeader>

      <div className={styles.feedbackGrid}>
        <article className={styles.samplePanel}>
          <div className={styles.sampleHeader}>
            <h3>Dialog and sheet</h3>
            <Badge variant="secondary">Interactive</Badge>
          </div>
          <div className={styles.buttonRow}>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm quote request</DialogTitle>
                  <DialogDescription>
                    Vehicle details, media notes, and contact preference are ready to send.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                  <Button>Send request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger render={<Button variant="secondary" />}>
                Open sheet
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Job readiness</SheetTitle>
                  <SheetDescription>
                    Track the pieces required before the workshop slot is confirmed.
                  </SheetDescription>
                </SheetHeader>
                <div className={styles.sheetChecklist}>
                  <span><CheckCircle2 aria-hidden="true" /> Vehicle details</span>
                  <span><CheckCircle2 aria-hidden="true" /> Sound target</span>
                  <span><Minus aria-hidden="true" /> Underside photos</span>
                </div>
                <SheetFooter>
                  <Button>Mark ready</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </article>

        <article className={styles.samplePanel}>
          <div className={styles.sampleHeader}>
            <h3>Accordion disclosure</h3>
            <Badge variant="outline">Content states</Badge>
          </div>
          <Accordion defaultValue={["media"]} multiple>
            <AccordionItem value="media">
              <AccordionTrigger>Required media</AccordionTrigger>
              <AccordionContent>
                <p>Underside, rear tip angle, current muffler, and engine bay shots.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="handover">
              <AccordionTrigger>Handover checklist</AccordionTrigger>
              <AccordionContent>
                <p>Sound note confirmed, leak check complete, and invoice ready.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </article>

        <article className={styles.alertPanel}>
          <AlertTriangle aria-hidden="true" />
          <div>
            <h3>Supplier media exception</h3>
            <p>Placeholder image is approved only after supplier outreach is logged.</p>
          </div>
        </article>

        <article className={styles.toastPanel} role="status" aria-live="polite">
          <CheckCircle2 aria-hidden="true" />
          <div>
            <strong>Quote saved</strong>
            <span>Draft is ready for customer confirmation.</span>
          </div>
        </article>

        <article className={styles.progressPanel}>
          <div>
            <span>Production readiness</span>
            <strong>82%</strong>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <span />
          </div>
        </article>

        <article className={styles.skeletonPanel} aria-label="Loading state preview">
          <span />
          <span />
          <span />
        </article>
      </div>
    </section>
  )
}
