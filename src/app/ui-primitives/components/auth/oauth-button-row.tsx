"use client"

import type { ReactNode } from "react"

import styles from "./oauth-button-row.module.css"

export type OauthProvider = "google" | "apple" | "github" | "microsoft"

export interface OauthButtonRowProps {
  providers?: OauthProvider[]
  expanded?: boolean
  onSelect?: (provider: OauthProvider) => void
  className?: string
}

interface ProviderMeta {
  label: string
  icon: ReactNode
  className: string
}

const PROVIDER_META: Record<OauthProvider, ProviderMeta> = {
  google: {
    label: "Google",
    className: "providerGoogle",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.61z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.87-3.05.87-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.96 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.28-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3-2.33z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.95l3 2.33C4.67 5.16 6.66 3.58 9 3.58z"
        />
      </svg>
    ),
  },
  apple: {
    label: "Apple",
    className: "providerApple",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true" fill="#f4f4f6">
        <path d="M13.04 9.55c-.02-2.06 1.68-3.05 1.76-3.1-.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.47.74-3.12.74-.64 0-1.63-.72-2.69-.7-1.38.02-2.66.8-3.37 2.04-1.44 2.5-.37 6.2 1.03 8.23.69.99 1.5 2.1 2.56 2.06 1.03-.04 1.42-.66 2.66-.66 1.24 0 1.59.66 2.68.64 1.11-.02 1.81-1 2.49-2 .79-1.15 1.11-2.26 1.13-2.32-.03-.01-2.16-.83-2.18-3.31zM10.99 3.65c.57-.69.95-1.65.85-2.6-.82.03-1.81.55-2.4 1.23-.53.61-1 1.58-.87 2.52.91.07 1.84-.47 2.42-1.15z" />
      </svg>
    ),
  },
  github: {
    label: "GitHub",
    className: "providerGithub",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true" fill="#d8dde6">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 0a9 9 0 0 0-2.84 17.54c.45.08.62-.2.62-.43v-1.52c-2.5.55-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.81-.55.06-.54.06-.54.9.06 1.37.93 1.37.93.8 1.36 2.1.97 2.61.74.08-.58.31-.97.57-1.2-2-.22-4.1-1-4.1-4.46 0-.98.35-1.79.93-2.42-.09-.23-.4-1.15.09-2.4 0 0 .75-.25 2.47.93A8.5 8.5 0 0 1 9 4.4c.77 0 1.54.1 2.26.3 1.72-1.18 2.47-.93 2.47-.93.49 1.25.18 2.17.09 2.4.58.63.93 1.44.93 2.42 0 3.47-2.1 4.23-4.1 4.45.32.28.6.83.6 1.67v2.47c0 .24.16.52.62.43A9 9 0 0 0 9 0z"
        />
      </svg>
    ),
  },
  microsoft: {
    label: "Microsoft",
    className: "providerMicrosoft",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
        <rect x="1" y="1" width="7.5" height="7.5" fill="#f25022" />
        <rect x="9.5" y="1" width="7.5" height="7.5" fill="#7fba00" />
        <rect x="1" y="9.5" width="7.5" height="7.5" fill="#00a4ef" />
        <rect x="9.5" y="9.5" width="7.5" height="7.5" fill="#ffb900" />
      </svg>
    ),
  },
}

const DEFAULT_PROVIDERS: OauthProvider[] = ["google", "apple", "github", "microsoft"]

export function OauthButtonRow({
  providers = DEFAULT_PROVIDERS,
  expanded = false,
  onSelect,
  className,
}: OauthButtonRowProps) {
  const rowClasses = [styles.row, expanded && styles.expanded, className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={rowClasses} role="group" aria-label="Sign in with a provider">
      {providers.map((provider) => {
        const meta = PROVIDER_META[provider]
        const buttonClasses = [styles.button, styles[meta.className]]
          .filter(Boolean)
          .join(" ")

        return (
          <button
            key={provider}
            type="button"
            className={buttonClasses}
            aria-label={`Continue with ${meta.label}`}
            onClick={() => onSelect?.(provider)}
          >
            <span className={styles.icon}>{meta.icon}</span>
            <span className={styles.label}>{meta.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default OauthButtonRow
