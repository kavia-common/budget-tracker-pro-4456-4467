# budget-tracker-pro-4456-4467

Environments quickstart

This repo contains multiple containers: database (PostgreSQL), backend (Express), and a Flutter mobile frontend. The following conventions ensure smooth local startup and emulator connectivity.

Standard ports
- Database (PostgreSQL): 5001
- Backend (Express): 3001
- Frontend API base path: /api/v1

Startup order
1) Database
   - Ensure PostgreSQL is running and reachable at 127.0.0.1:5001
   - Database name: myapp (example)
   - See ../budget-tracker-pro-4456-4465/expense_database/README-ENV.md and startup.sh

2) Backend
   - PORT=3001
   - POSTGRES_URL=postgres://<user>:<password>@127.0.0.1:5001/myapp
   - JWT_SECRET=some-dev-secret
   - See backend/README-ENV.md and backend/.env.example

3) Frontend (Flutter)
   - API_BASE_URL examples:
     - Android emulator: http://10.0.2.2:3001/api/v1
     - iOS simulator: http://localhost:3001/api/v1
   - See ../budget-tracker-pro-4456-4466/expense_frontend/README.md and .env

Quick smoke test (end-to-end)
1) Backend health: curl http://localhost:3001/ -> expect { status: "ok", ... }
2) Register: POST http://localhost:3001/api/v1/auth/register
3) Login: POST http://localhost:3001/api/v1/auth/login -> retrieve token
4) In the app: set API_BASE_URL per your emulator, then
   - Register -> Login -> View transactions list
   - Create a transaction -> verify it appears in list

Troubleshooting
- Android emulator cannot reach backend:
  - Use 10.0.2.2 (not localhost) in API_BASE_URL
- Backend cannot connect to DB:
  - Confirm POSTGRES_URL points to 127.0.0.1:5001 and the DB name exists
- CORS errors in development:
  - Ensure backend CORS allows emulator origins (10.0.2.2 and localhost) during development

References
- Backend (Express):
  See backend/README-ENV.md and backend/.env for PORT, POSTGRES_URL, JWT_SECRET, TOKEN_EXPIRY.

- Database (PostgreSQL):
  See ../budget-tracker-pro-4456-4465/expense_database/README-ENV.md and startup.sh.
  Default DB port: 5001.

- Flutter Frontend:
  See ../budget-tracker-pro-4456-4466/expense_frontend/README.md and .env.
  API_BASE_URL should target http://10.0.2.2:3001/api/v1 (Android) or http://localhost:3001/api/v1 (iOS).