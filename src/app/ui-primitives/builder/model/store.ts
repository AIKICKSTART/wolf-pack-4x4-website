/**
 * In-memory builder store.
 *
 * A small, framework-agnostic store holding the registered block manifests and
 * the working set of pages. It is intentionally minimal: synchronous, immutable
 * reads (returns frozen snapshots / copies), and a subscribe hook so a UI layer
 * can re-render. No persistence, no network — that lives above this layer.
 */

import type { BlockManifest } from "./manifest"
import type { PageConfig } from "./page-config"

type Listener = () => void

/** A read-only view of the store's current state. */
export interface BuilderStoreSnapshot {
  manifests: readonly BlockManifest[]
  pages: readonly PageConfig[]
}

/** Minimal in-memory store for builder manifests + pages. */
export class BuilderStore {
  private readonly manifests = new Map<string, BlockManifest>()
  private readonly pages = new Map<string, PageConfig>()
  private readonly listeners = new Set<Listener>()

  constructor(initialManifests: readonly BlockManifest[] = []) {
    for (const manifest of initialManifests) {
      this.manifests.set(manifest.type, manifest)
    }
  }

  // — Manifests —————————————————————————————————————————————

  /** Register (or replace) a manifest, keyed by its `type`. */
  registerManifest(manifest: BlockManifest): void {
    this.manifests.set(manifest.type, manifest)
    this.emit()
  }

  /** Register many manifests at once. */
  registerManifests(manifests: readonly BlockManifest[]): void {
    for (const manifest of manifests) {
      this.manifests.set(manifest.type, manifest)
    }
    this.emit()
  }

  getManifest(type: string): BlockManifest | undefined {
    return this.manifests.get(type)
  }

  listManifests(): readonly BlockManifest[] {
    return Array.from(this.manifests.values())
  }

  // — Pages —————————————————————————————————————————————————

  /** Upsert a page, keyed by its id. */
  savePage(page: PageConfig): void {
    this.pages.set(page.id, page)
    this.emit()
  }

  getPage(id: string): PageConfig | undefined {
    return this.pages.get(id)
  }

  /** Look up a page by its slug. */
  getPageBySlug(slug: string): PageConfig | undefined {
    for (const page of this.pages.values()) {
      if (page.meta.slug === slug) {
        return page
      }
    }
    return undefined
  }

  listPages(): readonly PageConfig[] {
    return Array.from(this.pages.values())
  }

  /** Remove a page; returns whether it existed. */
  deletePage(id: string): boolean {
    const existed = this.pages.delete(id)
    if (existed) {
      this.emit()
    }
    return existed
  }

  // — Subscriptions —————————————————————————————————————————

  /** Subscribe to any state change; returns an unsubscribe fn. */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  /** A read-only snapshot of current state. */
  snapshot(): BuilderStoreSnapshot {
    return {
      manifests: this.listManifests(),
      pages: this.listPages(),
    }
  }

  private emit(): void {
    for (const listener of this.listeners) {
      listener()
    }
  }
}

/** Convenience factory mirroring the other `create*` helpers. */
export function createBuilderStore(initialManifests: readonly BlockManifest[] = []): BuilderStore {
  return new BuilderStore(initialManifests)
}
