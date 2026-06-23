import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    ".codex-tmp/**",
    ".remember/**",
    "tools/design-pkg/**",
    "next-env.d.ts",
    // Local source-build/reference clones and runtime state:
    "infra/hermes-marketing-stack/repos/**",
    "infra/hermes-marketing-stack/data/**",
    "infra/hermes-marketing-stack/workspace/**",
    "infra/supabase-upstream/**",
    "infra/supabase-selfhost/volumes/db/data/**",
    "infra/supabase-selfhost/volumes/storage/**",
  ]),
]);

export default eslintConfig;
