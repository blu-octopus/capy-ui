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

Other scripts: `npm run typecheck` runs a strict `tsc --noEmit` pass; `npm run build-storybook` produces a static Storybook build, which [`.github/workflows/deploy-storybook.yml`](.github/workflows/deploy-storybook.yml) deploys automatically to GitHub Pages on every push to `main`.

### Hosted Storybook

**[blu-octopus.github.io/capy-ui](https://blu-octopus.github.io/capy-ui/)** — browse every component without installing anything.

## Components

All components live under [`src/components/cozy-ui`](src/components/cozy-ui), organized into `atoms/`, `molecules/`, and `organisms/` per [Brad Frost's atomic design system](https://atomicdesign.bradfrost.com/) (grouped by actual composition, not just visual complexity), and are re-exported from its [`index.ts`](src/components/cozy-ui/index.ts), so consumers can do:

```tsx
import { Button, Checkbox, DialogueBubble } from 'capy-ui/src/components/cozy-ui';
```

Every component has a co-located `.stories.tsx` — browse the **CozyUI** sidebar group on the [hosted Storybook](https://blu-octopus.github.io/capy-ui/) (or your local one), which mirrors this same Atoms/Molecules/Organisms grouping, or jump straight to one:

### Atoms

| Component | Story |
|---|---|
| [Text](src/components/cozy-ui/atoms/Text) (type scale) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-text--type-scale) |
| [Button](src/components/cozy-ui/atoms/Button) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-button--all-variants) |
| [Bubble](src/components/cozy-ui/atoms/Bubble) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-bubble--default) |
| [Checkbox](src/components/cozy-ui/atoms/Checkbox) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-checkbox--default) |
| [Toggle](src/components/cozy-ui/atoms/Toggle) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-toggle--default) |
| [Favicon](src/components/cozy-ui/atoms/Favicon) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-favicon--sizes) |
| [CapyMascot](src/components/cozy-ui/atoms/CapyMascot) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-capymascot--both-variants) |
| [ProgressRing](src/components/cozy-ui/atoms/ProgressRing) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-progressring--default) |
| [Locked](src/components/cozy-ui/atoms/Locked) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-locked--default) |
| [icons](src/components/cozy-ui/atoms/icons) (stats, return, restart, play, pause, skip, back, next) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-icons--all-icons) |
| [BatteryIndicator](src/components/cozy-ui/atoms/BatteryIndicator) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-atoms-batteryindicator--all-variants) |

### Molecules

| Component | Story |
|---|---|
| [CoinWallet](src/components/cozy-ui/molecules/CoinWallet) (+ `Coin`) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-molecules-coinwallet--grows-with-digit-count) |
| [ColorPicker](src/components/cozy-ui/molecules/ColorPicker) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-molecules-colorpicker--default) |
| [DailyStreaks](src/components/cozy-ui/molecules/DailyStreaks) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-molecules-dailystreaks--default) |
| [DialogueBubble](src/components/cozy-ui/molecules/DialogueBubble) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-molecules-dialoguebubble--width-tracks-content) |
| [Field](src/components/cozy-ui/molecules/Field) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-molecules-field--default) |
| [TimeTabs](src/components/cozy-ui/molecules/TimeTabs) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-molecules-timetabs--default) |
| [TimerToggle](src/components/cozy-ui/molecules/TimerToggle) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-molecules-timertoggle--count-up) |

### Organisms

| Component | Story |
|---|---|
| [Modal](src/components/cozy-ui/organisms/Modal) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-organisms-modal--default) |
| [InAppPurchaseCard](src/components/cozy-ui/organisms/InAppPurchase) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-organisms-inapppurchasecard--tiers) |
| [TrendCard](src/components/cozy-ui/organisms/TrendCard) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-organisms-trendcard--grid) |
| [PieChart](src/components/cozy-ui/organisms/PieChart) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-organisms-piechart--default) |
| [BarChart](src/components/cozy-ui/organisms/BarChart) | [Storybook](https://blu-octopus.github.io/capy-ui/?path=/story/cozyui-organisms-barchart--default) |

> Swap `blu-octopus.github.io/capy-ui` for `localhost:6006` in any link above to open the same story against a local `npm run storybook`.

## Usage guidelines

**Design tokens.** [`tokens.css`](src/components/cozy-ui/tokens.css) defines every color, font, and stroke width as a CSS custom property (`--color-brand-brown`, `--font-display`, `--stroke-width-2`, …). Style against these variables, never a hardcoded hex or `font-family` — it's the only thing keeping every component visually consistent with the Figma file if the palette ever changes. `.storybook/preview.ts` imports `tokens.css` globally for Storybook; a consuming app needs to import it once too.

**Base UI state, not custom state.** Interactive components wrap a Base UI primitive (`Checkbox.Root`, `Switch.Root`, `Tabs.Root`, `Dialog.Root`, `RadioGroup`, `Field.Root`) rather than reimplementing checked/open/selected logic. Visual states are driven by the `data-*` attributes Base UI already puts on the DOM node (`[data-checked]`, `[data-active]`, …) — check the relevant `*.module.css` file for the mapping before assuming a new state attribute exists; Base UI's naming isn't always the one you'd guess (e.g. the selected Tab gets `data-active`, not `data-selected`).

**Hand-drawn artwork is generated, not hand-coded.** Every wobbly stroke (icons, the dialogue bubble, coins, the lock, the capybara mascots, the battery indicator) is a real SVG exported from Figma, cleaned up, and turned into a `.tsx` file by a script in [`scripts/`](scripts) (`build-icons.mjs`, `build-favicon.mjs`, `build-bubble.mjs`, `build-battery.mjs`, `build-misc-icons.mjs`). **Never hand-edit a generated component** — the header comment says so for a reason. If the Figma artwork changes, re-run the matching script; if you need a new hand-drawn asset, add it to the relevant `assets/` folder and extend the script rather than transcribing paths by hand.

**Charts replicate Figma's data, not live data.** `PieChart` and `BarChart` take a `data` prop — the default values in their stories were reverse-engineered from the wedge angles / bar heights in the Figma vectors so the demo matches the mock, but both components are generic and take any dataset. Note: the pie chart's categorical palette is Figma's own secondary/pastel color tokens, which fail colorblind-safety validation (grey vs. red sit well below the safe separation floor) — this wasn't fixed by silently repainting the brand colors; see the comment in `PieChart.stories.tsx` before reusing that palette elsewhere.

**Adding a new component.** Follow the order in `CLAUDE.md`: pull the node's design context from Figma first, reuse tokens instead of new hex values, build the simplest primitive before composing it into something bigger, and give it a `.stories.tsx` that's screenshotted against the Figma reference before calling it done.
