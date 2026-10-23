# Website: Márcio Leme de Almeida, Law Office

This is the one-page website of the law office of Márcio Leme de Almeida (OAB/SP 250.781).
The website text is in Portuguese.

## Files

| File | Function |
|---|---|
| `index.html` | Content and structure |
| `styles.css` | Visual design (navy blue and gold, from the logo) |
| `script.js` | Monogram animation, phone menu, tabs, practice areas, timeline and maps |
| `assets/logo-mla.png` | Original logo, transparent background |
| `assets/favicon.svg` | Browser icon |
| `assets/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Phone and app icons |
| `assets/marcio-*.webp`, `marcio-960.jpg` | Photo of Dr. Márcio in 3 sizes |
| `assets/og-image.png` | Share image (1200 x 630 px) for WhatsApp, LinkedIn and others |
| `assets/fonts/` | Self-hosted fonts (Cormorant Garamond, Manrope) and their licenses (SIL OFL) |
| `privacidade.html` | Privacy policy page |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | Search engine and phone settings |
| `vercel.json` | Vercel settings: browser cache and security headers |

The website has no build step and no dependencies. To see it, open `index.html` in a browser.

## Sections

1. Início: main title, monogram animation and three key facts.
2. § 1 O escritório: tabs "Quem somos" and "Diferenciais".
3. § 2 Áreas de atuação: vertical tabs on desktop, accordion on phones. 3 main areas and 9 other areas.
4. § 3 Trajetória: photo area and tabs "Perfil" and "Formação" (timeline).
5. § 4 Contato: tabs "Fale conosco", "São Paulo" and "Itapetininga", with a map for each office.

The tabs keep the page short. All tab content is in the HTML, so search engines can read it.

## Photo

The "Trajetória" section shows the photo of Dr. Márcio (original: 2000 x 2500 px, 4:5).
The site uses these versions: `assets/marcio-640.webp`, `marcio-960.webp`, `marcio-1280.webp`
and `marcio-960.jpg` (for old browsers). The browser selects the correct size.

To change the photo, make new files with the same names and the same 4:5 ratio.

## Maps

Each office shows a static map image (`assets/mapa-sp.svg`, `assets/mapa-itapetininga.svg`).
The page loads nothing from Google. The "Ir até lá" button opens the route in Google Maps.

To use a real map image:

1. Open openstreetmap.org and find the address.
2. Click **Share > Image** and download a PNG.
3. Put the file in `assets/` and change the `src` value of the map `<img>` in `index.html`.
4. Add the credit "© OpenStreetMap contributors" below the map (license requirement).

## Publish with Vercel

1. Sign in at vercel.com with **Continue with GitHub**.
2. Click **Add New > Project** and import `site-marcio-leme`.
3. Keep the default settings (Framework Preset: **Other**, no build command).
4. Click **Deploy**.

Each push to `main` updates the site on Vercel.
`vercel.json` sets the browser cache (fonts: 1 year, images: 1 week) and the security headers.

## Publish with GitHub Pages (old address, can be turned off)

1. Open **Settings > Pages** in the repository.
2. Set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to `/ (root)`.
4. Click **Save**.

The website address is `https://<user>.github.io/<repository>/`.
To use a domain name, open **Settings > Pages > Custom domain**.

## Change the site address

The full address `https://marciolemeadv.vercel.app/` is in these files:
`index.html` (canonical and `og:` tags), `privacidade.html`, `robots.txt` and `sitemap.xml`.
When the domain name is ready, change the address in all of these files.

The official address is `https://marciolemeadv.vercel.app/` (Vercel).
`site-marcio-leme.vercel.app` redirects to it.

## Legal compliance

The content obeys the OAB Code of Ethics and Provimento 205/2021 of the CFOAB:

- No result promises.
- No prices.
- No comparison with other offices.

## Open items

- [ ] Register a domain name.
- [ ] Get final text approval from Dr. Márcio.
