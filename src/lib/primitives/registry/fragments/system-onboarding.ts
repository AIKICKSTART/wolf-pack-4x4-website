import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "system-onboarding",
  "title": "System onboarding",
  "group": "System",
  "summary": "14 tenant onboarding/setup primitives — welcome hero, account & workshop forms, integration/team/brand/migration steps, deploy + progress tiles, mentor chat, success and skip-confirmation states, and a vertical step rail — sharing one onboarding shell stylesheet.",
  "entries": [
    {
      "key": "system-onboarding/welcome-hero",
      "family": "system-onboarding",
      "name": "WelcomeHero",
      "label": "Welcome hero",
      "description": "Personalised onboarding welcome hero with tenant chip, logo placeholder, owner avatar card, optional stat row and CTA pair.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/welcome-hero",
      "tags": [
        "onboarding",
        "hero",
        "welcome"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/account-setup-form",
      "family": "system-onboarding",
      "name": "AccountSetupForm",
      "label": "Account setup form",
      "description": "Admin-account setup form with name/email/role/timezone fields, marketing opt-in switch, field-level error display and back/continue actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/account-setup-form",
      "tags": [
        "onboarding",
        "form",
        "account"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/workshop-config-card",
      "family": "system-onboarding",
      "name": "WorkshopConfigCard",
      "label": "Workshop config card",
      "description": "Workshop profile form with business details, address, trading-hours grid and a selectable services-offered chip catalogue.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/workshop-config-card",
      "tags": [
        "onboarding",
        "form",
        "workshop"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/integration-wizard-row",
      "family": "system-onboarding",
      "name": "IntegrationWizardRow",
      "label": "Integration wizard row",
      "description": "Single integration step row showing vendor mark, required/optional and status chips, region tag and a status-aware connect/manage/resolve action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/integration-wizard-row",
      "tags": [
        "onboarding",
        "integration",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/team-invite-panel",
      "family": "system-onboarding",
      "name": "TeamInvitePanel",
      "label": "Team invite panel",
      "description": "Team invite panel listing drafted/sent invites with avatars, role and status chips, an add-member row and a pending-count send action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/team-invite-panel",
      "tags": [
        "onboarding",
        "team",
        "invite"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/brand-setup-card",
      "family": "system-onboarding",
      "name": "BrandSetupCard",
      "label": "Brand setup card",
      "description": "Brand setup card with logo upload/uploaded states, a palette swatch radiogroup and a typography-pairing picker with live preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/brand-setup-card",
      "tags": [
        "onboarding",
        "brand",
        "theming"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/first-deploy-tile",
      "family": "system-onboarding",
      "name": "FirstDeployTile",
      "label": "First deploy tile",
      "description": "First-deploy tile with a radial readiness gauge, environment/target-URL meta, a pre-launch checklist and a go-live action gated on 100% readiness.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/first-deploy-tile",
      "tags": [
        "onboarding",
        "deploy",
        "checklist"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/migration-import-card",
      "family": "system-onboarding",
      "name": "MigrationImportCard",
      "label": "Migration import card",
      "description": "Data-migration card with a source-picker radiogroup, record counts, a status-driven progress bar, error state and status-aware import/retry action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/migration-import-card",
      "tags": [
        "onboarding",
        "migration",
        "import"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/template-pick-grid",
      "family": "system-onboarding",
      "name": "TemplatePickGrid",
      "label": "Template pick grid",
      "description": "Starter-template selection grid of cards with kind/recommended chips, feature lists and a per-card pick/selected toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/template-pick-grid",
      "tags": [
        "onboarding",
        "template",
        "grid"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/checklist-progress-tile",
      "family": "system-onboarding",
      "name": "ChecklistProgressTile",
      "label": "Checklist progress tile",
      "description": "Onboarding progress tile with percent/time/steps-left metrics, a segmented progress bar and a per-step status checklist with a resume action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/checklist-progress-tile",
      "tags": [
        "onboarding",
        "progress",
        "checklist"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/mentor-chat-card",
      "family": "system-onboarding",
      "name": "MentorChatCard",
      "label": "Mentor chat card",
      "description": "Mentor (Hermes) chat card with an aria-live transcript, typing indicator, suggested next-step chips and a message input row.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/mentor-chat-card",
      "tags": [
        "onboarding",
        "chat",
        "assistant"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/success-state-card",
      "family": "system-onboarding",
      "name": "SuccessStateCard",
      "label": "Success state card",
      "description": "Onboarding-complete celebration card with confetti layer, medal icon, optional stats, a next-steps link list and primary/secondary CTAs.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/success-state-card",
      "tags": [
        "onboarding",
        "success",
        "celebration"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/skip-confirmation-modal",
      "family": "system-onboarding",
      "name": "SkipConfirmationModal",
      "label": "Skip confirmation modal",
      "description": "Client alertdialog confirming a skipped onboarding step, listing consequences with Escape/backdrop dismissal and confirm/cancel/remind-later actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/skip-confirmation-modal",
      "tags": [
        "onboarding",
        "modal",
        "confirm"
      ],
      "status": "captured"
    },
    {
      "key": "system-onboarding/onboarding-step-rail",
      "family": "system-onboarding",
      "name": "OnboardingStepRail",
      "label": "Onboarding step rail",
      "description": "Vertical ordered step rail with connector line, state-driven dots (done/skipped/active/index), per-step status chip and caption/duration meta.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/system-onboarding",
      "routeHref": "/ui-primitives/system-onboarding/onboarding-step-rail",
      "tags": [
        "onboarding",
        "stepper",
        "navigation"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
