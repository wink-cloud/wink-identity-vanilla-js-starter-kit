# wink-identity-vanilla-js-starter-kit

Vanilla JavaScript starter kit for integrating the **Wink Identity Web SDK** into
web applications without frameworks. Uses plain HTML, CSS, and JavaScript—no build step required.

------------------------------------------------------------------------

## Features

- Wink Identity Web SDK integration
- **Official Wink login button** from [wink-integration](https://github.com/wink-cloud/wink-integration)
- Face capture and liveness checks
- Pure JavaScript (no framework, no bundler)
- **Secure flow**: session and user profile via backend only
- External config via `config.js`
- Lightweight and easy to customize
- Sample verification journey with profile UI

------------------------------------------------------------------------

## Backend Requirement

This starter kit **requires a backend** that implements the Wink Identity session and user endpoints.
We provide and maintain several backend starter kits in the **Wink Identity Backend Templates** repository.

### Wink Identity Backend Templates

| Framework | Runtime | Folder |
|-----------|----------|--------|
| Hono | Node.js | [hono-starter-kit](https://github.com/wink-cloud/wink-identity-backend-templates/tree/main/hono-starter-kit) |
| Express.js | Node.js | [express-starter-kit](https://github.com/wink-cloud/wink-identity-backend-templates/tree/main/express-starter-kit) |
| FastAPI | Python (uv) | [fastapi-starter-kit](https://github.com/wink-cloud/wink-identity-backend-templates/tree/main/fastapi-starter-kit) |

Repository: [wink-identity-backend-templates](https://github.com/wink-cloud/wink-identity-backend-templates)

### Backend Contract

Regardless of the framework you choose, the backend must expose:

| Method | Path | Query params | Description |
|--------|------|--------------|-------------|
| GET | `/session` | `returnUrl`, `cancelUrl` | Creates a Wink session (proxies `POST /wink/v1/session`). Returns JSON with a session id (`sessionId`, `SessionId`, `id`, or `session_id`). |
| GET | `/user` | `clientId`, `token` | Returns user profile (proxies `POST /api/ConfidentialClient/verify-client`). |

**Security:** The backend uses `WINK_IDENTITY_CLIENT_ID` and `WINK_IDENTITY_SECRET` (Basic Auth).
These credentials are **never** exposed to the browser.

------------------------------------------------------------------------

## Prerequisites

- Static file server (e.g. `npx serve .`) or any static hosting
- Wink Identity API credentials (`clientId`, `realm`)
- Backend running (any backend template that implements the contract below)
- SDK access enabled (contact Wink support if needed)

------------------------------------------------------------------------

## Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/wink-cloud/wink-identity-vanilla-js-starter-kit.git
cd wink-identity-vanilla-js-starter-kit
```

### 2. Start the backend

Clone and run one of the [Backend Templates](https://github.com/wink-cloud/wink-identity-backend-templates) (e.g. Express):

```bash
cd path/to/wink-identity-backend-templates/express-starter-kit
cp .env.example .env.local
# Edit .env.local: WINK_IDENTITY_BASE_URL, WINK_IDENTITY_CLIENT_ID, WINK_IDENTITY_SECRET
npm install
npm run dev
```

Backend runs on `http://localhost:8080` by default. See the backend repo for Hono, FastAPI, or other templates.

### 3. Configure the frontend

Copy the config template and fill in your values:

```bash
cp config.example.js config.js
```

Edit `config.js` (replace placeholders):

```javascript
window.WINK_CONFIG = {
  clientId: "your_client_id",
  realm: "your_realm",
  baseUrl: "https://stagelogin-api.winkapis.com",
  authUrl: "https://stageauth.winkapis.com",
  backendUrl: "http://localhost:8080"
};
```

**Never commit `config.js`** if it contains real credentials. It is listed in `.gitignore`.

### 4. Serve the frontend

```bash
npx serve .
```

Open: `http://localhost:3000`

### 5. Test the flow

1. Click **Login with Wink**
2. Complete the Wink authentication flow
3. Confirm the status shows `authenticated` and the profile panel appears
4. Click **Refresh Profile** to re-fetch from the backend
5. Click **Logout** to sign out (OIDC end-session redirect)

------------------------------------------------------------------------

## Configuration Options

All values in `config.js` are **client-safe**. No `clientSecret` or credentials.

| Variable | Description | Example |
|----------|-------------|---------|
| `clientId` | Wink client ID | `"abc123"` |
| `realm` | Wink realm | `"my-realm"` |
| `baseUrl` | Wink API base URL | `"https://stagelogin-api.winkapis.com"` |
| `authUrl` | Wink Auth / IdP base URL | `"https://stageauth.winkapis.com"` |
| `backendUrl` | Your backend URL (any template) | `"http://localhost:8080"` |

Refer to [Wink Identity Web SDK (NPM)](https://www.npmjs.com/package/wink-identity-sdk) and the [Wink Developer Hub](https://docs.wink.cloud/) for more details.

------------------------------------------------------------------------

## Security – CRITICAL

**Never expose sensitive data in client-side code.**

- `clientSecret` — **server-side only** (used only by the backend)
- Direct calls to the Wink Session API from the browser — **never**; always use your backend
- Session creation — **must** go through your backend (`GET /session`)
- User profile — **must** go through your backend (`GET /user`)

The frontend only calls your backend; the backend calls Wink with credentials.

------------------------------------------------------------------------

## Project Structure

```
wink-identity-vanilla-js-starter-kit/
│
├── index.html              # Main app (auth flow, profile UI)
├── callback.html           # Cancel/login-cancelled page
├── silent-check-sso.html   # Silent SSO check iframe
├── config.example.js       # Config template (versioned)
├── config.js               # Your config (create from example, gitignored)
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

## Auth Flow Overview

1. User clicks **Login with Wink**
2. App calls backend `GET /session?returnUrl=...&cancelUrl=...`
3. Backend creates Wink session, returns `sessionId`
4. App creates Wink client with `sessionId` in config
5. App calls `winkInit({ onLoad: "login-required" })` → redirect to Wink IdP
6. User authenticates (e.g. biometric)
7. Wink redirects back to the app
8. `onSuccess` → app fetches profile from backend `GET /user?clientId=...&token=...`
9. Profile displayed; logout uses OIDC end-session URL

------------------------------------------------------------------------

## Before Going Live

- Use **production** Wink API and Auth URLs (replace staging endpoints)
- Deploy the backend with `WINK_IDENTITY_*` set for production
- Restrict CORS on the backend to your frontend origin (not `"*"`)
- Ensure `config.js` is never committed with real credentials
- Use HTTPS in production

------------------------------------------------------------------------

## Deployment

Deploy on any static hosting:

- AWS S3 + CloudFront
- Netlify
- Vercel
- GitHub Pages

Ensure `config.js` (or equivalent) is provided at build/deploy time with production values.
Do **not** commit real credentials to the repository.

------------------------------------------------------------------------

## Additional Resources

- [Wink Identity Backend Templates](https://github.com/wink-cloud/wink-identity-backend-templates) (Hono, Express, FastAPI)
- [Wink Identity Web SDK (NPM)](https://www.npmjs.com/package/wink-identity-sdk)
- [Wink Button Styles](https://github.com/wink-cloud/wink-integration) — Official Wink login button (CSS + SVG)
- [Wink Developer Hub](https://docs.wink.cloud/)

------------------------------------------------------------------------

## License

Internal / Partner Use — Wink Identity

------------------------------------------------------------------------

## Support

For integration help, contact Wink Identity support via the [Wink Developer Hub](https://docs.wink.cloud/).
