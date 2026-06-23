export type FileKind =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "doc"
  | "sheet"
  | "slide"
  | "archive"
  | "code"
  | "3d-model"
  | "cad"
  | "generic"

export type FileTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface FileOwner {
  id: string
  name: string
  avatar?: string
}

export interface FileItem {
  id: string
  name: string
  kind: FileKind
  /** Bytes. */
  size: number
  modified: string
  owner: FileOwner
  /** Optional thumbnail src. */
  thumb?: string
  /** Optional pixel dimensions for images / video. */
  dimensions?: { width: number; height: number }
  /** Extra properties surfaced in the preview pane. */
  properties?: ReadonlyArray<{ label: string; value: string }>
}

export interface TreeNode {
  id: string
  name: string
  /** Folders have children; leaf files leave it undefined. */
  children?: ReadonlyArray<TreeNode>
  /** Optional file kind for leaf nodes. */
  kind?: FileKind
  /** Optional badge count e.g. unread. */
  badge?: number
}

export interface FileVersion {
  id: string
  label: string
  author: FileOwner
  timestamp: string
  summary: string
  /** Bytes delta for the change, signed. */
  delta?: number
  /** Whether this is the current version. */
  current?: boolean
}

export interface UploadEntry {
  id: string
  name: string
  size: number
  kind: FileKind
  /** 0–100. */
  progress: number
  /** Bytes / sec. */
  speed: number
  status: "queued" | "uploading" | "done" | "error"
  /** Optional human error message. */
  error?: string
}

export interface FolderSegment {
  id: string
  name: string
  href?: string
}
