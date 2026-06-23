"use client"

import { Search } from "lucide-react"
import { useId, useState, type FormEvent } from "react"

import styles from "./search-filter-form.module.css"

export type SortMode = "relevance" | "price-asc" | "price-desc" | "newest"

export interface SearchFilterFormValues {
  keyword: string
  priceMin: number
  priceMax: number
  categories: string[]
  vehicleTypes: string[]
  supplierOnly: boolean
  sort: SortMode
}

interface SearchFilterFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<SearchFilterFormValues>
}

interface FilterOption {
  id: string
  label: string
}

const CATEGORIES: ReadonlyArray<FilterOption> = [
  { id: "muffler", label: "Mufflers" },
  { id: "catback", label: "Cat-back" },
  { id: "header", label: "Headers" },
  { id: "tip", label: "Tips" },
  { id: "resonator", label: "Resonators" },
  { id: "clamp", label: "Clamps" },
  { id: "hanger", label: "Hangers" },
]

const VEHICLE_TYPES: ReadonlyArray<FilterOption> = [
  { id: "sedan", label: "Sedan" },
  { id: "ute", label: "Ute" },
  { id: "suv", label: "SUV" },
  { id: "wagon", label: "Wagon" },
  { id: "hatch", label: "Hatch" },
  { id: "van", label: "Van" },
]

const SORTS: ReadonlyArray<{ id: SortMode; label: string }> = [
  { id: "relevance", label: "Relevance" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "newest", label: "Newest first" },
]

const PRICE_MAX = 2000

export function SearchFilterForm({ onSubmit, defaultValues }: SearchFilterFormProps) {
  const keywordId = useId()

  const [priceMax, setPriceMax] = useState<number>(
    defaultValues?.priceMax ?? 1200,
  )
  const [categories, setCategories] = useState<string[]>(
    defaultValues?.categories ?? ["catback"],
  )
  const [vehicleTypes, setVehicleTypes] = useState<string[]>(
    defaultValues?.vehicleTypes ?? ["sedan", "ute"],
  )
  const [supplierOnly, setSupplierOnly] = useState<boolean>(
    defaultValues?.supplierOnly ?? false,
  )
  const [sort, setSort] = useState<SortMode>(defaultValues?.sort ?? "relevance")
  const [sortOpen, setSortOpen] = useState<boolean>(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    price: true,
    categories: true,
    vehicle: true,
    suppliers: false,
  })

  const toggleGroup = (id: string) => {
    setOpenGroups((current) => ({ ...current, [id]: !current[id] }))
  }

  const toggleItem = (
    current: string[],
    id: string,
    setter: (next: string[]) => void,
  ) => {
    setter(current.includes(id) ? current.filter((i) => i !== id) : [...current, id])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    categories.forEach((c) => data.append("categories", c))
    vehicleTypes.forEach((v) => data.append("vehicleTypes", v))
    data.set("priceMax", String(priceMax))
    data.set("sort", sort)
    data.set("supplierOnly", supplierOnly ? "yes" : "no")
    onSubmit?.(data)
  }

  const currentSort = SORTS.find((s) => s.id === sort) ?? SORTS[0]

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>10 / Search filter</span>
        <h2 className={styles.title}>Find a part fast</h2>
        <p className={styles.lede}>
          Keyword, price range, category, and vehicle type — collapse what you do not need.
        </p>
      </header>

      <div className={styles.searchRow}>
        <label htmlFor={keywordId} className={styles.searchInputWrap}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            id={keywordId}
            name="keyword"
            type="search"
            placeholder="cat-back, holden, ve commodore…"
            defaultValue={defaultValues?.keyword}
            className={styles.searchInput}
          />
          <span className={styles.kbdHint} aria-hidden="true">
            <span className={styles.kbdKey}>⌘</span>
            <span className={styles.kbdKey}>K</span>
          </span>
        </label>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className={styles.sortBtn}
            onClick={() => setSortOpen((current) => !current)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
          >
            Sort · {currentSort.label}
            <span aria-hidden="true">▾</span>
          </button>
          {sortOpen ? (
            <div className={styles.sortMenu} role="listbox">
              {SORTS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={sort === option.id}
                  className={`${styles.sortOption} ${sort === option.id ? styles.sortOptionOn : ""}`}
                  onClick={() => {
                    setSort(option.id)
                    setSortOpen(false)
                  }}
                >
                  <span>{option.label}</span>
                  {sort === option.id ? <span aria-hidden="true">✓</span> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.groupWrap}>
        <fieldset className={styles.group} style={{ border: "1px solid var(--primitive-line)" }}>
          <button
            type="button"
            className={styles.groupHead}
            onClick={() => toggleGroup("price")}
            aria-expanded={openGroups.price}
          >
            <span className={styles.groupTitleRow}>
              Price range
              <span className={styles.groupCount}>≤ ${priceMax}</span>
            </span>
            <span
              className={`${styles.groupCaret} ${openGroups.price ? styles.groupCaretOpen : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {openGroups.price ? (
            <div className={styles.groupBody}>
              <div className={styles.rangeRow}>
                <span className={styles.rangeLabel}>Maximum spend</span>
                <input
                  type="range"
                  min={100}
                  max={PRICE_MAX}
                  step={50}
                  value={priceMax}
                  onChange={(event) => setPriceMax(Number(event.target.value))}
                  className={styles.rangeSlider}
                  aria-label="Maximum spend"
                />
                <div className={styles.rangeValueRow}>
                  <span>$100</span>
                  <output aria-live="polite">
                    <strong>${priceMax}</strong>
                  </output>
                  <span>${PRICE_MAX}+</span>
                </div>
              </div>
            </div>
          ) : null}
        </fieldset>

        <fieldset className={styles.group} style={{ border: "1px solid var(--primitive-line)" }}>
          <button
            type="button"
            className={styles.groupHead}
            onClick={() => toggleGroup("categories")}
            aria-expanded={openGroups.categories}
          >
            <span className={styles.groupTitleRow}>
              Part category
              <span className={styles.groupCount}>{categories.length} on</span>
            </span>
            <span
              className={`${styles.groupCaret} ${openGroups.categories ? styles.groupCaretOpen : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {openGroups.categories ? (
            <div className={styles.groupBody}>
              <div className={styles.chipRow} role="group" aria-label="Part categories">
                {CATEGORIES.map((option) => {
                  const isOn = categories.includes(option.id)
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isOn}
                      className={`${styles.chip} ${isOn ? styles.chipOn : ""}`}
                      onClick={() => toggleItem(categories, option.id, setCategories)}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}
        </fieldset>

        <fieldset className={styles.group} style={{ border: "1px solid var(--primitive-line)" }}>
          <button
            type="button"
            className={styles.groupHead}
            onClick={() => toggleGroup("vehicle")}
            aria-expanded={openGroups.vehicle}
          >
            <span className={styles.groupTitleRow}>
              Vehicle type
              <span className={styles.groupCount}>{vehicleTypes.length} on</span>
            </span>
            <span
              className={`${styles.groupCaret} ${openGroups.vehicle ? styles.groupCaretOpen : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {openGroups.vehicle ? (
            <div className={styles.groupBody}>
              <div className={styles.chipRow} role="group" aria-label="Vehicle types">
                {VEHICLE_TYPES.map((option) => {
                  const isOn = vehicleTypes.includes(option.id)
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isOn}
                      className={`${styles.chip} ${isOn ? styles.chipOn : ""}`}
                      onClick={() =>
                        toggleItem(vehicleTypes, option.id, setVehicleTypes)
                      }
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}
        </fieldset>

        <fieldset className={styles.group} style={{ border: "1px solid var(--primitive-line)" }}>
          <button
            type="button"
            className={styles.groupHead}
            onClick={() => toggleGroup("suppliers")}
            aria-expanded={openGroups.suppliers}
          >
            <span className={styles.groupTitleRow}>
              Suppliers
              <span className={styles.groupCount}>{supplierOnly ? "ON" : "OFF"}</span>
            </span>
            <span
              className={`${styles.groupCaret} ${openGroups.suppliers ? styles.groupCaretOpen : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {openGroups.suppliers ? (
            <div className={styles.groupBody}>
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>
                  <span className={styles.toggleTitle}>Approved suppliers only</span>
                  <span className={styles.toggleHelp}>
                    Hide parts from suppliers outside the Oak Flats workshop network.
                  </span>
                </span>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={supplierOnly}
                    onChange={(event) => setSupplierOnly(event.target.checked)}
                    aria-label="Approved suppliers only"
                  />
                  <span className={styles.toggleTrack} aria-hidden="true" />
                </label>
              </div>
            </div>
          ) : null}
        </fieldset>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.saveBtn}>
          Save filter set
        </button>
        <button type="submit" className={styles.primaryBtn}>
          Apply filters
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
