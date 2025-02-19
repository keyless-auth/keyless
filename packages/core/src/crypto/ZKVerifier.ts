import type { ZKProof, KeylessPublicKey } from '../types/chain';

/**
 * Interface for verifying zero-knowledge proofs.
 * This interface is optional in `@keyless/core` and might be moved to chain-specific adapters
 * or a separate `@keyless/verifier` package in later phases.
 */
export interface ZKVerifier {
  /**
   * Verifies a zero-knowledge proof.
   *
   * @param zkProof The zero-knowledge proof to verify.
   * @param publicKey The KeylessPublicKey object associated with the account.
   * @returns A Promise that resolves to true if the proof is valid, false otherwise.
   * @throws {ZKProofError} If verification fails (e.g., invalid proof format, cryptographic error).
   */
  verify(zkProof: ZKProof, publicKey: KeylessPublicKey): Promise<boolean>;
}
