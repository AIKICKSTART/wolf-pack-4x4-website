import type { Metadata } from "next"

import {
  BlockLibraryPalette,
  ClickHeatMap,
  EmailCanvas,
  EmailThemePicker,
  FooterAssembler,
  HtmlOutputViewer,
  InlineImageUpload,
  MobilePreviewToggle,
  PersonalizationTokenPicker,
  PreheaderEditor,
  SavedTemplateList,
  SendTestEmailCard,
  SpamScoreCheck,
  StyleInspectorPane,
} from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import {
  BLOCK_PALETTE_SECTIONS,
  CLICK_HEAT_SPOTS,
  DAILY_CLICK_CELLS,
  PERSONALIZATION_TOKENS,
  SAMPLE_FROM,
  SAMPLE_HTML,
  SAMPLE_INLINED,
  SAMPLE_PLAIN,
  SAMPLE_PREHEADER,
  SAMPLE_SUBJECT,
  SAVED_TEMPLATES,
  SELECTED_BLOCK,
  SPAM_WARNINGS,
  TEST_RECIPIENTS,
  THEME_PRESETS,
  WINTER_NEWSLETTER_BLOCKS,
} from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Full email builder | Email builder",
  description:
    "Composition — the visual email builder for the Mufflermen Winter Workshop Newsletter. Palette + canvas + inspector with preview controls, preheader, send test, theme picker, saved templates, spam check, HTML output, click heatmap, image upload, token picker, and footer assembler.",
}

export default function FullEmailBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full email builder"
        title="Full email builder scene"
        description="The complete builder cockpit. The block palette holds the left rail, the canvas centres the active 600px column, and the inspector hugs the right edge. Above the canvas sit the preview toggle and preheader editor. Below — send test, theme picker, saved list, spam check, HTML output, and the click heatmap. The image upload modal and personalisation token overlay sit alongside, and the footer assembler closes the page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Full builder" },
        ]}
      />

      <MobilePreviewToggle />

      <PreheaderEditor
        defaultSubject={SAMPLE_SUBJECT}
        defaultPreheader={SAMPLE_PREHEADER}
      />

      <div className={styles.builderLayout}>
        <BlockLibraryPalette sections={BLOCK_PALETTE_SECTIONS} />

        <div className={styles.builderMain}>
          <EmailCanvas
            subject={SAMPLE_SUBJECT}
            preheader={SAMPLE_PREHEADER}
            fromLine={SAMPLE_FROM}
            blocks={WINTER_NEWSLETTER_BLOCKS}
            selectedBlockId={SELECTED_BLOCK.id}
            dropTargetState="hover"
          />

          <SpamScoreCheck
            score={4.2}
            subject={SAMPLE_SUBJECT}
            bodyExcerpt="Hi {{first_name}} — here's what's new in Oak Flats this month. Your last quote, {{quote.total}}, is still on the bench…"
            warnings={SPAM_WARNINGS}
          />
        </div>

        <div className={styles.builderSide}>
          <StyleInspectorPane block={SELECTED_BLOCK} />
          <EmailThemePicker presets={THEME_PRESETS} initialTheme="workshop-dark" />
          <SendTestEmailCard defaultRecipients={TEST_RECIPIENTS} />
        </div>
      </div>

      <div className={styles.overlayRow}>
        <InlineImageUpload
          defaultAlt="Winter workshop at sunrise — bay door open"
          defaultHref="https://mufflermen.com.au/winter-special"
          defaultRetina
          selectedAssetLabel="winter-hero@2x.webp · 1200 × 600"
        />
        <PersonalizationTokenPicker tokens={PERSONALIZATION_TOKENS} />
      </div>

      <div className={styles.builderFooter}>
        <HtmlOutputViewer
          html={SAMPLE_HTML}
          inlinedCss={SAMPLE_INLINED}
          plainText={SAMPLE_PLAIN}
        />
        <ClickHeatMap
          templateLabel={SAMPLE_SUBJECT}
          spots={CLICK_HEAT_SPOTS}
          dailyCells={DAILY_CLICK_CELLS}
          calendarTone="red"
        />
      </div>

      <SavedTemplateList templates={SAVED_TEMPLATES} />

      <FooterAssembler />
    </main>
  )
}
