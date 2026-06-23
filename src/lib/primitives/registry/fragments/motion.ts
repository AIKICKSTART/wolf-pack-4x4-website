import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "motion",
  "title": "Motion",
  "group": "Foundations",
  "summary": "An umbrella motion system of 14 client-side framer-motion wrappers (reveal, stagger, fade, slide, scale, magnetic, tilt, parallax, scroll-reveal, morph, gradient-trail, count-up, confetti) that all share one easing/duration token manifest and respect prefers-reduced-motion.",
  "entries": [
    {
      "key": "motion/motion-config",
      "family": "motion",
      "name": "MotionConfig",
      "label": "Motion config",
      "description": "Provider that publishes an umbrella transition preset and reduced-motion strategy to a framer-motion subtree so all child animations inherit consistent timing.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-motion-config",
      "tags": [
        "provider",
        "tokens",
        "reduced-motion"
      ],
      "status": "captured"
    },
    {
      "key": "motion/reveal",
      "family": "motion",
      "name": "Reveal",
      "label": "Reveal",
      "description": "Generic in-view reveal wrapper that plays a single transform + opacity step from a chosen direction when the element scrolls into view.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-reveal",
      "tags": [
        "in-view",
        "reveal",
        "transform"
      ],
      "status": "captured"
    },
    {
      "key": "motion/stagger-list",
      "family": "motion",
      "name": "StaggerList",
      "label": "Stagger list",
      "description": "Container that auto-staggers the reveal of each child once it enters the viewport, wrapping children in motion list items with a configurable per-item step.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-stagger-list",
      "tags": [
        "in-view",
        "stagger",
        "list"
      ],
      "status": "captured"
    },
    {
      "key": "motion/fade-in",
      "family": "motion",
      "name": "FadeIn",
      "label": "Fade in",
      "description": "Single-purpose in-view wrapper that animates only opacity, for dense type or full-bleed media where a transform would feel busy.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-fade-in",
      "tags": [
        "in-view",
        "fade",
        "opacity"
      ],
      "status": "captured"
    },
    {
      "key": "motion/slide-in",
      "family": "motion",
      "name": "SlideIn",
      "label": "Slide in",
      "description": "Directional in-view slide wrapper that pairs a translate with opacity using the emphasized easing, sliding from left/right/up/down.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-slide-in",
      "tags": [
        "in-view",
        "slide",
        "directional"
      ],
      "status": "captured"
    },
    {
      "key": "motion/scale-in",
      "family": "motion",
      "name": "ScaleIn",
      "label": "Scale in",
      "description": "In-view wrapper that scales a child from a starting factor up to 1 paired with opacity, with a configurable transform-origin.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-scale-in",
      "tags": [
        "in-view",
        "scale",
        "entrance"
      ],
      "status": "captured"
    },
    {
      "key": "motion/magnetic",
      "family": "motion",
      "name": "Magnetic",
      "label": "Magnetic",
      "description": "Hover wrapper that spring-pulls its child toward the pointer within a clamped strength, resetting on pointer leave or blur and inert under reduced-motion.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-magnetic",
      "tags": [
        "hover",
        "pointer",
        "spring"
      ],
      "status": "captured"
    },
    {
      "key": "motion/tilt",
      "family": "motion",
      "name": "Tilt",
      "label": "Tilt",
      "description": "3D tilt wrapper where pointer position drives clamped rotateX/rotateY inside a perspective container, disabled under reduced-motion.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-tilt",
      "tags": [
        "hover",
        "3d",
        "tilt"
      ],
      "status": "captured"
    },
    {
      "key": "motion/parallax-text",
      "family": "motion",
      "name": "ParallaxText",
      "label": "Parallax text",
      "description": "Wrapper that drifts long-form text along the y-axis based on the scroll progress of its own element via framer-motion useScroll.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-parallax-text",
      "tags": [
        "scroll",
        "parallax",
        "text"
      ],
      "status": "captured"
    },
    {
      "key": "motion/scroll-reveal",
      "family": "motion",
      "name": "ScrollReveal",
      "label": "Scroll reveal",
      "description": "Scroll-driven wrapper that continuously ramps opacity and y-drift as the element progresses through the viewport between configurable progress points.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-scroll-reveal",
      "tags": [
        "scroll",
        "reveal",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "motion/morph-text",
      "family": "motion",
      "name": "MorphText",
      "label": "Morph text",
      "description": "Crossfades between two strings on hover or a timed interval, holding layout width open with an invisible sizer and announcing changes via aria-live.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-morph-text",
      "tags": [
        "text",
        "crossfade",
        "hover"
      ],
      "status": "captured"
    },
    {
      "key": "motion/gradient-trail",
      "family": "motion",
      "name": "GradientTrail",
      "label": "Gradient trail",
      "description": "Decorative animated gradient stroke that traces along a consumer-provided SVG path via a looped stroke-dash animation, marked aria-hidden.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-gradient-trail",
      "tags": [
        "svg",
        "gradient",
        "decorative"
      ],
      "status": "captured"
    },
    {
      "key": "motion/count-up-watcher",
      "family": "motion",
      "name": "CountUpWatcher",
      "label": "Count-up watcher",
      "description": "Composes the CountUp primitive with an in-view gate so the numeric tween only starts when the element enters the viewport.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-count-up-watcher",
      "tags": [
        "in-view",
        "count-up",
        "number"
      ],
      "status": "captured"
    },
    {
      "key": "motion/confetti-on-success",
      "family": "motion",
      "name": "ConfettiOnSuccess",
      "label": "Confetti on success",
      "description": "Wraps ConfettiBurst and fires a single burst or twin cannons when an active prop transitions from false to true, re-arming on reset.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/motion",
      "routeHref": "/ui-primitives/motion#motion-section-confetti-on-success",
      "tags": [
        "confetti",
        "success",
        "trigger"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
