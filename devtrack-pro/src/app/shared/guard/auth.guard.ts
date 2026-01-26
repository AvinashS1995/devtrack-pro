import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const token =
    storageService.getItem<string>('token', 'session') ||
    storageService.getItem<string>('token', 'local');

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
