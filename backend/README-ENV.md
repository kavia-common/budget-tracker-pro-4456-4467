Backend environment quickstart

- Copy .env and fill in values:
  PORT=3001
  POSTGRES_URL=postgresql://<user>:<pass>@localhost:5001/<db>
  JWT_SECRET=<secure-random-string>
  TOKEN_EXPIRY=1d

- The API mounts at http://localhost:3001 with base path /api/v1.
- CORS is permissive (*) for development; lock down origins for production.
- Swagger docs: http://localhost:3001/docs (dynamically reflects current host/port).
