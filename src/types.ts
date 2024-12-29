export type KDEConfig = {
  baseURL: string;
  authCookie: string;
  defaultTimeout?: number;
  retryAttempts?: number;
};
  
export type SearchOptions = {
  recursive?: boolean;
  pattern?: string;
  type?: 'file' | 'directory' | 'all'; 
};

  