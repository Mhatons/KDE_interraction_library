import { SearchOptions } from "../types";

export type FileInfo = {
  filename: string;
  isDirectory: boolean;
  isFile: boolean;
  mime: string | null;
  path: string;
  size: number;
  stat: Record<string, any>;
};

export class VFS {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async readDirectory(path: string): Promise<FileInfo[]> {
    const response = await fetch(`${this.baseURL}/read-directory?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error(`Failed to read directory: ${response.statusText}`);
    return response.json();
  }

  async readFile(path: string): Promise<Blob> {
    const response = await fetch(`${this.baseURL}/read-file?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error(`Failed to read file: ${response.statusText}`);
    return response.blob();
  }

  async writeFile(path: string, content: Blob): Promise<void> {
    const response = await fetch(`${this.baseURL}/write-file`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, content }),
    });
    if (!response.ok) throw new Error(`Failed to write file: ${response.statusText}`);
  }

  async deleteFile(path: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/delete-file?path=${encodeURIComponent(path)}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete file: ${response.statusText}`);
  }

  async copyFile(source: string, destination: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/copy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, destination }),
    });
    if (!response.ok) throw new Error(`Failed to copy file: ${response.statusText}`);
  }

  async moveFile(source: string, destination: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, destination }),
    });
    if (!response.ok) throw new Error(`Failed to move file: ${response.statusText}`);
  }

  async createDirectory(path: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/create-directory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });
    if (!response.ok) throw new Error(`Failed to create directory: ${response.statusText}`);
  }

  async getFileInfo(path: string): Promise<FileInfo> {
    const response = await fetch(`${this.baseURL}/file-info?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error(`Failed to get file info: ${response.statusText}`);
    return response.json();
  }

  async searchFiles(query: string, options?: SearchOptions): Promise<FileInfo[]> {
    const response = await fetch(`${this.baseURL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, ...options }),
    });
    if (!response.ok) throw new Error(`Failed to search files: ${response.statusText}`);
    return response.json();
  }

  async uploadFile(path: string, file: Blob): Promise<void> {
    const formData = new FormData();
    formData.append('path', path);
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  async downloadFile(path: string): Promise<string> {
    const response = await fetch(`${this.baseURL}/download-url?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error(`Failed to generate download URL: ${response.statusText}`);
    return response.text();
  }
}
