# CLAUDE.md

## Project Overview

Build a React component library featuring a warm, cozy, capybara-themed design. The library uses `@base-ui/react` for accessible component logic and Storybook for component testing and documentation.

## Design System and Figma Connection

Use the Figma MCP server to read design tokens directly from the provided [Figma file](https://www.figma.com/design/J8NYRY4863ADctpSJErZ25/Personal-Productivity-Capy-App?node-id=0-1&t=gyO9eeePchoajDDU-1). Extract specific color hex codes, such as the primary brown and the capybara body colors. Read typography settings directly from the Figma file, focusing on the SF Pro Rounded and Inter fonts.

## Styling Rules

Avoid generic borders and standard CSS shapes. Implement the specific "warm and cozy" aesthetic by utilizing the custom SVG strokes, hand-drawn styles, and dialogue bubbles found in the Figma file. Apply CSS variables for all colors and stroke widths to maintain a consistent visual theme across all elements.

## Component Logic

Use `@base-ui/react` for all interactive behaviors, accessibility features, and state management. Map custom visual states to Base UI's data attributes. For example, connect the custom checked and unchecked toggle designs to the `[data-checked]` and `[data-unchecked]` attributes provided by Base UI.

## Workflow and Verification

Begin by setting up the foundational CSS variables, typography, and base icons. Build simple base components like buttons and text elements before assembling complex layouts like the Coin Wallet or Dialogue Bubble. Create a `.stories.tsx` file for every component. Capture screenshots of the rendered components in Storybook and compare them against the original Figma designs to verify visual accuracy before finalizing the code.
