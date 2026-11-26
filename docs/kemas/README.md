# KEMAS APPAREL

A job board for shirt projects. Track every project from design to delivery, along with sales, profit and money still owed.

## Features
- **Board**: projects grouped by stage (Designing → Waiting on client → At the printer → Ready to deliver → Delivered, plus On hold). One tap moves a job to the next stage.
- **Order builder** based on the KEMAS sales kit: base price + fabric (free, premium +RM2, Lycra +RM4/6/10), and one or more shirt types per order, each with its own collar (round, V-neck, polo, NFL, retro, mandarin), sleeve (normal or raglan), add-ons (Muslimah, oversize, backtape, numbering/naming, DTF label tag, pen pocket) and sizes XS–5XL. 3XL and above adds +RM4 automatically.
- **Price list** you can edit (Board → Price list). Each project keeps the prices it was quoted at.
- **Copy order for printer** (no prices) and **Copy quote for client**, ready to paste into WhatsApp.
- **Projects**: client, contact, due date, printer, shirt details, quantity by size (XS–3XL), price and cost per shirt, other costs, amount paid, notes and stage history.
- **All jobs**: search and filter by stage.
- **Money**: sales, costs, profit, collected and owed, a 6-month chart, who still owes you, and profit per project.
- Works offline, has dark mode, and installs on your phone as an app.

## Live link
`https://adamdanish28.github.io/test/kemas/` (once GitHub Pages is on; see the root `docs/README.md`).

## Sync between phone and laptop
Tap **Connect sync** at the top of the app and paste a GitHub key. The key only needs the `gist` permission:
make one at <https://github.com/settings/tokens/new?scopes=gist&description=KEMAS%20APPAREL%20sync>.

The app keeps your projects in one secret Gist (`kemas-data.json`) on your GitHub account. Every connected device reads and saves that file:
- a second after you save a change
- when you open or return to the app
- every minute while it's open

It also works offline. Changes are kept on the device and sync when you're back online.
If both devices edit the same project, the newer save wins.

## Backup
**Money → Export backup / Import backup** saves or loads a JSON copy of everything.
