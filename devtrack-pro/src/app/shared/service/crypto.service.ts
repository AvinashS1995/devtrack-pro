import { Injectable } from '@angular/core';
import { KeyService } from './key.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private keyService: KeyService) {}

  encrypt<T>(value: T): string {
    const key = this.keyService.getKey();
    if (!key) {
      throw new Error('Encryption key is not set');
    }

    const text = JSON.stringify(value);
    return CryptoJS.AES.encrypt(text, key).toString();
  }

  decrypt<T>(encrypted: string): T | null {
    const key = this.keyService.getKey();
    if (!key) {
      throw new Error('Decryption key is not set');
    }

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, key);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedText) as T;
    } catch (error) {
      console.warn('Decryption failed:', error);
      return null;
    }
  }
}
