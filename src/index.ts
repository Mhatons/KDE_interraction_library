import KDEAuth from "./auth/index";
import { KDEWindow } from "./modules/wpm/index";
import { VFS } from "./vfs/index";

export type KDEConfig = {
  baseURL: string;
  authCookie: string;
  allowedOrigins: string[];
};

export function initializeKDE(config: KDEConfig) {
  const auth = new KDEAuth(`?cookie=${config.authCookie}`);
  const vfs = new VFS(config.baseURL);
  const kdeWindow = new KDEWindow(config.allowedOrigins);

  return { auth, vfs, kdeWindow };
}
