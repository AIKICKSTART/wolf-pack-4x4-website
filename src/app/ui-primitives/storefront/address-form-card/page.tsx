"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { AddressFormCard } from "../../components/storefront"
import type { AustralianAddress } from "../../components/storefront"

import {
  ADDRESS_EMPTY,
  ADDRESS_FILLED,
  ADDRESS_SUGGESTIONS,
} from "../_mock-data"
import styles from "../storefront.module.css"

function StatefulForm({
  initial,
  errors,
}: {
  initial: AustralianAddress
  errors?: Partial<Record<keyof AustralianAddress, string>>
}) {
  const [value, setValue] = useState<AustralianAddress>(initial)
  return (
    <AddressFormCard
      value={value}
      onChange={setValue}
      suggestions={ADDRESS_SUGGESTIONS}
      errors={errors}
    />
  )
}

export default function AddressFormCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Address form card"
        title="Address form card"
        description="Shipping address with type-ahead autocomplete, AU state/territory dropdown and 4-digit postcode validation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Address form card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · empty · waiting for autocomplete</span>
        <StatefulForm initial={ADDRESS_EMPTY} />
        <span className={styles.stageCaption}>State 02 · filled · Albion Park Rail NSW</span>
        <StatefulForm initial={ADDRESS_FILLED} />
        <span className={styles.stageCaption}>State 03 · validation errors · postcode + street</span>
        <StatefulForm
          initial={{
            ...ADDRESS_FILLED,
            line1: "",
            postcode: "999",
          }}
          errors={{
            line1: "Street address is required",
            postcode: "Postcode must be 4 digits",
          }}
        />
      </section>
    </main>
  )
}
