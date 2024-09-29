import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(key);
    } else {
      console.error("sessionStorage is not available.");
      return null;
    }
  }

  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(key, value);
    } else {
      console.error("sessionStorage is not available.");
    }
  }

  removeItem(key: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem(key);
    } else {
      console.error("sessionStorage is not available.");
    }
  }

  clear(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.clear();
    } else {
      console.error("sessionStorage is not available.");
    }
  }
}
