import type { StyleProfile, StyleProfileId } from "../profile-types"

import carbonPro from "./carbon-pro"
import cleanLight from "./clean-light"
import glassGarage from "./glass-garage"
import motorsport from "./motorsport"
import neoWorkshop from "./neo-workshop"

/** The default profile applied when nothing is persisted. */
export const DEFAULT_PROFILE_ID: StyleProfileId = "carbon-pro"

/** All five Mufflermen style profiles, in display order. */
export const STYLE_PROFILES: readonly StyleProfile[] = [
  carbonPro,
  glassGarage,
  neoWorkshop,
  motorsport,
  cleanLight,
]

/** Lookup table keyed by profile id. */
export const STYLE_PROFILES_BY_ID: Readonly<Record<StyleProfileId, StyleProfile>> = {
  "carbon-pro": carbonPro,
  "glass-garage": glassGarage,
  "neo-workshop": neoWorkshop,
  motorsport,
  "clean-light": cleanLight,
}

/** Resolves a profile by id, falling back to the default when unknown. */
export function resolveProfile(id: string | null | undefined): StyleProfile {
  if (id != null && id in STYLE_PROFILES_BY_ID) {
    return STYLE_PROFILES_BY_ID[id as StyleProfileId]
  }
  return STYLE_PROFILES_BY_ID[DEFAULT_PROFILE_ID]
}

export { carbonPro, glassGarage, neoWorkshop, motorsport, cleanLight }
