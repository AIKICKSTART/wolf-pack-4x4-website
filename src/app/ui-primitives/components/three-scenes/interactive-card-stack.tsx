"use client"

import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react"
import type { ThreeEvent } from "@react-three/fiber"
import type { Group, Vector2 } from "three"

import {
  CatBackSystemIcon,
  DynoCurveIcon,
  ExhaustPipeIcon,
  type IconProps,
  MufflermenMonogramIcon,
  ShieldTickIcon,
  TachometerIcon,
} from "../icons"
import { getPrimitiveToneContract, primitiveToneContractList } from "../primitive-system-contracts"
import { Chip, type ChipTone } from "../primitives/chip"
import { Kbd } from "../primitives/kbd"
import { ProgressLinear } from "../primitives/progress-linear"
import { ProgressRadial } from "../primitives/progress-radial"
import { StatTile } from "../primitives/stat-tile"
import { Toast } from "../primitives/toast"
import { KineticText } from "../typography"
import {
  formatQuoteTotalAud,
  getQuoteTone,
  getQuoteVehicleLabel,
  QUOTE_CARD_STACK_QUOTES,
  type PendingQuote,
} from "../workshop-scenes/quote-card-stack-data"
import { CardStackPrimitiveFallback } from "./card-stack-primitive-fallback"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface InteractiveCardStackProps {
  ariaLabel?: string
  quotes?: ReadonlyArray<PendingQuote>
}

interface CardEntry {
  id: string
  quote: PendingQuote
  accent: string
  accentTone: ChipTone
  status: string
  statusTone: ChipTone
  bay: string
  slot: string
  vehicle: string
  total: string
}

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

type PrimitiveSceneTheme = "dark" | "light"

function readPrimitiveSceneTheme(): PrimitiveSceneTheme {
  if (typeof document === "undefined") {
    return "dark"
  }

  return document.documentElement.dataset.primitiveTheme === "light" ? "light" : "dark"
}

function usePrimitiveSceneTheme() {
  const [theme, setTheme] = useState<PrimitiveSceneTheme>(readPrimitiveSceneTheme)

  useEffect(() => {
    const root = document.documentElement
    const updateTheme = () => {
      setTheme(readPrimitiveSceneTheme())
    }
    const observer = new MutationObserver(updateTheme)

    updateTheme()
    observer.observe(root, { attributes: true, attributeFilter: ["data-primitive-theme"] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return theme
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

function buildCards(quotes: ReadonlyArray<PendingQuote>): ReadonlyArray<CardEntry> {
  return quotes.map((quote, index) => {
    const accentTone = getQuoteTone(quote)
    const toneContract = getPrimitiveToneContract(accentTone)
    const workshopStatus = getQuoteWorkshopStatus(quote, accentTone)

    return {
      id: String(index + 1).padStart(2, "0"),
      quote,
      accent: toneContract.accentHex,
      accentTone,
      status: workshopStatus.status,
      statusTone: workshopStatus.statusTone,
      bay: workshopStatus.bay,
      slot: `Slot ${String(index + 1).padStart(2, "0")}`,
      vehicle: getQuoteVehicleLabel(quote),
      total: formatQuoteTotalAud(quote.totalAud),
    }
  })
}

interface CardProps {
  entry: CardEntry
  index: number
  total: number
  theme: PrimitiveSceneTheme
  reduced: boolean
  selectedIndex: number
  hoveredIndex: number | null
  pointer: Vector2
  onHover: (index: number | null) => void
  onSelect: (index: number) => void
}

interface StackProps {
  cards: ReadonlyArray<CardEntry>
  reduced: boolean
  theme: PrimitiveSceneTheme
  selectedIndex: number
  onSelect: (index: number) => void
}

interface CardStackCanvasProps {
  activeIndex: number
  activeQuotes: ReadonlyArray<PendingQuote>
  ariaLabel: string
  cards: ReadonlyArray<CardEntry>
  isLightScene: boolean
  reduced: boolean
  sceneTheme: PrimitiveSceneTheme
  selectedIndex: number
  onReady: () => void
  onSelect: (index: number) => void
}

const CardStackCanvas = lazy(async () => {
  const [{ useFrame, useThree }, { Text }, { SceneCanvas }, THREE] = await Promise.all([
    import("@react-three/fiber"),
    import("@react-three/drei"),
    import("./scene-canvas"),
    import("three"),
  ])

  function WorkshopBay({ isLightScene }: { isLightScene: boolean }) {
    const railColor = isLightScene ? "#c4d0d9" : "#242a36"
    const lineColor = isLightScene ? "#d8e1e7" : "#171b25"
    const postColor = isLightScene ? "#d71f28" : "#e62028"
    const labelColor = isLightScene ? "#5b6878" : "#8c93a2"

    return (
      <group position={[0, -0.02, -0.75]}>
        <mesh position={[0, -0.72, 0]}>
          <boxGeometry args={[3.2, 0.028, 0.018]} />
          <meshStandardMaterial color={railColor} roughness={0.62} metalness={0.18} />
        </mesh>
        <mesh position={[0, 0.74, 0]}>
          <boxGeometry args={[3.2, 0.022, 0.014]} />
          <meshStandardMaterial color={lineColor} roughness={0.7} />
        </mesh>
        <mesh position={[-1.42, -0.02, 0]}>
          <boxGeometry args={[0.028, 1.52, 0.018]} />
          <meshStandardMaterial color={postColor} emissive={postColor} emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[1.42, -0.02, 0]}>
          <boxGeometry args={[0.028, 1.52, 0.018]} />
          <meshStandardMaterial color={postColor} emissive={postColor} emissiveIntensity={0.18} />
        </mesh>
        {[-1.02, -0.51, 0, 0.51, 1.02].map((x) => (
          <mesh key={x} position={[x, -0.74, 0.006]}>
            <boxGeometry args={[0.012, 0.16, 0.012]} />
            <meshStandardMaterial color={isLightScene ? "#aeb9c2" : "#303847"} roughness={0.72} />
          </mesh>
        ))}
        <Text
          position={[-1.22, 0.92, 0.02]}
          fontSize={0.055}
          color={labelColor}
          anchorX="left"
          anchorY="middle"
          fontWeight={800}
          letterSpacing={0.18}
        >
          OAK FLATS QUOTE BAY
        </Text>
        <Text
          position={[0.64, 0.92, 0.02]}
          fontSize={0.05}
          color={labelColor}
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.16}
        >
          DPF · CAT-BACK · ADR
        </Text>
      </group>
    )
  }

  function Card({
    entry,
    index,
    total,
    theme,
    reduced,
    selectedIndex,
    hoveredIndex,
    pointer,
    onHover,
    onSelect,
  }: CardProps) {
    const meshRef = useRef<Group>(null)
    const isSelected = selectedIndex === index
    const isHovered = hoveredIndex === index
    const isAnyHovered = hoveredIndex !== null
    const isLightTheme = theme === "light"
    const cardColor = isLightTheme ? (isSelected ? "#ffffff" : "#f8fbfd") : "#101016"
    const textColor = isLightTheme ? "#111722" : "#ffffff"
    const mutedTextColor = isLightTheme ? "#546273" : "#aeb2bd"
    const priceColor = isLightTheme ? "#8a5200" : "#ffc14f"
    const materialEmissive = isLightTheme ? "#ffffff" : isHovered || isSelected ? entry.accent : "#000000"
    const statusAccent = getPrimitiveToneContract(entry.statusTone).accentHex

    const targetState = useMemo(() => {
      return { position: new THREE.Vector3(), rotation: new THREE.Euler() }
    }, [])

    useFrame((_, deltaRaw) => {
      if (!meshRef.current) return
      const delta = Math.min(deltaRaw, 1 / 30)

      const layer = index
      const baseZ = isSelected ? 0.18 : -layer * 0.34 - 0.08
      const baseY = isSelected ? 0.14 : layer * 0.1
      const baseX = isSelected ? 0 : (index - (total - 1) / 2) * 0.05

      const selectionPush = isSelected ? 0.52 : 0
      const hoverPush = isHovered ? 1.55 : 0
      targetState.position.set(baseX, baseY, baseZ + selectionPush + hoverPush)

      const tiltX = isHovered ? -pointer.y * 0.32 : isSelected ? -0.04 : 0
      const tiltY = isHovered ? pointer.x * 0.32 : isSelected ? 0.05 : 0
      const dim = isAnyHovered && !isHovered ? -0.08 : 0
      targetState.rotation.set(tiltX + dim, tiltY, 0)

      if (reduced) {
        meshRef.current.position.copy(targetState.position)
        meshRef.current.rotation.copy(targetState.rotation)
        return
      }

      meshRef.current.position.lerp(targetState.position, 1 - Math.pow(0.001, delta))
      const curRot = meshRef.current.rotation
      curRot.x = THREE.MathUtils.lerp(curRot.x, targetState.rotation.x, 1 - Math.pow(0.001, delta))
      curRot.y = THREE.MathUtils.lerp(curRot.y, targetState.rotation.y, 1 - Math.pow(0.001, delta))
    })

    const onEnter = useCallback(
      (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation()
        onHover(index)
      },
      [index, onHover],
    )

    const onLeave = useCallback(
      (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation()
        onHover(null)
      },
      [onHover],
    )

    const onClick = useCallback(
      (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        onSelect(index)
      },
      [index, onSelect],
    )

    const emissiveIntensity = isLightTheme ? (isHovered ? 0.24 : 0.18) : isHovered ? 0.25 : isSelected ? 0.16 : 0

    return (
      <group ref={meshRef} onClick={onClick} onPointerOver={onEnter} onPointerOut={onLeave}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.3, 0.06]} />
          {isLightTheme ? (
            <meshBasicMaterial color={cardColor} toneMapped={false} />
          ) : (
            <meshStandardMaterial
              color={cardColor}
              metalness={0.25}
              roughness={0.55}
              emissive={materialEmissive}
              emissiveIntensity={emissiveIntensity}
            />
          )}
        </mesh>
        <mesh position={[-1.06, 0, 0.052]}>
          <boxGeometry args={[0.045, 1.16, 0.018]} />
          <meshStandardMaterial color={entry.accent} emissive={entry.accent} emissiveIntensity={0.6} />
        </mesh>
        <Text
          position={[-0.95, 0.46, 0.052]}
          fontSize={0.08}
          color={entry.accent}
          anchorX="left"
          anchorY="top"
          fontWeight={800}
          letterSpacing={0.18}
        >
          {entry.quote.reference}
        </Text>
        <Text
          position={[-0.95, 0.25, 0.052]}
          fontSize={0.15}
          color={textColor}
          anchorX="left"
          anchorY="top"
          fontWeight={900}
          maxWidth={1.85}
        >
          {entry.quote.customerName}
        </Text>
        <Text
          position={[-0.95, 0.02, 0.052]}
          fontSize={0.075}
          color={mutedTextColor}
          anchorX="left"
          anchorY="top"
          maxWidth={1.75}
        >
          {entry.vehicle} · {entry.quote.vehicleEngine}
        </Text>
        <Text
          position={[-0.95, -0.32, 0.052]}
          fontSize={0.065}
          color={mutedTextColor}
          anchorX="left"
          anchorY="bottom"
        >
          {entry.quote.customerSuburb} · {entry.quote.vehicleRego}
        </Text>
        <Text
          position={[0.56, -0.46, 0.052]}
          fontSize={0.13}
          color={priceColor}
          anchorX="left"
          anchorY="bottom"
          fontWeight={900}
        >
          {entry.total}
        </Text>
        <Text
          position={[0.84, 0.48, 0.052]}
          fontSize={0.07}
          color={entry.accent}
          anchorX="left"
          anchorY="top"
          fontWeight={800}
        >
          {entry.id}
        </Text>
        <Text
          position={[0.53, -0.18, 0.052]}
          fontSize={0.055}
          color={statusAccent}
          anchorX="left"
          anchorY="bottom"
          fontWeight={800}
          maxWidth={0.52}
        >
          {entry.status}
        </Text>
        <Text
          position={[0.53, -0.29, 0.052]}
          fontSize={0.046}
          color={mutedTextColor}
          anchorX="left"
          anchorY="bottom"
          maxWidth={0.52}
        >
          {entry.bay}
        </Text>
        {entry.quote.services.slice(0, 4).map((service, serviceIndex) => {
          const tone = service.tone ?? "neutral"
          const toneContract = getPrimitiveToneContract(tone)

          return (
            <mesh
              key={service.label}
              position={[-0.93 + serviceIndex * 0.34, -0.52, 0.058]}
            >
              <boxGeometry args={[0.24, 0.035, 0.014]} />
              <meshStandardMaterial
                color={toneContract.accentHex}
                emissive={toneContract.accentHex}
                emissiveIntensity={0.34}
              />
            </mesh>
          )
        })}
      </group>
    )
  }

  function Stack({ cards, reduced, theme, selectedIndex, onSelect }: StackProps) {
    const [hovered, setHovered] = useState<number | null>(null)
    const pointer = useThree((state) => state.pointer)

    const handle = useCallback(
      (next: number | null) => {
        setHovered(reduced ? null : next)
      },
      [reduced],
    )

    return (
      <group>
        {cards.map((entry, index) => (
          <Card
            key={entry.id}
            entry={entry}
            index={index}
            total={cards.length}
            theme={theme}
            reduced={reduced}
            selectedIndex={selectedIndex}
            hoveredIndex={hovered}
            pointer={pointer}
            onHover={handle}
            onSelect={onSelect}
          />
        ))}
      </group>
    )
  }

  function CardStackCanvasScene({
    activeIndex,
    activeQuotes,
    ariaLabel,
    cards,
    isLightScene,
    reduced,
    sceneTheme,
    selectedIndex,
    onReady,
    onSelect,
  }: CardStackCanvasProps) {
    return (
      <SceneCanvas
        fallbackVariant="card-stack"
        fallback={
          <CardStackPrimitiveFallback
            copy="WebGL was reset by the browser. The quote deck is still available through the primitive fallback."
            quotes={activeQuotes}
            selectedIndex={activeIndex}
          />
        }
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.4], fov: 40 }}
        gl={{ antialias: true, alpha: false }}
        role="img"
        aria-label={ariaLabel}
        onCreated={onReady}
      >
        <color attach="background" args={[isLightScene ? "#edf2f5" : "#050508"]} />
        <ambientLight intensity={isLightScene ? 0.92 : 0.4} />
        <directionalLight position={[2, 4, 5]} intensity={isLightScene ? 0.44 : 0.9} />
        <pointLight position={[-2, -2, 4]} intensity={isLightScene ? 0.14 : 0.4} color={"#40bcff"} />
        <WorkshopBay isLightScene={isLightScene} />
        <Stack
          cards={cards}
          reduced={reduced}
          theme={sceneTheme}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
        />
      </SceneCanvas>
    )
  }

  return { default: CardStackCanvasScene }
})

/**
 * Stack of workshop quote card meshes in 3D space with progressive z-offset.
 * Selecting a card brings it forward; hovering adds pointer tilt unless reduced
 * motion is enabled.
 */
export function InteractiveCardStack({
  ariaLabel = "Interactive 3D stack of job cards",
  quotes = QUOTE_CARD_STACK_QUOTES,
}: InteractiveCardStackProps = {}) {
  const reduced = useReducedMotion3D()
  const sceneTheme = usePrimitiveSceneTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectionToast, setSelectionToast] = useState<PendingQuote | null>(null)
  const [canMountCanvas, setCanMountCanvas] = useState(false)
  const [isCanvasReady, setCanvasReady] = useState(false)
  const activeQuotes = quotes.length > 0 ? quotes : QUOTE_CARD_STACK_QUOTES
  const activeIndex = Math.min(selectedIndex, activeQuotes.length - 1)
  const cards = useMemo(() => buildCards(activeQuotes), [activeQuotes])
  const selectedEntry = cards[activeIndex]
  const selectedQuote = activeQuotes[activeIndex]
  const selectedTone = getQuoteTone(selectedQuote)
  const selectedToneContract = getPrimitiveToneContract(selectedTone)
  const isLightScene = sceneTheme === "light"
  const totalAud = activeQuotes.reduce((sum, quote) => sum + quote.totalAud, 0)
  const serviceCount = activeQuotes.reduce((sum, quote) => sum + quote.services.length, 0)
  const averageAud = Math.round(totalAud / activeQuotes.length)
  const readiness = Math.min(100, 42 + activeQuotes.length * 7 + selectedQuote.services.length * 5)
  const selectedQuoteShare = Math.round((selectedQuote.totalAud / totalAud) * 100)
  const selectedSlot = `${String(activeIndex + 1).padStart(2, "0")}/${String(activeQuotes.length).padStart(2, "0")}`
  const selectedSparkline = [averageAud, selectedQuote.totalAud, Math.round((selectedQuote.totalAud + averageAud) / 2)]
  const quoteSparkline = activeQuotes.map((quote) => quote.totalAud)
  const selectedServices = selectedQuote.services
  const complianceServiceCount = selectedServices.filter((service) => {
    const label = service.label.toLowerCase()
    return label.includes("adr") || label.includes("lambda") || label.includes("egt")
  }).length
  const selectedMirrorSync = Math.min(100, 58 + selectedServices.length * 8 + selectedQuoteShare)
  const laneLoad = Math.min(100, 52 + activeIndex * 8 + selectedServices.length * 7)
  const quoteVariance = Math.round(((selectedQuote.totalAud - averageAud) / averageAud) * 100)
  const selectedQuoteDelta = `${quoteVariance >= 0 ? "+" : ""}${quoteVariance}%`
  const selectQuote = useCallback(
    (index: number) => {
      const nextQuote = activeQuotes[index]
      if (!nextQuote) return
      setSelectedIndex(index)
      setSelectionToast(nextQuote)
    },
    [activeQuotes],
  )
  const markCanvasReady = useCallback(() => {
    setCanvasReady(true)
  }, [])
  const fallbackCopy =
    "Loading the WebGL quote deck. The selected quote, service chips, and decision packet are already live through primitives."
  const primitiveFallback = (
    <CardStackPrimitiveFallback copy={fallbackCopy} quotes={activeQuotes} selectedIndex={activeIndex} />
  )

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setCanMountCanvas(true)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <figure className={shellStyles.shell} data-card-stack-workbench="true">
      <figcaption>
        Workshop quote cards stacked in three-dimensional space with progressive depth. Selecting
        a card brings it forward, and hovering tilts it toward the pointer.
      </figcaption>
      <div className={shellStyles.canvasWrap} data-canvas-ready={isCanvasReady ? "true" : "false"} data-scene-theme={sceneTheme}>
        {canMountCanvas ? (
          <Suspense fallback={primitiveFallback}>
            <CardStackCanvas
              activeIndex={activeIndex}
              activeQuotes={activeQuotes}
              ariaLabel={ariaLabel}
              cards={cards}
              isLightScene={isLightScene}
              reduced={reduced}
              sceneTheme={sceneTheme}
              selectedIndex={activeIndex}
              onReady={markCanvasReady}
              onSelect={selectQuote}
            />
          </Suspense>
        ) : (
          primitiveFallback
        )}
        <div
          className={shellStyles.canvasPrimitiveRail}
          aria-label={`${selectedQuote.reference} selected service primitives`}
        >
          <Kbd size="sm">{selectedQuote.reference}</Kbd>
          <Chip label={selectedEntry.status} tone={selectedEntry.statusTone} selected disabled />
          <Chip label={selectedEntry.bay} tone="teal" selected disabled />
          {selectedQuote.services.slice(0, 4).map((service) => {
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
          <span className={shellStyles.canvasReadyPill} data-ready={isCanvasReady ? "true" : "false"}>
            {isCanvasReady ? "WebGL ready" : "Primitive fallback"}
          </span>
          <span className={shellStyles.canvasRailMeter}>
            <ProgressLinear
              label="Selected sync"
              value={selectedMirrorSync}
              tone={selectedToneContract.progressTone}
              variant="segmented"
              segments={5}
            />
          </span>
        </div>
        <div className={shellStyles.overlay}>
          <Chip label="Workbench live" tone="green" disabled selected />
          <Chip label="Oak Flats quote bay" tone="amber" disabled />
          <span className={shellStyles.overlayKeys}>
            <Kbd size="sm">Click</Kbd>
            <Kbd size="sm">Hover</Kbd>
            <Kbd size="sm">Move</Kbd>
          </span>
        </div>
      </div>
      <div className={shellStyles.primitiveDock} aria-label="Card stack primitive data">
        <div className={shellStyles.dockHeader}>
          <span>Shared quote primitive data · {selectedEntry.status}</span>
          <span className={shellStyles.keyHint}>
            <Kbd size="sm">Click</Kbd>
            <Kbd size="sm">Hover</Kbd>
            <Kbd size="sm">Move</Kbd>
          </span>
        </div>
        <div className={shellStyles.dockWorkbenchGrid} aria-label="Selected quote workbench status">
          <section className={shellStyles.workbenchCommand}>
            <div className={shellStyles.workbenchCommandHead}>
              <Kbd size="sm">Workbench live</Kbd>
              <Chip label={selectedEntry.status} tone={selectedEntry.statusTone} selected disabled />
              <Chip label={selectedEntry.bay} tone="teal" selected disabled />
            </div>
            <KineticText
              fontId={selectedToneContract.fontId}
              motion={selectedToneContract.kineticMotion}
              size="md"
            >
              Selected quote command board
            </KineticText>
            <p>
              The lifted card, quote mirror, bay chips, service contracts, stats, progress meters,
              and decision toast are all reading from {selectedQuote.reference}.
            </p>
            <div className={shellStyles.workbenchPrimitiveStack}>
              <Chip label={selectedQuote.vehicleRego} tone="teal" selected disabled />
              <Chip label={`${selectedServices.length} services`} tone={selectedTone} selected disabled />
              <Chip label={`${complianceServiceCount} compliance checks`} tone="amber" selected disabled />
              <Chip label={formatQuoteTotalAud(selectedQuote.totalAud)} tone={selectedTone} selected disabled />
            </div>
            <ProgressLinear
              label="Selected primitive sync"
              value={selectedMirrorSync}
              tone={selectedToneContract.progressTone}
              variant="segmented"
              segments={10}
              showLabel
            />
          </section>
          <section className={shellStyles.workbenchStatusBoard} aria-label="Workbench progress and statistics">
            <div className={shellStyles.workbenchMeterBlock}>
              <ProgressRadial
                label="Bay load"
                value={laneLoad}
                tone={selectedToneContract.progressTone}
                size="md"
                showLabel
              />
              <span className={shellStyles.workbenchMeterCopy}>
                <strong>{selectedEntry.bay}</strong>
                <em>{selectedQuote.reference} lane pressure</em>
              </span>
            </div>
            <div className={shellStyles.workbenchMiniStats}>
              <StatTile
                label="Selected share"
                value={`${selectedQuoteShare}%`}
                tone={selectedTone}
                caption="Of active quote pipeline"
                sparkline={selectedSparkline}
                className={shellStyles.dockStat}
              />
              <StatTile
                label="Checks"
                value={String(complianceServiceCount)}
                tone={complianceServiceCount > 0 ? "amber" : "green"}
                caption="ADR, lambda, and EGT flags"
                sparkline={[0, complianceServiceCount, selectedServices.length]}
                className={shellStyles.dockStat}
              />
            </div>
          </section>
        </div>
        <div className={shellStyles.dockEcosystemRail} aria-label="Card stack primitive ecosystem">
          <div className={shellStyles.dockEcosystemText}>
            <KineticText fontId="anton" motion="weld-flicker" size="sm">
              Quote stack primitive spine
            </KineticText>
            <span>
              <Kbd size="sm">KineticText</Kbd>
              <Kbd size="sm">Icons</Kbd>
              <Kbd size="sm">Stats</Kbd>
            </span>
          </div>
          <div className={shellStyles.dockIconRail} aria-hidden="true">
            <span>
              <MufflermenMonogramIcon size={28} tone="red" motion="pulse" variant="filled" />
            </span>
            <span>
              <ExhaustPipeIcon size={28} tone="amber" motion="spark" variant="filled" />
            </span>
            <span>
              <TachometerIcon size={28} tone="teal" motion="pulse" variant="filled" />
            </span>
            <span>
              <ShieldTickIcon size={28} tone="green" motion="pulse" variant="filled" />
            </span>
          </div>
        </div>
        <div className={shellStyles.dockContractRail} aria-label="Shared brand contract map">
          {primitiveToneContractList.map((contract) => (
            <div
              key={contract.chipTone}
              className={`${shellStyles.dockContractCard} ${
                contract.chipTone === selectedTone ? shellStyles.dockContractCardActive : ""
              }`}
            >
              <span className={shellStyles.dockContractMark} aria-hidden="true">
                <MufflermenMonogramIcon
                  size={26}
                  tone={contract.iconTone}
                  motion={contract.iconMotion}
                  variant="filled"
                />
              </span>
              <div className={shellStyles.dockContractCopy}>
                <KineticText fontId={contract.fontId} motion={contract.kineticMotion} size="sm">
                  {contract.kineticMotion}
                </KineticText>
                <span>
                  <Kbd size="sm">{contract.iconMotion}</Kbd>
                  <Chip label={contract.chipTone} tone={contract.chipTone} selected={contract.chipTone === selectedTone} />
                </span>
              </div>
              <ProgressLinear
                label={`${contract.chipTone} influence`}
                value={contract.chipTone === selectedTone ? 100 : 64}
                tone={contract.progressTone}
                variant="segmented"
                segments={5}
              />
            </div>
          ))}
        </div>
        <div className={shellStyles.statusProgressRail} aria-label="Workbench status progress mirrors">
          <div className={shellStyles.statusProgressItem}>
            <div>
              <Kbd size="sm">Card lift</Kbd>
              <Chip label={selectedSlot} tone={selectedTone} selected disabled />
            </div>
            <ProgressLinear
              label={`${selectedQuote.reference} lift mirror`}
              value={selectedMirrorSync}
              tone={selectedToneContract.progressTone}
              variant="segmented"
              segments={8}
              showLabel
            />
          </div>
          <div className={shellStyles.statusProgressItem}>
            <div>
              <Kbd size="sm">Bay status</Kbd>
              <Chip label={selectedEntry.status} tone={selectedEntry.statusTone} selected disabled />
            </div>
            <ProgressLinear
              label={`${selectedEntry.bay} workbench load`}
              value={laneLoad}
              tone={selectedEntry.statusTone === "red" ? "red" : selectedToneContract.progressTone}
              variant="segmented"
              segments={8}
              showLabel
            />
          </div>
        </div>
        <div className={shellStyles.quoteSelector} aria-label="Select quote card">
          {activeQuotes.map((quote, index) => (
            <Chip
              key={quote.id}
              label={quote.reference}
              tone={getQuoteTone(quote)}
              selected={index === activeIndex}
              onSelect={() => selectQuote(index)}
            />
          ))}
        </div>
        <div className={shellStyles.quoteStatusRail} aria-label="Quote card workshop status">
          {cards.map((entry, index) => (
            <div
              key={entry.quote.id}
              className={shellStyles.quoteStatusItem}
              data-active={index === activeIndex ? "true" : "false"}
            >
              <Kbd size="sm">{entry.slot}</Kbd>
              <Chip label={entry.status} tone={entry.statusTone} selected={index === activeIndex} disabled />
              <Chip label={entry.bay} tone="teal" selected={index === activeIndex} disabled />
            </div>
          ))}
        </div>
        <div
          className={shellStyles.selectedQuoteBridge}
          aria-label={`${selectedQuote.reference} selected quote`}
          style={{ borderLeftColor: selectedToneContract.accentHex }}
        >
          <span className={shellStyles.selectedQuoteMark} aria-hidden="true">
            <MufflermenMonogramIcon
              size={34}
              tone={selectedToneContract.iconTone}
              motion={selectedToneContract.iconMotion}
              variant="filled"
            />
          </span>
          <div className={shellStyles.selectedQuoteCopy}>
            <span>Active 3D card mirror</span>
            <KineticText
              fontId={selectedToneContract.fontId}
              motion={selectedToneContract.kineticMotion}
              size="md"
            >
              {selectedQuote.customerName}
            </KineticText>
            <p>
              {getQuoteVehicleLabel(selectedQuote)} · {selectedQuote.vehicleEngine} · {selectedQuote.customerSuburb}
            </p>
          </div>
          <div className={shellStyles.selectedQuoteMeta}>
            <Kbd size="sm">{selectedQuote.reference}</Kbd>
            <Chip label={selectedEntry.status} tone={selectedEntry.statusTone} selected />
            <Chip label={selectedQuote.vehicleRego} tone="teal" selected />
            <Chip label={formatQuoteTotalAud(selectedQuote.totalAud)} tone={selectedTone} selected />
          </div>
        </div>
        <div className={shellStyles.selectedQuoteOpsRail} aria-label={`${selectedQuote.reference} operational mirrors`}>
          <section className={shellStyles.selectedQuoteOpsCard}>
            <div className={shellStyles.selectedQuoteOpsHead}>
              <Kbd size="sm">Canvas mirror</Kbd>
              <Chip label="3D lift" tone={selectedTone} selected disabled />
            </div>
            <strong>{selectedEntry.slot}</strong>
            <p>{selectedQuote.reference} is the lifted mesh and active quote state.</p>
            <ProgressLinear
              label="Card lift sync"
              value={selectedMirrorSync}
              tone={selectedToneContract.progressTone}
              variant="segmented"
              segments={6}
              showLabel
            />
          </section>
          <section className={shellStyles.selectedQuoteOpsCard}>
            <div className={shellStyles.selectedQuoteOpsHead}>
              <Kbd size="sm">Bay mirror</Kbd>
              <Chip label={selectedEntry.bay} tone="teal" selected disabled />
            </div>
            <strong>{selectedEntry.status}</strong>
            <p>{selectedServices.length} service chips drive the workbench decision packet.</p>
            <ProgressLinear
              label="Bay packet load"
              value={laneLoad}
              tone={selectedToneContract.progressTone}
              variant="segmented"
              segments={6}
              showLabel
            />
          </section>
          <section className={shellStyles.selectedQuoteOpsCard}>
            <div className={shellStyles.selectedQuoteOpsHead}>
              <Kbd size="sm">Primitive mirror</Kbd>
              <Chip label={selectedToneContract.kineticMotion} tone={selectedToneContract.progressTone} selected disabled />
            </div>
            <strong>{selectedToneContract.iconMotion}</strong>
            <p>Icon, kinetic text, chip tone, progress tone, and toast tone stay aligned.</p>
            <ProgressLinear
              label="Contract alignment"
              value={100}
              tone={selectedToneContract.progressTone}
              variant="segmented"
              segments={6}
              showLabel
            />
          </section>
        </div>
        <div className={shellStyles.selectedQuotePrimitiveGrid} aria-label={`${selectedQuote.reference} selected primitive mirrors`}>
          <div className={shellStyles.selectedQuoteSignal}>
            <div className={shellStyles.selectedQuoteSignalHeader}>
              <Kbd size="sm">Selected {selectedSlot}</Kbd>
              <Chip label={selectedEntry.bay} tone="teal" selected disabled />
            </div>
            <ProgressLinear
              label={`${selectedQuote.reference} quote share`}
              value={selectedQuoteShare}
              tone={selectedToneContract.progressTone}
              variant="segmented"
              segments={8}
              showLabel
            />
          </div>
          <StatTile
            label="Selected quote"
            value={selectedEntry.total}
            tone={selectedTone}
            caption={`${selectedQuote.services.length} service chips · ${selectedEntry.status}`}
            sparkline={selectedSparkline}
            className={shellStyles.selectedQuoteStat}
          />
          <div className={shellStyles.selectedQuoteSignal}>
            <div className={shellStyles.selectedQuoteSignalHeader}>
              <KineticText
                fontId={selectedToneContract.fontId}
                motion={selectedToneContract.kineticMotion}
                size="sm"
              >
                Primitive state follows card lift
              </KineticText>
              <Chip label={selectedToneContract.kineticMotion} tone={selectedToneContract.progressTone} selected />
            </div>
            <div className={shellStyles.selectedQuoteContractLine}>
              <Kbd size="sm">{selectedToneContract.iconMotion}</Kbd>
              <Chip label={selectedEntry.status} tone={selectedEntry.statusTone} selected />
              <Kbd size="sm">{selectedToneContract.fontId}</Kbd>
            </div>
          </div>
        </div>
        <div className={shellStyles.summaryGrid}>
          <div className={shellStyles.readinessMeter}>
            <ProgressRadial
              label="Decision readiness"
              value={readiness}
              tone="green"
              size="md"
              showLabel
            />
            <span>
              <strong>Decision readiness</strong>
              <em>{selectedQuote.reference} packet quality</em>
            </span>
          </div>
          <div className={shellStyles.statRail}>
            <StatTile
              label="Pipeline"
              value={formatQuoteTotalAud(totalAud)}
              tone="green"
              caption={`${activeQuotes.length} quote cards in stack`}
              sparkline={quoteSparkline}
              className={shellStyles.dockStat}
            />
            <StatTile
              label="Average"
              value={formatQuoteTotalAud(averageAud)}
              tone="teal"
              caption={`${serviceCount} mapped service chips`}
              sparkline={quoteSparkline.slice().reverse()}
              className={shellStyles.dockStat}
            />
            <StatTile
              label="Variance"
              value={selectedQuoteDelta}
              tone={quoteVariance >= 0 ? "amber" : "green"}
              caption={`${selectedQuote.reference} vs stack average`}
              delta={{
                value: selectedQuoteDelta,
                direction: quoteVariance >= 0 ? "up" : "down",
                helpText: "Selected quote against average",
              }}
              sparkline={selectedSparkline}
              className={shellStyles.dockStat}
            />
          </div>
        </div>
        <div className={shellStyles.chipRail}>
          <Chip label={`Card ${activeIndex + 1}/${activeQuotes.length}`} tone={selectedTone} selected />
          <Chip label={`${activeQuotes.length} quotes`} tone="amber" selected />
          <Chip label={formatQuoteTotalAud(totalAud)} tone="green" selected />
          <Chip label={selectedQuote.vehicleRego} tone="teal" selected />
        </div>
        <ProgressLinear
          label="Decision packet"
          value={readiness}
          tone="green"
          variant="segmented"
          segments={10}
          showLabel
        />
        <div className={shellStyles.serviceContractRail} aria-label={`${selectedQuote.reference} service primitive contracts`}>
          {selectedQuote.services.map((service, serviceIndex) => {
            const serviceTone = service.tone ?? "neutral"
            const serviceContract = getPrimitiveToneContract(serviceTone)
            const ServiceIcon = SERVICE_ICON_BY_TONE[serviceTone]

            return (
              <article
                key={service.label}
                className={shellStyles.serviceContractCard}
                style={{ borderLeftColor: serviceContract.accentHex }}
              >
                <span className={shellStyles.serviceContractMark} aria-hidden="true">
                  <ServiceIcon
                    size={28}
                    tone={serviceContract.iconTone}
                    motion={serviceContract.iconMotion}
                    variant="filled"
                  />
                </span>
                <div className={shellStyles.serviceContractCopy}>
                  <span>Service contract</span>
                  <KineticText
                    fontId={serviceContract.fontId}
                    motion={serviceContract.kineticMotion}
                    size="sm"
                  >
                    {service.label}
                  </KineticText>
                  <span>
                    <Kbd size="sm">{serviceContract.iconMotion}</Kbd>
                    <Chip label={serviceContract.kineticMotion} tone={serviceContract.progressTone} selected />
                  </span>
                </div>
                <ProgressLinear
                  label={`${service.label} primitive influence`}
                  value={Math.max(56, readiness - serviceIndex * 12)}
                  tone={serviceContract.progressTone}
                  variant="segmented"
                  segments={6}
                  showLabel
                />
              </article>
            )
          })}
        </div>
        <Toast
          key={selectionToast?.id}
          open={selectionToast !== null}
          tone={getPrimitiveToneContract(selectionToast ? getQuoteTone(selectionToast) : "neutral").toastTone}
          title={selectionToast ? `${selectionToast.reference} selected` : selectedQuote.reference}
          description={
            selectionToast
              ? `${getQuoteWorkshopStatus(selectionToast, getQuoteTone(selectionToast)).status} · ${selectionToast.vehicleRego} · ${formatQuoteTotalAud(selectionToast.totalAud)} · ${getQuoteVehicleLabel(selectionToast)}`
              : undefined
          }
          duration={2600}
          onDismiss={() => setSelectionToast(null)}
          className={shellStyles.dockToast}
        />
      </div>
    </figure>
  )
}

export default InteractiveCardStack
