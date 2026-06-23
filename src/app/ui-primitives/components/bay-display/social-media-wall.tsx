import Image from "next/image"
import { Camera, Heart, MessageCircle } from "lucide-react"

import styles from "./social-media-wall.module.css"

export type SocialPlatform = "instagram" | "facebook" | "tiktok"

export interface SocialPost {
  id: string
  platform: SocialPlatform
  /** Handle without the @ — "oakflats.mufflermen". */
  handle: string
  /** Image source url — Next/Image-friendly. */
  imageSrc: string
  /** Image alt text for accessibility. */
  imageAlt: string
  /** Caption snippet — 1–2 lines max. */
  caption: string
  /** Likes count. */
  likes: number
  /** Comments count. */
  comments: number
}

export interface SocialMediaWallProps {
  posts: ReadonlyArray<SocialPost>
  /** Wall heading — defaults to "On the socials". */
  heading?: string
  className?: string
}

const PLATFORM_LABEL: Readonly<Record<SocialPlatform, string>> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
}

export function SocialMediaWall({
  posts,
  heading = "On the socials",
  className,
}: SocialMediaWallProps) {
  const classes = [styles.wall, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={heading}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Camera size={16} strokeWidth={2.4} aria-hidden="true" />
          Follow @oakflats.mufflermen
        </span>
        <h2 className={styles.heading}>{heading}</h2>
      </header>
      <ol className={styles.grid}>
        {posts.map((post) => (
          <li key={post.id} className={styles.post}>
            <div className={styles.media}>
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className={styles.img}
              />
              <span className={styles.platform}>
                {PLATFORM_LABEL[post.platform]}
              </span>
            </div>
            <div className={styles.body}>
              <strong className={styles.handle}>@{post.handle}</strong>
              <p className={styles.caption}>{post.caption}</p>
              <div className={styles.stats}>
                <span>
                  <Heart size={14} strokeWidth={2.4} aria-hidden="true" />
                  <em className={styles.tabular}>{post.likes}</em>
                </span>
                <span>
                  <MessageCircle size={14} strokeWidth={2.4} aria-hidden="true" />
                  <em className={styles.tabular}>{post.comments}</em>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default SocialMediaWall
