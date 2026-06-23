"use client"

import { useState } from "react"

import { Pagination } from "../../components/primitives/pagination"

export function AuditPagination() {
  const [page, setPage] = useState(1)
  return (
    <Pagination
      page={page}
      pageCount={12}
      onPageChange={setPage}
      ariaLabel="Audit log pagination"
    />
  )
}

export default AuditPagination
