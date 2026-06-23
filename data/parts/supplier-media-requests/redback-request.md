# Redback Exhausts Media Request

Date: 2026-05-18
Supplier code: `redback`

## Counts

| Priority | Count | Action |
| --- | ---: | --- |
| P1 | 0 | Source real supplier image before launch. |
| P2 | 2 | Request supplier image; placeholder only if approved. |
| P3 | 0 | Review as possible placeholder exception. |
| Total | 2 | Full supplier media gap. |

## Files

- `redback-p1.csv` - P1 rows only.
- `redback-all.csv` - all missing-media rows for this supplier.


## Contact

Suggested recipient: `sales@redbackexhausts.com.au` / 1300 351 730

Source: https://redbackexhausts.com.au/pages/Warranty.html

## Request Copy

Subject: Product image export request for Oak Flats Muffler Men catalogue - Redback Exhausts

Hi Redback Exhausts team,

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

- `SKU.png`, for example `Z605-63BC.png`
- `SourceUID.png`, for example `REDBACK_Z605-63BC.png`

If a product genuinely has no image available, please mark that row as no image
available in the CSV and return it with the image export.

Thanks,
Oak Flats Muffler Men

## P1 Examples

_No rows in this priority._

## Intake Notes

Place received files under:

```powershell
data\parts-source\replacement-images\redback
```

Then run:

```powershell
python tools\import-repco-parts.py `
  --replacement-media-dir "data\parts-source\replacement-images\redback" `
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
