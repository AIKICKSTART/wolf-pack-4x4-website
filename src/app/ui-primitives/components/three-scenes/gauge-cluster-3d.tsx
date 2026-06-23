"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, Text } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface GaugeCluster3DProps {
  ariaLabel?: string
}

interface GaugeConfig {
  label: string
  unit: string
  baseAngle: number
  amplitude: number
  speed: number
  color: string
}

const GAUGES: ReadonlyArray<GaugeConfig> = [
  { label: "RPM", unit: "× 1000", baseAngle: -0.5, amplitude: 1.6, speed: 1.2, color: "#e62028" },
  { label: "BOOST", unit: "PSI", baseAngle: -0.2, amplitude: 1.1, speed: 0.7, color: "#ffc14f" },
  { label: "EGT", unit: "°C", baseAngle: -0.1, amplitude: 0.8, speed: 0.5, color: "#40bcff" },
]

interface GaugeProps {
  config: GaugeConfig
  position: [number, number, number]
  reduced: boolean
  index: number
}

function Gauge({ config, position, reduced, index }: GaugeProps) {
  const needleRef = useRef<THREE.Mesh>(null)
  const baseAngle = config.baseAngle

  useFrame((state) => {
    if (!needleRef.current) return
    if (reduced) {
      needleRef.current.rotation.z = baseAngle
      return
    }
    const t = state.clock.elapsedTime
    const offset = Math.sin(t * config.speed + index) * 0.5 + 0.5
    needleRef.current.rotation.z = baseAngle + offset * config.amplitude
  })

  return (
    <group position={position}>
      <mesh>
        <ringGeometry args={[0.7, 0.74, 64]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[0.7, 48]} />
        <meshStandardMaterial color={"#0a0a0d"} roughness={0.95} />
      </mesh>

      {Array.from({ length: 13 }).map((_, i) => {
        const angle = (-Math.PI * 1.25) + (i / 12) * (Math.PI * 1.5)
        const inner = i % 2 === 0 ? 0.5 : 0.58
        const outer = 0.65
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0, (inner + outer) / 2, 0.01]}>
              <boxGeometry args={[0.015, outer - inner, 0.01]} />
              <meshBasicMaterial color={"#c7c9d0"} />
            </mesh>
          </group>
        )
      })}

      <mesh ref={needleRef} position={[0, 0, 0.04]}>
        <boxGeometry args={[0.55, 0.04, 0.02]} />
        <meshStandardMaterial color={config.color} emissive={config.color} emissiveIntensity={0.8} />
      </mesh>

      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.07, 0.07, 0.03, 24]} />
        <meshStandardMaterial color={"#1b1c25"} metalness={0.6} roughness={0.3} />
      </mesh>

      <Text
        position={[0, -0.5, 0.05]}
        fontSize={0.13}
        color={config.color}
        anchorX="center"
        anchorY="middle"
        fontWeight={800}
      >
        {config.label}
      </Text>
      <Text
        position={[0, -0.7, 0.05]}
        fontSize={0.08}
        color={"#868b98"}
        anchorX="center"
        anchorY="middle"
      >
        {config.unit}
      </Text>
    </group>
  )
}

function Cluster({ reduced }: { reduced: boolean }) {
  return (
    <group>
      {GAUGES.map((gauge, index) => {
        const x = (index - 1) * 1.7
        return (
          <Gauge
            key={gauge.label}
            config={gauge}
            position={[x, 0, 0]}
            reduced={reduced}
            index={index}
          />
        )
      })}
    </group>
  )
}

/**
 * Three radial gauges (RPM, boost, EGT) arranged horizontally. Each needle
 * is animated by a sinusoid offset to give a sense of live data without
 * needing real telemetry. Reduced motion locks each needle at its base
 * angle.
 */
export function GaugeCluster3D({
  ariaLabel = "3D gauge cluster with RPM, boost, and EGT needles",
}: GaugeCluster3DProps = {}) {
  const reduced = useReducedMotion3D()

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        Three radial 3D gauges arranged side by side, with needles that sweep across each dial to
        simulate live RPM, boost pressure, and exhaust gas temperature readings.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="gauges"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3.4], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={["#050508"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 3, 4]} intensity={0.7} />
          <Environment preset="night" />
          <Cluster reduced={reduced} />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag} data-tone="red">
            Live telemetry · sim
          </span>
        </div>
      </div>
    </figure>
  )
}

export default GaugeCluster3D
