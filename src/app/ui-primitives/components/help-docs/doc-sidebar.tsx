"use client"

import Link from "next/link"
import { useState } from "react"

import styles from "./doc-sidebar.module.css"

export interface DocSidebarLink {
  label: string
  href: string
}

export interface DocSidebarSection {
  id: string
  label: string
  links: ReadonlyArray<DocSidebarLink>
  defaultOpen?: boolean
}

interface DocSidebarProps {
  sections: ReadonlyArray<DocSidebarSection>
  activeHref?: string
  ariaLabel?: string
}

export function DocSidebar({
  sections,
  activeHref,
  ariaLabel = "Documentation navigation",
}: DocSidebarProps) {
  const initialOpen: Record<string, boolean> = {}
  for (const section of sections) {
    initialOpen[section.id] = section.defaultOpen ?? true
  }
  const [open, setOpen] = useState<Record<string, boolean>>(initialOpen)

  const toggle = (id: string) => {
    setOpen((previous) => ({ ...previous, [id]: !previous[id] }))
  }

  return (
    <nav className={styles.sidebar} aria-label={ariaLabel}>
      {sections.map((section) => {
        const isOpen = open[section.id] ?? true
        return (
          <div key={section.id} className={styles.section}>
            <button
              type="button"
              className={styles.sectionToggle}
              aria-expanded={isOpen}
              aria-controls={`docs-section-${section.id}`}
              onClick={() => toggle(section.id)}
            >
              <span>{section.label}</span>
              <span className={styles.chevron} data-open={isOpen} aria-hidden="true">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6 8 10 12 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <ul id={`docs-section-${section.id}`} className={styles.links}>
                {section.links.map((link) => {
                  const isActive = link.href === activeHref
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={[styles.link, isActive ? styles.linkActive : ""]
                          .filter(Boolean)
                          .join(" ")}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default DocSidebar
