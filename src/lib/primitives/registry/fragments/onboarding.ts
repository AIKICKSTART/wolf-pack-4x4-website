import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "onboarding",
  "title": "Onboarding",
  "group": "System",
  "summary": "14 activation/onboarding primitives — welcome modal, setup checklist, first-action grid, milestone tracker, integration + profile completion surfaces, achievement toast, sample/demo workspace switchers, email reminder, and a composed get-started page template.",
  "entries": [
    {
      "key": "onboarding/welcome-modal",
      "family": "onboarding",
      "name": "WelcomeModal",
      "label": "Welcome modal",
      "description": "Accessible welcome dialog with branded garage SVG illustration, headline/body copy, and a vertical stack of next-step CTAs with skip/close.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/welcome",
      "tags": [
        "modal",
        "welcome",
        "dialog",
        "cta"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/setup-checklist",
      "family": "onboarding",
      "name": "SetupChecklist",
      "label": "Setup checklist",
      "description": "Ordered setup-step list with todo/in-progress/done statuses, duration chips, a computed progress bar, and expandable step details with a complete-now CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/setup-checklist",
      "tags": [
        "checklist",
        "progress",
        "setup",
        "steps"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/first-action-grid",
      "family": "onboarding",
      "name": "FirstActionGrid",
      "label": "First action grid",
      "description": "Grid of accent-coloured first-action cards, each with glyph, optional badge, title/description, duration chip, and a start link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/first-actions",
      "tags": [
        "grid",
        "actions",
        "cards",
        "getting-started"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/sample-data-banner",
      "family": "onboarding",
      "name": "SampleDataBanner",
      "label": "Sample data banner",
      "description": "Dismissible status banner indicating sample-data mode with an inline sample/live toggle and toggle/dismiss callbacks.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/sample-data-banner",
      "tags": [
        "banner",
        "sample-data",
        "toggle",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/tour-invitation-card",
      "family": "onboarding",
      "name": "TourInvitationCard",
      "label": "Tour invitation card",
      "description": "Card inviting users to a guided tour, with a thumbnail rail of numbered glyph stops, duration chip, start CTA, and dismiss link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/tour-invitation",
      "tags": [
        "tour",
        "invitation",
        "card",
        "guide"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/milestone-tracker",
      "family": "onboarding",
      "name": "MilestoneTracker",
      "label": "Milestone tracker",
      "description": "Horizontal milestone rail with complete/current/upcoming dots, computed fill percent, per-dot label/caption, and a you-are-here marker.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/milestone-tracker",
      "tags": [
        "milestones",
        "progress",
        "tracker",
        "activation"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/feature-highlight-card",
      "family": "onboarding",
      "name": "FeatureHighlightCard",
      "label": "Feature highlight card",
      "description": "Accent-themed feature-spotlight card with a pulsing kicker chip, headline/body, optional illustration slot, try-it CTA, and optional dismiss.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/feature-highlight",
      "tags": [
        "feature",
        "highlight",
        "card",
        "spotlight"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/achievement-unlock-toast",
      "family": "onboarding",
      "name": "AchievementUnlockToast",
      "label": "Achievement unlock toast",
      "description": "Polite-live toast that fires a confetti burst on open, showing an achievement title/body, optional points chip, and auto-close with dismiss.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/achievement-unlock",
      "tags": [
        "toast",
        "achievement",
        "gamification",
        "confetti"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/connect-integration-step",
      "family": "onboarding",
      "name": "ConnectIntegrationStep",
      "label": "Connect integration step",
      "description": "Integration connection card with a logo/fallback mark, status chip (not-started/in-progress/connected), description, and connect/manage action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/connect-integration",
      "tags": [
        "integration",
        "connect",
        "status",
        "step"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/profile-completion-meter",
      "family": "onboarding",
      "name": "ProfileCompletionMeter",
      "label": "Profile completion meter",
      "description": "Profile-completeness meter (horizontal or vertical) computing filled/total percent, listing missing-field chips, with a complete-profile CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/profile-completion",
      "tags": [
        "profile",
        "completion",
        "meter",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/empty-team-prompt",
      "family": "onboarding",
      "name": "EmptyTeamPrompt",
      "label": "Empty team prompt",
      "description": "Empty-state team prompt with a dashed avatar-group SVG illustration, headline/body, and primary invite plus secondary import CTAs.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/empty-team-prompt",
      "tags": [
        "empty-state",
        "team",
        "invite",
        "prompt"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/onboarding-email-reminder",
      "family": "onboarding",
      "name": "OnboardingEmailReminder",
      "label": "Onboarding email reminder",
      "description": "Envelope-styled preview of the next scheduled onboarding email — send time, from, subject, snippet — with a pause-reminders link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/email-reminder",
      "tags": [
        "email",
        "reminder",
        "preview",
        "schedule"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/demo-workspace-switcher",
      "family": "onboarding",
      "name": "DemoWorkspaceSwitcher",
      "label": "Demo workspace switcher",
      "description": "Region banner that toggles between a demo and live workspace, showing the currently-active workspace name and a toggle with on/off labels.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/demo-workspace",
      "tags": [
        "demo",
        "workspace",
        "switcher",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "onboarding/get-started-page-template",
      "family": "onboarding",
      "name": "GetStartedPageTemplate",
      "label": "Get started page template",
      "description": "Composed get-started page layout combining a hero header, MilestoneTracker, SetupChecklist, FirstActionGrid, and optional banner/aside slots.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/onboarding",
      "routeHref": "/ui-primitives/onboarding/get-started-template",
      "tags": [
        "template",
        "page",
        "composition",
        "get-started"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
