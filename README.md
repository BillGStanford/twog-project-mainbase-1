# TWOG — The Word of God

**twog.io** — A searchable archive of everything attributed to God in the Bible.

## Stack
- **Next.js 15** (App Router)
- **Tailwind CSS**
- **TypeScript**
- **lucide-react** icons

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Project Structure

```
twog/
├── app/
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout + SEO metadata
│   ├── globals.css            # Tailwind + custom styles
│   ├── api/og/route.tsx       # Dynamic OG image API (social share previews)
│   ├── browse/[category]/     # Category browse page
│   ├── verse/[id]/            # Single verse detail + OG meta
│   ├── random/                # Random verse generator
│   ├── search/                # Live search
│   ├── contradictions/        # Side-by-side contradiction pairs
│   └── lists/[slug]/          # Curated verse lists
├── components/
│   ├── Navbar.tsx
│   ├── VerseCard.tsx          # Core card: copy / share / download PNG
│   └── Footer.tsx
└── data/
    └── verses.js              # ALL verse data — edit this to add more
```

## Adding Verses

Open `data/verses.js` and add to the `verses` array:

```js
{
  id: "v99",                     // unique ID
  category: "violence",          // violence | slavery | women | punishment | contradictions | children
  subcategory: "War Commands",   // freeform
  book: "Deuteronomy",
  reference: "Deuteronomy 20:1",
  text: "Full verse text here.",
  context: "Short explanation of what this passage means.",
  shareText: "One-liner for social sharing.",
  featured: true,                // shows on homepage (optional)
  contradictsWith: "c1",         // ID of contradicting verse (optional)
  contradictionNote: "Explanation of the contradiction." // (optional)
}
```

## SEO

Every verse page generates:
- Unique `<title>` and `<meta description>`
- Dynamic OG image via `/api/og?id=v1`
- Twitter card with `summary_large_image`

When a link to `/verse/v1` is shared on Twitter, iMessage, or Slack, a full-size image card auto-generates showing the verse text with TWOG branding.
