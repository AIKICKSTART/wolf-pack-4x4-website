import { seedanceById } from "@/app/ui-primitives/seedance-video-pack"

const DESKTOP_HERO_VIDEO = seedanceById("workshop-hero-landscape")
const MOBILE_HERO_VIDEO = seedanceById("workshop-hero-portrait")

export const VIDEOS = {
  hero: DESKTOP_HERO_VIDEO.videoSrc,
  heroMobile: MOBILE_HERO_VIDEO.videoSrc,
  logoIntro: "/media/cinematic/home-logo-intro.mp4",
  homeHero: "/media/cinematic/home-hero.mp4",
  ramHero: "/media/cinematic/home-ram-hero.mp4", // logo animation → Dodge Ram TRX studio turntable + flame rev — opens the page
  skylineFilm: "/media/cinematic/home-skyline-film.mp4", // Skyline narrated brand film — top-reel ad after the Ram
  skylineRev: "/media/cinematic/home-skyline-rev.mp4", // Nissan GT-R rev — end-of-page CTA hero (bottom slot)
  exhaustReveal: "/media/cinematic/home-exhaust.mp4",
  hoistDriveOn: "/media/cinematic/home-hoist-falcon.mp4", // Ford Falcon GT-HO ~30s film — drive-in → hoist → undercarriage
  rollout: "/media/cinematic/home-rollout.mp4",
} as const

export const HERO_POSTER = "/media/wolfpack/wolfpack-hero.png"
export const LOGO = "/media/wolfpack/wolfpack-logo-transparent.webp"
export const LOGO_DIMENSIONS = { width: 120, height: 120 } as const

// Brand videos powering the prebuilt video-hero variants showcased down the page.
export const UPGRADE_PRODUCT_VIDEO = seedanceById("exhaust-product-landscape")
export const PERFORMANCE_ROAD_VIDEO = seedanceById("performance-road-landscape")
export const SERVICE_DYNO_VIDEO = seedanceById("service-dyno-landscape")
export const SOCIAL_OUTRO_VIDEO = seedanceById("social-outro-landscape")

// Top hero plays as ONE continuous reel. Every clip is 1280x720 (16:9) so they
// align seamlessly in the 16:9 hero frame on both desktop and mobile — the logo
// intro plays first, then the cinematic build, then the brand showcase reel.
export const HERO_PLAYLIST = [] as const

export const FEATURED_BUILD_IMAGE = {
  alt: "Wolfpack 4x4 approved vehicle upgrade image set",
}

export const FEATURED_BUILD_COLLAGE = [
  {
    cls: "hero",
    src: "/media/wolfpack/vehicles/ford-ranger-raptor-wolfpack.webp",
    alt: "Ford Ranger Raptor with OEM badging and Wolfpack blue purple wrap",
    label: "Ranger Raptor",
    title: "Ford Ranger Raptor Wolfpack build",
  },
  {
    cls: "side",
    src: "/media/wolfpack/vehicles/toyota-hilux-gr-sport-wolfpack.webp",
    alt: "Toyota HiLux GR Sport with Toyota badge and Wolfpack blue purple wrap",
    label: "HiLux GR Sport",
    title: "Toyota HiLux GR Sport Wolfpack build",
  },
  {
    cls: "rear",
    src: "/media/wolfpack/vehicles/nissan-patrol-warrior-wolfpack.webp",
    alt: "Nissan Patrol Warrior with Nissan badge and Wolfpack blue purple wrap",
    label: "Patrol Warrior",
    title: "Nissan Patrol Warrior Wolfpack build",
  },
  {
    cls: "detail",
    src: "/media/wolfpack/merch/founding-wolfpack-shirt.webp",
    alt: "Founding Wolfpack 4x4 black shirt with wolf artwork",
    label: "Founding shirt",
    title: "Founding Wolfpack merch",
  },
] as const

export const GALLERY_TILES = [
  {
    cls: "t1",
    src: "/media/wolfpack/wolfpack-hero.png",
    alt: "Wolfpack 4x4 wrapped RAM hero image",
    ph: "Wolfpack · stance brief",
    tag: "01",
  },
  {
    cls: "t2",
    src: "/media/wolfpack/wolfpack-logo-transparent.webp",
    alt: "Wolfpack 4x4 wolf logo artwork",
    ph: "Wolfpack · brand mark",
    tag: "02",
  },
  {
    cls: "t3",
    src: "/media/wolfpack/wolfpack-mascot.png",
    alt: "Wolfpack 4x4 mascot artwork",
    ph: "Wolfpack · technical support",
    tag: "03",
  },
  {
    cls: "t4",
    src: "/media/wolfpack/vehicles/isuzu-dmax-blade-wolfpack.webp",
    alt: "Isuzu D-MAX Blade with Isuzu badge and Wolfpack wrap",
    ph: "D-MAX Blade · Wolfpack wrap",
    tag: "04",
  },
  {
    cls: "t5",
    src: "/media/wolfpack/vehicles/mitsubishi-triton-gsr-wolfpack.webp",
    alt: "Mitsubishi Triton GSR with Mitsubishi badge and Wolfpack wrap",
    ph: "Triton GSR · Wolfpack wrap",
    tag: "05",
  },
  {
    cls: "t6",
    src: "/media/wolfpack/vehicles/toyota-landcruiser-79-wolfpack.webp",
    alt: "Toyota LandCruiser 79 Series with Toyota badge and Wolfpack wrap",
    ph: "LandCruiser 79 · Wolfpack wrap",
    tag: "06",
  },
]
