"use client"

import { JobRetryButton } from "../components/job-queue"

const RETRY_FROM_STEPS = [
  { id: "step-1", label: "1. Load quote draft" },
  { id: "step-2", label: "2. Render PDF body" },
  { id: "step-3", label: "3. Stamp signature block" },
  { id: "step-4", label: "4. Upload to S3" },
  { id: "step-5", label: "5. Email customer" },
] as const

const noop = () => undefined

export function JobRetryButtonDemo() {
  return (
    <>
      <JobRetryButton jobId="job_2026_05_29_001d" onConfirm={noop} />
      <JobRetryButton
        jobId="job_2026_05_29_failed_94"
        steps={RETRY_FROM_STEPS}
        onConfirm={noop}
      />
    </>
  )
}

export function FailedJobRetryButtonDemo() {
  return (
    <JobRetryButton
      jobId="job_2026_05_29_failed_94"
      steps={RETRY_FROM_STEPS}
      onConfirm={noop}
    />
  )
}
