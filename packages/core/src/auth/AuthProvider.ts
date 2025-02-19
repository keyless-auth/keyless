import type { OIDCToken, UserInfo } from '../types/auth';
import type { ZKProof } from '../types/chain';
import type { Pepper } from '../types/crypto';

/**
 * Abstract interface for interacting with OpenID Connect (OIDC) providers.
 * Implementations will handle the specific details of each provider's OAuth flow.
 */
export interface AuthProvider {
  /**
   * The identifier for this authentication provider (e.g., 'google', 'github').
   * This is used internally to distinguish between different providers.
   */
  readonly providerId: string;

  /**
   * Initializes the authentication flow by redirecting the user to the
   * OIDC provider's authorization endpoint.
   *
   * @param clientId The OAuth Client ID registered with the OIDC provider for the managing application.
   * @param redirectUri URI to redirect to after successful authentication.
   * @param scope Optional scopes to request from the OIDC provider.
   * @param nonce Optional nonce value for security.
   * @returns A Promise that resolves when the authentication flow is initiated,
   *          or rejects if there's an error.
   */
  initiateAuthFlow(
    clientId: string,
    redirectUri: string,
    scope?: string,
    nonce?: string
  ): Promise<void>;

  /**
   * Verifies the authentication response from the OIDC provider after the user
   * is redirected back to the application. This should validate the JWT signature,
   * and basic claims (iss, aud, exp).
   *
   * @param response The raw response object from the OIDC provider (e.g., URL parameters or response body).
   * @param clientId The OAuth Client ID, for audience validation.
   * @param nonce Expected nonce value to prevent replay attacks.
   * @returns A Promise that resolves with an OIDCToken object on successful verification,
   *          or rejects with an OAuthError on failure.
   * @throws {OAuthError} If verification fails (e.g., invalid signature, expired token, etc.).
   */
  verifyAuthResponse(
    response: any,
    clientId: string,
    nonce?: string
  ): Promise<OIDCToken>;

  /**
   * (TODO:) Retrieves user information from the OIDC provider using the validated token.
   * This is an example of fetching profile information, might not be needed for core zkLogin.
   *
   * @param token The validated OIDCToken object.
   * @returns A Promise that resolves with a UserInfo object containing user profile information,
   *          or rejects with an OAuthError if retrieval fails.
   * @throws {OAuthError} If user info retrieval fails.
   */
  getUserInfo?(token: OIDCToken): Promise<UserInfo>;

  /**
   * (TODO:) Generates a zero-knowledge proof of OIDC authentication.
   * This method will be called after successful OIDC authentication and will use
   * the Rust WASM module to generate the ZK proof.
   *
   * @param oidcToken The validated OIDCToken object.
   * @param pepper Pepper value retrieved from PepperService
   * @returns A Promise that resolves with a ZKProof object.
   * @throws {ZKProofError} If ZK proof generation fails.
   */
  generateZKProof?(oidcToken: OIDCToken, pepper: Pepper): Promise<ZKProof>;
}

/**
 * Abstract base class for AuthProvider implementations.
 * Can contain common logic and helper methods for all AuthProviders.
 */
export abstract class BaseAuthProvider implements AuthProvider {
  abstract readonly providerId: string;
  abstract initiateAuthFlow(
    clientId: string,
    redirectUri: string,
    scope?: string,
    nonce?: string
  ): Promise<void>;
  abstract verifyAuthResponse(
    response: any,
    clientId: string,
    nonce?: string
  ): Promise<OIDCToken>;
  abstract getUserInfo?(token: OIDCToken): Promise<UserInfo>;
  abstract generateZKProof?(
    oidcToken: OIDCToken,
    pepper: Pepper
  ): Promise<ZKProof>;
}
