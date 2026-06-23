# Replacement Image Intake

Place supplier image drops in a supplier-code folder under this directory before
running `pnpm audit:media`.

Expected folders:

- `esa`
- `mpi`
- `radius`
- `raw4x4`
- `redback`
- `swd`

Use filenames from the supplier request CSVs where possible, such as `SKU.png`
or `SourceUID.png`. The importer accepts JPG, PNG, WebP and GIF source files and
writes optimized WebP product media to `public/media/parts`.
