import { FieldPalette } from "../form-builder/field-palette"
import type {
  FieldPaletteItem,
  FieldPaletteSection,
} from "../form-builder/field-palette"
import type {
  FormFieldType,
} from "../form-builder/form-builder-types"

import type {
  BlockPaletteItem,
  BlockPaletteSection,
  EmailBlockKind,
} from "./email-builder-types"

interface BlockLibraryPaletteProps {
  sections: ReadonlyArray<BlockPaletteSection>
  className?: string
}

const KIND_TO_FORM_TYPE: Record<EmailBlockKind, FormFieldType> = {
  heading: "short-text",
  image: "file-upload",
  button: "yes-no",
  divider: "rating",
  "columns-2": "dropdown",
  "columns-3": "multi-select",
  "social-row": "address",
  spacer: "number",
  footer: "long-text",
  html: "signature",
  personalization: "email",
}

function toPaletteItem(item: BlockPaletteItem): FieldPaletteItem {
  return {
    type: KIND_TO_FORM_TYPE[item.kind],
    name: item.name,
    hint: item.hint,
  }
}

function toPaletteSection(section: BlockPaletteSection): FieldPaletteSection {
  return {
    id: section.id,
    title: section.title,
    items: section.items.map(toPaletteItem),
  }
}

/**
 * Left rail palette of drag-from blocks for the email builder. Composes the
 * underlying form-builder FieldPalette — we map every email block kind to a
 * stable FormFieldType so the same tone + icon stays predictable.
 */
export function BlockLibraryPalette({
  sections,
  className,
}: BlockLibraryPaletteProps) {
  const mapped = sections.map(toPaletteSection)
  return (
    <FieldPalette
      sections={mapped}
      ariaLabel="Email block library"
      className={className}
    />
  )
}
