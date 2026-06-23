import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Anton, Inter, JetBrains_Mono, Oswald } from "next/font/google"
import Script from "next/script"

import { uiPrimitivesMetadataForPath } from "@/lib/primitives/seo"

import { PrimitivesShell } from "./primitives-shell"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-anton",
  display: "swap",
})

// Premium condensed display (motorsport/automotive); primary display face.
const oswald = Oswald({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--ff-oswald",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--ff-geist",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-primitive-mono",
  display: "swap",
})

const fontClassNames = [anton.variable, oswald.variable, inter.variable, jetbrainsMono.variable].join(" ")

const defaultPrimitiveThemeChoice = "dark"

const primitiveThemeBootstrap = `
(() => {
  try {
    const storageKey = "ofm-primitives-theme";
    const presetStorageKey = "ofm-primitives-theme-preset";
    const assignmentStorageKey = "ofm-primitives-theme-assignments-v3";
    const styleProfileStorageKey = "mufflermen.style-profile";
    const windowNameStateKey = "__ofmPrimitiveThemeState";
    const cookieMaxAge = 60 * 60 * 24 * 365;
    const lightPresetIds = new Set(["classic-glass", "heritage-cream", "glacier"]);
    const darkPresetIds = new Set(["mufflermen-classic", "performance-teal", "brutalist-mono"]);
    const presetProfileMap = {
      "mufflermen-classic": "carbon-pro",
      "classic-glass": "glass-garage",
      "performance-teal": "motorsport",
      "heritage-cream": "clean-light",
      "brutalist-mono": "neo-workshop",
      glacier: "clean-light",
    };
    const profilePresetMap = {
      "carbon-pro": "mufflermen-classic",
      "glass-garage": "classic-glass",
      "neo-workshop": "brutalist-mono",
      motorsport: "performance-teal",
      "clean-light": "heritage-cream",
    };
    const fallbackPresetByTone = { light: "heritage-cream", dark: "mufflermen-classic" };
    const defaultAssignments = { system: "auto", light: fallbackPresetByTone.light, dark: fallbackPresetByTone.dark };
    const isPresetId = (value) => lightPresetIds.has(value) || darkPresetIds.has(value);
    const isProfileId = (value) => Object.prototype.hasOwnProperty.call(profilePresetMap, value);
    const presetTone = (value) => lightPresetIds.has(value) ? "light" : "dark";
    const readCookie = (name) => {
      const prefix = encodeURIComponent(name) + "=";
      const match = document.cookie
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(prefix));
      return match ? decodeURIComponent(match.slice(prefix.length)) : null;
    };
    const writeCookie = (name, value) => {
      document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/; max-age=" + cookieMaxAge + "; SameSite=Lax";
    };
    const readWindowName = (name) => {
      try {
        const parsed = JSON.parse(window.name || "{}");
        const primitiveState = parsed && typeof parsed === "object" ? parsed[windowNameStateKey] : null;
        const value = primitiveState && typeof primitiveState === "object" ? primitiveState[name] : null;
        return typeof value === "string" ? value : null;
      } catch {
        return null;
      }
    };
    const writeWindowName = (name, value) => {
      try {
        const parsed = JSON.parse(window.name || "{}");
        const rootState = parsed && typeof parsed === "object" ? parsed : {};
        const primitiveState =
          rootState[windowNameStateKey] && typeof rootState[windowNameStateKey] === "object"
            ? rootState[windowNameStateKey]
            : {};
        primitiveState[name] = value;
        rootState[windowNameStateKey] = primitiveState;
        window.name = JSON.stringify(rootState);
      } catch {
        window.name = JSON.stringify({ [windowNameStateKey]: { [name]: value } });
      }
    };
    const readStoredValue = (name) => {
      let value = null;
      try {
        value = window.sessionStorage.getItem(name);
      } catch {}
      try {
        value = value || window.localStorage.getItem(name);
      } catch {}
      return value || readCookie(name) || readWindowName(name);
    };
    const parseAssignments = (value) => {
      try {
        const parsed = value ? JSON.parse(value) : null;
        if (!parsed || typeof parsed !== "object") {
          return defaultAssignments;
        }
        const light = isPresetId(parsed.light) && presetTone(parsed.light) === "light"
          ? parsed.light
          : fallbackPresetByTone.light;
        const dark = isPresetId(parsed.dark) && presetTone(parsed.dark) === "dark"
          ? parsed.dark
          : fallbackPresetByTone.dark;
        const system = parsed.system === "auto" || isPresetId(parsed.system) ? parsed.system : "auto";
        return { system, light, dark };
      } catch {
        return defaultAssignments;
      }
    };
    const root = document.documentElement;
    const saved = readStoredValue(storageKey);
    const hasSavedChoice = saved === "light" || saved === "dark" || saved === "system";
    const choice = hasSavedChoice ? saved : "${defaultPrimitiveThemeChoice}";
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const systemTone = prefersLight ? "light" : "dark";
    let theme = choice === "system" ? systemTone : choice;

    if (!hasSavedChoice) {
      try {
        window.localStorage.setItem(storageKey, choice);
      } catch {}
      try {
        window.sessionStorage.setItem(storageKey, choice);
      } catch {}
    }
    writeCookie(storageKey, choice);
    writeWindowName(storageKey, choice);

    const assignments = parseAssignments(readStoredValue(assignmentStorageKey));
    const assignedPreset = choice === "system" && assignments.system !== "auto"
      ? assignments.system
      : assignments[theme];
    theme = presetTone(assignedPreset);

    const savedPreset = readStoredValue(presetStorageKey);
    const savedProfile = readStoredValue(styleProfileStorageKey);
    const profilePreset = isProfileId(savedProfile) ? profilePresetMap[savedProfile] : null;
    if (!isPresetId(savedPreset) && profilePreset) {
      theme = presetTone(profilePreset);
    }
    const preset = assignedPreset;
    const styleProfile = presetProfileMap[preset];

    try {
      window.localStorage.setItem(presetStorageKey, preset);
      window.localStorage.setItem(styleProfileStorageKey, styleProfile);
    } catch {}
    try {
      window.sessionStorage.setItem(presetStorageKey, preset);
      window.sessionStorage.setItem(styleProfileStorageKey, styleProfile);
    } catch {}
    writeCookie(presetStorageKey, preset);
    writeCookie(styleProfileStorageKey, styleProfile);
    writeWindowName(presetStorageKey, preset);
    writeWindowName(styleProfileStorageKey, styleProfile);

    if (root.dataset.primitivePreviousDark === undefined) {
      root.dataset.primitivePreviousDark = root.classList.contains("dark") ? "1" : "0";
    }

    root.dataset.primitiveTheme = theme;
    root.dataset.primitiveThemeChoice = choice;
    root.style.colorScheme = theme;
    root.classList.toggle("dark", theme === "dark");
  } catch {}
})();
`

export function generateMetadata(): Metadata {
  return uiPrimitivesMetadataForPath("/ui-primitives")
}

export default function UiPrimitivesLayout({ children }: { children: ReactNode }) {
  return (
    <div className={fontClassNames} data-primitives-shell="true">
      <Script
        id="ui-primitives-theme-bootstrap"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: primitiveThemeBootstrap }}
      />
      <PrimitivesShell>{children}</PrimitivesShell>
    </div>
  )
}
