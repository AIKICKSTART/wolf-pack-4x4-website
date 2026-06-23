# MPI Automotive Media Request

Date: 2026-05-18
Supplier code: `mpi`

## Counts

| Priority | Count | Action |
| --- | ---: | --- |
| P1 | 503 | Source real supplier image before launch. |
| P2 | 485 | Request supplier image; placeholder only if approved. |
| P3 | 0 | Review as possible placeholder exception. |
| Total | 988 | Full supplier media gap. |

## Files

- `mpi-p1.csv` - P1 rows only.
- `mpi-all.csv` - all missing-media rows for this supplier.

- `near-miss-review/near-miss-image-review-gallery.html` - visual review of possible image matches.
- `near-miss-review/near-miss-image-review.csv` - rows to mark if a candidate is approved.

## Contact

Suggested recipient: `sales@mpiautomotive.com` / 1300 310 330

Source: https://www.mpiautomotive.com/

## Request Copy

Subject: Product image export request for Oak Flats Muffler Men catalogue - MPI Automotive

Hi MPI Automotive team,

We are preparing the Oak Flats Muffler Men online parts catalogue and need real
product images for the attached rows.

Please start with the 503 P1 rows because they are launch-blocking.

This ZIP also includes a near-miss review gallery with 195 possible image matches across 46 product rows. Please confirm only the candidates that visually represent the same part; otherwise send replacement images for those rows.

Image requirements:

- Send one clean product image per row where possible.
- Use transparent PNG where available. Clean product-only JPG, PNG or WebP files are also accepted.
- Avoid watermarks, lifestyle-only photos, logos, favicons and placeholder images.
- Minimum 900 px on the longest edge is preferred if available.
- Name files by SKU or Source UID so the import can match them automatically.

Best filenames:

- `SKU.png`, for example `CHEVH142-134-C.png`
- `SourceUID.png`, for example `MPI_CHEVH142-134-C.png`

If a product genuinely has no image available, please mark that row as no image
available in the CSV and return it with the image export.

Thanks,
Oak Flats Muffler Men

## P1 Examples

| Priority | SKU | Source UID | RRP | Category | Source URL |
| --- | --- | --- | ---: | --- | --- |
| P1 | CHEVH142-134-C | MPI_CHEVH142-134-C | 2706.99 | extractors-headers | mpiautomotive.com |
| P1 | SSMBC722-E5-C | MPI_SSMBC722-E5-C | 2691.92 | exhaust-pipes-tips | mpiautomotive.com |
| P1 | SSMBM478MF-E4-EV | MPI_SSMBM478MF-E4-EV | 2684.18 | mufflers-resonators | mpiautomotive.com |
| P1 | SSMBM478MF-E3-VBM | MPI_SSMBM478MF-E3-VBM | 2627.63 | mufflers-resonators | mpiautomotive.com |
| P1 | FX-720HPC-S | MPI_FX-720HPC-S | 2483.25 | extractors-headers | mpiautomotive.com |
| P1 | SSMBM644MF-BM | MPI_SSMBM644MF-BM | 2437.28 | mufflers-resonators | mpiautomotive.com |
| P1 | FX-610DFSS-HPC-S | MPI_FX-610DFSS-HPC-S | 2345.75 | extractors-headers | mpiautomotive.com |
| P1 | FX-217LHDHPC-S | MPI_FX-217LHDHPC-S | 2264.23 | extractors-headers | mpiautomotive.com |
| P1 | FX-217RHDHPC-S | MPI_FX-217RHDHPC-S | 2264.23 | extractors-headers | mpiautomotive.com |
| P1 | FX-211HPC-B | MPI_FX-211HPC-B | 2252.91 | extractors-headers | mpiautomotive.com |
| P1 | HOLS128SR-VFHSV-EV | MPI_HOLS128SR-VFHSV-EV | 2217.27 | mufflers-resonators | mpiautomotive.com |
| P1 | HOLS128UR-3-EV | MPI_HOLS128UR-3-EV | 2217.27 | mufflers-resonators | mpiautomotive.com |

## Intake Notes

Place received files under:

```powershell
data\parts-source\replacement-images\mpi
```

Then run:

```powershell
python tools\import-repco-parts.py `
  --replacement-media-dir "data\parts-source\replacement-images\mpi" `
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
