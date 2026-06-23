import type { ReactNode } from "react"
import { Anton, Inter, JetBrains_Mono, Oswald } from "next/font/google"

import uiStyles from "@/app/ui-primitives/ui-primitives.module.css"

import styles from "./hero-frame.module.css"

/**
 * Chrome-free layout for the per-viewport hero iframe targets.
 *
 * Replicates the /ui-primitives font wiring + dark-theme bootstrap and applies
 * the `.dashboard` token scope (so every `--primitive-*` token resolves), but
 * deliberately omits `PrimitivesShell` — no sidebar/nav — and neutralises the
 * dashboard grid via `.bare`, so the embedded hero renders full-bleed at the
 * iframe's real viewport width across every breakpoint.
 */

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--ff-anton", display: "swap" })
const oswald = Oswald({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--ff-oswald", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--ff-geist", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--ff-primitive-mono", display: "swap" })

const fontClassNames = [anton.variable, oswald.variable, inter.variable, jetbrainsMono.variable].join(" ")

const primitiveThemeBootstrap = `
(() => {
  try {
    const storageKey = "ofm-primitives-theme";
    const root = document.documentElement;
    const saved = window.localStorage.getItem(storageKey);
    const hasSavedChoice = saved === "light" || saved === "dark" || saved === "system";
    const choice = hasSavedChoice ? saved : "dark";
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = choice === "system" ? (prefersLight ? "light" : "dark") : choice;
    root.dataset.primitiveTheme = theme;
    root.dataset.primitiveThemeChoice = choice;
    root.style.colorScheme = theme;
    root.classList.toggle("dark", theme === "dark");
  } catch {}
})();
`

export default function HeroFrameLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${fontClassNames} ${uiStyles.dashboard} ${styles.bare}`}>
      <script dangerouslySetInnerHTML={{ __html: primitiveThemeBootstrap }} />
      {children}
    </div>
  )
}
