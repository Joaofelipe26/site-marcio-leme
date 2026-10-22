# Website: Márcio Leme de Almeida, Law Office

This is the one-page website of the law office of Márcio Leme de Almeida (OAB/SP 250.781).
The website text is in Portuguese.

## Files

| File | Function |
|---|---|
| `index.html` | Content and structure |
| `styles.css` | Visual design (navy blue and gold, from the logo) |
| `script.js` | Monogram animation, phone menu, practice areas, timeline, office tabs and map |
| `assets/logo-mla.png` | Original logo, transparent background |
| `assets/favicon.svg` | Browser icon |

The website has no build step and no dependencies. To see it, open `index.html` in a browser.

## Sections

1. Início: main title, monogram animation and three key facts.
2. § 1 O escritório: "about us" text and three work types.
3. § 2 Áreas de atuação: 3 main areas (Empresarial, Cível e Consumidor, Trabalhista) and 9 other areas.
4. § 3 Trajetória: photo area, profile and timeline.
5. § 4 Diferenciais: 9 items.
6. § 5 Contato: WhatsApp, email, office tabs and a map.

## Add the photo

1. Put the photo file in `assets/` (for example, `assets/marcio.webp`, 720 x 900 px or larger).
2. In `index.html`, find the comment in `<figure class="portrait">`.
3. Replace the `<span class="portrait__ph">` element with the `<img>` element from the comment.

## Map

The map loads from Google only after the user clicks "Mostrar mapa".
This keeps the page fast and sets no Google cookies before consent (LGPD).

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
