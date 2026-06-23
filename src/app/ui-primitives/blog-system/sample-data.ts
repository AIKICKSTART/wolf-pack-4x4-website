import type {
  BlogBodyBlock,
  BlogCategory,
  BlogPostSummary,
  ShareTarget,
  TocEntry,
} from "../components/blog-system"

export const CATEGORIES: ReadonlyArray<BlogCategory> = [
  { id: "workshop", label: "Workshop", accent: "red" },
  { id: "exhaust-tech", label: "Exhaust tech", accent: "amber" },
  { id: "builds", label: "Builds", accent: "teal" },
  { id: "owners-guide", label: "Owner's guide", accent: "green" },
]

const MACCA = {
  name: "Macca Reyes",
  role: "Head fabricator",
  bio: "Twenty-two years bending pipe at Oak Flats. If it has a flange and a flow problem, Macca has already cut it open.",
}

const DELLA = {
  name: "Della Nguyen",
  role: "Tune & dyno",
  bio: "Runs the in-house dyno cell and the AFR logs nobody else wants to read.",
}

const TRIPP = {
  name: "Tripp O'Hara",
  role: "Front-of-house",
  bio: "Books the jobs, talks the customers off the ledge, writes the owner's guides.",
}

export const POSTS: ReadonlyArray<BlogPostSummary> = [
  {
    id: "mandrel-vs-crush",
    href: "/ui-primitives/blog-system",
    title: "Mandrel vs crush bends: where your flow actually goes",
    excerpt:
      "A crush bend looks fine from the outside and chokes the gas the moment it turns. We cut three identical 2.5-inch sections and put them on the flow bench to settle the workshop argument once and for all.",
    imageAlt: "A row of polished mandrel-bent exhaust pipes on the workshop bench.",
    categoryId: "exhaust-tech",
    categoryLabel: "Exhaust tech",
    accent: "amber",
    author: MACCA,
    date: "2026-05-21",
    readingMinutes: 8,
    featured: true,
  },
  {
    id: "manta-cat-back",
    href: "/ui-primitives/blog-system",
    title: "Building a stainless cat-back for a daily-driven ute",
    excerpt:
      "Quiet at the lights, mean at full noise, and no drone on the highway run to Wollongong. Here's the full bend-by-bend on the 409 stainless system we built last week.",
    imageAlt: "A stainless cat-back exhaust system laid out before welding.",
    categoryId: "builds",
    categoryLabel: "Builds",
    accent: "teal",
    author: MACCA,
    date: "2026-05-14",
    readingMinutes: 11,
  },
  {
    id: "drone-fix",
    href: "/ui-primitives/blog-system",
    title: "Killing cabin drone without killing the note",
    excerpt:
      "That 2,200 rpm drone on the freeway is a standing wave, not a personality flaw. Helmholtz resonators, a quarter-wave tube, and where we actually put them.",
    imageAlt: "A Helmholtz resonator welded into an exhaust mid-pipe.",
    categoryId: "exhaust-tech",
    categoryLabel: "Exhaust tech",
    accent: "amber",
    author: DELLA,
    date: "2026-05-07",
    readingMinutes: 7,
  },
  {
    id: "rust-rescue",
    href: "/ui-primitives/blog-system",
    title: "Rust rescue: when to patch and when to replace",
    excerpt:
      "Salt air off the lake eats mild-steel systems from the inside. A field guide to the tap test, the honest quote, and why we'll talk you out of a patch that won't last the warranty.",
    imageAlt: "A corroded muffler section being inspected on a hoist.",
    categoryId: "owners-guide",
    categoryLabel: "Owner's guide",
    accent: "green",
    author: TRIPP,
    date: "2026-04-29",
    readingMinutes: 6,
  },
  {
    id: "weld-cell-upgrade",
    href: "/ui-primitives/blog-system",
    title: "What changed when we re-laid out the weld cell",
    excerpt:
      "New TIG bench, a back-purge manifold, and a fixture table that finally squares the work. A look at how the bay changed and what it does for turnaround.",
    imageAlt: "The Oak Flats weld cell after its refit, TIG torch on the bench.",
    categoryId: "workshop",
    categoryLabel: "Workshop",
    accent: "red",
    author: MACCA,
    date: "2026-04-22",
    readingMinutes: 5,
  },
  {
    id: "headers-explained",
    href: "/ui-primitives/blog-system",
    title: "Headers, extractors, and the myth of the free pony",
    excerpt:
      "Equal-length, tri-Y, four-into-one — the geometry that actually moves the dyno line, and the marketing that doesn't. With real numbers from our own cell.",
    imageAlt: "A set of equal-length headers mocked up on an engine.",
    categoryId: "exhaust-tech",
    categoryLabel: "Exhaust tech",
    accent: "amber",
    author: DELLA,
    date: "2026-04-15",
    readingMinutes: 9,
  },
]

export const TOC: ReadonlyArray<TocEntry> = [
  { id: "the-argument", label: "The bench argument" },
  { id: "the-test", label: "How we tested it" },
  { id: "the-numbers", label: "What the numbers said" },
  { id: "the-verdict", label: "The verdict" },
]

export const SHARE_TARGETS: ReadonlyArray<ShareTarget> = [
  { id: "copy", label: "Copy link" },
  { id: "x", label: "Share on X", href: "#" },
  { id: "facebook", label: "Share on Facebook", href: "#" },
  { id: "linkedin", label: "Share on LinkedIn", href: "#" },
  { id: "email", label: "Share by email", href: "#" },
]

export const POST_BODY: ReadonlyArray<BlogBodyBlock> = [
  {
    kind: "lede",
    text: "Every workshop has the same argument on a quiet Friday: does a crush bend really cost you anything if the diameter's right? We stopped arguing and put it on the flow bench.",
  },
  {
    kind: "heading",
    id: "the-argument",
    text: "The bench argument",
  },
  {
    kind: "paragraph",
    text: "A crush bend pinches the inside radius of the tube as it turns. The nominal diameter is still 2.5 inches on the straights, but at the apex of the bend the cross-section collapses to an oval — and gas does not like turning a sharp corner through a smaller hole. A mandrel bend keeps a round, full-bore section all the way through the curve because a steel ball is drawn through the tube while it forms.",
  },
  {
    kind: "list",
    items: [
      "Crush bend: cheap, fast, fine on a low-flow mild-steel muffler.",
      "Mandrel bend: holds full bore, costs more, earns it under load.",
      "Where it matters most: the first three bends off the collector.",
    ],
  },
  {
    kind: "pullQuote",
    text: "The pipe diameter on the box is a promise the crush bend quietly breaks at every corner.",
    attribution: "Macca, on the flow bench",
  },
  {
    kind: "heading",
    id: "the-test",
    text: "How we tested it",
  },
  {
    kind: "paragraph",
    text: "We cut three 2.5-inch sections to the same length, each with a single 90-degree bend: one crush, one press-formed, one mandrel. Same flow bench, same depression, same operator. We logged CFM at a fixed pressure drop and ran each section three times to average out the noise.",
  },
  {
    kind: "media",
    src: "",
    alt: "Three exhaust bend samples clamped to the flow bench.",
    caption: "The three samples — crush, press, and mandrel — clamped to the same fixture.",
  },
  {
    kind: "heading",
    id: "the-numbers",
    text: "What the numbers said",
  },
  {
    kind: "paragraph",
    text: "The mandrel section flowed roughly 14 percent more than the crush bend at the same pressure drop. The press-formed section landed in the middle, closer to the mandrel than most of the crew guessed. On a single bend that gap sounds small — but a typical cat-back has six to nine direction changes, and the losses stack.",
  },
  {
    kind: "heading",
    id: "the-verdict",
    text: "The verdict",
  },
  {
    kind: "paragraph",
    text: "For a quiet daily that never sees the top of the tacho, a well-made press-formed system is honest value. For anything that breathes hard — a tuned engine, a tow rig under load, a build going on the dyno — mandrel pays for itself in the first three bends. We'll always tell you which one your car actually needs.",
  },
]
