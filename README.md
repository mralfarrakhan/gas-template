# Google Apps Script Preact + Vite Template

A modern, barebones starter template for building Google Apps Script (GAS) applications with **Preact**, **Vite**, **Tailwind CSS v4**, and **TypeScript**, bundled into a single-file UI and standalone script using `@gas-plugin/unplugin`.

## Features

- **Runtime & Package Manager:** [Bun](https://bun.com) for fast dependency installation and script execution.
- **Frontend:** [Preact](https://preactjs.com) with `@preact/preset-vite` for ultra-lightweight, reactive UI.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`.
- **Single-File Bundling:** [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) inlines all CSS, JS, and HTML into `dist/Index.html` for Google Apps Script `HtmlService`.
- **Apps Script Backend Bundling:** [@gas-plugin/unplugin](https://github.com/wakita181009/gas-plugin) transforms ES modules into Apps Script-compatible `dist/Code.js`.
- **Hybrid Support:** Works both as a container-bound Google Sheets add-on (`onOpen` dialog/sidebar) and as a standalone Web App (`doGet`).
- **Standard Clasp Deployment:** Seamless `clasp push` and `clasp deploy` integration.
- **CI/CD:** Automated GitHub Actions workflow for linting, typechecking, and versioned releases via Clasp.

---

## Project Structure

```
gas-template/
├── .github/workflows/deploy.yml # GitHub Actions CI/CD deployment
├── src/
│   ├── env.d.ts                 # TypeScript declarations (google.script.run, version)
│   ├── script/
│   │   └── main.ts              # Google Apps Script backend entry point (onOpen, doGet, RPC)
│   └── ui/
│       ├── app.css              # Tailwind CSS entry point
│       ├── App.tsx              # Preact root component with sample RPC calls
│       ├── Index.html           # HTML template for GAS dialog/sidebar/web app
│       └── main.tsx             # Preact DOM mount
├── appsscript.json              # Google Apps Script manifest
├── .clasp.json.example          # Sample Clasp configuration
├── eslint.config.js             # Flat ESLint configuration
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.script.ts        # Vite configuration for backend (Code.js)
├── vite.config.ui.ts            # Vite configuration for frontend (Index.html)
└── package.json
```

---

## Prerequisites

1. **Bun**: Install from [bun.sh](https://bun.sh) if not already installed.
2. **Google Clasp**: Install and log in with your Google account:
   ```bash
   bunx clasp login
   ```

---

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Apps Script Project

Create a new Google Apps Script project or link an existing one:

- **Create a new script (container-bound or standalone):**
  ```bash
  bun run clasp create --type sheets --rootDir dist
  # or standalone:
  # bun run clasp create --type standalone --rootDir dist
  ```
- **Or link an existing script:**
  Copy `.clasp.json.example` to `.clasp.json` and replace `scriptId`:
  ```bash
  cp .clasp.json.example .clasp.json
  ```
  Edit `.clasp.json`:
  ```json
  {
    "scriptId": "YOUR_APPS_SCRIPT_ID",
    "rootDir": "dist"
  }
  ```

---

## Available Scripts

| Command          | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `bun run dev`    | Starts Vite dev server for UI development                            |
| `bun run build`  | Copies manifest and builds both `dist/Code.js` and `dist/Index.html` |
| `bun run push`   | Builds the project and pushes code to Google Apps Script             |
| `bun run deploy` | Builds, pushes, and creates a versioned deployment                   |
| `bun run check`  | Runs Prettier format check, TypeScript typecheck, and ESLint         |
| `bun run lint`   | Runs ESLint                                                          |
| `bun run format` | Auto-formats code with Prettier                                      |

---

## Client-to-Backend Communication

Backend functions exported from `src/script/main.ts` can be called from Preact via standard `google.script.run`:

```tsx
google.script.run
  .withSuccessHandler((result) => {
    console.log("Success:", result);
  })
  .withFailureHandler((error) => {
    console.error("Error:", error);
  })
  .sayHello("World");
```

---

## CI/CD Deployment with GitHub Actions

The repository includes a ready-to-use GitHub Actions workflow in `.github/workflows/deploy.yml`.

### Required GitHub Secrets

1. **`CLASPRC_JSON`**:
   - Run `bunx clasp login` on your local machine.
   - Copy the contents of `~/.clasprc.json`.
   - Add it as a repository secret named `CLASPRC_JSON`.
2. **`CLASP_JSON`**:
   - Copy the contents of `.clasp.json` (containing your project's `scriptId`).
   - Add it as a repository secret named `CLASP_JSON`.
