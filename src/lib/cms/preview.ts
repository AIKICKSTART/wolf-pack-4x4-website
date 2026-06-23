/**
 * Live-preview path resolution shared by the Payload admin config (iframe URL
 * builder) and the /api/preview route. Maps a draft document to the public
 * path the preview iframe should load.
 */

type PreviewDoc = Record<string, unknown> | null | undefined

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

export function previewPathFor(collectionSlug: string, doc: PreviewDoc): string {
  const data = doc ?? {}

  switch (collectionSlug) {
    case "marketing-pages": {
      const path = text(data.path)
      if (path?.startsWith("/")) return path
      const slug = text(data.slug)
      return slug ? `/campaigns/${slug}` : "/"
    }
    case "content-overrides": {
      const targetPath = text(data.targetPath)
      return targetPath?.startsWith("/") ? targetPath : "/"
    }
    case "blog-posts": {
      const slug = text(data.slug)
      return slug ? `/blog/${slug}` : "/blog"
    }
    default:
      return "/"
  }
}
