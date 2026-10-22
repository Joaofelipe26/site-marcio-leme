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

The website has no build step and no dependencies. To see it, open `index.html` in a browser.

## Sections

1. Início: main title, monogram animation and three key facts.
2. § 1 O escritório: tabs "Quem somos" and "Diferenciais".
3. § 2 Áreas de atuação: vertical tabs on desktop, accordion on phones. 3 main areas and 9 other areas.
4. § 3 Trajetória: photo area and tabs "Perfil" and "Formação" (timeline).
5. § 4 Contato: tabs "Fale conosco", "São Paulo" and "Itapetininga", with a map for each office.

The tabs keep the page short. All tab content is in the HTML, so search engines can read it.

## Add the photo

1. Put the photo file in `assets/` (for example, `assets/marcio.webp`, 720 x 900 px or larger).
2. In `index.html`, find the comment in `<figure class="portrait">`.
3. Replace the `<span class="portrait__ph">` element with the `<img>` element from the comment.

## Maps

Each office shows a static map image (`assets/mapa-sp.svg`, `assets/mapa-itapetininga.svg`).
The page loads nothing from Google. The "Ir até lá" button opens the route in Google Maps.

To use a real map image:

1. Open openstreetmap.org and find the address.
2. Click **Share > Image** and download a PNG.
3. Put the file in `assets/` and change the `src` value of the map `<img>` in `index.html`.
4. Add the credit "© OpenStreetMap contributors" below the map (license requirement).

## Publish with GitHub Pages

1. Open **Settings > Pages** in the repository.
2. Set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to `/ (root)`.
4. Click **Save**.

The website address is `https://<user>.github.io/<repository>/`.
To use a domain name, open **Settings > Pages > Custom domain**.

## Legal compliance

The content obeys the OAB Code of Ethics and Provimento 205/2021 of the CFOAB:

- No result promises.
- No prices.
- No comparison with other offices.

## Open items

- [ ] Get a professional photo of Dr. Márcio for the "Trajetória" section.
- [ ] Register a domain name.
- [ ] Get final text approval from Dr. Márcio.
