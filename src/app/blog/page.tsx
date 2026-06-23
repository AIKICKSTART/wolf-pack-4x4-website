import type { Metadata } from "next"
import Link from "next/link"
import { RichText } from "@payloadcms/richtext-lexical/react"

import { hasBlocks, isBlockCmsEnabled } from "@/lib/cms/blocks/flags"
import { RenderBlocks } from "@/lib/cms/blocks/render-registry"
import {
  blogPostPath,
  contentOverrideMetadata,
  formatCmsDate,
  getPublishedBlogPosts,
  getPublishedContentOverrideByPath,
  topicLabels,
} from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import type { CmsBlogPost, CmsContentOverride } from "@/lib/cms/types"
import { CmsBreadcrumbs, CmsContactBand, CmsHero, CmsPageShell } from "@/lib/cms/public-ui"
import { JsonLd } from "@/components/mufflermen/json-ld"
import { blogIndexJsonLd, breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const dynamic = "force-dynamic"

const fallbackMetadata: Metadata = {
  title: "Workshop Blog",
  description:
    "Published Wolfpack 4x4 workshop articles, 4x4 upgrade guides and campaign updates from the CMS.",
  alternates: pageAlternates("/blog"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/blog")
  return contentOverrideMetadata(override, fallbackMetadata, "/blog")
}

function hasRichTextContent(data: CmsContentOverride["body"]): data is NonNullable<CmsContentOverride["body"]> {
  return Array.isArray(data?.root?.children) && data.root.children.length > 0
}

function BlogOverrideContent({ override }: { override: CmsContentOverride | null }) {
  const overrideBody = override?.body
  const overrideBlocks = override?.blocks
  const body = hasRichTextContent(overrideBody) ? overrideBody : undefined
  const blocks = isBlockCmsEnabled() && hasBlocks(overrideBlocks) ? overrideBlocks : undefined

  if (!body && !blocks) return null

  return (
    <>
      {body ? <RichText className="seo-section" data={body} /> : null}
      {blocks ? (
        <section className="seo-section dashboard" aria-label="Blog CMS primitive blocks">
          <RenderBlocks blocks={blocks} updatedAt={override?.updatedAt} />
        </section>
      ) : null}
    </>
  )
}

function BlogCard({ post }: { post: CmsBlogPost }) {
  const date = formatCmsDate(post.publishedAt ?? post.updatedAt)
  const topics = topicLabels(post).slice(0, 3)

  return (
    <article className="seo-card glass">
      <span className="seo-kicker">{date ?? "Workshop article"}</span>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      {topics.length > 0 && (
        <div className="seo-link-cloud" aria-label="Topics">
          {topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      )}
      <Link href={blogPostPath(post)}>Read article</Link>
    </article>
  )
}

export default async function BlogPage() {
  const [posts, siteSettings, contentOverride] = await Promise.all([
    getPublishedBlogPosts(),
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/blog"),
  ])

  return (
    <CmsPageShell settings={siteSettings}>
      <JsonLd
        data={blogIndexJsonLd(
          posts.map((post) => ({
            title: post.title,
            path: blogPostPath(post),
            datePublished: post.publishedAt ?? null,
          })),
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ])}
      />
      <CmsBreadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
      <CmsHero
        className="blog-post-hero"
        eyebrow="Workshop blog"
        settings={siteSettings}
        title="4x4 upgrade advice and workshop updates"
        description="Practical 4x4 advice, build stories and workshop updates from Wolfpack 4x4."
      />
      <BlogOverrideContent override={contentOverride} />

      {posts.length > 0 ? (
        <section className="seo-grid">
          {posts.map((post) => (
            <BlogCard key={post.id ?? post.slug} post={post} />
          ))}
        </section>
      ) : (
        <section className="seo-section">
          <h2>New articles on the way</h2>
          <p className="seo-empty">
            We&apos;re writing up workshop guides, build stories and 4x4 advice now. Check back soon, or call the
            workshop on 02 4256 9256 with any 4x4 upgrade question.
          </p>
        </section>
      )}

      <CmsContactBand settings={siteSettings} />
    </CmsPageShell>
  )
}
