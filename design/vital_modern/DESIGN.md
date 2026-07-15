---
name: Vital-Modern
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#e4beba'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#ab8985'
  outline-variant: '#5b403d'
  surface-tint: '#ffb3ac'
  primary: '#ffb3ac'
  on-primary: '#680007'
  primary-container: '#d32d2d'
  on-primary-container: '#fff0ef'
  inverse-primary: '#ba181e'
  secondary: '#ffb3b0'
  on-secondary: '#68000f'
  secondary-container: '#901822'
  on-secondary-container: '#ff9e9b'
  tertiary: '#3cddc7'
  on-tertiary: '#003731'
  tertiary-container: '#007d70'
  on-tertiary-container: '#c4fff3'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#93000f'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b0'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#8c1520'
  tertiary-fixed: '#62fae3'
  tertiary-fixed-dim: '#3cddc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-metrics:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px
---

## Brand & Style
The design system bridges the gap between precision clinical data and lifestyle wellness. It targets proactive individuals who demand high-fidelity health insights without the sterility of traditional medical software. 

The aesthetic is a fusion of **Modern Minimalism** and **Glassmorphism**. It utilizes deep, immersive backgrounds to provide a canvas for vibrant, glowing data visualizations. The interface feels advanced and technical—evoking a sense of "medical-grade" reliability—while remaining approachable through soft lighting effects, generous whitespace, and organic motion.

## Colors
The palette is optimized for high-contrast data legibility on OLED displays. 

- **Background (Slate/Midnight):** `#0F172A` serves as the primary canvas, reducing eye strain and allowing vibrant accents to "pop."
- **Crimson Red (Primary Focus):** `#D32D2D` represents critical data points, high-priority health metrics, and urgency.
- **Coral (Heart/Vitals):** `#FF6B6B` used for supporting metrics and cardiac data.
- **Teal (Hydration/Metabolism):** `#2DD4BF` evokes a sense of fluid balance and purity.
- **Neutral (Surface):** `#0F172A` provides the foundation, while semi-transparent variants of white (10-15% opacity) are used for glassmorphic containers.

## Typography
The system relies exclusively on **Inter** to ensure maximum legibility of complex numerical data. 

- **Display Metrics:** Used for primary health values (e.g., current BPM or daily steps). It features tight letter-spacing to feel "instrumental."
- **Label Caps:** Used for metadata, axis labels on charts, and secondary categories.
- **Weights:** Heavy use of SemiBold (600) for hierarchy, while Medium (500) and Regular (400) handle descriptive text.
- **Contrast:** High-value numbers should always use the primary or semantic accent colors to guide the eye immediately to the data.

## Layout & Spacing
The layout follows a **Fluid Grid** model with high internal density within data cards and generous external margins to maintain a premium feel.

- **Mobile:** 4-column grid with 24px side margins. Elements are primarily stacked vertically in card modules.
- **Desktop/Tablet:** 12-column grid. Uses a "Dashboard" approach where metrics are grouped into functional clusters.
- **Rhythm:** An 8px linear scale governs all padding and margins. Vertical rhythm is emphasized to create clear separation between different health categories.

## Elevation & Depth
Depth is achieved through **Glassmorphism** rather than traditional drop shadows.

- **Surface Layers:** Cards use a background blur (Backdrop Filter: 20px) and a subtle 1px inner border (white at 15% opacity) to simulate the edge of a glass pane.
- **Z-Axis Hierarchy:**
    - **Level 0 (Background):** Solid Midnight Blue.
    - **Level 1 (Cards):** Translucent glass containers.
    - **Level 2 (Modals/Popovers):** Higher opacity glass with a subtle ambient glow matching the primary accent color.
- **Glows:** Key metrics and active progress rings utilize an "Outer Glow" (soft shadow with the metric's specific color) to appear as though the data is emitting light.

## Shapes
The shape language is organic and soft, countering the "hard" data within.

- **Large Containers:** Cards and main dashboard sections use a 24px radius (`rounded-xl`) to feel modern and friendly.
- **Small Elements:** Buttons, input fields, and tags use a 12px or 16px radius (`rounded-lg`).
- **Progress Bars:** Use fully rounded caps (Pill-shaped) to represent continuous flow and movement.

## Components
- **Glass Cards:** The core unit of the design system. Must include a 1px border-stroke on the top and left edges to catch "light."
- **Data Rings:** Circular progress indicators with a gradient stroke and a terminal glow point.
- **Action Buttons:** Large, high-saturation Crimson Red fills with white text. Primary buttons should have a slight "elevation glow" when active.
- **Inputs:** Darker than the background with a 1px focused border in Crimson Red.
- **Linear Icons:** 2px stroke weight, non-filled icons for a clean, technical look. Icons should adopt the color of the metric they represent (e.g., critical alerts use Crimson).
- **Segmented Controls:** Pill-shaped toggles that use a glass "slider" to indicate the selected state.