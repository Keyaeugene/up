# POS Mockup Project (Kenya-ready, M-Pesa POS System)

This is a slow-build starter for the Point of Sale system described in your
"Advanced Features" spec: barcode scanning, employee shifts, offline sales,
cash payments, and M-Pesa STK Push — built on Next.js (TypeScript) +
Node.js + Prisma + Supabase (Postgres).

You do **not** need to understand any of this yet. Just follow the docs in
`docs/` in order, one at a time, inside VS Code. Each doc assumes zero prior
knowledge and tells you exactly what to type and where to click.

## Reading order

1. `docs/01-prerequisites.md` — installing the tools (Node.js, VS Code, Git)
2. `docs/02-project-overview.md` — what each folder in this project is for
3. `docs/03-supabase-setup.md` — creating your free database in the cloud
4. `docs/04-run-backend.md` — starting the Node.js API server
5. `docs/05-run-frontend.md` — starting the Next.js POS screen

## What's already built (v1 mockup)

- A Prisma schema matching your spec (Merchant, Product, Employee,
  EmployeeShift, Transaction, TransactionItem, MpesaCallback)
- A backend with a health check and a working "list products" /
  "create product" API
- A frontend POS screen that lists products and lets you add them to a cart
  (talks to the real backend — no fake data)

## What's NOT built yet (future steps, one at a time)

- M-Pesa STK Push integration
- Barcode scanner input handling
- Employee clock-in/clock-out
- Offline sales queue + sync
- Receipts

We'll tackle these one-by-one in future sessions, each as its own numbered
doc, so the project keeps growing without ever feeling overwhelming.
