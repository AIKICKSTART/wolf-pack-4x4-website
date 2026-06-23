import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "file-browser",
  "title": "File browser",
  "group": "Media",
  "summary": "14 file/asset-management primitives — tree, grid/list views, cards, rows, breadcrumb, preview pane, upload drop zone, context menu, bulk-action bar, media lightbox, type icons, inline rename, and version history — over a shared FileItem/TreeNode data envelope.",
  "entries": [
    {
      "key": "file-browser/file-tree",
      "family": "file-browser",
      "name": "FileTree",
      "label": "File tree",
      "description": "Recursive expand/collapse folder tree with ARIA treeitem roles, keyboard navigation, active selection, indent guides and badge counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/tree",
      "tags": [
        "tree",
        "navigation",
        "folders",
        "keyboard"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/file-card",
      "family": "file-browser",
      "name": "FileCard",
      "label": "File card",
      "description": "Selectable thumbnail card showing a file's preview image or type-icon fallback, name, formatted size, modified time and an actions menu button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/card",
      "tags": [
        "card",
        "thumbnail",
        "selectable"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/file-row",
      "family": "file-browser",
      "name": "FileRow",
      "label": "File row",
      "description": "Table-row representation of a file with type icon, name, size, modified time, owner avatar and an actions chevron button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/row",
      "tags": [
        "row",
        "table",
        "list-item"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/file-grid-view",
      "family": "file-browser",
      "name": "FileGridView",
      "label": "File grid view",
      "description": "Listbox grid of FileCards with controlled/uncontrolled multi-select supporting click, cmd/ctrl toggle and shift range selection plus an empty state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/grid-view",
      "tags": [
        "grid",
        "multi-select",
        "listbox",
        "view"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/file-list-view",
      "family": "file-browser",
      "name": "FileListView",
      "label": "File list view",
      "description": "Sortable file table of FileRows with name/size/modified/owner columns, tri-state aria-sort headers and multi-select selection state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/list-view",
      "tags": [
        "table",
        "sortable",
        "list",
        "view"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/folder-breadcrumb",
      "family": "file-browser",
      "name": "FolderBreadcrumb",
      "label": "Folder breadcrumb",
      "description": "Folder path breadcrumb that collapses middle segments into a popover overflow menu via ResizeObserver below a width threshold.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/breadcrumb",
      "tags": [
        "breadcrumb",
        "navigation",
        "overflow",
        "responsive"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/file-preview-pane",
      "family": "file-browser",
      "name": "FilePreviewPane",
      "label": "File preview pane",
      "description": "Sidebar preview aside showing a file's image/type-icon, kind chip, metadata list, collapsible properties and download/share/delete actions, with an empty state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/preview-pane",
      "tags": [
        "preview",
        "metadata",
        "sidebar",
        "details"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/upload-drop-zone",
      "family": "file-browser",
      "name": "UploadDropZone",
      "label": "Upload drop zone",
      "description": "Drag-and-drop upload surface with browse input, aggregate speed/ETA summary, queued/uploading/done segmented tabs and per-file progress bars.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/upload-drop-zone",
      "tags": [
        "upload",
        "drag-drop",
        "progress",
        "queue"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/file-context-menu",
      "family": "file-browser",
      "name": "FileContextMenu",
      "label": "File context menu",
      "description": "Right-click context-menu wrapper positioning a menu at the cursor with open/rename/move/copy/share/download/delete actions and keyboard shortcuts.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/context-menu",
      "tags": [
        "context-menu",
        "actions",
        "right-click",
        "shortcuts"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/bulk-action-bar",
      "family": "file-browser",
      "name": "BulkActionBar",
      "label": "Bulk action bar",
      "description": "Selection action bar that appears when items are selected, showing a count and download/move/tag/delete bulk actions plus a clear-selection button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/bulk-action-bar",
      "tags": [
        "bulk",
        "selection",
        "actions",
        "toolbar"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/media-lightbox",
      "family": "file-browser",
      "name": "MediaLightbox",
      "label": "Media lightbox",
      "description": "Full-screen dialog lightbox for media assets with prev/next navigation, zoom, toggleable info pane, keyboard shortcuts and a thumbnail strip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/media-lightbox",
      "tags": [
        "lightbox",
        "gallery",
        "dialog",
        "zoom"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/file-type-icon",
      "family": "file-browser",
      "name": "FileTypeIcon",
      "label": "File type icon",
      "description": "SVG icon rendering a distinct glyph per file kind (image, video, audio, pdf, doc, sheet, slide, archive, code, 3d-model, cad, generic) at sm/md/lg sizes.",
      "kind": "icon",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/file-type-icon",
      "tags": [
        "icon",
        "file-type",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/inline-rename",
      "family": "file-browser",
      "name": "InlineRename",
      "label": "Inline rename",
      "description": "Click-to-edit filename field that selects the base name, validates against forbidden characters and length, and commits on Enter/blur or cancels on Esc.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/inline-rename",
      "tags": [
        "rename",
        "inline-edit",
        "validation"
      ],
      "status": "captured"
    },
    {
      "key": "file-browser/version-history",
      "family": "file-browser",
      "name": "VersionHistory",
      "label": "Version history",
      "description": "Vertical timeline of file versions with author avatar, timestamp, change summary, size delta and a restore button on non-current versions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/file-browser",
      "routeHref": "/ui-primitives/file-browser/version-history",
      "tags": [
        "versions",
        "timeline",
        "history",
        "restore"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
