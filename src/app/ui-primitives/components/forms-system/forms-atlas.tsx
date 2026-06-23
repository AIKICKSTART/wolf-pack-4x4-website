"use client"

import type { ComponentType } from "react"
import {
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  ClipboardList,
  FileText,
  Info,
  MousePointerClick,
  SlidersHorizontal,
  Tag,
  type LucideIcon,
} from "lucide-react"

import {
  AddressForm,
  BookingForm,
  ContactForm,
  FeedbackForm,
  FileUploadForm,
  NewsletterSignup,
  QuoteRequestForm,
  SearchFilterForm,
  SurveyForm,
  VehicleIntakeForm,
} from "../forms-gallery"
import {
  AccountTeamSettingsForm,
  AuthSecurityForm,
  BillingPaymentTaxForm,
  BuilderEditorAdminRulesForm,
  CalendarSchedulingForm,
  CommerceCheckoutForm,
  ComplianceKycConsentForm,
  EmailCampaignBuilderForm,
  NotificationPermissionsForm,
  QuoteAuthoringSignatureForm,
  RosterWorkshopOpsForm,
  SupplierOpsForm,
  SupportCommentComposerForm,
} from "./patterns/compact-patterns"
import {
  FORM_DNA_ROLES,
  FORM_DNA_STATES,
  FORM_FOUNDATION_CHAIN,
  FORM_DOMAINS,
  FORM_PATTERNS,
  type FormDomain,
  type FormDnaRoleId,
  type FormPattern,
  type FormPatternId,
} from "./form-patterns"

import styles from "./forms-atlas.module.css"

const ROLE_ICONS: Record<FormDnaRoleId, LucideIcon> = {
  label: Tag,
  hint: Info,
  field: FileText,
  select: ChevronDown,
  error: CircleAlert,
  submit: MousePointerClick,
}

const PATTERN_DEMOS: Record<FormPatternId, ComponentType> = {
  contact: ContactForm,
  newsletter: NewsletterSignup,
  booking: BookingForm,
  "vehicle-intake": VehicleIntakeForm,
  "quote-request": QuoteRequestForm,
  address: AddressForm,
  "search-filter": SearchFilterForm,
  "file-upload": FileUploadForm,
  "feedback-review": FeedbackForm,
  "survey-nps": SurveyForm,
  "auth-security": AuthSecurityForm,
  "account-team-settings": AccountTeamSettingsForm,
  "billing-payment-tax": BillingPaymentTaxForm,
  "quote-authoring-signature": QuoteAuthoringSignatureForm,
  "calendar-scheduling": CalendarSchedulingForm,
  "compliance-kyc-consent": ComplianceKycConsentForm,
  "supplier-ops": SupplierOpsForm,
  "roster-workshop-ops": RosterWorkshopOpsForm,
  "builder-editor-admin-rules": BuilderEditorAdminRulesForm,
  "support-comment-composer": SupportCommentComposerForm,
  "commerce-checkout": CommerceCheckoutForm,
  "notification-permissions": NotificationPermissionsForm,
  "email-campaign-builder": EmailCampaignBuilderForm,
}

function patternsForDomain(domain: FormDomain) {
  return FORM_PATTERNS.filter((pattern) => pattern.domain === domain)
}

function sourceLabel(pattern: FormPattern) {
  return pattern.source === "forms-gallery" ? "Gallery canonical" : "Atlas compact"
}

export function FormsAtlas() {
  const galleryCount = FORM_PATTERNS.filter(
    (pattern) => pattern.source === "forms-gallery",
  ).length
  const compactCount = FORM_PATTERNS.length - galleryCount
  const intentCount = new Set(FORM_PATTERNS.map((pattern) => pattern.intent)).size

  return (
    <div className={styles.atlas}>
      <section className={styles.heroPanel} aria-labelledby="forms-atlas-heading">
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Forms system / Source of truth</span>
          <h2 id="forms-atlas-heading">Every form family has a home.</h2>
          <p>
            This atlas promotes the existing gallery forms into the canonical board,
            fills the missing operational families, and gives every consuming route a
            stable pattern anchor.
          </p>
        </div>
        <dl className={styles.statsGrid} aria-label="Forms coverage counters">
          <div>
            <dt>Total families</dt>
            <dd>{FORM_PATTERNS.length}</dd>
          </div>
          <div>
            <dt>Full demos reused</dt>
            <dd>{galleryCount}</dd>
          </div>
          <div>
            <dt>Compact demos added</dt>
            <dd>{compactCount}</dd>
          </div>
          <div>
            <dt>Intent types</dt>
            <dd>{intentCount}</dd>
          </div>
        </dl>
      </section>

      <section
        className={styles.dnaPanel}
        aria-labelledby="forms-dna-heading"
        data-forms-dna-contract="true"
      >
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Forms DNA contract</span>
          <h2 id="forms-dna-heading">Fields inherit the foundation before demos render</h2>
          <p>
            Forms now expose the atomic grammar downstream pages must consume:
            labels, hints, fields, selects, errors, submit rails, validation states,
            and the exact Shared DNA routes they depend on.
          </p>
        </header>

        <div className={styles.foundationChain} data-form-foundation-chain="true">
          {FORM_FOUNDATION_CHAIN.map((item, index) => (
            <a key={item.source} href={item.route} className={styles.chainItem}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.source}</strong>
              <small>{item.contract}</small>
            </a>
          ))}
        </div>

        <div className={styles.contractGrid}>
          {FORM_DNA_ROLES.map((role) => {
            const Icon = ROLE_ICONS[role.id]
            return (
              <article
                key={role.id}
                className={styles.contractCard}
                data-form-dna-role={role.id}
              >
                <div className={styles.contractIcon} aria-hidden="true">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <span>{role.foundation}</span>
                <h3>{role.title}</h3>
                <p>{role.contract}</p>
                <code>{role.token}</code>
                <small>{role.output}</small>
              </article>
            )
          })}
        </div>

        <div className={styles.anatomyGrid}>
          <article className={styles.fieldBlueprint} data-form-field-anatomy="true">
            <div className={styles.blueprintHead}>
              <span className={styles.patternIndex}>01</span>
              <div>
                <h3>Field anatomy</h3>
                <p>Label, control, hint, error, and command slots stay present across every form family.</p>
              </div>
            </div>

            <div className={styles.formBlueprint}>
              <div className={styles.blueprintField}>
                <label htmlFor="forms-dna-email">Email label</label>
                <input
                  id="forms-dna-email"
                  readOnly
                  value="operator@oakflats.example"
                  aria-describedby="forms-dna-email-hint"
                />
                <small id="forms-dna-email-hint">Hint connected with aria-describedby.</small>
              </div>

              <div className={styles.blueprintField}>
                <label htmlFor="forms-dna-select">Select label</label>
                <div className={styles.selectShell}>
                  <select id="forms-dna-select" defaultValue="Workshop manager">
                    <option>Workshop manager</option>
                    <option>Technician</option>
                    <option>Parts desk</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </div>
              </div>

              <div className={styles.blueprintField}>
                <label htmlFor="forms-dna-invalid">Error label</label>
                <input
                  id="forms-dna-invalid"
                  readOnly
                  value="ABN pending"
                  aria-invalid="true"
                  aria-describedby="forms-dna-invalid-error"
                />
                <p id="forms-dna-invalid-error" className={styles.errorLine}>
                  Validation message occupies a reserved slot.
                </p>
              </div>

              <div className={styles.submitRail}>
                <button type="button">Reset</button>
                <button type="button">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  Submit
                </button>
              </div>
            </div>
          </article>

          <article className={styles.statePanel} data-form-state-grammar="true">
            <div className={styles.blueprintHead}>
              <span className={styles.patternIndex}>02</span>
              <div>
                <h3>State grammar</h3>
                <p>Validation and submission states use Feedback, Surfaces, Actions, and Selection tokens.</p>
              </div>
            </div>
            <div className={styles.stateGrid}>
              {FORM_DNA_STATES.map((item) => (
                <div key={item.state} className={styles.stateRow}>
                  <ClipboardList size={15} aria-hidden="true" />
                  <strong>{item.state}</strong>
                  <span>{item.owner}</span>
                  <small>{item.contract}</small>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.statePanel}>
            <div className={styles.blueprintHead}>
              <span className={styles.patternIndex}>03</span>
              <div>
                <h3>Pattern inventory</h3>
                <p>Every live demo is mapped to a domain, intent, field list, consumer routes, and state list.</p>
              </div>
            </div>
            <div className={styles.inventoryList} aria-label="Forms source inventory">
              <div>
                <SlidersHorizontal size={15} aria-hidden="true" />
                <strong>{FORM_PATTERNS.length}</strong>
                <span>canonical families</span>
              </div>
              <div>
                <FileText size={15} aria-hidden="true" />
                <strong>{galleryCount}</strong>
                <span>gallery demos reused</span>
              </div>
              <div>
                <MousePointerClick size={15} aria-hidden="true" />
                <strong>{compactCount}</strong>
                <span>compact demos added</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.matrix} aria-labelledby="forms-domain-heading">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Domain matrix</span>
          <h2 id="forms-domain-heading">Where each form belongs</h2>
          <p>
            Domains match the UI primitives board: public website, workshop,
            parts, commerce, CMS, operations, governance, agent surfaces, and
            marketing.
          </p>
        </header>
        <div className={styles.domainGrid}>
          {FORM_DOMAINS.map((domain) => {
            const patterns = patternsForDomain(domain)
            if (patterns.length === 0) return null
            return (
              <article key={domain} className={styles.domainCard}>
                <header>
                  <span>{patterns.length.toString().padStart(2, "0")}</span>
                  <h3>{domain}</h3>
                </header>
                <ul>
                  {patterns.map((pattern) => (
                    <li key={pattern.id}>
                      <a href={`#pattern-${pattern.id}`}>{pattern.shortTitle}</a>
                      <small>{pattern.intent}</small>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section className={styles.catalog} aria-labelledby="forms-catalog-heading">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Live demos</span>
          <h2 id="forms-catalog-heading">Canonical patterns</h2>
          <p>
            All demos stay local to the board. They submit to component state only,
            so they can be exercised without touching production APIs or CMS data.
          </p>
        </header>

        <div className={styles.patternStack}>
          {FORM_PATTERNS.map((pattern, patternIndex) => {
            const Demo = PATTERN_DEMOS[pattern.id]
            return (
              <article
                key={pattern.id}
                id={`pattern-${pattern.id}`}
                className={styles.patternPanel}
                aria-labelledby={`pattern-heading-${pattern.id}`}
                data-form-pattern={pattern.id}
                data-form-source={pattern.source}
              >
                <div className={styles.patternMeta}>
                  <span className={styles.patternIndex}>
                    {(patternIndex + 1).toString().padStart(2, "0")}
                  </span>
                  <span className={styles.sourcePill}>{sourceLabel(pattern)}</span>
                  <h3 id={`pattern-heading-${pattern.id}`}>{pattern.title}</h3>
                  <p>{pattern.description}</p>
                  <div className={styles.metaRows}>
                    <div>
                      <strong>Family</strong>
                      <span>{pattern.family}</span>
                    </div>
                    <div>
                      <strong>Used by</strong>
                      <span>{pattern.usedBy.join(", ")}</span>
                    </div>
                    <div>
                      <strong>Fields</strong>
                      <span>{pattern.fields.join(", ")}</span>
                    </div>
                    <div>
                      <strong>States</strong>
                      <span>{pattern.states.join(", ")}</span>
                    </div>
                  </div>
                  {pattern.route ? (
                    <a className={styles.openRoute} href={pattern.route}>
                      Open full route <span aria-hidden="true">-&gt;</span>
                    </a>
                  ) : null}
                </div>
                <div className={styles.demoSurface} data-form-pattern-demo={pattern.id}>
                  <Demo />
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
