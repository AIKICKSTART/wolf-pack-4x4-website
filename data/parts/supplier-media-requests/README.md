# Supplier Media Request Pack

Date: 2026-05-18

This folder turns `data/parts/missing-media-priority.csv` into supplier-specific
CSV attachments and request copy. It is the handoff pack for clearing the
remaining product media launch blocker.

Official supplier contacts are in:

- `supplier-contact-sheet.md`
- `supplier-contact-sheet.csv`

Internal approval review files are packaged into the all-supplier ZIP. Supplier
ZIPs with near-miss candidates also include a scoped `near-miss-review/` gallery:

- `near-miss-image-review-gallery.html`
- `near-miss-image-review.csv`
- `placeholder-exception-review.csv`
- `same-title-image-donor-review.csv`

## Supplier Summary

| Supplier | P1 | P2 | P3 | Total | Request file |
| --- | ---: | ---: | ---: | ---: | --- |
| Exhaust Systems Australia | 2 | 9 | 0 | 11 | `esa-request.md` |
| MPI Automotive | 503 | 485 | 0 | 988 | `mpi-request.md` |
| RAW 4x4 | 0 | 3 | 12 | 15 | `raw4x4-request.md` |
| Radius Fabrications | 48 | 364 | 0 | 412 | `radius-request.md` |
| Redback Exhausts | 0 | 2 | 0 | 2 | `redback-request.md` |
| SWD | 41 | 84 | 59 | 184 | `swd-request.md` |

## Naming Rules For Incoming Images

Ask suppliers to name each image by either:

- SKU, for example `CHEVH142-134-C.png`
- Source UID, for example `MPI_CHEVH142-134-C.png`

The importer accepts JPG, PNG, WebP and GIF inputs. It publishes only optimized
transparent WebP derivatives under `public/media/parts`.

## Intake Workflow

Place supplier files in:

```powershell
data\parts-source\replacement-images\<supplierCode>
```

Then run:

```powershell
python tools\import-repco-parts.py `
  --replacement-media-dir "data\parts-source\replacement-images\<supplierCode>" `
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

The SEO launch gate remains blocked while any P1 rows remain in the audit.
