# Step 2 — What's in This Project

Open the `pos-mockup` folder in VS Code: **File → Open Folder** and select
it. You'll see this on the left sidebar:

```
pos-mockup/
├── docs/          ← the guides you're reading right now
├── backend/       ← the "brain": Node.js server + database rules
│   ├── prisma/
│   │   └── schema.prisma   ← defines every table in the database
│   ├── src/
│   │   ├── index.js        ← starts the server
│   │   └── routes/         ← one file per group of API endpoints
│   ├── package.json        ← list of backend dependencies
│   └── .env.example        ← template for secret keys (never commit real ones)
└── frontend/      ← the "face": what the cashier actually sees/clicks
    ├── app/
    │   ├── page.tsx          ← the main POS screen
    │   ├── layout.tsx        ← wraps every page (fonts, global styles)
    │   ├── types.ts          ← shared TypeScript types (e.g. what a "Product" looks like)
    │   └── globals.css
    ├── tsconfig.json         ← tells TypeScript how strict to be, what to check
    ├── package.json
    └── next.config.js
```

The frontend is written in **TypeScript** (`.ts` / `.tsx` files) rather than
plain JavaScript. TypeScript adds type-checking — VS Code will warn you
immediately if you, say, try to use a product's price as if it were text
where a number is expected, before you ever run the app. It's the same
JavaScript underneath; TypeScript just catches mistakes earlier.

## The three-layer mental model

Think of the system in three layers, like a restaurant:

1. **Database (Supabase)** — the pantry. Just stores raw ingredients
   (products, transactions, employees) as rows in tables.
2. **Backend (Node.js + Express, in `backend/`)** — the kitchen. Takes
   requests ("give me all products," "record this sale"), talks to the
   pantry, and sends back a plate (JSON data).
3. **Frontend (Next.js, in `frontend/`)** — the dining room. What the
   cashier sees and clicks. It never touches the pantry directly — it
   always asks the kitchen (backend) for things.

This separation matters because it's exactly how you'll scale later:
multiple tills (frontend) can all talk to one shared kitchen (backend) and
one shared pantry (database).

## What Prisma is

Prisma is a tool that lets you describe your database tables in plain
English-like syntax (in `schema.prisma`) instead of writing raw SQL. You
already have this file — it was translated from your original spec
document. We'll use it in Step 3.

Next: open `docs/03-supabase-setup.md`.
