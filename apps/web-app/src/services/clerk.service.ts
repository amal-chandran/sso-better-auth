import axios from 'axios';

/**
 * Interface for the OpenID configuration response
 */
interface OpenIDConfiguration {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  jwks_uri: string;
  scopes_supported: string[];
  response_types_supported: string[];
  response_modes_supported: string[];
  grant_types_supported: string[];
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  claims_supported: string[];
  code_challenge_methods_supported: string[];
  backchannel_logout_supported: boolean;
  frontchannel_logout_supported: boolean;
}

/**
 * Interface for the transformed configuration used in the application
 */
export interface ClerkConfig {
  issuer: string;
  domain: string;
  clientId: string;
  clientSecret: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  jwksEndpoint: string;
  mapping: {
    id: string;
    email: string;
    emailVerified: string;
    name: string;
    image: string;
  };
  scopes: string[];
  discoveryEndpoint: string;
  providerId: string;

  userInfoEndpoint: string;
}

/**
 * Fetches the OpenID configuration from Clerk and transforms it to the format
 * required by the application
 *
 * @returns The transformed Clerk configuration
 */
export async function fetchClerkConfiguration(): Promise<ClerkConfig> {
  try {
    // Load configuration from environment variables
    const discoveryEndpoint = import.meta.env.VITE_DISCOVERY_ENDPOINT;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

    if (!discoveryEndpoint || !clientId || !clientSecret) {
      throw new Error(
        'Clerk discovery endpoint, client ID, or client secret is missing in environment variables'
      );
    }

    const response = await axios.get<OpenIDConfiguration>(discoveryEndpoint);
    const config = response.data;

    // Transform the configuration to the required format
    const transformedConfig: ClerkConfig = {
      issuer: config.issuer,
      domain: new URL(config.issuer).hostname,
      clientId,
      clientSecret,
      authorizationEndpoint: config.authorization_endpoint,
      tokenEndpoint: config.token_endpoint,
      jwksEndpoint: config.jwks_uri,
      mapping: {
        id: 'sub',
        email: 'email',
        emailVerified: 'email_verified',
        name: 'name',
        image: 'picture',
      },
      scopes: ['openid', 'profile', 'email'],
      discoveryEndpoint,
      providerId: 'clerk',

      userInfoEndpoint: config.userinfo_endpoint,
    };

    return transformedConfig;
  } catch (error) {
    console.error('Error fetching Clerk OpenID configuration:', error);
    throw new Error('Failed to fetch Clerk configuration');
  }
}
