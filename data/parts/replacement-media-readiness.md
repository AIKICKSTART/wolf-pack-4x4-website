# Replacement Media Readiness

Date: 2026-05-20

## Summary

- Replacement directories checked: `C:\Users\verri\Desktop\Oakflats Mufflermen\data\parts-source\replacement-images`
- Image files found: 0
- Valid image files: 0
- Corrupt image files: 0
- Missing-media rows in scope: 0
- Rows with a matching replacement image: 0
- P1 rows matched: 0
- P1 rows still remaining: 0
- Unmatched image files: 0

## Supplier Readiness

| Supplier | Total rows | Matched | P1 matched | P1 remaining | Image files |
| --- | ---: | ---: | ---: | ---: | ---: |

## Remaining P1 Examples

| Priority | Supplier | SKU | RRP | Title |
| --- | --- | --- | ---: | --- |

## Next Command

If the matched count looks right, run the importer with the same replacement
folder or folders:

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
