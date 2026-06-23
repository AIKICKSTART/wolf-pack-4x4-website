import type { Metadata } from "next";
import { Archivo, Saira_Condensed, Spline_Sans_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import { RefreshRouteOnSave } from "@/components/cms/refresh-route-on-save";
import { getSeoSettings } from "@/lib/cms/seo-settings";
import { siteUrl } from "@/lib/site-data";
import { siteImages } from "@/lib/site-assets";
import "./globals.css";
import "./mufflermen.css";
import "./mufflermen-polish.css";

// Public-site faces only: Saira Condensed display, Archivo variable
// super-family (wdth axis drives condensed↔expanded across themes), Spline
// Sans Mono. Control and /ui-primitives load their own faces in nested
// layouts so the customer-facing pages don't pay for 8 font families.
const sairaCondensed = Saira_Condensed({
  weight: ["500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--ff-saira",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--ff-archivo",
  display: "swap",
});

const splineMono = Spline_Sans_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--ff-spline-mono",
  display: "swap",
});

// Site-wide metadata is editable via the CMS "SEO settings" global; the
// resolver falls back to these exact literals when the CMS is unavailable.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate,
    },
    description: seo.defaultDescription,
    applicationName: "Wolfpack 4x4",
    ...(seo.verification.google || seo.verification.bing
      ? {
          verification: {
            ...(seo.verification.google ? { google: seo.verification.google } : {}),
            ...(seo.verification.bing ? { other: { "msvalidate.01": seo.verification.bing } } : {}),
          },
        }
      : {}),
    openGraph: {
      title: "Wolfpack 4x4",
      description:
        "Performance 4x4 upgrades, suspension, protection, recovery gear, lighting, towing support and parts in the Illawarra.",
      url: siteUrl,
      siteName: "Wolfpack 4x4",
      images: [
        {
          url: seo.defaultOgImageUrl ?? siteImages.openGraph,
          width: 1600,
          height: 900,
          alt: "Wolfpack 4x4 upgrades and brand cover",
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Wolfpack 4x4",
      description:
        "Performance 4x4 upgrades, parts and accessories across the Illawarra.",
      images: [seo.defaultOgImageUrl ?? siteImages.openGraph],
    },
    robots: seo.robots.siteNoIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en-AU"
      className={`${sairaCondensed.variable} ${archivo.variable} ${splineMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const key = "ofm-primitives-theme"; const presetKey = "ofm-primitives-theme-preset"; const assignmentsKey = "ofm-primitives-theme-assignments-v3"; const saved = localStorage.getItem(key); const theme = saved === "dark" ? "dark" : "light"; const preset = theme === "dark" ? "mufflermen-classic" : "heritage-cream"; const root = document.documentElement; root.dataset.mufflermenTheme = theme; root.dataset.primitiveTheme = theme; root.dataset.primitiveThemeChoice = theme; root.classList.toggle("dark", theme === "dark"); root.style.colorScheme = theme; localStorage.setItem(presetKey, preset); localStorage.setItem(assignmentsKey, JSON.stringify({ dark: "mufflermen-classic", light: "heritage-cream", system: "auto" })); } catch (_) {} })();`,
          }}
        />
        {isDraftMode ? (
          <>
            <RefreshRouteOnSave serverURL={siteUrl} />
            <Link
              href="/api/exit-preview"
              prefetch={false}
              style={{
                position: "fixed",
                right: 12,
                bottom: 12,
                zIndex: 9999,
                padding: "8px 14px",
                borderRadius: 999,
                background: "#008cff",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Exit preview
            </Link>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
