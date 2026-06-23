import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SearchResultPerson } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "Person result | UI Primitives — Search",
}

export default function ResultPersonPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 11"
        title="Person result"
        description="Search result variant for the people directory — initials avatar fallback, presence dot, name, role and workshop labels, and quick contact actions (email, phone, chat)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Person result" },
        ]}
      />
      <section className={styles.canvas} aria-label="Person result demo">
        <div className={styles.note}>
          <span>Avatars</span>
          <p>
            Pass <code>avatarUrl</code> for a photo or rely on the initials fallback (derived from
            the first two name parts). The presence dot lives in the bottom-right notch of the
            avatar.
          </p>
        </div>
        <div className={styles.stage}>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <SearchResultPerson
              name="Brent Holloway"
              role="Senior technician"
              workshop="Bay 01 · Oak Flats"
              email="brent@mufflermen.au"
              phone="+61400000001"
              chatHref="#"
              available={true}
            />
            <SearchResultPerson
              name="Casey Maguire"
              role="Diagnostics specialist"
              workshop="Bay 02 · Oak Flats"
              email="casey@mufflermen.au"
              chatHref="#"
              available={true}
            />
            <SearchResultPerson
              name="Liv Bartolomeo"
              role="Workshop manager"
              workshop="Floor · Oak Flats"
              email="liv@mufflermen.au"
              phone="+61400000002"
              available={false}
            />
            <SearchResultPerson
              name="Tarn Wilkins"
              role="Apprentice fitter"
              workshop="Bay 03 · Oak Flats"
              chatHref="#"
              available={true}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
