import type { ReactNode } from "react"
import { Inter, JetBrains_Mono } from "next/font/google"

// Control OS faces — loaded here instead of the root layout so public pages
// don't pay for them (control-os.module.css reads --ff-inter / --ff-mono).
const inter = Inter({
  subsets: ["latin"],
  variable: "--ff-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
  display: "swap",
})

export default function ControlLayout({ children }: { children: ReactNode }) {
  return <div className={`${inter.variable} ${jetbrainsMono.variable}`}>{children}</div>
}
