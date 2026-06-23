"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

import { SceneCanvas } from "./scene-canvas"
import { useReducedMotion3D } from "./use-reduced-motion-3d"
import shellStyles from "./scene-shell.module.css"

export interface WireframeCarScanProps {
  ariaLabel?: string
}

const WIRE_COLOR = "#40bcff"
const SCAN_COLOR = "#ffc14f"

function makeScanShader(): THREE.ShaderMaterialParameters {
  return {
    uniforms: {
      uScanY: { value: -1.0 },
      uScanColor: { value: new THREE.Color(SCAN_COLOR) },
      uBaseColor: { value: new THREE.Color(WIRE_COLOR) },
      uBand: { value: 0.2 },
    },
    vertexShader: /* glsl */ `
      varying float vWorldY;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldY = worldPosition.y;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uScanY;
      uniform vec3 uScanColor;
      uniform vec3 uBaseColor;
      uniform float uBand;
      varying float vWorldY;
      void main() {
        float d = abs(vWorldY - uScanY);
        float mask = 1.0 - smoothstep(0.0, uBand, d);
        vec3 col = mix(uBaseColor, uScanColor, mask);
        float alpha = 0.4 + mask * 0.6;
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
  }
}

interface CarWireframeProps {
  reduced: boolean
}

function CarWireframe({ reduced }: CarWireframeProps) {
  const planeRef = useRef<THREE.Group>(null)
  const scanRef = useRef<number>(0)
  const dirRef = useRef<number>(1)
  const groupRef = useRef<THREE.Group>(null)

  const shaderArgs = useMemo(() => makeScanShader(), [])

  useFrame((_, deltaRaw) => {
    const delta = Math.min(deltaRaw, 1 / 30)
    if (!reduced) {
      scanRef.current += dirRef.current * delta * 0.7
      if (scanRef.current > 1.7) {
        scanRef.current = 1.7
        dirRef.current = -1
      } else if (scanRef.current < 0.1) {
        scanRef.current = 0.1
        dirRef.current = 1
      }
    }
    const y = scanRef.current
    if (groupRef.current) {
      groupRef.current.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh && mesh.material instanceof THREE.ShaderMaterial) {
          const uniform = mesh.material.uniforms.uScanY
          if (uniform) {
            uniform.value = y
          }
        }
      })
    }
    if (planeRef.current) {
      planeRef.current.position.y = y
    }
  })

  const wheelPositions: ReadonlyArray<[number, number, number]> = [
    [-0.95, 0.32, 0.62],
    [0.95, 0.32, 0.62],
    [-0.95, 0.32, -0.62],
    [0.95, 0.32, -0.62],
  ]

  return (
    <group>
      <group ref={groupRef}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[3, 0.5, 1.3, 6, 2, 3]} />
          <shaderMaterial args={[shaderArgs]} wireframe />
        </mesh>
        <mesh position={[-0.15, 0.95, 0]}>
          <boxGeometry args={[1.5, 0.45, 1.15, 4, 2, 3]} />
          <shaderMaterial args={[shaderArgs]} wireframe />
        </mesh>
        <mesh position={[1.15, 0.6, 0]} rotation={[0, 0, -0.18]}>
          <boxGeometry args={[0.5, 0.18, 1.3, 2, 1, 2]} />
          <shaderMaterial args={[shaderArgs]} wireframe />
        </mesh>
        {wheelPositions.map((pos, idx) => (
          <mesh key={idx} position={pos} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.22, 12, 1, true]} />
            <shaderMaterial args={[shaderArgs]} wireframe />
          </mesh>
        ))}
      </group>
      <group ref={planeRef} position={[0, 0.1, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.4, 1.6]} />
          <meshBasicMaterial
            color={SCAN_COLOR}
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

/**
 * Low-poly car wireframe with a horizontal scan beam sweeping vertically. The
 * wireframe colour blends from base teal to amber within a narrow band
 * around the beam, simulating a laser scan reveal. Reduced motion freezes
 * the beam at idle.
 */
export function WireframeCarScan({
  ariaLabel = "Wireframe car with vertical scanning beam",
}: WireframeCarScanProps = {}) {
  const reduced = useReducedMotion3D()

  return (
    <figure className={shellStyles.shell}>
      <figcaption>
        Low-poly car wireframe being scanned by a horizontal beam that sweeps vertically through
        it, revealing each section as it passes.
      </figcaption>
      <div className={shellStyles.canvasWrap}>
        <SceneCanvas
          fallbackVariant="wireframe"
          dpr={[1, 2]}
          camera={{ position: [4.4, 2.4, 4.8], fov: 38 }}
          gl={{ antialias: true, alpha: false }}
          role="img"
          aria-label={ariaLabel}
        >
          <color attach="background" args={["#050508"]} />
          <ambientLight intensity={0.3} />
          <CarWireframe reduced={reduced} />
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={9}
            target={[0, 0.6, 0]}
          />
        </SceneCanvas>
        <div className={shellStyles.overlay}>
          <span className={shellStyles.tag} data-tone="teal">
            Scanning chassis
          </span>
        </div>
      </div>
    </figure>
  )
}

export default WireframeCarScan
