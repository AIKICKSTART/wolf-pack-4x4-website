"use client"

import dynamic from "next/dynamic"

import { CardStackPrimitiveFallback } from "../components/three-scenes/card-stack-primitive-fallback"
import { ThreeFallback } from "../components/three-scenes/three-fallback"

const ExhaustPipeViewer = dynamic(
  () =>
    import("../components/three-scenes/exhaust-pipe-viewer").then(
      (mod) => mod.ExhaustPipeViewer,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="exhaust-pipe" /> },
)

const VehicleShowcaseScene = dynamic(
  () =>
    import("../components/three-scenes/vehicle-showcase-scene").then(
      (mod) => mod.VehicleShowcaseScene,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="vehicle" /> },
)

const VehiclePrimitiveScene = dynamic(
  () =>
    import("../components/three-scenes/vehicle-showcase-scene").then(
      (mod) => mod.VehiclePrimitiveScene,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="vehicle" /> },
)

const AmbientRotatingLogo = dynamic(
  () =>
    import("../components/three-scenes/ambient-rotating-logo").then(
      (mod) => mod.AmbientRotatingLogo,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="logo" /> },
)

const WelderSparkParticles = dynamic(
  () =>
    import("../components/three-scenes/welder-spark-particles").then(
      (mod) => mod.WelderSparkParticles,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="sparks" /> },
)

const DynoChart3D = dynamic(
  () =>
    import("../components/three-scenes/dyno-chart-3d").then(
      (mod) => mod.DynoChart3D,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="dyno" /> },
)

const PartsGrid3D = dynamic(
  () =>
    import("../components/three-scenes/parts-grid-3d").then(
      (mod) => mod.PartsGrid3D,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="grid" /> },
)

const WireframeCarScan = dynamic(
  () =>
    import("../components/three-scenes/wireframe-car-scan").then(
      (mod) => mod.WireframeCarScan,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="wireframe" /> },
)

const GaugeCluster3D = dynamic(
  () =>
    import("../components/three-scenes/gauge-cluster-3d").then(
      (mod) => mod.GaugeCluster3D,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="gauges" /> },
)

const HoloJobCard3D = dynamic(
  () =>
    import("../components/three-scenes/holo-job-card-3d").then(
      (mod) => mod.HoloJobCard3D,
    ),
  { ssr: false, loading: () => <ThreeFallback variant="holo-card" /> },
)

const InteractiveCardStack = dynamic(
  () =>
    import("../components/three-scenes/interactive-card-stack").then(
      (mod) => mod.InteractiveCardStack,
    ),
  {
    ssr: false,
    loading: () => (
      <CardStackPrimitiveFallback copy="Loading the WebGL quote deck. The selected quote, service chips, and decision packet are already live through primitives." />
    ),
  },
)

export type SceneName =
  | "exhaust-pipe"
  | "vehicle-showcase"
  | "vehicle-workshop-showcase"
  | "vehicle-exhaust-hero"
  | "vehicle-performance-promo"
  | "vehicle-parts-scene"
  | "vehicle-social-preview"
  | "vehicle-hero-video"
  | "vehicle-status-animation"
  | "rotating-logo"
  | "welder-sparks"
  | "dyno-chart"
  | "parts-grid"
  | "wireframe-car"
  | "gauge-cluster"
  | "holo-card"
  | "card-stack"

export interface SceneIslandProps {
  scene: SceneName
}

/**
 * Client-only loader island. Resolves the scene module via `next/dynamic`
 * with `ssr: false` so three.js never enters the server bundle, and shows a
 * `<ThreeFallback>` poster during code-split + hydration.
 */
export function SceneIsland({ scene }: SceneIslandProps) {
  switch (scene) {
    case "exhaust-pipe":
      return <ExhaustPipeViewer />
    case "vehicle-showcase":
      return <VehicleShowcaseScene />
    case "vehicle-workshop-showcase":
      return <VehiclePrimitiveScene variant="workshop-showcase" />
    case "vehicle-exhaust-hero":
      return <VehiclePrimitiveScene variant="exhaust-hero" />
    case "vehicle-performance-promo":
      return <VehiclePrimitiveScene variant="performance-promo" />
    case "vehicle-parts-scene":
      return <VehiclePrimitiveScene variant="parts-product" />
    case "vehicle-social-preview":
      return <VehiclePrimitiveScene variant="social-preview" />
    case "vehicle-hero-video":
      return <VehiclePrimitiveScene variant="website-hero-video" />
    case "vehicle-status-animation":
      return <VehiclePrimitiveScene variant="dashboard-status" />
    case "rotating-logo":
      return <AmbientRotatingLogo />
    case "welder-sparks":
      return <WelderSparkParticles />
    case "dyno-chart":
      return <DynoChart3D />
    case "parts-grid":
      return <PartsGrid3D />
    case "wireframe-car":
      return <WireframeCarScan />
    case "gauge-cluster":
      return <GaugeCluster3D />
    case "holo-card":
      return <HoloJobCard3D />
    case "card-stack":
      return <InteractiveCardStack />
    default: {
      const exhaustive: never = scene
      throw new Error(`Unknown scene: ${String(exhaustive)}`)
    }
  }
}

export default SceneIsland
