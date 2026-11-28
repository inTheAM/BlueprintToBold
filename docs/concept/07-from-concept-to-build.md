# From concept to build

The concept was agreed with the changes below. This page records what was decided after
review and where the built site (in [`public/`](../../public/)) departs from the board.

## Decisions after review

- **Purpose.** The site serves both Faiza's personal brand and bookings for mentoring,
  speaking and workshops.
- **Domain.** The site lives at **faizamgua.com**, not the `blueprinttobold.com` shown in
  the mock-up.
- **Photos.** The build uses the two photos from the PDF for now. Higher-resolution
  photos will replace them later.
- **Contact details.** Faiza will provide them. Until then the contact rows read
  *Coming soon*.
- **The lens shift.** The *Shift the lens* idea was kept, but the menu-bar switch alone
  was easy to miss. Instead, her line *"You don't have to burn it all down. Just shift the
  lens."* became the moment the shift happens, so every visitor sees it by scrolling.

## Where the site differs from the board

### The lens shift

| Concept | Built site |
| --- | --- |
| Each section starts as blueprint and turns bold as it scrolls into view (*Drawn, then built*). | The page opens in Blueprint and shifts to Bold **once**. At the *Shift* section, the quote sits on a pinned stage and a circular lens opens over it as you scroll, revealing the Bold version underneath. On desktop the lens follows the pointer. Everything below the quote is Bold. |
| The menu-bar switch is the main way to see the shift. | The switch stays in the menu bar as a secondary control, for flipping back and forth at any time. |
| Visitors who turn off motion see the finished page. | Same principle: with reduced motion, the quote is a plain section and lens changes are instant. |

### Sections

The board planned eight sections. The site has eleven, in an order that follows her story
from past to present.

| Built site | From the board |
| --- | --- |
| 1. Hero | 01 Hero |
| 2. Statement | 02 Statement |
| 3. Story | 04 The Story, moved up so the past comes before the framework |
| 4. Shift | New: the lens-shift quote |
| 5. Today | New: her M&A work and *What architecture gave me* |
| 6. Framework | 03 The B.O.L.D Framework, now with an *Ask yourself* question per move |
| 7. Lessons | 05 Lessons |
| 8. Still in it | 06 Still in it |
| 9. Work with me | New: Mentoring, Speaking and Workshops, with *Start a conversation* (from *Next* on the board, brought forward for bookings) |
| 10. Your next move | 07 Your next move |
| 11. Get in touch | Part of 08 Footer |

### Other changes

- **Your next move.** Three fields instead of two: the move you've been afraid to make, a
  skill you're sitting on, and one small step for the next 7 days. The answers fill a
  *My B.O.L.D blueprint* card that visitors can copy. Answers are saved only in the
  visitor's own browser.
- **Learn Out Loud.** No newsletter sign-up yet. The contact section says a journal and
  newsletter are on the way.
- **Statement band.** The bold phrase *I brought it with me* changes weight with the lens,
  rather than thickening on scroll.
- **Build and hosting.** Plain HTML, CSS and JavaScript with no build step, instead of
  Astro and Markdown. It is hosted on Cloudflare (a Worker serving the `public/`
  folder), instead of GitHub Pages or Netlify. Deployment steps are in the
  [main README](../../README.md).

## Still open

- Contact details (email and LinkedIn)
- Higher-resolution photos, then a new share image
- Faiza's review of the draft copy: the *Ask yourself* questions, the *Work with me*
  descriptions and the three photo notes in the hero
- The *Next* pages from the board: a page per framework move, Learn Out Loud, and booking

---

Previous: [A-05 · Pages and build](06-pages-and-build.md) · Back to the [concept index](README.md)
