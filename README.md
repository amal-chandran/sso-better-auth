# Better Auth SSO Example with Clerk OAuth Provider

This is an example implementation to try out the SSO working, not a production-ready solution.

## Clerk Setup

- Create a Clerk account
- Create a project
- In the OAuth applications inside the config section, create a new app
- App configs:
  - Name (e.g., sample)
  - Scope (email, openid, profile)
  - Redirect URIs (http://localhost:8000/api/auth/sso/callback/clerk)
- Add these in `.env` of web-app - auth credentials, discovery URL

## Local Setup

```bash
# Install dependencies
npm i 

# Start the database
docker compose up -d

# Push database schema
npx nx run backend:db:push

# Start the backend server
npx nx run backend:serve

# Start the frontend application
npx nx run web-app:serve
```

## Project Structure

This project uses Nx for monorepo management with two main applications:
- `backend`: API server handling authentication and business logic
- `web-app`: Frontend application with Clerk SSO integration

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

### For web-app
```
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_OAUTH_DISCOVERY_URL=https://clerk.your-domain.com/.well-known/openid-configuration
```

## Notes

- Make sure Docker is installed and running for the database
- The application will be available at:
  - Backend: http://localhost:8000
  - Frontend: http://localhost:4200
