export type AuthState = {
  isAuthenticated: boolean;
  authCookie: string | null;
};
  
class KDEAuth {
  private authCookie: string;

  constructor(url: string) {
    const params = new URLSearchParams(url);
    const cookie = params.get('cookie');
    if (!cookie) {
      throw new Error('Authentication cookie is missing.');
    }
    this.authCookie = cookie;
  }

  getAuthCookie(): string {
    return this.authCookie;
  }

  static isAuthenticated(): boolean {
    return !!document.cookie.includes('auth');
  }
}
  
export default KDEAuth