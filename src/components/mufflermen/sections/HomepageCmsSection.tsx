import Link from "next/link"

import type { HomepageCmsContent } from "../shared/types"

export function HomepageCmsSection({ content }: { content: HomepageCmsContent }) {
  const campaign = content.campaign
  const posts = content.posts

  if (!campaign && posts.length === 0) return null

  return (
    <section className="section homepage-cms" aria-labelledby="homepage-cms-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ Updates ] Latest from the bay</div>
            <h2
              id="homepage-cms-title"
              className="display display-md"
              style={{ marginTop: 18, maxWidth: 760 }}
            >
              Workshop advice and current builds.
            </h2>
          </div>
          <p className="lead">
            Fresh workshop notes and selected campaigns sit beside the main
            booking paths, so customers can still move straight to services,
            parts and local coverage.
          </p>
        </div>

        <div
          className={`homepage-cms-grid ${
            campaign && posts.length > 0 ? "two-col" : ""
          }`}
        >
          {campaign && (
            <article className="homepage-cms-feature glass reveal">
              <span className="tag red">{campaign.eyebrow}</span>
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <Link className="btn btn-chrome" href={campaign.href}>
                <span>View campaign</span>
                <span className="arrow" />
              </Link>
            </article>
          )}

          {posts.length > 0 && (
            <div className="homepage-cms-post-column reveal d1">
              <div className="homepage-cms-post-head">
                <span className="label">Workshop notes</span>
                <Link href="/blog">All articles</Link>
              </div>
              <div className="homepage-cms-posts">
                {posts.map((post) => (
                  <article key={post.href} className="homepage-cms-card neumo">
                    <div>
                      <span className="homepage-cms-meta">
                        {post.publishedLabel ?? "Workshop advice"}
                      </span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                    </div>
                    <div className="homepage-cms-card-foot">
                      {post.topics.length > 0 && (
                        <div className="homepage-cms-topics" aria-label="Topics">
                          {post.topics.map((topic) => (
                            <span key={topic}>{topic}</span>
                          ))}
                        </div>
                      )}
                      <Link href={post.href}>Read article</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
