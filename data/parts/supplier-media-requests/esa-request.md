# Exhaust Systems Australia Media Request

Date: 2026-05-18
Supplier code: `esa`

## Counts

| Priority | Count | Action |
| --- | ---: | --- |
| P1 | 2 | Source real supplier image before launch. |
| P2 | 9 | Request supplier image; placeholder only if approved. |
| P3 | 0 | Review as possible placeholder exception. |
| Total | 11 | Full supplier media gap. |

## Files

- `esa-p1.csv` - P1 rows only.
- `esa-all.csv` - all missing-media rows for this supplier.


## Contact

Suggested recipient: `sales@exhaustsystemsaustralia.com.au` / 03 8763 3099 / 07 2802 2351

Source: https://exhaustsystemsaustralia.com.au/pages/contact

## Request Copy

Subject: Product image export request for Oak Flats Muffler Men catalogue - Exhaust Systems Australia

Hi Exhaust Systems Australia team,

We are preparing the Oak Flats Muffler Men online parts catalogue and need real
product images for the attached rows.

Please start with the 2 P1 rows because they are launch-blocking.


Image requirements:

- Send one clean product image per row where possible.
- Use transparent PNG where available. Clean product-only JPG, PNG or WebP files are also accepted.
- Avoid watermarks, lifestyle-only photos, logos, favicons and placeholder images.
- Minimum 900 px on the longest edge is preferred if available.
- Name files by SKU or Source UID so the import can match them automatically.

Best filenames:

- `SKU.png`, for example `nissan-patrol-y61-gu-4-8l-cat-assy-use-with-eh148.png`
- `SourceUID.png`, for example `ESA_nissan-patrol-y61-gu-4-8l-cat-assy-use-with-eh148.png`

If a product genuinely has no image available, please mark that row as no image
available in the CSV and return it with the image export.

Thanks,
Oak Flats Muffler Men

## P1 Examples

| Priority | SKU | Source UID | RRP | Category | Source URL |
| --- | --- | --- | ---: | --- | --- |
| P1 | nissan-patrol-y61-gu-4-8l-cat-assy-use-with-eh148 | ESA_nissan-patrol-y61-gu-4-8l-cat-assy-use-with-eh148 | 455.00 | exhaust-pipes-tips | https://exhaustsystemsaustralia.com.au/products/nissan-patrol-y61-gu-4-8l-cat-assy-use-with-eh148 |
| P1 | holden-commodore-ve-ute-twin-rear-2-1-2-j-pipe-kit-rhs-with-typ083-tip | ESA_holden-commodore-ve-ute-twin-rear-2-1-2-j-pipe-kit-rhs-with-typ083-tip | 200.00 | exhaust-pipes-tips | https://exhaustsystemsaustralia.com.au/products/holden-commodore-ve-ute-twin-rear-2-1-2-j-pipe-kit-rhs-with-typ083-tip |

## Intake Notes

Place received files under:

```powershell
data\parts-source\replacement-images\esa
```

Then run:

```powershell
python tools\import-repco-parts.py `
  --replacement-media-dir "data\parts-source\replacement-images\esa" `
  --replacement-media-budget 500 `
  --max-image-width 520 `
  --max-images-per-product 1 `
  --webp-quality 74 `
  --webp-method 3
python tools\generate-missing-media-triage.py
python tools\generate-supplier-media-request-pack.py
pnpm audit:seo
pnpm build
```
