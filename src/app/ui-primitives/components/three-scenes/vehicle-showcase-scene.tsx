"use client"

import { useMemo, useRef, type CSSProperties } from "react"
import { useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export type VehiclePrimitiveVariant =
  | "workshop-showcase"
  | "exhaust-hero"
  | "performance-promo"
  | "parts-product"
  | "social-preview"
  | "website-hero-video"
  | "dashboard-status"

export interface VehiclePrimitiveSceneProps {
  variant?: VehiclePrimitiveVariant
  ariaLabel?: string
}

export interface VehicleShowcaseSceneProps {
  ariaLabel?: string
}

interface VehicleVariantConfig {
  label: string
  ariaLabel: string
  bodyColor: string
  roofColor: string
  accentColor: string
  rimColor: string
  glassColor: string
  background: string
  poster: string
  videoAsset?: string
  camera: [number, number, number]
  tagTone: "red" | "teal" | "amber"
  speed: number
  features: {
    exhaust?: boolean
    parts?: boolean
    socialFrame?: boolean
    heroRig?: boolean
    dashboardScan?: boolean
  }
}

const VEHICLE_VARIANTS: Record<VehiclePrimitiveVariant, VehicleVariantConfig> = {
  "workshop-showcase": {
    label: "Workshop showcase",
    ariaLabel: "Realistic animated workshop vehicle showcase with reflective paint and premium lighting",
    bodyColor: "#151820",
    roofColor: "#0a0d12",
    accentColor: "#e62028",
    rimColor: "#cfd6dd",
    glassColor: "#86cfff",
    background: "#06080b",
    poster: "/media/generated/replicate/replicate-workshop-showcase.webp",
    camera: [4.3, 2.2, 4.7],
    tagTone: "red",
    speed: 0.22,
    features: { exhaust: true },
  },
  "exhaust-hero": {
    label: "Exhaust service hero",
    ariaLabel: "Animated vehicle service hero with highlighted exhaust system and workshop lighting",
    bodyColor: "#20242c",
    roofColor: "#11151b",
    accentColor: "#ffbf4d",
    rimColor: "#d8d0bd",
    glassColor: "#b7e5ff",
    background: "#080806",
    poster: "/media/generated/replicate/replicate-exhaust-service.webp",
    camera: [4.0, 1.9, 4.2],
    tagTone: "amber",
    speed: 0.16,
    features: { exhaust: true, heroRig: true },
  },
  "performance-promo": {
    label: "Performance promo",
    ariaLabel: "Performance car promo scene with animated stance, racing lights, and reflective floor",
    bodyColor: "#0b1018",
    roofColor: "#030509",
    accentColor: "#40bcff",
    rimColor: "#f4f7fa",
    glassColor: "#72c7ff",
    background: "#05070a",
    poster: "/media/generated/replicate/replicate-performance-promo.webp",
    camera: [4.6, 1.75, 3.8],
    tagTone: "teal",
    speed: 0.28,
    features: { exhaust: true, heroRig: true },
  },
  "parts-product": {
    label: "Parts product scene",
    ariaLabel: "Vehicle product scene with animated exhaust and parts primitives arranged around the car",
    bodyColor: "#182024",
    roofColor: "#101316",
    accentColor: "#e62028",
    rimColor: "#d6dde3",
    glassColor: "#9fdcff",
    background: "#070909",
    poster: "/media/generated/replicate/replicate-parts-product.webp",
    camera: [4.5, 2.4, 5.0],
    tagTone: "red",
    speed: 0.18,
    features: { exhaust: true, parts: true },
  },
  "social-preview": {
    label: "Social media preview",
    ariaLabel: "Square-safe vehicle preview with animated safe-area frame and reflective vehicle motion",
    bodyColor: "#11161f",
    roofColor: "#080b11",
    accentColor: "#ff4f5a",
    rimColor: "#eef3f6",
    glassColor: "#8fd3ff",
    background: "#050609",
    poster: "/media/generated/replicate/replicate-social-preview.webp",
    camera: [3.8, 1.9, 4.4],
    tagTone: "red",
    speed: 0.14,
    features: { socialFrame: true },
  },
  "website-hero-video": {
    label: "Website hero video primitive",
    ariaLabel: "Website hero vehicle scene with local video fallback poster and cinematic motion lighting",
    bodyColor: "#14191f",
    roofColor: "#080a0d",
    accentColor: "#ffc14f",
    rimColor: "#f2f2e8",
    glassColor: "#b2dfff",
    background: "#070706",
    poster: "/media/generated/replicate/replicate-website-hero-poster.webp",
    videoAsset: "/media/generated/replicate/replicate-website-hero-loop.mp4",
    camera: [4.4, 1.8, 4.1],
    tagTone: "amber",
    speed: 0.2,
    features: { heroRig: true, exhaust: true },
  },
  "dashboard-status": {
    label: "Dashboard status animation",
    ariaLabel: "Dashboard vehicle status animation with scanning lights and stable reduced-motion support",
    bodyColor: "#172126",
    roofColor: "#081013",
    accentColor: "#37d67a",
    rimColor: "#dce7e8",
    glassColor: "#87fff0",
    background: "#030607",
    poster: "/media/generated/replicate/replicate-dashboard-status.webp",
    camera: [4.2, 2.15, 4.8],
    tagTone: "teal",
    speed: 0.12,
    features: { dashboardScan: true },
  },
}

function useVehicleShape() {
  return useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1.85, 0.18)
    shape.lineTo(-1.68, 0.52)
    shape.quadraticCurveTo(-1.28, 0.8, -0.64, 0.86)
    shape.lineTo(0.72, 0.86)
    shape.quadraticCurveTo(1.32, 0.78, 1.72, 0.48)
    shape.lineTo(1.88, 0.18)
    shape.lineTo(1.34, 0.1)
    shape.quadraticCurveTo(1.04, 0.5, 0.68, 0.13)
    shape.lineTo(-0.72, 0.13)
    shape.quadraticCurveTo(-1.08, 0.5, -1.38, 0.1)
    shape.lineTo(-1.85, 0.18)
    return shape
  }, [])
}

function useCabinShape() {
  return useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.74, 0.82)
    shape.lineTo(-0.38, 1.3)
    shape.quadraticCurveTo(0.22, 1.45, 0.78, 1.18)
    shape.lineTo(1.0, 0.82)
    shape.lineTo(-0.74, 0.82)
    return shape
  }, [])
}

function Wheel({
  position,
  accentColor,
  rimColor,
  reduced,
}: {
  position: [number, number, number]
  accentColor: string
  rimColor: string
  reduced: boolean
}) {
  const wheelRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (reduced || !wheelRef.current) return
    wheelRef.current.rotation.z -= delta * 2.7
  })

  return (
    <group ref={wheelRef} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.37, 0.37, 0.24, 48]} />
        <meshStandardMaterial color="#08090c" roughness={0.72} metalness={0.08} />
      </mesh>
      <mesh castShadow>
        <torusGeometry args={[0.23, 0.035, 10, 40]} />
        <meshStandardMaterial color={rimColor} roughness={0.2} metalness={0.86} />
      </mesh>
      {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rotation) => (
        <mesh key={rotation} rotation={[0, 0, rotation]} castShadow>
          <boxGeometry args={[0.42, 0.035, 0.035]} />
          <meshStandardMaterial color={rimColor} roughness={0.24} metalness={0.78} />
        </mesh>
      ))}
      <mesh>
        <circleGeometry args={[0.08, 24]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.24} />
      </mesh>
    </group>
  )
}

function ExhaustSystem({ accentColor }: { accentColor: string }) {
  return (
    <group position={[-0.35, 0.24, -0.72]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.7, 24]} />
        <meshStandardMaterial color="#b9c3c9" roughness={0.18} metalness={0.92} />
      </mesh>
      <mesh position={[-0.96, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.42, 32]} />
        <meshStandardMaterial color="#ccd4d8" roughness={0.16} metalness={0.94} />
      </mesh>
      <mesh position={[-1.28, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.26, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.24} metalness={0.7} roughness={0.22} />
      </mesh>
    </group>
  )
}

function FloatingParts({ reduced, accentColor }: { reduced: boolean; accentColor: string }) {
  const partsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (reduced || !partsRef.current) return
    partsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.12
  })

  return (
    <group ref={partsRef}>
      <mesh position={[2.15, 0.72, -0.75]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.28, 0.055, 16, 48]} />
        <meshStandardMaterial color="#d9dee1" roughness={0.16} metalness={0.88} />
      </mesh>
      <mesh position={[2.0, 1.22, 0.58]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 32]} />
        <meshStandardMaterial color="#c7d0d5" roughness={0.18} metalness={0.9} />
      </mesh>
      <mesh position={[-2.02, 1.04, 0.72]} rotation={[0.18, 0.35, 0.1]} castShadow>
        <boxGeometry args={[0.62, 0.16, 0.3]} />
        <meshStandardMaterial color={accentColor} roughness={0.26} metalness={0.56} />
      </mesh>
    </group>
  )
}

function SocialFrame({ accentColor, reduced }: { accentColor: string; reduced: boolean }) {
  const frameRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (reduced || !frameRef.current) return
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.015
    frameRef.current.scale.setScalar(pulse)
  })

  return (
    <group ref={frameRef} position={[0, 0.88, -1.2]}>
      <mesh>
        <boxGeometry args={[3.4, 2.1, 0.018]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[1.25, 1.28, 4]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.42} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function HeroRig({ accentColor, reduced }: { accentColor: string; reduced: boolean }) {
  const rigRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (reduced || !rigRef.current) return
    rigRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.16
  })

  return (
    <group ref={rigRef}>
      <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.45, 2.5, 96]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 1.9, -1.75]} rotation={[0.28, 0, 0]}>
        <planeGeometry args={[3.2, 0.08]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.44} />
      </mesh>
    </group>
  )
}

function DashboardScan({ accentColor, reduced }: { accentColor: string; reduced: boolean }) {
  const scanRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (reduced || !scanRef.current) return
    scanRef.current.position.x = Math.sin(state.clock.elapsedTime * 1.1) * 0.85
  })

  return (
    <group>
      <group ref={scanRef} position={[0, 0.88, 0]}>
        <mesh>
          <boxGeometry args={[0.035, 1.2, 1.8]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.34} />
        </mesh>
      </group>
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[-2.15, 0.52 + index * 0.18, -0.95]}>
          <boxGeometry args={[0.82 - index * 0.12, 0.035, 0.025]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.58 - index * 0.1} />
        </mesh>
      ))}
    </group>
  )
}

function DetailedVehicle({
  config,
  reduced,
}: {
  config: VehicleVariantConfig
  reduced: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const bodyShape = useVehicleShape()
  const cabinShape = useCabinShape()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    if (reduced) {
      groupRef.current.rotation.y = -0.38
      groupRef.current.position.y = 0
      return
    }
    groupRef.current.rotation.y += delta * config.speed
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.25) * 0.015
  })

  return (
    <group ref={groupRef} rotation={[0, -0.32, 0]}>
      <mesh position={[0, 0, -0.64]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, { depth: 1.28, bevelEnabled: true, bevelSize: 0.045, bevelThickness: 0.04, bevelSegments: 6 }]} />
        <meshStandardMaterial color={config.bodyColor} roughness={0.32} metalness={0.76} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0.02, 0.02, -0.56]} castShadow>
        <extrudeGeometry args={[cabinShape, { depth: 1.12, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.025, bevelSegments: 5 }]} />
        <meshPhysicalMaterial color={config.glassColor} roughness={0.08} metalness={0.15} transmission={0.15} transparent opacity={0.58} envMapIntensity={1.6} />
      </mesh>
      <mesh position={[0.05, 0.9, 0.655]} rotation={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[2.15, 0.045, 0.04]} />
        <meshStandardMaterial color={config.accentColor} emissive={config.accentColor} emissiveIntensity={0.16} metalness={0.6} roughness={0.28} />
      </mesh>
      <mesh position={[0.05, 0.9, -0.655]} rotation={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[2.15, 0.045, 0.04]} />
        <meshStandardMaterial color={config.accentColor} emissive={config.accentColor} emissiveIntensity={0.16} metalness={0.6} roughness={0.28} />
      </mesh>
      <mesh position={[1.72, 0.42, 0]}>
        <boxGeometry args={[0.05, 0.18, 0.72]} />
        <meshStandardMaterial color="#fff4cc" emissive="#fff0b8" emissiveIntensity={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[-1.73, 0.42, 0]}>
        <boxGeometry args={[0.05, 0.16, 0.72]} />
        <meshStandardMaterial color={config.accentColor} emissive={config.accentColor} emissiveIntensity={0.85} roughness={0.26} />
      </mesh>
      {[-1.14, 1.02].map((x) =>
        [-0.68, 0.68].map((z) => (
          <group key={`${x}-${z}`} position={[x, 0.28, z]}>
            <mesh position={[0, 0, z > 0 ? 0.032 : -0.032]}>
              <torusGeometry args={[0.43, 0.035, 12, 48]} />
              <meshStandardMaterial color={config.bodyColor} roughness={0.28} metalness={0.7} />
            </mesh>
            <Wheel position={[0, 0, 0]} accentColor={config.accentColor} rimColor={config.rimColor} reduced={reduced} />
          </group>
        )),
      )}
      {config.features.exhaust ? <ExhaustSystem accentColor={config.accentColor} /> : null}
    </group>
  )
}

function SceneExtras({
  config,
  reduced,
}: {
  config: VehicleVariantConfig
  reduced: boolean
}) {
  return (
    <>
      {config.features.parts ? <FloatingParts accentColor={config.accentColor} reduced={reduced} /> : null}
      {config.features.socialFrame ? <SocialFrame accentColor={config.accentColor} reduced={reduced} /> : null}
      {config.features.heroRig ? <HeroRig accentColor={config.accentColor} reduced={reduced} /> : null}
      {config.features.dashboardScan ? <DashboardScan accentColor={config.accentColor} reduced={reduced} /> : null}
    </>
  )
}

export function VehiclePrimitiveScene({
  variant = "workshop-showcase",
  ariaLabel,
}: VehiclePrimitiveSceneProps = {}) {
  const reduced = useReducedMotion3D()
  const config = VEHICLE_VARIANTS[variant]
  const canvasStyle = {
    "--scene-poster": `url(${config.poster})`,
  } as CSSProperties

  return (
    <figure className={shellStyles.shell}>
      <figcaption>{ariaLabel ?? config.ariaLabel}</figcaption>
      <div className={shellStyles.canvasWrap} style={canvasStyle}>
        {config.videoAsset && !reduced ? (
          <video
            className={shellStyles.mediaFallback}
            src={config.videoAsset}
            poster={config.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}
        <SceneCanvas
          fallbackVariant="vehicle"
          fallbackCopy={`${config.label} poster is shown while WebGL loads or recovers.`}
          shadows
          dpr={[1, 1.75]}
          camera={{ position: config.camera, fov: 38 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          role="img"
          aria-label={ariaLabel ?? config.ariaLabel}
        >
          <color attach="background" args={[config.background]} />
          <fog attach="fog" args={[config.background, 7.5, 13]} />
          <hemisphereLight args={["#d9f1ff", "#111111", 0.55]} />
          <ambientLight intensity={0.18} />
          <spotLight
            position={[3.4, 5.2, 3.6]}
            angle={0.36}
            penumbra={0.55}
            intensity={4.8}
            color="#ffffff"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3.0, 1.7, -2.4]} intensity={1.6} color={config.accentColor} />
          <pointLight position={[2.7, 1.1, 2.2]} intensity={0.8} color="#ffffff" />
          <Environment preset="city" />
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[9, 7]} />
            <meshStandardMaterial color="#0c0e10" roughness={0.22} metalness={0.34} envMapIntensity={0.7} />
          </mesh>
          <DetailedVehicle config={config} reduced={reduced} />
          <SceneExtras config={config} reduced={reduced} />
          <ContactShadows position={[0, 0.015, 0]} opacity={0.62} scale={8.8} blur={2.4} far={2.8} />
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={3.8}
            maxDistance={7.2}
            minPolarAngle={Math.PI / 4.2}
            maxPolarAngle={Math.PI / 2.12}
            target={[0, 0.62, 0]}
            makeDefault
          />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag} data-tone={config.tagTone}>
            {config.label}
          </span>
        </div>
      </div>
    </figure>
  )
}

export function VehicleShowcaseScene({ ariaLabel }: VehicleShowcaseSceneProps = {}) {
  return <VehiclePrimitiveScene variant="workshop-showcase" ariaLabel={ariaLabel} />
}

export default VehicleShowcaseScene
