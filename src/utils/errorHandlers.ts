export type KDEError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

export type ErrorCode = 
  | 'AUTH_ERROR'
  | 'FILE_NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'PERMISSION_DENIED'
  | 'UNKNOWN_ERROR';

export function createError(code: ErrorCode, message: string, details?: Record<string, unknown>): KDEError {
  return { code, message, details };
}

export function isKDEError(error: unknown): error is KDEError {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}

export function getErrorMessage(error: unknown): string {
  if (isKDEError(error)) {
    return `${error.code}: ${error.message}`;
  }
  return 'Unknown error';
}
