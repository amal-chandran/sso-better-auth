import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sso } from 'better-auth/plugins/sso';
import { db } from '../db';

export const auth = betterAuth({
  // baseURL: "http://localhost:8000",
  // basePath: "/api/auth",
  plugins: [sso()],
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:5173', 'http://localhost:4200'],
});
