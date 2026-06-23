"use client"

import { useState } from "react"

import { CustomerDetailsForm } from "../../components/booking-widget"
import type { CustomerDetailsValues } from "../../components/booking-widget"
import { SAMPLE_CUSTOMER } from "../sample-data"

export function CustomerDetailsFormShowcase() {
  const [values, setValues] = useState<CustomerDetailsValues>(SAMPLE_CUSTOMER)
  return <CustomerDetailsForm values={values} onChange={setValues} />
}
