# RAW 4x4 Media Request

Date: 2026-05-18
Supplier code: `raw4x4`

## Counts

| Priority | Count | Action |
| --- | ---: | --- |
| P1 | 0 | Source real supplier image before launch. |
| P2 | 3 | Request supplier image; placeholder only if approved. |
| P3 | 12 | Review as possible placeholder exception. |
| Total | 15 | Full supplier media gap. |

## Files

- `raw4x4-p1.csv` - P1 rows only.
- `raw4x4-all.csv` - all missing-media rows for this supplier.


## Contact

Suggested recipient: `sales@raw4x4.com.au` / 02 4949 0000

Source: https://raw4x4.com.au/contact-us/

## Request Copy

Subject: Product image export request for Oak Flats Muffler Men catalogue - RAW 4x4

Hi RAW 4x4 team,

We are preparing the Oak Flats Muffler Men online parts catalogue and need real
product images for the attached rows.

There are no P1 rows for this supplier; the all-rows CSV is the request list.


Image requirements:

- Send one clean product image per row where possible.
- Use transparent PNG where available. Clean product-only JPG, PNG or WebP files are also accepted.
- Avoid watermarks, lifestyle-only photos, logos, favicons and placeholder images.
- Minimum 900 px on the longest edge is preferred if available.
- Name files by SKU or Source UID so the import can match them automatically.

Best filenames:

- `SKU.png`, for example `M1078K.png`
- `SourceUID.png`, for example `RAW4X4_M1078K.png`

If a product genuinely has no image available, please mark that row as no image
available in the CSV and return it with the image export.

Thanks,
Oak Flats Muffler Men

## P1 Examples

_No rows in this priority._

## Intake Notes

Place received files under:

```powershell
data\parts-source\replacement-images\raw4x4
```

Then run:

```powershell
python tools\import-repco-parts.py `
  --replacement-media-dir "data\parts-source\replacement-images\raw4x4" `
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
