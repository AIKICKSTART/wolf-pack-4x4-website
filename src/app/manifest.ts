import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wolfpack 4x4",
    short_name: "Wolfpack",
    description:
      "Performance 4x4 upgrades, parts and accessories in Albion Park Rail and the Illawarra.",
    start_url: "/",
    display: "browser",
    background_color: "#0b0b0c",
    theme_color: "#008cff",
    icons: [
      {
        src: "/media/wolfpack/wolfpack-mascot.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
