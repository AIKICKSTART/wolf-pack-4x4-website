import type { ComponentType } from "react"

import {
  CatBackSystemIcon,
  DynoCurveIcon,
  ExhaustPipeIcon,
  type IconProps,
  MufflermenMonogramIcon,
  ShieldTickIcon,
} from "../icons"
import { getPrimitiveToneContract } from "../primitive-system-contracts"
import { Chip, type ChipTone } from "../primitives/chip"
import { Kbd } from "../primitives/kbd"
import { ProgressLinear } from "../primitives/progress-linear"
import { ProgressRadial } from "../primitives/progress-radial"
import { StatTile } from "../primitives/stat-tile"
import { KineticText } from "../typography"
import {
  formatQuoteTotalAud,
  getQuoteTone,
  getQuoteVehicleLabel,
  QUOTE_CARD_STACK_QUOTES,
  type PendingQuote,
} from "../workshop-scenes/quote-card-stack-data"
import shellStyles from "./scene-shell.module.css"

const SERVICE_ICON_BY_TONE: Record<ChipTone, ComponentType<IconProps>> = {
  red: CatBackSystemIcon,
  amber: ExhaustPipeIcon,
  teal: DynoCurveIcon,
  green: ShieldTickIcon,
  neutral: MufflermenMonogramIcon,
}

interface QuoteWorkshopStatus {
  status: string
  statusTone: ChipTone
  bay: string
}

function getQuoteWorkshopStatus(quote: PendingQuote, fallbackTone: ChipTone): QuoteWorkshopStatus {
  const serviceLabels = quote.services.map((service) => service.label.toLowerCase()).join(" ")

  if (serviceLabels.includes("adr")) {
    return { status: "ADR check", statusTone: "amber", bay: "Compliance lane" }
  }

  if (serviceLabels.includes("lambda") || serviceLabels.includes("dyno")) {
    return { status: "Dyno follow-up", statusTone: "teal", bay: "Dyno cell" }
  }

  if (serviceLabels.includes("damping")) {
    return { status: "NVH check", statusTone: "teal", bay: "Quiet bay" }
  }

  if (serviceLabels.includes("egt")) {
    return { status: "Sensor fitment", statusTone: "red", bay: "Diesel bay" }
  }

  if (serviceLabels.includes("track")) {
    return { status: "Track note", statusTone: "amber", bay: "Fab bench" }
  }

  return { status: "Estimator review", statusTone: fallbackTone, bay: "Quote bay 01" }
}

export interface CardStackPrimitiveFallbackProps {
  copy?: string
  quotes?: ReadonlyArray<PendingQuote>
  selectedIndex?: number
}

export function CardStackPrimitiveFallback({
  copy = "Preparing the quote deck with the same primitives used by the live scene.",
  quotes = QUOTE_CARD_STACK_QUOTES,
  selectedIndex = 0,
}: CardStackPrimitiveFallbackProps) {
  const activeQuotes = quotes.length > 0 ? quotes : QUOTE_CARD_STACK_QUOTES
  const activeIndex = Math.min(selectedIndex, activeQuotes.length - 1)
  const topQuote = activeQuotes[activeIndex]
  const topTone = getQuoteTone(topQuote)
  const topToneContract = getPrimitiveToneContract(topTone)
  const topStatus = getQuoteWorkshopStatus(topQuote, topTone)
  const totalAud = activeQuotes.reduce((sum, quote) => sum + quote.totalAud, 0)
  const readiness = Math.min(100, 42 + activeQuotes.length * 7 + topQuote.services.length * 5)
  const quoteShare = Math.round((topQuote.totalAud / totalAud) * 100)
  const selectedSlot = `${String(activeIndex + 1).padStart(2, "0")}/${String(activeQuotes.length).padStart(2, "0")}`
  const quoteSparkline = activeQuotes.map((quote) => quote.totalAud)
  const selectedMirrorSync = Math.min(100, 58 + topQuote.services.length * 8 + quoteShare)
  const laneLoad = Math.min(100, 52 + activeIndex * 8 + topQuote.services.length * 7)
  const complianceServiceCount = topQuote.services.filter((service) => {
    const label = service.label.toLowerCase()
    return label.includes("adr") || label.includes("lambda") || label.includes("egt")
  }).length

  return (
    <div className={shellStyles.primitiveFallback} role="status" aria-live="polite">
      <header className={shellStyles.fallbackSceneHeader}>
        <div className={shellStyles.fallbackSceneTitle}>
          <Kbd size="sm">Primitive mirror</Kbd>
          <KineticText fontId={topToneContract.fontId} motion={topToneContract.kineticMotion} size="sm">
            Quote deck ready while WebGL loads
          </KineticText>
          <p>{copy}</p>
        </div>
        <div className={shellStyles.fallbackSceneMeta}>
          <Chip label={topQuote.reference} tone={topTone} selected />
          <Chip label={topStatus.status} tone={topStatus.statusTone} selected />
          <Chip label={formatQuoteTotalAud(totalAud)} tone="green" selected />
        </div>
      </header>
      <div className={shellStyles.fallbackDeck}>
        <div className={shellStyles.fallbackBayFrame} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={shellStyles.fallbackStackRail} aria-label="Fallback quote stack selector">
          {activeQuotes.map((quote, index) => {
            const quoteTone = getQuoteTone(quote)
            const quoteContract = getPrimitiveToneContract(quoteTone)
            const quoteStatus = getQuoteWorkshopStatus(quote, quoteTone)

            return (
              <div
                key={quote.id}
                className={shellStyles.fallbackStackItem}
                data-active={index === activeIndex ? "true" : "false"}
                style={{ borderLeftColor: quoteContract.accentHex }}
              >
                <Kbd size="sm">{String(index + 1).padStart(2, "0")}</Kbd>
                <span>{quote.reference}</span>
                <Chip label={quoteStatus.status} tone={quoteStatus.statusTone} selected disabled />
              </div>
            )
          })}
        </div>
        <span className={shellStyles.fallbackShadowCard} />
        <span className={shellStyles.fallbackShadowCard} />
        <article className={shellStyles.fallbackCard} style={{ borderLeftColor: topToneContract.accentHex }}>
          <div className={shellStyles.fallbackCardHeader}>
            <MufflermenMonogramIcon
              size={30}
              tone={topToneContract.iconTone}
              motion={topToneContract.iconMotion}
              variant="filled"
            />
            <span>{topQuote.reference}</span>
          </div>
          <strong>
            <KineticText
              fontId={topToneContract.fontId}
              motion={topToneContract.kineticMotion}
              size="sm"
            >
              {topQuote.customerName}
            </KineticText>
          </strong>
          <div className={shellStyles.fallbackCardMeta}>
            <em>{getQuoteVehicleLabel(topQuote)}</em>
            <Kbd size="sm">{topQuote.vehicleRego}</Kbd>
            <Chip label={topStatus.status} tone={topStatus.statusTone} selected disabled />
            <Chip label={topStatus.bay} tone="teal" selected disabled />
          </div>
          <b>{formatQuoteTotalAud(topQuote.totalAud)}</b>
          <div className={shellStyles.fallbackServiceRail} aria-label={`${topQuote.reference} service chips`}>
            {topQuote.services.slice(0, 4).map((service) => {
              const serviceTone = service.tone ?? "neutral"
              const serviceContract = getPrimitiveToneContract(serviceTone)
              const ServiceIcon = SERVICE_ICON_BY_TONE[serviceTone]

              return (
                <Chip
                  key={service.label}
                  label={service.label}
                  tone={serviceTone}
                  selected
                  disabled
                  icon={
                    <ServiceIcon
                      size={14}
                      tone={serviceContract.iconTone}
                      motion={serviceContract.iconMotion}
                      variant="filled"
                    />
                  }
                />
              )
            })}
          </div>
        </article>
      </div>
      <div className={shellStyles.fallbackPanel}>
        <div className={shellStyles.fallbackHeader}>
          <Chip label="Workbench fallback" tone="green" selected disabled />
          <Chip label="Oak Flats quote bay" tone="amber" disabled />
          <span>
            <Kbd size="sm">WebGL</Kbd>
            <Kbd size="sm">Hover</Kbd>
            <Kbd size="sm">Move</Kbd>
          </span>
        </div>
        <div className={shellStyles.fallbackWorkbenchStatus} aria-label={`${topQuote.reference} fallback workbench status`}>
          <div className={shellStyles.fallbackWorkbenchHead}>
            <Kbd size="sm">Fallback workbench</Kbd>
            <Chip label={topStatus.status} tone={topStatus.statusTone} selected disabled />
            <Chip label={topStatus.bay} tone="teal" selected disabled />
          </div>
          <KineticText fontId={topToneContract.fontId} motion={topToneContract.kineticMotion} size="sm">
            Selected quote mirror stays live
          </KineticText>
          <ProgressLinear
            label="Fallback primitive sync"
            value={selectedMirrorSync}
            tone={topToneContract.progressTone}
            variant="segmented"
            segments={8}
            showLabel
          />
          <div className={shellStyles.fallbackWorkbenchStats}>
            <StatTile
              label="Share"
              value={`${quoteShare}%`}
              tone={topTone}
              caption="Of fallback pipeline"
              sparkline={[quoteShare, selectedMirrorSync, laneLoad]}
              className={shellStyles.fallbackMiniStat}
            />
            <StatTile
              label="Checks"
              value={String(complianceServiceCount)}
              tone={complianceServiceCount > 0 ? "amber" : "green"}
              caption="ADR, lambda, and EGT flags"
              sparkline={[0, complianceServiceCount, topQuote.services.length]}
              className={shellStyles.fallbackMiniStat}
            />
          </div>
        </div>
        <div className={shellStyles.fallbackActivePacket}>
          <span className={shellStyles.fallbackActiveMark} aria-hidden="true">
            <MufflermenMonogramIcon
              size={28}
              tone={topToneContract.iconTone}
              motion={topToneContract.iconMotion}
              variant="filled"
            />
          </span>
          <div>
            <span>Selected packet</span>
            <strong>{topQuote.customerName}</strong>
            <em>
              {getQuoteVehicleLabel(topQuote)} · {topQuote.customerSuburb}
            </em>
          </div>
        </div>
        <div className={shellStyles.fallbackSelectedMirror} aria-label={`${topQuote.reference} fallback selected state`}>
          <div className={shellStyles.fallbackSelectedMirrorHeader}>
            <Kbd size="sm">Selected {selectedSlot}</Kbd>
            <Chip label={topStatus.bay} tone="teal" selected disabled />
            <Chip label={`${topQuote.services.length} services`} tone={topTone} selected disabled />
            <Chip label={`${complianceServiceCount} checks`} tone="amber" selected disabled />
          </div>
          <ProgressLinear
            label={`${topQuote.reference} quote share`}
            value={quoteShare}
            tone={topToneContract.progressTone}
            variant="segmented"
            segments={8}
            showLabel
          />
        </div>
        <div className={shellStyles.fallbackReadinessGrid}>
          <div className={shellStyles.fallbackReadinessMeter}>
            <ProgressRadial
              label="Fallback bay load"
              value={laneLoad}
              tone={topToneContract.progressTone}
              size="sm"
              showLabel
            />
            <span>
              <strong>Workbench lane load</strong>
              <em>{topQuote.reference} packet</em>
            </span>
          </div>
          <StatTile
            label="Fallback pipeline"
            value={formatQuoteTotalAud(totalAud)}
            tone="green"
            caption={`${activeQuotes.length} quote cards`}
            sparkline={quoteSparkline}
            className={shellStyles.fallbackMiniStat}
          />
        </div>
        <div className={shellStyles.chipRail}>
          <Chip label={topQuote.reference} tone={topTone} selected />
          <Chip label={topStatus.status} tone={topStatus.statusTone} selected />
          <Chip label={`${activeQuotes.length} quotes`} tone="amber" selected />
          <Chip label={formatQuoteTotalAud(totalAud)} tone="green" selected />
        </div>
        <div className={shellStyles.fallbackContractRail} aria-label="Fallback primitive contract">
          <Kbd size="sm">{topToneContract.iconMotion}</Kbd>
          <Chip label={topToneContract.kineticMotion} tone={topToneContract.progressTone} selected />
          <Kbd size="sm">{topToneContract.fontId}</Kbd>
        </div>
        <ProgressLinear
          label="Decision packet"
          value={readiness}
          tone={topToneContract.progressTone}
          variant="segmented"
          segments={10}
          showLabel
        />
        <span className={shellStyles.fallbackLoadingPulse}>
          Loading live 3D quote bay
        </span>
      </div>
    </div>
  )
}

export default CardStackPrimitiveFallback
