"use client"

import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface WelderSparkParticlesProps {
  /** Number of simultaneous sparks. */
  count?: number
  ariaLabel?: string
}

const GRAVITY = -3.4
const LIFETIME_MIN = 0.5
const LIFETIME_MAX = 1.6
const SPAWN_RADIUS = 0.08

const COLOR_HOT = new THREE.Color("#fff2c0")
const COLOR_AMBER = new THREE.Color("#ffc14f")
const COLOR_RED = new THREE.Color("#e62028")
const SHARED_TEMP_COLOR = new THREE.Color()

interface SparkBuffers {
  velocities: Float32Array
  ages: Float32Array
  lifetimes: Float32Array
}

function seedSparkAttribute(positions: Float32Array, colors: Float32Array, buffers: SparkBuffers, count: number): void {
  for (let i = 0; i < count; i += 1) {
    buffers.ages[i] = Math.random() * LIFETIME_MAX
    buffers.lifetimes[i] = LIFETIME_MIN + Math.random() * (LIFETIME_MAX - LIFETIME_MIN)
    positions[i * 3] = (Math.random() - 0.5) * SPAWN_RADIUS
    positions[i * 3 + 1] = -1.5 + (Math.random() - 0.5) * 0.04
    positions[i * 3 + 2] = (Math.random() - 0.5) * SPAWN_RADIUS
    const angle = Math.random() * Math.PI * 2
    const speed = 1.2 + Math.random() * 1.8
    buffers.velocities[i * 3] = Math.cos(angle) * (0.3 + Math.random() * 0.4)
    buffers.velocities[i * 3 + 1] = speed
    buffers.velocities[i * 3 + 2] = Math.sin(angle) * (0.3 + Math.random() * 0.4)
    colors[i * 3] = COLOR_HOT.r
    colors[i * 3 + 1] = COLOR_HOT.g
    colors[i * 3 + 2] = COLOR_HOT.b
  }
}

interface SparkFieldProps {
  count: number
  reduced: boolean
}

function SparkField({ count, reduced }: SparkFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const buffersRef = useRef<SparkBuffers | null>(null)

  useEffect(() => {
    if (!pointsRef.current) return
    const buffers: SparkBuffers = {
      velocities: new Float32Array(count * 3),
      ages: new Float32Array(count),
      lifetimes: new Float32Array(count),
    }
    const geom = pointsRef.current.geometry
    const positions = (geom.getAttribute("position") as THREE.BufferAttribute).array as Float32Array
    const colors = (geom.getAttribute("color") as THREE.BufferAttribute).array as Float32Array
    seedSparkAttribute(positions, colors, buffers, count)
    geom.getAttribute("position").needsUpdate = true
    geom.getAttribute("color").needsUpdate = true
    buffersRef.current = buffers
  }, [count])

  useFrame((_, deltaRaw) => {
    if (reduced || !pointsRef.current || !buffersRef.current) return
    const delta = Math.min(deltaRaw, 1 / 30)
    const { velocities, ages, lifetimes } = buffersRef.current
    const geom = pointsRef.current.geometry
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute
    const colAttr = geom.getAttribute("color") as THREE.BufferAttribute
    const positions = posAttr.array as Float32Array
    const colors = colAttr.array as Float32Array

    for (let i = 0; i < count; i += 1) {
      ages[i] += delta
      if (ages[i] >= lifetimes[i]) {
        ages[i] = 0
        lifetimes[i] = LIFETIME_MIN + Math.random() * (LIFETIME_MAX - LIFETIME_MIN)
        positions[i * 3] = (Math.random() - 0.5) * SPAWN_RADIUS
        positions[i * 3 + 1] = -1.5
        positions[i * 3 + 2] = (Math.random() - 0.5) * SPAWN_RADIUS
        const angle = Math.random() * Math.PI * 2
        const speed = 1.2 + Math.random() * 1.8
        velocities[i * 3] = Math.cos(angle) * (0.3 + Math.random() * 0.4)
        velocities[i * 3 + 1] = speed
        velocities[i * 3 + 2] = Math.sin(angle) * (0.3 + Math.random() * 0.4)
      }

      velocities[i * 3 + 1] += GRAVITY * delta
      positions[i * 3] += velocities[i * 3] * delta
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta

      const lifeRatio = ages[i] / lifetimes[i]
      if (lifeRatio < 0.35) {
        SHARED_TEMP_COLOR.copy(COLOR_HOT).lerp(COLOR_AMBER, lifeRatio / 0.35)
      } else {
        SHARED_TEMP_COLOR.copy(COLOR_AMBER).lerp(COLOR_RED, (lifeRatio - 0.35) / 0.65)
      }
      colors[i * 3] = SHARED_TEMP_COLOR.r
      colors[i * 3 + 1] = SHARED_TEMP_COLOR.g
      colors[i * 3 + 2] = SHARED_TEMP_COLOR.b
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(count * 3), 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[new Float32Array(count * 3), 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function ArcSource() {
  return (
    <group position={[0, -1.5, 0]}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={"#fff2c0"} />
      </mesh>
      <pointLight color={"#ffc14f"} intensity={2.2} distance={3} decay={2.4} />
    </group>
  )
}

/**
 * MIG welder spark particle system. Particles spawn at the bottom centre,
 * launch upward with random arcs, fall under gravity, and shift color from
 * hot white → amber → red over their lifetime. Stops updating under reduced
 * motion.
 */
export function WelderSparkParticles({
  count = 220,
  ariaLabel = "MIG welder spark particle field",
}: WelderSparkParticlesProps = {}) {
  const reduced = useReducedMotion3D()

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        Particle system simulating MIG welder sparks. Particles launch from a point at the bottom of
        the canvas, follow parabolic gravity, and fade from hot white to amber to red.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="sparks"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={["#050508"]} />
          <ambientLight intensity={0.15} />
          <ArcSource />
          <SparkField count={count} reduced={reduced} />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag} data-tone="red">
            Bay 3 · arc on
          </span>
        </div>
      </div>
    </figure>
  )
}

export default WelderSparkParticles
