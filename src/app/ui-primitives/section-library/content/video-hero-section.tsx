/**
 * Video hero section.
 *
 * Wraps the existing `video-heroes/CinematicLoopHero` (a client island) in the
 * shared section frame with Mufflermen copy and a poster fallback. Token-driven,
 * light/dark, responsive, reduced-motion respected by the hero primitive (it
 * pauses its loop under prefers-reduced-motion).
 *
 * Exports `VideoHeroSection` and `videoHeroManifest`.
 */

import { CinematicLoopHero } from "../../components/video-heroes"
import { seedanceById } from "../../seedance-video-pack"

import type { BlockManifest } from "../../builder/model"
import {
  DEFAULT_RESPONSIVE_RULES,
  sectionAccessibility,
  withCommonTokens,
} from "./_shared/manifest-helpers"
import shell from "./_shared/section-frame.module.css"
import styles from "./video-hero-section.module.css"

export function VideoHeroSection() {
  const hero = seedanceById("workshop-hero-landscape")

  return (
    <section className={shell.section} aria-labelledby="video-hero-heading">
      <header className={shell.header}>
        <span className={shell.kicker}>Hero</span>
        <h2 id="video-hero-heading" className={shell.title}>
          Cinematic video hero
        </h2>
        <p className={shell.lede}>
          A full-bleed looping video hero with a poster fallback and a metallic
          CTA — drop it at the top of any landing page.
        </p>
      </header>

      <div className={styles.heroFrame}>
        <CinematicLoopHero
          headline="Sounds right. Drives right."
          subhead="Mandrel-bent stainless exhausts, built and fitted in Oak Flats since 1998. Lifetime-warranted mufflers, fixed-price quotes, no upsell."
          cta={{ label: "Book a fit", href: "/book" }}
          videoSrc={hero.videoSrc}
          posterSrc={hero.posterSrc}
          timestampLabel="Oak Flats workshop · live bay"
        />
      </div>
    </section>
  )
}

export const videoHeroManifest: BlockManifest = {
  type: "section/video-hero",
  name: "Video hero section",
  category: "Media",
  kind: "section",
  version: "1.0.0",
  summary:
    "Full-bleed cinematic looping video hero with poster fallback, headline, subhead, and a metallic primary CTA. Pauses its loop under reduced-motion.",
  componentPath: "@/app/ui-primitives/section-library/content/video-hero-section",
  importName: "VideoHeroSection",
  propsSchema: { fields: [] },
  defaultProps: {},
  editableFields: [
    { path: "headline", label: "Headline", control: "text", valueType: "string" },
    { path: "subhead", label: "Subhead", control: "textarea", valueType: "richtext" },
    { path: "videoSrc", label: "Video (mp4)", control: "url", valueType: "url", optional: true },
    { path: "videoSrcWebm", label: "Video (webm)", control: "url", valueType: "url", optional: true },
    { path: "posterSrc", label: "Poster image", control: "image-picker", valueType: "image", optional: true },
    { path: "cta.label", label: "CTA label", control: "text", valueType: "string" },
    { path: "cta.href", label: "CTA link", control: "url", valueType: "url" },
    { path: "timestampLabel", label: "Overlay label", control: "text", valueType: "string", optional: true },
  ],
  tokenDependencies: withCommonTokens([
    { token: "--primitive-media-overlay", category: "color", usage: "video scrim over the loop" },
    { token: "--primitive-overlay", category: "color", usage: "headline contrast scrim" },
    { token: "--primitive-radius-2xl", category: "radius", usage: "hero frame corner" },
  ]),
  iconDependencies: [
    { name: "Play", importPath: "lucide-react", usage: "play affordance / overlay glyph" },
  ],
  assetDependencies: [
    { id: "hero-video", type: "video", required: false, description: "1920x1080 muted loop, mp4 + webm; falls back to poster." },
    { id: "hero-poster", type: "image", required: true, description: "Poster frame, 1920x1080 webp — first paint + reduced-motion fallback." },
  ],
  allowedChildren: [],
  responsiveRules: DEFAULT_RESPONSIVE_RULES,
  accessibilityRules: sectionAccessibility({
    role: "region",
    headingLevel: 2,
    keyboardOperable: true,
    notes: [
      "Video is muted, decorative, and pauses under prefers-reduced-motion (poster shown).",
      "CTA is a real link with a visible focus ring.",
    ],
  }),
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "VideoObject",
    requiresAltText: true,
    indexable: true,
  },
  conversionGoal: {
    id: "book-fit",
    label: "Book a fit",
    action: "navigate",
    eventName: "video_hero_book_fit",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {},
    aspectRatio: "16/9",
    background: "media",
    thumbnailBreakpoint: "xl",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { VideoHeroSection } from "@/app/ui-primitives/section-library/content/video-hero-section"',
      "",
      "export default function Landing() {",
      "  return <VideoHeroSection />",
      "}",
    ].join("\n"),
    caption: "Top-of-page cinematic hero. Supply a poster; video is optional.",
  },
  setupInstructions: {
    steps: [
      "Render under a `.dashboard`-scoped surface for tokens.",
      "Always supply a poster image — it is the reduced-motion and slow-network fallback.",
      "Add mp4 + webm sources for the loop; keep the file muted and short.",
    ],
    requires: [],
    notes: ["The hero is a client island; the section wrapper stays server-rendered."],
  },
  tags: ["video", "hero", "landing", "media"],
}
