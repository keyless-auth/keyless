/**
 * Custom error classes for @keyless/core.
 */

export class OAuthError extends Error {
  constructor(
    message: string,
    public errorCode?: string
  ) {
    // errorCode is optional, for specific OAuth errors
    super(message);
    this.name = 'OAuthError';
  }
}

export class ZKProofError extends Error {
  constructor(
    message: string,
    public errorCode?: string
  ) {
    // errorCode is optional, for specific ZK proof errors
    super(message);
    this.name = 'ZKProofError';
  }
}

export class ChainError extends Error {
  constructor(
    message: string,
    public errorCode?: string
  ) {
    // errorCode is optional, for specific chain errors
    super(message);
    this.name = 'ChainError';
  }
}

export class PepperServiceError extends Error {
  constructor(
    message: string,
    public errorCode?: string
  ) {
    // errorCode is optional
    super(message);
    this.name = 'PepperServiceError';
  }
}

// Add more error types as needed (e.g., ConfigurationError, etc.)
