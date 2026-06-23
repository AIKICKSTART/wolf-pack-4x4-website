"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Center, Environment, Text } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface AmbientRotatingLogoProps {
  /** Wordmark to render. Defaults to "OFM". */
  text?: string
  ariaLabel?: string
}

const LOGO_COLOR = "#e62028"
const STROKE_COLOR = "#ffc14f"

interface LogoMeshProps {
  text: string
  reduced: boolean
}

function LogoMesh({ text, reduced }: LogoMeshProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (reduced || !groupRef.current) return
    groupRef.current.rotation.y += delta * 0.45
  })

  return (
    <group ref={groupRef}>
      <Center>
        <Text
          font={undefined}
          fontSize={1.6}
          fontWeight={900}
          letterSpacing={0.04}
          color={LOGO_COLOR}
          outlineWidth={0.04}
          outlineColor={STROKE_COLOR}
          outlineOpacity={0.85}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Center>
    </group>
  )
}

/**
 * Slowly rotating extruded wordmark using drei's SDF-based Text. Lit with a
 * subtle environment so the metallic stroke catches reflection. Rotation
 * stops when reduced motion is requested.
 */
export function AmbientRotatingLogo({
  text = "OFM",
  ariaLabel = "Slowly rotating Oak Flats Mufflermen wordmark",
}: AmbientRotatingLogoProps = {}) {
  const reduced = useReducedMotion3D()

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        Three-dimensional Oak Flats Mufflermen wordmark slowly rotating on its vertical axis,
        suitable as an ambient marketing accent.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="logo"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 32 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={["#050508"]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 4, 5]} intensity={0.9} />
          <Environment preset="warehouse" />
          <LogoMesh text={text} reduced={reduced} />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag} data-tone="red">
            Brand mark · 3D
          </span>
        </div>
      </div>
    </figure>
  )
}

export default AmbientRotatingLogo
