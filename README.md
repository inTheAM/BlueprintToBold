# Blueprint to B.O.L.D™ · faizamgua.com

The website for Faiza Mgua and the B.O.L.D Framework™
(Break the Frame · Own Your Story · Learn Out Loud · Design Your Next Move).

## The idea

The page starts as an architect's blueprint: cyanotype blue, linework and thin type.
That's the plan, and Faiza's architecture past. Halfway down, her line
*"You don't have to burn it all down. Just shift the lens."* opens like a camera
lens as you scroll. Everything below it is in full, bold color: her work today,
the framework, and ways to work with her. The **Lens** switch in the menu bar
lets visitors flip between the two views at any time.

## What's here

```
public/                   everything that gets published
  index.html              the whole page (one page, eleven sections)
  assets/css/styles.css   colors, type and layout; both lenses are defined at the top
  assets/js/main.js       lens shift, story line, mobile menu, "Your next move" card
  assets/img/             photos, favicon, share image
  robots.txt, sitemap.xml
wrangler.jsonc            Cloudflare config: serves the public/ folder
```

It's a plain static site: no build step, nothing to install.

## Preview locally

Open `public/index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000 --directory public
```

then visit http://localhost:8000.

## Still to add

Search `public/index.html` for `TODO` and `Coming soon`.

- **Contact details:** email and LinkedIn in the *Get in touch* section.
- **Photos:** replace the two files below with higher-resolution versions, keeping the
  same file names. Update the `width`/`height` attributes on the `<img>` tags if the
  proportions change.
  - `public/assets/img/faiza-portrait.jpg`: hero portrait, portrait orientation, at least 1200 × 1500 px.
  - `public/assets/img/faiza-thinking.jpg`: shown as a circle in the quote section, at least 600 × 600 px.
- **Share image:** `public/assets/img/og-image.jpg` (1200 × 630) is what LinkedIn and WhatsApp
  show when the link is shared. Regenerate it once the new portrait arrives.
- **Draft copy for Faiza to review:** the *Ask yourself* questions on the four
  framework cards, the *Work with me* descriptions (Mentoring, Speaking,
  Workshops) and the three photo notes in the hero. Everything else is her own
  wording from the Blueprint to B.O.L.D PDF.

## Going live on faizamgua.com (Cloudflare)

The site deploys as a Cloudflare Worker that serves the `public/` folder.
There is no build step.

1. In the Cloudflare dashboard go to **Workers & Pages → Create → Import a repository**
   and pick `inTheAM/BlueprintToBold`.
2. Settings:
   - **Project / Worker name:** `faizamgua` (must match `name` in `wrangler.jsonc`)
   - **Build command:** leave empty
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** leave as `/`
   - **Production branch:** `main`
3. Deploy. Every push to `main` redeploys the site.
4. Once the domain is on Cloudflare, open the Worker's **Settings → Domains & Routes**,
   add a **Custom domain** `faizamgua.com` (and `www.faizamgua.com` if wanted).
   Cloudflare creates the DNS records itself.

To deploy from your own computer instead: `npx wrangler login`, then `npx wrangler deploy`.

## Accessibility

- Text contrast meets WCAG AA in both lenses.
- Everything works with a keyboard, and the menu closes with Esc.
- Visitors who prefer reduced motion get no scroll animation. The page switches
  to the bold lens when they reach the quote.
- Without JavaScript the page shows in the bold lens and the quote sits in place.
