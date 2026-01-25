import { Injectable } from '@angular/core';
import { UserDetails } from '../interface/user';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from './storage.service';
import { KeyService } from './key.service';
import { SnackBarComponent } from '../widget/snack-bar/snack-bar.component';
import * as jwtDecodeNamespace from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userDetails: UserDetails = {
    _id: '',
    empNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    mobile: '',
    address: '',
    country: '',
    role: '',
    roleId: 0,
    type: '',
    status: '',
    reportedBy: '',
    designation: '',
    department: '',
    joiningDate: '',
    salary: 0,
    workType: '',
    bankName: '',
    bankAccNo: '',
    pfNo: '',
    uan: '',
    pan: '',
    profileImage: '',
    loginUserSecretkey: '',
  };

  private userDetailsSubject = new BehaviorSubject<UserDetails>(
    this.userDetails,
  );

  userDetails$ = this.userDetailsSubject.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private storageService: StorageService,
    private keyService: KeyService,
  ) {}

  openSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, type },
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }

  setUserDetailsFromToken() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = this.storageService.getItem<string>('token', 'session');

      if (!token) {
        console.warn('Session and Token Is Expired');
      }

      if (token) {
        try {
          const decoded: any = jwtDecodeNamespace.jwtDecode(token);

          const secretKey =
            decoded.loginUserSecretKey || decoded.loginUserSecretkey || '';

          const updatedUser: UserDetails = {
            ...this.userDetails,
            ...decoded,
            loginUserSecretkey: secretKey,
          };

          this.userDetailsSubject.next(updatedUser);
          if (secretKey) {
            this.keyService.setKey(secretKey);
          }
        } catch (e) {
          console.error('JWT Decode failed:', e);
        }
      }
    }
  }

  getCurrentUserDetails() {
    return this.userDetailsSubject.value;
  }

  clearUserDetails(): void {
    this.userDetailsSubject.next(this.userDetails);
    this.keyService.clearKey();
  }
}
