<div align="center">

<img src=".github/readme-assets/mascot.svg" alt="capy-ui mascot" width="96" />

# capy-ui

A cozy-themed React component library, built to make things cute while staying minimalistic.

[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://blu-octopus.github.io/capy-ui/)
[![Deploy status](https://github.com/blu-octopus/capy-ui/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/blu-octopus/capy-ui/actions/workflows/deploy-storybook.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Figma](https://img.shields.io/badge/Design-Figma-F24E1E?logo=figma&logoColor=white)](https://www.figma.com/design/J8NYRY4863ADctpSJErZ25/Personal-Productivity-Capy-App)

**[👉 Browse the live Storybook](https://blu-octopus.github.io/capy-ui/)**

</div>

Every component is a faithful implementation of the [Personal Productivity Capy App Figma file](https://www.figma.com/design/J8NYRY4863ADctpSJErZ25/Personal-Productivity-Capy-App) — colors, typography, and hand-drawn strokes are pulled directly from the design, not approximated. If you're a **designer**, this repo is the reference for how your Figma work actually ships. If you're a **developer**, it's a ready-to-use, accessible component set you can install or fork.

## Contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [For designers](#for-designers)
- [Components](#components)
- [Usage guidelines](#usage-guidelines)
- [Contributing](#contributing)
- [License](#license)

## Stack

- **React 18** + **TypeScript**, strict mode on
- [**Base UI**](https://base-ui.com) (`@base-ui/react`) for accessible, unstyled interaction primitives (dialogs, checkboxes, tabs, switches, radio groups) — this library only supplies the look, Base UI supplies correct keyboard/screen-reader behavior
- **Storybook 8** for component development, visual testing, and documentation
- Plain **CSS Modules** + design-token **CSS variables** for styling — no CSS-in-JS, no Tailwind, so anything here is easy to read and easy to fork

## Getting started

```bash
git clone https://github.com/blu-octopus/capy-ui.git
cd capy-ui
npm install
npm run storybook
```

Storybook launches automatically at **[localhost:6006](http://localhost:6006)**. Use the **CozyUI** sidebar group — grouped into **Atoms / Molecules / Organisms** — to browse every component; each one's stories show its states/variants side by side.

Don't want to install anything? The same Storybook is **[hosted on GitHub Pages](https://blu-octopus.github.io/capy-ui/)** and redeploys automatically on every push to `main` via [`.github/workflows/deploy-storybook.yml`](.github/workflows/deploy-storybook.yml).

Other scripts:

| Command | What it does |
|---|---|
| `npm run storybook` | Local dev server with hot reload |
| `npm run build-storybook` | Static Storybook build (what gets deployed to Pages) |
| `npm run typecheck` | Strict `tsc --noEmit` pass — run this before opening a PR |

## For designers

- **Source of truth:** the [Figma file](https://www.figma.com/design/J8NYRY4863ADctpSJErZ25/Personal-Productivity-Capy-App) is canonical. Every component here was built by pulling that file's exact colors, type, spacing, and vector artwork — nothing was eyeballed or approximated from a screenshot.
- **Design tokens map 1:1 to Figma variables.** [`tokens.css`](src/components/cozy-ui/tokens.css) holds every color, font, and stroke width as a CSS custom property, named to match the Figma variable it came from (e.g. `--color-brand-brown`, `--font-display`, `--stroke-width-2`). Change a value in Figma, update it here, and every component picks it up — no hunting through individual files.
- **The "hand-drawn" look is a real, adjustable effect, not a font choice.** Figma's "Dynamic Stroke" wobble is reproduced in code with an SVG `feTurbulence`/`feDisplacementMap` filter (see [`Bubble.tsx`](src/components/cozy-ui/atoms/Bubble/Bubble.tsx) or [`Text.tsx`](src/components/cozy-ui/atoms/Text/Text.tsx)), so the organic stroke wobble genuinely resizes and redraws instead of using a baked-in image.
- **Everything is organized by [atomic design](https://atomicdesign.bradfrost.com/)** — `atoms/`, `molecules/`, and `organisms/` — mirroring how small pieces (a `Button`, an `icon`) combine into bigger ones (a `Modal`, a `TrendCard`). If you're proposing a new pattern, think about which layer it belongs to before it's built.
- **Filing a design change:** open an issue linking the exact Figma node (right-click → **Copy link to selection**) and describe what changed — color, spacing, a new state — so it can be diffed directly against the token/component that needs updating.

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

**Hand-drawn artwork is generated or filtered, never hand-coded.** Static hand-drawn shapes (icons, coins, the lock, the capybara mascots, the battery indicator, the favicon) are real SVGs exported from Figma, cleaned up, and turned into `.tsx` files by a script in [`scripts/`](scripts) (`build-icons.mjs`, `build-favicon.mjs`, `build-battery.mjs`, `build-misc-icons.mjs`). **Never hand-edit a generated component** — the header comment says so for a reason; if the Figma artwork changes, re-run the matching script, and if you need a new hand-drawn asset, add it to the relevant `assets/` folder and extend the script rather than transcribing paths by hand. Shapes that need to resize on the fly instead (`Bubble`'s outline, `DialogueBubble`'s tail, `Text`'s dynamic-stroke variants) use a live SVG `feTurbulence`/`feDisplacementMap` filter, since a tiled or baked-in wobbly line shows a seam wherever it repeats.

**Charts replicate Figma's data, not live data.** `PieChart` and `BarChart` take a `data` prop — the default values in their stories were reverse-engineered from the wedge angles / bar heights in the Figma vectors so the demo matches the mock, but both components are generic and take any dataset. Note: the pie chart's categorical palette is Figma's own secondary/pastel color tokens, which fail colorblind-safety validation (grey vs. red sit well below the safe separation floor) — this wasn't fixed by silently repainting the brand colors; see the comment in `PieChart.stories.tsx` before reusing that palette elsewhere.

**Adding a new component.** Follow the order in [`CLAUDE.md`](CLAUDE.md): pull the node's design context from Figma first, reuse tokens instead of new hex values, build the simplest primitive before composing it into something bigger, decide which atomic-design tier it belongs in, and give it a `.stories.tsx` that's screenshotted against the Figma reference before calling it done.

## Contributing

Issues and PRs are welcome, from a one-character typo fix to a whole new component.

1. **Fork and clone**, then `npm install` and `npm run storybook` to confirm everything renders before you start.
2. **Match the existing patterns** rather than introducing a new one: CSS Modules + tokens (not Tailwind or CSS-in-JS), Base UI for any interactive/accessible behavior, generator scripts for static hand-drawn assets. See [Usage guidelines](#usage-guidelines) above and [`CLAUDE.md`](CLAUDE.md) for the full house style.
3. **New components** go under `src/components/cozy-ui/{atoms,molecules,organisms}/<Name>` (pick the tier based on what it composes — see [Components](#components)), need a co-located `.stories.tsx`, and get re-exported from [`index.ts`](src/components/cozy-ui/index.ts).
4. **Before opening a PR:** run `npm run typecheck` and `npm run build-storybook` locally — both must pass clean. If you touched anything visual, include a before/after screenshot from Storybook in the PR description.
5. **Keep PRs scoped** — one component or one fix per PR is much easier to review than a bundle of unrelated changes.

Design-only contributions (color/spacing/copy tweaks sourced from Figma) are just as welcome as code — see [For designers](#for-designers) above for how to file one.

## License

[MIT](LICENSE) © blu-octopus
