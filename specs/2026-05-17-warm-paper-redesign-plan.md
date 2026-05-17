# Warm-Paper Light Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Warm up hangloo.se's cold palette and tighten its typography with a single terracotta accent, while keeping the minimal papery hang-loose character.

**Architecture:** All site CSS lives inline in `layouts/_default/baseof.html`'s `<style>` block (existing pattern — one request, no flicker). The redesign reorganizes that block into `:root` design tokens + base + components, then makes small markup edits in `baseof.html`, `list.html`, and `single.html` to add classes the new CSS targets. No structural changes; homepage, clock, fonts, and content are untouched.

**Tech Stack:** Hugo (static site generator), hand-written CSS, Go HTML templates.

**Spec:** `specs/2026-05-17-warm-paper-redesign-design.md`

---

## File Structure

- `layouts/_default/baseof.html` — the whole `<style>` block is rewritten; header and search-box markup updated; footer block filled in.
- `layouts/_default/list.html` — pensieve list markup updated to use `.post-list` classes.
- `layouts/_default/single.html` — adds a post-meta line and relies on the new prose CSS.
- `layouts/404.html` — no edit expected; inherits the new palette. Task 5 only verifies it.

---

## Task 1: Rewrite the `<style>` block and header/search/footer markup in `baseof.html`

**Files:**
- Modify: `layouts/_default/baseof.html`

This is the core task. The four `@font-face` declarations at the top of the
`<style>` block stay exactly as they are. Everything in the `<style>` block
*after* the last `@font-face` block (i.e. the rules starting at `a { ... }`) is
replaced with the CSS below.

- [ ] **Step 1: Replace the CSS rules**

In `layouts/_default/baseof.html`, leave the four `@font-face` blocks intact.
Replace everything from `a { text-decoration: none; color: #003366; }` through
the end of the existing rules (the last `.find:hover svg` rule) with:

```css
    :root {
      --bg: #f4f1ea;
      --surface: #fffdf9;
      --ink: #2a2521;
      --muted: #9a9183;
      --accent: #cf5c36;
      --accent-strong: #b04a28;
      --hairline: #e6e0d4;
      --code-chip: #f0ebe0;
      --radius: 8px;
      --shadow: 0 1px 2px rgba(40, 30, 20, .04), 0 10px 28px rgba(40, 30, 20, .06);
      --measure: 680px;
      --mono: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace;
    }

    * { box-sizing: border-box; }

    body {
      font-family: 'Catamaran', 'Helvetica', sans-serif;
      background: var(--bg);
      color: var(--ink);
      margin: 25px auto 0;
      max-width: 8.5in;
      padding: 20px;
      display: flex;
      flex-direction: column;
      line-height: 1.65;
      font-size: 17px;
      text-align: justify;
      hyphens: auto;
      -webkit-hyphens: auto;
    }

    code, pre, kbd, samp { font-family: var(--mono); }

    a {
      color: var(--accent);
      text-decoration: none;
      background-image: linear-gradient(var(--accent-strong), var(--accent-strong));
      background-repeat: no-repeat;
      background-position: 0 100%;
      background-size: 0 1.5px;
      transition: background-size .2s ease, color .15s ease;
    }
    a:hover {
      color: var(--accent-strong);
      background-size: 100% 1.5px;
    }

    /* Header */
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--hairline);
    }
    .all-links { margin-top: auto; margin-bottom: auto; }
    .wordmark {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--ink);
      background-image: none;
    }
    .wordmark:hover { color: var(--ink); }
    .sub-links {
      margin-top: 12px;
      display: flex;
      gap: 16px;
      font-family: var(--mono);
      font-size: 0.8rem;
    }
    .sub-links a { color: var(--muted); background-image: none; }
    .sub-links a:hover,
    .sub-links a.active { color: var(--accent); }

    /* Search box */
    .find {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--surface);
      border: 1px solid var(--hairline);
      color: var(--muted);
      padding: 8px 14px;
      margin-top: 16px;
      border-radius: 999px;
      font-family: var(--mono);
      font-size: 0.8rem;
      cursor: pointer;
      transition: box-shadow .2s ease, border-color .2s ease;
    }
    .find:hover { border-color: var(--accent); box-shadow: var(--shadow); }
    .find svg { stroke: var(--muted); display: block; }
    .find:hover svg { stroke: var(--accent); }

    /* Main / article card */
    main {
      margin-top: 16px;
      padding: 28px 32px;
      border-radius: var(--radius);
      background: var(--surface);
      box-shadow: var(--shadow);
    }
    main h1 {
      text-align: left;
      font-size: 2rem;
      line-height: 1.2;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 0.2em 0 0.1em;
    }
    article { max-width: var(--measure); }
    article h2, article h3 {
      text-align: left;
      line-height: 1.25;
      letter-spacing: -0.015em;
      margin-top: 1.6em;
      margin-bottom: 0.4em;
    }
    article h2 { font-size: 1.4rem; }
    article h3 { font-size: 1.15rem; }
    article p { margin: 0.9em 0; }
    article ul, article ol { padding-left: 1.4em; }
    article li { margin: 0.3em 0; }
    article hr {
      border: none;
      border-top: 1px solid var(--hairline);
      margin: 2em 0;
    }
    article img { max-width: 100%; height: auto; border-radius: var(--radius); }

    /* Code */
    code {
      background: var(--code-chip);
      padding: 0.12em 0.4em;
      border-radius: 4px;
      font-size: 0.88em;
    }
    pre {
      padding: 16px 18px;
      border-radius: var(--radius);
      overflow-x: auto;
      line-height: 1.5;
    }
    pre code { background: none; padding: 0; font-size: 0.85em; }

    /* Blockquote */
    blockquote {
      border-left: 3px solid var(--accent);
      padding: 0 0 0 1.4em;
      margin: 1.2em 0;
      color: var(--muted);
      font-style: italic;
    }

    /* Article meta */
    .post-meta {
      font-family: var(--mono);
      font-size: 0.78rem;
      color: var(--muted);
      text-align: left;
      margin-bottom: 1.4em;
    }

    /* Pensieve list */
    .post-list-item {
      display: flex;
      gap: 16px;
      align-items: baseline;
      padding: 12px 0;
      border-bottom: 1px solid var(--hairline);
      text-align: left;
    }
    .post-list-item:last-child { border-bottom: none; }
    .post-list-item .date {
      font-family: var(--mono);
      font-size: 0.78rem;
      color: var(--muted);
      white-space: nowrap;
    }
    .post-list-item .title { font-size: 1.05rem; }

    /* Footer */
    footer {
      text-align: center;
      margin-top: 28px;
      padding-top: 16px;
      color: var(--muted);
      font-family: var(--mono);
      font-size: 0.78rem;
    }
    footer a { color: var(--muted); background-image: none; }
    footer a:hover { color: var(--accent); }
```

Note: the existing `code, pre, kbd, samp` font-family rule is folded into the
block above — make sure no duplicate of it is left behind.

- [ ] **Step 2: Update the header markup**

Replace the existing `<div class="all-links">` block (the one containing the
`🤙`, the `hangloo.se` link, and the `sub-links` div) with:

```html
    <div class="all-links">
      <a class="wordmark" href="/">🤙 hangloo.se</a>
      <div class="sub-links">
        <a href="/pensieve"{{ if hasPrefix .RelPermalink "/pensieve" }} class="active"{{ end }}>/pensieve</a>
        <a href="/about"{{ if hasPrefix .RelPermalink "/about" }} class="active"{{ end }}>/about</a>
        <a href="https://mack.cloud">/author</a>
      </div>
    </div>
```

Leave the `<div class="clock-container">…</div>` block immediately after it
exactly as it is.

- [ ] **Step 3: Update the search-box markup**

Replace the existing `<div class="find">…</div>` block with (keep the existing
`<svg>` contents byte-for-byte; only the wrapper and the added `<span>` change):

```html
  <div class="find">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="darkgray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <span>Search</span>
  </div>
```

- [ ] **Step 4: Fill in the footer block**

Replace the empty footer block:

```html
  {{ block "footer" . }}
  {{ end }}
```

with:

```html
  {{ block "footer" . }}
  <footer>
    🤙 hangloo.se
  </footer>
  {{ end }}
```

- [ ] **Step 5: Build and verify**

Run: `hugo`
Expected: build succeeds, "Pages │ 12", no new ERROR lines (the pre-existing
`languageCode` deprecation WARN is unrelated and acceptable).

- [ ] **Step 6: Commit**

```bash
git add layouts/_default/baseof.html
git commit -m "Redesign: warm-paper palette, tokens, header, search, footer"
```

---

## Task 2: Update the pensieve list (`list.html`)

**Files:**
- Modify: `layouts/_default/list.html`

- [ ] **Step 1: Replace the list markup**

Replace the entire contents of `layouts/_default/list.html` with:

```html
{{ define "main" }}
<main>
  <h1>{{ .Title }}</h1>
  {{ range .Pages.ByPublishDate.Reverse }}
  <div class="post-list-item">
    <span class="date">{{ .Date.Format "2006-01-02" }}</span>
    <a class="title" href="{{ .Permalink }}">{{ .Title }}</a>
  </div>
  {{ end }}
</main>
{{ end }}
```

This swaps the plain `<p>date <a>title</a></p>` rows for `.post-list-item`
rows, switches the date to ISO format for the mono treatment, and orders
newest-first.

- [ ] **Step 2: Build and verify**

Run: `hugo`
Expected: build succeeds. Then check the rendered list:
Run: `grep -c 'post-list-item' docs/pensieve/index.html`
Expected: `1` (one entry — the test article).

- [ ] **Step 3: Commit**

```bash
git add layouts/_default/list.html
git commit -m "Redesign: restyle pensieve list with date/title rows"
```

---

## Task 3: Add the article meta line (`single.html`)

**Files:**
- Modify: `layouts/_default/single.html`

`single.html` renders both pensieve articles and the About page. The meta line
must show only for pensieve posts, so it is gated on `.Section`. The About page
is a leaf bundle at the content root, so its `.Section` is empty and the gate
correctly hides the meta there.

- [ ] **Step 1: Replace the single-page markup**

Replace the entire contents of `layouts/_default/single.html` with:

```html
{{ define "main" }}
<main>
  <h1>{{ .Title }}</h1>
  {{ if eq .Section "pensieve" }}
  <div class="post-meta">{{ .Date.Format "January 2, 2006" }}</div>
  {{ end }}
  <article>
    {{ .Content }}
  </article>
</main>
{{ end }}
```

- [ ] **Step 2: Build and verify**

Run: `hugo`
Expected: build succeeds. Then verify the meta line appears on the article and
not on About:
Run: `grep -c 'post-meta' docs/pensieve/test-article/index.html docs/about/index.html`
Expected: `docs/pensieve/test-article/index.html:1` and
`docs/about/index.html:0`.

- [ ] **Step 3: Commit**

```bash
git add layouts/_default/single.html
git commit -m "Redesign: add post meta line to articles"
```

---

## Task 4: Final build and visual verification

**Files:**
- Possibly modify: `layouts/404.html` (only if the verification finds a problem)

- [ ] **Step 1: Clean build**

Run: `hugo`
Expected: build succeeds, "Pages │ 12", no new ERROR lines.

- [ ] **Step 2: Inspect every page type**

Open the rendered files (in a browser or by serving `docs/`) and confirm the
warm palette and cohesive look on each:
- `docs/index.html` — blank homepage: header, search box, clock, footer.
- `docs/pensieve/index.html` — list with the dated test-article row.
- `docs/pensieve/test-article/index.html` — article: h1, meta line, prose,
  blockquote, code block, lists.
- `docs/about/index.html` — about page, no meta line.
- `docs/404.html` — 404 page picks up the warm `--bg` and `--ink`.

The 404 page hardcodes no colors, so it should inherit the new palette with no
edit. If it visibly clashes, adjust `layouts/404.html` minimally to match.

- [ ] **Step 3: Confirm against success criteria**

- `hugo` builds with no new errors.
- All five page types render with the new palette and look cohesive.
- The site still reads as the same minimal papery hang-loose site — warmer.

- [ ] **Step 4: Commit any 404 fix (only if Step 2 required one)**

```bash
git add layouts/404.html
git commit -m "Redesign: align 404 page with warm palette"
```

---

## Self-Review

- **Spec coverage:** color system → Task 1 `:root`; typography → Task 1 `body`
  + headings; header → Task 1 Steps 2; search box → Task 1 Steps 1+3; pensieve
  list → Tasks 1+2; article page → Tasks 1+3; surfaces/motion → Task 1
  (`--shadow`, `--radius`, `a` transition); footer → Task 1 Steps 1+4; 404
  consistency → Task 4. All spec sections covered.
- **Placeholder scan:** none — every step has concrete code or commands.
- **Type consistency:** class names `.find`, `.wordmark`, `.sub-links`,
  `.post-list-item`, `.date`, `.title`, `.post-meta` and tokens `--bg`,
  `--surface`, `--ink`, `--muted`, `--accent`, `--accent-strong`, `--hairline`,
  `--code-chip`, `--radius`, `--shadow`, `--measure`, `--mono` are used
  consistently between the CSS in Task 1 and the markup in Tasks 1–3.
