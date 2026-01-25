import { Component } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/common/shared-material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/service/common.service';
import { API_ENDPOINTS } from '../../shared/common/api-contant';
import { ApiService } from '../../shared/service/api.service';
import { StorageService } from '../../shared/service/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private destroy$ = new Subject<void>();
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private apiService: ApiService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  login(): void {
    console.log(this.loginForm);
    let { email, password, rememberMe } = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      const payload = {
        email: email || '',
        password: password || '',
      };

      this.apiService.Login(payload).subscribe({
        next: (resp: any) => {
          console.log(`${API_ENDPOINTS.SERVICE_LOGIN} Response : `, resp);
          if (resp.token && resp.secretKey) {
            const storage = rememberMe ? 'local' : 'session';

            if (rememberMe) {
              this.storageService.setItem(
                'rememberedEmail',
                resp.user.email,
                storage,
              );
            }
            this.storageService.setItem('token', resp.token, storage);
            this.commonService.setUserDetailsFromToken();
            this.commonService.openSnackbar(resp.message, 'success');
            this.router.navigateByUrl('/work-tracker');
          }
        },
        error: (error) => {
          this.commonService.openSnackbar(error.error.message, 'error');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
