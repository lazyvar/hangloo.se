# Light redesign — "warm paper" 🤙

**Date:** 2026-05-17
**Branch:** redesign
**Status:** Approved

## Goal

A light redesign of hangloo.se that keeps the minimal, papery, hang-loose
character intact while warming up a currently cold palette and tightening the
typographic rhythm. Polish plus tasteful layout refinements — nothing
structural moves.

## Scope

- In scope: CSS polish, color system, typography, header, search box, pensieve
  list, article page, footer, surfaces/motion, 404 consistency pass.
- Out of scope: homepage stays intentionally blank; clock CSS/JS untouched;
  fonts unchanged; content unchanged; no dark mode; search stays
  non-functional (wired up in a future change).

## Design decisions

### Color system

Driven by CSS custom properties in `:root` so the palette lives in one place.

| Token        | From                  | To                        |
|--------------|-----------------------|---------------------------|
| `--bg`       | `#f5f5f5` cold grey   | `#f4f1ea` warm paper      |
| `--surface`  | `#ffffff`             | `#fffdf9` warm white      |
| `--ink`      | `rgba(0,0,0,.87)`     | `#2a2521` warm near-black |
| `--muted`    | —                     | `#9a9183` warm grey       |
| `--accent`   | `#003366` + `#1074e7` | `#cf5c36` terracotta      |
| `--accent-strong` | —                | `#b04a28` (hover)         |
| `--hairline` | —                     | `#e6e0d4`                 |

Both blues are replaced by the single terracotta accent.

### Typography

- Keep Catamaran (body/headings) and Fira Code (mono).
- Body: unitless `line-height: 1.65`, font-size `~17px`.
- Keep justified body text (part of the vibe) but add `hyphens: auto` to
  remove gappy rivers.
- Headings: left-aligned (not justified), tighter line-height (~1.2), slightly
  heavier weight, faint negative letter-spacing.
- Dates/metadata: small, muted, Fira Code.

### Header

- `🤙 hangloo.se` reads as a proper wordmark (slightly larger/bolder).
- Sub-links (`/pensieve`, `/about`, `/author`) become a tidy mono "path" row:
  muted by default, accent on hover, accent for the active section.
- A hairline under the header for breathing room.
- Clock left untouched — it is the signature element.

### Search box (`.find`)

- Restyled from a mystery white slab into a slim, intentional bar: magnifying
  glass + faint mono "Search" label, soft hover lift.
- Stays non-functional; real search wired up in a future change.

### Pensieve list

- Each entry: date in muted mono, title in ink that goes accent with an
  animated underline on hover; comfortable row rhythm with faint dividers.

### Article page

- Readable measure (~680px within the card).
- Muted mono date line under the h1.
- Full prose styling that is currently missing: `h2`/`h3` rhythm, blockquote,
  inline-code chip, padded/rounded code blocks (keeps the existing Dracula
  `syntax.css`), list spacing, `hr`.

### Surfaces & motion

- Cards: `border-radius` `4px → 8px`; soft warm shadow instead of hard edges.
- Links: clean at rest, hover-animated underline in the accent color.
- Gentle transitions on interactive elements.

### Footer

- Currently an empty block. Add a whisper-light centered `🤙` + `hangloo.se`
  in muted mono.

## Files touched

- `layouts/_default/baseof.html` — styles reorganized into `:root` tokens +
  base + layout + components; header markup; search box markup.
- `layouts/_default/list.html` — pensieve list styling.
- `layouts/_default/single.html` — article meta line; prose styling.
- `layouts/_default/baseof.html` footer block — new footer.
- `layouts/404.html` — quick consistency pass against the new palette.

Untouched: `layouts/index.html` (blank homepage), `static/clock.css`,
`static/clock.js`, fonts, content.

## Success criteria

- `hugo` builds with no new errors.
- Homepage, `/pensieve`, the test article, `/about`, and `/404` all render
  with the new palette and look cohesive.
- The site still feels like the same minimal papery hang-loose site — just
  warmer and more polished.
