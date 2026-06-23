"use client"

import { useCallback, useMemo, useReducer } from "react"

import {
  createPage,
  type BlockManifest,
  type PageConfig,
  type PropValue,
  type StyleProfile,
} from "../model"
import {
  applyStyleProfile,
  deleteBlock,
  duplicateBlock,
  insertBlock,
  moveBlock,
  renameBlock,
  setStatus,
  toggleHidden,
  updateBlockProp,
} from "./page-ops"

/** How many undo steps to retain. */
const HISTORY_LIMIT = 50

interface BuilderState {
  /** Undo stack — `present` is the live page; `past`/`future` flank it. */
  past: readonly PageConfig[]
  present: PageConfig
  future: readonly PageConfig[]
  /** Currently selected root block id, or null. */
  selectedId: string | null
}

type BuilderAction =
  | { type: "commit"; page: PageConfig; select?: string | null }
  | { type: "select"; id: string | null }
  | { type: "replace"; page: PageConfig }
  | { type: "undo" }
  | { type: "redo" }

function pushHistory(state: BuilderState, page: PageConfig, select?: string | null): BuilderState {
  const past = [...state.past, state.present].slice(-HISTORY_LIMIT)
  return {
    past,
    present: page,
    future: [],
    selectedId: select === undefined ? state.selectedId : select,
  }
}

function reducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "commit":
      return pushHistory(state, action.page, action.select)
    case "select":
      return { ...state, selectedId: action.id }
    case "replace":
      // Full-document replace (import / load draft) — resets history.
      return { past: [], present: action.page, future: [], selectedId: null }
    case "undo": {
      if (state.past.length === 0) return state
      const previous = state.past[state.past.length - 1]
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
        selectedId: null,
      }
    }
    case "redo": {
      if (state.future.length === 0) return state
      const next = state.future[0]
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
        selectedId: null,
      }
    }
  }
}

export interface UseBuilderResult {
  page: PageConfig
  selectedId: string | null
  canUndo: boolean
  canRedo: boolean
  select: (id: string | null) => void
  addBlock: (manifest: BlockManifest, index: number) => void
  reorder: (id: string, toIndex: number) => void
  editProp: (id: string, key: string, value: PropValue) => void
  rename: (id: string, name: string) => void
  toggleVisibility: (id: string) => void
  duplicate: (id: string) => void
  remove: (id: string) => void
  setProfile: (profile: StyleProfile) => void
  requestPublish: () => void
  replacePage: (page: PageConfig) => void
  undo: () => void
  redo: () => void
}

/**
 * The canvas state machine: an undo/redo-backed PageConfig plus selection. All
 * mutations route through the pure ops in `page-ops.ts`, so each is a clean,
 * snapshot-friendly transition.
 */
export function useBuilder(initial: PageConfig): UseBuilderResult {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    past: [],
    present: initial,
    future: [],
    selectedId: null,
  }))

  const select = useCallback((id: string | null) => dispatch({ type: "select", id }), [])

  // Each handler below builds the next page from the latest `state.present`,
  // which is stable within a render, then commits it through the reducer.
  const commit = useCallback(
    (next: PageConfig, selectId?: string | null) =>
      dispatch({ type: "commit", page: next, select: selectId }),
    [],
  )

  const handlers = useMemo<
    Pick<
      UseBuilderResult,
      | "addBlock"
      | "reorder"
      | "editProp"
      | "rename"
      | "toggleVisibility"
      | "duplicate"
      | "remove"
      | "setProfile"
      | "requestPublish"
    >
  >(
    () => ({
      addBlock: (manifest, index) => {
        const { page, blockId } = insertBlock(state.present, manifest, index)
        commit(page, blockId)
      },
      reorder: (id, toIndex) => commit(moveBlock(state.present, id, toIndex)),
      editProp: (id, key, value) => commit(updateBlockProp(state.present, id, key, value)),
      rename: (id, name) => commit(renameBlock(state.present, id, name)),
      toggleVisibility: (id) => commit(toggleHidden(state.present, id)),
      duplicate: (id) => {
        const result = duplicateBlock(state.present, id)
        if (result) commit(result.page, result.blockId)
      },
      remove: (id) => {
        commit(deleteBlock(state.present, id), null)
      },
      setProfile: (profile) => commit(applyStyleProfile(state.present, profile)),
      requestPublish: () => commit(setStatus(state.present, "in-review")),
    }),
    [state.present, commit],
  )

  const replacePage = useCallback((page: PageConfig) => dispatch({ type: "replace", page }), [])
  const undo = useCallback(() => dispatch({ type: "undo" }), [])
  const redo = useCallback(() => dispatch({ type: "redo" }), [])

  return {
    page: state.present,
    selectedId: state.selectedId,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    select,
    ...handlers,
    replacePage,
    undo,
    redo,
  }
}

/** A fresh, empty starter page for a first canvas mount. */
export function createStarterPage(): PageConfig {
  return createPage({ meta: { slug: "untitled", title: "Untitled page" } })
}
