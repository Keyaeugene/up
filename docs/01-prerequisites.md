# Step 1 — Installing the Tools

You need three things installed on your computer before we touch any code.
Do these in order. Each one has an official installer — always download
from the official site only.

## 1. Visual Studio Code (VS Code)

This is the text editor / control center for the whole project.

1. Go to https://code.visualstudio.com
2. Click the big "Download" button for your operating system (Windows, Mac,
   or Linux).
3. Run the installer, accepting all defaults.
4. Open VS Code once installed to confirm it launches.

## 2. Node.js

This lets your computer run JavaScript outside a browser — it's what powers
both our backend and frontend.

1. Go to https://nodejs.org
2. Download the **LTS** version (not "Current"). LTS = Long Term Support,
   the stable one.
3. Run the installer, accepting all defaults.
4. Confirm it worked:
   - Open VS Code.
   - Open the built-in terminal: menu **Terminal → New Terminal** (or
     `` Ctrl+` `` on Windows/Linux, `` Cmd+` `` on Mac).
   - Type `node -v` and press Enter. You should see something like `v20.x.x`.
   - Type `npm -v` and press Enter. You should see a version number too.

If either command says "not recognized" or "command not found," restart
your computer and try again — Node's installer needs a fresh terminal
session to be recognized.

## 3. Git

This tracks changes to your code over time (like "Track Changes" for code).

1. Go to https://git-scm.com/downloads
2. Download and install for your OS, accepting defaults.
3. Confirm it worked: in the VS Code terminal, type `git --version` and
   press Enter.

## 4. (Optional but recommended) VS Code extensions

Inside VS Code, click the square icon in the left sidebar (Extensions), and
install:

- **Prisma** (by Prisma) — colors and formats the database schema file
- **ESLint** — flags obvious code mistakes as you type

You do **not** need a separate TypeScript extension — VS Code has
TypeScript support built in already, since VS Code and TypeScript are both
made by Microsoft.

## You're ready when...

Running these three commands in the VS Code terminal all print a version
number with no errors:

```
node -v
npm -v
git --version
```

Next: open `docs/02-project-overview.md`.
