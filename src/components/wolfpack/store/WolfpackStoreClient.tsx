"use client"

import Image from "next/image"
import { Camera, Car, RotateCw, Search, ShoppingBag, SlidersHorizontal, Sparkles, Upload } from "lucide-react"
import * as React from "react"

import {
  storeCategoryOrder,
  storeViewLabels,
  type WolfpackStoreHero,
  type WolfpackStoreCategory,
  type WolfpackStoreProduct,
  type WolfpackStoreView,
} from "@/lib/wolfpack-store"

type WolfpackStoreClientProps = {
  products: readonly WolfpackStoreProduct[]
  heroes: readonly WolfpackStoreHero[]
  variant?: "all" | "clothing" | "accessories"
}

const ALL_CATEGORIES = "All"
type CategoryFilter = WolfpackStoreCategory | typeof ALL_CATEGORIES

const viewOrder = Object.keys(storeViewLabels) as WolfpackStoreView[]

function readUpload(file: File | undefined, onReady: (src: string) => void) {
  if (!file) return
  const reader = new FileReader()
  reader.addEventListener("load", () => {
    if (typeof reader.result === "string") onReady(reader.result)
  })
  reader.readAsDataURL(file)
}

function uploadImage(
  file: File | undefined,
  setFile: (file: File | null) => void,
  setPreview: (src: string | null) => void,
  setResult: (src: string | null) => void,
  setStatus: (message: string | null) => void,
) {
  setFile(file ?? null)
  setResult(null)
  setStatus(null)

  if (!file) {
    setPreview(null)
    return
  }

  readUpload(file, setPreview)
}

const variantCopy = {
  all: {
    campaignAria: "Wolfpack product range hero images",
    heroAria: "Wolfpack clothing and concept store",
    kicker: "Wolfpack product range",
    title: "Apparel, camp gear and 4x4 upgrade concepts.",
    body:
      "A merch and accessory store built around the same black, blue and purple Wolfpack visual system, with every concept rendered as a consistent four-angle product set.",
    search: "Search apparel, camp gear or 4x4 upgrades",
  },
  clothing: {
    campaignAria: "Wolfpack apparel hero images",
    heroAria: "Wolfpack clothing store",
    kicker: "Wolfpack clothing",
    title: "Apparel, headwear and country-ready merch.",
    body:
      "A clothing range for workshop crews, young 4x4 owners, touring families and country customers, all rendered as consistent front, back, side and detail product sets.",
    search: "Search shirts, jackets, hats or apparel",
  },
  accessories: {
    campaignAria: "Wolfpack 4x4 accessory hero images",
    heroAria: "Wolfpack 4x4 accessory store",
    kicker: "Wolfpack products",
    title: "4x4 accessories, camp gear and upgrade concepts.",
    body:
      "Non-wearable Wolfpack product concepts for camp setup, recovery, lighting, protection, storage, suspension and performance upgrade planning.",
    search: "Search camp gear, recovery, lighting or upgrades",
  },
} as const

function categoryCount(products: readonly WolfpackStoreProduct[], category: CategoryFilter) {
  if (category === ALL_CATEGORIES) return products.length
  return products.filter((product) => product.category === category).length
}

export function WolfpackStoreClient({ products, heroes, variant = "all" }: WolfpackStoreClientProps) {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<CategoryFilter>(ALL_CATEGORIES)
  const [selectedId, setSelectedId] = React.useState(products[0]?.id ?? "")
  const [activeHeroId, setActiveHeroId] = React.useState(heroes[0]?.id ?? "")
  const [view, setView] = React.useState<WolfpackStoreView>("front")
  const [personFile, setPersonFile] = React.useState<File | null>(null)
  const [vehicleFile, setVehicleFile] = React.useState<File | null>(null)
  const [personPreview, setPersonPreview] = React.useState<string | null>(null)
  const [vehiclePreview, setVehiclePreview] = React.useState<string | null>(null)
  const [personResult, setPersonResult] = React.useState<string | null>(null)
  const [vehicleResult, setVehicleResult] = React.useState<string | null>(null)
  const [personStatus, setPersonStatus] = React.useState<string | null>(null)
  const [vehicleStatus, setVehicleStatus] = React.useState<string | null>(null)
  const [generating, setGenerating] = React.useState<"apparel" | "vehicle" | null>(null)

  const selected = React.useMemo(
    () => products.find((product) => product.id === selectedId) ?? products[0],
    [products, selectedId],
  )

  const selectedWearable = React.useMemo(
    () => (selected?.isWearable ? selected : products.find((product) => product.isWearable) ?? null),
    [products, selected],
  )

  const selectedVehicleProduct = React.useMemo(
    () =>
      selected?.isVehicleVisualisation
        ? selected
        : products.find((product) => product.isVehicleVisualisation) ?? null,
    [products, selected],
  )

  const activeHero = React.useMemo(
    () => heroes.find((hero) => hero.id === activeHeroId) ?? heroes[0],
    [activeHeroId, heroes],
  )

  const filteredProducts = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === ALL_CATEGORIES || product.category === category
      const matchesQuery =
        !normalizedQuery ||
        [product.name, product.category, product.type, product.summary, product.manufacturerTarget]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, products, query])

  const visibleCategories = React.useMemo(
    () => storeCategoryOrder.filter((item) => products.some((product) => product.category === item)),
    [products],
  )

  if (!selected || !activeHero) return null

  const copy = variantCopy[variant]
  const activeImage = selected.images[view]
  const showApparelTools = variant !== "accessories" && Boolean(selectedWearable)
  const showVehicleTools = variant !== "clothing" && Boolean(selectedVehicleProduct)
  const wearableImage = selected.isWearable ? activeImage : selectedWearable?.images.front
  const vehicleImage = selected.isVehicleVisualisation ? activeImage : selectedVehicleProduct?.images.front
  const wearableView = selected.isWearable ? view : "front"
  const vehicleView = selected.isVehicleVisualisation ? view : "front"
  const tryOnPrompt = selectedWearable
    ? `${selectedWearable.prompt} Use the uploaded customer photo as the person reference. Preserve face, pose, skin tone and body proportions. Fit the ${selectedWearable.name} naturally with realistic folds and lighting.`
    : ""
  const vehiclePrompt = selectedVehicleProduct
    ? `${selectedVehicleProduct.prompt} Use the uploaded customer 4x4 photo as the exact vehicle reference. Preserve manufacturer badge, body shape, colour, camera angle and background. Visualise the selected Wolfpack upgrade with realistic fitment, stance, shadows and reflections.`
    : ""

  async function generatePreview(mode: "apparel" | "vehicle") {
    const isApparel = mode === "apparel"
    const file = isApparel ? personFile : vehicleFile
    const product = isApparel ? selectedWearable : selectedVehicleProduct
    const prompt = isApparel ? tryOnPrompt : vehiclePrompt
    const productView = isApparel ? wearableView : vehicleView
    const setStatus = isApparel ? setPersonStatus : setVehicleStatus
    const setResult = isApparel ? setPersonResult : setVehicleResult

    if (!product) {
      setStatus(isApparel ? "Select an apparel item first." : "Select a 4x4 accessory first.")
      return
    }

    if (!file) {
      setStatus(isApparel ? "Upload a customer photo first." : "Upload a 4x4 photo first.")
      return
    }

    setGenerating(mode)
    setStatus(null)
    setResult(null)

    try {
      const form = new FormData()
      form.append("mode", mode)
      form.append("productId", product.id)
      form.append("view", productView)
      form.append("prompt", prompt)
      form.append("referenceImage", file)

      const response = await fetch("/api/wolfpack/visualise", {
        method: "POST",
        body: form,
      })
      const payload = (await response.json()) as { image?: string; mimeType?: string; error?: string }

      if (!response.ok || !payload.image) {
        throw new Error(payload.error || "GPT image preview failed.")
      }

      setResult(`data:${payload.mimeType || "image/png"};base64,${payload.image}`)
      setStatus("Preview generated.")
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "GPT image preview failed.")
    } finally {
      setGenerating(null)
    }
  }

  return (
    <div className="wolfpack-store">
      <section className="wolfpack-store-campaign" aria-label={copy.campaignAria}>
        <Image src={activeHero.src} alt={activeHero.alt} fill priority sizes="100vw" unoptimized />
        <div className="wolfpack-store-campaign-copy">
          <span className="seo-kicker">{activeHero.kicker}</span>
          <h1>{activeHero.title}</h1>
          <p>
            {copy.body}
          </p>
        </div>
        <div className="wolfpack-store-hero-tabs" aria-label="Hero image selector">
          {heroes.map((hero) => (
            <button
              key={hero.id}
              type="button"
              className={hero.id === activeHero.id ? "is-active" : ""}
              onClick={() => setActiveHeroId(hero.id)}
            >
              {hero.title}
            </button>
          ))}
        </div>
      </section>

      <section className="wolfpack-store-hero" aria-label={copy.heroAria}>
        <div className="wolfpack-store-hero-copy">
          <span className="seo-kicker">{copy.kicker}</span>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
          <div className="wolfpack-store-stats" aria-label="Store media statistics">
            <span>{products.length} products</span>
            <span>{products.length * viewOrder.length} angle images</span>
            <span>Try-on ready</span>
          </div>
        </div>

        <article className="wolfpack-store-feature">
          <div className="wolfpack-store-stage">
            <Image
              src={activeImage}
              alt={`${selected.name} ${storeViewLabels[view]} concept render`}
              width={1200}
              height={1200}
              priority
              unoptimized
            />
          </div>
          <div className="wolfpack-store-feature-copy">
            <span>{selected.category}</span>
            <h2>{selected.name}</h2>
            <p>{selected.summary}</p>
            <div className="wolfpack-store-viewbar" aria-label="Product angle selector">
              {viewOrder.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={view === item ? "is-active" : ""}
                  onClick={() => setView(item)}
                >
                  <RotateCw aria-hidden="true" />
                  {storeViewLabels[item]}
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="wolfpack-store-toolbar" aria-label="Store filters">
        <label className="wolfpack-store-search">
          <Search aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
          />
        </label>
        <div className="wolfpack-store-filter-scroll" aria-label="Product categories">
          <button
            type="button"
            className={category === ALL_CATEGORIES ? "is-active" : ""}
            onClick={() => setCategory(ALL_CATEGORIES)}
          >
            <SlidersHorizontal aria-hidden="true" />
            All
            <span>{categoryCount(products, ALL_CATEGORIES)}</span>
          </button>
          {visibleCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "is-active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
              <span>{categoryCount(products, item)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="wolfpack-store-layout">
        <div className="wolfpack-store-grid" aria-label="Wolfpack product concepts">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              className={`wolfpack-store-card ${selected.id === product.id ? "is-active" : ""}`}
              onClick={() => {
                setSelectedId(product.id)
                setView("front")
              }}
            >
              <span className="wolfpack-store-card-media">
                <Image
                  src={product.images.front}
                  alt={`${product.name} front product concept`}
                  width={1200}
                  height={1200}
                  loading="lazy"
                  unoptimized
                />
              </span>
              <span className="wolfpack-store-card-copy">
                <small>{product.category}</small>
                <strong>{product.name}</strong>
                <em>{product.type}</em>
              </span>
            </button>
          ))}
        </div>

        <aside className="wolfpack-store-side" aria-label="Selected product tools">
          <div className="wolfpack-store-spec">
            <span className="seo-kicker">Selected concept</span>
            <h2>{selected.name}</h2>
            <p>{selected.summary}</p>
            <dl>
              <div>
                <dt>Range</dt>
                <dd>{selected.category}</dd>
              </div>
              <div>
                <dt>Item type</dt>
                <dd>{selected.type}</dd>
              </div>
              <div>
                <dt>Supplier lane</dt>
                <dd>{selected.manufacturerTarget}</dd>
              </div>
              <div>
                <dt>Image set</dt>
                <dd>Front, back, side, detail</dd>
              </div>
            </dl>
          </div>

          {showApparelTools && selectedWearable && wearableImage ? (
          <div className="wolfpack-store-uploader">
            <div>
              <Camera aria-hidden="true" />
              <h3>Apparel try-on</h3>
            </div>
            <label>
              <Upload aria-hidden="true" />
              Upload customer photo
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  uploadImage(
                    event.target.files?.[0],
                    setPersonFile,
                    setPersonPreview,
                    setPersonResult,
                    setPersonStatus,
                  )
                }
              />
            </label>
            <button
              type="button"
              className="wolfpack-store-generate"
              disabled={generating !== null || !personFile}
              onClick={() => generatePreview("apparel")}
            >
              <Sparkles aria-hidden="true" />
              {generating === "apparel" ? "Generating" : "Generate try-on"}
            </button>
            <div className="wolfpack-store-preview is-person">
              {personResult ? (
                <Image
                  src={personResult}
                  alt={`${selectedWearable.name} generated try-on preview`}
                  width={1200}
                  height={1200}
                  unoptimized
                />
              ) : personPreview ? (
                <Image
                  src={personPreview}
                  alt="Uploaded person preview"
                  width={1200}
                  height={1200}
                  unoptimized
                />
              ) : (
                <Sparkles aria-hidden="true" />
              )}
              {!personResult ? (
                <Image src={wearableImage} alt="" width={1200} height={1200} unoptimized />
              ) : null}
            </div>
            {personStatus ? <p className="wolfpack-store-status">{personStatus}</p> : null}
            <textarea readOnly value={tryOnPrompt} aria-label="GPT image apparel try-on brief" />
          </div>
          ) : null}

          {showVehicleTools && selectedVehicleProduct && vehicleImage ? (
          <div className="wolfpack-store-uploader">
            <div>
              <Car aria-hidden="true" />
              <h3>4x4 visualiser</h3>
            </div>
            <label>
              <Upload aria-hidden="true" />
              Upload 4x4 photo
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  uploadImage(
                    event.target.files?.[0],
                    setVehicleFile,
                    setVehiclePreview,
                    setVehicleResult,
                    setVehicleStatus,
                  )
                }
              />
            </label>
            <button
              type="button"
              className="wolfpack-store-generate"
              disabled={generating !== null || !vehicleFile}
              onClick={() => generatePreview("vehicle")}
            >
              <Sparkles aria-hidden="true" />
              {generating === "vehicle" ? "Generating" : "Generate upgrade"}
            </button>
            <div className="wolfpack-store-preview is-vehicle">
              {vehicleResult ? (
                <Image
                  src={vehicleResult}
                  alt={`${selectedVehicleProduct.name} generated 4x4 preview`}
                  width={1200}
                  height={1200}
                  unoptimized
                />
              ) : vehiclePreview ? (
                <Image
                  src={vehiclePreview}
                  alt="Uploaded 4x4 preview"
                  width={1200}
                  height={1200}
                  unoptimized
                />
              ) : (
                <ShoppingBag aria-hidden="true" />
              )}
              {!vehicleResult ? (
                <Image src={vehicleImage} alt="" width={1200} height={1200} unoptimized />
              ) : null}
            </div>
            {vehicleStatus ? <p className="wolfpack-store-status">{vehicleStatus}</p> : null}
            <textarea readOnly value={vehiclePrompt} aria-label="GPT image 4x4 upgrade brief" />
          </div>
          ) : null}
        </aside>
      </section>
    </div>
  )
}
