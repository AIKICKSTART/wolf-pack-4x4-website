import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import sharp from "sharp";

import { BlogPosts } from "./collections/BlogPosts.ts";
import { ContentOverrides } from "./collections/ContentOverrides.ts";
import { Enquiries } from "./collections/Enquiries.ts";
import { MarketingApprovals } from "./collections/MarketingApprovals.ts";
import { MarketingPages } from "./collections/MarketingPages.ts";
import { Media } from "./collections/Media.ts";
import { Redirects } from "./collections/Redirects.ts";
import { SeoSettings } from "./collections/SeoSettings.ts";
import { SiteSettings } from "./collections/SiteSettings.ts";
import { Users } from "./collections/Users.ts";
import { previewPathFor } from "./lib/cms/preview.ts";

const isProduction = process.env.NODE_ENV === "production";
const isBuildWithoutDatabase = process.env.PAYLOAD_BUILD_WITHOUT_DB === "true";
const devServerURL = "http://localhost:3000";
const devPayloadSecret = "dev-only-wolfpack-payload-secret-change-before-live";
const buildOnlyDatabaseUri = "postgres://payload_cms:payload_cms@127.0.0.1:5432/wolfpack_payload";
const placeholderSecretFragments = ["change-before-live", "dev-only", "placeholder", "replace-with"];
const placeholderSecrets = new Set([
  "changeme",
  "payload-secret",
  "replace-with-32-plus-character-random-secret",
  "secret",
]);

function cleanEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function requireDatabaseUri() {
  const databaseUri = cleanEnv("DATABASE_URI");
  if (!databaseUri) {
    if (isBuildWithoutDatabase) {
      return buildOnlyDatabaseUri;
    }

    throw new Error("[payload] DATABASE_URI is required to boot Payload CMS.");
  }

  const url = new URL(databaseUri);
  if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
    throw new Error("[payload] DATABASE_URI must use the postgres:// or postgresql:// scheme.");
  }

  return databaseUri;
}

function getPayloadSecret() {
  const secret = cleanEnv("PAYLOAD_SECRET");

  if (!isProduction) {
    return secret ?? devPayloadSecret;
  }

  if (!secret) {
    throw new Error("[payload] PAYLOAD_SECRET is required in production.");
  }

  const normalizedSecret = secret.toLowerCase();
  if (
    secret.length < 32 ||
    placeholderSecrets.has(normalizedSecret) ||
    placeholderSecretFragments.some((fragment) => normalizedSecret.includes(fragment))
  ) {
    throw new Error("[payload] PAYLOAD_SECRET must be a non-placeholder production secret of at least 32 characters.");
  }

  return secret;
}

function normalizeOrigin(value: string, envName: string) {
  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`[payload] ${envName} must use http:// or https://.`);
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(`[payload] ${envName} must be an origin only, for example https://example.com.`);
  }

  return url.origin;
}

function getServerURL() {
  const configuredServerURL = cleanEnv("PAYLOAD_PUBLIC_SERVER_URL");

  if (configuredServerURL) {
    return normalizeOrigin(configuredServerURL, "PAYLOAD_PUBLIC_SERVER_URL");
  }

  if (isProduction) {
    throw new Error("[payload] PAYLOAD_PUBLIC_SERVER_URL is required in production.");
  }

  return devServerURL;
}

function getAllowedOrigins(serverURL: string) {
  const configuredOrigins = (cleanEnv("PAYLOAD_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)
    .map((origin) => normalizeOrigin(origin, "PAYLOAD_ALLOWED_ORIGINS"));

  const origins = new Set([serverURL, ...configuredOrigins]);

  if (!isProduction) {
    origins.add(devServerURL);
    origins.add("http://127.0.0.1:3000");
  }

  return [...origins];
}

const uploadTempDir = path.join(os.tmpdir(), "wolfpack-cms-uploads");
fs.mkdirSync(uploadTempDir, { recursive: true });

const databaseUri = requireDatabaseUri();
const payloadSecret = getPayloadSecret();
const serverURL = getServerURL();
const allowedOrigins = getAllowedOrigins(serverURL);

async function createPayloadConfig() {
  const { lexicalEditor } = await import("@payloadcms/richtext-lexical");

  return buildConfig({
    admin: {
      user: "users",
      meta: {
        titleSuffix: "- Wolfpack 4x4 CMS",
      },
      components: {
        graphics: {
          Icon: "/src/components/cms/admin/brand-graphics#BrandIcon",
          Logo: "/src/components/cms/admin/brand-graphics#BrandLogo",
        },
        views: {
          seoDashboard: {
            Component: "/src/components/cms/admin/seo-dashboard#SeoDashboard",
            path: "/seo-dashboard",
          },
          seoPageDetail: {
            Component: "/src/components/cms/admin/seo-page-detail#SeoPageDetail",
            path: "/seo-page",
          },
        },
      },
      livePreview: {
        url: ({ data, collectionConfig }) => {
          const path = previewPathFor(collectionConfig?.slug ?? "", data);
          const secret = process.env.PAYLOAD_PREVIEW_SECRET?.trim() ?? "";
          return `${serverURL}/api/preview?secret=${encodeURIComponent(secret)}&path=${encodeURIComponent(path)}`;
        },
        collections: ["marketing-pages", "content-overrides", "blog-posts"],
        breakpoints: [
          { label: "Mobile", name: "mobile", width: 375, height: 812 },
          { label: "Tablet", name: "tablet", width: 768, height: 1024 },
          { label: "Desktop", name: "desktop", width: 1440, height: 900 },
        ],
      },
    },
    collections: [Users, BlogPosts, MarketingPages, ContentOverrides, Redirects, Enquiries, MarketingApprovals, Media],
    cors: allowedOrigins,
    csrf: allowedOrigins,
    db: postgresAdapter({
      pool: {
        connectionString: databaseUri,
      },
    }),
    editor: lexicalEditor(),
    globals: [SiteSettings, SeoSettings],
    graphQL: {
      disable: process.env.PAYLOAD_ENABLE_GRAPHQL !== "true",
      disableIntrospectionInProduction: true,
      disablePlaygroundInProduction: true,
      maxComplexity: 80,
    },
    secret: payloadSecret,
    serverURL,
    sharp,
    upload: {
      abortOnLimit: true,
      limits: {
        // Raised from 8MB so cinematic mp4 marketing assets can be uploaded
        // through the admin media library.
        fileSize: 64 * 1024 * 1024,
      },
      responseOnLimit: "CMS uploads are limited to 64 MB.",
      safeFileNames: true,
      // Explicit temp dir: the default "./tmp" relative dir does not exist in
      // either the standalone runtime or local prod serves and breaks uploads.
      tempFileDir: uploadTempDir,
      useTempFiles: true,
    },
  });
}

export default createPayloadConfig();
