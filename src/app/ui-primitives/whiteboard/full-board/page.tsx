import type { Metadata } from "next"

import {
  ConnectorLineTool,
  CursorPresenceMarker,
  DrawingToolPalette,
  FrameOutline,
  HandDrawnArrow,
  MindMapNode,
  PenStrokeLayer,
  TextBoxTool,
  VoteDot,
  WbSelectionBox,
  WbStickyNote,
  WhiteboardCanvas,
} from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Full board | UI Primitives - Whiteboard",
}

export default function FullBoardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · Full board"
        title="Collaborative board composition"
        description="All whiteboard primitives assembled into a single visual workshop planning board."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Full board" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Q3 marketing board</span>
          <WhiteboardCanvas
            boardName="Q3 Marketing - Oak Flats"
            zoom={1.15}
            position={{ x: 420, y: -180 }}
          >
            <div style={{ position: "absolute", left: 24, top: 32 }}>
              <DrawingToolPalette activeTool="sticky" />
            </div>
            <div style={{ position: "absolute", left: 130, top: 54 }}>
              <FrameOutline title="Ideas" frameId="F-01" width={420} height={300} tone="amber">
                <div className={styles.stickyScatter}>
                  <WbStickyNote content="Photo evidence flow needs SMS link." author="Daniel" authorInitials="DF" tone="yellow" votes={8} />
                  <WbStickyNote content="Bundle ute exhaust with free fitment check." author="Jordan" authorInitials="JR" tone="green" votes={5} rotation={6} />
                </div>
              </FrameOutline>
            </div>
            <div style={{ position: "absolute", left: 610, top: 82 }}>
              <MindMapNode label="Customer pain points" childCount={3} width={300} />
            </div>
            <div style={{ position: "absolute", left: 620, top: 170 }}>
              <MindMapNode label="Quote confidence" depth={1} width={240} />
            </div>
            <div style={{ position: "absolute", left: 610, top: 250 }}>
              <TextBoxTool defaultValue="Prioritise evidence after pickup." alwaysShowToolbar />
            </div>
            <div style={{ position: "absolute", left: 470, top: 80 }}>
              <HandDrawnArrow tone="red" style="loose" />
            </div>
            <div style={{ position: "absolute", left: 515, top: 230 }}>
              <ConnectorLineTool
                start={{ x: 0, y: 20 }}
                end={{ x: 220, y: 80 }}
                shape="curved"
                label="feeds"
                color="var(--primitive-teal)"
              />
            </div>
            <div style={{ position: "absolute", left: 180, top: 350 }}>
              <PenStrokeLayer
                points={[
                  { x: 10, y: 70 },
                  { x: 80, y: 30 },
                  { x: 160, y: 64 },
                  { x: 250, y: 38 },
                ]}
                color="var(--primitive-red)"
              />
            </div>
            <div style={{ position: "absolute", left: 380, top: 170 }}>
              <VoteDot count={8} tone="red" pulse />
            </div>
            <div style={{ position: "absolute", left: 520, top: 315 }}>
              <WbSelectionBox width={180} height={120} groupCount={2} rotationLabel="4 deg" />
            </div>
            <div style={{ position: "absolute", left: 830, top: 120 }}>
              <CursorPresenceMarker name="Sophie" tone="purple" />
            </div>
            <div style={{ position: "absolute", left: 760, top: 360 }}>
              <CursorPresenceMarker name="Marcus" tone="blue" state="idle" />
            </div>
          </WhiteboardCanvas>
        </div>
      </section>
    </main>
  )
}
