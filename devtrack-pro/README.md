# DevTrack Pro

A developer-focused tracker that captures daily work entries, KPIs, and deployment notes on a secure Angular workspace.

![Angular 18.2.0](https://img.shields.io/badge/Angular-18.2.0-DD0031?style=flat-square)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-Unspecified-lightgrey?style=flat-square)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Demo / Deployment](#demo--deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author / Contact](#author--contact)

## Features

- **Secure authentication flow** with Angular Material form validation, `remember me`, `StorageService` backed by optional encrypted storage, an HTTP interceptor, and `authGuard` to keep layout routes behind a session token.
- **Top bar & profile access** driven by `CommonService` `BehaviorSubject`, showing initials, role/department tags, and logout via the backend `auth/log-out` endpoint.
- **Work tracker dashboard** that combines KPI MatCards, a filter/search expansion panel, and a DevExtreme `DxDataGrid` (add/update/delete, column chooser, paging, export) tied to REST endpoints for saves, updates, KPIs, and bulk exports to Excel.
- **Shared utilities** such as `ApiService` for all backend interactions, `CryptoService`/`KeyService` for AES-encrypted storage, `SnackBarComponent` for toast messages, and centralized Angular Material + DevExtreme imports.
- **Profile editor stub** showing how user data is surfaced into a reactive form (friendly scaffold for future profile persistence).

## Tech Stack

- **Frameworks & Tooling:** Angular 18.2.0, Angular CLI 18.2.12, TypeScript 5.5, RxJS 7.8, zone.js 0.14.10
- **UI & UX:** Angular Material 18.2, DevExtreme 25.2 `DxDataGrid`, Moment.js + `MatDatepicker`, Angular CDK DragDrop
- **State & Services:** Angular standalone components, `provideRouter`, `provideHttpClient` with `authInterceptor`, `BehaviorSubject`-driven `CommonService`, `FormBuilder`, reactive forms
- **Backend integrations:** `ApiService` + `API_ENDPOINTS` constants, JWT decoding via `jwt-decode`, AES encryption with `crypto-js`, `StorageService` wrappers, HTTP interceptor for `Authorization` header
- **Exports & helpers:** Excel exports with `exceljs` + `file-saver`, DevExtreme Excel exporter, Angular snack bars, custom layout + top bar components
- **Testing:** Karma, Jasmine

## Installation & Setup

### Prerequisites

- Node.js 18.x or later
- npm (bundled with Node) or Yarn
- Optional: global Angular CLI (`npm install -g @angular/cli@18.2.12`) if you need to use `ng` directly

### Steps

1. **Clone repository**
   ```bash
   git clone <https://github.com/AvinashS1995/devtrack-pro.git>
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Review API base URL**
   Update `src/environments/environment.ts`/`environment.prod.ts` if your backend differs from `https://ems-backend-api.onrender.com/api/`.
4. **Optional:** run `npm run watch` for incremental rebuilds during development.

## Usage

- Start the dev server:
  ```bash
  npm run start
  ```
  The app listens on `http://localhost:4200/` by default.
- Authentication form expects a valid backend user (email & password). No demo credentials are hard-coded—use the credentials managed by your API.
- Logged-in users land on the Work Tracker page, where they can log entries, update/delete rows, filter by date/project, view KPIs, export to Excel, and sign out from the top bar.
- Run unit tests with `npm run test`.

## Folder Structure

```
src/app/
├── app.component.*             # root component; initializes user context
├── app.config.ts              # provides router, HTTP/interceptor, animation, zone config
├── app.routes.ts              # lazy routes (login + guarded layout children)
├── auth/
│   ├── login/                 # branded login screen with Material form + remember-me
│   └── top-bar/               # user avatar/menu, logout wiring, profile navigation
├── pages/
│   ├── layout/                # wrapper that renders top bar + outlet for protected pages
│   ├── work-tracker/          # KPI cards, filters, DevExtreme grid, Excel export
│   └── profile/               # reactive form stub for profile info
└── shared/
    ├── common/                # material imports, API endpoint constants
    ├── guard/                 # `authGuard` that checks for stored token
    ├── interceptor/           # `authInterceptor` attaches bearer token
    ├── interface/             # `UserDetails` shape
    ├── service/               # `ApiService`, `CommonService`, `StorageService`, `CryptoService`, `KeyService`
    └── widget/                # shared snack-bar for toast notifications
```

## Demo / Deployment

- **Live demo:** <https://devtrack-pro-theta.vercel.app/login>
- **Screenshots:** Add polished walkthrough images under `public/assets/screenshots` (or link to your CMS) and update this section with captions.
- **Deployment tips:** Build for production via `npm run build` and host the output from `dist/` on any static server; ensure `environment.prod.ts` points to the right API.

## Contributing

1. Fork the repo and create a branch named `feature/<ticket>` or `bugfix/<issue>`.
2. Install dependencies (`npm install`) and run the existing lint/tests (`npm run test`).
3. Follow the current styling (standalone components, Angular Material) and keep shared services centralized.
4. Open a pull request describing your changes, the testing steps, and any manual verifications.

## License

This project currently has **no license** specified. Add a `LICENSE` file with your preferred terms before publishing.

## Author / Contact

- **Avinash Suryawanshi**
- Email: `avinash.s@company.com`
- LinkedIn: <LINKEDIN_URL>
- GitHub: <GITHUB_URL>
