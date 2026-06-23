import { readFile } from "node:fs/promises"
import path from "node:path"

import { NextResponse } from "next/server"

import {
  storeViewLabels,
  wolfpackStoreProducts,
  type WolfpackStoreProduct,
  type WolfpackStoreView,
} from "@/lib/wolfpack-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type VisualiseMode = "apparel" | "vehicle"

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024
const validViews = new Set<WolfpackStoreView>(Object.keys(storeViewLabels) as WolfpackStoreView[])

function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

function textField(form: FormData, key: string) {
  const value = form.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function visualisationPrompt(mode: VisualiseMode, product: WolfpackStoreProduct, prompt: string) {
  const guardrails =
    mode === "apparel"
      ? "Use the customer photo as the identity and pose reference. Preserve face, skin tone, body proportions, camera angle and lighting."
      : "Use the customer 4x4 photo as the exact vehicle reference. Preserve manufacturer badge, body shape, colour, camera angle, lighting and background."

  return [
    guardrails,
    prompt,
    `Selected Wolfpack concept: ${product.name}.`,
    `Product description: ${product.summary}`,
    "Blend the Wolfpack black, electric blue and purple styling naturally. Produce a realistic customer preview, not a flat mockup.",
  ].join(" ")
}

async function productBlob(product: WolfpackStoreProduct, view: WolfpackStoreView) {
  const publicRoot = path.resolve(process.cwd(), "public")
  const imagePath = path.resolve(publicRoot, product.images[view].replace(/^\/+/, ""))

  if (!imagePath.startsWith(publicRoot + path.sep)) {
    throw new Error("Product image path escaped the public directory.")
  }

  const buffer = await readFile(imagePath)
  return new Blob([buffer], { type: "image/png" })
}

async function parseOpenAIError(response: Response) {
  const payload = await response.json().catch(() => null)
  if (payload && typeof payload === "object" && "error" in payload) {
    const apiError = payload.error as { message?: unknown }
    if (typeof apiError.message === "string") return apiError.message
  }
  return `OpenAI image edit failed with HTTP ${response.status}.`
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return error("OPENAI_API_KEY is not configured for live GPT image previews.", 501)
  }

  const form = await request.formData()
  const mode = textField(form, "mode")
  const productId = textField(form, "productId")
  const requestedView = textField(form, "view")
  const prompt = textField(form, "prompt")
  const referenceImage = form.get("referenceImage")

  if (mode !== "apparel" && mode !== "vehicle") return error("Invalid visualisation mode.")
  if (!validViews.has(requestedView as WolfpackStoreView)) return error("Invalid product view.")
  if (!(referenceImage instanceof File)) return error("A customer reference image is required.")
  if (!referenceImage.type.startsWith("image/")) return error("The uploaded reference must be an image.")
  if (referenceImage.size > MAX_UPLOAD_BYTES) return error("The uploaded image must be 20MB or smaller.")

  const product = wolfpackStoreProducts.find((item) => item.id === productId)
  if (!product) return error("Unknown Wolfpack product.")
  if (mode === "apparel" && !product.isWearable) return error("Selected product is not apparel.")
  if (mode === "vehicle" && !product.isVehicleVisualisation) {
    return error("Selected product is not a vehicle visualisation item.")
  }

  const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2"
  const imageForm = new FormData()
  imageForm.append("model", imageModel)
  imageForm.append("prompt", visualisationPrompt(mode, product, prompt).slice(0, 32000))
  imageForm.append("n", "1")
  imageForm.append("size", "1024x1024")
  imageForm.append("quality", process.env.OPENAI_IMAGE_QUALITY || "medium")
  imageForm.append("output_format", "png")

  if (!imageModel.includes("mini")) {
    imageForm.append("input_fidelity", "high")
  }

  const customerBlob = new Blob([await referenceImage.arrayBuffer()], {
    type: referenceImage.type || "image/png",
  })
  imageForm.append("image", customerBlob, referenceImage.name || "customer-reference.png")
  imageForm.append(
    "image",
    await productBlob(product, requestedView as WolfpackStoreView),
    `${product.id}-${requestedView}.png`,
  )

  const response = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: imageForm,
  })

  if (!response.ok) {
    return error(await parseOpenAIError(response), response.status)
  }

  const payload = (await response.json()) as {
    data?: Array<{ b64_json?: string }>
    usage?: unknown
  }
  const image = payload.data?.[0]?.b64_json

  if (!image) {
    return error("OpenAI did not return an image.", 502)
  }

  return NextResponse.json({
    image,
    mimeType: "image/png",
    model: imageModel,
    usage: payload.usage ?? null,
  })
}
