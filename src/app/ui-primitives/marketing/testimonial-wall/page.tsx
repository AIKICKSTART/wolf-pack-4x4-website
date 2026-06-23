import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TestimonialWall, type TestimonialEntry } from "../../components/marketing/testimonial-wall"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Testimonial wall | Marketing Blocks",
  description:
    "Primitive 04 — masonry-style testimonial grid with varied card heights, avatars, and ratings.",
}

const ENTRIES: ReadonlyArray<TestimonialEntry> = [
  {
    id: "01",
    quote: "Catback fitted in a morning. Sounds factory at idle, deep on boost. Joints look like jewellery.",
    name: "Dale Munro",
    role: "Albion Park · Ranger XLT",
    tone: "red",
    rating: 5,
    span: "regular",
  },
  {
    id: "02",
    quote: "Took our caravan tow rig in for a noise check. Found the cracked flange, rewelded under TIG, and didn't pad the bill.",
    name: "Sue Hennessey",
    role: "Shellharbour · Iveco Daily caravan",
    tone: "amber",
    rating: 5,
    span: "tall",
  },
  {
    id: "03",
    quote: "Mobile bay came to my Kiama yard. Welded a stainless tip on the spot. Cleaned up better than any shop I've used.",
    name: "Tom Davies",
    role: "Kiama · HiLux SR5",
    tone: "teal",
    rating: 5,
    span: "short",
  },
  {
    id: "04",
    quote: "Manta install on the BT-50. Boys at Oak Flats matched the bracket pattern and threw in the dyno sheet. ADR sticker included.",
    name: "Aaron Cope",
    role: "Wollongong · Mazda BT-50",
    tone: "green",
    rating: 5,
    span: "regular",
  },
  {
    id: "05",
    quote: "Welds have held twelve years. No cracks on the cat, no leaks at the flange. Best stainless work on the South Coast.",
    name: "Glenys Watson",
    role: "Oak Flats · HQ Premier",
    tone: "obsidian",
    rating: 5,
    span: "tall",
  },
  {
    id: "06",
    quote: "Quoted on Monday. Booked Wednesday. Done by Friday lunch. Honest pricing, no padded labour hours.",
    name: "Brent Sialana",
    role: "Dapto · Triton GLS",
    tone: "red",
    rating: 5,
    span: "short",
  },
  {
    id: "07",
    quote: "Got the kerbside tip blued and polished. The lads explained every weld pass. First catback I've actually shown off.",
    name: "Lisa Trent",
    role: "Warilla · Mustang GT",
    tone: "amber",
    rating: 5,
    span: "regular",
  },
]

export default function TestimonialWallPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Testimonial wall"
        title="Testimonial wall"
        description="Masonry-style testimonial grid with three card heights and a five-star rating row. Avatars reuse the Avatar primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Testimonial wall" },
        ]}
      />

      <TestimonialWall
        kicker="What our drivers say"
        heading="Five-star reviews from Illawarra utes, caravans, and old-school muscle."
        body="Real reviews from the Mufflermen book. Hand-picked across the South Coast."
        entries={ENTRIES}
      />
    </main>
  )
}
