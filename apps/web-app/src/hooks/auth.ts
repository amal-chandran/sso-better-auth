import { ssoClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8000', // the base url of your auth server
  plugins: [ssoClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
