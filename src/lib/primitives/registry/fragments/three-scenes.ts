import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "three-scenes",
  "title": "3D scenes",
  "group": "Media",
  "summary": "17 client-only @react-three/fiber + drei routed scenes plus the ThreeFallback poster primitive for the Mufflermen surface (procedural exhaust, realistic + variant vehicles, wireframe scan, holographic job card, spark particles, dyno curve, gauge cluster, interactive quote-card stack), each Suspense-wrapped and prefers-reduced-motion aware.",
  "entries": [
    {
      "key": "three-scenes/ambient-rotating-logo",
      "family": "three-scenes",
      "name": "AmbientRotatingLogo",
      "label": "Rotating logo",
      "description": "Slowly Y-axis-rotating OFM wordmark rendered with drei SDF Text, metallic outline stroke, and a warehouse environment; rotation halts under reduced motion.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/rotating-logo",
      "tags": [
        "3d",
        "brand",
        "logo",
        "ambient"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/dyno-chart-3d",
      "family": "three-scenes",
      "name": "DynoChart3D",
      "label": "Dyno chart",
      "description": "3D dyno chart plotting an RPM x torque x boost curve as a thick Catmull-Rom tube with labelled axes and an auto-orbiting camera (auto-rotate off under reduced motion).",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/dyno-chart",
      "tags": [
        "3d",
        "data-viz",
        "dyno",
        "performance"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/exhaust-pipe-viewer",
      "family": "three-scenes",
      "name": "ExhaustPipeViewer",
      "label": "Exhaust pipe viewer",
      "description": "Interactive procedural exhaust assembly (header to muffler to chrome tip) along a Catmull-Rom curve with orbit controls, contact shadows, and a hover pulse plus callout label.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/exhaust-pipe",
      "tags": [
        "3d",
        "exhaust",
        "interactive",
        "orbit"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/gauge-cluster-3d",
      "family": "three-scenes",
      "name": "GaugeCluster3D",
      "label": "Gauge cluster",
      "description": "Three radial 3D gauges (RPM, boost, EGT) whose needles sweep via sinusoidal offsets to simulate live telemetry; needles lock to base angle under reduced motion.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/gauge-cluster",
      "tags": [
        "3d",
        "gauges",
        "telemetry",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/holo-job-card-3d",
      "family": "three-scenes",
      "name": "HoloJobCard3D",
      "label": "Holographic job card",
      "description": "Billboarded holographic job card driven by a custom scanline ShaderMaterial over a tinted backplane, with a subtle vertical bob; shader time freezes and bob stops under reduced motion.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/holo-card",
      "tags": [
        "3d",
        "shader",
        "holographic",
        "job-card"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/interactive-card-stack",
      "family": "three-scenes",
      "name": "InteractiveCardStack",
      "label": "Interactive card stack",
      "description": "3D stack of workshop quote-card meshes with progressive z-offset; selecting brings a card forward and hover tilts it toward the pointer, bridged to shared Chip/Kbd/Progress/StatTile/Toast primitives in a dock.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/card-stack",
      "tags": [
        "3d",
        "quotes",
        "interactive",
        "primitive-bridge"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/parts-grid-3d",
      "family": "three-scenes",
      "name": "PartsGrid3D",
      "label": "Parts grid",
      "description": "Floating 3x3 grid of part-category placeholders using representative procedural geometry (torus knot, cylinders, brackets) that bob out of phase and rotate; bobbing stops under reduced motion.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/parts-grid",
      "tags": [
        "3d",
        "parts",
        "catalogue",
        "grid"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/three-fallback",
      "family": "three-scenes",
      "name": "ThreeFallback",
      "label": "Three fallback",
      "description": "Polished SVG approximation (10 variants) shown via Suspense while a Three.js canvas mounts or recovers, with a reduced-motion-aware shimmer and per-variant loading copy.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "tags": [
        "3d",
        "fallback",
        "suspense",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-showcase-scene",
      "family": "three-scenes",
      "name": "VehicleShowcaseScene",
      "label": "Vehicle showcase",
      "description": "Realistic procedural vehicle turntable (workshop-showcase preset) with curved extruded body, glass cabin, spinning rims, accent lights, exhaust detail, reflective floor, and poster fallback.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-showcase",
      "tags": [
        "3d",
        "vehicle",
        "showcase",
        "turntable"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-primitive-scene",
      "family": "three-scenes",
      "name": "VehiclePrimitiveScene",
      "label": "Vehicle primitive scene",
      "description": "Variant-driven procedural vehicle scene (7 presets: workshop-showcase, exhaust-hero, performance-promo, parts-product, social-preview, website-hero-video, dashboard-status) toggling exhaust/parts/social-frame/hero-rig/dashboard-scan features, with optional video and poster fallback.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-workshop-showcase",
      "tags": [
        "3d",
        "vehicle",
        "variants",
        "marketing"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-exhaust-hero",
      "family": "three-scenes",
      "name": "VehiclePrimitiveScene",
      "label": "Vehicle exhaust hero",
      "description": "Exhaust-hero preset of VehiclePrimitiveScene with highlighted underbody hardware, warm service-bay light, and a hero-friendly reduced-motion state.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-exhaust-hero",
      "tags": [
        "3d",
        "vehicle",
        "exhaust",
        "hero"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-performance-promo",
      "family": "three-scenes",
      "name": "VehiclePrimitiveScene",
      "label": "Vehicle performance promo",
      "description": "Performance-promo preset of VehiclePrimitiveScene with cinematic rim lighting, premium reflections, and controlled turntable motion.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-performance-promo",
      "tags": [
        "3d",
        "vehicle",
        "performance",
        "marketing"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-parts-scene",
      "family": "three-scenes",
      "name": "VehiclePrimitiveScene",
      "label": "Vehicle parts scene",
      "description": "Parts-product preset of VehiclePrimitiveScene with floating exhaust, gasket, and bracket objects for catalogue storytelling.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-parts-scene",
      "tags": [
        "3d",
        "vehicle",
        "parts",
        "catalogue"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-social-preview",
      "family": "three-scenes",
      "name": "VehiclePrimitiveScene",
      "label": "Vehicle social preview",
      "description": "Social-preview preset of VehiclePrimitiveScene with a square-safe frame, strong accents, and poster fallback alignment for social crops.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-social-preview",
      "tags": [
        "3d",
        "vehicle",
        "social",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-hero-video",
      "family": "three-scenes",
      "name": "VehiclePrimitiveScene",
      "label": "Vehicle hero video",
      "description": "Website-hero-video preset of VehiclePrimitiveScene with local loop and poster fallback layered behind the WebGL vehicle.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-hero-video",
      "tags": [
        "3d",
        "vehicle",
        "video",
        "hero"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/vehicle-status-animation",
      "family": "three-scenes",
      "name": "VehiclePrimitiveScene",
      "label": "Vehicle status animation",
      "description": "Dashboard-status preset of VehiclePrimitiveScene with diagnostic scan lighting and a stable reduced-motion status composition.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/vehicle-status-animation",
      "tags": [
        "3d",
        "vehicle",
        "dashboard",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/welder-spark-particles",
      "family": "three-scenes",
      "name": "WelderSparkParticles",
      "label": "Welder sparks",
      "description": "MIG-welder spark particle field: points spawn at the arc source, launch on random arcs, fall under gravity, and ramp color from hot white to amber to red over their lifetime; updates pause under reduced motion.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/welder-sparks",
      "tags": [
        "3d",
        "particles",
        "sparks",
        "welding"
      ],
      "status": "captured"
    },
    {
      "key": "three-scenes/wireframe-car-scan",
      "family": "three-scenes",
      "name": "WireframeCarScan",
      "label": "Wireframe car scan",
      "description": "Low-poly wireframe chassis driven by a custom shader whose color blends teal-to-amber inside a vertically sweeping scan band, with an orbit camera; the beam freezes at idle under reduced motion.",
      "kind": "scene",
      "importPath": "@/app/ui-primitives/components/three-scenes",
      "routeHref": "/ui-primitives/three-scenes/wireframe-car",
      "tags": [
        "3d",
        "wireframe",
        "shader",
        "scan"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
