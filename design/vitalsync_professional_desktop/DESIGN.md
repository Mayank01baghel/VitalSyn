---
name: VitalSync Professional Desktop
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394e'
  surface-container-lowest: '#060d20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3e'
  surface-container-highest: '#2d3449'
  on-surface: '#dbe2fd'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#dbe2fd'
  inverse-on-surface: '#283044'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b8c3ff'
  primary: '#b8c3ff'
  on-primary: '#002388'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#124af0'
  secondary: '#ffb3b0'
  on-secondary: '#68000f'
  secondary-container: '#901822'
  on-secondary-container: '#ff9e9b'
  tertiary: '#44dfab'
  on-tertiary: '#003827'
  tertiary-container: '#007c5b'
  on-tertiary-container: '#b6ffde'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b0'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#8c1520'
  tertiary-fixed: '#67fcc6'
  tertiary-fixed-dim: '#44dfab'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#00513a'
  background: '#0b1326'
  on-background: '#dbe2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar_width: 260px
  sidebar_collapsed: 72px
  container_gutter: 24px
  grid_gap: 16px
  cell_padding_v: 12px
  cell_padding_h: 16px
---

## Brand & Style

The design system evolves the mobile "Vital-Modern" aesthetic into a high-density, professional desktop environment. It targets system administrators and healthcare analysts who require deep data visibility and rapid decision-making capabilities. 

The style is **Corporate / Modern** with a focus on precision and utility. It utilizes a sophisticated dark mode palette to reduce eye strain during long-duration monitoring. The emotional response is one of controlled authority, technical reliability, and clarity. While it retains the vibrant accents of the original theme, they are now applied with surgical precision to highlight critical status changes, system alerts, and data trends within a structured, systematic grid.

## Colors

The palette is anchored by the **Midnight Blue (#0B1326)** background, providing a deep, low-distraction canvas. 

- **Primary (Electric Blue):** Used for primary actions, active navigation states, and standard data series.
- **Secondary (Coral):** Reserved strictly for critical alerts, error states, and high-priority system warnings.
- **Tertiary (Teal):** Applied to success states, "Online" status indicators, and positive growth metrics.
- **Surface Tiers:** Backgrounds transition from `#0B1326` (Base) to `#151E33` (Cards/Panels) to `#1C273D` (Hover/Active states).
- **Borders:** A consistent `#242F47` is used for hair-line dividers and component outlines to maintain structural integrity without excessive contrast.

## Typography

This design system utilizes **Inter** for its exceptional legibility in data-heavy environments. The scale is intentionally tighter than mobile counterparts to facilitate high information density.

- **Headlines:** Use Semi-bold and Bold weights with slight negative letter-spacing to maintain a professional, technical look.
- **Body Text:** The standard size is 14px, with 13px used for secondary metadata or dense sidebar items.
- **Data Tables:** Numerical values should utilize a monospaced font (JetBrains Mono) or tabular numbers to ensure columns align perfectly for rapid scanning.
- **Labels:** Uppercase labels with increased letter-spacing are used for section headers and table column headers to distinguish them from interactive content.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid** model. A fixed-width left sidebar handles primary navigation, while the main content area utilizes a fluid grid to maximize the real estate of wide desktop monitors.

- **Sidebar:** 260px width, collapsible to 72px (icon-only).
- **Grid System:** A 12-column grid for the content area. Cards and analytics widgets should span 3, 4, 6, or 12 columns.
- **Density:** Spacing is compact. A 4px/8px base unit is used for internal component padding, while 16px or 24px is reserved for major layout gaps.
- **Breakpoints:** 
  - **Large Desktop (1440px+):** Full 12-column visibility with 24px margins.
  - **Standard Desktop (1280px):** Content scales fluidly; sidebar remains fixed.
  - **Tablet Landscape (1024px):** Sidebar collapses to icon-only mode automatically.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** rather than traditional shadows. In a dark, dense environment, heavy shadows create visual "mud."

1. **Level 0 (Background):** `#0B1326` - The lowest plane.
2. **Level 1 (Cards/Sidebar):** `#151E33` - Raised slightly via color shift. No shadow, or a very subtle 1px stroke of `#242F47`.
3. **Level 2 (Modals/Popovers):** `#1C273D` - Elevated with a soft, 12% opacity black shadow (0px 8px 24px) and a subtle `#323F5A` top-border highlight.
4. **Interactive States:** Hovering over a list item or card should transition the background to `#1C273D` and brighten the border slightly.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a clean, architectural feel that balances the "Modern" aesthetic with "Professional" restraint.

- **Standard Elements:** Buttons, inputs, and small widgets use a 4px (0.25rem) radius.
- **Containers:** Large dashboard cards and panels use an 8px (0.5rem) radius for a slightly softer container feel.
- **Status Indicators:** Pills and status badges use a fully rounded (pill) radius to distinguish them from interactive buttons.
- **Charts:** Bar charts should have slight rounding (2px) on top corners only.

## Components

- **Data Grids:** High-density rows (40px height). Column headers use `label-caps`. Use zebra-striping only on hover. Inline actions should be subtle, appearing on row hover to reduce visual noise.
- **Sidebar Navigation:** Active states use a vertical 3px "Electric Blue" bar on the left edge and a subtle `#2E5BFF15` (15% opacity) background tint.
- **Metric Widgets:** Large "Display" numbers for KPIs, paired with a small sparkline and a percentage change indicator (Teal for up, Coral for down).
- **Buttons:**
  - *Primary:* Solid Electric Blue with white text.
  - *Secondary:* Ghost style with `#242F47` border and white text.
- **System Alerts:** Inline banners at the top of content areas. Use "Coral" background with 10% opacity and a solid 2px left-border for errors.
- **Input Fields:** Dark background (`#0B1326`), 1px border (`#242F47`). On focus, border transitions to Electric Blue with a subtle outer glow.
- **Charts:** Use a refined palette for multi-series data, ensuring the primary Electric Blue, Coral, and Teal are the anchor points, supplemented by neutral grays for secondary data.