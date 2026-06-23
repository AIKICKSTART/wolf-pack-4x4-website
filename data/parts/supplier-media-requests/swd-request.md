# SWD Media Request

Date: 2026-05-18
Supplier code: `swd`

## Counts

| Priority | Count | Action |
| --- | ---: | --- |
| P1 | 41 | Source real supplier image before launch. |
| P2 | 84 | Request supplier image; placeholder only if approved. |
| P3 | 59 | Review as possible placeholder exception. |
| Total | 184 | Full supplier media gap. |

## Files

- `swd-p1.csv` - P1 rows only.
- `swd-all.csv` - all missing-media rows for this supplier.


## Contact

Suggested recipient: `sales@swd.com.au` / 1300 669 122

Source: https://swd.com.au/pages/about-us

## Request Copy

Subject: Product image export request for Oak Flats Muffler Men catalogue - SWD

Hi SWD team,

We are preparing the Oak Flats Muffler Men online parts catalogue and need real
product images for the attached rows.

Please start with the 41 P1 rows because they are launch-blocking.


Image requirements:

- Send one clean product image per row where possible.
- Use transparent PNG where available. Clean product-only JPG, PNG or WebP files are also accepted.
- Avoid watermarks, lifestyle-only photos, logos, favicons and placeholder images.
- Minimum 900 px on the longest edge is preferred if available.
- Name files by SKU or Source UID so the import can match them automatically.

Best filenames:

- `SKU.png`, for example `EM-VF73GTS-EBS.png`
- `SourceUID.png`, for example `SWD_EM-VF73GTS-EBS.png`

If a product genuinely has no image available, please mark that row as no image
available in the CSV and return it with the image export.

Thanks,
Oak Flats Muffler Men

## P1 Examples

| Priority | SKU | Source UID | RRP | Category | Source URL |
| --- | --- | --- | ---: | --- | --- |
| P1 | EM-VF73GTS-EBS | SWD_EM-VF73GTS-EBS | 2849.00 | extractors-headers | https://swd.com.au/products/holden-hsv-gts-vf-2014-stainless-headers-metallic-cats-mild-dual-3-cat-back-system-y |
| P1 | ES-VE07VMK-CBS | SWD_ES-VE07VMK-CBS | 2269.00 | complete-exhaust-systems | https://swd.com.au/products/holden-ve-ss-hsv-sedan-twin-2-5-cat-back-system-with-varex-rear-muffler |
| P1 | EM-FG24VMK-TBS | SWD_EM-FG24VMK-TBS | 2135.00 | complete-exhaust-systems | https://swd.com.au/products/ford-fg-xr6-turbo-fpv-f6-sedanmild-steel-turbo-back-system-with-twin-2-5-cat-back-and-qu |
| P1 | EM-VE0758 | SWD_EM-VE0758 | 2099.00 | extractors-headers | https://swd.com.au/products/holden-ve-vf-ss-sed-wag-2006-headers-1-5-8-2-1-2-metal-cats-twin-2-1-2-ebs-m-s |
| P1 | ES-VF72VMK-CBS | SWD_ES-VF72VMK-CBS | 1889.00 | complete-exhaust-systems | https://swd.com.au/products/commodore-ve-vf-twin-21-2-cat-back-slip-joint-system-varexrears-no-tips |
| P1 | EM-VE31VMK-OECBS | SWD_EM-VE31VMK-OECBS | 1769.00 | complete-exhaust-systems | https://swd.com.au/products/xforce-performance-mild-steel-to-suit-holden-commodore-01-2007-on-hsv-maloo-r8-10-2007-2009 |
| P1 | EM-FGT02VMK-CBS | SWD_EM-FGT02VMK-CBS | 1685.00 | complete-exhaust-systems | https://swd.com.au/products/ford-falcon-bf-gt-varex-quad-system |
| P1 | EM-VE30VMK-CBS | SWD_EM-VE30VMK-CBS | 1669.00 | complete-exhaust-systems | https://swd.com.au/products/cat-back-system-9 |
| P1 | EM-FG1058BVMK | SWD_EM-FG1058BVMK | 1519.00 | extractors-headers | https://swd.com.au/products/ford-falcon-xr6-n-a-sedan-headers-metallic-cats-2-5-cat-back-system |
| P1 | EM-F6-03-B-TBS | SWD_EM-F6-03-B-TBS | 1495.00 | exhaust-pipes-tips | https://swd.com.au/products/xr6-turbo-sedan-turbo-back-with-4-d-pipe-3-5-met-cat-and-twin-2-5-cat-back |
| P1 | EM-SW15VMK5XFCBS | SWD_EM-SW15VMK5XFCBS | 1099.00 | exhaust-pipes-tips | https://swd.com.au/products/subaru-forester-99-08-gt-xt-cat-back-oval-twin-tip-varex-suit-xforce-dump-cat-only |
| P1 | EM-SW07-MP02-TBS | SWD_EM-SW07-MP02-TBS | 1049.00 | exhaust-pipes-tips | https://swd.com.au/products/subaru-wrx-sti-94-07-turbo-back-single-outlet-4-5-tip-mild-steel |

## Intake Notes

Place received files under:

```powershell
data\parts-source\replacement-images\swd
```

Then run:

```powershell
python tools\import-repco-parts.py `
  --replacement-media-dir "data\parts-source\replacement-images\swd" `
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
