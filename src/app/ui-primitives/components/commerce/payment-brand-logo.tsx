"use client"

import type { ReactElement, SVGProps } from "react"

export type PaymentBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "paypal"
  | "afterpay"
  | "applepay"
  | "googlepay"
  | "generic"

interface PaymentBrandLogoProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  brand: PaymentBrand
  title?: string
}

function VisaPath() {
  return (
    <g fill="var(--primitive-teal)">
      <rect width="40" height="26" rx="4" fill="var(--primitive-text-on-accent)" />
      <path d="M16.4 7.5l-2.6 11h-3.1L8.1 7.5h3.1l1.5 6.8 2.6-6.8h3.1z" fill="var(--primitive-teal)" />
      <path d="M20.4 18.5h-2.9l1.8-11h2.9l-1.8 11z" fill="var(--primitive-teal)" />
      <path d="M30.5 7.7c-.6-.2-1.5-.5-2.6-.5-2.9 0-4.9 1.5-4.9 3.6 0 1.6 1.5 2.4 2.6 3 1.1.5 1.5.9 1.5 1.4 0 .7-.9 1.1-1.8 1.1-1.2 0-1.8-.2-2.8-.6l-.4-.2-.4 2.5c.7.3 2 .6 3.3.6 3 0 5-1.5 5-3.8 0-1.2-.8-2.2-2.5-3-1-.5-1.6-.8-1.6-1.4 0-.5.5-1 1.6-1 .9 0 1.6.2 2.1.4l.2.1.4-2.2z" fill="var(--primitive-teal)" />
      <path d="M36 7.5h-2.3c-.7 0-1.2.2-1.5.9l-4.3 10.1h3l.6-1.7h3.7l.4 1.7h2.7L36 7.5zm-3.6 7.1l1.1-3.1.2-.6.1.5.7 3.2h-2.1z" fill="var(--primitive-teal)" />
    </g>
  )
}

function MastercardPath() {
  return (
    <g>
      <rect width="40" height="26" rx="4" fill="var(--primitive-canvas)" />
      <circle cx="16" cy="13" r="6.5" fill="var(--primitive-red)" />
      <circle cx="24" cy="13" r="6.5" fill="var(--primitive-amber)" />
      <path
        d="M20 8.2a6.5 6.5 0 010 9.6 6.5 6.5 0 010-9.6z"
        fill="color-mix(in srgb, var(--primitive-red) 60%, var(--primitive-amber))"
      />
    </g>
  )
}

function AmexPath() {
  return (
    <g>
      <rect width="40" height="26" rx="4" fill="var(--primitive-teal)" />
      <text
        x="20"
        y="16"
        textAnchor="middle"
        fill="var(--primitive-text-on-accent)"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="6"
        letterSpacing="0.5"
      >
        AMERICAN
      </text>
      <text
        x="20"
        y="22"
        textAnchor="middle"
        fill="var(--primitive-text-on-accent)"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="6"
        letterSpacing="0.5"
      >
        EXPRESS
      </text>
    </g>
  )
}

function PaypalPath() {
  return (
    <g>
      <rect width="40" height="26" rx="4" fill="var(--primitive-text-on-accent)" />
      <text
        x="20"
        y="17"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="9"
      >
        <tspan fill="color-mix(in srgb, var(--primitive-teal) 70%, var(--primitive-canvas))">Pay</tspan>
        <tspan fill="var(--primitive-teal)">Pal</tspan>
      </text>
    </g>
  )
}

function AfterpayPath() {
  return (
    <g>
      <rect width="40" height="26" rx="4" fill="color-mix(in srgb, var(--primitive-green) 36%, var(--primitive-text-on-accent))" />
      <text
        x="20"
        y="17"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="7"
        fill="var(--primitive-canvas)"
      >
        afterpay
      </text>
    </g>
  )
}

function ApplePayPath() {
  return (
    <g>
      <rect width="40" height="26" rx="4" fill="var(--primitive-canvas)" />
      <text
        x="20"
        y="17"
        textAnchor="middle"
        fontFamily="-apple-system, Arial, sans-serif"
        fontWeight="600"
        fontSize="8"
        fill="var(--primitive-text-on-accent)"
      >
        Pay
      </text>
      <path
        d="M11 12.5c-.2-.4-.4-.8-.7-1.1-.4-.4-1-.7-1.5-.7-.3 0-.6.1-.9.2.3.1.5.2.7.3.4.3.7.7.7 1.2 0 .3-.1.6-.3.8.3 0 .6-.1.9-.3.4-.2.7-.4 1.1-.4zM10 14.6c-.7 0-1.1.3-1.5.3-.4 0-.8-.3-1.4-.3-.7 0-1.5.4-1.9 1.1-.8 1.3-.2 3.2.6 4.2.4.5.8.9 1.4.9.6 0 .8-.3 1.4-.3.7 0 .8.3 1.4.3.6 0 1-.4 1.4-.9.4-.5.6-1 .6-1 0 0-1.1-.4-1.1-1.7 0-1.1.9-1.6.9-1.7-.4-.6-1-.9-1.8-.9z"
        fill="var(--primitive-text-on-accent)"
      />
    </g>
  )
}

function GooglePayPath() {
  return (
    <g>
      <rect width="40" height="26" rx="4" fill="var(--primitive-text-on-accent)" />
      <text
        x="22"
        y="17"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="500"
        fontSize="7"
      >
        <tspan fill="var(--primitive-teal)">G</tspan>
        <tspan fill="var(--primitive-red)">o</tspan>
        <tspan fill="var(--primitive-amber)">o</tspan>
        <tspan fill="var(--primitive-teal)">g</tspan>
        <tspan fill="var(--primitive-green)">l</tspan>
        <tspan fill="var(--primitive-red)">e</tspan>
        <tspan fill="var(--primitive-muted)"> Pay</tspan>
      </text>
    </g>
  )
}

function GenericPath() {
  return (
    <g>
      <rect width="40" height="26" rx="4" fill="var(--primitive-panel-strong)" />
      <rect x="4" y="9" width="32" height="3" fill="var(--primitive-muted)" />
      <rect x="4" y="15" width="14" height="2" fill="color-mix(in srgb, var(--primitive-muted) 60%, transparent)" />
    </g>
  )
}

const BRAND_RENDERERS: Record<PaymentBrand, () => ReactElement> = {
  visa: VisaPath,
  mastercard: MastercardPath,
  amex: AmexPath,
  paypal: PaypalPath,
  afterpay: AfterpayPath,
  applepay: ApplePayPath,
  googlepay: GooglePayPath,
  generic: GenericPath,
}

const BRAND_LABEL: Record<PaymentBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  paypal: "PayPal",
  afterpay: "Afterpay",
  applepay: "Apple Pay",
  googlepay: "Google Pay",
  generic: "Card",
}

export function PaymentBrandLogo({
  brand,
  title,
  width = 40,
  height = 26,
  ...rest
}: PaymentBrandLogoProps) {
  const Renderer = BRAND_RENDERERS[brand]
  const label = title ?? BRAND_LABEL[brand]
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 26"
      width={width}
      height={height}
      role="img"
      aria-label={label}
      {...rest}
    >
      <title>{label}</title>
      <Renderer />
    </svg>
  )
}

export default PaymentBrandLogo
