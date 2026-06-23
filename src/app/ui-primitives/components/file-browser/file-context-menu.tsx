"use client"

import {
  Copy,
  Download,
  FolderInput,
  Pencil,
  Share2,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react"
import { useState, type MouseEvent, type ReactNode } from "react"

import { Kbd, KbdGroup } from "../primitives/kbd"

import styles from "./file-context-menu.module.css"

export type FileContextAction =
  | "open"
  | "rename"
  | "move"
  | "copy"
  | "share"
  | "download"
  | "delete"

interface FileContextMenuProps {
  children: ReactNode
  onAction?: (action: FileContextAction) => void
  className?: string
}

interface MenuItem {
  id: FileContextAction
  label: string
  icon: ReactNode
  shortcut: ReadonlyArray<string>
  destructive?: boolean
}

const ITEMS: ReadonlyArray<MenuItem> = [
  {
    id: "open",
    label: "Open",
    icon: <SquareArrowOutUpRight size={14} strokeWidth={2.2} />,
    shortcut: ["↵"],
  },
  {
    id: "rename",
    label: "Rename",
    icon: <Pencil size={14} strokeWidth={2.2} />,
    shortcut: ["F2"],
  },
  {
    id: "move",
    label: "Move to…",
    icon: <FolderInput size={14} strokeWidth={2.2} />,
    shortcut: ["⌘", "X"],
  },
  {
    id: "copy",
    label: "Copy",
    icon: <Copy size={14} strokeWidth={2.2} />,
    shortcut: ["⌘", "C"],
  },
  {
    id: "share",
    label: "Share",
    icon: <Share2 size={14} strokeWidth={2.2} />,
    shortcut: ["⌘", "S"],
  },
  {
    id: "download",
    label: "Download",
    icon: <Download size={14} strokeWidth={2.2} />,
    shortcut: ["⌘", "↓"],
  },
  {
    id: "delete",
    label: "Delete",
    icon: <Trash2 size={14} strokeWidth={2.2} />,
    shortcut: ["⌫"],
    destructive: true,
  },
]

export function FileContextMenu({
  children,
  onAction,
  className,
}: FileContextMenuProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setOpen(true)
  }

  const close = () => setOpen(false)

  const handleSelect = (action: FileContextAction) => {
    setOpen(false)
    onAction?.(action)
  }

  return (
    <div
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      onContextMenu={handleContextMenu}
    >
      {children}

      {open ? (
        <div
          className={styles.backdrop}
          aria-hidden="true"
          onClick={close}
          onContextMenu={(event) => {
            event.preventDefault()
            close()
          }}
        />
      ) : null}

      {open ? (
        <div
          role="menu"
          aria-label="File context menu"
          className={styles.menu}
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") close()
          }}
        >
          {ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className={[
                styles.item,
                item.destructive ? styles.itemDestructive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(item.id)}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.shortcut} aria-hidden="true">
                <KbdGroup size="sm" separator="">
                  {item.shortcut.map((key) => (
                    <Kbd key={key} size="sm">
                      {key}
                    </Kbd>
                  ))}
                </KbdGroup>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FileContextMenu
