# Step 5 — Starting the Frontend (the POS Screen)

Keep the backend terminal from Step 4 running. Open a **new** terminal in
VS Code for this step (`+` icon in the terminal panel).

## 1. Move into the frontend folder

```
cd frontend
```

(If you're still inside `backend`, type `cd ../frontend` instead.)

## 2. Set your environment file

1. Copy `.env.local.example` and rename the copy to `.env.local`.
2. Open it and paste the `merchantId` you copied in Step 4 as the value of
   `NEXT_PUBLIC_DEMO_MERCHANT_ID`.

(The frontend doesn't use the merchant ID for anything yet in this v1 — it's
wired in now so the next step, checkout, works immediately.)

## 3. Install dependencies

```
npm install
```

**What this actually does:** it reads `package.json`, which lists every
library this project needs, and downloads each one into a `node_modules`
folder. For this frontend that's:

- `next`, `react`, `react-dom` — the actual framework (this is what runs
  the app)
- `typescript`, `@types/node`, `@types/react`, `@types/react-dom` — these
  are dev-only tools that let VS Code and Next.js understand and check
  your TypeScript code; they add no code to what ships to a browser

Nothing here is invented magic — every file you see under `node_modules`
after this finishes came from one line in `package.json`.

## 4. Start the frontend

```
npm run dev
```

You should see something like:

```
▲ Next.js 14.2.5
- Local: http://localhost:3000
```

## 5. Open the POS screen

Go to http://localhost:3000 in your browser. You should see:

- "Demo Mini-Mart — POS" heading
- 5 demo products as clickable cards
- Clicking a product adds it to the cart on the right, with a running total

If you instead see "Could not reach the backend," go back to the backend
terminal and make sure it's still running (Step 4).

**TypeScript note:** the first time `npm run dev` runs, Next.js will
regenerate `next-env.d.ts` and may adjust `tsconfig.json` slightly — this
is normal and expected, not an error. If your editor shows a red
squiggle anywhere, hover over it; TypeScript is telling you the exact
mismatch (e.g. "this could be `null`") rather than failing silently at
runtime like plain JavaScript would.

## What you just built

A working full-stack loop:

```
Browser (Next.js) → Node.js/Express API → Prisma → Supabase Postgres
```

The product list you see is real data, coming from your real cloud
database — not fake/hardcoded data.

## Next steps (future sessions)

Come back and we'll add, one at a time:

1. **Cash checkout** — POST the cart to `/api/transactions/cash`, save a
   real `Transaction` + `TransactionItem` rows, clear the cart.
2. **M-Pesa STK Push** — the "Prompt and Pay" flow from your spec.
3. **Barcode scanning** — the `/api/products/barcode/:barcode` endpoint is
   already built in the backend; we just need the frontend keyboard
   listener.
4. **Employee login + shifts** — clock-in/clock-out.
5. **Offline queue** — IndexedDB storage + sync.

Each of these will get its own numbered doc, exactly like this one, so you
can keep building the project slowly without ever facing a huge unexplained
jump in complexity.
