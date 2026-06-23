"use client"

import { useState } from "react"

import { TaxSummaryTile } from "../../components/pos-checkout"
import type { AbnDetails } from "../../components/pos-checkout"

interface TaxSummaryInteractiveDemoProps {
  totalIncGst: number
  initialAbn: AbnDetails
}

export function TaxSummaryInteractiveDemo({
  totalIncGst,
  initialAbn,
}: TaxSummaryInteractiveDemoProps) {
  const [abn, setAbn] = useState<AbnDetails>(initialAbn)

  return <TaxSummaryTile totalIncGst={totalIncGst} abn={abn} onAbnChange={setAbn} />
}
