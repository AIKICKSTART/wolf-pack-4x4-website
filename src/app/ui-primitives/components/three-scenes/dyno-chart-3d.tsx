"use client"

import { useMemo } from "react"
import { Environment, OrbitControls, Text } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface DynoChart3DProps {
  /** Number of samples along the curve. */
  samples?: number
  ariaLabel?: string
}

const AXIS_X_LENGTH = 4.5
const AXIS_Y_LENGTH = 3.0
const AXIS_Z_LENGTH = 3.0
const AXIS_COLOR = "#7f8794"
const SCENE_BACKGROUND = "#050508"

/**
 * Parametric curve mapping RPM (x), torque (y) and boost (z).
 * Boost ramps in around 2200rpm, torque peaks ~4400rpm, drops past peak.
 */
function torqueAt(rpmNorm: number): number {
  const peak = 0.66
  const k = 14
  return Math.exp(-k * (rpmNorm - peak) * (rpmNorm - peak)) * 0.96
}

function boostAt(rpmNorm: number): number {
  if (rpmNorm < 0.32) {
    return rpmNorm * 0.18
  }
  return Math.min(1, 0.18 + (rpmNorm - 0.32) * 1.3)
}

function useDynoCurve(samples: number): THREE.CatmullRomCurve3 {
  return useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= samples; i += 1) {
      const t = i / samples
      const x = t * AXIS_X_LENGTH
      const y = torqueAt(t) * AXIS_Y_LENGTH
      const z = boostAt(t) * AXIS_Z_LENGTH
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5)
  }, [samples])
}

interface AxisLineProps {
  start: [number, number, number]
  end: [number, number, number]
}

function AxisLine({ start, end }: AxisLineProps) {
  const points = useMemo<THREE.Vector3[]>(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end],
  )
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: AXIS_COLOR, transparent: true, opacity: 0.7 }),
    [],
  )
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material])

  return <primitive object={line} />
}

interface CurveTubeProps {
  curve: THREE.CatmullRomCurve3
}

function CurveTube({ curve }: CurveTubeProps) {
  return (
    <mesh>
      <tubeGeometry args={[curve, 240, 0.06, 12, false]} />
      <meshStandardMaterial
        color={"#e62028"}
        emissive={"#e62028"}
        emissiveIntensity={0.5}
        roughness={0.4}
        metalness={0.4}
      />
    </mesh>
  )
}

function GridFloor() {
  return (
    <gridHelper
      args={[AXIS_X_LENGTH * 1.4, 12, "#303744", "#171c24"]}
      position={[AXIS_X_LENGTH / 2, 0, AXIS_Z_LENGTH / 2]}
    />
  )
}

function AxisLabels() {
  return (
    <>
      <Text
        position={[AXIS_X_LENGTH + 0.4, 0, 0]}
        fontSize={0.22}
        color={"#ffc14f"}
        anchorX="left"
        anchorY="middle"
      >
        RPM →
      </Text>
      <Text
        position={[0, AXIS_Y_LENGTH + 0.3, 0]}
        fontSize={0.22}
        color={"#40bcff"}
        anchorX="center"
        anchorY="bottom"
      >
        TORQUE ↑
      </Text>
      <Text
        position={[0, 0, AXIS_Z_LENGTH + 0.4]}
        fontSize={0.22}
        color={"#37d67a"}
        anchorX="left"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        BOOST →
      </Text>
    </>
  )
}

/**
 * 3D dyno chart. Plots an RPM × torque × boost curve as a thick tube along a
 * Catmull-Rom curve. Axes are labelled with drei `<Text>`. Orbit-controlled
 * exploration; auto-rotate disabled under reduced motion.
 */
export function DynoChart3D({
  samples = 64,
  ariaLabel = "Three-dimensional dyno chart plotting RPM, torque, and boost",
}: DynoChart3DProps = {}) {
  const reduced = useReducedMotion3D()
  const curve = useDynoCurve(samples)

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        Three-dimensional dyno chart with RPM on the x-axis, torque on the y-axis, and boost on the
        z-axis. The red tube shows how torque and boost evolve as RPM climbs.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="dyno"
          dpr={[1, 2]}
          camera={{ position: [6, 4.4, 7], fov: 38 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={[SCENE_BACKGROUND]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 6, 4]} intensity={0.7} />
          <Environment preset="night" />
          <group position={[-AXIS_X_LENGTH / 2, -AXIS_Y_LENGTH / 4, -AXIS_Z_LENGTH / 2]}>
            <GridFloor />
            <AxisLine start={[0, 0, 0]} end={[AXIS_X_LENGTH, 0, 0]} />
            <AxisLine start={[0, 0, 0]} end={[0, AXIS_Y_LENGTH, 0]} />
            <AxisLine start={[0, 0, 0]} end={[0, 0, AXIS_Z_LENGTH]} />
            <CurveTube curve={curve} />
            <AxisLabels />
          </group>
          <OrbitControls
            enablePan={false}
            autoRotate={!reduced}
            autoRotateSpeed={0.4}
            minDistance={6}
            maxDistance={14}
          />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag}>RPM × Torque × Boost</span>
        </div>
      </div>
    </figure>
  )
}

export default DynoChart3D
