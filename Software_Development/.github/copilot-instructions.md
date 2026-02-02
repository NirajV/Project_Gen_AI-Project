# Copilot / AI agent quick guide for this workspace ✅

## Purpose
A compact, actionable guide to help an AI agent be productive quickly in this multi-project workspace. It focuses on the projects that are actively maintained and the commands/config/files that are both authoritative and required to build, run, and reason about changes.

---

## Top-level projects (big picture)
- **ChemoCalendar** (Application_Development/ChemoCalendar-master)
  - **client_chemo_calendar/**: React app (Create React App) using **Redux**, **immutable.js**, **react-big-calendar** and custom CSS/Sass. Runs on port **3000** (dev) and builds to `build/` for production.
  - **server_chemo_calendar/**: Express + Mongoose backend that listens on port **8080** and serves the client build for production. Routes and logic are under `src/` (routes, services, models, repository).
  - Data flow: client calls backend APIs under `/api/*` (see `client/src/config.js` and `client/src/client.js` for base URL and token handling).

- **Web_Page_Development/portfolio/**: Next.js TypeScript portfolio site. Scripts: `npm run dev|build|start|lint`.

- **DataBase_Tables_Load/Product_Mart_Load_Process/**: Python scripts to create DB/tables. `create_source_tables.py` reads SQL file `DDL_N_DML_Scripts/Source_Table_DDL_DML.sql` and uses credentials in `db_connection.py`.

- **Unix_Linux_Code_Base/Move_File_Generic_Scripts/**: Reusable Python CLI (`move_files.py`) for moving files with timestamped logs. See `README.md` for CLI usage and stress testing guidance.

---

## Immediate developer workflows & commands 🔧
- ChemoCalendar (client):
  - Start dev client: `npm start` (runs `watch-css` + `react-scripts start` on port 3000)
  - Build: `npm run build` (produces `build/`)
  - Test: `npm test`
  - Styles use `node-sass-chokidar` watchers; see `package.json` scripts `build-css` and `watch-css`.

- ChemoCalendar (server):
  - Start dev server: `npm run start` (uses `cross-env NODE_ENV=development babel-node -- ./index.js`)
  - Production: build client then serve static via server (it uses `app.use(express.static(.../client_chemo_calendar/build))`).
  - Health check: `GET /api/status` returns a 200 string.

- Portfolio (Next.js): `npm run dev` / `npm run build` / `npm run start`

- Python (DB scripts):
  - Use venv + `pip install -r requirements.txt`.
  - Run `python create_source_tables.py` — ensure MySQL is reachable and `db_connection.py` credentials/port exist.

---

## Project-specific conventions & patterns to follow 💡
- **Ports are hard-coded in config files**: Server uses **8080** (`server_chemo_calendar/index.js` & `config.js`); client expects backend at `http://localhost:8080/api` in development (`client/src/config.js`). Changing ports requires updating both sides or config.
- **CORS**: Server uses a `corsWhitelist` (see `server_chemo_calendar/config.js`). Adjust when changing hostnames.
- **Auth tokens**: Client places token in `localStorage` and attaches it as `X-AUTH-TOKEN` (see `client/src/client.js`); 401 handling redirects to `/login`. Preserve this flow when modifying API auth.
- **Folder patterns**: React code is split into `actions/`, `reducers/`, `components/`, `containers/`. Look for `withRoot.js` for top-level wrappers and `undoMiddleware.js` for undo/redo behavior.
- **Server structure**: Routes under `src/routes`, business logic in `src/services`, DB models under `src/models`. Follow this separation when adding features.
- **No central .env**: Many credentials/URLs are in `config.js` or `db_connection.py` (local edits). Prefer adding env handling before committing secrets.

---

## Important files to inspect when making changes 🗂️
- `Application_Development/ChemoCalendar-master/client_chemo_calendar/package.json` (scripts & deps)
- `Application_Development/ChemoCalendar-master/client_chemo_calendar/src/config.js` (client API base URL)
- `Application_Development/ChemoCalendar-master/client_chemo_calendar/src/client.js` (axios instance, token handling)
- `Application_Development/ChemoCalendar-master/server_chemo_calendar/index.js` (server boot and static serving)
- `Application_Development/ChemoCalendar-master/server_chemo_calendar/config.js` (mongodb/cors)
- `DataBase_Tables_Load/Product_Mart_Load_Process/db_connection.py` and `create_source_tables.py` (DB create scripts)
- `Web_Page_Development/portfolio/package.json` (Next.js scripts)

---

## Safety & best-practice callouts (don’t commit secrets) ⚠️
- `db_connection.py` contains plaintext MySQL credentials—avoid committing real credentials. If a change requires credentials, prefer adding `.env` support or using CI secrets.
- Changing ports or API base URLs requires coordinated updates to `client/src/config.js` and `server/config.js` (and CORS whitelist).

---

## Tests & linting
- React client: `npm test` (uses CRA test runner).
- Next.js portfolio: `npm run lint` available.
- Server: no test suite discovered (adding tests is recommended but not required by current project structure).

---

## How Copilot/agents should behave when editing code 🤖
- Prefer small, targeted changes: update `config.js` and related files together and add tests when possible.
- Preserve existing auth flow: `localStorage` token format and `X-AUTH-TOKEN` header unless a coordinated change is made across client/server.
- For DB scripts: validate SQL file path and check `db_connection.py` for host/port/credentials before running anything.
- When adding endpoints: add route in `src/routes/`, service in `src/services/`, and model under `src/models` as appropriate.

---

## Want this improved? Provide feedback ✍️
If anything is unclear or missing (CI, secrets handling, test strategy), tell me what part you'd like expanded and I will iterate. 🙌

---

(Generated by an assistant scan of the repository. Keep it concise and update as project conventions evolve.)
