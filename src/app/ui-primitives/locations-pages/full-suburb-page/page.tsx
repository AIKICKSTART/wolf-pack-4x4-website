import type { Metadata } from "next"

import {
  DriveTimeChip,
  LastJobCompletedCard,
  LocalQuoteCtaCard,
  LocationsBreadcrumb,
  NearbyWorkshopsList,
  PostcodeChip,
  ServiceRadiusChip,
  SuburbFaq,
  SuburbFastFactsRow,
  SuburbHero,
  SuburbServicesGrid,
  SuburbTestimonial,
  SurroundingSuburbsCloud,
} from "../../components/locations-pages"
import { ButtonDnaLink } from "../../components/button-dna-link"

import {
  FAST_FACTS,
  FOCAL_SUBURB,
  NEARBY_WORKSHOPS,
  SUBURB_FAQ,
  SUBURB_SERVICES,
  SUBURB_TAGLINE,
  SUBURB_TESTIMONIALS,
  SURROUNDING_SUBURBS,
} from "../sample-data"

export const metadata: Metadata = {
  title: "Full suburb page composition | Locations & Suburbs",
  description:
    "Bonus composition — every locations primitive sequenced into a full suburb detail surface for Albion Park Rail NSW.",
}

export default function FullSuburbPage() {
  return (
    <main
      style={{
        display: "grid",
        gap: "clamp(28px, 4vw, 56px)",
        padding: "clamp(20px, 3vw, 36px)",
        maxWidth: 1280,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonDnaLink />
      </div>

      <LocationsBreadcrumb
        suburbName={FOCAL_SUBURB.name}
        suburbHref={FOCAL_SUBURB.suburbHref}
        state={FOCAL_SUBURB.state}
      />

      <SuburbHero
        kicker="Shellharbour service area · Closest catchment"
        suburbName={FOCAL_SUBURB.name}
        postcode={FOCAL_SUBURB.postcode}
        state={FOCAL_SUBURB.state}
        driveTimeMinutes={FOCAL_SUBURB.driveMinutesFromWorkshop}
        tagline={SUBURB_TAGLINE}
        primaryAction={{ label: "Call workshop", href: "tel:+61242567000" }}
        secondaryAction={{ label: "Book online", href: "#book" }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
        }}
      >
        <PostcodeChip
          postcode={FOCAL_SUBURB.postcode}
          state={FOCAL_SUBURB.state}
          lga={FOCAL_SUBURB.lga}
          ariaSuburbLabel={FOCAL_SUBURB.name}
        />
        <DriveTimeChip
          minutes={FOCAL_SUBURB.driveMinutesFromWorkshop}
          distanceKm={FOCAL_SUBURB.distanceKmFromWorkshop}
          traffic="clear"
          origin={`From Oak Flats · ${FOCAL_SUBURB.name}`}
        />
        <ServiceRadiusChip
          radiusKm={15}
          band="core"
          suburbDistanceKm={FOCAL_SUBURB.distanceKmFromWorkshop}
        />
      </div>

      <SuburbFastFactsRow heading={`${FOCAL_SUBURB.name} fast facts`} facts={FAST_FACTS} />

      <SuburbServicesGrid suburbName={FOCAL_SUBURB.name} services={SUBURB_SERVICES} />

      <NearbyWorkshopsList
        heading={`Workshops near ${FOCAL_SUBURB.name}`}
        caption="Three Mufflermen bays inside the Illawarra service footprint."
        workshops={NEARBY_WORKSHOPS}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {SUBURB_TESTIMONIALS.map((entry) => (
          <SuburbTestimonial key={entry.customerName} {...entry} />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <LastJobCompletedCard
          vehicle="Toyota HiLux SR5"
          service="Manta 3-inch catback"
          suburbName={FOCAL_SUBURB.name}
          daysAgo={1}
          tone="red"
        />
        <LastJobCompletedCard
          vehicle="Ford Ranger Wildtrak"
          service="Stainless TIG repair"
          suburbName={FOCAL_SUBURB.name}
          daysAgo={3}
          tone="amber"
        />
        <LastJobCompletedCard
          vehicle="Mitsubishi Triton GLS"
          service="Sports muffler swap"
          suburbName={FOCAL_SUBURB.name}
          daysAgo={5}
          tone="teal"
        />
      </div>

      <LocalQuoteCtaCard
        suburbName={FOCAL_SUBURB.name}
        phoneDisplay="(02) 4256 7000"
        phoneHref="tel:+61242567000"
        bookHref="#book"
        defaultMode="drop-off"
        body="Drop your ute at the Central Ave bay or have the Mufflermen mobile bay attend your Albion Park Rail address. Quote confirmed in writing inside 24 hours."
      />

      <SurroundingSuburbsCloud
        kicker="Illawarra coverage"
        heading={`Surrounding suburbs we cover from ${FOCAL_SUBURB.name}`}
        suburbs={SURROUNDING_SUBURBS}
      />

      <SuburbFaq suburbName={FOCAL_SUBURB.name} items={SUBURB_FAQ} />
    </main>
  )
}
