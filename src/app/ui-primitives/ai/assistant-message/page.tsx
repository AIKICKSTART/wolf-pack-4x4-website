import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AssistantMessageBubble,
  ChatThread,
  CitationPill,
} from "../../components/ai"
import { CodeBlock } from "../../components/primitives/code-block"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Assistant message bubble | UI Primitives — AI",
}

const SAMPLE_CODE = `// Fitment check — Hilux 2.8 GUN125 / GUN126
const flange = "v-band 76 mm"
const lengthMm = 1840
const noise = { static: 89, drive: 81 } // dB(A) NSW EPA bench`

export default function AssistantMessagePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.03 / Conversation"
        title="Assistant message bubble"
        description="Left-aligned panel surface with author + model badge, markdown-style children (paragraphs, lists, inline code, code blocks), citation slot, and feedback row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Assistant message" },
        ]}
      />
      <section className={styles.canvas}>
        <ChatThread ariaLabel="Assistant message variants">
          <AssistantMessageBubble
            timestamp="09:41"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
          >
            <p>
              For a <strong>Hilux 2.8L GUN125</strong>, here are the two
              volume-legal paths under NSW EPA 90 dB(A) static:
            </p>
            <ul>
              <li>
                <strong>Redback 3&quot; cat-back</strong> — A$1,184 fitted, 89
                dB(A), keeps drone tame.
              </li>
              <li>
                <strong>Magnaflow mid-pipe + factory tip</strong> — A$684 fitted,
                85 dB(A), invisible at idle.
              </li>
            </ul>
            <p>
              Both retain the cat. Use <code>v-band 76 mm</code> for the Redback
              join — easier service later.
            </p>
          </AssistantMessageBubble>

          <AssistantMessageBubble
            timestamp="09:42"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
            citations={
              <>
                <CitationPill
                  index={1}
                  title="NSW EPA noise limits — diesel utility 2018+"
                  url="https://www.epa.nsw.gov.au/noise-limits"
                  snippet="Diesel 4×4 utility 2018 onwards is bench-tested at 90 dB(A) static, 80 dB(A) drive-by."
                />
                <CitationPill
                  index={2}
                  title="Redback Exhausts — Hilux 2.8 spec sheet"
                  url="https://www.redbackexhausts.com.au/hilux-2-8-gun125"
                  snippet="Mandrel-bent 304 stainless. Tested at 89.1 dB(A) bench, hot-side V-band 76 mm."
                />
              </>
            }
          >
            <p>Reference fitment block from the Redback datasheet:</p>
            <CodeBlock
              code={SAMPLE_CODE}
              language="ts"
              showLineNumbers={false}
              maxHeight={180}
            />
          </AssistantMessageBubble>
        </ChatThread>

        <div className={styles.note}>
          <span>Streaming aria-live</span>
          <p>
            When <code>streaming</code> is true, content renders inside an
            &lt;output&gt; element with aria-live=&quot;polite&quot; and
            aria-busy=&quot;true&quot;, so screen-readers narrate tokens as they
            arrive without interrupting the user.
          </p>
        </div>
      </section>
    </main>
  )
}
