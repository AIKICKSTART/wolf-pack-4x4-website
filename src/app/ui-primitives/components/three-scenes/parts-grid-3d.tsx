"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, Text } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface PartsGrid3DProps {
  ariaLabel?: string
}

type GeometryVariant = "cylinder" | "tube" | "extractor" | "fitting" | "muffler" | "bracket"

interface PartTile {
  label: string
  variant: GeometryVariant
  color: string
}

const PARTS: ReadonlyArray<PartTile> = [
  { label: "Mufflers", variant: "muffler", color: "#e62028" },
  { label: "Cat-back", variant: "tube", color: "#ffc14f" },
  { label: "Extractors", variant: "extractor", color: "#40bcff" },
  { label: "Resonators", variant: "cylinder", color: "#37d67a" },
  { label: "Tips", variant: "fitting", color: "#d8d8de" },
  { label: "Brackets", variant: "bracket", color: "#aeb2bd" },
  { label: "Flex pipes", variant: "tube", color: "#ffc14f" },
  { label: "Gaskets", variant: "fitting", color: "#868b98" },
  { label: "Clamps", variant: "bracket", color: "#40bcff" },
]

interface PartMeshProps {
  variant: GeometryVariant
  color: string
}

function PartMesh({ variant, color }: PartMeshProps) {
  switch (variant) {
    case "muffler":
      return (
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.36, 0.36, 0.95, 24]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>
      )
    case "tube":
      return (
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 1.1, 24]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.25} />
        </mesh>
      )
    case "extractor":
      return (
        <mesh castShadow>
          <torusKnotGeometry args={[0.32, 0.08, 96, 12, 2, 3]} />
          <meshStandardMaterial color={color} metalness={0.85} roughness={0.3} />
        </mesh>
      )
    case "cylinder":
      return (
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.8, 24]} />
          <meshStandardMaterial color={color} metalness={0.65} roughness={0.4} />
        </mesh>
      )
    case "fitting":
      return (
        <mesh castShadow>
          <torusGeometry args={[0.34, 0.1, 16, 32]} />
          <meshStandardMaterial color={color} metalness={0.95} roughness={0.18} />
        </mesh>
      )
    case "bracket":
      return (
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.18, 0.18]} />
          <meshStandardMaterial color={color} metalness={0.45} roughness={0.55} />
        </mesh>
      )
    default:
      return null
  }
}

interface TileProps {
  part: PartTile
  index: number
  position: [number, number, number]
  reduced: boolean
}

function Tile({ part, index, position, reduced }: TileProps) {
  const groupRef = useRef<THREE.Group>(null)
  const baseY = position[1]
  const phase = (index * Math.PI * 2) / 9

  useFrame((state) => {
    if (reduced || !groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = baseY + Math.sin(t * 1.1 + phase) * 0.16
    groupRef.current.rotation.y = t * 0.4 + index
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.04, 32]} />
        <meshStandardMaterial color={"#101016"} roughness={0.85} />
      </mesh>
      <PartMesh variant={part.variant} color={part.color} />
      <Text
        position={[0, -0.85, 0]}
        rotation={[-Math.PI / 6, 0, 0]}
        fontSize={0.14}
        color={"#c7c9d0"}
        anchorX="center"
        anchorY="top"
      >
        {part.label.toUpperCase()}
      </Text>
    </group>
  )
}

function Grid({ reduced }: { reduced: boolean }) {
  const spacing = 1.8
  return (
    <group>
      {PARTS.map((part, index) => {
        const col = index % 3
        const row = Math.floor(index / 3)
        const x = (col - 1) * spacing
        const z = (row - 1) * spacing
        return (
          <Tile
            key={part.label}
            part={part}
            index={index}
            position={[x, 0, z]}
            reduced={reduced}
          />
        )
      })}
    </group>
  )
}

/**
 * Floating 3×3 grid of part-category placeholders. Each tile uses a
 * representative procedural geometry (torus knot for extractors, cylinders
 * for mufflers, etc.) and bobs out of phase. Stops bobbing under reduced
 * motion.
 */
export function PartsGrid3D({
  ariaLabel = "Floating 3D grid of part categories",
}: PartsGrid3DProps = {}) {
  const reduced = useReducedMotion3D()

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        A three-by-three grid of floating placeholder parts representing the Mufflermen catalogue
        categories. Each tile bobs gently and rotates to show its silhouette.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="grid"
          shadows
          dpr={[1, 2]}
          camera={{ position: [4.2, 4.4, 6.4], fov: 38 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={["#050508"]} />
          <ambientLight intensity={0.45} />
          <directionalLight
            position={[5, 8, 4]}
            intensity={1.0}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Environment preset="warehouse" />
          <Grid reduced={reduced} />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag}>9 categories · live</span>
        </div>
      </div>
    </figure>
  )
}

export default PartsGrid3D
