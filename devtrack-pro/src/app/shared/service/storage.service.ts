import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

type StorageType = 'local' | 'session';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cryptoService: CryptoService) {}

  setItem<T>(key: string, value: T, type: StorageType = 'local'): void {
    this.getStorage(type).setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string, type: StorageType = 'local'): T | null {
    const item = this.getStorage(type).getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  private getStorage(type: 'local' | 'session'): Storage {
    return type === 'local' ? localStorage : sessionStorage;
  }

  setEncrypted<T>(key: string, value: T, type: 'local' | 'session' = 'local') {
    const encrypted = this.cryptoService.encrypt(value);
    this.getStorage(type).setItem(key, encrypted);
  }

  getDecrypted<T>(key: string, type: 'local' | 'session' = 'local'): T | null {
    const item = this.getStorage(type).getItem(key);
    return item ? this.cryptoService.decrypt<T>(item) : null;
  }

  removeItem(key: string, type: 'local' | 'session') {
    this.getStorage(type).removeItem(key);
  }

  clear(type: 'local' | 'session') {
    this.getStorage(type).clear();
  }
}
