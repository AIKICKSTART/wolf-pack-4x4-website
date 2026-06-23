# Radius Fabrications Media Request

Date: 2026-05-18
Supplier code: `radius`

## Counts

| Priority | Count | Action |
| --- | ---: | --- |
| P1 | 48 | Source real supplier image before launch. |
| P2 | 364 | Request supplier image; placeholder only if approved. |
| P3 | 0 | Review as possible placeholder exception. |
| Total | 412 | Full supplier media gap. |

## Files

- `radius-p1.csv` - P1 rows only.
- `radius-all.csv` - all missing-media rows for this supplier.


## Contact

Suggested recipient: `sales@radiusfabrications.com.au` / (07) 3245 4515

Source: https://radiusfabrications.com.au/pages/contact-us

## Request Copy

Subject: Product image export request for Oak Flats Muffler Men catalogue - Radius Fabrications

Hi Radius Fabrications team,

We are preparing the Oak Flats Muffler Men online parts catalogue and need real
product images for the attached rows.

Please start with the 48 P1 rows because they are launch-blocking.


Image requirements:

- Send one clean product image per row where possible.
- Use transparent PNG where available. Clean product-only JPG, PNG or WebP files are also accepted.
- Avoid watermarks, lifestyle-only photos, logos, favicons and placeholder images.
- Minimum 900 px on the longest edge is preferred if available.
- Name files by SKU or Source UID so the import can match them automatically.

Best filenames:

- `SKU.png`, for example `7-carbon-pod®-hid-2-light-system-70w-spot-beam.png`
- `SourceUID.png`, for example `RADIUS_7-carbon-pod®-hid-2-light-system-70w-spot-beam.png`

If a product genuinely has no image available, please mark that row as no image
available in the CSV and return it with the image export.

Thanks,
Oak Flats Muffler Men

## P1 Examples

| Priority | SKU | Source UID | RRP | Category | Source URL |
| --- | --- | --- | ---: | --- | --- |
| P1 | 7-carbon-pod®-hid-2-light-system-70w-spot-beam | RADIUS_7-carbon-pod®-hid-2-light-system-70w-spot-beam | 3390.00 | complete-exhaust-systems | https://radiusfabrications.com.au/products/7-carbon-pod®-hid-2-light-system-70w-spot-beam |
| P1 | 7-carbon-pod®-hid-single-light-70w-spot-beam | RADIUS_7-carbon-pod®-hid-single-light-70w-spot-beam | 1700.00 | exhaust-pipes-tips | https://radiusfabrications.com.au/products/7-carbon-pod®-hid-single-light-70w-spot-beam |
| P1 | stainless-snorkel-to-suit-toyota-80-series-landcruiser-short-entry-copy | RADIUS_stainless-snorkel-to-suit-toyota-80-series-landcruiser-short-entry-copy | 980.00 | cold-air-induction | https://radiusfabrications.com.au/products/stainless-snorkel-to-suit-toyota-80-series-landcruiser-short-entry-copy |
| P1 | hid-ballast-replacement-12v-70w | RADIUS_hid-ballast-replacement-12v-70w | 760.00 | exhaust-pipes-tips | https://radiusfabrications.com.au/products/hid-ballast-replacement-12v-70w |
| P1 | copy-of-1hz-high-mount-manifold-ct26 | RADIUS_copy-of-1hz-high-mount-manifold-ct26 | 700.00 | extractors-headers | https://radiusfabrications.com.au/products/copy-of-1hz-high-mount-manifold-ct26 |
| P1 | universal-wire-hider-25m-bulk | RADIUS_universal-wire-hider-25m-bulk | 615.00 | exhaust-pipes-tips | https://radiusfabrications.com.au/products/universal-wire-hider-25m-bulk |
| P1 | c-series-rgb-multi-color-multi-use-led-6-light-system-5w-flood-beam | RADIUS_c-series-rgb-multi-color-multi-use-led-6-light-system-5w-flood-beam | 580.00 | complete-exhaust-systems | https://radiusfabrications.com.au/products/c-series-rgb-multi-color-multi-use-led-6-light-system-5w-flood-beam |
| P1 | 2-c-series-c2-led-2-light-system-backup-20w-flood-beam | RADIUS_2-c-series-c2-led-2-light-system-backup-20w-flood-beam | 495.00 | complete-exhaust-systems | https://radiusfabrications.com.au/products/2-c-series-c2-led-2-light-system-backup-20w-flood-beam |
| P1 | 2-c-series-c2-led-2-light-system-20w-flood-beam | RADIUS_2-c-series-c2-led-2-light-system-20w-flood-beam | 470.00 | complete-exhaust-systems | https://radiusfabrications.com.au/products/2-c-series-c2-led-2-light-system-20w-flood-beam |
| P1 | 7-h4-dot-halogen-headlights-driving-beam-pair-07-18-jeep-jk | RADIUS_7-h4-dot-halogen-headlights-driving-beam-pair-07-18-jeep-jk | 435.00 | exhaust-pipes-tips | https://radiusfabrications.com.au/products/7-h4-dot-halogen-headlights-driving-beam-pair-07-18-jeep-jk |
| P1 | 7-h4-dot-halogen-headlights-driving-beam-pair-universal-97-06-jeep-tj | RADIUS_7-h4-dot-halogen-headlights-driving-beam-pair-universal-97-06-jeep-tj | 370.00 | exhaust-pipes-tips | https://radiusfabrications.com.au/products/7-h4-dot-halogen-headlights-driving-beam-pair-universal-97-06-jeep-tj |
| P1 | d1s-bulb-hid-replacement-bulb-clear-35w | RADIUS_d1s-bulb-hid-replacement-bulb-clear-35w | 365.00 | exhaust-pipes-tips | https://radiusfabrications.com.au/products/d1s-bulb-hid-replacement-bulb-clear-35w |

## Intake Notes

Place received files under:

```powershell
data\parts-source\replacement-images\radius
```

Then run:

```powershell
python tools\import-repco-parts.py `
  --replacement-media-dir "data\parts-source\replacement-images\radius" `
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
