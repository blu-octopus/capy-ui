# capy-ui

A cozy-themed React component library, built to make things cute while staying minimalistic. Every component is a faithful implementation of the [Personal Productivity Capy App Figma file](https://www.figma.com/design/J8NYRY4863ADctpSJErZ25/Personal-Productivity-Capy-App) — colors, typography, and hand-drawn strokes are pulled directly from the design, not approximated.

## Stack

- **React 18** + **TypeScript**
- [**Base UI**](https://base-ui.com) (`@base-ui/react`) for accessible, unstyled interaction primitives (dialogs, checkboxes, tabs, switches, radio groups)
- **Storybook 8** for component development, visual testing, and documentation
- Plain **CSS Modules** + design-token **CSS variables** for styling — no CSS-in-JS, no Tailwind

## Getting started

### Opening Storybook

1. Install dependencies: `npm install`
2. Start Storybook: `npm run storybook`
3. It launches automatically in your browser; if it doesn't, open **[http://localhost:6006](http://localhost:6006)** yourself.
4. Use the **CozyUI** group in the left sidebar to browse every component — each one's stories show its states/variants side by side.

Other scripts: `npm run typecheck` runs a strict `tsc --noEmit` pass; `npm run build-storybook` produces a static Storybook build for deployment (e.g. to GitHub Pages or Chromatic — not wired up yet).

## Components

All components live under [`src/components/cozy-ui`](src/components/cozy-ui) and are re-exported from its [`index.ts`](src/components/cozy-ui/index.ts), so consumers can do:

```tsx
import { Button, Checkbox, DialogueBubble } from 'capy-ui/src/components/cozy-ui';
```

Every component has a co-located `.stories.tsx` — run Storybook and browse the **CozyUI** sidebar group, or jump straight to one:

| Component | Story |
|---|---|
| [Button](src/components/cozy-ui/Button) | [Storybook](http://localhost:6006/?path=/story/cozyui-button--default) |
| [Checkbox](src/components/cozy-ui/Checkbox) | [Storybook](http://localhost:6006/?path=/story/cozyui-checkbox--default) |
| [Toggle](src/components/cozy-ui/Toggle) | [Storybook](http://localhost:6006/?path=/story/cozyui-toggle--default) |
| [Text](src/components/cozy-ui/Text) (type scale) | [Storybook](http://localhost:6006/?path=/story/cozyui-text--type-scale) |
| [icons](src/components/cozy-ui/icons) (stats, return, restart, play, pause, skip, back, next) | [Storybook](http://localhost:6006/?path=/story/cozyui-icons--all-icons) |
| [Favicon](src/components/cozy-ui/Favicon) | [Storybook](http://localhost:6006/?path=/story/cozyui-favicon--sizes) |
| [CapyMascot](src/components/cozy-ui/CapyMascot) | [Storybook](http://localhost:6006/?path=/story/cozyui-capymascot--both-variants) |
| [CoinWallet](src/components/cozy-ui/CoinWallet) (+ `Coin`) | [Storybook](http://localhost:6006/?path=/story/cozyui-coinwallet--grows-with-digit-count) |
| [DialogueBubble](src/components/cozy-ui/DialogueBubble) | [Storybook](http://localhost:6006/?path=/story/cozyui-dialoguebubble--width-tracks-content) |
| [Locked](src/components/cozy-ui/Locked) | [Storybook](http://localhost:6006/?path=/story/cozyui-locked--default) |
| [BatteryIndicator](src/components/cozy-ui/BatteryIndicator) | [Storybook](http://localhost:6006/?path=/story/cozyui-batteryindicator--all-variants) |
| [TimeTabs](src/components/cozy-ui/TimeTabs) | [Storybook](http://localhost:6006/?path=/story/cozyui-timetabs--default) |
| [TimerToggle](src/components/cozy-ui/TimerToggle) | [Storybook](http://localhost:6006/?path=/story/cozyui-timertoggle--count-up) |
| [ColorPicker](src/components/cozy-ui/ColorPicker) | [Storybook](http://localhost:6006/?path=/story/cozyui-colorpicker--default) |
| [Field](src/components/cozy-ui/Field) | [Storybook](http://localhost:6006/?path=/story/cozyui-field--default) |
| [Modal](src/components/cozy-ui/Modal) | [Storybook](http://localhost:6006/?path=/story/cozyui-modal--default) |
| [TrendCard](src/components/cozy-ui/TrendCard) (+ `ProgressRing`) | [Storybook](http://localhost:6006/?path=/story/cozyui-trendcard--grid) |
| [PieChart](src/components/cozy-ui/PieChart) | [Storybook](http://localhost:6006/?path=/story/cozyui-piechart--default) |
| [BarChart](src/components/cozy-ui/BarChart) | [Storybook](http://localhost:6006/?path=/story/cozyui-barchart--default) |
| [InAppPurchaseCard](src/components/cozy-ui/InAppPurchase) | [Storybook](http://localhost:6006/?path=/story/cozyui-inapppurchasecard--tiers) |
| [DailyStreaks](src/components/cozy-ui/DailyStreaks) | [Storybook](http://localhost:6006/?path=/story/cozyui-dailystreaks--default) |

> Storybook links above only resolve once `npm run storybook` is running locally — there's no hosted deployment yet.

## Usage guidelines

**Design tokens.** [`tokens.css`](src/components/cozy-ui/tokens.css) defines every color, font, and stroke width as a CSS custom property (`--color-brand-brown`, `--font-display`, `--stroke-width-2`, …). Style against these variables, never a hardcoded hex or `font-family` — it's the only thing keeping every component visually consistent with the Figma file if the palette ever changes. `.storybook/preview.ts` imports `tokens.css` globally for Storybook; a consuming app needs to import it once too.

**Base UI state, not custom state.** Interactive components wrap a Base UI primitive (`Checkbox.Root`, `Switch.Root`, `Tabs.Root`, `Dialog.Root`, `RadioGroup`, `Field.Root`) rather than reimplementing checked/open/selected logic. Visual states are driven by the `data-*` attributes Base UI already puts on the DOM node (`[data-checked]`, `[data-active]`, …) — check the relevant `*.module.css` file for the mapping before assuming a new state attribute exists; Base UI's naming isn't always the one you'd guess (e.g. the selected Tab gets `data-active`, not `data-selected`).

**Hand-drawn artwork is generated, not hand-coded.** Every wobbly stroke (icons, the dialogue bubble, coins, the lock, the capybara mascots, the battery indicator) is a real SVG exported from Figma, cleaned up, and turned into a `.tsx` file by a script in [`scripts/`](scripts) (`build-icons.mjs`, `build-favicon.mjs`, `build-bubble.mjs`, `build-battery.mjs`, `build-misc-icons.mjs`). **Never hand-edit a generated component** — the header comment says so for a reason. If the Figma artwork changes, re-run the matching script; if you need a new hand-drawn asset, add it to the relevant `assets/` folder and extend the script rather than transcribing paths by hand.

**Charts replicate Figma's data, not live data.** `PieChart` and `BarChart` take a `data` prop — the default values in their stories were reverse-engineered from the wedge angles / bar heights in the Figma vectors so the demo matches the mock, but both components are generic and take any dataset. Note: the pie chart's categorical palette is Figma's own secondary/pastel color tokens, which fail colorblind-safety validation (grey vs. red sit well below the safe separation floor) — this wasn't fixed by silently repainting the brand colors; see the comment in `PieChart.stories.tsx` before reusing that palette elsewhere.

**Adding a new component.** Follow the order in `CLAUDE.md`: pull the node's design context from Figma first, reuse tokens instead of new hex values, build the simplest primitive before composing it into something bigger, and give it a `.stories.tsx` that's screenshotted against the Figma reference before calling it done.
