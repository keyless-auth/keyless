/**
 * Type definitions related to authentication and OIDC.
 */

/**
 * Represents a validated OIDC token.
 * This type can be extended to include specific claims needed for zkLogin.
 */
export interface OIDCToken {
  rawJWT: string; // The raw JWT string
  payload: any; // Decoded JWT payload (you can define a more specific type if needed)
  header: any; // Decoded JWT header
  signature: string; // Raw signature
  // ... other relevant token properties
}

/**
 * Represents basic user information extracted from a validated OIDC token.
 * This is an example, adjust based on the information you need to extract.
 */
export interface UserInfo {
  userId: string; // User identifier (e.g., email or sub)
  email?: string;
  name?: string;
  // ... other user profile information
}
