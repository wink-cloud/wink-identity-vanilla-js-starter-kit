/**
 * Wink Identity - Configuration template
 *
 * 1. Copy this file to config.js:  cp config.example.js config.js
 * 2. Replace placeholders with your values
 * 3. NEVER commit config.js (it is in .gitignore)
 *
 * Backend: This app requires a Wink Identity backend (session + user endpoints).
 * See: https://github.com/wink-cloud/wink-identity-backend-templates (Hono, Express, FastAPI)
 *
 * All values below are CLIENT-SAFE. No clientSecret or credentials here.
 * The backend uses WINK_IDENTITY_SECRET; the frontend never does.
 */
window.WINK_CONFIG = {
  clientId: "__client_id__",
  realm: "__realm__",
  baseUrl: "https://stagelogin-api.winkapis.com",
  authUrl: "https://stageauth.winkapis.com",
  /** Backend URL (Express starter kit). Must expose GET /session and GET /user */
  backendUrl: "http://localhost:8080",
};
