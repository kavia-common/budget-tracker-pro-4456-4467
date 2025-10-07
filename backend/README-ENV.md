# Backend Environment Configuration

This backend uses Express and connects to a PostgreSQL database.

Required variables
- PORT=3001
- POSTGRES_URL=postgres://<user>:<password>@127.0.0.1:5001/myapp
- JWT_SECRET=<your-dev-secret>
- TOKEN_EXPIRY=1d (example)

Optional variables
- HOST=0.0.0.0
- CORS_ORIGINS=*
- PLAID_CLIENT_ID=
- PLAID_SECRET=
- PLAID_ENV=sandbox

Notes
- Standardized local ports:
  - PostgreSQL: 5001
  - Backend: 3001
- The API mounts at http://localhost:3001 with base path /api/v1.
- Swagger docs: http://localhost:3001/docs (dynamically reflects current host/port).

Example .env
PORT=3001
HOST=0.0.0.0
POSTGRES_URL=postgres://postgres:postgres@127.0.0.1:5001/myapp
JWT_SECRET=dev-secret-change-me
TOKEN_EXPIRY=1d
CORS_ORIGINS=*
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox

See also
- .env.example for a ready-to-copy template
- Root quickstart: ../../README.md
- Database env: ../../../budget-tracker-pro-4456-4465/expense_database/README-ENV.md

Quickstart
1) Ensure database is running and reachable at 127.0.0.1:5001 (db: myapp)
2) Copy .env.example to .env and update values as needed
3) Start the backend (e.g., npm run dev)
4) Verify health: curl http://localhost:3001/ -> { "status": "ok", ... }

Troubleshooting
- DB connection errors:
  - Verify database is running at 127.0.0.1:5001
  - Confirm POSTGRES_URL credentials and that the `myapp` database exists
- CORS during development:
  - Allow emulator origins (http://10.0.2.2 and http://localhost) as needed
- Mobile emulator connectivity:
  - Android emulator uses 10.0.2.2 to reach host; set frontend API_BASE_URL accordingly
