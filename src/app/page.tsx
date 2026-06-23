import type { Metadata } from "next";

import { RichText } from "@payloadcms/richtext-lexical/react";

import { JsonLd } from "@/components/mufflermen/json-ld";
import { MufflermenSite } from "@/components/mufflermen/mufflermen-site";
import { hasBlocks, isBlockCmsEnabled } from "@/lib/cms/blocks/flags";
import { RenderBlocks } from "@/lib/cms/blocks/render-registry";
import {
  contentOverrideMetadata,
  getPublishedContentOverrideByPath,
} from "@/lib/cms/content";
import type { HomepageCmsContent } from "@/lib/cms/homepage";
import { getHomepageCmsContent } from "@/lib/cms/homepage";
import { getSeoSettings } from "@/lib/cms/seo-settings";
import { absoluteUrl, homepageJsonLdWithSeo, pageAlternates } from "@/lib/seo";
import { siteImages } from "@/lib/site-assets";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: "Wolfpack 4x4 | Performance 4x4 Upgrades Illawarra",
  description:
    "Request a quote from Wolfpack 4x4 for suspension, bull bars, winches, recovery gear, lighting, towing support, touring accessories and 4x4 parts in the Illawarra.",
  alternates: pageAlternates("/"),
  openGraph: {
    title: "Wolfpack 4x4 | Upgrade Quotes and 4x4 Parts",
    description:
      "Call or send vehicle details for suspension, protection, recovery, lighting, touring accessories and 4x4 parts from Albion Park Rail.",
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: siteImages.openGraph,
        width: 1600,
        height: 900,
        alt: "Wolfpack 4x4 services and brand cover",
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/");
  return contentOverrideMetadata(override, fallbackMetadata, "/");
}

function HomepageCmsPrimitiveContent({ content }: { content: HomepageCmsContent }) {
  const body = content.body;
  const blocks = isBlockCmsEnabled() && hasBlocks(content.blocks) ? content.blocks : undefined;

  if (!body && !blocks) return null;

  return (
    <section className="section homepage-cms-primitives" aria-label="Homepage CMS content">
      <div className="wrap homepage-cms-primitives-inner">
        {body ? <RichText className="homepage-cms-richtext glass" data={body} /> : null}
        {blocks ? (
          <div className="homepage-cms-blocks dashboard">
            <RenderBlocks blocks={blocks} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default async function Home() {
  const [homepageCms, seoSettings] = await Promise.all([getHomepageCmsContent(), getSeoSettings()]);

  return (
    <>
      <JsonLd data={homepageJsonLdWithSeo(homepageCms.settings, seoSettings)} />
      <MufflermenSite
        cmsPrimitiveContent={<HomepageCmsPrimitiveContent content={homepageCms} />}
        homepageCms={homepageCms}
      />
    </>
  );
}
