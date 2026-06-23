import { TestimonialWall } from "../marketing"

import type { ServiceTestimonial } from "./services-areas-types"

export interface ServiceTestimonialsProps {
  /** Kicker, e.g. "Customer reviews". */
  kicker?: string
  /** Section heading. */
  title: string
  /** Service-specific testimonials. */
  testimonials: ReadonlyArray<ServiceTestimonial>
}

/**
 * Service testimonials adapter. Composes the marketing `TestimonialWall`
 * primitive — the wall provides star ratings, customer avatars (via the
 * primitives Avatar inside), and the typographic quote treatment. Each
 * `ServiceTestimonial` becomes a wall entry whose `role` field is the
 * vehicle.
 */
export function ServiceTestimonials({
  kicker = "Customer reviews",
  title,
  testimonials,
}: ServiceTestimonialsProps) {
  return (
    <TestimonialWall
      kicker={kicker}
      heading={title}
      entries={testimonials.map((testimonial) => ({
        id: testimonial.id,
        name: testimonial.customerName,
        role: testimonial.vehicle,
        quote: testimonial.quote,
        rating: testimonial.rating,
        tone: "obsidian",
      }))}
    />
  )
}

export default ServiceTestimonials
