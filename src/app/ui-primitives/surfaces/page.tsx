import type { Metadata } from "next"
import {
  Camera,
  CheckCircle2,
  Gauge,
  Layers3,
  ListChecks,
  PanelTop,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Table2,
} from "lucide-react"

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
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  MetricBlock,
  StatusBadge,
  type StatusBadgeTone,
} from "../components/data-display"
import { PageHeader } from "../components/page-header"
import {
  GlassSurface,
  MaterialSurface,
  NeuoSurface,
} from "../components/surfaces"
import styles from "./surfaces-workbench.module.css"

export const metadata: Metadata = {
  title: "Surfaces | UI Primitives",
}

const workbenchMetrics = [
  {
    id: "surface-families",
    label: "Surface families",
    value: "3",
    unit: "active",
    delta: { label: "glass/m3/neuo", direction: "flat" as const },
  },
  {
    id: "states",
    label: "State coverage",
    value: "6",
    unit: "states",
    delta: { label: "+empty", direction: "up" as const },
  },
  {
    id: "density",
    label: "Min row height",
    value: "44",
    unit: "px",
    delta: { label: "touch-safe", direction: "flat" as const },
  },
  {
    id: "theme",
    label: "Theme parity",
    value: "2",
    unit: "modes",
    delta: { label: "checked", direction: "up" as const },
  },
] as const

const foundationTrace = [
  {
    index: "01.02.01",
    title: "Carbon base",
    token: "--primitive-carbon-weave",
    role: "Base material for premium cards, icon wells, command bars, and dense panels.",
    feeds: "Icons / actions / proof cards",
  },
  {
    index: "01.02.02",
    title: "Clearcoat red",
    token: "--primitive-metallic-red",
    role: "Foundation paint token becomes deeper ruby bodywork with clearcoat and controlled reflection.",
    feeds: "Actions / selected states / approvals",
  },
  {
    index: "01.02.03",
    title: "Chrome edge",
    token: "--primitive-chrome-edge",
    role: "Restrained trim line for highlights and edges, never a full blue-glare card fill.",
    feeds: "Glass / dividers / proof cards",
  },
  {
    index: "01.02.04",
    title: "Panel stack",
    token: "--primitive-panel / --primitive-panel-strong",
    role: "Default shell depth for route headers, workbenches, overlays, and data boards.",
    feeds: "Overlays / data display / search",
  },
  {
    index: "01.02.05",
    title: "Control depth",
    token: "--primitive-control-surface / --primitive-shadow-inset",
    role: "Interactive rows, tabs, buttons, raised states, and pressed states stay on shared depth rules.",
    feeds: "Navigation / mobile shells",
  },
] as const

const stateRows: ReadonlyArray<{
  state: string
  primitive: string
  check: string
  token: string
  tone: StatusBadgeTone
}> = [
  {
    state: "Default",
    primitive: "GlassSurface",
    check: "Layered job shell with status and action slots.",
    token: "--primitive-panel",
    tone: "info",
  },
  {
    state: "Raised",
    primitive: "MaterialSurface",
    check: "Elevation change keeps dense copy readable.",
    token: "--primitive-surface-2",
    tone: "brand",
  },
  {
    state: "Pressed",
    primitive: "NeuoSurface",
    check: "Inset treatment is reserved for selected or armed controls.",
    token: "--primitive-shadow-inset",
    tone: "warn",
  },
  {
    state: "Empty",
    primitive: "Card + Button",
    check: "No-data copy pairs one recovery action with one evidence hint.",
    token: "--primitive-control-surface",
    tone: "neutral",
  },
  {
    state: "Success",
    primitive: "StatusBadge",
    check: "Positive state uses token green, not custom ad-hoc color.",
    token: "--primitive-green",
    tone: "success",
  },
  {
    state: "Blocked",
    primitive: "Badge destructive",
    check: "Fault state remains obvious in dark and light modes.",
    token: "--primitive-red",
    tone: "error",
  },
]

const evidenceItems: ReadonlyArray<{
  title: string
  summary: string
  meta: string
  tone: StatusBadgeTone
  status: string
}> = [
  {
    title: "Before/after media tray",
    summary: "Proof shots sit in a neutral card shell with one action and a visible owner.",
    meta: "Camera queue · 11 items",
    tone: "success",
    status: "Ready",
  },
  {
    title: "Spec-table container",
    summary: "Rows keep fixed labels, short values, and a table caption for scan speed.",
    meta: "Exhaust spec · ADR note",
    tone: "info",
    status: "Mapped",
  },
  {
    title: "No-results recovery",
    summary: "Empty state suggests the next useful filter change instead of filler copy.",
    meta: "Parts search · 0 matches",
    tone: "warn",
    status: "Review",
  },
]

const cardPrimitiveRows = [
  {
    title: "Content card",
    role: "Editorial, help, docs, marketing, and content blocks with a clear header/body/footer rhythm.",
    size: "default",
    state: "Default",
  },
  {
    title: "Data card",
    role: "KPI, chart, dashboard, pricing, quote, and operational metric cards with dense scan paths.",
    size: "sm",
    state: "Dense",
  },
  {
    title: "Action card",
    role: "A card with one primary command, optional secondary command, and a readable disabled/loading state.",
    size: "default",
    state: "Action",
  },
  {
    title: "Media card",
    role: "Image, video, before/after, supplier-logo, file preview, and gallery surfaces with stable aspect ratios.",
    size: "default",
    state: "Media",
  },
  {
    title: "Selectable card",
    role: "Pressed, selected, active, checked, dragged, and keyboard-focused cards for builders and workflows.",
    size: "sm",
    state: "Selected",
  },
  {
    title: "Empty/error card",
    role: "Recovery state cards for missing data, blocked systems, destructive actions, and setup gaps.",
    size: "default",
    state: "Recovery",
  },
] as const

export default function SurfacesPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Surface materials and shells"
        description="The second Shared DNA route: material recipes, panel depth, state surfaces, dense rows, proof cards, and responsive shell containers that inherit directly from Foundations."
        dnaSectionId="surfaces"
      />

      <section
        id="card-primitives"
        className={styles.cardPrimitiveSection}
        aria-labelledby="card-primitives-title"
      >
        <div className={styles.cardPrimitiveHeader}>
          <span className={styles.kicker}>Shared DNA / Cards</span>
          <h2 id="card-primitives-title">Card primitives cover every surface level</h2>
          <p>
            Cards inherit the same material tokens as panels and buttons: shell, radius, border,
            elevation, focus, density, media frame, and selected/pressed states. Domain cards can
            specialize content, but they must map back to this contract.
          </p>
        </div>
        <div className={styles.cardPrimitiveGrid}>
          {cardPrimitiveRows.map((card) => (
            <Card
              key={card.title}
              size={card.size}
              className={styles.primitiveCardSpec}
              data-state-kind={card.state.toLowerCase()}
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.role}</CardDescription>
                <CardAction>
                  <Badge variant={card.state === "Recovery" ? "destructive" : "outline"}>{card.state}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className={styles.cardPrimitiveAnatomy}>
                  <span>Header</span>
                  <span>Body</span>
                  <span>Media</span>
                  <span>Action</span>
                </div>
              </CardContent>
              <CardFooter className={styles.cardFooter}>
                <Badge variant="secondary">{card.size === "sm" ? "Small" : "Medium"}</Badge>
                <Button size="xs" variant="outline">Inspect</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section
        className={styles.foundationTrace}
        aria-labelledby="surface-foundation-title"
        data-ui-surface-foundation-trace="true"
      >
        <div className={styles.traceHeader}>
          <span className={styles.kicker}>Foundation trace</span>
          <h2 id="surface-foundation-title">Surfaces consume the root material system</h2>
          <p>
            These are not decorative cards. Each surface family maps back to Foundations,
            then becomes the source material for typography, actions, forms, overlays, data
            display, search, file browsers, motion, and responsive shells. Carbon weave,
            metallic red, chrome edge, panel depth, and control states all stay traceable.
          </p>
        </div>

        <div className={styles.traceGrid}>
          {foundationTrace.map((item) => (
            <article key={item.index} className={styles.traceCard}>
              <span className={styles.traceIndex}>{item.index}</span>
              <h3>{item.title}</h3>
              <code>{item.token}</code>
              <p>{item.role}</p>
              <strong>{item.feeds}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workbench} aria-labelledby="surface-workbench-title">
        <div className={styles.workbenchHeader}>
          <div className={styles.headerCopy}>
            <span className={styles.kicker}>Workbench / production use</span>
            <h2 id="surface-workbench-title">Choose the right shell for the job</h2>
            <p>
              Each surface below uses the live primitive component and inherits the Foundations
              material tokens. Carbon carries density, metallic red carries priority, and chrome
              appears only as a restrained edge highlight.
            </p>
          </div>

          <div className={styles.controlStack} aria-label="Workbench controls">
            <NativeSelect
              aria-label="Surface scenario"
              className={styles.selectControl}
              defaultValue="bay-ops"
            >
              <NativeSelectOption value="bay-ops">Bay operations</NativeSelectOption>
              <NativeSelectOption value="parts">Parts lookup</NativeSelectOption>
              <NativeSelectOption value="handover">Customer handover</NativeSelectOption>
            </NativeSelect>
            <Button variant="outline" size="sm" aria-pressed="true">
              <SlidersHorizontal aria-hidden="true" />
              Compact density
            </Button>
            <Button variant="secondary" size="sm">
              <Search aria-hidden="true" />
              Evidence view
            </Button>
          </div>
        </div>

        <MetricBlock metrics={workbenchMetrics} className={styles.metricBand} />

        <div className={styles.surfaceDeck} aria-label="Surface family examples">
          <GlassSurface tone="obsidian" intensity="high" className={styles.surfacePanel}>
            <header className={styles.panelHeader}>
              <span className={styles.iconBox}>
                <Layers3 aria-hidden="true" />
              </span>
              <div>
                <h3>Glass job shell</h3>
                <p>Use for live operational panels over the workshop canvas.</p>
              </div>
              <StatusBadge tone="info" size="sm" shape="pill" label="Live" />
            </header>
            <Separator className={styles.separator} />
            <div className={styles.jobRows} aria-label="Glass surface content slots">
              <div>
                <span>Active bay</span>
                <strong>Hoist 03 · VF SS cat-back</strong>
              </div>
              <div>
                <span>Required proof</span>
                <strong>4 photos before handover</strong>
              </div>
              <div>
                <span>Action slot</span>
                <Button size="xs" variant="outline">Open job</Button>
              </div>
            </div>
          </GlassSurface>

          <MaterialSurface elevation={4} tone="primary" className={styles.surfacePanel}>
            <header className={styles.panelHeader}>
              <span className={styles.iconBox}>
                <PanelTop aria-hidden="true" />
              </span>
              <div>
                <h3>Metallic red approval panel</h3>
                <p>Use deep clearcoat paint for modal-adjacent approvals and queue priority.</p>
              </div>
              <StatusBadge tone="brand" size="sm" shape="pill" label="Clearcoat" />
            </header>
            <Separator className={styles.separator} />
            <div className={styles.approvalGrid}>
              <span>
                <CheckCircle2 aria-hidden="true" />
                Fitment checked
              </span>
              <span>
                <ShieldCheck aria-hidden="true" />
                ADR note attached
              </span>
              <span>
                <Gauge aria-hidden="true" />
                Noise target logged
              </span>
            </div>
            <div className={styles.progressRow}>
              <span>Approval readiness</span>
              <span aria-hidden="true"><i /></span>
              <strong>82%</strong>
            </div>
          </MaterialSurface>

          <NeuoSurface tone="amber" pressed className={styles.surfacePanel}>
            <header className={styles.panelHeader}>
              <span className={styles.iconBox}>
                <ListChecks aria-hidden="true" />
              </span>
              <div>
                <h3>Pressed control tile</h3>
                <p>Use Foundation inset depth only when selection has operational meaning.</p>
              </div>
              <StatusBadge tone="warn" size="sm" shape="pill" label="Armed" />
            </header>
            <Separator className={styles.separator} />
            <div className={styles.switchGrid} aria-label="Pressed control examples">
              <button type="button" aria-pressed="true">Legal volume</button>
              <button type="button" aria-pressed="true">Stainless</button>
              <button type="button">Resonator delete</button>
              <button type="button">Customer supplied</button>
            </div>
          </NeuoSurface>
        </div>
      </section>

      <section className={styles.sectionGrid} aria-label="Surface state matrix and anatomy">
        <article className={styles.matrixPanel}>
          <div className={styles.panelTitle}>
            <span className={styles.kicker}>State matrix</span>
            <h2>Surface states that need proof</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.stateTable}>
              <caption>Surface primitive state coverage</caption>
              <thead>
                <tr>
                  <th scope="col">State</th>
                  <th scope="col">Primitive</th>
                  <th scope="col">Check</th>
                  <th scope="col">Token</th>
                </tr>
              </thead>
              <tbody>
                {stateRows.map((row) => (
                  <tr key={row.state}>
                    <th scope="row" data-label="State">
                      <StatusBadge tone={row.tone} size="sm" shape="pill" label={row.state} />
                    </th>
                    <td data-label="Primitive">{row.primitive}</td>
                    <td data-label="Check">{row.check}</td>
                    <td data-label="Token">
                      <code>{row.token}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className={styles.anatomyPanel}>
          <div className={styles.panelTitle}>
            <span className={styles.kicker}>Anatomy</span>
            <h2>Slots, controls, evidence</h2>
          </div>
          <Tabs defaultValue="slots" className={styles.tabs}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger value="slots">Slots</TabsTrigger>
              <TabsTrigger value="density">Density</TabsTrigger>
              <TabsTrigger value="empty">Empty</TabsTrigger>
            </TabsList>
            <TabsContent value="slots" className={styles.tabsContent}>
              <p>
                Header, state badge, body evidence, metric band, and one primary action are the
                default surface contract.
              </p>
            </TabsContent>
            <TabsContent value="density" className={styles.tabsContent}>
              <p>
                Keep rows at 44px or taller, put long notes in the second line, and avoid
                resizing text with the viewport.
              </p>
            </TabsContent>
            <TabsContent value="empty" className={styles.tabsContent}>
              <p>
                Empty panels must name the missing thing, show the likely cause, and give a single
                recovery command.
              </p>
            </TabsContent>
          </Tabs>
          <div className={styles.emptyPreview} aria-label="Empty state preview">
            <Search aria-hidden="true" />
            <div>
              <h3>No matching proof media</h3>
              <p>Try bay, rego, technician, or delivery-date filters.</p>
            </div>
            <Button size="sm" variant="outline">Reset filters</Button>
          </div>
        </article>
      </section>

      <section className={styles.evidenceSection} aria-labelledby="evidence-title">
        <div className={styles.panelTitle}>
          <span className={styles.kicker}>Evidence / reusable card shell</span>
          <h2 id="evidence-title">Proof surfaces ready for downstream routes</h2>
        </div>
        <div className={styles.cardGrid}>
          {evidenceItems.map((item) => (
            <Card key={item.title} className={styles.evidenceCard}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.summary}</CardDescription>
                <CardAction>
                  <StatusBadge tone={item.tone} size="sm" shape="pill" label={item.status} />
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className={styles.mediaStub}>
                  <Camera aria-hidden="true" />
                  <span>{item.meta}</span>
                </div>
              </CardContent>
              <CardFooter className={styles.cardFooter}>
                <Badge variant="outline">Surface contract</Badge>
                <Button size="xs" variant="ghost">
                  <Table2 aria-hidden="true" />
                  Inspect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
