import { Component } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/common/shared-material';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/service/common.service';
import { UserDetails } from '../../shared/interface/user';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  private destroy$ = new Subject<void>();

  user = {
    name: '',
    empNo: '',
    initials: '',
    roles: '',
    divisions: '',
  };

  constructor(
    private commonService: CommonService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // 🔥 Subscribe to live user data
    this.commonService.userDetails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserDetails) => {
        if (!user || !user.empNo) return;

        this.user = {
          name: this.buildFullName(user),
          empNo: user.empNo,
          initials: this.getInitials(user),
          roles: user.designation || user.role,
          divisions: user.department ? `(${user.department})` : '',
        };
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.commonService.clearUserDetails();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private buildFullName(user: UserDetails): string {
    return [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(' ');
  }

  private getInitials(user: UserDetails): string {
    return user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
  }
}
