"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Billboard, Text } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface HoloJobCard3DProps {
  /** Job number to render on the card. */
  jobNumber?: string
  vehicle?: string
  status?: string
  ariaLabel?: string
}

const FROZEN_TIME = 1.0

interface ShaderState {
  uniforms: {
    uTime: { value: number }
    uColor: { value: THREE.Color }
    uEdge: { value: THREE.Color }
  }
  vertexShader: string
  fragmentShader: string
}

function useScanlineShader(): ShaderState {
  return useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#40bcff") },
        uEdge: { value: new THREE.Color("#ffc14f") },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uEdge;
        varying vec2 vUv;
        void main() {
          float scan = sin((vUv.y * 80.0) + uTime * 4.0) * 0.5 + 0.5;
          float band = smoothstep(0.0, 0.05, vUv.x) * smoothstep(0.0, 0.05, 1.0 - vUv.x)
                     * smoothstep(0.0, 0.05, vUv.y) * smoothstep(0.0, 0.05, 1.0 - vUv.y);
          float glow = mix(0.18, 0.42, scan);
          vec3 col = mix(uColor, uEdge, scan * 0.4);
          float alpha = (0.18 + glow) * band + 0.12;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    }
  }, [])
}

interface HoloPanelProps {
  reduced: boolean
}

function HoloPanel({ reduced }: HoloPanelProps) {
  const shaderArgs = useScanlineShader()
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!materialRef.current) return
    const t = reduced ? FROZEN_TIME : state.clock.elapsedTime
    materialRef.current.uniforms.uTime.value = t
    if (!reduced && groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <Billboard>
        <mesh>
          <planeGeometry args={[2.6, 1.6, 1, 1]} />
          <shaderMaterial
            ref={materialRef}
            args={[shaderArgs]}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[2.55, 1.55]} />
          <meshBasicMaterial color={"#040407"} transparent opacity={0.55} />
        </mesh>
      </Billboard>
    </group>
  )
}

interface CardCopyProps {
  jobNumber: string
  vehicle: string
  status: string
}

function CardCopy({ jobNumber, vehicle, status }: CardCopyProps) {
  return (
    <Billboard>
      <Text
        position={[-1.15, 0.55, 0.01]}
        fontSize={0.1}
        color={"#ffc14f"}
        anchorX="left"
        anchorY="top"
        fontWeight={800}
        letterSpacing={0.2}
      >
        JOB {jobNumber}
      </Text>
      <Text
        position={[-1.15, 0.32, 0.01]}
        fontSize={0.22}
        color={"#ffffff"}
        anchorX="left"
        anchorY="top"
        fontWeight={900}
      >
        {vehicle}
      </Text>
      <Text
        position={[-1.15, -0.05, 0.01]}
        fontSize={0.09}
        color={"#aeb2bd"}
        anchorX="left"
        anchorY="top"
      >
        STATUS · {status.toUpperCase()}
      </Text>
      <Text
        position={[1.15, -0.6, 0.01]}
        fontSize={0.085}
        color={"#40bcff"}
        anchorX="right"
        anchorY="bottom"
        letterSpacing={0.15}
      >
        OAK FLATS · BAY 03
      </Text>
    </Billboard>
  )
}

/**
 * Floating holographic job card. A billboarded plane with a custom scanline
 * shader (uniforms: uTime, uColor, uEdge) layered over a tinted backplane.
 * Subtle bob on the y-axis. Reduced motion freezes `uTime` at a constant
 * value and stops the bob.
 */
export function HoloJobCard3D({
  jobNumber = "1182",
  vehicle = "Hilux 2.8L",
  status = "Quoted",
  ariaLabel = "Holographic job card with scanline shader",
}: HoloJobCard3DProps = {}) {
  const reduced = useReducedMotion3D()

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        A holographic job card showing job number {jobNumber}, vehicle {vehicle}, and status{" "}
        {status}. The surface uses a custom scanline shader and floats in front of the camera.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="holo-card"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4.2], fov: 38 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={["#050508"]} />
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 3]} intensity={1.4} color={"#40bcff"} />
          <HoloPanel reduced={reduced} />
          <CardCopy jobNumber={jobNumber} vehicle={vehicle} status={status} />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag} data-tone="teal">
            Holo · scanline shader
          </span>
        </div>
      </div>
    </figure>
  )
}

export default HoloJobCard3D
