export type KDEMessage = {
  type: 'OPEN_FILE' | 'FILE_OPENED' | 'ERROR';
  payload: {
    path?: string;
    error?: string;
    messageId: string;
    timestamp: number;
  };
};

export class KDEWindow {
  private allowedOrigins: string[];

  constructor(allowedOrigins: string[]) {
    this.allowedOrigins = allowedOrigins;
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  private handleMessage(event: MessageEvent): void {
    if (!this.allowedOrigins.includes(event.origin)) {
      console.error(`Invalid origin: ${event.origin}`);
      return;
    }

    // Validate and handle messages here...
    console.log('Received message:', event.data);
  }

  sendMessage(message: KDEMessage): void {
    window.parent.postMessage(message, '*');
  }

  cleanup(): void {
    window.removeEventListener('message', this.handleMessage.bind(this));
  }
}
