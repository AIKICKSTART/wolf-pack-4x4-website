import { permanentRedirect } from "next/navigation"

// /privacy-policy is the URL external auditors and visitors expect; the policy
// itself lives at the canonical /privacy. Redirect permanently to consolidate.
export default function PrivacyPolicyRedirect() {
  permanentRedirect("/privacy")
}
