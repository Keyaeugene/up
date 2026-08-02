# Step 3 — Setting Up Your Database (Supabase)

Supabase gives you a free, real Postgres database running in the cloud —
no installing a database program on your computer.

## 1. Create your account and project

1. Go to https://supabase.com and click "Start your project."
2. Sign up (GitHub login is fastest if you have one).
3. Click "New Project."
   - **Name**: `pos-mockup` (or anything you like)
   - **Database Password**: click "Generate a password" and **save it
     somewhere safe** (a notes app) — you'll need it in a moment.
   - **Region**: pick the one closest to you.
4. Click "Create new project" and wait ~2 minutes while it provisions.

## 2. Get your connection string

Use the **Session pooler** string, not the "direct connection" one.
Supabase's direct connection (`db.xxxx.supabase.co`) requires IPv6, which
most home Wi-Fi routers don't support — trying to use it typically fails
with an error like `Can't reach database server`. The session pooler works
over regular IPv4 and behaves the same way for our purposes.

1. Once the project is ready, click the green **Connect** button at the top
   of the project page (or go to **Project Settings** → **Database**).
2. Find **Connection Pooling**, and select the **Session** mode tab.
3. Copy the string. It looks like:
   ```
   postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with the real password you saved in step 1.

(There's also a "Transaction" pooler mode on port 6543, meant for
serverless functions — don't use that one here, it doesn't support the
kind of persistent connection Prisma migrations need.)

## 3. Add it to your project

1. In VS Code, go into the `backend/` folder.
2. Copy `.env.example` and rename the copy to `.env`
   - Right-click `.env.example` → Copy, then Paste, then rename the new
     file to `.env`.
3. Open `.env` and paste your real connection string as the value of
   `DATABASE_URL`, replacing the placeholder text. Save the file.

**Important:** `.env` holds real secrets and should never be shared,
committed to Git, or pasted into a chat. It's already excluded from Git
tracking in this project.

## You're ready when...

Your `backend/.env` file has one line that looks like:

```
DATABASE_URL="postgresql://postgres:yourrealpassword@db.xxxxxxxxxxxx.supabase.co:5432/postgres"
```

Next: open `docs/04-run-backend.md`.
