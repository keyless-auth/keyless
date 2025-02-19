import type { Pepper } from '../types/crypto';

/**
 * Interface for interacting with a Pepper Service.
 * This service is responsible for managing user-specific peppers,
 * which are essential for privacy-preserving zkLogin.
 */
export interface PepperService {
  /**
   * Retrieves a pepper for a given user identifier and managing application.
   * In a real implementation, this would likely involve secure, authenticated communication
   * with a backend service. For the mock implementation, it might just generate and store peppers locally.
   *
   * @param userId The user identifier (e.g., email, sub) from the OIDC token.
   * @param applicationId The identifier of the managing application (OAuth client ID).
   * @returns A Promise that resolves with a Pepper object.
   * @throws {PepperServiceError} If pepper retrieval fails (e.g., user not found, service unavailable).
   */
  getPepper(userId: string, applicationId: string): Promise<Pepper>;
}
