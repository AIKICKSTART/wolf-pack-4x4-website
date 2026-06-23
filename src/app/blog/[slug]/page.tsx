import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import {
  blogPostJsonLd,
  blogPostMetadata,
  blogPostPath,
  cmsMediaAlt,
  cmsMediaUrl,
  formatCmsDate,
  getPublishedBlogPostBySlug,
  topicLabels,
} from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { CmsBreadcrumbs, CmsContactBand, CmsHero, CmsPageShell, CmsRichText } from "@/lib/cms/public-ui"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedBlogPostBySlug(slug)
  return blogPostMetadata(post, slug)
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, siteSettings] = await Promise.all([
    getPublishedBlogPostBySlug(slug),
    getPublicSiteSettings(),
  ])

  if (!post) {
    notFound()
  }

  const date = formatCmsDate(post.publishedAt ?? post.updatedAt)
  const topics = topicLabels(post)
  const heroUrl = cmsMediaUrl(post.heroImage)

  return (
    <>
      <JsonLd data={blogPostJsonLd(post)} />
      <CmsPageShell settings={siteSettings}>
        <CmsBreadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: blogPostPath(post) },
          ]}
        />
        <CmsHero
          className="blog-post-hero"
          eyebrow={date ?? "Workshop article"}
          settings={siteSettings}
          title={post.title}
          description={post.excerpt}
          {...(heroUrl
            ? { cover: { src: heroUrl, alt: cmsMediaAlt(post.heroImage) ?? post.title } }
            : {})}
        />

        {topics.length > 0 && (
          <section className="seo-section">
            <h2>Topics</h2>
            <div className="seo-link-cloud">
              {topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </section>
        )}

        <CmsRichText data={post.content} fallback={post.excerpt} />
        <CmsContactBand settings={siteSettings} />
      </CmsPageShell>
    </>
  )
}
