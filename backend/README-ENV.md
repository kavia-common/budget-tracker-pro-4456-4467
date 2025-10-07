Backend environment quickstart

- Copy `.env.example` to `.env` and fill in values:
  PORT=3001
  HOST=0.0.0.0
  POSTGRES_URL=postgresql://appuser:dbuser123@127.0.0.1:5001/myapp
  JWT_SECRET=<secure-random-string>
  TOKEN_EXPIRY=1d
  CORS_ORIGINS=*
  PLAID_CLIENT_ID=
  PLAID_SECRET=
  PLAID_ENV=sandbox

Notes:
- Database preview port is 5001. Ensure your POSTGRES_URL uses port 5001.
- The API mounts at http://localhost:3001 with base path /api/v1.
- CORS is permissive (*) for development; lock down origins for production.
- Swagger docs: http://localhost:3001/docs (dynamically reflects current host/port).
