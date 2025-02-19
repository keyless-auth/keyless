/**
 * Type definitions related to blockchain interactions and zero-knowledge proofs.
 */

/**
 * Represents a zero-knowledge proof.
 * The structure will depend on the specific ZKP system used (e.g., Groth16).
 * For now, define a placeholder structure.
 */
export interface ZKProof {
  proofData: any; // Placeholder for proof data, refine based on Expander output
  publicInputsHash: string; // Hash of public inputs used in the proof
  // ... other proof-related properties
}

/**
 * Represents the public key of a keyless account.
 * Includes the OIDC provider ID and the identity commitment.
 */
export interface KeylessPublicKey {
  issVal: string; // OIDC Provider ID (e.g., "https://accounts.google.com")
  addressIDC: string; // Identity Commitment (hash)
  // ... other public key components if needed
}

/**
 * Represents a generic transaction payload.
 * The actual structure will depend on the target blockchain.
 * Define as a flexible type for now.
 */
export type TransactionPayload = any;

/**
 * Represents a blockchain transaction.
 * The actual structure will depend on the target blockchain.
 * Define as a flexible type for now.
 */
export type Transaction = any;
