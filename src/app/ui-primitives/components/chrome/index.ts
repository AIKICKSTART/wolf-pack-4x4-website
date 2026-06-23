/**
 * Barrel for the chrome primitive family — headers, footers, docks, slide-ups,
 * and sidebars. Re-exports every variant and its public types.
 */

export type {
  BrandSurface,
  ChromeBrandConfig,
  ChromeContactDetail,
  ChromeFamily,
  ChromeMotion,
  ChromeNavItem,
  ChromeSocialLink,
  DockPosition,
} from "./chrome-types"

// Headers
export { HeaderCinematicBar } from "./headers/header-cinematic-bar"
export type { HeaderCinematicBarProps } from "./headers/header-cinematic-bar"
export { HeaderPinstripeBar } from "./headers/header-pinstripe-bar"
export type {
  HeaderPinstripeBarCrumb,
  HeaderPinstripeBarLink,
  HeaderPinstripeBarProps,
} from "./headers/header-pinstripe-bar"
export { HeaderStackedGrand } from "./headers/header-stacked-grand"
export type {
  HeaderStackedGrandProps,
  HeaderStackedGrandStat,
} from "./headers/header-stacked-grand"
export { HeaderMobileCondensed } from "./headers/header-mobile-condensed"
export type { HeaderMobileCondensedProps } from "./headers/header-mobile-condensed"
export { HeaderFloatingIsland } from "./headers/header-floating-island"
export type { HeaderFloatingIslandProps } from "./headers/header-floating-island"

// Footers
export { FooterMegamapGrand } from "./footers/footer-megamap-grand"
export type {
  FooterMegamapGrandColumn,
  FooterMegamapGrandProps,
} from "./footers/footer-megamap-grand"
export { FooterCinematic } from "./footers/footer-cinematic"
export type {
  FooterCinematicColumn,
  FooterCinematicProps,
} from "./footers/footer-cinematic"
export { FooterCompactStrip } from "./footers/footer-compact-strip"
export type { FooterCompactStripProps } from "./footers/footer-compact-strip"
export { FooterReceiptStyle } from "./footers/footer-receipt-style"
export type {
  FooterReceiptDetail,
  FooterReceiptStyleProps,
} from "./footers/footer-receipt-style"
export { FooterMarqueeBand } from "./footers/footer-marquee-band"
export type {
  FooterMarqueeBandProps,
  FooterMarqueeKpi,
} from "./footers/footer-marquee-band"

// Docks
export { DockBottomGlass } from "./docks/dock-bottom-glass"
export type {
  DockBottomGlassAction,
  DockBottomGlassActionKind,
  DockBottomGlassProps,
} from "./docks/dock-bottom-glass"
export { DockSideMagnetic } from "./docks/dock-side-magnetic"
export type {
  DockSideMagneticAction,
  DockSideMagneticKind,
  DockSideMagneticProps,
} from "./docks/dock-side-magnetic"
export { DockCornerQuick } from "./docks/dock-corner-quick"
export type { DockCornerQuickProps } from "./docks/dock-corner-quick"
export { DockTabRail } from "./docks/dock-tab-rail"
export type {
  DockTabRailItem,
  DockTabRailKind,
  DockTabRailProps,
} from "./docks/dock-tab-rail"

// Slide-ups
export { SlideUpActionSheet } from "./slide-ups/slide-up-action-sheet"
export type {
  SlideUpActionKind,
  SlideUpActionSheetAction,
  SlideUpActionSheetProps,
} from "./slide-ups/slide-up-action-sheet"
export { SlideUpFullTakeover } from "./slide-ups/slide-up-full-takeover"
export type { SlideUpFullTakeoverProps } from "./slide-ups/slide-up-full-takeover"
export { SlideUpDetailCard } from "./slide-ups/slide-up-detail-card"
export type {
  SlideUpDetailCardProps,
  SlideUpDetailStat,
  SlideUpDetailStatKind,
} from "./slide-ups/slide-up-detail-card"
export { SlideUpMultiStep } from "./slide-ups/slide-up-multi-step"
export type {
  SlideUpMultiStepProps,
  SlideUpMultiStepStep,
} from "./slide-ups/slide-up-multi-step"

// Sidebars
export { SidebarCinematicVertical } from "./sidebars/sidebar-cinematic-vertical"
export type {
  SidebarCinematicVerticalItem,
  SidebarCinematicVerticalKind,
  SidebarCinematicVerticalProps,
} from "./sidebars/sidebar-cinematic-vertical"
export { SidebarGlassCompact } from "./sidebars/sidebar-glass-compact"
export type {
  SidebarGlassCompactItem,
  SidebarGlassCompactKind,
  SidebarGlassCompactProps,
} from "./sidebars/sidebar-glass-compact"
export { SidebarMegaAnchored } from "./sidebars/sidebar-mega-anchored"
export type {
  SidebarMegaAnchoredGroup,
  SidebarMegaAnchoredItem,
  SidebarMegaAnchoredKind,
  SidebarMegaAnchoredProps,
} from "./sidebars/sidebar-mega-anchored"
export { SidebarContextRail } from "./sidebars/sidebar-context-rail"
export type {
  SidebarContextRailMeta,
  SidebarContextRailProps,
  SidebarContextRailRelated,
  SidebarContextRailStat,
  SidebarContextRailStatKind,
} from "./sidebars/sidebar-context-rail"
