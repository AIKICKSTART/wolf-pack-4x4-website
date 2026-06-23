import { permanentRedirect } from "next/navigation"

export const revalidate = 300

export default async function ClothingPage() {
  permanentRedirect("/products/clothing")
}
