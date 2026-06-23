/**
 * Shared types for the dev-experience / SDK-docs primitive group.
 *
 * Every component under `dev-experience/` references these so that
 * package managers, code languages, auth methods, rate-limit tones, and
 * SDK channels speak a single vocabulary without leaking `any`.
 */

/** Supported package manager identifiers — drives sdk-install-snippet tabs. */
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

/** Code language identifier — used by the multi-language switcher + tagged code blocks. */
export type CodeLanguage =
  | "typescript"
  | "javascript"
  | "json"
  | "python"
  | "go"
  | "ruby"
  | "curl"

/** Auth-snippet variants supported by auth-snippet-card. */
export type AuthMethod = "bearer" | "api-key" | "mtls" | "oidc"

/** Tone used by rate-limit-error-card chips + Retry-After badge. */
export type RateLimitTone = "warning" | "critical" | "info"

/** SDK release channel — drives sdk-version-selector chips. */
export type SdkChannel = "stable" | "beta" | "canary"

/** Categorised chip label inside a changelog row. */
export type ChangelogCategory =
  | "added"
  | "changed"
  | "fixed"
  | "deprecated"
  | "removed"

/** Tab kind rendered by output-preview-pane. */
export type OutputStream = "stdout" | "stderr" | "network" | "json"

/** OpenAPI HTTP verb — drives openapi-explorer method chip tone. */
export type OpenApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

/** Human-readable label for each package manager. */
export const PACKAGE_MANAGER_LABEL: Record<PackageManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
}

/** Human-readable label for each language. */
export const CODE_LANGUAGE_LABEL: Record<CodeLanguage, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  json: "JSON",
  python: "Python",
  go: "Go",
  ruby: "Ruby",
  curl: "cURL",
}

/** Human-readable label for each auth method. */
export const AUTH_METHOD_LABEL: Record<AuthMethod, string> = {
  bearer: "Bearer token",
  "api-key": "API key",
  mtls: "Mutual TLS",
  oidc: "OIDC",
}

/** Human-readable label for each changelog category. */
export const CHANGELOG_CATEGORY_LABEL: Record<ChangelogCategory, string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  deprecated: "Deprecated",
  removed: "Removed",
}

/** Human-readable label for each output stream. */
export const OUTPUT_STREAM_LABEL: Record<OutputStream, string> = {
  stdout: "stdout",
  stderr: "stderr",
  network: "network",
  json: "json",
}

/** Build the install command for the chosen package manager + package name. */
export function buildInstallCommand(manager: PackageManager, pkg: string): string {
  switch (manager) {
    case "npm":
      return `npm install ${pkg}`
    case "pnpm":
      return `pnpm add ${pkg}`
    case "yarn":
      return `yarn add ${pkg}`
    case "bun":
      return `bun add ${pkg}`
  }
}
