"use client"

import { useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface ExhaustPipeViewerProps {
  /** Accessible caption for the underlying canvas. */
  ariaLabel?: string
}

const HEADER_COLOR = "#d8d8de"
const MUFFLER_COLOR = "#1b1c25"
const TIP_COLOR = "#c0c0c8"
const HOVER_GLOW = "#ffc14f"

/**
 * Curve from header → muffler → tip used by the tube geometry.
 * Returned as a memoized Catmull-Rom curve.
 */
function useExhaustCurve(): THREE.CatmullRomCurve3 {
  return useMemo(() => {
    const points: ReadonlyArray<THREE.Vector3> = [
      new THREE.Vector3(-2.4, 0.6, 0),
      new THREE.Vector3(-1.6, 0.2, 0.3),
      new THREE.Vector3(-0.8, -0.1, 0.0),
      new THREE.Vector3(0.0, -0.2, -0.2),
      new THREE.Vector3(0.9, -0.1, 0.0),
      new THREE.Vector3(1.8, 0.1, 0.2),
      new THREE.Vector3(2.4, 0.4, 0.0),
    ]
    return new THREE.CatmullRomCurve3([...points], false, "catmullrom", 0.4)
  }, [])
}

interface HeaderPipeProps {
  curve: THREE.CatmullRomCurve3
  hovered: boolean
  reduced: boolean
}

function HeaderPipe({ curve, hovered, reduced }: HeaderPipeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (reduced || !meshRef.current) return
    const target = hovered ? 1.08 : 1.0
    const next = THREE.MathUtils.lerp(meshRef.current.scale.x, target, delta * 4)
    meshRef.current.scale.set(next, next, next)
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <tubeGeometry args={[curve, 96, 0.12, 18, false]} />
      <meshStandardMaterial
        color={HEADER_COLOR}
        metalness={0.92}
        roughness={0.24}
        emissive={hovered ? HOVER_GLOW : "#000000"}
        emissiveIntensity={hovered ? 0.18 : 0}
      />
    </mesh>
  )
}

function MufflerCan() {
  return (
    <mesh position={[0, -0.2, -0.2]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
      <cylinderGeometry args={[0.32, 0.32, 1.5, 32]} />
      <meshStandardMaterial color={MUFFLER_COLOR} metalness={0.7} roughness={0.45} />
    </mesh>
  )
}

function ExhaustTip() {
  return (
    <group position={[2.4, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.36, 24]} />
        <meshStandardMaterial color={TIP_COLOR} metalness={0.96} roughness={0.16} />
      </mesh>
    </group>
  )
}

interface HoverLabelProps {
  visible: boolean
}

function HoverLabel({ visible }: HoverLabelProps) {
  if (!visible) return null
  return (
    <Html position={[0, 0.8, 0]} center distanceFactor={6} pointerEvents="none">
      <div
        style={{
          padding: "6px 10px",
          borderRadius: 6,
          background:
            "color-mix(in oklab, var(--primitive-canvas) 78%, transparent)",
          border:
            "1px solid color-mix(in oklab, var(--primitive-amber) 45%, transparent)",
          color: "var(--primitive-amber)",
          fontFamily: "var(--primitive-font-mono, monospace)",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Cat-back assembly · 3″
      </div>
    </Html>
  )
}

interface AssemblyProps {
  reduced: boolean
}

function ExhaustAssembly({ reduced }: AssemblyProps) {
  const [hovered, setHovered] = useState<boolean>(false)
  const curve = useExhaustCurve()

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <HeaderPipe curve={curve} hovered={hovered} reduced={reduced} />
      <MufflerCan />
      <ExhaustTip />
      <HoverLabel visible={hovered} />
    </group>
  )
}

/**
 * Interactive 3D exhaust pipe viewer. Procedural assembly (header → muffler
 * → tip) along a Catmull-Rom curve. Orbit-controlled, with a subtle pulse
 * and label on hover. Reduced-motion users get a static pose.
 */
export function ExhaustPipeViewer({
  ariaLabel = "Interactive 3D exhaust pipe viewer — drag to rotate",
}: ExhaustPipeViewerProps = {}) {
  const reduced = useReducedMotion3D()

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        Three-dimensional procedural exhaust assembly showing a curved tube from header to muffler
        to chrome tip. Drag inside the canvas to orbit the model.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="exhaust-pipe"
          shadows
          dpr={[1, 2]}
          camera={{ position: [3.6, 2.2, 4.6], fov: 36 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={["#050508"]} />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Environment preset="city" />
          <ExhaustAssembly reduced={reduced} />
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={0.55}
            scale={8}
            blur={2.4}
            far={2}
          />
          <OrbitControls
            enablePan={false}
            minDistance={3.2}
            maxDistance={8}
            autoRotate={!reduced}
            autoRotateSpeed={0.6}
            target={[0, -0.05, 0]}
          />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag}>Drag to orbit</span>
          <span className={shellStyles.tag} data-tone="teal">
            Hover for callout
          </span>
        </div>
      </div>
    </figure>
  )
}

export default ExhaustPipeViewer
