# Step 4 — Starting the Backend

Everything below is typed into the VS Code terminal. Make sure you're
inside the `backend` folder for all of it.

## 1. Move into the backend folder

```
cd backend
```

## 2. Install dependencies

This downloads all the code libraries the backend needs (Express, Prisma,
etc.) into a `node_modules` folder.

```
npm install
```

This can take a minute. You'll see a `node_modules` folder appear in the
sidebar afterward — that's normal and expected (it's excluded from Git).

## 3. Create the database tables

This reads `prisma/schema.prisma` and creates the actual tables in your
Supabase database.

```
npx prisma migrate dev --name init
```

If it asks anything, accept the default. When it finishes, it will also
generate the Prisma Client (the code that lets `index.js` talk to the
database).

You can double check the tables were created: go to your Supabase project
in the browser → **Table Editor** — you should see `Merchant`, `Product`,
`Employee`, etc.

## 4. Add demo data

This creates one demo shop and five demo products so we have something to
look at.

```
npm run prisma:seed
```

The terminal will print a `merchantId` — a long string like
`a1b2c3d4-...`. **Copy this value**, you'll paste it into the frontend in
Step 5.

## 5. Start the server

```
npm run dev
```

You should see:

```
Backend running at http://localhost:4000
```

## 6. Confirm it works

Open a browser and go to:

- http://localhost:4000/health → should show `{"status":"ok", ...}`
- http://localhost:4000/api/products → should show your 5 demo products

Leave this terminal running. Open a **second** terminal (the `+` icon in
the terminal panel) for the next step — don't close this one, or the
backend stops.

Next: open `docs/05-run-frontend.md`.
